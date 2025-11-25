import { useEffect, useState } from "react";
import {
  del,
  getInactiveProducts,
  getProducts,
  putJSON,
  restoreProduct,
} from "@/lib/api";
import { emitStatsChanged, subscribeStatsChanged } from "@/lib/events.js";

export default function AdminList() {
  const [items, setItems] = useState([]);
  const [archived, setArchived] = useState([]);
  const [editId, setEditId] = useState(null);
  const [draft, setDraft] = useState({ name: "", price: "", description: "" });
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

                      <div style={{ display: "flex", gap: 8 }}>
                        <button
                          type="button"
                          onClick={() => saveEdit(p._id)}
                          disabled={busy}
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
                          onClick={() => setEditId(null)}
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
