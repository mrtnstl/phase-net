import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {resolve} from "path";
import dts from "vite-plugin-dts";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ["src"],
      insertTypesEntry: true,
    }),
  ],
  build:{
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "UI",
      formats: ["es", "umd"],
      fileName: (format) => (format === "es" ? "ui.js" : "ui.umd.cjs"),
    },
    rollupOptions: {
      // Make sure React is not bundled
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "jsxRuntime",
        },
      },
    },
  }
})
