import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
//import eslint from "vite-plugin-elsint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  //plugins: [react(), eslint()],
});
