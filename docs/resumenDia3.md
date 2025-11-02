# 🧭 Resumen Día 3 – Consolidación del backend y estabilidad del sistema

## 📊 Resumen rápido

| Área                   | Estado | Comentario                                                     |
| ---------------------- | ------ | -------------------------------------------------------------- |
| Backend (API)          | ✅      | Modelo final y rutas operativas (`GET`/`POST /products`)       |
| Validación & seguridad | ✅ MVP  | Middlewares, CORS, rate-limit y logger verificados manualmente |
| Infraestructura        | 🟡     | Conexión Atlas estable; deploy pendiente                       |
| Frontend (UI)          | 🔜     | Preparado para iniciar sistema de estilos artesanal            |
| Documentación          | 🟡     | README y bitácora actualizados hasta este punto                |
| Próximo paso           | 🔜     | Iniciar `frontend/` (estructura React + sistema CSS base)      |

---

## 🧱 Avances técnicos del día

### 🔹 1. Modelo `Product` definitivo

Se incorporó el campo `isActive` con `default: true`, completando el esquema del producto.
Esto resolvió el bug que ocultaba los productos creados antes de agregar el campo y dejó la base lista para paginación, estados o desactivaciones futuras.

---

### 🔹 2. Rutas `/products` verificadas end-to-end

* **GET /products**: devuelve la lista ordenada por `createdAt` (desc).
* **POST /products**: valida `name` y `price`, y responde con `201`.
* **Validaciones** y manejo de errores funcionales (400 y 500).
* Probado exhaustivamente con `curl`, sin fallos ni excepciones en consola.

---

### 🔹 3. Middlewares y seguridad base

El backend quedó reforzado con un conjunto de utilidades globales:

* `express.json()` activo desde inicio.
* `cors()` con **whitelist** dinámica definida en `.env` (`ALLOWED_ORIGINS`).
* `rateLimit()` aplicado solo sobre `/products`.
* `logger` propio con timestamp ISO.
* `errorHandler` centralizado con respuesta JSON.

El endpoint `/health` se amplió para devolver:

```json
{
  "ok": true,
  "db": "connected",
  "service": "obrador180-api",
  "uptime": "XXXs",
  "timestamp": "2025-11-02T..."
}
```

---

### 🔹 4. QA manual exitoso

Se realizaron pruebas reales con `curl`:

#### **CORS**

| Prueba                          | Resultado                                                                 |
| ------------------------------- | ------------------------------------------------------------------------- |
| `Origin: http://localhost:5173` | ✅ `200 OK` con `Access-Control-Allow-Origin` correcto                     |
| `Origin: http://malicioso.com`  | ✅ `403 Forbidden` con cuerpo `{ "error":"Origen no permitido por CORS" }` |

#### **Rate-limit**

| Prueba                        | Resultado                                        |
| ----------------------------- | ------------------------------------------------ |
| +100 requests a `/products`   | ✅ Últimas 10 devolvieron `429 Too Many Requests` |
| `/health` fuera del limitador | ✅ Siempre responde `200 OK`                      |

#### **Otros**

* Logs correctos en consola (`GET`, `POST`, timestamps).
* Ningún crash ni error no manejado.

---

## 🧩 Estado de épicas del backend

| Epic                       | Descripción                          | Estado | Observaciones                                   |
| -------------------------- | ------------------------------------ | ------ | ----------------------------------------------- |
| 1️⃣ Configuración base     | Express, conexión Atlas, `/health`   | ✅      | Sin fallos                                      |
| 2️⃣ Modelo y rutas         | `Product` completo y probado         | ✅      | Listo para seed real                            |
| 3️⃣ Validación y seguridad | Middleware, logger, rate-limit, CORS | ✅ MVP  | Falta sanitización avanzada y tests automáticos |
| 4️⃣ Flujo de pedidos       | Encargos (`/orders`)                 | ⏸      | Planificado para versión 0.5                    |
| 5️⃣ Deploy y mantenimiento | Render + variables de entorno        | 🟡     | Próximo paso                                    |
| 6️⃣ Documentación técnica  | README + API docs                    | 🟡     | En proceso (`resumenDia3.md` creado)            |

---

## 🧭 Próximos pasos

1. Inicializar `frontend/` con Vite + React.
2. Configurar `reset.css`, `tokens.css`, `base.css` y `layout.css`.
3. Crear primer componente `ProductCard` conectado al endpoint `/products`.
4. Documentar avances en `resumenDia4.md`.

---
