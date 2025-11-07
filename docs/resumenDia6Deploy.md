Perfecto 😴💪
Cerramos el **Día 6** con el deploy completo (API + frontend) funcionando en producción.
Aquí va el commit final y el resumen `resumenDeploy.md` para archivar en `/docs`.

---

## 🟩 **Commit sugerido**

```bash
git add .
git commit -m "deploy(fullstack): MVP v0.6 online – backend en Render y frontend en Vercel con enlace a WhatsApp y backoffice funcional"
git push
```

---

## 🧾 **resumenDeploy.md**

```markdown
# 🌐 Resumen Deploy – Obrador 180° MVP v0.6
**Fecha:** 2025-11-07  
**Estado:** ✅ Online (Render + Vercel)

---

## 1️⃣ Backend (Render)
**URL:** https://obrador180.onrender.com  
**Stack:** Node.js + Express + MongoDB Atlas  
**Principales rutas:**
| Ruta | Descripción |
|------|--------------|
| `/` | root de API (OK 200) |
| `/products` | productos activos (público) |
| `/products/inactive` | productos archivados (adminAuth) |
| `/products/:id` | edición, baja lógica, restauración |
| `/health` | chequeo de estado y conexión DB |

**Notas técnicas**
- Activado `app.set("trust proxy", 1)` (Render/Vercel detrás de proxy).  
- CORS con whitelist desde `.env (ALLOWED_ORIGINS)` → incluye `https://obrador180.vercel.app`.  
- Logger y manejador de errores centralizados.  
- `rateLimit` activo en `/products`.  
- `adminAuth` protege las operaciones CRUD.

---

## 2️⃣ Frontend (Vercel)
**URL:** https://obrador180.vercel.app  
**Stack:** React + Vite + modular CSS  


**Rutas principales (SPA React Router)**
| Path | Descripción |
|------|--------------|
| `/` | Home con carta base |
| `/admin?k=****` | Backoffice con panel CRUD |
| `/encargar` | Redirección a WhatsApp con mensaje prearmado |

**Cambios clave**
- Deploy estable con **SPA rewrites** en `vercel.json` para evitar 404 en rutas internas.  
- WhatsApp link reparado: toma `VITE_WAPP_PHONE` del entorno.  
- Integración completa con backend Render: datos reales y persistentes.  
- Diseño responsivo validado en Galaxy S8 y escritorio.  

---

## 3️⃣ Verificación final
- ✅ Productos cargan correctamente desde `/products`.  
- ✅ WhatsApp abre con mensaje precargado.  
- ✅ Backoffice visible y operable desde `/admin?k=luna2025`.  
- ⚠️ En local el admin requiere header `Authorization` → pendiente helper `authHeader()`.  

---

## 4️⃣ Próximos pasos (Día 7)
- [ ] Implementar helper `authHeader()` para entorno local.  
- [ ] Pruebas de CRUD completas (alta, baja, restore, edición).  
- [ ] Configurar carga de imágenes reales (Cloudinary unsigned).  
- [ ] Ajustes de diseño final (footer, textos legales).  

---

**Deploy exitoso 🎉**  
_MVP v0.6 completado y listo para demo con cliente._
