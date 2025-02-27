<template>
  <button class="outline-base-content text-start outline-offset-4">
    <span
      :data-theme="dataTheme"
      class="bg-base-100 rounded-btn text-base-content block w-full cursor-pointer font-sans"
    >
      <span class="grid grid-cols-5 grid-rows-3">
        <span class="col-span-5 row-span-3 row-start-1 flex items-center pl-2 pr-4 py-3 gap-1">
          <Icon
            name="ph:check-bold"
            size="1rem"
            :class="[ 'shrink-0', !isActive && 'invisible' ]"
          />

          <span class="flex-grow text-sm">
            {{ theme }}
          </span>

          <span class="flex h-full shrink-0 flex-wrap gap-1">
            <span class="bg-primary rounded-badge w-2"></span>
            <span class="bg-secondary rounded-badge w-2"></span>
            <span class="bg-accent rounded-badge w-2"></span>
            <span class="bg-neutral rounded-badge w-2"></span>
          </span>
        </span>
      </span>
    </span>
  </button>
</template>

<script setup>
const props = defineProps(["theme", "isActive", "defaultTheme"])

const dataTheme = computed(() => {
  if (props.theme === "default") {
    return props.defaultTheme
  } else {
    return props.theme
  }
})
</script>

<style scoped>

</style>
