# 🍰 **Obrador 180 graus – MVP Web**

**Versión actual:** `v0.9 — Home + Carta + Nosotros + Dashboard auto-sync`
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

```
obrador180/
├── frontend/        # React + Vite – web pública + admin
│   ├── src/
│   │   ├── components/   # ProductCard, Grid, HeaderNav, ViewToggle...
│   │   ├── pages/        # Admin, Dashboard, Login, NotFound
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
```

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

# 🧩 **Estado actual del MVP (v0.9-pre)**

El sistema ya es **estable, funcional y listo para demo cliente**.
Se completó tanto el catálogo público como el backoffice con métricas.

---

## 🟢 **Frontend público (Home / Carta / Nosotros)**

### **Home**

* Hero limpio con copy artesanal.
* CTA “Ver carta” que scrollea suave al catálogo.
* Estilo pastel “Odilio Vogue style”.

### **Carta**

* Conectada en vivo al backend.
* Cards estables con nombre, foto, descripción, precio, CTA WA.
* Toggle de densidades (`compact / cozy / roomy`) listo para reactivar.

### **Sección “Nosotros”**

* Copy humano, corto y elegante.
* CTA secundario a WhatsApp.
* Compatible con futura imagen del obrador.

### **Footer**

* Versión + nombre del obrador.
* Placeholder mínimo para legal.

---

## 🟢 **Backoffice (admin)**

### 📊 **Dashboard nuevo**

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
* Cualquier cambio se refleja al instante sin recargar la SPA.

### 🔐 **Autenticación refinada**

* Login con clave (`ADMIN_KEY`).
* AdminGuard robusto (maneja `offline`, `network`, `unauthorized`).
* No-store en rutas críticas (evita cache en el panel).

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

* Compatible 100% con AdminLogin y Dashboard.

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

```
cd frontend
npm run dev
npm run build
npm run preview
```

### Backend

```
cd backend
npm run dev
npm start
```

---

# 📅 **Roadmap de desarrollo**

| Versión      | Estado | Contenido                                            |
| ------------ | ------ | ---------------------------------------------------- |
| **v0.6**     | ✔️     | CRUD admin + DB                                      |
| **v0.7**     | ✔️     | Deploy completo (Render + Vercel)                    |
| **v0.8.1**   | ✔️     | Dashboard + Auto-sync + Auth estable                 |
| **v0.9** | 🟡     | Home pública + Carta + Nosotros (Odilio Vogue Style) |
| **v1.0**     | ⏳      | Demo final para cliente                              |

---

# 📘 **Documentación de progreso**

* `/docs/resumenDia3.md` – Inicio del frontend
* `/docs/resumenDia4.md` – Integración catálogo/backend
* `/docs/resumenDia5.md` – CRUD completo
* `/docs/resumenDeploy6.md` – Deploy fullstack
* `/docs/resumenDia8.md` – Dashboard + auto-sync
* `/docs/resumenDia10-11.md` – Diseño público + Home

*(Se actualiza a diario durante el sprint.)*

---

# 🧊 **Visión futura (post-MVP)**

No forman parte del MVP, pero ya están pensados:

* Página “Contacto / Ubicación”
* Alineación estética del panel admin
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

---