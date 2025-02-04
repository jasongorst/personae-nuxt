<template>
  <div class="relative w-full xl:max-w-screen-xl xl:mx-auto">
    <NavBar class="mb-4 lg:mb-6" />

    <div class="sticky top-0 lg:-mt-2 w-full h-0 flex flex-row-reverse z-[1000]">
      <AlertMessages class="static!" />
    </div>

    <div class="lg:mt-2">
      <slot />
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>

</style>
