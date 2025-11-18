# 📘 Resumen Día 9 – Obrador 180 graus (v0.9-pre)

**Fecha:** 19 noviembre 2025
**Versión del proyecto (rama):** `v0.9-pre – Rediseño público en curso`
**Estado general:** jornada dedicada casi al 100 % a la **cara pública**: pasamos de “demo funcional” a **maqueta seria de pastelería** en la rama de frontend.

> Backend y admin se mantienen estables (v0.8.1). Hoy se abrió un frente nuevo: la **home pública “Odilio Vogue style”**.

---

## 🧭 Objetivo del día

Arrancar el **rediseño completo del frontend público** sin romper producción:

* Definir **sistema visual** (tokens + layout) coherente con la referencia de diseño que estuvimos mirando.
* Reescribir la **home pública** (shell, hero, carta, footer) para que ya se pueda enseñar a un cliente.
* Mantener **WhatsApp como CTA central** y el flujo de catálogo tal como estaba, solo cambiando la piel.
* Hacerlo **aislado en una rama** para poder experimentar tranquilo.

---

## 🌈 1. Sistema visual base – tokens + layout

### 🎨 tokens.css – paleta y escala

Se consolidó un fichero `tokens.css` que ahora sí actúa como **fuente de verdad visual**:

* Fondos:

  * `--color-page-bg`: fondo crema cálido general.
  * `--color-surface`, `--color-surface-alt`, `--color-card`: capas para secciones, bloques y cards.
* Marca:

  * `--color-button-1`, `--color-button-2`: gradiente suave para CTAs.
  * Dorados, salmón y marrones cálidos para dar sensación de **obrador boutique**.
* Texto:

  * `--color-text-main`, `--color-text-soft`, `--color-text-on-cta`.
* Tipografías:

  * `--font-serif`: para toques elegantes (marca / títulos).
  * `--font-sans`: para texto de lectura y UI.
* Varios:

  * Radios (`--radius-card`, `--radius-pill`), sombras suaves, escala de espaciado (`--space-xs`…`--space-xxl`).

💡 Idea base: “una sola paleta coherente” → menos CSS raro, más consistencia.

---

### 🧱 layout.css – shell, header, hero, grid

Se reescribió `layout.css` para que describa la **estructura real de la web pública**:

* **Shell general:**

  * `.o-shell`: contenedor de toda la app pública (fondo, color de texto).
  * `.o-main`: zona de contenido scrollable.
  * `.o-section`, `.o-section--hero`, `.o-section--muted`: secciones con padding y anchura contenida (máx. 1120px).

* **Hero principal:**

  * `.hero`, `.hero__content`, `.hero__visual`: layout en columna (mobile) y dos columnas (desktop).
  * `.hero__title`, `.hero__highlight`: título “Pastelería artesanal de Vilanova” con acento de color.
  * `.hero__text`, `.hero__meta`, `.hero__tagline`: texto humano, corto y orientado a encargos reales.

* **Botones generales:**

  * `.c-btn` + `.c-btn--primary`: botón redondeado reutilizable con gradiente suave y sombra tipo “revista”.

* **Catálogo:**

  * `.grid`: layout mobile-first (1 columna) con escalado por densidad.
  * `.card`, `.card__media`, `.card__body`, `.card__title`, `.card__desc`, `.card__price`:

    * cards con sombra suave, foto con `object-fit: cover`, textos limpios.
  * `.button`: botón de WhatsApp dentro de cada card, basado en el gradiente de marca.

* **Densidades (`data-density`):**

  * `compact`: más columnas, descripciones ocultas, fotos cuadradas.
  * `cozy`: vista estándar, mezcla lectura/foto.
  * `roomy`: foco en foto grande y texto.

Aunque el **toggle visual** aún está por rehacer, la **infra CSS de densidad está lista**.

---

## 🏠 2. Nueva Home pública – shell + hero + carta + footer

