Perfecto, Ñaty.
# 🎨 Backlog Frontend — Obrador 180 graus (MVP)

**Versión actual:** `v0.9 – Frontend público consolidado + Admin estable`
**Última actualización:** 25 nov 2025

> **Stack:** React + Vite · CSS artesanal · Mobile-first real · Sin frameworks visuales.
> **Objetivo actual:** cerrar frontend público para demo y dejar admin con UX limpia y coherente.

---

# 🔧 Convenciones y flujo

* **Bloques diarios:** 4 × (55’ foco + 5’ descanso)
* **Prioridad:** *MVP estable > refinamiento visual > extras*
* **Commits:** `type(scope): mensaje`
* **Versionado:**

  * `v0.6` → CRUD completo
  * `v0.7` → Deploy + Auth refinada
  * `v0.8.1` → Dashboard + Auto-Sync
  * `v0.9` → Frontend público con copys finales + saneo UTF-8

---

# 📁 Estructura real del Frontend

```bash
frontend/
├─ public/
├─ src/
│  ├─ assets/
│  ├─ components/
│  │   ├─ HeaderNav.jsx
│  │   ├─ ProductCard.jsx
│  │   ├─ ProductGrid.jsx
│  │   ├─ ViewToggle.jsx
│  │   ├─ admin/               # NUEVO: componentes del panel admin
│  │       ├─ AdminStatusBar.jsx
│  │       └─ ...
│  │
│  ├─ lib/
│  │   ├─ api.js
│  │   ├─ uploadImage.js
│  │   └─ events.js            # Auto-sync catálogo ↔ dashboard
│  │
│  ├─ pages/
│  │   ├─ AdminLogin.jsx
│  │   ├─ Admin.jsx
│  │   ├─ Dashboard.jsx
│  │   └─ NotFound.jsx
│  │
│  ├─ routes/
│  │   ├─ AdminGuard.jsx
│  │   └─ routes.jsx
│  │
│  ├─ styles/
│  │   ├─ reset.css
│  │   ├─ tokens.css
│  │   ├─ base.css
│  │   ├─ layout.css
│  │   └─ admin.css
│  │
│  ├─ App.jsx
│  ├─ main.jsx
│  └─ vite.config.js
│
└─ .env
```

---

# 🧾 Registro de decisiones (ADR breve)

1. **Sin index.css** → orden explícito en main.jsx (reset → tokens → base → layout → admin).
2. **Grid como sistema base** → catálogo limpio en todas las densidades.
3. **Pre-boot de densidad** en index.html para evitar FOUC.
4. **Cloudinary unsigned** → zero friction.
5. **Autenticación estable** → AdminLogin + AdminGuard + verify + offline mode.
6. **apiFetch unificado** → `network/offline/unauthorized/error`.
7. **Sistema global de eventos** para auto-sync.
8. **Dashboard reactivo** sin recargas.
9. **Rutas admin ordenadas** → `/admin`, `/admin/login`, `/admin/dashboard`.
10. **Estética “Odilio Vogue Style”** → pastel, serif+sans, sombras suaves, bordes redondeados.

---

# 🟢 Estado actual del Frontend

### 🟢 Público (actualizado a v0.9)

* Hero completo con copys finales
* Sección Carta (conectada al backend)
* Sección Nosotros (texto editorial definitivo)
* Sección Encargos (CTA WhatsApp)
* WhatsApp seguro en ProductCard
* Placeholder de carga corregido (“Cargando productos…”)
* Fallback de descripción estandarizado
* 404 con textos finales
* **Saneamiento UTF-8 total**
* Navbar consolidado (sin cambios requeridos)

### 🟢 Admin (actualizado)

* Login estable
* Guard robusto (verify + offline)
* Dashboard con métricas reales
* Auto-sync catálogo ↔ dashboard
* Admin.jsx + AdminStatusBar + Dashboard.jsx con **copys finales**
* admin.css refinado
* Mejoras de accesibilidad y coherencia

**Versión:** `v0.9` · **Avance:** ≈ 92 % · **Fecha:** 25 nov 2025

---

# 🧭 Épicas y tareas

## ⭐ ÉPICA 1 – Catálogo público

* [x] Grid responsive de productos activos
* [x] Precio formateado (EUR)
* [x] CTA WhatsApp
* [x] Copys finales (hero, carta, nosotros, encargos)
* [x] Toggle de densidades (Compact / Cozy / Roomy)
* [ ] Pulido visual final (sombras, spacing)
* [ ] QA móvil profundo (iOS + Android)

---

## ⭐ ÉPICA 2 – Back-office

* [x] CRUD completo
* [x] Upload Cloudinary
* [x] AdminLogin/Guard
* [x] Dashboard con KPIs reales
* [x] Auto-sync
* [x] UTF-8 saneado
* [x] Copys finales
* [ ] Confirm dialogs (CRUD destructivas)
* [ ] Indicadores visuales de carga (CRUD)

---

## ⭐ ÉPICA 3 – Estilo y experiencia (Odilio Vogue Style)

* [x] Unificación estética admin/público
* [x] Refinamiento mobile-first
* [ ] Mejora visual desktop final
* [ ] Footer definitivo (branding + versión)
* [ ] Animaciones suaves (CTA y hover)
* [ ] Identidad visual completa (post-MVP)

---

# 🧪 Criterios globales

* Mobile-first real
* SPA sin recargas
* Estados claros de carga / error
* Persistencia local segura
* Diseño amable, elegante, pastel
* Código limpio, rutas claras, UX sin fricción

---

# 📌 Prioridades actuales (v0.9 → v1.0)

1. **Agregar toggle de densidad (Compact / Cozy / Roomy)** en cabecera de Carta
2. **QA móvil exhaustivo**
3. **Footer final**
4. **Microajustes visuales** (espaciados, sombras, tipografías)
5. **Demo lista para cliente**

---

# 🧊 Icebox / Diferido (post-MVP)

* Página “Contacto / Ubicación” completa
* Página “Sobre nosotros” extendida
* Buscador / Filtros
* Animaciones avanzadas
* Analíticas básicas
* Internacionalización (ES / CAT)

---

# 🧱 Estado general

Frontend **estable, pulido y conectado**.
Admin **terminado y sólido**.
Pendientes: toggle Cozy + QA final + refinamiento visual.

**Objetivo:** entregar versión pública `v1.0` lista para cliente esta semana.

---