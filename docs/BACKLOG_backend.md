# ⚙️ Backlog Backend — Obrador 180 graus (MVP)
**Versión actual:** `v0.6 – API protegida con adminAuth y CRUD completo`  
**Última actualización:** 7 nov 2025  

> **Stack:** Node.js · Express · Mongoose · MongoDB Atlas  
> **Objetivo:** ofrecer una API sólida, modular y segura, que sirva como base del flujo de catálogo y autogestión del obrador.

---

## 📁 Estructura real del backend

```

backend/
├─ middleware/
│  ├─ adminAuth.js
│  ├─ errorHandler.js
│  └─ logger.js
├─ models/
│  └─ Product.js
├─ routes/
│  └─ products.js
├─ scripts/
│  └─ seedProducts.js
├─ .env.example
├─ .env
├─ index.js
└─ package.json

````

---

## 🧭 Épica 1 — Configuración base y arquitectura

**Meta:** servidor Express funcional y conectado a MongoDB Atlas.  
**Estado actual:**
- [x] Dependencias instaladas (`express`, `cors`, `dotenv`, `mongoose`, `express-rate-limit`)
- [x] `"type": "module"` en `package.json`
- [x] Middlewares base: `express.json()`, `cors` con whitelist desde `.env`
- [x] Endpoint `/health` con estado de conexión Mongo
- [x] Conexión Atlas y arranque en `PORT` (por defecto 4000)

**Criterio de cierre:** `/health` responde correctamente con estado `"connected"`.

---

## 🧩 Épica 2 — Modelo y rutas de productos

**Meta:** definir modelo `Product` y exponer endpoints REST básicos.  
**Estado actual:**
- [x] Modelo `Product` con `timestamps` y campos principales:
  - `name`, `description`, `price`, `image`, `isActive`, `_seedTag`
- [x] `GET /products` → lista activos (orden descendente)
- [x] `POST /products` → alta protegida (admin)
- [x] `PUT /products/:id` → edición protegida
- [x] `DELETE /products/:id` → baja lógica (`isActive=false`)
- [x] `GET /products/inactive` → listar archivados
- [x] `PUT /products/:id/restore` → restaurar (`isActive=true`)
- [x] Integración de rutas en `index.js` con rate-limit independiente

**Criterio de cierre:** CRUD funcional y consistente entre backend y panel admin.

---

## 🔐 Épica 3 — Validación, errores y seguridad básica

**Meta:** garantizar integridad de datos y coherencia de errores.  
**Estado actual:**
- [x] Middleware `adminAuth.js` basado en `Authorization: Basic`
- [x] `errorHandler.js` → respuesta estándar `{ error: "mensaje" }`
- [x] `logger.js` → log compacto con método/ruta/tiempo
- [x] `express-rate-limit` aplicado por prefijo
- [x] Validaciones mínimas en `POST /products`
- [x] `try/catch` y control global de errores
- [x] `mongoose.connection.on("error")` con salida limpia

**Criterio de cierre:** ningún input no validado rompe la API ni genera errores no capturados.

---

## 🌱 Épica 4 — Seed y datos de ejemplo

**Meta:** disponer de un set reproducible de productos de prueba.  
**Estado actual:**
- [x] Script `scripts/seedProducts.js` con `_seedTag` identificador
- [x] Limpieza controlada de seeds duplicados

**Criterio de cierre:** se puede regenerar el entorno de demo sin duplicidades.

---

## ☁️ Épica 5 — Despliegue y mantenimiento (en curso)

**Meta:** backend corriendo de forma estable en Render (free tier).  
**Estado actual:**
- [ ] Configuración Render conectada a GitHub
- [ ] Variables de entorno (`MONGO_URI`, `ADMIN_KEY`, `ALLOWED_ORIGINS`, `PORT`)
- [ ] Prueba de comunicación con frontend (Vercel)
- [ ] Documentación de la URL final

**Criterio de cierre:** API accesible para frontend en producción.

---

## 🧾 Épica 6 — Documentación técnica

**Meta:** mantener trazabilidad del backend y facilitar su mantenimiento.  
**Estado actual:**
- [x] README raíz actualizado con scripts y estructura
- [ ] `docs/api_endpoints.md` (resumen sin ejemplos de ejecución)
- [ ] Guía rápida de despliegue en Render
- [ ] Checklist QA final
- [ ] Bitácoras sincronizadas (`resumenDiaX.md`)

**Criterio de cierre:** el backend puede ser entendido y mantenido por cualquier desarrollador externo.

---

## 🔧 Variables de entorno (.env)

```ini
PORT=4000
MONGO_URI=mongodb+srv://<user>:<pass>@<cluster>/<db>
ADMIN_KEY=clave_super_duper_segura
ALLOWED_ORIGINS=http://localhost:5173,https://obrador180.vercel.app
````

> **Nota:** el valor de `ADMIN_KEY` debe coincidir con `VITE_ADMIN_KEY` en el frontend para permitir operaciones protegidas.

---

## 📊 Estado general

* **Versión:** `v0.6`
* **Avance estimado:** ~80 %
* **Pendientes para v0.7:**

  * Deploy remoto (Render + Vercel)
  * Documentación `api_endpoints.md`
  * Endpoint `/orders` (fase experimental)

> El backend se considera estable, con CRUD validado y seguridad mínima suficiente para entorno de producción limitada (MVP).
> La prioridad pasa a ser el despliegue y las pruebas de comunicación con el frontend.

---