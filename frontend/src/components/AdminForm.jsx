import { useEffect, useRef, useState } from "react";
import { postJSON } from "@/lib/api";
import { uploadImage } from "@/lib/uploadImage";
import { emitStatsChanged } from "@/lib/events.js";

export default function AdminForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [imageURL, setImageURL] = useState("");

  const [galleryUrls, setGalleryUrls] = useState([]);
  const [galleryUploading, setGalleryUploading] = useState(false);
  const [galleryError, setGalleryError] = useState("");

  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadError, setUploadError] = useState("");

  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const fileInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);

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
      setImageURL(url);
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
    if (f) autoUpload(f);
  }

  async function onGalleryChange(e) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setGalleryError("");
    setGalleryUploading(true);
    try {
      const uploaded = [];
      for (const f of files) {
        const url = await uploadImage(f);
        uploaded.push(url);
      }
      setGalleryUrls((prev) => [...prev, ...uploaded]);
      if (galleryInputRef.current) galleryInputRef.current.value = "";
    } catch (err) {
      setGalleryError(err.message || "No se pudieron subir las fotos adicionales");
    } finally {
      setGalleryUploading(false);
    }
  }

  function removeGalleryUrl(url) {
    setGalleryUrls((prev) => prev.filter((u) => u !== url));
  }

  async function onSubmit(e) {
    e.preventDefault();

    if (!imageURL && file && !uploading && !uploadError) {
      await autoUpload(file);
    }

    const err = validate();
    if (err) { setMsg(err); return; }

    setSaving(true);
    setMsg("Guardando...");
    try {
      await postJSON("/products", {
        name: name.trim(),
        price: Number(price),
        description: description.trim(),
        image: imageURL,
        gallery: galleryUrls,
      });

      setName(""); setPrice(""); setDescription("");
      setFile(null); setImageURL(""); setProgress(0);
      setGalleryUrls([]);
      if (preview) URL.revokeObjectURL(preview);
      setPreview("");
      if (fileInputRef.current) fileInputRef.current.value = "";
      if (galleryInputRef.current) galleryInputRef.current.value = "";
      setMsg("Guardado ✔.");

      emitStatsChanged();
    } catch (e) {
      setMsg("Error: " + e.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="admin-form" onSubmit={onSubmit} noValidate>
      <h2 className="admin-form__title">Alta de producto</h2>

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
              <div style={{
                position: "absolute", left: 4, bottom: 4,
                background: "#000a", color: "#fff",
                fontSize: 12, padding: "2px 6px", borderRadius: 6
              }}>
                {uploading ? `Subiendo... ${progress}%`
                  : imageURL ? "Listo ✔"
                  : uploadError ? "Error" : "Pendiente"}
              </div>
            </div>
            {uploadError && <span style={{ color: "#b00020", fontSize: 13 }}>{uploadError}</span>}
          </div>
        )}
      </label>

      <label className="admin-form__label">
        <span>Fotos adicionales</span>
        <input
          ref={galleryInputRef}
          className="admin-form__input"
          type="file"
          accept="image/*"
          multiple
          onChange={onGalleryChange}
        />
        {galleryUploading && <span style={{ fontSize: 13 }}>Subiendo galería...</span>}
        {galleryError && <span style={{ color: "#b00020", fontSize: 13 }}>{galleryError}</span>}
        {galleryUrls.length > 0 && (
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 8 }}>
            {galleryUrls.map((url) => (
              <div key={url} style={{ position: "relative" }}>
                <img src={url} alt="galería" width={70} height={70} style={{ objectFit: "cover", borderRadius: 8 }} />
                <button
                  type="button"
                  onClick={() => removeGalleryUrl(url)}
                  style={{
                    position: "absolute", top: -6, right: -6,
                    borderRadius: "50%", border: "1px solid #ccc",
                    width: 22, height: 22, background: "#fff", cursor: "pointer"
                  }}
                  aria-label="Quitar foto"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </label>

      <label className="admin-form__label">
        <span>Nombre *</span>
        <input
          className="admin-form__input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ej: Budín de zanahoria"
        />
      </label>

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
        {saving ? "Guardando..." : "Guardar producto"}
      </button>

      {msg && !msg.includes("✔.") && (
        <div className="admin-form__msg">{msg}</div>
      )}

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
