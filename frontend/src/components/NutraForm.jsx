

// import { useState } from "react";
// import API from "../services/api";

// const NutraForm = () => {
//   const [form, setForm] = useState({
//     name: "",
//     purpose: "",
//     generalDose: "",
//     bestTime: "",
//     safetyNotes: "",
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await API.post("/nutra/add", form);
//       alert("Nutraceutical added successfully");
//     } catch (err) {
//       console.error(err);
//       alert("Only ADMIN can add nutraceuticals");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h3>Add Nutraceutical</h3>

//       <input name="name" placeholder="Name" onChange={handleChange} />
//       <input name="purpose" placeholder="Purpose" onChange={handleChange} />
//       <input name="generalDose" placeholder="Dose Range" onChange={handleChange} />
//       <input name="bestTime" placeholder="Best Time" onChange={handleChange} />
//       <input name="safetyNotes" placeholder="Safety Notes" onChange={handleChange} />

//       <button type="submit">Add</button>
//     </form>
//   );
// };

// export default NutraForm;

import { useState } from "react";
import API from "../services/api";

const FormStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600&family=DM+Sans:wght@400;500&display=swap');

    .nf-wrap {
      min-height: 100vh;
      background: #f5f0e8;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px 16px;
      font-family: 'DM Sans', sans-serif;
    }

    /* Card */
    .nf-card {
      width: 100%;
      max-width: 520px;
      background: #ffffff;
      border-radius: 20px;
      border: 1px solid #e8e0d0;
      box-shadow: 0 4px 32px rgba(0,0,0,0.09);
      overflow: hidden;
    }

    /* Card header */
    .nf-header {
      background: #0d2e1a;
      padding: 28px 32px 24px;
      position: relative;
      overflow: hidden;
    }
    .nf-header::before {
      content: '';
      position: absolute;
      top: -40px; right: -40px;
      width: 140px; height: 140px;
      border-radius: 50%;
      background: rgba(46,125,50,0.2);
      pointer-events: none;
    }
    .nf-header-eyebrow {
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: #a5d6a7;
      opacity: 0.8;
      margin-bottom: 6px;
    }
    .nf-header-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: 26px;
      font-weight: 600;
      color: #ffffff;
      line-height: 1.2;
      position: relative;
    }
    .nf-header-sub {
      font-size: 13px;
      color: rgba(200,230,201,0.65);
      margin-top: 6px;
      position: relative;
    }

    /* Form body */
    .nf-body {
      padding: 28px 32px 32px;
    }

    /* Field group */
    .nf-field {
      margin-bottom: 18px;
    }
    .nf-label {
      display: block;
      font-size: 12px;
      font-weight: 500;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #5a6a5f;
      margin-bottom: 7px;
    }
    .nf-input,
    .nf-textarea {
      width: 100%;
      padding: 11px 14px;
      font-size: 14.5px;
      font-family: 'DM Sans', sans-serif;
      color: #1a1a1a;
      background: #f9f6f1;
      border: 1.5px solid #e0d8cc;
      border-radius: 10px;
      outline: none;
      transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
      box-sizing: border-box;
      resize: none;
    }
    .nf-input::placeholder,
    .nf-textarea::placeholder { color: #b0a898; }
    .nf-input:focus,
    .nf-textarea:focus {
      border-color: #2e7d32;
      background: #ffffff;
      box-shadow: 0 0 0 3px rgba(46,125,50,0.1);
    }
    .nf-textarea { height: 88px; line-height: 1.55; }

    /* Two-col row */
    .nf-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
    }

    /* Divider */
    .nf-divider {
      height: 1px;
      background: #ede7dc;
      margin: 22px 0;
    }

    /* Submit */
    .nf-submit {
      width: 100%;
      padding: 13px;
      font-family: 'DM Sans', sans-serif;
      font-size: 15px;
      font-weight: 500;
      color: #ffffff;
      background: #2e7d32;
      border: none;
      border-radius: 50px;
      cursor: pointer;
      transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
      letter-spacing: 0.02em;
    }
    .nf-submit:hover:not(:disabled) {
      background: #1e5c30;
      transform: translateY(-1px);
      box-shadow: 0 4px 16px rgba(46,125,50,0.35);
    }
    .nf-submit:active:not(:disabled) {
      transform: translateY(0);
    }
    .nf-submit:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    /* Toast */
    .nf-toast {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 16px;
      border-radius: 10px;
      font-size: 13.5px;
      font-weight: 500;
      margin-bottom: 20px;
      animation: nf-fadein 0.3s ease;
    }
    .nf-toast.success {
      background: #f1f8f2;
      border: 1px solid #a5d6a7;
      color: #1e5c30;
    }
    .nf-toast.error {
      background: #fff5f5;
      border: 1px solid #ffcdd2;
      color: #c62828;
    }
    .nf-toast-dot {
      width: 8px; height: 8px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .nf-toast.success .nf-toast-dot { background: #2e7d32; }
    .nf-toast.error   .nf-toast-dot { background: #e53935; }

    @keyframes nf-fadein {
      from { opacity: 0; transform: translateY(-6px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    @media (max-width: 480px) {
      .nf-header  { padding: 22px 20px 18px; }
      .nf-body    { padding: 22px 20px 26px; }
      .nf-row     { grid-template-columns: 1fr; }
    }
  `}</style>
);

const EMPTY = { name: "", purpose: "", generalDose: "", bestTime: "", safetyNotes: "" };

const NutraForm = () => {
  const [form, setForm]       = useState(EMPTY);
  const [loading, setLoading] = useState(false);
  const [toast, setToast]     = useState(null); // { type: 'success'|'error', msg }

  const showToast = (type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 4000);
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) { showToast("error", "Medicine name is required."); return; }
    setLoading(true);
    try {
      await API.post("/nutra/add", form);
      showToast("success", "Nutraceutical added successfully.");
      setForm(EMPTY);
    } catch {
      showToast("error", "Only admins can add nutraceuticals.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="nf-wrap">
      <FormStyle />
      <div className="nf-card">

        {/* Header */}
        <div className="nf-header">
          <p className="nf-header-eyebrow">Admin Panel</p>
          <h2 className="nf-header-title">Add Nutraceutical</h2>
          <p className="nf-header-sub">Register a new Ayurvedic remedy to the database</p>
        </div>

        {/* Form */}
        <div className="nf-body">

          {toast && (
            <div className={`nf-toast ${toast.type}`}>
              <span className="nf-toast-dot" />
              {toast.msg}
            </div>
          )}

          <div className="nf-field">
            <label className="nf-label">Medicine Name *</label>
            <input
              className="nf-input"
              name="name"
              value={form.name}
              placeholder="e.g. Ashwagandha"
              onChange={handleChange}
            />
          </div>

          <div className="nf-field">
            <label className="nf-label">Purpose / Indication</label>
            <input
              className="nf-input"
              name="purpose"
              value={form.purpose}
              placeholder="e.g. Stress relief, immunity boost"
              onChange={handleChange}
            />
          </div>

          <div className="nf-row">
            <div className="nf-field">
              <label className="nf-label">Dose Range</label>
              <input
                className="nf-input"
                name="generalDose"
                value={form.generalDose}
                placeholder="e.g. 300–600 mg"
                onChange={handleChange}
              />
            </div>
            <div className="nf-field">
              <label className="nf-label">Best Time</label>
              <input
                className="nf-input"
                name="bestTime"
                value={form.bestTime}
                placeholder="e.g. Morning with milk"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="nf-divider" />

          <div className="nf-field">
            <label className="nf-label">Safety Notes</label>
            <textarea
              className="nf-textarea"
              name="safetyNotes"
              value={form.safetyNotes}
              placeholder="Any contraindications, warnings, or precautions…"
              onChange={handleChange}
            />
          </div>

          <button className="nf-submit" onClick={handleSubmit} disabled={loading}>
            {loading ? "Saving…" : "Add Nutraceutical"}
          </button>

        </div>
      </div>
    </div>
  );
};

export default NutraForm;
