

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;1,400&family=DM+Sans:wght@400;500&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    .sg-root {
      min-height: 100vh;
      background: #0d2e1a;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px 16px;
      font-family: 'DM Sans', sans-serif;
      position: relative;
      overflow: hidden;
    }

    .sg-ring {
      position: absolute;
      border-radius: 50%;
      border: 1px solid rgba(165,214,167,0.07);
      pointer-events: none;
    }
    .sg-ring-1 { width: 480px; height: 480px; top: -160px; left: -120px; }
    .sg-ring-2 { width: 340px; height: 340px; bottom: -90px; right: -80px; }

    /* Card */
    .sg-card {
      width: 100%;
      max-width: 460px;
      background: #ffffff;
      border-radius: 22px;
      overflow: hidden;
      box-shadow: 0 24px 64px rgba(0,0,0,0.35);
      position: relative;
    }

    /* Header */
    .sg-header {
      background: #1a4a2a;
      padding: 30px 36px 26px;
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    .sg-header::after {
      content: '';
      position: absolute;
      bottom: -30px; left: 50%;
      transform: translateX(-50%);
      width: 120px; height: 60px;
      background: #ffffff;
      border-radius: 50% 50% 0 0;
    }
    .sg-header-icon { font-size: 30px; margin-bottom: 8px; display: block; position: relative; }
    .sg-header-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: 25px;
      font-weight: 600;
      color: #ffffff;
      line-height: 1.2;
      position: relative;
    }
    .sg-header-sub {
      font-size: 13px;
      color: rgba(200,230,201,0.6);
      margin-top: 4px;
      position: relative;
    }

    /* Body */
    .sg-body { padding: 34px 36px 30px; }

    /* Step indicator */
    .sg-steps {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0;
      margin-bottom: 26px;
    }
    .sg-step {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 5px;
    }
    .sg-step-dot {
      width: 28px; height: 28px;
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-size: 12px; font-weight: 500;
      transition: background 0.3s, color 0.3s, border-color 0.3s;
    }
    .sg-step-dot.done   { background: #2e7d32; color: #fff; border: 2px solid #2e7d32; }
    .sg-step-dot.active { background: #fff; color: #2e7d32; border: 2px solid #2e7d32; }
    .sg-step-dot.idle   { background: #fff; color: #b0a898; border: 2px solid #e0d8cc; }
    .sg-step-label {
      font-size: 10px;
      font-weight: 500;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: #5a6a5f;
    }
    .sg-step-label.active { color: #2e7d32; }
    .sg-step-connector {
      width: 48px; height: 2px;
      background: #e0d8cc;
      margin-bottom: 18px;
      transition: background 0.3s;
    }
    .sg-step-connector.done { background: #2e7d32; }

    /* Role toggle */
    .sg-role-toggle {
      display: grid;
      grid-template-columns: 1fr 1fr;
      background: #f5f0e8;
      border-radius: 10px;
      padding: 4px;
      margin-bottom: 20px;
      gap: 4px;
    }
    .sg-role-btn {
      font-family: 'DM Sans', sans-serif;
      font-size: 13.5px; font-weight: 500;
      padding: 9px; border-radius: 7px;
      border: none; background: transparent;
      color: #5a6a5f; cursor: pointer;
      transition: background 0.2s, color 0.2s, box-shadow 0.2s;
    }
    .sg-role-btn.active {
      background: #ffffff; color: #0d2e1a;
      box-shadow: 0 1px 6px rgba(0,0,0,0.1);
    }

    /* Field */
    .sg-field { margin-bottom: 14px; }
    .sg-label {
      display: block;
      font-size: 11px; font-weight: 500;
      letter-spacing: 0.1em; text-transform: uppercase;
      color: #5a6a5f; margin-bottom: 5px;
    }
    .sg-input {
      width: 100%;
      padding: 11px 14px;
      font-size: 14.5px;
      font-family: 'DM Sans', sans-serif;
      color: #1a1a1a;
      background: #f9f6f1;
      border: 1.5px solid #e0d8cc;
      border-radius: 10px;
      outline: none;
      transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
    }
    .sg-input::placeholder { color: #b0a898; }
    .sg-input:focus {
      border-color: #2e7d32;
      background: #ffffff;
      box-shadow: 0 0 0 3px rgba(46,125,50,0.1);
    }

    /* Password strength */
    .sg-strength {
      display: flex;
      gap: 4px;
      margin-top: 7px;
    }
    .sg-strength-bar {
      flex: 1; height: 3px;
      border-radius: 2px;
      background: #e0d8cc;
      transition: background 0.3s;
    }
    .sg-strength-bar.weak   { background: #ef9a9a; }
    .sg-strength-bar.medium { background: #ffd54f; }
    .sg-strength-bar.strong { background: #81c784; }
    .sg-strength-text {
      font-size: 11px; color: #5a6a5f;
      margin-top: 4px; text-align: right;
    }

    /* Admin token box */
    .sg-admin-box {
      background: #fffbeb;
      border: 1px solid #fde68a;
      border-radius: 10px;
      padding: 14px;
      margin-bottom: 14px;
      animation: sg-fadein 0.25s ease;
    }
    .sg-admin-label {
      font-size: 11px; font-weight: 500;
      letter-spacing: 0.1em; text-transform: uppercase;
      color: #b45309; margin-bottom: 6px; display: block;
    }
    .sg-admin-input {
      width: 100%;
      padding: 10px 13px;
      font-size: 14px;
      font-family: 'DM Sans', sans-serif;
      color: #1a1a1a;
      background: #ffffff;
      border: 1.5px solid #fde68a;
      border-radius: 8px;
      outline: none;
      transition: border-color 0.2s, box-shadow 0.2s;
    }
    .sg-admin-input::placeholder { color: #c4a87a; }
    .sg-admin-input:focus {
      border-color: #b45309;
      box-shadow: 0 0 0 3px rgba(180,83,9,0.1);
    }

    /* Error / success toast */
    .sg-toast {
      display: flex; align-items: center; gap: 9px;
      padding: 11px 14px; border-radius: 10px;
      font-size: 13.5px; margin-bottom: 16px;
      animation: sg-fadein 0.25s ease;
    }
    .sg-toast.error   { background: #fff5f5; border: 1px solid #ffcdd2; color: #c62828; }
    .sg-toast.success { background: #f1f8f2; border: 1px solid #a5d6a7; color: #1e5c30; }
    .sg-toast-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
    .sg-toast.error   .sg-toast-dot { background: #e53935; }
    .sg-toast.success .sg-toast-dot { background: #2e7d32; }

    /* Submit */
    .sg-submit {
      width: 100%;
      padding: 13px;
      font-family: 'DM Sans', sans-serif;
      font-size: 15px; font-weight: 500;
      color: #ffffff;
      background: #2e7d32;
      border: none; border-radius: 50px;
      cursor: pointer; margin-top: 6px;
      transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
      letter-spacing: 0.02em;
    }
    .sg-submit:hover:not(:disabled) {
      background: #1e5c30;
      transform: translateY(-1px);
      box-shadow: 0 4px 16px rgba(46,125,50,0.35);
    }
    .sg-submit:disabled { opacity: 0.6; cursor: not-allowed; }

    /* Divider */
    .sg-divider { height: 1px; background: #ede7dc; margin: 20px 0; }

    /* Footer */
    .sg-footer { text-align: center; font-size: 14px; color: #5a6a5f; }
    .sg-footer-link {
      color: #2e7d32; font-weight: 500; cursor: pointer;
      background: none; border: none;
      font-family: 'DM Sans', sans-serif; font-size: 14px;
      padding: 0; text-decoration: underline;
      text-underline-offset: 3px;
    }
    .sg-footer-link:hover { color: #1e5c30; }

    /* Terms note */
    .sg-terms {
      text-align: center;
      font-size: 11.5px;
      color: #a09888;
      margin-top: 14px;
      line-height: 1.5;
    }

    @keyframes sg-fadein {
      from { opacity: 0; transform: translateY(-5px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    @media (max-width: 480px) {
      .sg-header { padding: 24px 20px 20px; }
      .sg-body   { padding: 28px 20px 26px; }
      .sg-step-connector { width: 32px; }
    }
  `}</style>
);

/* ── Password strength helper ── */
const getStrength = (pw) => {
  if (!pw) return { level: 0, label: "" };
  let score = 0;
  if (pw.length >= 8)           score++;
  if (/[A-Z]/.test(pw))         score++;
  if (/[0-9]/.test(pw))         score++;
  if (/[^A-Za-z0-9]/.test(pw))  score++;
  if (score <= 1) return { level: 1, label: "Weak" };
  if (score <= 2) return { level: 2, label: "Fair" };
  if (score === 3) return { level: 3, label: "Good" };
  return { level: 4, label: "Strong" };
};

const barClass = (barIdx, level) => {
  if (barIdx > level) return "";
  if (level === 1)    return "weak";
  if (level === 2)    return "medium";
  return "strong";
};

/* ── Step indicator ── */
const Steps = ({ step }) => {
  const steps = ["Account", "Security", "Role"];
  return (
    <div className="sg-steps">
      {steps.map((label, i) => {
        const idx  = i + 1;
        const done = step > idx;
        const active = step === idx;
        return (
          <div key={i} style={{ display: "flex", alignItems: "center" }}>
            <div className="sg-step">
              <div className={`sg-step-dot ${done ? "done" : active ? "active" : "idle"}`}>
                {done ? "✓" : idx}
              </div>
              <span className={`sg-step-label ${active ? "active" : ""}`}>{label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={`sg-step-connector ${done ? "done" : ""}`} />
            )}
          </div>
        );
      })}
    </div>
  );
};

/* ── Main component ── */
const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm]       = useState({ name: "", email: "", password: "", role: "user", adminToken: "" });
  const [loading, setLoading] = useState(false);
  const [toast, setToast]     = useState(null);

  const showToast = (type, msg) => {
    setToast({ type, msg });
    if (type === "error") setTimeout(() => setToast(null), 5000);
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const setRole = (role) => setForm({ ...form, role, adminToken: "" });

  /* Which step is the user on based on filled fields */
  const currentStep = !form.name || !form.email ? 1 : !form.password ? 2 : 3;
  const strength    = getStrength(form.password);

  const handleSubmit = async () => {
    setToast(null);
    if (!form.name.trim())     { showToast("error", "Please enter your full name."); return; }
    if (!form.email.trim())    { showToast("error", "Please enter your email address."); return; }
    if (!form.password.trim()) { showToast("error", "Please create a password."); return; }
    if (form.password.length < 6) { showToast("error", "Password must be at least 6 characters."); return; }

    setLoading(true);
    try {
      await axios.post(
        "https://nutra1-project-2.onrender.com/api/auth/signup",
        form,
        { headers: { "Content-Type": "application/json" } }
      );
      showToast("success", "Account created! Redirecting to login…");
      setTimeout(() => navigate("/login"), 1800);
    } catch (err) {
      showToast("error", err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => { if (e.key === "Enter") handleSubmit(); };

  return (
    <div className="sg-root">
      <SignupStyle />
      <div className="sg-ring sg-ring-1" />
      <div className="sg-ring sg-ring-2" />

      <div className="sg-card">

        {/* Header */}
        <div className="sg-header">
          <span className="sg-header-icon">🌱</span>
          <h1 className="sg-header-title">Create Account</h1>
          <p className="sg-header-sub">Join Nutracare today</p>
        </div>

        {/* Body */}
        <div className="sg-body">

          <Steps step={currentStep} />

          {toast && (
            <div className={`sg-toast ${toast.type}`}>
              <span className="sg-toast-dot" />
              {toast.msg}
            </div>
          )}

          {/* Role */}
          <div className="sg-role-toggle">
            <button className={`sg-role-btn ${form.role === "user" ? "active" : ""}`} onClick={() => setRole("user")}>
              User
            </button>
            <button className={`sg-role-btn ${form.role === "admin" ? "active" : ""}`} onClick={() => setRole("admin")}>
              Admin
            </button>
          </div>

          <div className="sg-field">
            <label className="sg-label">Full Name</label>
            <input className="sg-input" name="name" placeholder="Your full name"
              value={form.name} onChange={handleChange} onKeyDown={handleKeyDown} autoComplete="name" />
          </div>

          <div className="sg-field">
            <label className="sg-label">Email Address</label>
            <input className="sg-input" name="email" type="email" placeholder="you@example.com"
              value={form.email} onChange={handleChange} onKeyDown={handleKeyDown} autoComplete="email" />
          </div>

          <div className="sg-field">
            <label className="sg-label">Password</label>
            <input className="sg-input" name="password" type="password" placeholder="Create a strong password"
              value={form.password} onChange={handleChange} onKeyDown={handleKeyDown} autoComplete="new-password" />
            {form.password && (
              <>
                <div className="sg-strength">
                  {[1,2,3,4].map((b) => (
                    <div key={b} className={`sg-strength-bar ${barClass(b, strength.level)}`} />
                  ))}
                </div>
                <p className="sg-strength-text">{strength.label}</p>
              </>
            )}
          </div>

          {form.role === "admin" && (
            <div className="sg-admin-box">
              <label className="sg-admin-label">Admin Token</label>
              <input className="sg-admin-input" name="adminToken" type="password"
                placeholder="Enter your admin access token"
                value={form.adminToken} onChange={handleChange} onKeyDown={handleKeyDown} />
            </div>
          )}

          <button className="sg-submit" onClick={handleSubmit} disabled={loading}>
            {loading ? "Creating account…" : "Create Account"}
          </button>

          <p className="sg-terms">
            By signing up you agree to our terms of service and privacy policy.
          </p>

          <div className="sg-divider" />

          <p className="sg-footer">
            Already have an account?{" "}
            <button className="sg-footer-link" onClick={() => navigate("/login")}>Sign in</button>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Signup;