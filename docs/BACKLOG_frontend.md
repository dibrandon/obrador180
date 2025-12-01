# 🎨 Backlog Frontend — Obrador 180 graus (MVP)

**Versión actual:** `v0.9 – Home + Carta + Nosotros + Producto destacado + Admin renovado`  
**Última actualización:** 1 dic 2025

> **Stack:** React + Vite · CSS artesanal · Mobile-first real · Sin frameworks visuales.  
> **Objetivo actual:** consolidar frontend público para demo (Home + Carta + Nosotros + IG promo + destacado) y dejar el admin con UX limpia y coherente.


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
│  │   ├─ FeaturedProduct.jsx      # Producto destacado (último de la API)
│  │   ├─ PromoCard.jsx            # Promo a reel/post de Instagram
│  │   ├─ Footer.jsx               # Footer unificado (Home + Carta)
│  │   └─ admin/
│  │        ├─ AdminNav.jsx
│  │        ├─ AdminStatusBar.jsx
│  │        ├─ AdminList.jsx
│  │        └─ ...
│  │
│  ├─ lib/
│  │   ├─ api.js
│  │   ├─ uploadImage.js
│  │   └─ events.js                # Auto-sync catálogo ↔ dashboard (event bus)
│  │
│  ├─ pages/
│  │   ├─ AdminLogin.jsx
│  │   ├─ Admin.jsx                # Vista renovada de gestión catálogo
│  │   ├─ Dashboard.jsx
│  │   ├─ Carta.jsx                # Página Carta pública
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
│  ├─ App.jsx                      # Home pública (Hero + Carta + Nosotros + destacado + promo)
│  ├─ main.jsx
│  └─ vite.config.js
│
└─ .env
````

---

# 🧾 Registro de decisiones (ADR breve)

1. **Sin `index.css`** → orden explícito en `main.jsx` (reset → tokens → base → layout → admin).
2. **Grid como sistema base** → catálogo limpio en todas las densidades.
3. **Pre-boot de densidad** en `index.html` para evitar FOUC.
4. **Cloudinary unsigned** → zero friction en panel admin.
5. **Autenticación estable** → AdminLogin + AdminGuard + verify + offline mode.
6. **`apiFetch` unificado** → estados `network / offline / unauthorized / error`.
7. **Sistema global de eventos** para auto-sync dashboard ↔ catálogo.
8. **Dashboard reactivo** sin recargas de la SPA.
9. **Rutas admin ordenadas** → `/admin`, `/admin/login`, `/admin/dashboard`.
10. **Estética “Odilio Vogue Style”** → pastel crema/salmón, serif+sans, sombras suaves, bordes redondeados.
11. **Navbar responsive real** → pill con `wrap`, padding seguro y sin desbordes en ≤480px.
12. **Producto destacado derivado de datos reales** → `FeaturedProduct` toma el último producto devuelto por la API (no campo manual).
13. **Footer unificado** → un solo componente `Footer` compartido entre Home y Carta como base de branding + legal.

---

# 🟢 Estado actual del Frontend

### 🟢 Público (actualizado a v0.9)

* Home con hero y copys finales (Odilio Vogue style).
* Sección Carta conectada al backend (productos activos en vivo).
* Sección Nosotros con texto editorial definitivo.
* Sección Encargos / CTA WhatsApp central.
* `ProductCard` + `ProductGrid` robustos (precio seguro, CTA WA seguro).
* Mensaje estándar de carga: “Cargando productos…”.
* Fallback de descripción estandarizado.
* Página `Carta.jsx` integrada en rutas.
* 404 con textos finales.
* **Saneamiento UTF-8 total.**
* **Navbar/header mobile refinado**: pill hace wrap, gap y padding ajustados, sin desbordes en móviles pequeños.
* **Toggle de densidades activo** en Carta (`compact / cozy / roomy`) con descripciones mostrando/ocultándose correctamente según modo.
* **`FeaturedProduct.jsx`**: bloque de producto destacado que toma el **último producto** de la API y lo inserta entre el hero y el catálogo.
* **`PromoCard.jsx`**: bloque de promo con enlace a reel/post de Instagram para reforzar presencia social.
* **`Footer.jsx` unificado**: mismo footer en Home y Carta (versión, nombre del obrador, base para futuros enlaces legales).

### 🟢 Admin (actualizado)

* Login estable (clave `ADMIN_KEY`).
* Guard robusto (verify + offline + estados claros).
* Dashboard con métricas reales (total, activos, archivados, última modificación).
* Auto-sync catálogo ↔ dashboard mediante `events.js`.
* `Admin.jsx` renovado:

  * Vista combinada de activos/archivados.
  * Alta, edición inline y baja lógica/restauración.