### 🧩 App.jsx – estructura general

Se rearmó `App.jsx` para usar la nueva arquitectura:

* `div.o-shell` como raíz.
* Ancla `div id="top"` para scroll hacia Inicio.
* `<header className="o-header">` con `<div className="o-header__inner"><HeaderNav /></div>`.
* `<main className="o-main">` con:

  * Sección hero (`.o-section.o-section--hero`).
  * Sección carta (`section#carta.o-section`).
* `<footer className="o-footer">` con `.o-footer__inner`:

  * Año dinámico y texto `MVP v0.9-pre · Sitges / Vilanova`.

👉 Resultado: la home ya tiene **estructura de web real de negocio** (no solo un listado de productos pegado).

---

### 🎯 Hero – “Pastelería artesanal de Vilanova”

Contenido actual del hero:

* **Título:**
  `Pastelería artesanal` + `de Vilanova` en destacado (*hero__highlight*).
* **Texto descriptivo:**
  “Tortas, pasteles y dulces hechos a mano, con ingredientes nobles y el ritmo lento de un obrador de verdad.”
* **Meta:**
  “Encargos por WhatsApp · recogida en obrador · opciones para celebraciones y eventos.”
* **Acción principal:**

  * Botón CTA: `Ver carta` → ancla a `#carta`.
  * Tagline bajo el CTA:
    “Empieza por la carta base y luego afinamos tu pedido juntos.”

Visual:

* Bloque derecho `.hero__visual`: placeholder con gradientes crema/salmón y sombra, preparado para futuras fotos reales del obrador.

---

### 📑 Carta base – ProductGrid + copy afinado

Se mantuvo la lógica de catálogo existente (`ProductGrid`, fetch de productos) pero encajado en la nueva sección:

* Encabezado:

  * Título: **“Nuestra carta”**.
  * Subtítulo: versión mejorada del texto de antes, alineado con el tono artesanal.
* Grid:

  * `ProductGrid` usa ahora el nuevo `.grid` y las nuevas cards.

**ProductCard** quedó así a nivel UX:

* Foto (Cloudinary / URL simple) con `object-fit: cover` y ratio estable.
* Nombre del producto (título fuerte).
* Descripción corta (si no hay, mostramos “—”).
* Precio formateado con `Intl.NumberFormat` en EUR.
* Botón: **“Encargar por WhatsApp”**, enlazando a:

  * `https://wa.me/${VITE_WA_NUMBER}?text=...`
    con mensaje `Hola, quiero encargar: [nombre] — €[precio].`

💬 Conclusión: el flujo de encargo **sigue siendo el mismo**, sólo que ahora vive en una carta que parece de pastelería real.

---

## 🧭 3. Header / Navbar – primer pase (con deudas)

Se introdujo un nuevo **HeaderNav** para separar claramente:

* Marca:

  * `Obrador 180º graus` en una estructura pensada para marcar jerarquía (parte “OBRADOR” y parte “180º graus”).
* Navegación:

  * `Inicio` → `#top`
  * `Carta` → `#carta`
  * `Nosotros` → `#nosotros` (sección aún no creada, pero ya conceptualizada)

Estado actual:

* El header ya no se ve como el boilerplate anterior, pero:

  * el **sticky** aún no está implementado (header no se queda fijado en scroll),
  * el centrado y los espaciados siguen en **WIP** (pill, alineación, espacio entre enlaces),
  * hay algunas clases nuevas (`.o-header__pill`, etc.) que todavía necesitan estilos definitivos.

Decisión consciente del día:
👉 **priorizar que la estructura funcione** y que la home se vea presentable, dejando los detalles finos de header para la siguiente iteración (Épica Navbar).

---

## 🧹 4. Limpieza de legacy y orden en el frontend

Para no arrastrar ruido del starter de Vite:

* Se eliminó `src/App.css` (el de la plantilla React) y se dejó de importar.

