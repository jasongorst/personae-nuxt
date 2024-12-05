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

const character = ref(_fromPairs(
  apiAttributes.map((attribute) => [attribute, null])
))

onBeforeRouteLeave(() => {
  dismissFieldErrorAlert()
})

function dismissFieldErrorAlert() {
  if (fieldErrorAlertId.value) {
    alertStore.removeMessage(fieldErrorAlertId.value)
  }
}

const { execute: saveCharacter, status: savingStatus } = await useApiCall(
  "/api/v1/characters",
  {
    manualFetch: true,
    method: "post",
    body: { character: character.value },

    beforeCb: async () => {
      dismissFieldErrorAlert()
      fieldErrorAlertId.value = null
    },

    successCb: async (response) => {
      alertStore.addMessage(
        "The character has been created.", {
          severity: "success",
          dismissedIn: 4000
        }
      )

      await router.push(`show-${response._data.id}`)
    },

    fieldErrorCb: (response) => {
      fieldErrorAlertId.value = alertStore.addMessage(
        "There was a problem creating the character. See below.", {
          severity: "warning",
          dismissOnLeave: true
        }
      )

      fieldError.value = deepConvertValues(
        deepConvertValues(response._data, sentenceize),
        joinArrays
      )
    },

    apiErrorCb: async (error) => {
      //if (error?.response?.status === 401) {
      //  alertStore.addMessage(
      //    "You must be signed in to create characters.", {
      //      severity: "warning",
      //      dismissOnLeave: true
      //    }
      //  )
      //
      //  await router.replace({ name: "sign-in", query: { next: route.path } })
      //} else {
        alertStore.addMessage(
          "The character couldn't be created. Something is wrong with the server.", {
            severity: "error",
            dismissOnLeave: true
          }
        )
      //}
    },

    fetchErrorCb: () => {
      alertStore.addMessage(
        "The character couldn't be created. The server cannot be reached.", {
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
