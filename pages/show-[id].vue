<template>
  <div
    v-if="isPresent(character)"
    class="card bg-base-300 shadow-xl max-w-prose mx-auto"
  >
    <div class="card-body">
      <template
        v-for="attribute of detailAttributes"
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
        v-for="attribute of richTextAttributes"
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
          v-if="isSignedIn"
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
const route = useRoute()
//const sessionStore = useSessionStore()
//const { isSignedIn } = storeToRefs(sessionStore)
const isSignedIn = true

const { data: character } = await useFetch(
  `http://localhost:3000/characters/${route.params.id}`,
  {
    transform: (data) => deepConvertKeys(data, _camelCase)
  }
)
</script>

<style scoped>

</style>
