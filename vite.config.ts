import react from "@vitejs/plugin-react-swc";
import { writeFileSync } from "fs";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "copy-css",
      closeBundle() {
        // Copy the CSS file to ensure it's included in the build
        try {
          const cssContent = `@import './free-feedback.css';`;
          writeFileSync(path.resolve(__dirname, "dist/index.css"), cssContent);
          console.log("✅ CSS file copied to dist/index.css");
        } catch (error) {
          console.error("❌ Error copying CSS file:", error);
        }
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "ReactFeedbackComponent",
      fileName: (format) => `free-feedback.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
        exports: "named",
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "style.css") return "free-feedback.css";
          return assetInfo.name || "";
        },
      },
    },
    cssCodeSplit: false,
    // Ensure CSS is extracted
    emptyOutDir: true,
  },
});
