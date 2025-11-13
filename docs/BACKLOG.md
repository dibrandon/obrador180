# 📋 Backlog General – Proyecto Obrador 180 graus MVP

**Versión actual:** `v0.8.1 – Dashboard & Admin Auto-Sync`  
**Última actualización:** **13 de noviembre de 2025**  
**Avance estimado:** ~85 %

> Documento maestro del proyecto. Resume la visión, los objetivos, las áreas de trabajo y los entregables esperados del MVP.  
> Los detalles técnicos y tareas específicas están en los backlogs dedicados de **backend** y **frontend**.

---

## 🧭 Visión General

**Objetivo:**  
Reforzar la identidad artesanal del obrador mediante una plataforma web moderna, simple y visualmente coherente, que permita mostrar el catálogo real de productos y recibir encargos por WhatsApp.

**Enfoque:**

- Arquitectura **MERN**
- UI artesanal, mobile-first, sin frameworks externos
- MVP funcional en 4 semanas
- Entregable: versión pública navegable y autogestionable

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
````

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
* [x] **Infra de Auth refinada (AdminGuard + verify + offline mode)**

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
* [x] **Nuevo endpoint `/admin/stats` con conteos paralelos + lastUpdate**
* [x] **Endpoint protegido y anti-cache probado en local y producción**

### Pendiente

* [ ] Endpoint `/orders` (no MVP)
* [ ] Documentación API en Markdown
* [ ] Logging refinado para producción
* [ ] Dominio final + SSL

---

## 3️⃣ **Frontend UI & Experiencia**

> Detalle en `BACKLOG_FRONTEND.md`

### Completado

* [x] Catálogo conectado al backend
* [x] Subida de imágenes (Cloudinary unsigned)
* [x] AdminForm: alta/edición con preview
* [x] AdminList: edición, baja lógica y restauración
* [x] Login admin completo
* [x] AdminGuard con:

  * verificación de clave
  * modo offline
  * no-store en requests
  * manejo diferenciado de errores
* [x] Manejo de “Servidor no disponible”
* [x] Preflight estable gracias a allowedHeaders extendido
* [x] Primera versión UI admin usable
* [x] **Dashboard administrativo con estadísticas reales**
* [x] **Sistema de eventos internos (auto-sync catálogo ↔ dashboard)**
* [x] Navegación SPA completa entre Dashboard y Panel
* [x] Rutas admin refinadas y consistentes con Auth

### Pendiente (v0.9)

* [ ] Mejoras visuales en el panel admin
* [ ] Estado de carga visible en acciones CRUD
* [ ] Home público inicial (presentación + CTA WhatsApp)
* [ ] Ajuste tipográfico y colores finales
* [ ] Contacto + ubicación
* [ ] Primer refinamiento responsive

---

## 4️⃣ **Infraestructura y Deploy**

### Completado

* [x] MongoDB Atlas (Free Tier)
* [x] Cloudinary funcionando producción/local
* [x] Preflight corregido
* [x] CORS estable en todos los flujos
* [x] Autenticación pasando por backend estable (no caching)
* [x] Render backend
* [x] Vercel frontend
* [x] Conexión entre entornos
* [x] Dashboard funcionando en producción con stats reales
* [x] Fix al allowedOrigins que rompía `/admin/ping` en Vercel

### Pendiente

* [ ] Dominio final + CNAME
* [ ] Optimización de rendimiento
* [ ] Logs de acceso admin (opcional)

---

## 5️⃣ **Documentación y QA**

### Completado

* [x] README general actualizado a v0.8.1
* [x] Backlogs frontend y backend
* [x] Resúmenes día 1–8
* [x] QA completo Día 8: Auth, Stats, Dashboard, Sync, Navegación SPA
* [x] Registro de bugs resueltos (CORS, OPTIONS, AdminGuard, no-store)

### Pendiente

* [ ] Manual para el cliente
* [ ] QA móvil + escritorio
* [ ] Preparación presentación MVP

---

# 🚀 Hitos del Proyecto

| Fase     | Objetivo                          | Estado                      |
| -------- | --------------------------------- | --------------------------- |
| Semana 1 | Setup técnico + seed de productos | ✔️                          |
| Semana 2 | Catálogo visible + WhatsApp       | ✔️                          |
| Semana 3 | Back-office con CRUD completo     | ✔️ (`v0.6`)                 |
| Semana 4 | Dashboard + Auth refinado         | ✔️ (`v0.8.1`)               |
| Semana 5 | UI final + Home + cierre MVP      | 🔄 en progreso (`v0.9-pre`) |

---

# 🧱 Estado global del proyecto

**Versión actual:** `v0.8.1 – Dashboard & Admin Auto-Sync`
**Avance:** ~85 %
**Última actualización:** **13 noviembre 2025**

🟢 Backend estable y autenticado
🟢 Panel admin completo con Dashboard reactivo
🟢 Sincronización automática catálogo ↔ dashboard
🟠 Falta Home público + refinamiento estético
🔵 MVP público previsto: semana del 18 noviembre 2025

---

# Post-MVP Frontend Optimization

```md
- Revisar tamaño del bundle tras `npm run build`
- Code-splitting para rutas admin (React.lazy + Suspense)
- Thumbnails Cloudinary: `f_auto,q_auto,w_400,h_400,c_fill`
- Lazy-loading de imágenes
- Evaluar Cache-Control público para GET /products
```

---

```

---

Si querés, ahora preparo también:

- **BACKLOG_BACKEND.md actualizado a v0.8.1**  
- **BACKLOG_FRONTEND.md actualizado a v0.8.1**  
- **Diskette Día 9 (v0.9-pre)**

Decime cuál sigue.
```

