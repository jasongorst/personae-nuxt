<template>
  <div class="card bg-base-300 shadow-xl mx-auto max-w-prose">
    <div class="card-body">
      <CharacterForm
        v-model="character"
        :field-error="fieldError"
      />

      <div class="card-actions mt-6 flex-row-reverse">
        <UILoadingButton
          @click="saveCharacter"
          :is-loading="savingStatus === 'pending'"
          type="button"
          class="btn-sm btn-secondary uppercase"
        >
          Save
        </UILoadingButton>

        <button
          @click="router.back"
          class="btn btn-sm btn-primary uppercase"
          type="button"
        >
          Cancel
        </button>

        <UILoadingButton
          @click="deleteCharacter"
          :is-loading="deletingStatus === 'pending'"
          type="button"
          class="btn btn-sm btn-accent uppercase"
        >
          Delete
        </UILoadingButton>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const router = useRouter()
const alertStore = useAlertStore()
const fieldError = ref(null)
const fieldErrorAlertId = ref(null)

const characterBody = computed(() => ({
  character: _reduce(
    apiAttributes,
    (obj, attribute) => {
      obj[attribute] = character.value[attribute]
      return obj
    },
    {}
  )
}))

onBeforeRouteLeave(() => {
  dismissFieldErrorAlert()
})

function dismissFieldErrorAlert() {
  if (fieldErrorAlertId.value) {
    alertStore.removeMessage(fieldErrorAlertId.value)
  }
}

// load character
const { data: character } = await useApiCall(
  `/api/v1/characters/${route.params.id}`,
  {
    apiErrorCb: () => {
      alertStore.addMessage(
        "The character couldn't be loaded. Something is wrong with the server.", {
          severity: "error",
          dismissOnLeave: true
        }
      )
    },

    fetchErrorCb: () => {
      alertStore.addMessage(
        "The character couldn't be loaded. The server cannot be reached.", {
          severity: "error",
          dismissOnLeave: true
        }
      )
    }
  }
)

// save character
const { execute: saveCharacter, status: savingStatus } = await useApiCall(
  `/api/v1/characters/${route.params.id}`,
  {
    manualFetch: true,
    method: "patch",
    body: characterBody,

    beforeCb: async () => {
      dismissFieldErrorAlert()
      fieldErrorAlertId.value = null
    },

    successCb: async (response) => {
      alertStore.addMessage(
        "The character has been updated.", {
          severity: "success",
          dismissedIn: 4000
        }
      )

      await router.push(`show-${route.params.id}`)
    },

    fieldErrorCb: (response) => {
      fieldErrorAlertId.value = alertStore.addMessage(
        "There was a problem updating the character. See below.", {
          severity: "warning",
          dismissOnLeave: true
        }
      )

      fieldError.value = sentenceizeValues(response._data)
    },

    apiErrorCb: async (error) => {
      //if (error?.response?.status === 401) {
      //  alertStore.addMessage(
      //    "You must be signed in to edit characters.", {
      //      severity: "warning",
      //      dismissOnLeave: true
      //    }
      //  )
      //
      //  await router.replace({ name: "sign-in", query: { next: route.path } })
      //} else {
        alertStore.addMessage(
          "The character couldn't be updated. Something is wrong with the server.", {
            severity: "error",
            dismissOnLeave: true
          }
        )
      //}
    },

    fetchErrorCb: () => {
      alertStore.addMessage(
        "The character couldn't be updated. The server cannot be reached.", {
          severity: "error",
          dismissOnLeave: true
        }
      )
    }
  }
)

// delete character
const { execute: deleteCharacter, status: deletingStatus } = await useApiCall(
  `/api/v1/characters/${route.params.id}`,
  {
    manualFetch: true,
    method: "delete",

    successCb: async () => {
      alertStore.addMessage(
        "The character has been deleted.", {
          severity: "success",
          dismissedIn: 4000
        }
      )

      await router.push("/")
    },

    apiErrorCb: async (error) => {
      //if (error.status === 401) {
      //  alertStore.addMessage(
      //    "You must be signed in to delete characters.", {
      //      severity: "warning",
      //      dismissOnLeave: true
      //    }
      //  )
      //
      //  await router.replace({ name: "sign-in", query: { next: route.path } })
      //} else {
        alertStore.addMessage(
          "The character couldn't be deleted. Something is wrong with the server.", {
            severity: "error",
            dismissOnLeave: true
          }
        )
      //}
    },

    fetchErrorCb: () => {
      alertStore.addMessage(
        "The character couldn't be deleted. The server cannot be reached.", {
          severity: "error",
          dismissOnLeave: true
        }
      )
    }
  }
)
</script>

<style scoped>

</style>
