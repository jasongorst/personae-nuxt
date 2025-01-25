<template>
  <details>
    <summary class="hide-dropdown-arrow">
      Change Theme
    </summary>

    <div class="theme-changer -mt-1 -mb-2 h-[38rem] max-h-[calc(100vh-4rem)] w-48 overflow-y-auto grid grid-cols-1 gap-2 px-2">
      <template
        v-for="theme in daisyUIThemes"
        :key="theme"
      >
        <ThemeButton
          v-if="theme === 'default'"
          theme="default"
          :isActive="(currentTheme === 'default')"
          :default-theme="defaultTheme"
          @click="changeTheme('default')"
        />

        <ThemeButton
          v-else
          :isActive="(theme === currentTheme)"
          :theme="theme"
          @click="changeTheme(theme)"
        />
      </template>
    </div>
  </details>
</template>

<script setup>
const props = defineProps({
  defaultLightTheme: {
    type: String,
    default: themeDefaults.light
  },
  defaultDarkTheme: {
    type: String,
    default: themeDefaults.dark
  },
  defaultColorScheme: {
    type: String,
    default: themeDefaults.colorScheme,
    validator(value, _) {
      return ["media", "light", "dark"].includes(value)
    }
  }
})

const defaultTheme = computed(() => {
  switch (props.defaultColorScheme) {
    case "light":
      return props.defaultLightTheme

    case "dark":
      return props.defaultDarkTheme

    case "media":
    default:
      if (prefersDarkColorScheme()) {
        return props.defaultDarkTheme
      } else {
        return props.defaultLightTheme
      }
  }
})

const currentTheme = ref(getLocalTheme() || "default")

watch(
  currentTheme,
  (newTheme) => applyTheme(newTheme),
  { immediate: true }
)

function applyTheme(theme) {
  const htmlElement = document.querySelector("html")

  if (theme === "default") {
    htmlElement.dataset.theme = ""
  } else {
    htmlElement.dataset.theme = theme
  }
}

function changeTheme(theme) {
  currentTheme.value = theme
  setLocalTheme(theme)
}

function getLocalTheme() {
  return localStorage.getItem("theme")
}

function setLocalTheme(theme) {
  localStorage.setItem("theme", theme)
}
</script>

<style scoped>
@reference "~/assets/css/main.css";

@layer components {
  .theme-changer {
    @apply before:sticky before:top-0 before:left-0 before:w-full before:h-2 before:-mb-2 before:bg-gradient-to-b before:from-primary before:to-transparent before:border-0 before:border-white;
    @apply after:sticky after:bottom-0 after:left-0 after:w-full after:h-2 after:-mt-2 after:bg-gradient-to-t after:from-primary after:to-transparent after:border-0 after:border-white;
  }

  .hide-dropdown-arrow {
    @apply after:hidden;
  }
}
</style>
