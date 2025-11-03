import { useRef, useState, useEffect } from "react";
import { postJSON } from "@/lib/api";
import { uploadImage } from "@/lib/uploadImage";

export default function AdminForm(){
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const fileInputRef = useRef(null);

  // libera el blob URL anterior al cambiar de archivo o desmontar
  useEffect(() => {
    return () => { if (preview) URL.revokeObjectURL(preview); };
  }, [preview]);

  function validate(){
    const p = Number(price);
    if(!name.trim()) return "El nombre es obligatorio.";
    if(Number.isNaN(p) || p < 0) return "Precio inválido.";
    return "";
  }

  function onFileChange(e){
    const f = e.target.files?.[0] || null;
    setFile(f);
    setImageURL("");
    setProgress(0);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(f ? URL.createObjectURL(f) : "");
  }

  async function onUpload(){
    if(!file) return setMsg("Selecciona una imagen");
    setUploading(true); setMsg("Subiendo imagen…"); setProgress(0);
    try{
      const url = await uploadImage(file, (p)=>setProgress(p));
      setImageURL(url);
      setMsg("Imagen lista");
    }catch(e){ setMsg("Error al subir: " + e.message); }
    finally{ setUploading(false); }
  }

  async function onSubmit(e){
    e.preventDefault();
    const err = validate(); if(err){ setMsg(err); return; }
    // opcional: exigir haber subido imagen
    //if (!imageURL) { setMsg("Sube la imagen y pulsa “Subir imagen” antes de guardar."); return; }

    setSaving(true); setMsg("Guardando…");
    try{
      await postJSON("/products", {
        name: name.trim(),
        price: Number(price),
        description: description.trim(),
        image: imageURL || ""
      });
      // reset duro
      setName(""); setPrice(""); setDescription("");
      setFile(null); setImageURL(""); setProgress(0);
      if (preview) URL.revokeObjectURL(preview);
      setPreview("");
      if (fileInputRef.current) fileInputRef.current.value = ""; // limpia control
      setMsg("Guardado ✅");
      window.dispatchEvent(new CustomEvent("products:changed"));
      fetch("/products").catch(()=>{});
    }catch(e){ setMsg("Error: " + e.message); }
    finally{ setSaving(false); }
  }

  return (
    <form className="admin-form" onSubmit={onSubmit} noValidate>
      <h2 className="admin-form__title">Alta de producto</h2>

      <label className="admin-form__label">
        <span>Imagen</span>
        <input
          ref={fileInputRef}
          className="admin-form__input"
          type="file"
          accept="image/*"
          onChange={onFileChange}
        />
        {preview && (
          <div style={{ display:'flex', gap:12, alignItems:'center', marginTop:8 }}>
            <img src={preview} alt="preview" style={{ width:80, height:80, objectFit:'cover', borderRadius:8, border:'1px solid #ddd' }}/>
            <button type="button" className="admin-form__button" onClick={onUpload} disabled={uploading}>
              {uploading ? `Subiendo… ${progress || 0}%` : "Subir imagen"}
            </button>
          </div>
        )}
        {imageURL && <div className="admin-form__msg" style={{ marginTop:8 }}>URL: {imageURL}</div>}
      </label>

      <label className="admin-form__label">
        <span>Nombre *</span>
        <input className="admin-form__input" value={name} onChange={e=>setName(e.target.value)} placeholder="Ej: Budín de zanahoria"/>
      </label>

      <label className="admin-form__label">
        <span>Descripción</span>
        <textarea className="admin-form__textarea" rows={3} value={description} onChange={e=>setDescription(e.target.value)} placeholder="Texto breve de descripción."/>
      </label>

      <label className="admin-form__label">
        <span>Precio € *</span>
        <input className="admin-form__input" type="number" inputMode="decimal" step="0.01"
               value={price} onChange={e=>setPrice(e.target.value)}
               onBlur={()=>{ if(price && !Number.isNaN(Number(price))) setPrice(Number(price).toFixed(2)); }}/>
      </label>

      <button className="admin-form__button" disabled={saving}>{saving ? "Guardando…" : "Guardar producto"}</button>
      {msg && <div className="admin-form__msg">{msg}</div>}
    </form>
  );
}

