<template>
  <div class="card bg-base-300 shadow-xl mx-auto max-w-prose">
    <div class="card-body">
      <form @submit.prevent="saveCharacter">
        <CharacterForm
          v-model="character"
          :field-error="fieldError"
        />

        <div class="card-actions mt-6 flex-row-reverse">
          <LoadingButton
            :is-loading="savingStatus === 'pending'"
            type="submit"
            class="btn-sm btn-secondary uppercase"
          >
            Save
          </LoadingButton>

          <button
            @click="router.back"
            class="btn btn-sm btn-primary uppercase"
            type="button"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const router = useRouter()
//const alertStore = useAlertStore()

const character = ref(_fromPairs(
  apiAttributes.map((attribute) => [attribute, null])
))

const fieldError = ref(null)
const fieldErrorAlertId = ref(null)

//onBeforeRouteLeave(() => {
//  dismissFieldErrorAlert()
//})

//function dismissFieldErrorAlert() {
//  if (fieldErrorAlertId.value) {
//    alertStore.removeMessage(fieldErrorAlertId.value)
//  }
//}

const { refresh: saveCharacter, status: savingStatus } = await useFetch(
  "http://localhost:3000/characters",
  {
    method: "post",
    body: { character: character.value },
    immediate: false,
    transform: (data) => deepConvertKeys(data, _camelCase),
    async onRequest() {
      await sleep(2000)
    }
  }
)
</script>

<style scoped>

</style>
