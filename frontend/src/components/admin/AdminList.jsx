import { useEffect, useState } from "react";
import {
  del,
  getInactiveProducts,
  getProducts,
  putJSON,
  restoreProduct,
} from "@/lib/api";
import { emitStatsChanged, subscribeStatsChanged } from "@/lib/events.js";
import { uploadImage } from "@/lib/uploadImage";

export default function AdminList() {
  const [items, setItems] = useState([]);
  const [archived, setArchived] = useState([]);
  const [editId, setEditId] = useState(null);
  const [draft, setDraft] = useState({ name: "", price: "", description: "" });
  const [galleryDraft, setGalleryDraft] = useState([]);
  const [galleryUploading, setGalleryUploading] = useState(false);
  const [galleryError, setGalleryError] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    load();
    const unsubscribe = subscribeStatsChanged(() => load());
    return () => unsubscribe?.();
  }, []);

  async function load() {
    try {
      const [active, inactive] = await Promise.all([
        getProducts(),
        getInactiveProducts(),
      ]);
      setItems(active || []);
      setArchived(inactive || []);
      setMsg("");
    } catch (e) {
      setMsg("Error cargando productos: " + e.message);
    }
  }

  function startEdit(p) {
    setEditId(p?._id || null);
    setDraft({
      name: p?.name || "",
      price:
        p?.price === null || p?.price === undefined ? "" : String(p.price),
      description: p?.description || "",
    });
    setGalleryDraft(Array.isArray(p?.gallery) ? p.gallery : []);
    setGalleryError("");
  }

  async function addGalleryFiles(files) {
    if (!files.length) return;
    setGalleryError("");
    setGalleryUploading(true);
    try {
      const uploaded = [];
      for (const f of files) {
        const url = await uploadImage(f);
        uploaded.push(url);
      }
      setGalleryDraft((prev) => [...prev, ...uploaded]);
    } catch (e) {
      setGalleryError(e.message || "Error subiendo galeria");
    } finally {
      setGalleryUploading(false);
    }
  }

  function onGalleryChange(e) {
    const files = Array.from(e.target.files || []);
    addGalleryFiles(files);
    if (e.target) e.target.value = "";
  }

  function removeGalleryUrl(url) {
    setGalleryDraft((prev) => prev.filter((u) => u !== url));
  }

  async function saveEdit(id) {
    setBusy(true);
    setMsg("Guardando cambios…");
    try {
      const { name, price, description } = draft;
      await putJSON(`/products/${id}`, {
        name: name || "",
        price: Number(price),
        description: description || "",
        gallery: galleryDraft,
      });
      setEditId(null);
      setMsg("Cambios guardados ✅");
      emitStatsChanged();
      await load();
    } catch (e) {
      setMsg("Error guardando cambios: " + e.message);
    } finally {
      setBusy(false);
    }
  }

  async function remove(id) {
    if (!confirm("¿Dar de baja este producto?")) return;
    setBusy(true);
    setMsg("");
    try {
      await del(`/products/${id}`);
      setMsg("Baja realizada ✅");
      emitStatsChanged();
      await load();
    } catch (e) {
      setMsg("Error al dar de baja: " + e.message);
    } finally {
      setBusy(false);
    }
  }

  async function restore(id) {
    setBusy(true);
    setMsg("");
    try {
      await restoreProduct(id);
      setMsg("Restaurado ✅");
      emitStatsChanged();
      await load();
    } catch (e) {
      setMsg("Error al restaurar: " + e.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <section className="admin-form" style={{ maxWidth: 720 }}>
        <h2 style={{ marginBottom: 12 }}>Productos</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {items.map((p) => {
            const priceValue = Number(p?.price);
            const priceLabel = Number.isFinite(priceValue)
              ? priceValue.toFixed(2)
              : "0.00";
            const isEditing = editId === p._id;

            return (
              <article
                key={p._id || p.id || p.name}
                style={{
                  border: "1px solid #dcdcdc",
                  borderRadius: 12,
                  padding: 12,
                  background: "#fff",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 12,
                    overflow: "hidden",
                    background: "#f8f8f8",
                    border: p.image ? "1px solid #f0f0f0" : "1px dashed #c2c2c2",
                    flexShrink: 0,
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.name || "Producto"}
                      width={56}
                      height={56}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    <span style={{ fontSize: 11, color: "#666" }}>Sin foto</span>
                  )}
                </div>

                <div style={{ flex: 1 }}>
                  {!isEditing && (
                    <>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <strong style={{ fontSize: 16, color: "#222" }}>
                          {p.name || "(Sin nombre)"}
                        </strong>
                        <span style={{ fontSize: 13, color: "#555" }}>
                          € {priceLabel}
                        </span>
                      </div>
                      {p.description ? (
                        <small style={{ color: "#555" }}>{p.description}</small>
                      ) : null}
                      {Array.isArray(p.gallery) && p.gallery.length > 0 ? (
                        <small style={{ color: "#777" }}>{p.gallery.length} foto(s) adicionales</small>
                      ) : null}
                    </>
                  )}

                  {isEditing && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      <input
                        type="text"
                        value={draft.name}
                        onChange={(e) =>
                          setDraft((prev) => ({ ...prev, name: e.target.value }))
                        }
                        placeholder="Nombre"
                        style={{
                          padding: "8px 10px",
                          borderRadius: 8,
                          border: "1px solid #d0d0d0",
                        }}
                        disabled={busy}
                      />
                      <textarea
                        value={draft.description}
                        onChange={(e) =>
                          setDraft((prev) => ({ ...prev, description: e.target.value }))
                        }
                        placeholder="Descripción"
                        rows={2}
                        style={{
                          padding: "8px 10px",
                          borderRadius: 8,
                          border: "1px solid #d0d0d0",
                          resize: "vertical",
                        }}
                        disabled={busy}
                      />
                      <input
                        type="text"
                        value={draft.price}
                        onChange={(e) =>
                          setDraft((prev) => ({ ...prev, price: e.target.value }))
                        }
                        onBlur={() =>
                          setDraft((prev) => {
                            const n = Number(prev.price);
                            if (!Number.isFinite(n)) return prev;
                            return { ...prev, price: n.toFixed(2) };
                          })
                        }
                        placeholder="0.00"
                        style={{
                          padding: "8px 10px",
                          borderRadius: 8,
                          border: "1px solid #d0d0d0",
                          maxWidth: 160,
                        }}
                        disabled={busy}
                      />

                      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                        <label style={{ fontSize: 13, fontWeight: 600 }}>Galería (opcional)</label>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={onGalleryChange}
                          disabled={busy}
                          style={{
                            padding: "6px 8px",
                            borderRadius: 8,
                            border: "1px solid #d0d0d0",
                            background: "#fff",
                          }}
                        />
                        {galleryUploading && <span style={{ fontSize: 12 }}>Subiendo fotos...</span>}
                        {galleryError && <span style={{ fontSize: 12, color: "#b00020" }}>{galleryError}</span>}
                        {galleryDraft.length > 0 && (
                          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 4 }}>
                            {galleryDraft.map((url) => (
                              <div key={url} style={{ position: "relative" }}>
                                <img
                                  src={url}
                                  alt="galeria"
                                  width={60}
                                  height={60}
                                  style={{ objectFit: "cover", borderRadius: 8, border: "1px solid #e0e0e0" }}
                                />
                                <button
                                  type="button"
                                  onClick={() => removeGalleryUrl(url)}
                                  disabled={busy}
                                  style={{
                                    position: "absolute",
                                    top: -6,
                                    right: -6,
                                    width: 20,
                                    height: 20,
                                    borderRadius: "50%",
                                    border: "1px solid #ccc",
                                    background: "#fff",
                                    cursor: "pointer",
                                  }}
                                  aria-label="Quitar foto"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div style={{ display: "flex", gap: 8 }}>
                        <button
                          type="button"
                          onClick={() => saveEdit(p._id)}
                          disabled={busy || galleryUploading}
                          style={{
                            padding: "8px 12px",
                            borderRadius: 8,
                            border: "1px solid #2f6f2f",
                            background: "#2f9e44",
                            color: "#fff",
                            cursor: "pointer",
                          }}
                        >
                          Guardar
                        </button>
                        <button
                          type="button"
                          onClick={() => { setEditId(null); setGalleryDraft([]); setGalleryError(""); }}
                          disabled={busy}
                          style={{
                            padding: "8px 12px",
                            borderRadius: 8,
                            border: "1px solid #d0d0d0",
                            background: "#f8f8f8",
                            color: "#444",
                            cursor: "pointer",
                          }}
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {!isEditing && (
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      type="button"
                      onClick={() => startEdit(p)}
                      disabled={busy}
                      style={{
                        padding: "8px 10px",
                        borderRadius: 8,
                        border: "1px solid #d0d0d0",
                        background: "#f6f6f6",
                        color: "#333",
                        cursor: "pointer",
                      }}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => remove(p._id)}
                      disabled={busy}
                      style={{
                        padding: "8px 10px",
                        borderRadius: 8,
                        border: "1px solid #f1c0c0",
                        background: "#ffeaea",
                        color: "#c62828",
                        cursor: "pointer",
                      }}
                    >
                      Baja
                    </button>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>

      <section
        className="admin-form"
        style={{ maxWidth: 720, marginTop: 16 }}
      >
        <h2 style={{ marginBottom: 12 }}>Archivados (baja lógica)</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {archived.map((p) => {
            const priceValue = Number(p?.price);
            const priceLabel = Number.isFinite(priceValue)
              ? priceValue.toFixed(2)
              : "0.00";
            return (
              <article
                key={p._id || p.id || p.name}
                style={{
                  border: "1px dashed #dcdcdc",
                  borderRadius: 12,
                  padding: 12,
                  background: "#fafafa",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 12,
                    overflow: "hidden",
                    background: "#f0f0f0",
                    border: p.image ? "1px solid #f0f0f0" : "1px dashed #c2c2c2",
                    flexShrink: 0,
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.name || "Producto"}
                      width={56}
                      height={56}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    <span style={{ fontSize: 11, color: "#666" }}>Sin foto</span>
                  )}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <strong style={{ fontSize: 16, color: "#222" }}>
                      {p.name || "(Sin nombre)"}
                    </strong>
                    <span style={{ fontSize: 13, color: "#555" }}>
                      € {priceLabel}
                    </span>
                  </div>
                  {Array.isArray(p.gallery) && p.gallery.length > 0 ? (
                    <small style={{ color: "#777" }}>{p.gallery.length} foto(s) adicionales</small>
                  ) : null}
                </div>

                <button
                  type="button"
                  onClick={() => restore(p._id)}
                  disabled={busy}
                  style={{
                    padding: "8px 10px",
                    borderRadius: 8,
                    border: "1px solid #2f6f2f",
                    background: "#2f9e44",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  Restaurar
                </button>
              </article>
            );
          })}
        </div>
      </section>

      {msg ? (
        <p style={{ marginTop: 12, color: "#333" }} className="admin-form__msg">
          {msg}
        </p>
      ) : null}
    </>
  );
}
