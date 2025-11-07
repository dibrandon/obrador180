# 🧭 Resumen Día 5 — Bloque 2: Back-office funcional con autenticación y CRUD completo  
**Versión:** `v0.6 – MVP back-office funcional conectado`  
**Fecha:** 07 nov 2025  
**Duración estimada:** ≈ 11 h efectivas  

---

## 🧩 Contexto general
El Día 5 marcó el cierre del **Bloque 2 del MVP**: integración total entre frontend y backend, gestión completa del catálogo desde el panel administrativo y consolidación del flujo de imágenes en Cloudinary.  
Hasta ahora el sistema sólo permitía altas (`POST`); en este bloque se implementaron las **mutaciones seguras** (`PUT / DELETE / RESTORE`) con autenticación básica, manejo de errores robusto y una interfaz admin unificada.

---

## ⚙️ Backend – Seguridad, autenticación y nuevas rutas

**Archivos principales:**  
`backend/index.js`, `backend/routes/products.js`, `backend/middleware/adminAuth.js`

**Cambios destacados:**
- ✅ **Middleware `adminAuth`**: control de acceso por `ADMIN_KEY` con esquema `Authorization: Basic <key:x>` (y fallback `?k=`).  
- ✅ **Rutas extendidas de productos:**
  - `PUT /products/:id` → edición (`name`, `price`, `description`)
  - `DELETE /products/:id` → baja lógica (`isActive =false`)
  - `GET /products/inactive` → listado de archivados (solo admin)
  - `PUT /products/:id/restore` → restauración (`isActive =true`)
- ✅ **GET /público** permanece libre (solo productos activos).  
- ✅ Orden de carga de `dotenv` corregido: importar `"dotenv/config.js"` *antes* de Express garantizó la lectura de `ADMIN_KEY`.  
- ✅ Logging y rate-limit revisados; coherencia en errores JSON.

**Resultado:** el backend pasa de “simple API de catálogo” a “servicio administrativo seguro con control de acceso”.

---

## 💻 Frontend – Panel administrativo y UX/feedback

**Archivos:**  
`frontend/src/components/AdminForm.jsx`  
`frontend/src/components/AdminList.jsx`  
`frontend/src/lib/api.js`  
`frontend/src/pages/Admin.jsx`  
`frontend/src/styles/admin.css`

### 🧱 1. Refactor de API .js
- Añadido `handle(res, ctx)` → único punto de gestión de errores/respuestas.  
- Nuevos helpers:
  - `getInactiveProducts()`
  - `restoreProduct(id)`
- Todas las llamadas privadas usan `VITE_ADMIN_KEY` → Basic Auth.

### 🪄 2. AdminForm.jsx refinado
- **Auto-upload Cloudinary unsigned**: subida automática en el submit si el usuario elige archivo.  
- Añadida carpeta fija → `obrador/products`.  
- Eliminada visualización cruda de URL; se conserva previsualización con miniatura.  
- Toast visual “Guardado ✅” tras confirmación de creación.

### 📋 3. AdminList.jsx – CRUD visual
- Listado de productos activos con edición en línea (`name`, `price`, `description`).  
- Botones *Editar* / *Baja* / *Restaurar* con feedback de estado.  
- Integración con la API unificada (`putJSON`, `del`, `restoreProduct`).  
- Sección inferior muestra productos inactivos con botón *Restaurar*.  
- Manejo de mensajes unificado (`msg` state) con estilo coherente a AdminForm.

### 🎨 4. Estética y coherencia UI
- `admin.css`: inputs y botones uniformes, layout limpio “roco abuela 90s”.  
- Contenedor central con sombreado, paddings consistentes y estilo mobile-first.  
- Eliminado el fondo pastel en móviles → color blanco con sombras suaves.  
- Feedback visual inmediato y transición entre secciones sin recarga.

---

## 🔗 Integración global
- `Admin.jsx` ahora combina ambos componentes (`AdminForm` + `AdminList`) dentro de `<main className="container">`, manteniendo proporciones responsivas.  
- Flujo end-to-end validado:  
  1️⃣ Alta con imagen Cloudinary → 2️⃣ Edición → 3️⃣ Baja → 4️⃣ Restauración.  
- Confirmado funcionamiento en móvil (emulador Chrome Galaxy S8).

---

## 🧮 Diagnóstico y QA
- **Error inicial “ADMIN_KEY no configurado”** corregido al mover `import "dotenv/config.js"` antes de Express.  
- **Tiempo medio de carga API:** ≈ 250 ms (local).  
- **Cloudinary:** preset `obrador_products` (unsigned + carpeta obrador/products) validado.  
- **Regresión comprobada:** productos activos siguen visibles en el catálogo público `/`.

---

## 📦 Resultado del bloque
Sistema **CRUD seguro, completo y estable**, con interfaz administrativa apta para uso real.  
El back-office ya permite gestionar productos sin acceso directo a la base de datos.  
Listo para las siguientes fases: autenticación de usuarios y dashboard ampliado.

---

## 🔖 Versión del MVP

**Nueva versión:** `v0.6 – Back-office funcional conectado`  