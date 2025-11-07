# 🎨 Backlog Frontend — Obrador 180 graus (MVP)  
**Versión actual:** `v0.6 – Back-office funcional conectado`  
**Última actualización:** 7 nov 2025  

> **Stack:** React + Vite · CSS artesanal con variables · Mobile-first real · Sin frameworks visuales.  
> **Modo de trabajo:** por **Bloques** (4×55’ + 5’ descanso) que empujan las **Épicas**.  
> **Objetivo:** catálogo usable en móvil y **panel administrativo completo** para autogestión del cliente.

---

## 🔧 Convenciones y flujo

* **Bloques diarios:** 4 × (55’ foco + 5’ descanso).  
* **Prioridad:** *MVP funcional > florituras visuales*.  
* **Commits:** `type(scope): mensaje` (ej. `feat(frontend): …`).  
* **Versionado:**  
  - `v0.5` → frontend conectado y visible  
  - `v0.6` → CRUD administrativo completo  
  - Próximo hito → `v0.7` (auth + dashboard)

---

## 📁 Estructura de carpetas real

```

frontend/
├─ public/
├─ src/
│  ├─ assets/
│  │   └─ react.svg
│  │
│  ├─ components/
│  │   ├─ AdminForm.jsx
│  │   ├─ AdminList.jsx
│  │   ├─ HeaderNav.jsx
│  │   ├─ ProductCard.jsx
│  │   ├─ ProductGrid.jsx
│  │   └─ ViewToggle.jsx
│  │
│  ├─ lib/
│  │   ├─ api.js
│  │   └─ uploadImage.js
│  │
│  ├─ pages/
│  │   ├─ Admin.jsx
│  │   └─ NotFound.jsx
│  │
│  ├─ routes/
│  │   ├─ AdminGuard.jsx
│  │   └─ routes.jsx
│  │
│  ├─ styles/
│  │   ├─ admin.css
│  │   ├─ base.css
│  │   ├─ layout.css
│  │   ├─ reset.css
│  │   └─ tokens.css
│  │
│  ├─ App.css
│  ├─ App.jsx
│  ├─ main.jsx
│  └─ vite.config.js
│
└─ .env

```

---

## 🧾 Registro de decisiones (ADR breve)

1. **Sin `index.css`** → eliminado; se importan capas explícitas en `main.jsx`.  
2. **Grid > Flexbox** → catálogo 2D y responsive real.  
3. **Pre-boot de densidad** en `index.html` (sin FOUC).  
4. **Imágenes `object-fit: cover`** → cards uniformes y consistentes.  
5. **Cloudinary unsigned** → preset `obrador_products` con auto-upload.  
6. **Autenticación básica** → `VITE_ADMIN_KEY` en rutas mutadoras.  
7. **AdminForm y AdminList** comparten estilo unificado (`admin.css`).  
8. **Estética “roco abuela noventas”**: fondo cálido, salmón pastel y dorados art déco.  

---

## ✅ Estado actual

* Catálogo público conectado y responsive.  
* Subida de imágenes a Cloudinary (unsigned preset).  
* Panel admin completo:
  - Alta (`AdminForm`) con validaciones y upload automático.  
  - Edición, baja y restauración (`AdminList`).  
* API frontend unificada (`api.js` + `handle()` común).  
* Estilos coherentes mobile-first y UI limpia.  
* Feedback visual con toasts, loaders y mensajes contextuales.  

**Versión:** `v0.6` · **Avance:** ≈ 85 % · **Fecha:** 7 nov 2025  

---

## 🧱 Bloques del Día 5

**B1:** Integrar Cloudinary auto-upload.  
**B2:** Refinar UX + estilos admin.  
**B3:** CRUD completo (edit/baja/restore).  
**B4:** QA + commits finales + documentación (`resumenDia5.md`).

---

## 🧭 Épicas y tareas

### ÉPICA 1 – Catálogo público  
- [x] Grid responsive de productos activos.  
- [x] Precio formateado (EUR).  
- [x] CTA WhatsApp con mensaje dinámico.  
- [ ] Filtro o búsqueda básica *(posv. 0.7)*.  

### ÉPICA 2 – Back-office  
- [x] AdminForm con validaciones y subida Cloudinary.  
- [x] AdminList con edición en línea.  
- [x] Baja lógica (`isActive=false`).  
- [x] Restauración de productos archivados.  
- [x] Integración con backend protegido (`ADMIN_KEY`).  
- [ ] Dashboard de métricas *(v0.7)*.  
- [ ] Login y sesión *(v0.7)*.  

### ÉPICA 3 – Estilo y experiencia  
- [x] Unificación de estilos admin/public.  
- [x] Refinamiento mobile (viewport, tipografía, spacing).  
- [ ] Mejoras desktop grid *(v0.7)*.  
- [ ] Footer con versión y branding *(v0.7)*.  

---

## 🧪 Criterios globales

* Mobile-first real (sin saltos de layout).  
* Persistencia local (`localStorage`) para preferencias.  
* Llamadas asíncronas seguras con feedback visual.  
* UI predecible para usuarios no técnicos.  
* Navegación sin FOUC ni glitches.  

---

## 📌 Próximos pasos (v0.7)

1. 🔐 Implementar login simple (JWT o clave admin).  
2. 📊 Dashboard básico (productos activos, archivados, últimos cambios).  
3. 🖥️ Refinar vista desktop y tipografía global.  
4. 🧾 Footer con versión (`v0.7`) y enlace a WhatsApp Business.  
5. 🌐 Deploy dual (Vercel + Render).  

---

## 🧊 Icebox / Diferido (post-MVP)

* Página “Sobre nosotros”.  
* Página “Contacto”.  
* Filtros avanzados por tipo de producto.  
* Animaciones sutiles (Framer Motion).  
* Analítica básica (Matomo / Plausible).  
* Internacionalización (ES / CAT).  

---

📦 **Estado general:**  
Frontend listo para cierre de bloque 2 (`v0.6`).  
Próximo sprint → **v0.7: Dashboard + Auth + Deploy.**
```