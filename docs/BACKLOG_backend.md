# ⚙️ Backlog Backend — Obrador 180 graus (MVP)
**Versión actual:** `v0.8.1 – Admin estable + métricas (stats) + CORS/no-store listo`
**Última actualización:** 13 nov 2025  

> **Stack:** Node.js · Express 5 · Mongoose · MongoDB Atlas  
> **Objetivo:** API segura, predecible y sin sorpresas para el frontend, con Auth estable, CORS robusto y endpoints de administración preparados para producción.

---

## 📁 Estructura real del backend

```bash
backend/
├─ middleware/
│  ├─ adminAuth.js
│  ├─ noStore.js          # NUEVO: evita cache del panel admin
│  ├─ errorHandler.js
│  └─ logger.js
│
├─ models/
│  └─ Product.js
│
├─ routes/
│  ├─ products.js
│  └─ admin.js            # NUEVO: /admin/ping + /admin/stats
│
├─ scripts/
│  └─ seedProducts.js
│
├─ index.js               # CORS fix + OPTIONS wildcard + auth estable
├─ .env
└─ package.json
````

---

# 🧭 Épica 1 — Configuración base y arquitectura

**Meta:** servidor Express funcional, modular y sin errores de preflight.

### Estado actual

* [x] Express 5 + `"type": "module"`
* [x] Conexión MongoDB Atlas estable
* [x] CORS robusto con:

  * whitelist desde `.env`
  * `allowedHeaders` expandido (`Content-Type, Authorization, Cache-Control, Pragma`)
  * manejo correcto de OPTIONS manual (`app.options("/:path*", ...)`)
* [x] Middleware global `noStore` en rutas admin
* [x] `/health` devuelve estado de base de datos
* [x] Logging compacto (método/ruta/tiempo)

**Criterio de cierre:** cero fallos de CORS ni preflight en frontend admin.

---

# 🧩 Épica 2 — Modelo y rutas de productos

**Meta:** CRUD completo y coherente para el panel administrativo.

### Estado actual

* [x] Modelo `Product` con:

  * `name`, `description`, `price`, `image`, `isActive`
  * `timestamps`
* [x] Endpoints:

  * `GET /products` → solo activos
  * `GET /products/inactive`
  * `POST /products` (admin)
  * `PUT /products/:id` (admin)
  * `DELETE /products/:id` → soft delete
  * `PUT /products/:id/restore`
* [x] Validación mínima en alta/edición
* [x] Integración total con frontend (`AdminForm` / `AdminList`)

**Criterio de cierre:** CRUD funcional, estable y sin duplicados.

---

# 🔐 Épica 3 — Autenticación, seguridad y errores

**Meta:** proteger operaciones críticas y garantizar respuestas claras.

### Estado actual

* [x] `adminAuth.js` → Basic Auth (clave única desde ENV)
* [x] `noStore.js` evita caché en rutas admin
* [x] CORS completo
* [x] Manejo estandarizado de errores en JSON
* [x] Rate-limit por grupo de rutas
* [x] Prueba/diagnóstico:

  * `/admin/ping` → prueba rápida del guard admin
  * Frontend integrado (AdminLogin + AdminGuard)

**Criterio de cierre:** ningún endpoint admin se sirve cacheado o sin auth.

---

# 📊 Épica 4 — Métricas y Dashboard (NUEVO v0.8.x)

**Meta:** ofrecer datos al panel admin para estadísticas rápidas.

### Estado actual

* [x] `GET /admin/stats` con:

  * `total`
  * `active`
  * `inactive`
  * `lastUpdate`
* [x] Respuesta protegida con `adminAuth + noStore`
* [x] Queries paralelas con `Promise.all`
* [x] Errores controlados → `500 { error: "stats_failed" }`

**Criterio de cierre:** Dashboard recibe estadísticas instantáneas y confiables.

---

# 🌱 Épica 5 — Seed y datos de ejemplo

**Meta:** disponer de dataset reproducible.

### Estado actual

* [x] Script `seedProducts.js` con `_seedTag`
* [x] Limpieza de duplicados
* [x] Ideal para demos y pruebas locales

**Criterio de cierre:** entorno regenerable sin afectar productos reales.

---

# ☁️ Épica 6 — Despliegue y mantenimiento

**Meta:** backend funcionando en Render sin problemas de cache ni CORS.

### Estado actual

* [x] Backend desplegado en Render
* [x] Configuración de ENV:

  * `MONGO_URI`
  * `ADMIN_KEY`
  * `ALLOWED_ORIGINS`
  * `PORT`
* [x] Comunicación con frontend en Vercel
* [x] CORS validado en producción

### Pendiente

* [ ] Documentar flujo deploy (Render)
* [ ] Ajustes menores de logging en producción

**Criterio de cierre:** API accesible de forma estable desde el dominio del frontend.

---

# 🧾 Épica 7 — Documentación técnica

**Meta:** facilitar mantenimiento y transferencia del proyecto.

### Estado actual

* [x] README raíz del repo actualizado
* [ ] `docs/api_endpoints.md`
* [ ] Guía rápida para Render
* [ ] QA checklist backend
* [ ] Bitácoras sincronizadas (día 1–8)

**Criterio de cierre:** backend autoexplicable en 5 minutos para un dev externo.

---

# 🔧 Variables de entorno (.env)

```ini
PORT=4000
MONGO_URI=mongodb+srv://<user>:<pass>@<cluster>/<db>
ADMIN_KEY=clave_super_duper_segura
ALLOWED_ORIGINS=http://localhost:5173,https://obrador180.vercel.app
```

> **Nota:** `ADMIN_KEY` debe coincidir con `VITE_ADMIN_KEY` del frontend.

---

# 📊 Estado general del backend

* **Versión:** `v0.8.1`
* **Avance:** ~90 %
* **Backend actual:**
  🟢 CRUD completo
  🟢 Auth estable
  🟢 CORS + preflight sin fallos
  🟢 Endpoint `/admin/stats` integrado
  🟢 No-store correcto para admin
  🟢 Conectado a Dashboard + auto-sync

**Prioridad inmediata (próximo sprint v0.9):** documentación final + mejoras del flujo deploy.

---