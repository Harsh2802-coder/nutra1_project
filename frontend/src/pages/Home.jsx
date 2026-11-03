

// import { isLoggedIn, getRole } from "../utils/auth";
// import { useNavigate } from "react-router-dom";

// const HomeStyle = () => (
//   <style>{`
//     @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@400;500&display=swap');

//     *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

//     .hm-root {
//       font-family: 'DM Sans', sans-serif;
//       color: #1a1a1a;
//       background: #f5f0e8;
//       min-height: 100vh;
//     }

//     /* ── Hero ── */
//     .hm-hero {
//       min-height: 92vh;
//       background: #0d2e1a;
//       display: flex;
//       flex-direction: column;
//       align-items: center;
//       justify-content: center;
//       text-align: center;
//       padding: 80px 24px 64px;
//       position: relative;
//       overflow: hidden;
//     }
//     .hm-hero-ring {
//       position: absolute;
//       border-radius: 50%;
//       border: 1px solid rgba(165,214,167,0.08);
//       pointer-events: none;
//     }
//     .hm-hero-ring-1 { width: 420px; height: 420px; top: -140px; right: -100px; }
//     .hm-hero-ring-2 { width: 300px; height: 300px; bottom: -80px; left: -60px; }
//     .hm-hero-ring-3 { width: 560px; height: 560px; top: 50%; left: 50%; transform: translate(-50%,-50%); opacity: 0.4; }

//     .hm-hero-badge {
//       display: inline-flex;
//       align-items: center;
//       gap: 8px;
//       background: rgba(46,125,50,0.2);
//       border: 1px solid rgba(165,214,167,0.25);
//       border-radius: 50px;
//       padding: 6px 16px;
//       font-size: 11px;
//       font-weight: 500;
//       letter-spacing: 0.16em;
//       text-transform: uppercase;
//       color: #a5d6a7;
//       margin-bottom: 28px;
//       position: relative;
//     }
//     .hm-badge-dot {
//       width: 6px; height: 6px;
//       border-radius: 50%;
//       background: #a5d6a7;
//       animation: hm-pulse 2s ease-in-out infinite;
//     }
//     @keyframes hm-pulse {
//       0%,100% { opacity: 1; transform: scale(1); }
//       50%      { opacity: 0.5; transform: scale(0.7); }
//     }

//     .hm-hero-title {
//       font-family: 'Cormorant Garamond', serif;
//       font-size: clamp(38px, 7vw, 72px);
//       font-weight: 600;
//       color: #ffffff;
//       line-height: 1.08;
//       margin-bottom: 10px;
//       position: relative;
//       max-width: 780px;
//     }
//     .hm-hero-title em {
//       font-style: italic;
//       color: #a5d6a7;
//     }

//     .hm-hero-sub {
//       font-size: clamp(15px, 2vw, 17px);
//       color: rgba(200,230,201,0.65);
//       max-width: 520px;
//       line-height: 1.7;
//       margin-bottom: 48px;
//       position: relative;
//     }

//     /* CTA buttons */
//     .hm-cta-group {
//       display: flex;
//       gap: 12px;
//       justify-content: center;
//       flex-wrap: wrap;
//       position: relative;
//     }
//     .hm-btn-primary {
//       font-family: 'DM Sans', sans-serif;
//       font-size: 15px;
//       font-weight: 500;
//       padding: 13px 32px;
//       border-radius: 50px;
//       border: none;
//       background: #a5d6a7;
//       color: #0d2e1a;
//       cursor: pointer;
//       transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
//     }
//     .hm-btn-primary:hover {
//       background: #c8e6c9;
//       transform: translateY(-2px);
//       box-shadow: 0 6px 24px rgba(165,214,167,0.3);
//     }
//     .hm-btn-outline {
//       font-family: 'DM Sans', sans-serif;
//       font-size: 15px;
//       font-weight: 500;
//       padding: 13px 32px;
//       border-radius: 50px;
//       border: 1.5px solid rgba(255,255,255,0.2);
//       background: transparent;
//       color: rgba(255,255,255,0.8);
//       cursor: pointer;
//       transition: border-color 0.2s, background 0.2s, color 0.2s;
//     }
//     .hm-btn-outline:hover {
//       border-color: rgba(255,255,255,0.5);
//       background: rgba(255,255,255,0.07);
//       color: #fff;
//     }
//     .hm-btn-dashboard {
//       font-family: 'DM Sans', sans-serif;
//       font-size: 15px;
//       font-weight: 500;
//       padding: 13px 36px;
//       border-radius: 50px;
//       border: none;
//       background: #a5d6a7;
//       color: #0d2e1a;
//       cursor: pointer;
//       transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
//       display: inline-flex;
//       align-items: center;
//       gap: 8px;
//     }
//     .hm-btn-dashboard:hover {
//       background: #c8e6c9;
//       transform: translateY(-2px);
//       box-shadow: 0 6px 24px rgba(165,214,167,0.3);
//     }
//     .hm-btn-arrow { font-size: 16px; }

