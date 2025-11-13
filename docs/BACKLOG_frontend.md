# 🎨 Backlog Frontend — Obrador 180 graus (MVP)  
**Versión actual:** `v0.8.1 – Dashboard + Auth refinado + Auto-Sync`  
**Última actualización:** 13 nov 2025  

> **Stack:** React + Vite · CSS artesanal · Mobile-first real · Sin frameworks visuales.  
> **Modo de trabajo:** por **Bloques** (4×55’ + 5’ descanso).  
> **Objetivo:** catálogo impecable en móvil y **panel administrativo fluido, estable y reactivo** para autogestión total del cliente.

---

## 🔧 Convenciones y flujo

* **Bloques diarios:** 4 × (55’ foco + 5’ descanso)  
* **Prioridad:** *MVP funcional > estética avanzada*  
* **Commits:** `type(scope): mensaje`  
* **Versionado:**  
  - `v0.6` → CRUD completo  
  - `v0.7` → Deploy + primeras mejoras de Auth  
  - `v0.8.1` → Dashboard + Auto-Sync + Admin UX refinado  

---

## 📁 Estructura de carpetas real (actualizada)

```bash
frontend/
├─ public/
├─ src/
│  ├─ assets/
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
│  │   ├─ uploadImage.js
│  │   └─ events.js      # NUEVO (auto-sync catálogo ↔ dashboard)
│  │
│  ├─ pages/
│  │   ├─ Admin.jsx
│  │   ├─ AdminLogin.jsx
│  │   ├─ Dashboard.jsx  # NUEVO
│  │   └─ NotFound.jsx
│  │
│  ├─ routes/
│  │   ├─ AdminGuard.jsx
│  │   └─ routes.jsx      # actualizado con /admin/dashboard
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
````

---

## 🧾 Registro de decisiones (ADR breve)

1. **Sin `index.css`** → importación explícita de layers en `main.jsx`.
2. **Grid > Flexbox** → catálogo consistente en todas las densidades.
3. **Pre-boot densidad** en `index.html` (evita FOUC).
4. **Cloudinary unsigned** → cero fricción en el upload.
5. **Autenticación básica refinada** → AdminLogin + AdminGuard + verify + offline mode.
6. **apiFetch unificado** → manejo de `network`, `offline`, `unauthorized`.
7. **Nuevo sistema de eventos** → `emitStatsChanged` / `subscribeStatsChanged`.
8. **Dashboard reactivo** → actualización inmediata sin recargar la SPA.
9. **Rutas admin ordenadas** → `/admin`, `/admin/login`, `/admin/dashboard`.
10. **Estética “roco abuela noventas”**: coherencia visual en botones, cards y spacing.

---

## ✅ Estado actual

### 🟢 Funcionalidades completas

* Catálogo público conectado al backend.
* Subida y renderizado de imágenes (Cloudinary).
* Panel admin completo con SSR-like UX:

  * Crear producto
  * Editar
  * Archivar (baja lógica)
  * Restaurar
* Login admin funcional con clave persistente.
* AdminGuard robusto (offline mode incluido).

### 🟢 Novedades v0.8.1

* **Dashboard administrativo real** con:

  * activos
  * archivados
  * total
  * última modificación
* **Auto-sync catálogo ↔ dashboard** (eventos globales).
* **apiFetch** integrado con:

  * cache-control automático
  * headers admin
  * gestión diferenciada de errores
* **UX de navegación SPA** totalmente fluida.

**Versión:** `v0.8.1` · **Avance:** ≈ 90 % · **Fecha:** 13 nov 2025

---

## 🧱 Bloques del Día 8 (completados)

**B1:** Implementación AdminLogin + persistencia clave + verify.
**B2:** Creación de Dashboard y ruta `/admin/dashboard`.
**B3:** Sistema de eventos globales (auto-sync).
**B4:** QA completo (sync, ping, stats, navegación).

---

## 🧭 Épicas y tareas

### ÉPICA 1 – Catálogo público

* [x] Grid responsive de productos activos
* [x] Precio formateado (EUR)
* [x] CTA WhatsApp
* [ ] Home / Hero público *(v0.9)*
* [ ] Filtro o búsqueda básica *(post-MVP)*

---

### ÉPICA 2 – Back-office

* [x] AdminForm con validaciones + upload
* [x] AdminList con edición/baja/restore
* [x] Integración con backend protegido
* [x] Nuevo AdminLogin (/admin/login)
* [x] AdminGuard refinado (offline + verify)
* [x] **Dashboard con stats reales**
* [x] **Auto-sync catálogo ↔ Dashboard**
* [ ] Confirm dialogs (bajas/restore)
* [ ] Mejoras visuales importantes (v0.9)

---

### ÉPICA 3 – Estilo y experiencia

* [x] Unificación estética admin/public
* [x] Refinamiento mobile-first
* [ ] Mejora visual desktop (v0.9)
* [ ] Footer con versión (v0.9)
* [ ] Identidad visual definitiva (post-MVP)

---

## 🧪 Criterios globales

* Mobile-first real
* UX sin recargas
* Estados claros de carga / error
* Persistencia local
* SPA 100 % consistente
* Admin accesible para usuarios no técnicos

---

## 📌 Próximos pasos (v0.9)

1. 🎨 Mejora visual del panel admin
2. 🖼 Home público (presentación + CTA WhatsApp)
3. 🧾 Footer con versión + branding
4. 📱 Ajustes responsive desktop
5. 💬 Confirmaciones modales para acciones destructivas

---

## 🧊 Icebox / Diferido (post-MVP)

* Página “Sobre nosotros”
* Página “Contacto”
* Filtros avanzados
* Animaciones suaves
* Analítica básica
* Internacionalización (ES / CAT)

---

📦 **Estado general:**
Frontend estable, conectado, autenticado y con Dashboard reactivo (`v0.8.1`).
Próximo sprint → **v0.9: Home público + mejora visual del panel admin**.

```

---