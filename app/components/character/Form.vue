<template>
  <template
    v-for="attribute in detailAttributes"
    :key="attribute"
  >
    <UITextInput
      v-model="character[attribute]"
      :id="attribute"
      type="text"
      size="sm"
      :datalist="options?.[attribute]"
      :data-testid="`input_${attribute}`"
    >
      <template #label>
        {{ _startCase(attribute) }}
      </template>

      <template #error v-if="_has(fieldError, attribute)">
        {{ fieldError[attribute] }}
      </template>
    </UITextInput>
  </template>

  <ClientOnly>
    <UITrixInput
      v-for="attribute in richTextAttributes"
      :key="attribute"
      v-model="character[attribute]"
      :id="attribute"
      :data-testid="`trix_${attribute}`"
    >
      <template #label>
        {{ _startCase(attribute) }}
      </template>

      <template #error v-if="_has(fieldError, attribute)">
        {{ fieldError[attribute] }}
      </template>
    </UITrixInput>
  </ClientOnly>
</template>

<script setup>
const character = defineModel()
const props = defineProps([ "fieldError" ])

const { data: options } = await useApi("/characters/options")
</script>

<style scoped>

</style>
