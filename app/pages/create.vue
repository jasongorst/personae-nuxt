<template>
  <div
    class="card bg-base-300 shadow-xl mx-auto max-w-prose"
    data-testid="create"
  >
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
      </div>
    </div>
  </div>
</template>

<script setup>
const router = useRouter()
const alert = useAlert()
const { token } = useAuth()

const fieldError = ref(null)
const fieldErrorAlertId = ref(null)

const character = ref(_fromPairs(
  apiAttributes.map((attribute) => [ attribute, null ])
))

onBeforeRouteLeave(() => {
  dismissFieldErrorAlert()
})

function dismissFieldErrorAlert() {
  if (fieldErrorAlertId.value) {
    alert.remove(fieldErrorAlertId.value)
  }
}

const { execute: saveCharacter, status: savingStatus } = await useApi(
  "/characters", {
    body: { character: character },
    method: "post",
    token: token,
    manual: true,

    onRequest: () => {
      dismissFieldErrorAlert()
      fieldErrorAlertId.value = null
    },

    onRequestError: () => {
      alert.add("The character couldn't be created. The server cannot be reached.", {
        severity: "error",
        dismissOnLeave: true
      })
    },

    onResponse: async ({ response }) => {
      alert.add("The character has been created.", { severity: "success", dismissedIn: 4000 })
      await router.push(`show-${response._data.id}`)
    },

    onResponseError: () => {
      alert.add("The character couldn't be created. Something is wrong with the server.", {
        severity: "error",
        dismissOnLeave: true
      })
    },

    onFieldError: ({ response }) => {
      fieldErrorAlertId.value = alert.add("There was a problem creating the character. See below.", {
        severity: "warning",
        dismissOnLeave: true
      })

      fieldError.value = deepConvertValues(deepConvertValues(response._data, sentenceize), joinArrays)
    }
  }
)
</script>

<style scoped>

</style>
