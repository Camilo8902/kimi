import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  base: './',
  plugins: [react()],
  
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  
  build: {
    target: 'es2020',
    outDir: 'dist',
    assetsDir: 'assets',
    
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-ui': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-tabs'],
          'vendor-utils': ['zustand', 'gsap', '@supabase/supabase-js'],
          'vendor-icons': ['lucide-react'],
        },
        entryFileNames: 'js/[name]-[hash].js',
        chunkFileNames: 'js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || ''
          if (/\.(png|jpe?g|gif|svg|webp|ico)$/i.test(name)) {
            return 'images/[name]-[hash][extname]'
          }
          if (/\.(woff2?|ttf|otf|eot)$/i.test(name)) {
            return 'fonts/[name]-[hash][extname]'
          }
          return 'assets/[name]-[hash][extname]'
        },
      },
    },
    
    minify: 'esbuild',
    sourcemap: false,
    cssCodeSplit: true,
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 500,
  },
  
  server: {
    port: 3000,
    open: true,
    cors: true,
  },
  
  preview: {
    port: 4173,
  },
  
  css: {
    devSourcemap: true,
  },
  
  envPrefix: 'VITE_',
  
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'zustand',
      'gsap',
      '@supabase/supabase-js',
      'lucide-react',
    ],
  },
})
