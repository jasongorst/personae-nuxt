import tailwindContainerQueries from "@tailwindcss/container-queries"
import daisyui from "daisyui"
import themes from "daisyui/src/theming/themes"

export default {
  plugins: [
    tailwindContainerQueries,
    daisyui
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
    darkTheme: "halloween",
    logs: false
  }
}

