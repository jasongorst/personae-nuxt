import daisyui from "daisyui"
import themes from "daisyui/src/theming/themes"
import tailwindTypography from "@tailwindcss/typography"
import headlessUITailwindCSS from "@headlessui/tailwindcss"

export default {
  plugins: [
    daisyui,
    headlessUITailwindCSS,
    tailwindTypography
  ],

  daisyui: {
    themes: [
      // first theme is the default (for light mode)
      "fantasy",
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      {
        wireframe: {
          ...themes["wireframe"],
          fontFamily: null,
        }
      },
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
      "dim",
      "nord",
      "sunset"
    ],

    darkMode: "media",
    darkTheme: "business",
    logs: false
  }
}
