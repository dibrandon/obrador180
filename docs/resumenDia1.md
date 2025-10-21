# Proyecto Obrador 180 graus – MVP Web

## 📊 Resumen rápido

| Área              | Estado | Comentario                                       |
| ----------------- | ------ | ------------------------------------------------ |
| Repositorio / Git | ✅      | Estructura principal funcional y versionada      |
| Frontend (Vite)   | ✅      | Servidor auto-open, host dinámico                |
| Backend (Express) | ✅      | API en 4000, rutas `/`, `/health`, `/products`   |
| Mongo Atlas       | ✅      | Conexión segura, seed realizado                  |
| Docs              | ✅      | README + log de progreso inicial                 |
| Próximo paso      | 🔜      | Fetch en frontend + render de cards de productos |

---

## 🧱 1. Estructura y repositorio

- Carpeta raíz: `/obrador180`  
- Subcarpetas: `frontend/`, `backend/`, `docs/`, `design/`  
- Inicializado con `git init` → GitHub (`main`)  
- `.gitignore` + `README.md` base creados  
- Flujo de commits: `git add .` → `git commit -m "..."` → `git push`

---

## ⚙️ 2. Frontend – React + Vite

- Instalado con `npm create vite@latest` (React + JS)  
- Configuración estable:

  ```js
  server: { host: true, strictPort: false, open: true }

js````

→ arranca con `npm run dev`, abre navegador y evita conflictos de puerto

- Scripts actualizados:

  ```json
  "scripts": {
    "dev": "vite --host",
    "build": "vite build",
    "preview": "vite preview"
  }
  ```

- Verificado funcionamiento en `localhost:5173` (auto-open ✅)
- Commit relevante:

  > `refactor(project): configurar backend como módulo ESM y ajustar frontend Vite con host dinámico y apertura automática`

---

## 🖥️ 3. Backend – Node + Express (Mongoose listo)

- Estructura mínima: `index.js`, `routes/`, `models/`, `scripts/`
- Dependencias: `express`, `cors`, `dotenv`, `mongoose`
- Proyecto configurado como módulo ESM:

  ```json
  "type": "module",
  "scripts": { "dev": "node index.js" }
  ```

- Endpoint `/health` operativo → `{ ok: true, service: "obrador180-api" }`
- Conexión MongoDB Atlas activa y verificada

---

## 🍰 4. MongoDB Atlas + Seed

- Cluster `obradorCluster` creado (Free M0, AWS Europa)
- Usuario `kairossitges_db_user` con password segura en `.env`
- Archivo `.env` configurado:

  ```bash
  PORT=4000
  MONGO_URI=mongodb+srv://kairossitges_db_user:***@obradorcluster.e4rqdd.mongodb.net/obrador180?retryWrites=true&w=majority&appName=obradorCluster
  ```

- Modelo `Product` definido con: `name`, `description`, `price`, `image`
- Ruta `/products` (GET/POST) implementada
- Script `seedProducts.js` ejecutado con éxito → **3 productos insertados**
- Verificado: `🍰 Seed OK` y `GET /products` devuelve array JSON con los pasteles

---

> **Resumen del avance:**
> La base técnica del MVP quedó lista.
> El proyecto se puede ejecutar completo localmente (frontend y backend).
> La próxima fase será conectar ambos y renderizar el catálogo visible para el cliente.

---
