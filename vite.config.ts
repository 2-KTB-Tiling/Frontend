import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["frontend"],  // ✅ frontend 컨테이너에서 접근 허용 (LLM 설정 영향 없음)
    proxy: {
      "/api": {
        // target: "http://127.0.0.1:8000",
        target: "http://llm:8000", //---> 로컬에서는 위의 코드로 컨테이너에서는 밑 코드로.
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        secure: false,
        ws: true,
      },
    },
  },
});
