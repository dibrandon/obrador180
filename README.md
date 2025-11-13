# Obrador 180 graus – MVP Web  
**Versión actual:** `v0.8.1 – Dashboard auto-sync (Render + Vercel + Cloudinary)`  

Proyecto MVP desarrollado con stack **MERN (MongoDB, Express, React, Node.js)**.  
Objetivo: **reposicionar Obrador 180 graus como pastelería artesanal** y recuperar su clientela fiel mediante una presencia digital clara, estética y funcional.

---

## 🧭 Objetivos generales

- Mostrar catálogo de productos reales con fotos, precios y descripciones.  
- Permitir encargos directos vía **WhatsApp Business**.  
- Facilitar la gestión del catálogo desde un **panel administrativo sencillo** (sin conocimientos técnicos).  
- Simplificar mantenimiento y minimizar costes de hosting.  
- Desplegar una versión pública funcional en menos de 4 semanas.

---

## 🗂️ Estructura del proyecto

```bash
obrador180/
├── frontend/   # React + Vite (UI pública y panel admin)
├── backend/    # Node + Express (API + conexión Mongo)
├── docs/       # Documentación, bitácoras y resúmenes de desarrollo
├── design/     # Wireframes, paleta y referencias visuales
└── README.md
````

---

## 🧰 Stack técnico

**Frontend:** React + Vite
**Backend:** Node.js + Express
**Base de datos:** MongoDB Atlas

**Hosting:**

* Frontend → Vercel *(free tier)*
* Backend → Render *(free tier)*

**Imágenes:** Cloudinary *(unsigned preset → `obrador_products`)*
**Mensajería:** WhatsApp Business (`wa.me`)

---

## 🧩 Estado actual – Versión v0.8.1

El proyecto alcanza la **fase v0.8.1**, con mejoras significativas en UX del panel administrativo, nuevo Dashboard reactivo y sistema de sincronización en vivo.

### ✅ Logros del Bloque 5 (Día 8)

#### 🔐 Autenticación refinada

* Login admin basado en **clave persistente**.
* `AdminGuard` unifica verificación local + `/admin/ping`.
* Manejo diferenciado de errores: `unauthorized`, `network`, `offline`.

#### 📊 Dashboard administrativo (nuevo)

* Nueva ruta protegida: `/admin/dashboard`.
* Estadísticas en vivo:

  * Productos activos
  * Archivados
  * Total
  * Última modificación
* UI reactiva con estados: `loading`, `error`, `offline`, `ready`.

#### 🔄 Sincronización automática catálogo ↔ dashboard

* Nuevo módulo de eventos internos:

  * `emitStatsChanged()`
  * `subscribeStatsChanged()`
* Cualquier acción en el catálogo (alta, edición, baja, restauración) refresca automáticamente el Dashboard.
* UX mucho más fluida sin recargar la SPA.

#### 🛠 Backend

* Nuevo endpoint protegido:

  ```
  GET /admin/stats
  ```

  entregando `total`, `active`, `inactive`, `lastUpdate`.
* Middleware `adminAuth` + `noStore` aplicados correctamente.
* Consultas paralelas para mayor velocidad.

#### 🌐 Producción estable

* Conexión Vercel ↔ Render 100% operativa.
* CORS afinado para AdminGuard y Dashboard.
* Cache-control estricto para vistas privadas.

---

## 🚀 Scripts básicos

### Frontend

```bash
cd frontend
npm run dev      # entorno local
npm run build    # compilar versión producción
```

### Backend

```bash
cd backend
npm run dev      # servidor local en puerto 4000
npm start        # ejecución en producción
```

---

## 🌐 URLs de producción

| Componente            | URL                                                                        |
| --------------------- | -------------------------------------------------------------------------- |
| 🧱 Backend (API)      | [https://obrador180.onrender.com](https://obrador180.onrender.com)         |
| 🌍 Frontend (público) | [https://obrador180.vercel.app](https://obrador180.vercel.app)             |
| 🔑 Backoffice (admin) | [https://obrador180.vercel.app/admin](https://obrador180.vercel.app/admin) |

> El acceso al panel admin está protegido por clave (`ADMIN_KEY` en backend) y gestionado mediante `/admin/login`.

---

## 📅 Plan de desarrollo

| Bloque | Foco principal                          | Entregable / Estado                      |
| ------ | --------------------------------------- | ---------------------------------------- |
| 1️⃣    | Setup técnico + arquitectura MERN       | ✅ Repositorios locales operativos        |
| 2️⃣    | Catálogo real + productos con imágenes  | ✅ Catálogo público navegable             |
| 3️⃣    | Back-office (CRUD + conexión DB)        | ✅ CRUD administrativo conectado (v0.6)   |
| 4️⃣    | Deploy fullstack (Render + Vercel + QA) | ✅ Demo online estable (v0.7)             |
| 5️⃣    | Dashboard + métricas + Auth refinado    | ✅ Dashboard auto-sync operativo (v0.8.1) |

---

## 👥 Roles

* **Dev / PM:** Alejandro
* **PO / QA:** Pyttu
* **Cliente:** Obrador 180 graus (Vilanova i la Geltrú)

---

## 📄 Documentación de progreso

* `docs/resumenDia3.md` → Finalización Frontend (v0.5)
* `docs/resumenDia4.md` → Integración Catálogo-Backend
* `docs/resumenDia5.md` → Back-office CRUD completo (v0.6)
* `docs/resumenDeploy6.md` → Deploy Render + Vercel (v0.7)
* `docs/resumenDia8.md` → Dashboard + auto-sync (v0.8.1)

---

## 🔖 Próxima versión

**Objetivo v0.9 – “Mejoras UI + refinamiento admin”**

* Ajustes visuales del panel.
* Mejorar UX de edición/baja.
* Añadir confirmaciones y loaders visibles.
* Botones coherentes con identidad visual del obrador.
* Optimizar imágenes en catálogo público.

---

## 🧾 Licencia

Proyecto interno sin licencia pública.
© 2025 – Alejandro.

```

---