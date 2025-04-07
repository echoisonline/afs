import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/companies": {
        target: "https://test-task-api.allfuneral.com",
        changeOrigin: true, // Обеспечивает корректное изменение origin для запросов
        secure: false, // Если сервер использует HTTP, можно отключить проверку SSL
        rewrite: (path) => path.replace(/^\/companies/, "/companies"), // Преобразование пути, если нужно
      },
    },
  },
});
