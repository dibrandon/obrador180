Aquí tienes tu **Backlog General actualizado a la versión actual real del proyecto**, coherente con todo lo que hicimos *hasta este mismo minuto* (incluye Auth, CORS fix, AdminGuard, no-store, preflight, Cloudinary setup, etc.).

He actualizado:

* La **versión** a `v0.7-pre — Authentication & Admin Stability`
* La **última actualización** a **13 noviembre 2025**
* El **avance estimado** (≈ 75 %)
* La sección de **Backend** y **Frontend** con las nuevas tareas completadas
* La sección de **Infraestructura** con Cloudinary + preflight + CORS ya hecho
* Añadido el bloque de **Auth & estabilidad admin**
* Unido el bloque de **Post-MVP Frontend Optimization** sin duplicarlo
* Ajustado los hitos y la fase actual

---

# 📋 Backlog General – Proyecto Obrador 180 graus MVP

**Versión actual:** `v0.7-pre – Authentication & Admin Stability`
**Última actualización:** **13 de noviembre de 2025**
**Avance estimado:** ~75 %

> Documento maestro del proyecto. Resume la visión, los objetivos, las áreas de trabajo y los entregables esperados del MVP.
> Los detalles técnicos y tareas específicas están en los backlogs dedicados de **backend** y **frontend**.

---

## 🧭 Visión General

**Objetivo:**
Reforzar la identidad artesanal del obrador mediante una plataforma web moderna, simple y visualmente coherente, que permita mostrar el catálogo real de productos y recibir encargos por WhatsApp.

**Enfoque:**

* Arquitectura **MERN**
* UI artesanal, mobile-first, sin frameworks externos
* MVP funcional en 4 semanas
* Entregable: versión pública navegable y autogestionable

---

## 🎯 Objetivos del MVP

| Categoría     | Meta principal                                |
| ------------- | --------------------------------------------- |
| Comunicación  | Reposicionar la marca como obrador artesanal  |
| Funcionalidad | Catálogo real + contacto directo por WhatsApp |
| Tecnología    | MERN custom, sin plantillas                   |
| Mantenimiento | Backend simple, seguro y fácil de operar      |
| Escalabilidad | Base lista para pedidos online v2             |

---

## ⚙️ Estructura General del Proyecto

```bash
obrador180/
├── frontend/   # UI pública + panel admin
├── backend/    # API + lógica + conexión DB
├── docs/       # Documentación y resúmenes
├── design/     # Paleta, tipografías, referencias
└── README.md
```

---

# 🧩 Epics Globales

---

## 1️⃣ **Arquitectura y Setup**

* [x] Repositorio inicial y estructura MERN
* [x] Variables de entorno (.env frontend + backend)
* [x] Conexión completa local
* [x] Cloudinary configurado (`obrador_products`, unsigned)
* [x] CORS con whitelist dinámica
* [x] Solución al bug Express 5 (`app.options("/:path*")`)
* [x] No-store global para rutas admin

---

## 2️⃣ **Backend API & Lógica**

> Detalle en `BACKLOG_BACKEND.md`

### Completado

* [x] Endpoints básicos `/health`, `/products`
* [x] Modelo `Product` (name, price, desc, image, isActive)
* [x] CRUD completo con **soft delete**
* [x] Rutas admin (`/admin/ping`)
* [x] Middleware `adminAuth` con Basic Auth
* [x] Middleware `noStore` para evitar caches en admin
* [x] Rate-limits por ruta
* [x] CORS fix para permitir `Cache-Control` y `Pragma`
* [x] Corrección de preflight OPTIONS fallido
* [x] Backend estable con Auth funcional

### Pendiente

* [ ] Endpoint `/orders` (no MVP)
* [ ] Documentación API en Markdown
* [ ] Deploy backend (Render)
* [ ] Logging refinado para producción

---

## 3️⃣ **Frontend UI & Experiencia**

> Detalle en `BACKLOG_FRONTEND.md`

### Completado

* [x] Catálogo conectado al backend
* [x] Subida de imágenes (Cloudinary unsigned)
* [x] AdminForm: alta/edición con preview
* [x] AdminList: edición, baja lógica y restauración
* [x] Login admin
* [x] AdminGuard con:

  * verificación de clave
  * modo offline
  * no-store en requests
  * manejo diferenciado de errores
* [x] Manejo de “Servidor no disponible”
* [x] Preflight estable gracias a allowedHeaders extendido
* [x] Primera versión UI admin usable

### Pendiente (v0.7)

* [ ] Dashboard simple (conteo de activos/inactivos)
* [ ] Home público (presentación + CTA WhatsApp)
* [ ] Contacto + mapa
* [ ] Identidad visual final (tipografías y colores)
* [ ] Deploy frontend (Vercel)

---

## 4️⃣ **Infraestructura y Deploy**

### Completado

* [x] MongoDB Atlas (Free Tier)
* [x] Cloudinary funcionando en producción/local
* [x] Preflight corregido
* [x] CORS estable en todos los flujos
* [x] Autenticación pasando por backend estable (no caching)
* [x] Render para backend
* [x] Vercel para frontend
* [x] Conexión entre entornos
* [ ] Dominio final + SSL
* [ ] Optimización de rendimiento

---

## 5️⃣ **Documentación y QA**

### Completado

* [x] README general
* [x] Backlogs frontend y backend
* [x] Resúmenes día 1–6
* [x] Registro de bugs resueltos (CORS, OPTIONS, Auth, no-store)

### Pendiente

* [ ] Manual para el cliente
* [ ] QA completo móvil + escritorio
* [ ] Preparación presentación MVP

---

# 🚀 Hitos del Proyecto

| Fase     | Objetivo                          | Estado                      |
| -------- | --------------------------------- | --------------------------- |
| Semana 1 | Setup técnico + seed de productos | ✔️                          |
| Semana 2 | Catálogo visible + WhatsApp       | ✔️                          |
| Semana 3 | Back-office con CRUD completo     | ✔️ (`v0.6`)                 |
| Semana 4 | Dashboard + Auth + Deploy         | 🟡 en progreso (`v0.7-pre`) |

---

# 🧱 Estado global del proyecto

**Versión actual:** `v0.7-pre – Authentication & Admin Stability`
**Avance:** ~75 %
**Última actualización:** **13 noviembre 2025**

🟢 **Backend estable y autenticado**
🟢 **Panel admin usable**
🟠 **Falta Dashboard + Home + Deploy**
🔵 **MVP público previsto: semana del 18 noviembre 2025**

---

# Post-MVP Frontend Optimization

```md
- Revisar tamaño del bundle tras `npm run build`.
- Code-splitting para rutas admin (React.lazy + Suspense).
- Thumbnails Cloudinary: `f_auto,q_auto,w_400,h_400,c_fill`.
- Lazy-loading de imágenes.
- Evaluar Cache-Control público para GET /products.
```

---
