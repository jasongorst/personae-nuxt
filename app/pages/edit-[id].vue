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
          class="btn btn-sm btn-secondary uppercase"
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
const alert = useAlert()
const { token } = useAuth()

const fieldError = ref(null)
const fieldErrorAlertId = ref(null)

onBeforeRouteLeave(() => {
  dismissFieldErrorAlert()
})

function dismissFieldErrorAlert() {
  if (fieldErrorAlertId.value) {
    alert.remove(fieldErrorAlertId.value)
  }
}

// load character
const { data: character } = await useApi(
  `/characters/${route.params.id}`,
  {
    onRequestError: () => {
      alert.add(
        "The character couldn't be loaded. The server cannot be reached.", {
          severity: "error",
          dismissOnLeave: true
        }
      )
    },

    onResponseError: () => {
      alert.add(
        "The character couldn't be loaded. Something is wrong with the server.", {
          severity: "error",
          dismissOnLeave: true
        }
      )
    }
  }
)

// save character
const { execute: saveCharacter, status: savingStatus } = await useApi(
  `/characters/${route.params.id}`,
  {
    body: { character: computed(() => _pick(character.value, apiAttributes)) },
    method: "patch",
    token: token,
    manual: true,

    onRequest: () => {
      dismissFieldErrorAlert()
      fieldErrorAlertId.value = null
    },

    onRequestError: () => {
      alert.add(
        "The character couldn't be updated. The server cannot be reached.", {
          severity: "error",
          dismissOnLeave: true
        }
      )
    },

    onResponse: async () => {
      alert.add(
        "The character has been updated.", {
          severity: "success",
          dismissedIn: 4000
        }
      )

      await router.push(`show-${route.params.id}`)
    },

    onResponseError: () => {
      alert.add(
        "The character couldn't be updated. Something is wrong with the server.", {
          severity: "error",
          dismissOnLeave: true
        })
    },

    onFieldError: ({ response }) => {
      fieldErrorAlertId.value = alert.add(
        "There was a problem updating the character. See below.", {
          severity: "warning",
          dismissOnLeave: true
        }
      )

      fieldError.value = sentenceizeValues(response._data)
    }
  }
)

// delete character
const { execute: deleteCharacter, status: deletingStatus } = await useApi(
  `/characters/${route.params.id}`,
  {
    method: "delete",
    token: token,
    manual: true,

    onRequestError: () => {
      alert.add(
        "The character couldn't be deleted. The server cannot be reached.", {
          severity: "error",
          dismissOnLeave: true
        }
      )
    },

    onResponse: async () => {
      alert.add(
        "The character has been deleted.", {
          severity: "success",
          dismissedIn: 4000
        }
      )

      await router.push("/")
    },

    onResponseError: () => {
      alert.add(
        "The character couldn't be deleted. Something is wrong with the server.", {
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
