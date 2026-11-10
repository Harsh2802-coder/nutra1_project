

import { useEffect, useState } from "react";
import API from "../services/api";

const ListStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600&family=DM+Sans:wght@400;500&display=swap');

    .nl-wrap {
      font-family: 'DM Sans', sans-serif;
      color: #1a1a1a;
    }

    /* ── Page header ── */
    .nl-header {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 28px;
      flex-wrap: wrap;
    }
    .nl-title-eyebrow {
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: #2e7d32;
      margin-bottom: 4px;
    }
    .nl-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: 28px;
      font-weight: 600;
      color: #0d2e1a;
      line-height: 1.1;
    }
    .nl-count {
      font-size: 13px;
      color: #5a6a5f;
      background: #f1f8f2;
      border: 1px solid #c8e6c9;
      border-radius: 50px;
      padding: 5px 14px;
      white-space: nowrap;
    }

    /* ── Search bar ── */
    .nl-search-wrap {
      position: relative;
      margin-bottom: 24px;
    }
    .nl-search {
      width: 100%;
      padding: 11px 14px 11px 40px;
      font-size: 14px;
      font-family: 'DM Sans', sans-serif;
      color: #1a1a1a;
      background: #ffffff;
      border: 1.5px solid #e0d8cc;
      border-radius: 50px;
      outline: none;
      box-sizing: border-box;
      transition: border-color 0.2s, box-shadow 0.2s;
    }
    .nl-search:focus {
      border-color: #2e7d32;
      box-shadow: 0 0 0 3px rgba(46,125,50,0.1);
    }
    .nl-search::placeholder { color: #b0a898; }
    .nl-search-icon {
      position: absolute;
      left: 14px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 15px;
      pointer-events: none;
      opacity: 0.45;
    }

    /* ── Empty state ── */
    .nl-empty {
      text-align: center;
      padding: 56px 24px;
      color: #5a6a5f;
    }
    .nl-empty-icon { font-size: 40px; margin-bottom: 12px; }
    .nl-empty-text { font-size: 15px; }

    /* ── List ── */
    .nl-list { display: flex; flex-direction: column; gap: 12px; }

    /* ── Card ── */
    .nl-card {
      background: #ffffff;
      border: 1px solid #e8e0d0;
      border-radius: 14px;
      overflow: hidden;
      box-shadow: 0 2px 10px rgba(0,0,0,0.06);
      transition: box-shadow 0.2s;
    }
    .nl-card:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.1); }

    /* Card view mode */
    .nl-card-view {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 0;
    }
    .nl-card-info {
      padding: 18px 20px;
      border-right: 1px solid #f0ebe2;
    }
    .nl-card-name {
      font-family: 'Cormorant Garamond', serif;
      font-size: 19px;
      font-weight: 600;
      color: #0d2e1a;
      margin-bottom: 4px;
    }
    .nl-card-purpose {
      font-size: 13.5px;
      color: #5a6a5f;
      margin-bottom: 12px;
      line-height: 1.45;
    }
    .nl-badges {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    .nl-badge {
      font-size: 12px;
      font-weight: 500;
      padding: 3px 10px;
      border-radius: 50px;
      white-space: nowrap;
    }
    .nl-badge-dose {
      background: #f1f8f2;
      color: #2e7d32;
      border: 1px solid #c8e6c9;
    }
    .nl-badge-time {
      background: #fffbeb;
      color: #b45309;
      border: 1px solid #fde68a;
    }

    /* Card actions */
    .nl-card-actions {
      display: flex;
      flex-direction: column;
      padding: 14px 16px;
      gap: 8px;
      justify-content: center;
      min-width: 100px;
    }
    .nl-btn-edit {
      font-family: 'DM Sans', sans-serif;
      font-size: 13px;
      font-weight: 500;
      padding: 7px 16px;
      border-radius: 8px;
      border: 1.5px solid #c8e6c9;
      background: #f1f8f2;
      color: #2e7d32;
      cursor: pointer;
      transition: background 0.2s, border-color 0.2s;
      text-align: center;
    }
    .nl-btn-edit:hover { background: #c8e6c9; border-color: #a5d6a7; }
    .nl-btn-delete {
      font-family: 'DM Sans', sans-serif;
      font-size: 13px;
      font-weight: 500;
      padding: 7px 16px;
      border-radius: 8px;
      border: 1.5px solid #ffcdd2;
      background: #fff5f5;
      color: #c62828;
      cursor: pointer;
      transition: background 0.2s;
      text-align: center;
    }
    .nl-btn-delete:hover { background: #ffcdd2; }

    /* ── Edit mode ── */
    .nl-card-edit { padding: 20px; }
    .nl-edit-title {
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: #5a6a5f;
      margin-bottom: 16px;
    }
    .nl-edit-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-bottom: 12px;
    }
    .nl-edit-full { grid-column: 1 / -1; }
    .nl-edit-label {
      display: block;
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #5a6a5f;
      margin-bottom: 5px;
    }
    .nl-edit-input {
      width: 100%;
      padding: 9px 12px;
      font-size: 14px;
      font-family: 'DM Sans', sans-serif;
      color: #1a1a1a;
      background: #f9f6f1;
      border: 1.5px solid #e0d8cc;
      border-radius: 8px;
      outline: none;
      box-sizing: border-box;
      transition: border-color 0.2s, box-shadow 0.2s;
    }
    .nl-edit-input:focus {
      border-color: #2e7d32;
      background: #fff;
      box-shadow: 0 0 0 3px rgba(46,125,50,0.1);
    }
    .nl-edit-input::placeholder { color: #b0a898; }
    .nl-edit-actions {
      display: flex;
      gap: 10px;
      margin-top: 16px;
      justify-content: flex-end;
    }
    .nl-btn-save {
      font-family: 'DM Sans', sans-serif;
      font-size: 14px;
      font-weight: 500;
      padding: 9px 24px;
      border-radius: 50px;
      border: none;
      background: #2e7d32;
      color: #fff;
      cursor: pointer;
      transition: background 0.2s, transform 0.15s;
    }
    .nl-btn-save:hover { background: #1e5c30; transform: translateY(-1px); }
    .nl-btn-cancel {
      font-family: 'DM Sans', sans-serif;
      font-size: 14px;
      font-weight: 500;
      padding: 9px 20px;
      border-radius: 50px;
      border: 1.5px solid #e0d8cc;
      background: transparent;
      color: #5a6a5f;
      cursor: pointer;
      transition: background 0.2s;
    }
    .nl-btn-cancel:hover { background: #f5f0e8; }

    /* ── Toast ── */
    .nl-toast {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 11px 16px;
      border-radius: 10px;
      font-size: 13.5px;
      font-weight: 500;
      margin-bottom: 18px;
      animation: nl-fadein 0.3s ease;
    }
    .nl-toast.success { background: #f1f8f2; border: 1px solid #a5d6a7; color: #1e5c30; }
    .nl-toast.error   { background: #fff5f5; border: 1px solid #ffcdd2; color: #c62828; }
    .nl-toast-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
    .nl-toast.success .nl-toast-dot { background: #2e7d32; }
    .nl-toast.error   .nl-toast-dot { background: #e53935; }

    @keyframes nl-fadein {
      from { opacity: 0; transform: translateY(-5px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    /* ── Confirm overlay ── */
    .nl-confirm-bg {
      position: fixed; inset: 0;
      background: rgba(10,30,15,0.55);
      display: flex; align-items: center; justify-content: center;
      z-index: 2000;
      animation: nl-fadein 0.2s ease;
    }
    .nl-confirm-box {
      background: #fff;
      border-radius: 16px;
      padding: 28px 28px 24px;
      max-width: 360px;
      width: calc(100% - 32px);
      box-shadow: 0 8px 40px rgba(0,0,0,0.2);
      text-align: center;
    }
    .nl-confirm-icon { font-size: 32px; margin-bottom: 10px; }
    .nl-confirm-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: 20px;
      font-weight: 600;
      color: #0d2e1a;
      margin-bottom: 6px;
    }
    .nl-confirm-msg { font-size: 14px; color: #5a6a5f; margin-bottom: 22px; }
    .nl-confirm-actions { display: flex; gap: 10px; justify-content: center; }
    .nl-confirm-yes {
      font-family: 'DM Sans', sans-serif;
      font-size: 14px; font-weight: 500;
      padding: 9px 24px; border-radius: 50px;
      border: none; background: #c62828; color: #fff;
      cursor: pointer; transition: background 0.2s;
    }
    .nl-confirm-yes:hover { background: #b71c1c; }
    .nl-confirm-no {
      font-family: 'DM Sans', sans-serif;
      font-size: 14px; font-weight: 500;
      padding: 9px 20px; border-radius: 50px;
      border: 1.5px solid #e0d8cc; background: transparent;
      color: #5a6a5f; cursor: pointer;
      transition: background 0.2s;
    }
    .nl-confirm-no:hover { background: #f5f0e8; }

    @media (max-width: 520px) {
      .nl-card-view  { grid-template-columns: 1fr; }
      .nl-card-info  { border-right: none; border-bottom: 1px solid #f0ebe2; }
      .nl-card-actions { flex-direction: row; padding: 12px 16px; }
      .nl-edit-grid  { grid-template-columns: 1fr; }
    }
  `}</style>
);

/* ── Confirm dialog ── */
const ConfirmDialog = ({ name, onConfirm, onCancel }) => (
  <div className="nl-confirm-bg" onClick={onCancel}>
    <div className="nl-confirm-box" onClick={(e) => e.stopPropagation()}>
      <div className="nl-confirm-icon">🗑️</div>
      <p className="nl-confirm-title">Delete Entry?</p>
      <p className="nl-confirm-msg">
        <strong>{name}</strong> will be permanently removed from the database.
      </p>
      <div className="nl-confirm-actions">
        <button className="nl-confirm-no"  onClick={onCancel}>Cancel</button>
        <button className="nl-confirm-yes" onClick={onConfirm}>Delete</button>
      </div>
    </div>
  </div>
);

/* ── Main component ── */
const NutraList = () => {
  const [nutras,  setNutras]  = useState([]);
  const [editing, setEditing] = useState(null);
  const [form,    setForm]    = useState({});
  const [search,  setSearch]  = useState("");
  const [toast,   setToast]   = useState(null);
  const [confirm, setConfirm] = useState(null); // { id, name }

  const showToast = (type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchNutras = async () => {
    try {
      const res = await API.get("/nutra");
      setNutras(res.data);
    } catch {
      showToast("error", "Admin access required to view this list.");
    }
  };

  useEffect(() => { fetchNutras(); }, []);

  const confirmDelete = (id, name) => setConfirm({ id, name });

  const deleteNutra = async () => {
    const { id } = confirm;
    setConfirm(null);
    try {
      await API.delete(`/nutra/${id}`);
      showToast("success", "Entry deleted successfully.");
      fetchNutras();
    } catch {
      showToast("error", "Delete failed — admin access required.");
    }
  };

  const saveUpdate = async (id) => {
    try {
      await API.put(`/nutra/${id}`, form);
      setEditing(null);
      showToast("success", "Entry updated successfully.");
      fetchNutras();
    } catch {
      showToast("error", "Update failed — admin access required.");
    }
  };

  const filtered = nutras.filter((n) =>
    [n.name, n.purpose, n.bestTime].some((f) =>
      f?.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="nl-wrap">
      <ListStyle />

      {confirm && (
        <ConfirmDialog
          name={confirm.name}
          onConfirm={deleteNutra}
          onCancel={() => setConfirm(null)}
        />
      )}

      {/* Header */}
      <div className="nl-header">
        <div>
          <p className="nl-title-eyebrow">Admin Panel</p>
          <h2 className="nl-title">All Nutraceuticals</h2>
        </div>
        <span className="nl-count">{nutras.length} entries</span>
      </div>

      {toast && (
        <div className={`nl-toast ${toast.type}`}>
          <span className="nl-toast-dot" />
          {toast.msg}
        </div>
      )}

      {/* Search */}
      <div className="nl-search-wrap">
        <span className="nl-search-icon">🔍</span>
        <input
          className="nl-search"
          placeholder="Search by name, purpose, or timing…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Empty */}
      {filtered.length === 0 && (
        <div className="nl-empty">
          <div className="nl-empty-icon">🌿</div>
          <p className="nl-empty-text">
            {search ? "No results match your search." : "No nutraceuticals found."}
          </p>
        </div>
      )}

      {/* List */}
      <div className="nl-list">
        {filtered.map((n) => (
          <div key={n._id} className="nl-card">

            {editing === n._id ? (
              /* ── Edit mode ── */
              <div className="nl-card-edit">
                <p className="nl-edit-title">Editing — {n.name}</p>
                <div className="nl-edit-grid">
                  <div>
                    <label className="nl-edit-label">Medicine Name</label>
                    <input className="nl-edit-input" value={form.name || ""} placeholder="Name"
                      onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  </div>
                  <div>
                    <label className="nl-edit-label">Purpose</label>
                    <input className="nl-edit-input" value={form.purpose || ""} placeholder="Purpose"
                      onChange={(e) => setForm({ ...form, purpose: e.target.value })} />
                  </div>
                  <div>
                    <label className="nl-edit-label">Dose Range</label>
                    <input className="nl-edit-input" value={form.generalDose || ""} placeholder="e.g. 300–600 mg"
                      onChange={(e) => setForm({ ...form, generalDose: e.target.value })} />
                  </div>
                  <div>
                    <label className="nl-edit-label">Best Time</label>
                    <input className="nl-edit-input" value={form.bestTime || ""} placeholder="e.g. Morning"
                      onChange={(e) => setForm({ ...form, bestTime: e.target.value })} />
                  </div>
                  <div className="nl-edit-full">
                    <label className="nl-edit-label">Safety Notes</label>
                    <input className="nl-edit-input" value={form.safetyNotes || ""} placeholder="Contraindications, warnings…"
                      onChange={(e) => setForm({ ...form, safetyNotes: e.target.value })} />
                  </div>
                </div>
                <div className="nl-edit-actions">
                  <button className="nl-btn-cancel" onClick={() => setEditing(null)}>Cancel</button>
                  <button className="nl-btn-save"   onClick={() => saveUpdate(n._id)}>Save Changes</button>
                </div>
              </div>
            ) : (
              /* ── View mode ── */
              <div className="nl-card-view">
                <div className="nl-card-info">
                  <p className="nl-card-name">{n.name}</p>
                  <p className="nl-card-purpose">{n.purpose || "—"}</p>
                  <div className="nl-badges">
                    {n.generalDose && <span className="nl-badge nl-badge-dose">💊 {n.generalDose}</span>}
                    {n.bestTime    && <span className="nl-badge nl-badge-time">⏰ {n.bestTime}</span>}
                  </div>
                </div>
                <div className="nl-card-actions">
                  <button className="nl-btn-edit"   onClick={() => { setEditing(n._id); setForm(n); }}>Edit</button>
                  <button className="nl-btn-delete" onClick={() => confirmDelete(n._id, n.name)}>Delete</button>
                </div>
              </div>
            )}

          </div>
        ))}
      </div>
    </div>
  );
};

export default NutraList;