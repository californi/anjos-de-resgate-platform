import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
    "../../packages/shared/src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        rescue: {
          50: "#f2fbf8",
          100: "#d8f3ea",
          500: "#2ea982",
          600: "#218767",
          900: "#123c33"
        },
        coral: {
          500: "#e85454",
          600: "#c84040"
        }
      },
      boxShadow: {
        soft: "0 12px 35px rgb(18 60 51 / 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