//     /* ── Scroll indicator ── */
//     .hm-scroll {
//       position: absolute;
//       bottom: 28px;
//       left: 50%;
//       transform: translateX(-50%);
//       display: flex;
//       flex-direction: column;
//       align-items: center;
//       gap: 6px;
//       color: rgba(255,255,255,0.3);
//       font-size: 11px;
//       letter-spacing: 0.1em;
//       text-transform: uppercase;
//     }
//     .hm-scroll-line {
//       width: 1px; height: 36px;
//       background: linear-gradient(to bottom, rgba(165,214,167,0.5), transparent);
//       animation: hm-scrollline 1.8s ease-in-out infinite;
//     }
//     @keyframes hm-scrollline {
//       0%,100% { opacity: 0.3; transform: scaleY(1); }
//       50%      { opacity: 0.8; transform: scaleY(0.6); }
//     }

//     /* ── Features strip ── */
//     .hm-features {
//       max-width: 1100px;
//       margin: 0 auto;
//       padding: 72px 24px;
//       display: grid;
//       grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
//       gap: 24px;
//     }
//     .hm-feat {
//       background: #ffffff;
//       border: 1px solid #e8e0d0;
//       border-radius: 16px;
//       padding: 28px 24px;
//       box-shadow: 0 2px 12px rgba(0,0,0,0.05);
//       transition: transform 0.2s, box-shadow 0.2s;
//     }
//     .hm-feat:hover { transform: translateY(-3px); box-shadow: 0 6px 24px rgba(0,0,0,0.09); }
//     .hm-feat-icon {
//       font-size: 28px;
//       margin-bottom: 14px;
//       display: block;
//     }
//     .hm-feat-title {
//       font-family: 'Cormorant Garamond', serif;
//       font-size: 19px;
//       font-weight: 600;
//       color: #0d2e1a;
//       margin-bottom: 8px;
//     }
//     .hm-feat-desc {
//       font-size: 13.5px;
//       color: #5a6a5f;
//       line-height: 1.6;
//     }

//     /* ── Quote band ── */
//     .hm-quote {
//       background: #1a4a2a;
//       padding: 56px 24px;
//       text-align: center;
//     }
//     .hm-quote-text {
//       font-family: 'Cormorant Garamond', serif;
//       font-size: clamp(20px, 3vw, 28px);
//       font-style: italic;
//       color: rgba(200,230,201,0.9);
//       max-width: 680px;
//       margin: 0 auto 12px;
//       line-height: 1.5;
//     }
//     .hm-quote-src {
//       font-size: 12px;
//       letter-spacing: 0.12em;
//       text-transform: uppercase;
//       color: rgba(165,214,167,0.5);
//     }

//     /* ── Footer strip ── */
//     .hm-footer {
//       text-align: center;
//       padding: 28px 24px;
//       font-size: 12px;
//       color: #a09888;
//       border-top: 1px solid #e8e0d0;
//     }

//     @media (max-width: 600px) {
//       .hm-hero { padding: 100px 20px 60px; min-height: 100vh; }
//       .hm-features { padding: 48px 16px; }
//     }
//   `}</style>
// );

// const features = [
//   {
//     icon: "🌿",
//     title: "Herbal Remedies",
//     desc: "Explore time-tested Ayurvedic herbs and their therapeutic applications for common ailments.",
//   },
//   {
//     icon: "🔬",
//     title: "Nutraceuticals",
//     desc: "Science-backed supplements with dosage guidance, best timing, and safety information.",
//   },
//   {
//     icon: "🛡️",
//     title: "Safety First",
//     desc: "Every remedy includes contraindications and safety notes to guide responsible use.",
//   },
//   {
//     icon: "🌱",
//     title: "Plant Knowledge",
//     desc: "Visual plant profiles paired with each medicine so you know exactly what you're using.",
//   },
// ];

