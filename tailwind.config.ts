import type { Config } from "tailwindcss";

export default {
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-raleway)", "sans-serif", "system-ui"],
      },
      minHeight: { dvh: "100dvh" },
    },
  },
  plugins: [],
} satisfies Config;