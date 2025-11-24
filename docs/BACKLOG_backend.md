# ⚙️ Backlog Backend — Obrador 180 graus (MVP)

**Versión actual:** `v0.9 – Admin estable + métricas + UTF-8 saneado`
**Última actualización:** 25 nov 2025

> **Stack:** Node.js · Express 5 · Mongoose · MongoDB Atlas
> **Objetivo:** API segura, estable y sin sorpresas.
> CORS robusto, Auth firme, endpoints protegidos y sin cache, y soporte completo para el Dashboard administrativo.

---

# 📁 Estructura real del backend

```bash
backend/
├─ middleware/
│  ├─ adminAuth.js
│  ├─ noStore.js
│  ├─ errorHandler.js
│  └─ logger.js
│
├─ models/
│  └─ Product.js
│
├─ routes/
│  ├─ products.js
│  └─ admin.js              # /admin/ping + /admin/stats
│
├─ scripts/
│  └─ seedProducts.js
│
├─ index.js                 # CORS estable + OPTIONS wildcard + anti-cache admin
├─ .env
└─ package.json
```

---

# 🧭 Épica 1 — Configuración base y arquitectura

**Meta:** servidor Express 5 funcional, modular y libre de fallos de preflight.

### Estado actual

* [x] Express 5 + `"type": "module"`
* [x] Conexión a MongoDB Atlas estable
* [x] CORS robusto:

  * whitelist desde `.env`
  * `allowedHeaders` extendido (`Content-Type, Authorization, Cache-Control, Pragma`)
  * `app.options("/:path*")` para evitar errores de regexp
* [x] Middleware global `noStore` aplicado a rutas admin
* [x] `/health` con estado DB
* [x] Logging útil (método, ruta, ms)

**Criterio de cierre:** 0 fallos de Auth, CORS o preflight desde Vercel.

---

# 🧩 Épica 2 — Modelo y rutas de productos

**Meta:** CRUD consistente con soft delete y soporte a restauración desde admin.

### Estado actual

* [x] Modelo `Product` con timestamps
* [x] Endpoints admin/producto:

  * GET `/products` (solo activos)
  * GET `/products/inactive`
  * POST `/products`
  * PUT `/products/:id`
  * DELETE `/products/:id` → soft delete
  * PUT `/products/:id/restore`
* [x] Integración completa con `AdminForm` / `AdminList` (React)
* [x] Validación mínima coherente
* [x] Valores devueltos listos para frontend sin massaging innecesario

**Criterio de cierre:** CRUD controlado, sin duplicados y sin comportamientos ambiguos.

---

# 🔐 Épica 3 — Autenticación, seguridad y errores

**Meta:** proteger las rutas críticas y garantizar respuestas consistentes.

### Estado actual

* [x] `adminAuth.js` → Basic Auth (clave única desde ENV)
* [x] `noStore.js` → evita caché en rutas admin
* [x] CORS + OPTIONS sin fallos (local + producción)
* [x] Errores homogéneos en JSON
* [x] Rate-limit por ruta
* [x] `admin/ping` utilizado desde frontend (AdminLogin + AdminGuard)

**Criterio de cierre:** rutas admin 0% cacheables y 100% autenticadas.

---

# 📊 Épica 4 — Métricas y Dashboard (v0.8.x → vigente)

**Meta:** estadísticas rápidas y confiables para el panel.

### Estado actual

* [x] `GET /admin/stats` con:

  * `total`
  * `active`
  * `inactive`
  * `lastUpdate`
* [x] Protección completa (`adminAuth + noStore`)
* [x] Queries paralelas (`Promise.all`)
* [x] Errores controlados → `{ error: "stats_failed" }`
* [x] Confirmado funcionamiento en producción y auto-sync con frontend

**Criterio de cierre:** Dashboard recibe y refresca métricas sin intervención.

---

# 🌱 Épica 5 — Seed y datos de ejemplo

**Meta:** reproducibilidad local y para demos.

### Estado actual

* [x] `seedProducts.js` con `_seedTag`
* [x] Limpieza de duplicados
* [x] Dataset seguro para desarrollo sin romper productos reales

**Criterio de cierre:** regeneración reproducible.

---

# ☁️ Épica 6 — Despliegue y mantenimiento

**Meta:** backend operativo en Render, estable y sin problemas de origen cruzado.

### Estado actual

* [x] Backend desplegado en Render
* [x] ENV configurados (`MONGO_URI`, `ADMIN_KEY`, `ALLOWED_ORIGINS`)
* [x] Integración estable con Vercel (frontend)
* [x] CORS validado con flujo admin completo
* [x] Anti-cache correctamente aplicado en admin

### Pendiente

* [ ] Documentar flujo completo de deploy
* [ ] Logging optimizado para producción
* [ ] Preparar dominio final + SSL

**Criterio de cierre:** API accesible en dominio final sin ajustes manuales.

---

# 🧾 Épica 7 — Documentación técnica

**Meta:** permitir onboarding en 5 minutos a cualquier dev externo.

### Estado actual

* [x] README raíz actualizado
* [ ] `docs/api_endpoints.md`
* [ ] Guía Render (deploy/rollback)
* [ ] QA checklist backend
* [ ] Historial completo de fixes v0.6→v0.9

**Criterio de cierre:** backend autoexplicable sin acudir al chat.

---

# 🔧 Variables de entorno (.env)

```ini
PORT=4000
MONGO_URI=mongodb+srv://<user>:<pass>@<cluster>/<db>
ADMIN_KEY=clave_super_segura
ALLOWED_ORIGINS=http://localhost:5173,https://obrador180.vercel.app
```

> `ADMIN_KEY` debe ser idéntica a `VITE_ADMIN_KEY` en el frontend.

---

# 📊 Estado general del backend

**Versión:** `v0.9`
**Avance:** ~92 %

**Backend hoy:**

* 🟢 CRUD completo
* 🟢 Auth estable
* 🟢 CORS + preflight sólido
* 🟢 Métricas (`/admin/stats`) operativas
* 🟢 No-store en rutas críticas
* 🟢 Integración perfecta con Dashboard + auto-sync

**Prioridad inmediata:** documentación final + flujo deploy + dominio/SSL.

---