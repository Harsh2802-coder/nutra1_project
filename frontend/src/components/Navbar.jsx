// import { Link, useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const role = localStorage.getItem("role");
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

//   const logout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   // detect screen resize
//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 768);
//       if (window.innerWidth > 768) setMenuOpen(false);
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return (
//     <nav style={styles.navbar}>
      
//       {/* LOGO */}
//       <div style={styles.logo}>
//         <Link to="/" style={styles.logoText}>
//           Nutraceutical System
//         </Link>
//       </div>

//       {/* HAMBURGER BUTTON */}
//       {isMobile && (
//         <div
//           style={styles.hamburger}
//           onClick={() => setMenuOpen(!menuOpen)}
//         >
//           ☰
//         </div>
//       )}

//       {/* MENU */}
//       <div
//         style={{
//           ...styles.menu,
//           ...(isMobile
//             ? menuOpen
//               ? styles.menuMobileOpen
//               : styles.menuMobileClosed
//             : styles.menuDesktop),
//         }}
//       >
//         <Link to="/" style={styles.link} onClick={() => setMenuOpen(false)}>
//           Home
//         </Link>

//         {role === "admin" && (
//           <Link
//             to="/admin"
//             style={styles.link}
//             onClick={() => setMenuOpen(false)}
//           >
//             Admin Dashboard
//           </Link>
//         )}

//         {role === "user" && (
//           <Link
//             to="/user"
//             style={styles.link}
//             onClick={() => setMenuOpen(false)}
//           >
//             User Dashboard
//           </Link>
//         )}

//         {!role ? (
//           <>
//             <Link
//               to="/login"
//               style={styles.link}
//               onClick={() => setMenuOpen(false)}
//             >
//               Login
//             </Link>

//             <Link
//               to="/signup"
//               style={styles.link}
//               onClick={() => setMenuOpen(false)}
//             >
//               Signup
//             </Link>
//           </>
//         ) : (
//           <button
//             onClick={logout}
//             style={styles.logoutBtn}
//           >
//             Logout
//           </button>
//         )}
//       </div>

//     </nav>
//   );
// };

// const styles = {

//   navbar: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: "12px 20px",
//     background: "linear-gradient(135deg, #2e377d, #66bb6a)",
//     color: "white",
//     position: "fixed",
//     top: 0,
//     left: 0,
//     width: "100%",
//     zIndex: 1000,
//     flexWrap: "wrap",
//     boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
//     backdropFilter: "blur(10px)",
//     boxSizing: "border-box"
//   },

//   logo: {
//     fontWeight: "bold",
//     fontSize: "clamp(16px, 2vw, 22px)"
//   },

//   logoText: {
//     color: "white",
//     textDecoration: "none"
//   },

//   hamburger: {
//     fontSize: "26px",
//     cursor: "pointer",
//     display: "flex",
//     alignItems: "center"
//   },

//   menu: {
//     display: "flex",
//     alignItems: "center",
//     gap: "20px",
//     marginRight : "10px"
//   },

//   menuDesktop: {
//     flexDirection: "row"
//   },

//   menuMobileOpen: {
//     flexDirection: "column",
//     width: "100%",
//     backgroundColor: "#2e7d32",
//     marginTop: "10px",
//     padding: "15px",
//     borderRadius: "10px",
//     gap: "15px"
//   },

//   menuMobileClosed: {
//     display: "none"
//   },

//   link: {
//     color: "white",
//     textDecoration: "none",
//     fontSize: "16px",
//     fontWeight: "500"
//   },

//   logoutBtn: {
//     backgroundColor: "white",
//     color: "#2e7d32",
//     border: "none",
//     padding: "8px 16px",
//     borderRadius: "6px",
//     cursor: "pointer",
//     fontWeight: "bold"
//   }

// };

// export default Navbar;

import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const NavStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600&family=DM+Sans:wght@400;500&display=swap');

    .nb-root {
      position: fixed;
      top: 0; left: 0;
      width: 100%;
      z-index: 1000;
      font-family: 'DM Sans', sans-serif;
    }

    /* ── Main bar ── */
    .nb-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 32px;
      height: 64px;
      background: rgba(13, 46, 26, 0.96);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(200, 230, 201, 0.1);
      box-shadow: 0 2px 20px rgba(0,0,0,0.25);
    }

    /* ── Logo ── */
    .nb-logo {
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 10px;
      flex-shrink: 0;
    }
    .nb-logo-icon {
      width: 32px;
      height: 32px;
      background: rgba(46, 125, 50, 0.5);
      border: 1px solid rgba(200, 230, 201, 0.25);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
    }
    .nb-logo-text {
      font-family: 'Cormorant Garamond', serif;
      font-size: 20px;
      font-weight: 600;
      color: #ffffff;
      letter-spacing: 0.01em;
    }
    .nb-logo-text span {
      color: #a5d6a7;
    }

    /* ── Desktop links ── */
    .nb-links {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .nb-link {
      position: relative;
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
      color: rgba(255,255,255,0.7);
      padding: 6px 14px;
      border-radius: 8px;
      transition: color 0.2s, background 0.2s;
      letter-spacing: 0.01em;
    }
    .nb-link:hover {
      color: #ffffff;
      background: rgba(255,255,255,0.07);
    }
    .nb-link.active {
      color: #a5d6a7;
      background: rgba(46,125,50,0.25);
    }

    /* Login / Signup pill buttons */
    .nb-link-outline {
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
      color: rgba(255,255,255,0.8);
      padding: 6px 16px;
      border-radius: 50px;
      border: 1px solid rgba(255,255,255,0.2);
      transition: border-color 0.2s, background 0.2s, color 0.2s;
    }
    .nb-link-outline:hover {
      background: rgba(255,255,255,0.08);
      border-color: rgba(255,255,255,0.4);
      color: #fff;
    }
    .nb-link-signup {
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
      color: #0d2e1a;
      padding: 6px 18px;
      border-radius: 50px;
      background: #a5d6a7;
      border: 1px solid #a5d6a7;
      transition: background 0.2s, transform 0.15s;
    }
    .nb-link-signup:hover {
      background: #c8e6c9;
      transform: translateY(-1px);
    }

    /* Logout button */
    .nb-logout {
      font-family: 'DM Sans', sans-serif;
      font-size: 14px;
      font-weight: 500;
      color: #ef9a9a;
      background: rgba(239,154,154,0.1);
      border: 1px solid rgba(239,154,154,0.25);
      padding: 6px 16px;
      border-radius: 50px;
      cursor: pointer;
      transition: background 0.2s, color 0.2s;
      letter-spacing: 0.01em;
    }
    .nb-logout:hover {
      background: rgba(239,154,154,0.2);
      color: #ffcdd2;
    }

    /* ── Divider ── */
    .nb-divider {
      width: 1px;
      height: 18px;
      background: rgba(255,255,255,0.15);
      margin: 0 6px;
    }

    /* ── Hamburger ── */
    .nb-hamburger {
      display: none;
      flex-direction: column;
      gap: 5px;
      cursor: pointer;
      padding: 6px;
      border-radius: 8px;
      transition: background 0.2s;
    }
    .nb-hamburger:hover { background: rgba(255,255,255,0.08); }
    .nb-hamburger span {
      display: block;
      width: 22px;
      height: 2px;
      background: rgba(255,255,255,0.8);
      border-radius: 2px;
      transition: transform 0.25s, opacity 0.2s;
      transform-origin: center;
    }
    .nb-hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
    .nb-hamburger.open span:nth-child(2) { opacity: 0; }
    .nb-hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

    /* ── Mobile drawer ── */
    .nb-drawer {
      background: #0d2e1a;
      border-top: 1px solid rgba(200,230,201,0.1);
      padding: 16px 24px 24px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.3);
      overflow: hidden;
      max-height: 0;
      opacity: 0;
      transition: max-height 0.3s ease, opacity 0.25s ease, padding 0.3s ease;
    }
    .nb-drawer.open {
      max-height: 400px;
      opacity: 1;
    }
    .nb-drawer-link {
      text-decoration: none;
      font-size: 15px;
      font-weight: 500;
      color: rgba(255,255,255,0.75);
      padding: 11px 14px;
      border-radius: 10px;
      transition: background 0.2s, color 0.2s;
    }
    .nb-drawer-link:hover, .nb-drawer-link.active {
      background: rgba(46,125,50,0.25);
      color: #a5d6a7;
    }
    .nb-drawer-divider {
      height: 1px;
      background: rgba(255,255,255,0.08);
      margin: 8px 0;
    }
    .nb-drawer-logout {
      font-family: 'DM Sans', sans-serif;
      font-size: 15px;
      font-weight: 500;
      color: #ef9a9a;
      background: transparent;
      border: 1px solid rgba(239,154,154,0.2);
      padding: 11px 14px;
      border-radius: 10px;
      cursor: pointer;
      text-align: left;
      transition: background 0.2s;
    }
    .nb-drawer-logout:hover { background: rgba(239,154,154,0.1); }

    /* Spacer so page content doesn't hide under fixed nav */
    .nb-spacer { height: 64px; }

    @media (max-width: 768px) {
      .nb-bar { padding: 0 20px; }
      .nb-links { display: none; }
      .nb-hamburger { display: flex; }
    }
  `}</style>
);

const Navbar = () => {
  const navigate  = useNavigate();
  const location  = useLocation();
  const role      = localStorage.getItem("role");
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
    setMenuOpen(false);
  };

  /* Close drawer on resize to desktop */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* Close drawer on route change */
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  const isActive = (path) => location.pathname === path ? "active" : "";

  return (
    <>
      <NavStyle />
      <nav className="nb-root">

        {/* ── Desktop bar ── */}
        <div className="nb-bar">

          {/* Logo */}
          <Link to="/" className="nb-logo">
            <span className="nb-logo-icon">🌿</span>
            <span className="nb-logo-text">Nutra<span>care</span></span>
          </Link>

          {/* Desktop links */}
          <div className="nb-links">
            <Link to="/" className={`nb-link ${isActive("/")}`}>Home</Link>

            {role === "admin" && (
              <Link to="/admin" className={`nb-link ${isActive("/admin")}`}>Admin Dashboard</Link>
            )}
            {role === "user" && (
              <Link to="/user" className={`nb-link ${isActive("/user")}`}>My Dashboard</Link>
            )}

            <div className="nb-divider" />

            {!role ? (
              <>
                <Link to="/login"  className="nb-link-outline">Login</Link>
                <Link to="/signup" className="nb-link-signup">Sign up</Link>
              </>
            ) : (
              <button className="nb-logout" onClick={logout}>Logout</button>
            )}
          </div>

          {/* Hamburger */}
          <div
            className={`nb-hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen((p) => !p)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </div>
        </div>

        {/* ── Mobile drawer ── */}
        <div className={`nb-drawer ${menuOpen ? "open" : ""}`}>
          <Link to="/" className={`nb-drawer-link ${isActive("/")}`}>Home</Link>

          {role === "admin" && (
            <Link to="/admin" className={`nb-drawer-link ${isActive("/admin")}`}>Admin Dashboard</Link>
          )}
          {role === "user" && (
            <Link to="/user" className={`nb-drawer-link ${isActive("/user")}`}>My Dashboard</Link>
          )}

          <div className="nb-drawer-divider" />

          {!role ? (
            <>
              <Link to="/login"  className="nb-drawer-link">Login</Link>
              <Link to="/signup" className="nb-drawer-link">Sign up</Link>
            </>
          ) : (
            <button className="nb-drawer-logout" onClick={logout}>Logout</button>
          )}
        </div>

      </nav>

      {/* Pushes page content below fixed navbar */}
      <div className="nb-spacer" />
    </>
  );
};

export default Navbar;