// const Home = () => {
//   const navigate  = useNavigate();
//   const loggedIn  = isLoggedIn();
//   const role      = getRole();

//   return (
//     <div className="hm-root">
//       <HomeStyle />

//       {/* ── Hero ── */}
//       <section className="hm-hero">
//         <div className="hm-hero-ring hm-hero-ring-1" />
//         <div className="hm-hero-ring hm-hero-ring-2" />
//         <div className="hm-hero-ring hm-hero-ring-3" />

//         <div className="hm-hero-badge">
//           <span className="hm-badge-dot" />
//           Ayurvedic · Nutraceutical · Wellness
//         </div>

//         <h1 className="hm-hero-title">
//           Ancient Wisdom,<br /><em>Modern Guidance</em>
//         </h1>

//         <p className="hm-hero-sub">
//           A web-based platform delivering herbal and nutraceutical
//           recommendations for various conditions — with plant profiles,
//           dosage guidance, and safety advice.
//         </p>

//         {/* Not logged in */}
//         {!loggedIn && (
//           <div className="hm-cta-group">
//             <button className="hm-btn-primary" onClick={() => navigate("/signup")}>
//               Get Started
//             </button>
//             <button className="hm-btn-outline" onClick={() => navigate("/login")}>
//               Sign In
//             </button>
//           </div>
//         )}

//         {/* User logged in */}
//         {loggedIn && role === "user" && (
//           <div className="hm-cta-group">
//             <button className="hm-btn-dashboard" onClick={() => navigate("/user")}>
//               My Dashboard <span className="hm-btn-arrow">→</span>
//             </button>
//           </div>
//         )}

//         {/* Admin logged in */}
//         {loggedIn && role === "admin" && (
//           <div className="hm-cta-group">
//             <button className="hm-btn-dashboard" onClick={() => navigate("/admin")}>
//               Admin Dashboard <span className="hm-btn-arrow">→</span>
//             </button>
//           </div>
//         )}

//         <div className="hm-scroll">
//           <div className="hm-scroll-line" />
//           Scroll
//         </div>
//       </section>

//       {/* ── Features ── */}
//       <section className="hm-features">
//         {features.map((f, i) => (
//           <div key={i} className="hm-feat">
//             <span className="hm-feat-icon">{f.icon}</span>
//             <p className="hm-feat-title">{f.title}</p>
//             <p className="hm-feat-desc">{f.desc}</p>
//           </div>
//         ))}
//       </section>

//       {/* ── Quote ── */}
//       <section className="hm-quote">
//         <p className="hm-quote-text">
//           "Let food be thy medicine and medicine be thy food."
//         </p>
//         <p className="hm-quote-src">— Hippocrates</p>
//       </section>

//       {/* ── Footer ── */}
//       <footer className="hm-footer">
//         © {new Date().getFullYear()} Nutracare · Ayurvedic &amp; Nutraceutical Guidance System
//       </footer>
//     </div>
//   );
// };

// export default Home;

import { isLoggedIn, getRole } from "../utils/auth";
import { useNavigate } from "react-router-dom";

const HomeStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@400;500&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    .hm-root { font-family: 'DM Sans', sans-serif; color: #1a1a1a; background: #f5f0e8; min-height: 100vh; }
    .hm-hero { min-height: 92vh; background: #0d2e1a; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 80px 24px 64px; position: relative; overflow: hidden; }
    .hm-hero-ring { position: absolute; border-radius: 50%; border: 1px solid rgba(165,214,167,0.08); pointer-events: none; }
    .hm-hero-ring-1 { width: 420px; height: 420px; top: -140px; right: -100px; }
    .hm-hero-ring-2 { width: 300px; height: 300px; bottom: -80px; left: -60px; }
    .hm-hero-ring-3 { width: 560px; height: 560px; top: 50%; left: 50%; transform: translate(-50%,-50%); opacity: 0.4; }
    .hm-hero-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(46,125,50,0.2); border: 1px solid rgba(165,214,167,0.25); border-radius: 50px; padding: 6px 16px; font-size: 11px; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; color: #a5d6a7; margin-bottom: 28px; position: relative; }
    .hm-badge-dot { width: 6px; height: 6px; border-radius: 50%; background: #a5d6a7; animation: hm-pulse 2s ease-in-out infinite; }
    @keyframes hm-pulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.5; transform:scale(0.7); } }
    .hm-hero-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(38px,7vw,72px); font-weight: 600; color: #ffffff; line-height: 1.08; margin-bottom: 10px; position: relative; max-width: 780px; }
    .hm-hero-title em { font-style: italic; color: #a5d6a7; }
    .hm-hero-sub { font-size: clamp(15px,2vw,17px); color: rgba(200,230,201,0.65); max-width: 520px; line-height: 1.7; margin-bottom: 48px; position: relative; }
    .hm-cta-group { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; position: relative; }
    .hm-btn-primary { font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 500; padding: 13px 32px; border-radius: 50px; border: none; background: #a5d6a7; color: #0d2e1a; cursor: pointer; transition: background 0.2s, transform 0.15s, box-shadow 0.2s; }
    .hm-btn-primary:hover { background: #c8e6c9; transform: translateY(-2px); box-shadow: 0 6px 24px rgba(165,214,167,0.3); }
    .hm-btn-outline { font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 500; padding: 13px 32px; border-radius: 50px; border: 1.5px solid rgba(255,255,255,0.2); background: transparent; color: rgba(255,255,255,0.8); cursor: pointer; transition: border-color 0.2s, background 0.2s, color 0.2s; }
    .hm-btn-outline:hover { border-color: rgba(255,255,255,0.5); background: rgba(255,255,255,0.07); color: #fff; }
    .hm-btn-dashboard { font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 500; padding: 13px 36px; border-radius: 50px; border: none; background: #a5d6a7; color: #0d2e1a; cursor: pointer; transition: background 0.2s, transform 0.15s, box-shadow 0.2s; display: inline-flex; align-items: center; gap: 8px; }
    .hm-btn-dashboard:hover { background: #c8e6c9; transform: translateY(-2px); box-shadow: 0 6px 24px rgba(165,214,167,0.3); }
    .hm-scroll { position: absolute; bottom: 28px; left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; gap: 6px; color: rgba(255,255,255,0.3); font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; }
    .hm-scroll-line { width: 1px; height: 36px; background: linear-gradient(to bottom, rgba(165,214,167,0.5), transparent); animation: hm-scrollline 1.8s ease-in-out infinite; }
    @keyframes hm-scrollline { 0%,100% { opacity:0.3; } 50% { opacity:0.8; } }
    .hm-features { max-width: 1100px; margin: 0 auto; padding: 72px 24px; display: grid; grid-template-columns: repeat(auto-fit, minmax(220px,1fr)); gap: 24px; }
    .hm-feat { background: #ffffff; border: 1px solid #e8e0d0; border-radius: 16px; padding: 28px 24px; box-shadow: 0 2px 12px rgba(0,0,0,0.05); transition: transform 0.2s, box-shadow 0.2s; }
    .hm-feat:hover { transform: translateY(-3px); box-shadow: 0 6px 24px rgba(0,0,0,0.09); }
    .hm-feat-icon { font-size: 28px; margin-bottom: 14px; display: block; }
    .hm-feat-title { font-family: 'Cormorant Garamond', serif; font-size: 19px; font-weight: 600; color: #0d2e1a; margin-bottom: 8px; }
    .hm-feat-desc { font-size: 13.5px; color: #5a6a5f; line-height: 1.6; }
    .hm-learn-band { background: #1a4a2a; padding: 48px 24px; text-align: center; }
    .hm-learn-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(22px,3vw,30px); font-weight: 600; color: #ffffff; margin-bottom: 8px; }
    .hm-learn-sub { font-size: 14px; color: rgba(200,230,201,0.6); margin-bottom: 24px; }
    .hm-btn-learn { font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500; padding: 11px 28px; border-radius: 50px; border: 1.5px solid rgba(165,214,167,0.4); background: transparent; color: #a5d6a7; cursor: pointer; transition: background 0.2s, border-color 0.2s; }
    .hm-btn-learn:hover { background: rgba(165,214,167,0.1); border-color: #a5d6a7; }
    .hm-quote { background: #0d2e1a; padding: 56px 24px; text-align: center; }
    .hm-quote-text { font-family: 'Cormorant Garamond', serif; font-size: clamp(20px,3vw,28px); font-style: italic; color: rgba(200,230,201,0.9); max-width: 680px; margin: 0 auto 12px; line-height: 1.5; }
    .hm-quote-src { font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(165,214,167,0.5); }
    .hm-footer { text-align: center; padding: 28px 24px; font-size: 12px; color: #a09888; border-top: 1px solid #e8e0d0; }
    @media (max-width: 600px) { .hm-hero { padding: 100px 20px 60px; min-height: 100vh; } .hm-features { padding: 48px 16px; } }
  `}</style>
);

const features = [
  { icon: "🌿", title: "Herbal Remedies",  desc: "Explore time-tested Ayurvedic herbs and their therapeutic applications for common ailments." },
  { icon: "🔬", title: "Nutraceuticals",   desc: "Science-backed supplements with dosage guidance, best timing, and safety information." },
  { icon: "🛡️", title: "Safety First",     desc: "Every remedy includes contraindications and safety notes to guide responsible use." },
  { icon: "🌱", title: "Plant Knowledge",  desc: "Visual plant profiles paired with each medicine so you know exactly what you're using." },
];

const Home = () => {
  const navigate = useNavigate();
  const loggedIn = isLoggedIn();
  const role     = getRole();

  return (
    <div className="hm-root">
      <HomeStyle />

      <section className="hm-hero">
        <div className="hm-hero-ring hm-hero-ring-1" />
        <div className="hm-hero-ring hm-hero-ring-2" />
        <div className="hm-hero-ring hm-hero-ring-3" />

        <div className="hm-hero-badge">
          <span className="hm-badge-dot" />
          Ancient Wisdom · Modern Guidance
        </div>

        <h1 className="hm-hero-title">
          Ancient Wisdom,<br /><em>Modern Guidance</em>
        </h1>
        <p className="hm-hero-sub">
          A web-based platform delivering herbal and nutraceutical recommendations for various conditions — with plant profiles, dosage guidance, and safety advice.
        </p>

        {!loggedIn && (
          <div className="hm-cta-group">
            {/* ✅ Routes to /get-started, NOT /signup */}
            <button className="hm-btn-primary" onClick={() => navigate("/get-started")}>
              Get Started
            </button>
            <button className="hm-btn-outline" onClick={() => navigate("/login")}>
              Sign In
            </button>
          </div>
        )}

        {loggedIn && role === "user" && (
          <div className="hm-cta-group">
            <button className="hm-btn-dashboard" onClick={() => navigate("/user")}>
              My Dashboard <span>→</span>
            </button>
          </div>
        )}

        {loggedIn && role === "admin" && (
          <div className="hm-cta-group">
            <button className="hm-btn-dashboard" onClick={() => navigate("/admin")}>
              Admin Dashboard <span>→</span>
            </button>
          </div>
        )}

        <div className="hm-scroll">
          <div className="hm-scroll-line" />
          Scroll
        </div>
      </section>

      <section className="hm-features">
        {features.map((f, i) => (
          <div key={i} className="hm-feat">
            <span className="hm-feat-icon">{f.icon}</span>
            <p className="hm-feat-title">{f.title}</p>
            <p className="hm-feat-desc">{f.desc}</p>
          </div>
        ))}
      </section>

      <section className="hm-learn-band">
        <h2 className="hm-learn-title">New to Nutraceuticals?</h2>
        <p className="hm-learn-sub">Learn about the history, science, and benefits of natural healing compounds.</p>
        <button className="hm-btn-learn" onClick={() => navigate("/get-started")}>
          Read the Full Guide →
        </button>
      </section>

      <section className="hm-quote">
        <p className="hm-quote-text">"Let food be thy medicine and medicine be thy food."</p>
        <p className="hm-quote-src">— Hippocrates</p>
      </section>

      <footer className="hm-footer">
        © {new Date().getFullYear()} Nutracare · Ayurvedic &amp; Nutraceutical Guidance System
      </footer>
    </div>
  );
};

export default Home;
