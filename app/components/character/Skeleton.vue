<template>
  <div class="skeleton w-full mb-4 max-h-[calc(100vh-8.5rem)] overflow-y-hidden">
    <table class="w-full table table-md">
      <thead>
      <tr>
        <th>
          &nbsp;
        </th>
      </tr>
      </thead>

      <tbody>
      <template v-for="_row in _range(0, 99)">
        <tr class="odd:bg-base-100">
          <td class="px-3 py-2 xl:px-4 xl:py-3">
            &nbsp;
          </td>
        </tr>
      </template>
      </tbody>
    </table>
  </div>

  <div class="sticky bottom-0 w-full -mt-4 character-toolbar">
    <div class="bg-primary min-h-14"></div>
  </div>
</template>

<script setup>

</script>

<style scoped>
@reference "~/assets/css/main.css";

@layer components {
  .character-toolbar {
    @apply before:block before:sticky before:bottom-20 before:w-full before:h-4 before:bg-gradient-to-t before:from-base-100;
    @apply after:block after:sticky after:bottom-0 after:w-full after:h-4 after:bg-base-100;
  }
}
</style>
