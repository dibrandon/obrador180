# 🍰 **Obrador 180 graus – MVP Web**

**Versión actual:** `v0.9 — Home + Carta + Nosotros + Producto destacado + Dashboard auto-sync`  
**Deploy:** Vercel (frontend) · Render (backend) · Cloudinary (imágenes)

Proyecto desarrollado con stack **MERN (MongoDB, Express, React, Node.js)**
para **reposicionar Obrador 180 graus como pastelería artesanal moderna**
y recuperar su clientela mediante una experiencia digital clara, estética y ágil.

---

# 🧭 **Objetivos del proyecto**

* Mostrar la **carta real** del obrador con fotos, precios y descripciones coherentes.
* Permitir **encargos directos por WhatsApp Business** sin fricción.
* Brindar un **panel administrativo simple**, usable por personal no técnico.
* Mantener **costes mínimos** usando Render + Vercel free tiers.
* Entregar un **MVP funcional en < 4 semanas**, ampliable sin romper arquitectura.

---

# 🗂️ **Estructura general del proyecto**

```bash
obrador180/
├── frontend/        # React + Vite – web pública + admin
│   ├── src/
│   │   ├── components/   # ProductCard, Grid, HeaderNav, FeaturedProduct, PromoCard, Footer...
│   │   ├── components/admin/  # AdminList, AdminNav, AdminStatusBar
│   │   ├── pages/        # Home(App), Carta, Admin, Dashboard, Login, NotFound
│   │   ├── routes/       # AdminGuard + rutas privadas
│   │   ├── lib/          # apiFetch, uploadImage, events (auto-sync)
│   │   └── styles/       # reset, tokens, base, layout, admin.css
│   └── public/
│
├── backend/         # Node + Express 5 – API + adminAuth + métricas
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── scripts/
│   └── index.js
│
├── docs/            # Resúmenes diarios, backlogs, diseño, ADR
├── design/          # Paleta Odilio Vogue, wireframes y referencias
└── README.md
````

---

# 🧰 **Stack técnico**

### **Frontend**

* React + Vite
* CSS artesanal usando **tokens**, layout y tipografías cargadas a mano
* Mobile-first
* Sin frameworks UI (evita bloat)

### **Backend**

* Node.js (Express 5)
* Mongoose + MongoDB Atlas
* CORS robusto + adminAuth + noStore

### **Infraestructura**

* **Frontend:** Vercel
* **Backend:** Render
* **Imágenes:** Cloudinary (unsigned preset → carpeta `obrador/products`)
* **Mensajería:** WhatsApp Business (`wa.me/…`)

---

# 🧩 **Estado actual del MVP (`v0.9` estable)**

El sistema ya es **estable, funcional y listo para demo cliente**.
Se completó tanto el catálogo público como el backoffice con métricas y panel admin renovado.

---

## 🟢 **Frontend público (Home / Carta / Nosotros)**

### **Home**

* Hero limpio con copy artesanal.
* CTA “Ver carta” que scrollea suave al catálogo.
* **Producto destacado**: componente `FeaturedProduct` que muestra el **último producto creado** en la API entre el hero y el bloque promo.
* **Bloque promo Instagram**: `PromoCard` enlazada a reel/post de IG para dar sensación de escaparate vivo.
* Estilo pastel **“Odilio Vogue style”**.

### **Carta**

* Conectada en vivo al backend.
* Cards estables con nombre, foto, descripción, precio, CTA WA.
* **Toggle de densidades operativo** (`compact / cozy / roomy`), con:

  * Descripciones visibles donde toca (fix del bug anterior).
  * Limpieza de reglas `root[data-density]` sobrantes en `layout.css`.
* Layout preparado para escalar en número de productos sin romper la grid.

### **Sección “Nosotros”**

* Copy humano, corto y elegante.
* CTA secundario a WhatsApp.
* Compatible con futura imagen del obrador.

### **Footer**

* **Footer unificado (`Footer.jsx`)** reutilizado en Home y Carta.
* Muestra versión + nombre del obrador.
* Placeholder mínimo para información legal futura.

### **Navbar / header móvil**

* Nav tipo pill con **wrap y padding ajustado ≤480px** para evitar desbordes.
* Espaciado (`gap`, `padding` seguro) revisado para que el menú sea legible en móviles pequeños.

---

## 🟢 **Backoffice (admin)**

### 🧭 **Estructura del panel admin**

* Ruta protegida `/admin`.
* Página `Admin.jsx` simplificada que orquesta:

  * `AdminNav` – navegación de vistas (activos / pausados / stats).
  * `AdminStatusBar` – resumen rápido (totales, activos, archivados, última modificación).
  * `AdminList` – lista de productos con acciones inline.

### 📝 **Gestión de catálogo**

* Lista combinada con **vista de activos y pausados/archivados**.
* Edición inline de campos básicos (nombre, precio, descripción corta…).
* **Alta / baja lógica**:

  * Archivar/restaurar productos sin borrarlos de la base.
* Indicadores claros de estado (activo / pausado).

### 📊 **Dashboard + métricas**

* Ruta protegida `/admin/dashboard`.
* Estadísticas en vivo:

  * Total de productos
  * Activos
  * Archivados
  * Última modificación

### 🔄 **Auto-sync catálogo ↔ dashboard**

* Sistema interno de eventos:

  * `emitStatsChanged`
  * `subscribeStatsChanged`

* Cualquier cambio (crear, editar, archivar, restaurar) se refleja al instante en el Dashboard **sin recargar la SPA**.

### 🔐 **Autenticación refinada**

* Login con clave (`ADMIN_KEY`).
* `AdminGuard` robusto (maneja `offline`, `network`, `unauthorized`).
* Encabezados `no-store` en rutas críticas (evita cache del panel).

---

## 🛠️ **Backend (v0.8.1 estable)**

* Express 5 + rutas modulares.

* `adminAuth.js` + restricciones CORS estrictas.

* Endpoints protegidos `/admin/ping` y `/admin/stats`.

* CRUD completo:

  * GET activos
  * GET archivados
  * POST crear
  * PUT editar
  * DELETE archivo lógico
  * RESTORE recuperar

* Seed reproducible.

* Cache-control completo.

* Compatible 100% con AdminLogin, Dashboard y nuevo AdminList.

---

# 🌐 **URLs de producción**

| Área                 | URL                                                                        |
| -------------------- | -------------------------------------------------------------------------- |
| **Frontend público** | [https://obrador180.vercel.app](https://obrador180.vercel.app)             |
| **Panel admin**      | [https://obrador180.vercel.app/admin](https://obrador180.vercel.app/admin) |
| **Backend API**      | [https://obrador180.onrender.com](https://obrador180.onrender.com)         |

> El panel admin requiere clave y solo se accede vía `/admin/login`.

---

# 🚀 **Scripts útiles**

### Frontend

```bash
cd frontend
npm run dev
npm run build
npm run preview
```

### Backend

```bash
cd backend
npm run dev
npm start
```

---

# 📅 **Roadmap de desarrollo**

| Versión    | Estado | Contenido                                                        |
| ---------- | ------ | ---------------------------------------------------------------- |
| **v0.6**   | ✔️     | CRUD admin + DB                                                  |
| **v0.7**   | ✔️     | Deploy completo (Render + Vercel)                                |
| **v0.8.1** | ✔️     | Dashboard + Auto-sync + Auth estable                             |
| **v0.9**   | ✔️     | Home pública + Carta + Nosotros + Producto destacado + Admin UX  |
| **v1.0**   | ⏳      | Demo final para cliente (copys finales, QA móvil, pulido visual) |

---

# 📘 **Documentación de progreso**

* `/docs/resumenDia3.md` – Inicio del frontend
* `/docs/resumenDia4.md` – Integración catálogo/backend
* `/docs/resumenDia5.md` – CRUD completo
* `/docs/resumenDeploy6.md` – Deploy fullstack
* `/docs/resumenDia8.md` – Dashboard + auto-sync
* `/docs/resumenDia10-11.md` – Diseño público + Home, navbar y admin renovado

*(Se actualiza a medida que avanzan los sprints.)*

---

# 🧊 **Visión futura (post-MVP)**

No forman parte del MVP, pero ya están pensados:

* Página “Contacto / Ubicación”
* Alineación estética del panel admin con el look público
* Filtros avanzados para productos
* Catálogo multilenguaje (ES/CAT)
* Animaciones ligeras (fade, hover elegante)
* Galería de pasteles para eventos
* Modo oscuro opcional (no prioritario)

---

# 👥 **Equipo**

* **Dev / PM:** Alejandro
* **QA / PO:** Pyttu
* **Cliente:** Obrador 180 graus – Vilanova i la Geltrú

---

# 🔒 **Licencia**

Proyecto interno / propietario.
© 2025 — Alejandro.