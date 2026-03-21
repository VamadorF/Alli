import type { Config } from "tailwindcss"
import alliPreset from "../../packages/ui/tailwind-preset"

export default {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
  theme: alliPreset.theme,
  plugins: alliPreset.plugins,
} satisfies Config
