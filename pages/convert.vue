<template>
  <h3>array of strings</h3>
  <pre>{{ arrayOfStrings }}</pre>
  <pre>{{ sentenceizeValues(arrayOfStrings) }}</pre>

  <h3>array of array of strings</h3>
  <pre>{{ arrayOfArrayOfStrings }}</pre>
  <pre>{{ sentenceizeValues(arrayOfArrayOfStrings) }}</pre>

  <h3>object with arrays</h3>
  <pre>{{ objectWithArrays }}</pre>
  <pre>{{ sentenceizeValues(objectWithArrays) }}</pre>

  <h3>nested object with arrays</h3>
  <pre>{{ nestedObjectWithArrays }}</pre>
  <pre>{{ sentenceizeValues(nestedObjectWithArrays) }}</pre>

  <h3>array of numbers</h3>
  <pre>{{ arrayOfNumbers }}</pre>
  <pre>{{ sentenceizeValues(arrayOfNumbers) }}</pre>
</template>

<script setup>
const arrayOfStrings = ["one", "two", "three"]

const arrayOfArrayOfStrings = [
  ["one", "two"],
  ["three"],
  "four"
]

const objectWithArrays = {
  one: ["one a", "one b"],
  two: "two",
  three: ["three a", "three b", "three c"]
}

const nestedObjectWithArrays = {
  one: {
    onea: ["one a 1", "one a 2"],
    twoa: ["two a 1"]
  },
  two: ["two a", "two b", "two c"]
}

const arrayOfNumbers = [1, 2, 3]
</script>

<style scoped>

</style>
