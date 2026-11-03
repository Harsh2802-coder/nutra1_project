
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;1,400&family=DM+Sans:wght@400;500&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    .lg-root {
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

    /* Background rings */
    .lg-ring {
      position: absolute;
      border-radius: 50%;
      border: 1px solid rgba(165,214,167,0.07);
      pointer-events: none;
    }
    .lg-ring-1 { width: 500px; height: 500px; top: -180px; right: -140px; }
    .lg-ring-2 { width: 360px; height: 360px; bottom: -100px; left: -100px; }

    /* Card */
    .lg-card {
      width: 100%;
      max-width: 440px;
      background: #ffffff;
      border-radius: 22px;
      overflow: hidden;
      box-shadow: 0 24px 64px rgba(0,0,0,0.35);
      position: relative;
    }

    /* Card header */
    .lg-header {
      background: #1a4a2a;
      padding: 32px 36px 28px;
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    .lg-header::after {
      content: '';
      position: absolute;
      bottom: -30px; left: 50%;
      transform: translateX(-50%);
      width: 120px; height: 60px;
      background: #ffffff;
      border-radius: 50% 50% 0 0;
    }
    .lg-header-icon {
      font-size: 32px;
      margin-bottom: 10px;
      display: block;
      position: relative;
    }
    .lg-header-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: 26px;
      font-weight: 600;
      color: #ffffff;
      line-height: 1.2;
      position: relative;
    }
    .lg-header-sub {
      font-size: 13px;
      color: rgba(200,230,201,0.6);
      margin-top: 5px;
      position: relative;
    }

    /* Body */
    .lg-body {
      padding: 36px 36px 32px;
    }

    /* Role toggle */
    .lg-role-toggle {
      display: grid;
      grid-template-columns: 1fr 1fr;
      background: #f5f0e8;
      border-radius: 10px;
      padding: 4px;
      margin-bottom: 24px;
      gap: 4px;
    }
    .lg-role-btn {
      font-family: 'DM Sans', sans-serif;
      font-size: 13.5px;
      font-weight: 500;
      padding: 9px;
      border-radius: 7px;
      border: none;
      background: transparent;
      color: #5a6a5f;
      cursor: pointer;
      transition: background 0.2s, color 0.2s, box-shadow 0.2s;
    }
    .lg-role-btn.active {
      background: #ffffff;
      color: #0d2e1a;
      box-shadow: 0 1px 6px rgba(0,0,0,0.1);
    }

    /* Field */
    .lg-field { margin-bottom: 16px; }
    .lg-label {
      display: block;
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #5a6a5f;
      margin-bottom: 6px;
    }
    .lg-input {
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
    .lg-input::placeholder { color: #b0a898; }
    .lg-input:focus {
      border-color: #2e7d32;
      background: #ffffff;
      box-shadow: 0 0 0 3px rgba(46,125,50,0.1);
    }

    /* Admin token reveal */
    .lg-admin-box {
      background: #fffbeb;
      border: 1px solid #fde68a;
      border-radius: 10px;
      padding: 14px;
      margin-bottom: 16px;
      animation: lg-fadein 0.25s ease;
    }
    .lg-admin-label {
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #b45309;
      margin-bottom: 6px;
      display: block;
    }
    .lg-admin-input {
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
    .lg-admin-input::placeholder { color: #c4a87a; }
    .lg-admin-input:focus {
      border-color: #b45309;
      box-shadow: 0 0 0 3px rgba(180,83,9,0.1);
    }

    /* Submit */
    .lg-submit {
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
      margin-top: 4px;
      transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
      letter-spacing: 0.02em;
    }
    .lg-submit:hover:not(:disabled) {
      background: #1e5c30;
      transform: translateY(-1px);
      box-shadow: 0 4px 16px rgba(46,125,50,0.35);
    }
    .lg-submit:disabled { opacity: 0.6; cursor: not-allowed; }

    /* Error toast */
    .lg-error {
      display: flex;
      align-items: center;
      gap: 9px;
      padding: 11px 14px;
      background: #fff5f5;
      border: 1px solid #ffcdd2;
      border-radius: 10px;
      font-size: 13.5px;
      color: #c62828;
      margin-bottom: 18px;
      animation: lg-fadein 0.25s ease;
    }
    .lg-error-dot {
      width: 7px; height: 7px;
      border-radius: 50%;
      background: #e53935;
      flex-shrink: 0;
    }

    /* Signup link */
    .lg-footer {
      text-align: center;
      margin-top: 22px;
      font-size: 14px;
      color: #5a6a5f;
    }
    .lg-footer-link {
      color: #2e7d32;
      font-weight: 500;
      cursor: pointer;
      background: none;
      border: none;
      font-family: 'DM Sans', sans-serif;
      font-size: 14px;
      padding: 0;
      text-decoration: underline;
      text-underline-offset: 3px;
    }
    .lg-footer-link:hover { color: #1e5c30; }

    /* Divider */
    .lg-divider {
      height: 1px;
      background: #ede7dc;
      margin: 20px 0;
    }

    @keyframes lg-fadein {
      from { opacity: 0; transform: translateY(-6px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    @media (max-width: 480px) {
      .lg-header { padding: 26px 24px 22px; }
      .lg-body   { padding: 28px 24px 26px; }
    }
  `}</style>
);

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm]       = useState({ email: "", password: "", role: "user", adminToken: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const setRole = (role) => setForm({ ...form, role, adminToken: "" });

  const handleSubmit = async () => {
    setError("");
    if (!form.email.trim() || !form.password.trim()) {
      setError("Please enter your email and password.");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post("https://nutra1-project-2.onrender.com/api/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role",  res.data.role);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => { if (e.key === "Enter") handleSubmit(); };

  return (
    <div className="lg-root">
      <LoginStyle />
      <div className="lg-ring lg-ring-1" />
      <div className="lg-ring lg-ring-2" />

      <div className="lg-card">

        {/* Header */}
        <div className="lg-header">
          <span className="lg-header-icon">🌿</span>
          <h1 className="lg-header-title">Welcome Back</h1>
          <p className="lg-header-sub">Sign in to Nutracare</p>
        </div>

        {/* Body */}
        <div className="lg-body">

          {/* Role toggle */}
          <div className="lg-role-toggle">
            <button
              className={`lg-role-btn ${form.role === "user" ? "active" : ""}`}
              onClick={() => setRole("user")}
            >
              User
            </button>
            <button
              className={`lg-role-btn ${form.role === "admin" ? "active" : ""}`}
              onClick={() => setRole("admin")}
            >
              Admin
            </button>
          </div>

          {error && (
            <div className="lg-error">
              <span className="lg-error-dot" />
              {error}
            </div>
          )}

          <div className="lg-field">
            <label className="lg-label">Email Address</label>
            <input
              className="lg-input"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              autoComplete="email"
            />
          </div>

          <div className="lg-field">
            <label className="lg-label">Password</label>
            <input
              className="lg-input"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              autoComplete="current-password"
            />
          </div>

          {/* Admin token */}
          {form.role === "admin" && (
            <div className="lg-admin-box">
              <label className="lg-admin-label">Admin Token</label>
              <input
                className="lg-admin-input"
                name="adminToken"
                type="password"
                placeholder="Enter your admin access token"
                value={form.adminToken}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              />
            </div>
          )}

          <button
            className="lg-submit"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Signing in…" : `Sign in as ${form.role === "admin" ? "Admin" : "User"}`}
          </button>

          <div className="lg-divider" />

          <p className="lg-footer">
            Don't have an account?{" "}
            <button className="lg-footer-link" onClick={() => navigate("/signup")}>
              Create one
            </button>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;

