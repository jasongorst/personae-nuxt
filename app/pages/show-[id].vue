<!--suppress HtmlUnknownTarget -->
<template>
  <div v-if="apiStatus === 'pending'">
    <!--    TODO: loading indicator-->
  </div>

  <div
    v-else
    class="card bg-base-300 shadow-xl max-w-prose mx-auto"
    data-testid="show"
  >
    <div class="card-body">
      <template
        v-for="attribute in detailAttributes"
        :key="attribute"
      >
        <p v-if="isPresent(character[attribute])">
          <strong>
            {{ _startCase(attribute) }}:
          </strong>
          {{ character[attribute] }}
        </p>
      </template>

      <template
        v-for="attribute in richTextAttributes"
        :key="attribute"
      >
        <template v-if="isPresent(character[attribute])">
          <div class="mt-3 w-full border-b border-current">
            <p>
              {{ _startCase(attribute) }}
            </p>
          </div>

          <div
            class="prose trix-content"
            v-html="character[attribute]"
          >
          </div>
        </template>
      </template>

      <div class="card-actions justify-end mt-3">
        <RouterLink
          to="/"
          class="btn btn-sm btn-primary uppercase"
        >
          Back
        </RouterLink>

        <RouterLink
          v-if="isLoggedIn"
          :to="`edit-${character.id}`"
          class="btn btn-sm btn-secondary uppercase"
        >
          Edit
        </RouterLink>

        <div
          v-else
          class="tooltip tooltip-info tooltip-left md:tooltip-top"
          data-tip="Sign in to edit characters."
        >
          <button
            class="btn btn-sm btn-outline btn-disabled uppercase"
            type="button"
            disabled
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const alert = useAlert()
const route = useRoute()
const { status } = useAuth()
const isLoggedIn = computed(() => status.value === "authenticated")

const { data: character, status: apiStatus } = await useApi(
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
</script>

<style scoped>

</style>
