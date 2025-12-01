# 📋 Backlog General – Proyecto Obrador 180 graus MVP

**Versión actual:** `v0.9 – Home + Carta + Nosotros + Producto destacado + Admin renovado`  
**Última actualización:** **1 de diciembre de 2025**  
**Avance estimado:** ~95 %

> Documento maestro del proyecto. Resume la visión global, las metas y el estado real del MVP.  
> Los detalles técnicos están desglosados en los backlogs específicos de **backend** y **frontend**.

---

# 🧭 Visión General

**Objetivo:**  
Consolidar la identidad artesanal del obrador mediante una web clara, elegante y funcional que permita:

* mostrar catálogo real de productos,
* recibir encargos por WhatsApp,
* gestionar la carta desde un panel admin simple y seguro.

**Enfoque del MVP:**

* Stack **MERN**
* UI propia, mobile-first, estética **Odilio Vogue Style**
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
````

---

# 🧩 Epics Globales

---

## 1️⃣ Arquitectura y Setup

* [x] Repositorio MERN
* [x] `.env` frontend + backend
* [x] Cloudinary unsigned + carpeta `obrador/products`
* [x] CORS con whitelist dinámica
* [x] Fix Express 5 para OPTIONS
* [x] Middleware `noStore` para admin
* [x] Infra de Auth sólida (AdminGuard, verify, offline mode)

**Estado:** ✔️ Completo

---

## 2️⃣ Backend API & Lógica

> Ver `BACKLOG_BACKEND.md` para desglose detallado.

### Completado

* [x] Modelo `Product`
* [x] Endpoints `/products` con CRUD + soft delete
* [x] Rutas admin `/admin/ping`, `/admin/stats`
* [x] Middleware `adminAuth`
* [x] Cache-Control + `Pragma` en `allowedHeaders`
* [x] Fix OPTIONS preflight
* [x] Dashboard stats en producción
* [x] API estable con Auth + anti-cache + sync

### Pendiente (post-MVP)

* [ ] Endpoint `/orders` (no MVP)
* [ ] Documentación API Markdown
* [ ] Logging producción
* [ ] Dominio final + SSL

---

## 3️⃣ Frontend UI & Experiencia

> Detalle en `BACKLOG_FRONTEND.md`.

### Completado

**Admin / Backoffice:**

* [x] Login completo (clave única `ADMIN_KEY`)
* [x] `AdminGuard` con verify + offline mode
* [x] CRUD productos (alta / editar / baja lógica / restaurar)
* [x] Subida imágenes vía Cloudinary
* [x] Dashboard con KPIs reales
* [x] Auto-sync catálogo ↔ dashboard mediante sistema de eventos internos
* [x] Navegación SPA estable
* [x] Mensajes y estados saneados UTF-8
* [x] Copys administrativos actualizados
* [x] Panel admin renovado:

  * [x] `AdminNav` para navegar vistas (activos / pausados / stats)
  * [x] `AdminStatusBar` con totales y última modificación
  * [x] `AdminList` con vista combinada activos/archivados, edición inline y alta/baja lógica
* [x] Admin 100% usable para gestionar la carta real

**Frontend público:**

* [x] Home con hero y copys finales (Odilio Vogue style)
* [x] Sección Carta → conectada al backend
* [x] Sección Nosotros → texto editorial final
* [x] Sección Encargos → CTA WhatsApp
* [x] Componentes `ProductCard` y `ProductGrid` robustos (precio y CTA WA seguros)
* [x] Mensaje estándar “Cargando productos…”
* [x] 404 con copy editorial
* [x] Encoding UTF-8 corregido en todo el frontend
* [x] Navbar / header ajustado para móviles pequeños (wrap de pill, padding seguro, sin desbordes ≤480px)
* [x] **Toggle de densidades operativo** en Carta (`compact / cozy / roomy`):

  * [x] Descripciones visibles correctamente según densidad
  * [x] Limpieza de reglas `root[data-density]` sobrantes en `layout.css`
* [x] **Producto destacado** (`FeaturedProduct`): muestra el último producto creado entre el hero y la carta
* [x] **PromoCard Instagram**: bloque de promo con enlace a reel/post de IG
* [x] **Footer unificado** (`Footer.jsx`) reutilizado en Home y Carta (versión + nombre obrador, base para legal)

### Pendiente (v0.9 → v1.0)

* [ ] QA móvil completo (iOS + Android) y ajustes finos de spacing
* [ ] Copy legal simple en footer (aviso legal / privacidad básico)
* [ ] Microanimaciones suaves en CTA y hover (sin romper performance)
* [ ] Página “Contacto / Ubicación” (si el cliente la pide para v1.0)

---

## 4️⃣ Infraestructura y Deploy

### Completado

* [x] Backend en Render
* [x] Frontend en Vercel
* [x] Conexión backend ↔ frontend estable
* [x] Cloudinary producción/local
* [x] Dashboard funcionando en producción
* [x] Fix `allowedOrigins` para `/admin/ping`

### Pendiente

* [ ] Dominio final + DNS + CNAME
* [ ] Optimización de build (análisis bundle, images, etc.)
* [ ] Logs admin opcionales

---

## 5️⃣ Documentación y QA

### Completado

* [x] README `v0.9` actualizado
* [x] Backlog backend
* [x] Backlog frontend
* [x] Resúmenes Dia 1–11
* [x] Registro de fixes críticos (Auth, CORS, UTF-8, navbar móvil, densidad)

### Pendiente

* [ ] Manual cliente (uso admin + cómo crear/editar productos)
* [ ] QA móvil completo
* [ ] Preparar guion de demo pública para el cliente

---

# 🚀 Hitos del Proyecto

| Fase     | Objetivo                          | Estado              |
| -------- | --------------------------------- | ------------------- |
| Semana 1 | Setup + primeros productos        | ✔️                  |
| Semana 2 | Catálogo + WhatsApp               | ✔️                  |
| Semana 3 | Backoffice CRUD                   | ✔️ (`v0.6`)         |
| Semana 4 | Dashboard + Auth                  | ✔️ (`v0.8.1`)       |
| Semana 5 | Home, copys, refinamiento general | ✔️ (`v0.9` estable) |
| Semana 6 | QA final + presentación cliente   | ⏳ en curso          |

---

# 🧱 Estado global del proyecto

**Versión actual:** `v0.9 – Frontend público completo + Admin consolidado`
**Avance:** ~95 %
**Última actualización:** 1 diciembre 2025

🟢 Backend estable
🟢 Panel admin completo y coherente (UX renovada)
🟢 Frontend textual y funcional finalizado (incluye producto destacado + promo IG)
🟠 Falta QA móvil + pulido legal/animaciones
🔵 MVP listo para demo final al cliente

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

✔️ **Backlog General actualizado.**