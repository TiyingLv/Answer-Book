import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base 设为 "./" 使构建产物可用相对路径访问，
// 便于直接以静态方式打开或部署到任意子路径。
export default defineConfig({
  plugins: [react()],
  base: "./",
  server: {
    host: "127.0.0.1",
    port: 5173,
  },
});
