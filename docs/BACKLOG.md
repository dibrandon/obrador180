# 📋 Backlog General – Proyecto Obrador 180 graus MVP

**Versión actual:** `v0.9 – Frontend limpio + Admin estable`
**Última actualización:** **25 de noviembre de 2025**
**Avance estimado:** ~92 %

> Documento maestro del proyecto. Resume la visión global, las metas y el estado real del MVP.
> Los detalles técnicos están desglosados en los backlogs específicos de **backend** y **frontend**.

---

# 🧭 Visión General

**Objetivo:**
Consolidar la identidad artesanal del obrador mediante una web clara, elegante y funcional que permita:

* mostrar catálogo real de productos
* recibir encargos por WhatsApp
* gestionar la carta desde un panel admin simple y seguro

**Enfoque del MVP:**

* Stack **MERN**
* UI propia, mobile-first, estética *Odilio Vogue Style*
* 4–5 semanas de desarrollo
* Entregable: sitio público + panel admin 100% operativo

---

# 🎯 Objetivos del MVP

| Área          | Meta principal                                |
| ------------- | --------------------------------------------- |
| Comunicación  | Reposicionar marca como obrador artesanal     |
| Funcionalidad | Catálogo real + contacto directo por WhatsApp |
| Tecnología    | MERN custom → sin plantillas                  |
| Operatividad  | Admin simple, seguro y estable                |
| Escalabilidad | Base lista para v2 (pedidos online)           |

---

# ⚙️ Estructura del Proyecto

```bash
obrador180/
├── frontend/   # UI pública + panel admin
├── backend/    # API + lógica + conexión DB
├── docs/       # Backlogs, resúmenes diarios, manual cliente
└── design/     # Paleta, referencias, tipografías
```

---

# 🧩 Epics Globales

---

## 1️⃣ **Arquitectura y Setup**

* [x] Repositorio MERN
* [x] .env frontend + backend
* [x] Cloudinary unsigned + carpeta `obrador_products`
* [x] CORS con whitelist dinámica
* [x] Fix Express 5 para OPTIONS
* [x] Middleware `noStore` para admin
* [x] Infra de Auth sólida (AdminGuard, verify, offline mode)

**Estado:** ✔️ Completo

---

## 2️⃣ **Backend API & Lógica**

> Ver `BACKLOG_BACKEND.md` para desglose detallado.

### Completado

* [x] Modelo `Product`
* [x] Endpoints `/products` con CRUD + soft delete
* [x] Rutas admin `/admin/ping`, `/admin/stats`
* [x] Middleware `adminAuth`
* [x] Cache-Control + Pragma en allowedHeaders
* [x] Fix options preflight
* [x] Dashboard stats en producción
* [x] API estable con Auth + anti-cache + sync

### Pendiente

* [ ] Endpoint `/orders` (no MVP)
* [ ] Documentación API Markdown
* [ ] Logging producción
* [ ] Dominio final + SSL

---

## 3️⃣ **Frontend UI & Experiencia**

> Detalle en `BACKLOG_FRONTEND.md`.

### Completado

**Admin:**

* [x] Login completo (clave única)
* [x] AdminGuard con verify + offline mode
* [x] CRUD productos (alta/editar/baja lógica/restaurar)
* [x] Subida imágenes vía Cloudinary
* [x] Dashboard con KPIs reales
* [x] Auto-sync catálogo ↔ dashboard
* [x] Mensajes y estados saneados UTF-8
* [x] Copys administrativos actualizados
* [x] Navegación SPA estable
* [x] Admin 100% usable

**Frontend público:**

* [x] Hero con copys finales
* [x] Sección Carta → conectada al backend
* [x] Sección Nosotros → texto editorial final
* [x] Sección Encargos → CTA WhatsApp
* [x] Componentes ProductCard y ProductGrid robustos (price seguro + WA seguro)
* [x] Carga estándar “Cargando productos...”
* [x] 404 con copy editorial
* [x] Encoding UTF-8 corregido en todo el frontend

### Pendiente (v0.9 → v1.0)

* [ ] Toggle de densidades (Compact / Cozy / Roomy) en cabecera de carta
* [ ] Refinamiento de imágenes (tamaños + placeholders)
* [ ] QA móvil completo (iOS + Android)
* [ ] Footer final + copy legal simple
* [ ] Ajustes finos de spacing (Vogue style)
* [ ] Microanimaciones suaves en CTA
* [ ] Página “Contacto / Ubicación” (si el cliente lo requiere)

---

## 4️⃣ **Infraestructura y Deploy**

### Completado

* [x] Render backend
* [x] Vercel frontend
* [x] Conexión backend ↔ frontend estable
* [x] Cloudinary producción/local
* [x] Dashboard funcionando en producción
* [x] Fix allowedOrigins para `/admin/ping`

### Pendiente

* [ ] Dominio final + DNS + CNAME
* [ ] Optimización de build
* [ ] Logs admin opcionales

---

## 5️⃣ **Documentación y QA**

### Completado

* [x] README v0.9 actualizado
* [x] Backlog backend
* [x] Backlog frontend
* [x] Resúmenes Dia 1–11
* [x] Registro de fixes críticos (Auth, CORS, UTF-8)

### Pendiente

* [ ] Manual cliente (uso admin + cómo crear productos)
* [ ] QA móvil completo
* [ ] Preparar demo pública

---

# 🚀 Hitos del Proyecto

| Fase     | Objetivo                          | Estado                 |
| -------- | --------------------------------- | ---------------------- |
| Semana 1 | Setup + primeros productos        | ✔️                     |
| Semana 2 | Catálogo + WhatsApp               | ✔️                     |
| Semana 3 | Backoffice CRUD                   | ✔️ (`v0.6`)            |
| Semana 4 | Dashboard + Auth                  | ✔️ (`v0.8.1`)          |
| Semana 5 | Home, copys, refinamiento general | 🔄 (`v0.9-pre → v0.9`) |
| Semana 6 | QA final + presentación cliente   | ⏳ en curso             |

---

# 🧱 Estado global del proyecto

**Versión actual:** `v0.9 – Frontend & Admin consolidados`
**Avance:** ~92 %
**Última actualización:** 25 noviembre 2025

🟢 Backend estable
🟢 Panel admin completo y coherente
🟢 Frontend textual y funcional finalizado
🟠 Falta toggle Cozy + QA móvil
🔵 MVP para demo final listo esta semana

---

# Post-MVP Frontend Optimization

```md
- Revisar bundle final tras build
- Code-splitting dinámico en rutas admin
- Thumbnails Cloudinary en productos (f_auto, q_auto, w_400, h_400, c_fill)
- Lazy-loading imágenes
- Evaluar Cache-Control público para GET /products
```

---

# ✔️ Backlog General actualizado.