* Los estilos globales ahora entran solo por:

  ```js
  import "./styles/reset.css";
  import "./styles/tokens.css";
  import "./styles/base.css";
  import "./styles/layout.css";
  import "./styles/admin.css";
  ```

* Se revisó que nada del viejo `App.css` afecte a la nueva maquetación (clases como `.logo`, `.card` de Vite, etc., fuera del proyecto).

Esto simplifica mucho futuros bugs de “¿de dónde sale este estilo raro?”.

---

## 🌱 5. Rama de rediseño + rescate con git stash

Se vivió el clásico mini-drama git:

* Algunos cambios de `layout.css` y `tokens.css` se hicieron sin darse cuenta en `main`.
* Git no dejaba cambiar a la rama `feature/frontend-redesing` sin perder esos cambios.

Solución aplicada:

1. `git stash push -m "frontend redesign work in progress"` en `main`.
2. `git checkout feature/frontend-redesing`.
3. `git stash pop` para traer:

   * `App.jsx`,
   * `HeaderNav.jsx`,
   * `ProductCard.jsx`,
   * y parte del CSS trabajado.

Resultado:

* Todo el rediseño queda **encapsulado en la rama feature**,
* `main` sigue limpio y alineado con producción,
* seguimos un flujo sano: **branch para romper / experimentar**, merge después.

---

## 🧩 6. Plan de diseño documentado (épicas frontend)

Se dejó escrito un **plan de épicas** para el frontend, que sirve como brújula a partir del Día 9:

1. **Épica 1 – Sistema visual sólido**
   tokens + layout como base estable, sin duplicados ni colores fantasma.

2. **Épica 2 – Navbar “de revista”**
   header sticky, pill central, marca clara, enlaces cómodos en móvil.

3. **Épica 3 – Carta realmente usable**
   cards pulidas, densidades reactivas, toggle visible y guardado de preferencia.

4. **Épica 4 – Sección “Nosotros”**
   storytelling breve sobre el obrador, con CTA secundario.

5. **Épica 5 – Estado “Lista para demo cliente”**
   QA mobile, textos revisados, capturas para README y presentación.

6. **Épica 6 (futuro)** – Alinear el backoffice con el nuevo look público.

Este documento de épicas es ahora la **hoja de ruta del frontend**.

---

## 🔍 7. QA rápido del día

Se comprobó:

* La home carga correctamente en la rama de rediseño.
* El CTA del hero baja a `#carta`.
* Las cards muestran:

  * foto (si existe),
  * nombre,
  * descripción,
  * precio formateado,
  * botón de WhatsApp que abre conversación con el mensaje correcto.
* El footer refleja año actual + texto de versión v0.9-pre.

Hay issues conocidos (Ajuste de espaciados, falta sección “Nosotros”), pero **ninguno bloquea** enseñar el progreso como maqueta.

---

## 💬 8. Reflexión del día

Día 9 fue el salto de:

> “Tenemos un backend sólido y un panel que funciona”
> ➜ a
> “Nuestra web pública ya *parece* una pastelería real.”

Hubo:

* Drama de git,
* reescritura masiva de CSS,
* pelea con el header,
* y bastante “Odilio” interior revisando detalles de Vogue a la 1 AM.

Pero el resultado es claro:

* La **estructura pública** está montada.
* El **sistema visual** ya es reconocible y coherente.
* Y el proyecto entra en fase de **pulido de frontend**, no solo de “que funcione”.

---

## 🔥 Estado final del Día 9

* **Backend:** sin cambios, sigue estable (v0.8.1).
* **Admin:** sin cambios funcionales, listo para uso normal.
* **Frontend público:**

  * nueva shell, hero, carta y footer en rama `feature/frontend-redesing`,
  * maquetación “Vogue pastel” en marcha,
  * WhatsApp como CTA sólido.

**Versión rama frontend:** `v0.9-pre – Rediseño público en curso`.
