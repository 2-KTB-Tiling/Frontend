import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   proxy: {
  //     "/api": {
  //       // 요청 전달 대상 서버 주소 설정
  //       target: "http://127.0.0.1:8000",
  //       // 요청 헤더 host 필드 값을 대상 서버의 호스트 이름으로  변경
  //       changeOrigin: true,
  //       // 요청 경로에서 '/api' 제거
  //       rewrite: (path) => path.replace(/^\/api/, ""),
  //       // SSL 인증서 검증 무시
  //       secure: false,
  //     },
  //   },
  // },
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        secure: false,
        ws: true,
      },
    },
  },
});
