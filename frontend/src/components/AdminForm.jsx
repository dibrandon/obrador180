import { useEffect, useRef, useState } from "react";
import { postJSON } from "@/lib/api";
import { uploadImage } from "@/lib/uploadImage";

export default function AdminForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [imageURL, setImageURL] = useState("");

  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadError, setUploadError] = useState("");

  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const fileInputRef = useRef(null);

  // libera el blob URL cuando cambia o desmonta
  useEffect(() => {
    return () => { if (preview) URL.revokeObjectURL(preview); };
  }, [preview]);

  function validate() {
    const p = Number(price);
    if (!name.trim()) return "El nombre es obligatorio.";
    if (Number.isNaN(p) || p < 0) return "Precio inválido.";
    if (!imageURL) return "Falta la imagen del producto.";
    return "";
  }

  async function autoUpload(selectedFile) {
    setUploadError("");
    setUploading(true);
    setProgress(0);
    try {
      const url = await uploadImage(selectedFile, (p) => setProgress(p));
      setImageURL(url); // guardamos la URL (no se muestra)
    } catch (e) {
      setUploadError(e.message || "Error al subir la imagen");
      setImageURL("");
    } finally {
      setUploading(false);
    }
  }

  function onFileChange(e) {
    const f = e.target.files?.[0] || null;
    setFile(f);
    setImageURL("");
    setProgress(0);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(f ? URL.createObjectURL(f) : "");
    if (f) autoUpload(f); // auto-subir al elegir
  }

  async function onSubmit(e) {
    e.preventDefault();

    // fallback: si hay archivo seleccionado pero no se subió por alguna razón
    if (!imageURL && file && !uploading && !uploadError) {
      await autoUpload(file);
    }

    const err = validate();
    if (err) { setMsg(err); return; }

    setSaving(true);
    setMsg("Guardando…");
    try {
      await postJSON("/products", {
        name: name.trim(),
        price: Number(price),
        description: description.trim(),
        image: imageURL
      });

      // reset
      setName(""); setPrice(""); setDescription("");
      setFile(null); setImageURL(""); setProgress(0);
      if (preview) URL.revokeObjectURL(preview);
      setPreview("");
      if (fileInputRef.current) fileInputRef.current.value = "";
      setMsg("Guardado ✅");

      // refrescar catálogo
      window.dispatchEvent(new CustomEvent("products:changed"));
    } catch (e) {
      setMsg("Error: " + e.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="admin-form" onSubmit={onSubmit} noValidate>
      <h2 className="admin-form__title">Alta de producto</h2>

      {/* Imagen (auto-upload) */}
      <label className="admin-form__label">
        <span>Imagen *</span>
        <input
          ref={fileInputRef}
          className="admin-form__input"
          type="file"
          accept="image/*"
          onChange={onFileChange}
        />
        {preview && (
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 8 }}>
            <div style={{ position: "relative" }}>
              <img
                src={preview}
                alt="preview"
                style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 8, border: "1px solid #ddd" }}
              />
              {/* badge de estado */}
              <div style={{
                position: "absolute", left: 4, bottom: 4,
                background: "#000a", color: "#fff",
                fontSize: 12, padding: "2px 6px", borderRadius: 6
              }}>
                {uploading ? `Subiendo… ${progress}%`
                  : imageURL ? "Listo ✅"
                  : uploadError ? "Error" : "Pendiente"}
              </div>
            </div>
            {uploadError && <span style={{ color: "#b00020", fontSize: 13 }}>{uploadError}</span>}
          </div>
        )}
      </label>

      {/* Nombre */}
      <label className="admin-form__label">
        <span>Nombre *</span>
        <input
          className="admin-form__input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ej: Budín de zanahoria"
        />
      </label>

      {/* Descripción */}
      <label className="admin-form__label">
        <span>Descripción</span>
        <textarea
          className="admin-form__textarea"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Texto breve visible en la tarjeta"
        />
      </label>

      {/* Precio */}
      <label className="admin-form__label">
        <span>Precio € *</span>
        <input
          className="admin-form__input"
          type="number"
          inputMode="decimal"
          step="0.01"
          placeholder="0.00"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          onBlur={() => {
            if (price && !Number.isNaN(Number(price))) {
              setPrice(Number(price).toFixed(2));
            }
          }}
        />
      </label>

<button className="admin-form__button" type="submit" disabled={saving || uploading}>
  {saving ? "Guardando…" : "Guardar producto"}
</button>

{/* Mensaje normal (para fallback o errores menores) */}
{msg && !msg.includes("✅") && (
  <div className="admin-form__msg">{msg}</div>
)}

{/* Toast flotante (éxitos y errores importantes) */}
{msg && (
  <div
    role="status"
    style={{
      position: "fixed",
      left: "50%",
      bottom: 24,
      transform: "translateX(-50%)",
      background: msg.startsWith("Error") ? "#b00020" : "#222",
      color: "#fff",
      padding: "10px 14px",
      borderRadius: 8,
      boxShadow: "0 6px 20px rgba(0,0,0,.2)",
      fontWeight: 600,
      fontSize: "0.95rem",
      zIndex: 9999,
    }}
  >
    {msg}
  </div>
)}
</form>
  );
}
