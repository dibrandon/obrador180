// src/components/AdminList.jsx
import { useEffect, useState } from "react";
import {
  getProducts,
  putJSON,
  del,
  getInactiveProducts,
  restoreProduct,
} from "@/lib/api";
import { emitStatsChanged, subscribeStatsChanged } from "@/lib/events.js";

export default function AdminList() {
  const [items, setItems] = useState([]);       // activos
  const [archived, setArchived] = useState([]); // inactivos
  const [editId, setEditId] = useState(null);
  const [draft, setDraft] = useState({ name: "", price: "", description: "" });
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  async function load() {
    try {
      const [act, ina] = await Promise.all([
        getProducts(),
        getInactiveProducts(),
      ]);
      setItems(act);
      setArchived(ina);
    } catch (e) {
      setMsg("Error cargando productos: " + e.message);
    }
  }

  useEffect(() => {
    load();
    const unsubscribe = subscribeStatsChanged(() => load());
    return unsubscribe;
  }, []);

  function startEdit(p) {
    setEditId(p._id);
    setDraft({
      name: p.name || "",
      price: String(p.price ?? ""),
      description: p.description || "",
    });
  }

  async function saveEdit(id) {
    try {
      setBusy(true);
      setMsg("Guardando cambios…");
      await putJSON(`/products/${id}`, {
        name: draft.name.trim(),
        price: Number(draft.price),
        description: draft.description.trim(),
      });
      setEditId(null);
      setMsg("Cambios guardados ✅");
      emitStatsChanged();
      load();
    } catch (e) {
      setMsg("Error: " + e.message);
    } finally {
      setBusy(false);
    }
  }

  async function remove(id) {
    if (!confirm("¿Dar de baja este producto?")) return;
    try {
      setBusy(true);
      await del(`/products/${id}`);
      setMsg("Baja realizada ✅");
      emitStatsChanged();
      load();
    } catch (e) {
      setMsg("Error al dar de baja: " + e.message);
    } finally {
      setBusy(false);
    }
  }

  async function restore(id) {
    try {
      setBusy(true);
      await restoreProduct(id);
      setMsg("Restaurado ✅");
      emitStatsChanged();
      load();
    } catch (e) {
      setMsg("Error al restaurar: " + e.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      {/* Activos */}
      <section className="admin-form" style={{ maxWidth: 720 }}>
        <h2 className="admin-form__title">Productos</h2>

        <div style={{ display: "grid", gap: 10 }}>
          {items.length === 0 && (
            <div style={{ opacity: 0.7, fontSize: ".95rem" }}>
              No hay productos activos aún.
            </div>
          )}

          {items.map((p) => (
            <article
              key={p._id}
              style={{
                border: "1px solid #e5e5e5",
                borderRadius: 10,
                padding: 10,
                display: "grid",
                gap: 8,
              }}
            >
              {editId === p._id ? (
                <>
                  <label className="admin-form__label" style={{ marginBottom: 0 }}>
                    <span>Nombre</span>
                    <input
                      className="admin-form__input"
                      value={draft.name}
                      onChange={(e) =>
                        setDraft((d) => ({ ...d, name: e.target.value }))
                      }
                    />
                  </label>

                  <label className="admin-form__label" style={{ marginBottom: 0 }}>
                    <span>Descripción</span>
                    <textarea
                      className="admin-form__textarea"
                      rows={2}
                      value={draft.description}
                      onChange={(e) =>
                        setDraft((d) => ({ ...d, description: e.target.value }))
                      }
                    />
                  </label>

                  <label className="admin-form__label" style={{ marginBottom: 0 }}>
                    <span>Precio (€)</span>
                    <input
                      className="admin-form__input"
                      type="number"
                      step="0.01"
                      value={draft.price}
                      onChange={(e) =>
                        setDraft((d) => ({ ...d, price: e.target.value }))
                      }
                      onBlur={() => {
                        const n = Number(draft.price);
                        if (!Number.isNaN(n)) {
                          setDraft((d) => ({ ...d, price: n.toFixed(2) }));
                        }
                      }}
                    />
                  </label>

                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      type="button"
                      className="admin-form__button"
                      disabled={busy}
                      onClick={() => saveEdit(p._id)}
                    >
                      {busy ? "Guardando…" : "Guardar"}
                    </button>
                    <button
                      type="button"
                      className="admin-form__button"
                      onClick={() => setEditId(null)}
                      style={{ background: "#666" }}
                      disabled={busy}
                    >
                      Cancelar
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.name}
                        style={{
                          width: 56,
                          height: 56,
                          objectFit: "cover",
                          borderRadius: 8,
                          border: "1px solid #ddd",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: 56,
                          height: 56,
                          borderRadius: 8,
                          border: "1px dashed #ccc",
                        }}
                      />
                    )}
                    <div style={{ display: "grid" }}>
                      <strong style={{ lineHeight: 1.2 }}>{p.name}</strong>
                      {p.description && (
                        <small style={{ opacity: 0.8, lineHeight: 1.2 }}>
                          {p.description}
                        </small>
                      )}
                    </div>
                  </div>

                  <div style={{ fontWeight: 700 }}>
                    € {Number(p.price).toFixed(2)}
                  </div>

                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      type="button"
                      className="admin-form__button"
                      onClick={() => startEdit(p)}
                      disabled={busy}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      className="admin-form__button"
                      onClick={() => remove(p._id)}
                      style={{ background: "#b00020" }}
                      disabled={busy}
                    >
                      Baja
                    </button>
                  </div>
                </>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* Archivados */}
      <section className="admin-form" style={{ maxWidth: 720, marginTop: 16 }}>
        <h2 className="admin-form__title">Archivados (baja lógica)</h2>

        <div style={{ display: "grid", gap: 10 }}>
          {archived.length === 0 && (
            <div style={{ opacity: 0.7, fontSize: ".95rem" }}>
              No hay productos archivados.
            </div>
          )}

          {archived.map((p) => (
            <article
              key={p._id}
              style={{
                border: "1px dashed #e0c9c9",
                background: "#fff7f7",
                borderRadius: 10,
                padding: 10,
                display: "grid",
                gap: 8,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.name}
                    style={{
                      width: 56,
                      height: 56,
                      objectFit: "cover",
                      borderRadius: 8,
                      border: "1px solid #ddd",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 8,
                      border: "1px dashed #ccc",
                    }}
                  />
                )}
                <div style={{ display: "grid" }}>
                  <strong style={{ lineHeight: 1.2 }}>{p.name}</strong>
                  <small style={{ opacity: 0.8, lineHeight: 1.2 }}>
                    € {Number(p.price).toFixed(2)}
                  </small>
                </div>
              </div>

              <div style={{ display: "flex", gap: 8 }}>
                <button
                  type="button"
                  className="admin-form__button"
                  onClick={() => restore(p._id)}
                  disabled={busy}
                >
                  Restaurar
                </button>
              </div>
            </article>
          ))}
        </div>

        {msg && (
          <div className="admin-form__msg" style={{ marginTop: 10 }}>
            {msg}
          </div>
        )}
      </section>
    </>
  );
}
