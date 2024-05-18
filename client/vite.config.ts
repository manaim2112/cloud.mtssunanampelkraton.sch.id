import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig, splitVendorChunkPlugin } from "vite"
 
export default defineConfig({
  plugins: [react(), splitVendorChunkPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server : {
    host : true,
    port : 5002
  },
  // build : {
  //   rollupOptions : {
  //     output : {
  //       manualChunks : {
          
  //       }
  //     }
  //   }
  // }
})