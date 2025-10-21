import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,     // expone 127.0.0.1 y tu IP local correctamente
    strictPort: false, // si 5173 está ocupado, usa 5174, 5175...
    open: true // (no fijamos port, así no falla si está ocupado)
    
  }
})
