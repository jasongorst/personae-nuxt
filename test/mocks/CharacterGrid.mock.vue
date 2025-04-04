<template>
  <table data-testid="grid">
    <thead>
    <tr>
      <th>Player</th>
    </tr>
    </thead>

    <tbody>
    <CharacterRow
      v-for="character in personae.characters"
      :key="character.id"
      :character="character"
    />
    </tbody>
  </table>
</template>

<script setup>
const personae = usePersonae()
</script>

<style scoped>

</style>
