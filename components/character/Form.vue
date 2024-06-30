<template>
  <template
    v-for="attribute of detailAttributes"
    :key="attribute"
  >
    <TextInput
      v-model="character[attribute]"
      :id="attribute"
      type="text"
      size="sm"
      :datalist="options?.[attribute]"
    >
      <template #label>
        {{ _startCase(attribute) }}
      </template>

      <template #error v-if="_has(fieldError, attribute)">
        {{ fieldError[attribute] }}
      </template>
    </TextInput>
  </template>

  <ClientOnly>
    <TrixInput
      v-for="attribute of richTextAttributes"
      :key="attribute"
      v-model="character[attribute]"
      :id="attribute"
    >
      <template #label>
        {{ _startCase(attribute) }}
      </template>
    </TrixInput>
  </ClientOnly>
</template>

<script setup>
const character = defineModel()
const props = defineProps(["fieldError"])

const { data: options } = await useApiCall("http://localhost:3000/characters/options")
</script>

<style scoped>

</style>
