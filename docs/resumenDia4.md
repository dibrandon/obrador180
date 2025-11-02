# 📘 Resumen — Día 4 (Frontend)

**Proyecto:** Obrador 180 graus
**Fecha:** 2-nov-2025 (Europe/Madrid)
**Versión al cierre:** `v0.5`
**Foco del día:** Arranque visual del **frontend** (catálogo móvil), con navegación mínima y **selector de densidad** anticipando feedback del cliente.

---

## 🎯 Objetivos del día (plan vs. realidad)

* **Inicializar entorno `frontend/`** (React + Vite, estructura y estilos base). ✅
* **Sistema CSS artesanal** (`reset`, `tokens`, `base`, `layout`). ✅
* **Primer componente funcional** (`ProductCard.jsx` con CTA a WhatsApp). ✅
* **Mobile-first real** + navegación mínima (header sticky). ✅
* **Selector de densidad de catálogo** (Compacta / Cómoda / Amplia) con persistencia. ✅ *(añadido fuera del plan, documentado en backlog)*
* **Documentación** (`design_palette.md` + backlog actualizado). ✅

---

## ⏱️ Bloques de trabajo

### Bloque 1 — Arranque visual + grid

* Estructura de estilos: imports explícitos en `main.jsx` (sin `index.css`).
* Tokens de color “roco abuela noventas” (salmón pastel, dorado, marrón chocolate, blancos cálidos).
* Grid inicial mobile-first (1→2→3→4 columnas por breakpoints).
* **Resultado:** catálogo renderiza tarjetas base con datos reales.

**Micro-log:** Sin errores. Decisión: eliminar `index.css` (ADR 1).

---

### Bloque 2 — Navegación mínima + refinamiento de cards

* `HeaderNav` sticky con enlaces **Inicio / Carta / Encargar**.
* Copys de bienvenida y tono cálido.
* `Intl.NumberFormat('es-ES', { currency: 'EUR' })` para precio.
* Hover sutil + jerarquía visual (título, desc corta, precio, CTA).
* **Resultado:** catálogo navegable y coherente.

**Micro-log:** Ajustes menores de spacing en móvil.

---

### Bloque 2 (reinicio) — **Selector de densidad**

* **ViewToggle** (icono único que cicla **compacta→cómoda→amplia**).
* **Persistencia** en `localStorage` + **pre-boot** en `index.html` (evita FOUC).
* Diferencias visibles por modo en **móvil**:

  * **Compacta:** 2 col, media 1:1, sin descripción.
  * **Cómoda:** 1 col, media 4:3, paddings medios.
  * **Amplia:** 1 col, media 16:9, más aire tipográfico.
* **Resultado:** al entrar en móvil se pueden ver **4–6 pasteles** en “Compacta”, cumpliendo el pedido anticipado del cliente.

**Micro-log:** Bug detectado y resuelto: cozy/roomy idénticos en móvil → se diferenciaron por ratio/paddings.

---

### Bloque 2 (cierre) — Imágenes y UX móvil

* `.card__media img { object-fit: cover; }` + `overflow:hidden` → **todas** las fotos llenan su contenedor sin deformarse.
* CTA **ancho completo** y touch-friendly.
* **Resultado:** catálogo consistente y “nivel app” en móvil.

**Micro-log:** Verificado en móvil real; sin saltos ni parpadeos.

---

## 🧾 Cambios clave (ADRs resumidas)

1. **Eliminar `index.css`**: imports explícitos (`reset`, `tokens`, `base`, `layout`) en `main.jsx`.
2. **Grid > Flex** para catálogo 2D y control de columnas por densidad.
3. **Pre-boot `data-density`** en `index.html` para evitar FOUC.
4. **`object-fit: cover`** en imágenes para uniformidad visual.
5. **Cloudinary unsigned** decidido para back-office (Día 5).

---

## 📦 Entregables de hoy

* `src/components/ProductCard.jsx` (nombre, desc, precio formateado, imagen, CTA WhatsApp).
* `src/components/HeaderNav.jsx` (sticky, nav mínima).
* `src/components/ViewToggle.jsx` (icono, ciclo de densidad con persistencia).
* `src/styles/*` (tokens, base, layout refinado; imágenes uniformes).
* `docs/design_palette.md` (paleta mock documentada).
* `docs/BACKLOG_FRONTEND.md` **actualizado** (v0.5 + Icebox + ADRs).

---

## ✅ Estado al cierre

* **Catálogo móvil** listo para demo.
* **Densidad de catálogo** implementada y persistente.
* **WhatsApp** operativo (móvil y web).
* Paleta y tono visual consolidados.
* Backlog **sin deudas críticas** (solo tareas diferidas a v0.6/v0.7).

---

## ⚠️ Incidencias / Notas

* (Resuelto) Parpadeo de densidad al recargar en móvil → pre-script en `index.html`.
* (Resuelto) Imágenes no llenaban el contenedor → `object-fit: cover`.
* (Previsto) Cliente podría querer “Compacta” por defecto → bastará setear `data-density="compact"` en el pre-script.

---

## 🔜 Siguientes pasos (Día 5)

1. **AdminForm.jsx** (alta/edición) con **upload a Cloudinary** (preset unsigned).
2. Integrar **POST /products** y feedback visual (éxito/error).
3. **Basic Auth** mínima para rutas mutadoras (backend).
4. QA móvil real e incorporación al backlog (`v0.6`).

---