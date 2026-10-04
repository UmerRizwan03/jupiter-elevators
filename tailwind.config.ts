import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        "4.5": "1.125rem",
        "8.5": "2.125rem",
      },
      boxShadow: {
        "2xs": "0 1px 2px 0 rgb(15 23 42 / 0.05)",
        xs: "0 1px 3px 0 rgb(15 23 42 / 0.1), 0 1px 2px -1px rgb(15 23 42 / 0.1)",
      },
      colors: {
        brand: {
          navy: "#0B1B3D",
          "navy-dark": "#071228",
          "navy-light": "#1E3A8A",
          gold: "#C59341",
          "gold-hover": "#B38234",
          amber: "#D97706",
          "amber-hover": "#B45309",
          whatsapp: "#25D366",
          "whatsapp-hover": "#1EBE5D",
          slate: "#1E293B",
          muted: "#64748B",
          subtle: "#F8FAFC",
          "subtle-card": "#F1F5F9",
          border: "#E2E8F0",
          "border-dark": "#CBD5E1",
        },
      },
      fontFamily: {
        cairo: ["Cairo", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        sans: ["Inter", "Cairo", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
