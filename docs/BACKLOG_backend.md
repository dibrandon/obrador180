# ⚙️ Backlog Backend – Obrador 180 graus MVP

> Plan de desarrollo técnico del **backend (API + base de datos)** del proyecto.  
> Stack: Node.js, Express, Mongoose, MongoDB Atlas.  
> Objetivo: proveer datos consistentes y seguros al frontend y habilitar un flujo de pedidos básico.

---

## 🧭 Epic 1 – Configuración base y arquitectura

### 🎯 Meta
Tener un servidor Express funcional, modular y conectado a MongoDB Atlas.

### ✅ Tareas
- [x] Inicializar `backend/` con `npm init -y`
- [x] Instalar dependencias principales (`express`, `cors`, `dotenv`, `mongoose`)
- [x] Definir `"type": "module"` en `package.json`
- [x] Crear estructura de carpetas:
```bash
backend/
├── models/
├── routes/
├── scripts/
├── index.js
└── .env
```
- [x] Implementar servidor Express con middlewares base (`cors`, `express.json`)
- [x] Endpoint `/health` para test rápido del servicio
- [x] Conexión a MongoDB Atlas usando `dotenv`
- [x] Validar que el servidor arranca en puerto 4000

### 🧠 Notas
- Mantener logs claros en consola (emoji + prefijo)
- Separar responsabilidades desde el inicio (modelo / ruta / lógica)
- `.env` no se versiona (añadido a `.gitignore`)

### 🎯 Criterio de finalización
Servidor responde correctamente a `/health` y mantiene conexión estable a Atlas.

---

## 🧩 Epic 2 – Modelo y rutas de productos

### 🎯 Meta
Definir modelo `Product` y exponer endpoints REST básicos.

### ✅ Tareas
- [x] Crear `models/Product.js` con campos (ver ejemplo de esquema abajo).
- [ ] Crear `routes/products.js` con:
  - `GET /products` → lista todos los productos
  - `POST /products` → crea un producto (modo admin)
- [ ] Integrar rutas en `index.js` (`app.use("/products", productsRouter)`)
- [x] Script `scripts/seedProducts.js` para crear productos iniciales
- [ ] Testear con Postman o navegador (`http://localhost:4000/products`)
- [ ] Crear índice en Mongo para `createdAt` (ordenar descendentemente)
- [ ] Añadir validación de esquema con Mongoose (`required`, `trim`, `min`)

### 🧠 Notas
- No incluir campos “sensibles” ni autenticación aún (fase 2).
- Mantener nombres simples (sin pluralización forzada).
- Usar `timestamps: true` para simplificar seguimiento de creación/edición.

---
🎯 Criterio de finalización

GET /products devuelve lista completa desde Atlas
y POST /products inserta registros válidos sin errores.

---

## 🔐 Epic 3 – Validación, errores y seguridad básica

### 🎯 Meta

Proteger la API ante entradas incorrectas y registrar errores correctamente.

### ✅ Tareas

* [ ] Middleware `errorHandler` global con logs controlados
* [ ] Validar campos en `POST /products` (nombre y precio obligatorios)
* [ ] Manejar errores de conexión Mongo con `mongoose.connection.on("error")`
* [ ] Agregar `try/catch` en rutas con respuesta estándar `{ error: "mensaje" }`
* [ ] Sanitizar inputs (trim y escape en strings)
* [ ] Configurar CORS con whitelist (localhost + dominio final)
* [ ] Añadir rate-limit básico (express-rate-limit)
* [ ] Preparar middleware `logger` (req.method + ruta + timestamp)

### 🧠 Notas

* Seguridad mínima para MVP → suficiente con limpieza de inputs y CORS.
* Documentar respuestas esperadas en `docs/api_endpoints.md`.

### 🎯 Criterio de finalización

Ninguna ruta puede romper el servidor ante datos erróneos o repetidos.

---

## 📦 Epic 4 – Flujo de pedidos / Encargos (fase 2 opcional)

### 🎯 Meta

Registrar encargos provenientes del frontend (no compra online, solo aviso).

### ✅ Tareas

* [ ] Crear modelo `Order` con:

  ```js
  { name, product, phone, message, createdAt }
  ```
* [ ] Endpoint `POST /orders` (guardar aviso de pedido)
* [ ] Endpoint `GET /orders` (modo admin, autenticado)
* [ ] Validar teléfono y nombre (regex simple)
* [ ] Enviar notificación por correo (fase futura)
* [ ] Crear script de limpieza de pedidos antiguos (opcional)

### 🧠 Notas

* No se procesa pago, solo registro.
* Ordenar por fecha de creación descendente.
* Planificado para versión 2.0 del MVP.

### 🎯 Criterio de finalización

Los pedidos se guardan en Mongo y son accesibles desde `/orders`.

---

## ☁️ Epic 5 – Despliegue y mantenimiento

### 🎯 Meta

Tener el backend funcionando en entorno remoto (Render o similar).

### ✅ Tareas

* [ ] Crear cuenta en [Render](https://render.com/)
* [ ] Subir repo conectado a GitHub
* [ ] Configurar variables de entorno (`MONGO_URI`, `PORT`)
* [ ] Elegir plan free (Web Service)
* [ ] Verificar logs y respuesta en producción
* [ ] Añadir endpoint `/health` público para monitoreo
* [ ] Documentar URL final en README

### 🧠 Notas

* Asegurar que `CORS` permita dominio de Vercel.
* Evitar dependencias nativas (solo JS puro).

### 🎯 Criterio de finalización

API pública funcionando y accesible por el frontend desplegado.

---

## 🧾 Epic 6 – Documentación técnica

### 🎯 Meta

Registrar cómo funciona el backend y cómo mantenerlo.

### ✅ Tareas

* [x] Documentar en README: instalación y uso
* [ ] Crear `docs/api_endpoints.md` con ejemplos de peticiones
* [ ] Especificar estructura de modelos (`Product`, `Order`)
* [ ] Incluir guía rápida de despliegue Render
* [ ] Añadir checklist de QA de API
* [ ] Actualizar bitácoras (`resumenDia2.md`, etc.)

### 🎯 Criterio de finalización

Cualquier desarrollador externo puede clonar, instalar y ejecutar el backend sin preguntar nada.

---

## 🧱 Estado del Backend

**Versión actual:** `v0.3`
**Avance estimado:** ~20 %
**Última actualización:** 22 de octubre de 2025

---