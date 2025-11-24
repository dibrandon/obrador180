# 🎨 **Plan de diseño Frontend – Obrador 180 graus**

**Versión:** `v0.9`
**Rama:** `feature/frontend-redesing`

> Documento maestro del diseño público.
> Resume estética, tono, épicas, decisiones, prioridades y visión futura.
> No contiene código: es puramente conceptual.

---

# 0️⃣ **Contexto actual**

El frontend público ya no es solo un MVP:
es una **web boutique artesanal**, consistente y casi lista para demo.

El estilo adoptado es **Odilio Vogue Style**:

* Paleta pastel: crema, salmón suave, marrón chocolate → nada estridente.
* Tipografía serif + sans equilibrada (Playfair + Inter).
* Sombra suaves, bordes redondeados, layout elegante.
* Criterio visual principal: **“si parece técnico antes que elegante, no va.”**

El backend y el admin **NO se tocan** en esta fase:
la prioridad es **pulir la cara pública**.

---

# 1️⃣ **Dónde estamos hoy (estado real a v0.9)**

Todo esto YA está implementado:

### 🟢 Base visual consolidada

* `reset.css` + `tokens.css` + `base.css` + `layout.css` funcionando en orden.
* Paleta unificada al estilo pastel boutique.
* Tipografías serif/sans cargadas de forma correcta.
* Carga UTF-8 corregida (se eliminó todo caracter corrupto).

### 🟢 Componentes principales listos

* Hero completo con copys finales.
* Carta con productos reales conectados al backend.
* ProductCard limpia, estable y con fallback robusto.
* ProductGrid con estados “loading/error/vacío” coherentes.
* Navbar estable y visualmente coherente (no se toca).
* Sección Nosotros implementada.
* Sección Encargos implementada.
* Footer mínimo.

### 🟢 Backoffice (solo a nivel diseño)

* No está dentro de esta guía estética (se deja funcional por el MVP).
* Todos los copys admin están ya corregidos.

### 🟡 Pendientes visuales v0.9 → v1.0

* Toggle de densidades (Compact / Cozy / Roomy).
* Ajustes finos de spacing en carta y hero.
* QA en móviles reales (iPhone / Android).
* Footer definitivo.

---

# 2️⃣ **Objetivo visual final (Odilio Vogue Style)**

El frontend debe transmitir:

### 1. **Navbar**

* Limpio y discreto.
* Siempre visible (sticky suave).
* No molestar en móvil.
* Enlaces: Inicio, Carta, Nosotros.

### 2. **Hero elegante y claro**

* Título: *Pastelería artesanal de Vilanova*.
* Subtítulo humano: ingredientes nobles, trato directo.
* CTA único: *Ver carta*.
* Layout aireado, pastel suave detrás.

### 3. **Carta**

* Cards con foto clara, texto justo y CTA WhatsApp.
* Densidades ajustables mediante toggle.
* Títulos y precios muy visibles.

### 4. **Nosotros**

* Dos o tres párrafos cortos, tono humano y cercano.
* CTA secundario (WhatsApp o Google Maps).
* Mismo estilo tipográfico y colores que el hero.

### 5. **Footer**

* Discreto, minimalista.
* Año actual + nombre del obrador + versión.

---

# 3️⃣ **Épicas actualizadas**

## ⭐ ÉPICA 1 – Sistema visual sólido (tokens + layout + tipografías)

### Estado actual:

* Paleta final aplicada.
* Tipos y escalas listos.
* Layouts base (`o-shell`, `o-section`, `o-main`) estables.

### Acciones restantes:

1. Revisar valores finales de spacing (márgenes en secciones).
2. Confirmar uso consistente de tipografías serif para títulos + sans para cuerpo.
3. Ajustar sombras y bordes para mantener coherencia “Vogue”.
4. Eliminar cualquier clase legacy o estilo zombie.

---

## ⭐ ÉPICA 2 – Navbar “de revista”, estable y discreto

### Estado actual:

* Diseño ya aceptado, funcional y estable.
* No se modifica más por petición explícita del cliente.

### Acciones:

* Solo QA móvil:

  * chequeo de espaciados,
  * confirmación de que no tapa contenido,
  * scroll-margin-top correcto para anclas.

**Nada más se toca en esta épica.**

---

## ⭐ ÉPICA 3 – Carta usable y agradable

### Estado actual:

* Grid estable.
* Cards robustas y coherentes.
* Textos limpios, precios seguros y WhatsApp seguro.

### Acciones v0.9 → v1.0:

1. **Agregar el toggle de densidades** en cabecera de la carta.
2. QA visual en móvil: spacing entre cards, saltos, ratios de imágenes.
3. Ajuste final de tipografías (peso de títulos, tamaño del precio).
4. Confirmar que el grid no vibra ni rompe al cambiar densidad.

---

## ⭐ ÉPICA 4 – Sección “Nosotros” elegante

### Estado actual:

* Copys ya implementados.
* Sección visible y coherente.

### Acciones:

1. QA móvil + spacing.
2. Ajuste de serif/sans en encabezados.
3. Definir si agregamos imagen futura (placeholder opcional).

---

## ⭐ ÉPICA 5 – Encargos / WhatsApp

### Estado actual:

* CTA principal en hero.
* CTA secundario en carta y secciones.

### Acciones:

1. Revisar que todos los enlaces a WhatsApp funcionen igual.
2. Ajustar mensaje por defecto según parámetros del producto.

---

## ⭐ ÉPICA 6 – Footer final

### Estado actual:

* Footer mínimo (todavía placeholder).

### Acciones:

1. Versión final:

   * Año actual
   * Nombre del obrador
   * Versión del sistema
2. Revisión de spacing y contraste.
3. Opcional: enlace a política de cookies si el cliente lo pide.

---

## ⭐ ÉPICA 7 – Estado “Demo cliente” impecable

### Acciones:

1. Revisión móvil completa:

   * navbar
   * hero
   * carta
   * grid
   * WhatsApp
2. Comprobar scroll hasta anclas.
3. Textos finales aprobados.
4. Quitar cualquier comentario o styles muertos.
5. Capturas de la web lista para README y presentación.

---

# 4️⃣ **Línea futura (post-MVP)**

Estas tareas NO son parte del MVP pero pueden venir después:

* Alinear estética del panel admin al estilo público.
* Página “Contacto / ubicación” completa.
* Página “Sobre nosotros” extendida.
* Microanimaciones (fade-in en hero, hover en cards).
* Filtros avanzados de catálogo.
* Internacionalización (ES / CAT).
* Incorporación de mapa o dirección real.
* Botón WhatsApp flotante opcional.

---

# ✔️ **Estado del plan**

* El diseño público está **casi completo**.
* Solo faltan el **toggle Cozy**, QA móvil y microajustes.
* El resto del proyecto (admin/backend) está en estado **estable** para mostrar.
* El plan guía ya refleja la realidad actual y las metas para v1.0.

---