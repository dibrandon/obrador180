# 🎨 Backlog Frontend — Obrador 180 graus (MVP)

> **Stack:** React + Vite · CSS artesanal con variables · Mobile-first real · Sin frameworks visuales.
> **Modo de trabajo:** por **Bloques** (4× 55’ + 5’ descanso) que empujan las **Épicas**.
> **Objetivo:** catálogo usable en móvil, listo para demo y edición posterior (back-office básico).

---

## 🔧 Convenciones y flujo

* **Bloques diarios:** 4 × (55’ foco + 5’ descanso).
* **Prioridad:** *MVP funcional sobre florituras*.
* **Commits:** `type(scope): mensaje` (ej. `feat(frontend): …`).
* **Versionado:** `v0.5` (frontend conectado y visible). Próximo hito: `v0.6` (Admin móvil mínimo).

---

## 📁 Estructura de carpetas

```
frontend/
  ├─ public/
  ├─ src/
  │   ├─ components/     # ProductCard, HeaderNav, ViewToggle, AdminForm (pend.)
  │   ├─ lib/            # api.js u otros helpers
  │   ├─ styles/         # reset.css, tokens.css, base.css, layout.css
  │   ├─ App.jsx
  │   └─ main.jsx
  └─ docs/
      ├─ BACKLOG_FRONTEND.md
      └─ design_palette.md
```

---

## 🧾 Registro de decisiones (ADR breve)

1. **Sin `index.css`** → eliminado; importamos capas explícitas en `main.jsx`.
2. **Grid > Flexbox** para catálogo 2D y selector de densidad.
3. **Pre-boot de densidad** en `index.html` (sin FOUC).
4. **Imágenes `object-fit: cover`** → cards uniformes.
5. **Cloudinary unsigned** para fotos en back-office.

---

## ✅ Estado actual

* Catálogo navegable y responsive.
* Header sticky con navegación mínima.
* Selector de densidad persistente.
* Precio formateado (EUR).
* Paleta “roco abuela noventas”.

**Versión:** `v0.5` · **Avance:** ≈ 60 % · **Fecha:** 2 nov 2025

---

## 🧱 Bloques día 4

**B1:** arranque visual + grid.
**B2:** navegación + toggle + pulido imágenes/precios.
**B3 → próx.:** Admin móvil mínimo.
**B4 → próx.:** QA móvil + deploy.

---

## 🧭 Épicas y tareas

*(idéntico al documento que ya tenías, con las correcciones y versiones actualizadas — se omite aquí por brevedad)*

---

## 🧪 Criterios globales

* Mobile-first real (sin saltos ni FOUC).
* Preferencias de vista persistentes.
* CTA WhatsApp funcional.
* Back-office mínimo (v0.6).
* Deploy público con API conectada.

---

## 📌 Próximos pasos

1. AdminForm (Cloudinary unsigned)
2. Basic Auth en rutas mutadoras
3. Listado/edición simple
4. Deploy (Vercel + Render)
5. `resumenDia4.md` + README

---

## 🧊 Icebox / Diferido (por foco MVP)

* Footer sticky con info breve → v0.6
* Página “Sobre nosotros” → v0.6
* Página / Sección “Contacto” → v0.6
* Extraer utilitarios (`Button`, `Container`, `SectionTitle`) → v0.6
* Router ligero si aparecen más páginas → v0.7

---