* `AdminNav.jsx` para navegación de vistas del panel.
* `AdminStatusBar.jsx` para barras de estado y totales.
* `AdminList.jsx` como lista principal editable.
* `admin.css` refinado.
* Mejoras de accesibilidad y coherencia en copys/estados.

**Versión:** `v0.9` · **Avance:** ≈ 95 % · **Fecha:** 1 dic 2025

---

# 🧭 Épicas y tareas

## ⭐ ÉPICA 1 – Catálogo público

* [x] Grid responsive de productos activos.
* [x] Precio formateado (EUR).
* [x] CTA WhatsApp en cada producto.
* [x] Copys finales (hero, carta, nosotros, encargos).
* [x] Toggle de densidades (Compact / Cozy / Roomy) en cabecera de Carta.
* [x] Ajustes de descripciones por densidad (cozy/roomy mostrando texto de forma coherente).
* [x] Navbar/header mobile estable sin desbordes.
* [x] Footer compartido entre Home y Carta.
* [x] Bloque de **producto destacado** (`FeaturedProduct`).
* [x] Bloque de **promo Instagram** (`PromoCard`).
* [ ] Pulido visual final (sombras, spacing, márgenes finos).
* [ ] QA móvil profundo (iOS + Android, diferentes width reales).

---

## ⭐ ÉPICA 2 – Back-office

* [x] CRUD completo (alta, editar, archivar, restaurar).
* [x] Upload Cloudinary (unsigned preset).
* [x] AdminLogin / AdminGuard.
* [x] Dashboard con KPIs reales.
* [x] Auto-sync catálogo ↔ dashboard.
* [x] UTF-8 saneado.
* [x] Copys finales admin.
* [x] Estructura renovada (`AdminNav`, `AdminStatusBar`, `AdminList`).
* [ ] Confirm dialogs para acciones destructivas (archivar/restaurar/borrar).
* [ ] Indicadores visuales de carga (spinners / estados) en acciones CRUD.

---

## ⭐ ÉPICA 3 – Estilo y experiencia (Odilio Vogue Style)

* [x] Paleta pastel crema/salmón consolidada.
* [x] Tipografías serif+sans consistentes.
* [x] Unificación estética entre admin/público en lo básico (tipografía, botones, tonos).
* [x] Refinamiento mobile-first (layout.css como fuente de verdad).
* [x] Footer base común.
* [ ] Mejora visual desktop final (alineaciones, whitespace, ritmo vertical).
* [ ] Footer definitivo (branding + versión + links legales mínimos).
* [ ] Animaciones suaves (CTA y hover, fade-in ligero).
* [ ] Identidad visual extendida (post-MVP: iconos, ilustraciones, patrones).

---

# 🧪 Criterios globales

* Mobile-first real (no solo responsive “de rebote”).
* SPA sin recargas inesperadas.
* Estados claros de carga / error / vacío.
* Persistencia local segura para densidad y estado admin donde aplique.
* Diseño amable, elegante, pastel (Odilio Vogue).
* Código limpio, rutas claras, UX sin fricción.
* Comportamiento coherente entre entorno local y producción.

---

# 📌 Prioridades actuales (v0.9 → v1.0)

1. **QA móvil exhaustivo** en Home, Carta y Admin (varios breakpoints y dispositivos reales).
2. **Pulido visual final**: spacing, sombras, tamaños de fuente, ritmo vertical.
3. **Footer final** con copy legal mínimo (aviso legal / privacidad simple).
4. **Pequeñas microanimaciones** en CTA/hover sin degradar rendimiento.
5. **Preparar demo cliente**: flujo Home → Carta → WhatsApp y vista rápida del panel admin.

---

# 🧊 Icebox / Diferido (post-MVP)

* Página “Contacto / Ubicación” completa (mapa, horarios, teléfono).
* Página “Sobre nosotros” extendida (historia larga, fotos, etc.).
* Buscador / filtros de productos (por tipo, evento, dieta).
* Animaciones avanzadas (transiciones de rutas, parallax ligero, etc.).
* Analíticas básicas (eventos en CTA, scroll, etc.).
* Internacionalización (ES / CAT).
* Modo oscuro opcional.

---

# 🧱 Estado general

Frontend **estable, conectado y casi listo para producción demo**.
Admin **terminado y sólido en UX base**.

Pendientes: **QA móvil**, **pulido visual**, **footer legal** y **toques finales de experiencia** antes de etiquetar `v1.0`.

---