<template>
  <template
    v-for="attribute of detailAttributes"
    :key="attribute"
  >
    <InputControl
      v-model="character[attribute]"
      :id="attribute"
      type="text"
      size="sm"
      :label="_startCase(attribute)"
      label-class="text-secondary"
      :datalist="options?.[attribute]"
      :error="fieldError?.[attribute]"
      error-label-class="text-error"
    />
  </template>

  <div
    v-for="attribute of richTextAttributes"
    :key="attribute"
    class="form-control mt-3"
  >
    <label class="label label-text text-secondary">
      {{ _startCase(attribute) }}
    </label>

    <ClientOnly>
      <TrixEditor
        :input-id="attribute"
        :input-name="attribute + '_content'"
        v-model="character[attribute]"
      />
    </ClientOnly>
  </div>
</template>

<script setup>
const character = defineModel()

const props = defineProps(["fieldError"])

const { data: options } = await useFetch(
  `http://localhost:3000/characters/options`,
  {
    transform: (data) => deepConvertKeys(data, _camelCase)
  }
)
</script>

<style scoped>

</style>
