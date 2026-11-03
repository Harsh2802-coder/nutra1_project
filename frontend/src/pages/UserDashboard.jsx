// import { useState, useEffect, useRef } from "react";
// import axios from "axios";

// /* ─── Design tokens ──────────────────────────────────────────────── */
// const tokens = {
//   green900: "#0d2e1a",
//   green800: "#1a4a2a",
//   green700: "#1e5c30",
//   green600: "#2e7d32",
//   green500: "#388e3c",
//   green100: "#c8e6c9",
//   green50:  "#f1f8f2",
//   amber600: "#b45309",
//   amber50:  "#fffbeb",
//   sand100:  "#f5f0e8",
//   sand200:  "#e8e0d0",
//   text:     "#1a1a1a",
//   textMuted:"#5a6a5f",
//   white:    "#ffffff",
//   shadow:   "0 2px 12px rgba(0,0,0,0.08)",
//   shadowMd: "0 4px 24px rgba(0,0,0,0.12)",
//   radius:   "12px",
//   radiusLg: "18px",
// };

// /* ─── Global styles injected once ───────────────────────────────── */
// const GlobalStyle = () => (
//   <style>{`
//     @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&family=DM+Sans:wght@400;500&display=swap');

//     *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

//     body { background: ${tokens.sand100}; font-family: 'DM Sans', sans-serif; }

//     .ud-root {
//       min-height: 100vh;
//       background: ${tokens.sand100};
//       color: ${tokens.text};
//     }

//     /* Hero search bar */
//     .ud-hero {
//       background: ${tokens.green900};
//       padding: 64px 24px 72px;
//       text-align: center;
//       position: relative;
//       overflow: hidden;
//     }
//     .ud-hero::before {
//       content: '';
//       position: absolute; inset: 0;
//       background: radial-gradient(ellipse 80% 60% at 50% -10%, #2e7d3233, transparent);
//       pointer-events: none;
//     }
//     .ud-hero-eyebrow {
//       font-family: 'DM Sans', sans-serif;
//       font-size: 11px;
//       font-weight: 500;
//       letter-spacing: 0.18em;
//       text-transform: uppercase;
//       color: ${tokens.green100};
//       opacity: 0.7;
//       margin-bottom: 14px;
//     }
//     .ud-hero-title {
//       font-family: 'Cormorant Garamond', serif;
//       font-size: clamp(32px, 5vw, 52px);
//       font-weight: 600;
//       color: ${tokens.white};
//       line-height: 1.15;
//       margin-bottom: 8px;
//     }
//     .ud-hero-subtitle {
//       font-size: 15px;
//       color: ${tokens.green100};
//       opacity: 0.65;
//       margin-bottom: 36px;
//     }

//     /* Search box */
//     .ud-search-wrap {
//       max-width: 580px;
//       margin: 0 auto;
//       position: relative;
//     }
//     .ud-search-row {
//       display: flex;
//       gap: 0;
//       background: ${tokens.white};
//       border-radius: 50px;
//       box-shadow: ${tokens.shadowMd};
//       overflow: visible;
//       border: 2px solid transparent;
//       transition: border-color 0.2s;
//     }
//     .ud-search-row:focus-within {
//       border-color: ${tokens.green500};
//     }
//     .ud-search-input {
//       flex: 1;
//       padding: 16px 20px;
//       font-size: 15px;
//       font-family: 'DM Sans', sans-serif;
//       border: none;
//       background: transparent;
//       color: ${tokens.text};
//       outline: none;
//       border-radius: 50px 0 0 50px;
//       min-width: 0;
//     }
//     .ud-search-input::placeholder { color: #aab4ae; }

//     /* ── Voice button ── */
//     .ud-voice-btn {
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       width: 48px;
//       height: 48px;
//       margin: 4px 0;
//       border: none;
//       background: transparent;
//       cursor: pointer;
//       border-radius: 50%;
//       transition: background 0.2s;
//       flex-shrink: 0;
//       position: relative;
//     }
//     .ud-voice-btn:hover:not(:disabled) { background: ${tokens.green50}; }
//     .ud-voice-btn:disabled { opacity: 0.45; cursor: not-allowed; }

//     /* Mic icon SVG colours */
//     .ud-mic-idle   { color: ${tokens.textMuted}; }
//     .ud-mic-active { color: #e53935; }

//     /* Pulse ring when listening */
//     @keyframes voicePulse {
//       0%   { transform: scale(1);   opacity: 0.6; }
//       70%  { transform: scale(1.9); opacity: 0;   }
//       100% { transform: scale(1.9); opacity: 0;   }
//     }
//     .ud-voice-pulse {
//       position: absolute;
//       inset: 0;
//       border-radius: 50%;
//       background: #e5393522;
//       animation: voicePulse 1.2s ease-out infinite;
//     }

//     /* Listening banner */
//     @keyframes fadeSlideDown {
//       from { opacity: 0; transform: translateY(-6px); }
//       to   { opacity: 1; transform: translateY(0);    }
//     }
//     .ud-listening-badge {
//       display: inline-flex;
//       align-items: center;
//       gap: 8px;
//       margin-top: 12px;
//       padding: 7px 16px;
//       background: rgba(229,57,53,0.12);
//       border: 1px solid rgba(229,57,53,0.3);
//       border-radius: 50px;
//       font-size: 13px;
//       color: #ef9a9a;
//       animation: fadeSlideDown 0.25s ease;
//     }
//     .ud-listening-dot {
//       width: 8px; height: 8px;
//       border-radius: 50%;
//       background: #e53935;
//       animation: voicePulse 1s ease-out infinite;
//     }

//     /* Interim transcript hint */
//     .ud-interim-hint {
//       margin-top: 8px;
//       font-size: 13px;
//       color: ${tokens.green100};
//       opacity: 0.6;
//       font-style: italic;
//       min-height: 18px;
//     }

//     .ud-search-btn {
//       padding: 0 26px;
//       background: ${tokens.green600};
//       color: ${tokens.white};
//       border: none;
//       border-radius: 0 50px 50px 0;
//       font-size: 14px;
//       font-weight: 500;
//       font-family: 'DM Sans', sans-serif;
//       cursor: pointer;
//       transition: background 0.2s;
//       white-space: nowrap;
//       flex-shrink: 0;
//     }
//     .ud-search-btn:hover:not(:disabled) { background: ${tokens.green700}; }
//     .ud-search-btn:disabled { opacity: 0.6; cursor: not-allowed; }

//     /* No-support notice */
//     .ud-no-voice {
//       margin-top: 10px;
//       font-size: 12px;
//       color: #ef9a9a;
//       opacity: 0.8;
//     }

//     /* Suggestions dropdown */
//     .ud-suggestions {
//       position: absolute;
//       top: calc(100% + 8px);
//       left: 0; right: 0;
//       background: ${tokens.white};
//       border-radius: ${tokens.radius};
//       box-shadow: ${tokens.shadowMd};
//       border: 1px solid ${tokens.sand200};
//       overflow: hidden;
//       z-index: 100;
//     }
//     .ud-suggestion-item {
//       padding: 11px 20px;
//       font-size: 14px;
//       color: ${tokens.text};
//       cursor: pointer;
//       border-bottom: 1px solid ${tokens.sand200};
//       transition: background 0.15s;
//     }
//     .ud-suggestion-item:last-child { border-bottom: none; }
//     .ud-suggestion-item:hover { background: ${tokens.green50}; }

//     /* Error */
//     .ud-error {
//       margin-top: 12px;
//       font-size: 13px;
//       color: #e53935;
//     }

//     /* Disease banner */
//     .ud-banner {
//       width: 100%;
//       height: min(60vh, 480px);
//       background-size: cover;
//       background-position: center;
//       position: relative;
//       display: flex;
//       align-items: flex-end;
//     }
//     .ud-banner-overlay {
//       position: absolute; inset: 0;
//       background: linear-gradient(to top, rgba(10,30,15,0.82) 0%, rgba(10,30,15,0.18) 70%, transparent 100%);
//     }
//     .ud-banner-text {
//       position: relative;
//       padding: 36px 40px;
//       color: ${tokens.white};
//     }
//     .ud-banner-label {
//       font-size: 11px;
//       letter-spacing: 0.14em;
//       text-transform: uppercase;
//       color: ${tokens.green100};
//       opacity: 0.75;
//       margin-bottom: 8px;
//     }
//     .ud-banner-disease {
//       font-family: 'Cormorant Garamond', serif;
//       font-size: clamp(30px, 4vw, 48px);
//       font-weight: 600;
//       line-height: 1.1;
//     }

//     /* Section */
//     .ud-section {
//       max-width: 1200px;
//       margin: 0 auto;
//       padding: 48px 24px;
//     }
//     .ud-section-header {
//       display: flex;
//       align-items: center;
//       gap: 12px;
//       margin-bottom: 32px;
//     }
//     .ud-section-line {
//       flex: 1;
//       height: 1px;
//       background: ${tokens.sand200};
//     }
//     .ud-section-label {
//       font-size: 11px;
//       letter-spacing: 0.14em;
//       text-transform: uppercase;
//       color: ${tokens.textMuted};
//       font-weight: 500;
//     }

//     /* Cards grid */
//     .ud-grid {
//       display: grid;
//       grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
//       gap: 24px;
//     }

//     /* Card */
//     .ud-card {
//       background: ${tokens.white};
//       border-radius: ${tokens.radiusLg};
//       box-shadow: ${tokens.shadow};
//       overflow: hidden;
//       border: 1px solid ${tokens.sand200};
//       transition: transform 0.2s, box-shadow 0.2s;
//     }
//     .ud-card:hover {
//       transform: translateY(-3px);
//       box-shadow: ${tokens.shadowMd};
//     }
//     .ud-card-img-wrap {
//       width: 100%;
//       height: 180px;
//       background: ${tokens.green50};
//       overflow: hidden;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//     }
//     .ud-card-img {
//       width: 100%;
//       height: 100%;
//       object-fit: cover;
//     }
//     .ud-card-body {
//       padding: 20px;
//     }
//     .ud-card-name {
//       font-family: 'Cormorant Garamond', serif;
//       font-size: 20px;
//       font-weight: 600;
//       color: ${tokens.green800};
//       margin-bottom: 14px;
//     }
//     .ud-advice-list {
//       list-style: none;
//       margin-bottom: 16px;
//     }
//     .ud-advice-item {
//       display: flex;
//       gap: 10px;
//       font-size: 13.5px;
//       color: ${tokens.text};
//       line-height: 1.5;
//       padding: 5px 0;
//       border-bottom: 1px solid ${tokens.sand200};
//     }
//     .ud-advice-item:last-child { border-bottom: none; }
//     .ud-advice-dot {
//       margin-top: 7px;
//       width: 5px;
//       height: 5px;
//       border-radius: 50%;
//       background: ${tokens.green600};
//       flex-shrink: 0;
//     }
//     .ud-safety {
//       margin-top: 14px;
//       padding: 10px 14px;
//       background: ${tokens.amber50};
//       border-left: 3px solid ${tokens.amber600};
//       border-radius: 0 8px 8px 0;
//       font-size: 13px;
//       color: ${tokens.amber600};
//       line-height: 1.5;
//     }
//     .ud-safety-label {
//       font-weight: 600;
//       margin-right: 4px;
//     }

//     /* Loading shimmer */
//     @keyframes shimmer {
//       0%   { background-position: -600px 0; }
//       100% { background-position: 600px 0; }
//     }
//     .ud-shimmer {
//       background: linear-gradient(90deg, ${tokens.sand100} 25%, ${tokens.sand200} 50%, ${tokens.sand100} 75%);
//       background-size: 600px 100%;
//       animation: shimmer 1.4s infinite linear;
//       border-radius: 8px;
//     }

//     /* Responsive */
//     @media (max-width: 600px) {
//       .ud-hero { padding: 48px 16px 60px; }
//       .ud-search-btn { padding: 0 16px; font-size: 13px; }
//       .ud-banner-text { padding: 24px 20px; }
//       .ud-section { padding: 32px 16px; }
//     }
//   `}</style>
// );

// /* ─── Mic SVG icon ───────────────────────────────────────────────── */
// const MicIcon = ({ active, size = 22 }) => (
//   <svg
//     width={size} height={size}
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     className={active ? "ud-mic-active" : "ud-mic-idle"}
//   >
//     <rect x="9" y="2" width="6" height="12" rx="3" />
//     <path d="M5 10a7 7 0 0 0 14 0" />
//     <line x1="12" y1="19" x2="12" y2="22" />
//     <line x1="9"  y1="22" x2="15" y2="22" />
//   </svg>
// );

// /* ─── Skeleton card ──────────────────────────────────────────────── */
// const SkeletonCard = () => (
//   <div className="ud-card">
//     <div className="ud-card-img-wrap">
//       <div className="ud-shimmer" style={{ width: "100%", height: "100%" }} />
//     </div>
//     <div className="ud-card-body">
//       <div className="ud-shimmer" style={{ height: 22, width: "60%", marginBottom: 16 }} />
//       {[1, 2, 3].map((i) => (
//         <div key={i} className="ud-shimmer" style={{ height: 13, marginBottom: 8, width: `${75 + i * 5}%` }} />
//       ))}
//     </div>
//   </div>
// );

// /* ─── Voice search hook ──────────────────────────────────────────── */
// const useSpeechRecognition = ({ onResult, onInterim, onError }) => {
//   const recognitionRef = useRef(null);
//   const [isListening, setIsListening]   = useState(false);
//   const [isSupported, setIsSupported]   = useState(true);

//   useEffect(() => {
//     const SpeechRecognition =
//       window.SpeechRecognition || window.webkitSpeechRecognition;

//     if (!SpeechRecognition) {
//       setIsSupported(false);
//       return;
//     }

//     const rec = new SpeechRecognition();
//     rec.continuous      = false;   // single utterance
//     rec.interimResults  = true;    // show partial transcript
//     rec.lang            = "en-IN"; // Indian English — change if needed
//     rec.maxAlternatives = 1;

//     rec.onresult = (e) => {
//       let interim = "";
//       let final   = "";

//       for (let i = e.resultIndex; i < e.results.length; i++) {
//         const transcript = e.results[i][0].transcript;
//         if (e.results[i].isFinal) final += transcript;
//         else                       interim += transcript;
//       }

//       if (interim) onInterim?.(interim);
//       if (final)   onResult?.(final.trim());
//     };

//     rec.onerror = (e) => {
//       setIsListening(false);
//       if (e.error === "no-speech")       onError?.("No speech detected. Try again.");
//       else if (e.error === "not-allowed") onError?.("Microphone access denied. Please allow microphone.");
//       else                                onError?.(`Voice error: ${e.error}`);
//     };

//     rec.onend = () => setIsListening(false);

//     recognitionRef.current = rec;
//   }, []);  // eslint-disable-line

//   const startListening = () => {
//     if (!recognitionRef.current || isListening) return;
//     try {
//       recognitionRef.current.start();
//       setIsListening(true);
//     } catch {
//       // already started
//     }
//   };

//   const stopListening = () => {
//     if (!recognitionRef.current || !isListening) return;
//     recognitionRef.current.stop();
//     setIsListening(false);
//   };

//   const toggleListening = () =>
//     isListening ? stopListening() : startListening();

//   return { isListening, isSupported, toggleListening, stopListening };
// };

// /* ─── Main component ─────────────────────────────────────────────── */
// const UserDashboard = () => {
//   const [disease, setDisease]                 = useState("");
//   const [result, setResult]                   = useState(null);
//   const [error, setError]                     = useState("");
//   const [loading, setLoading]                 = useState(false);
//   const [allDiseases, setAllDiseases]         = useState([]);
//   const [suggestions, setSuggestions]         = useState([]);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [interimText, setInterimText]         = useState("");
//   const wrapRef  = useRef(null);
//   const inputRef = useRef(null);

//   /* ── Load disease list ── */
//   useEffect(() => {
//     axios
//       .get("https://nutra1-project-1.onrender.com/api/nutra/diseases")
//       .then((res) => setAllDiseases(res.data))
//       .catch(() => {});
//   }, []);

//   /* ── Close suggestions on outside click ── */
//   useEffect(() => {
//     const handler = (e) => {
//       if (wrapRef.current && !wrapRef.current.contains(e.target))
//         setShowSuggestions(false);
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   /* ── Voice recognition hook ── */
//   const { isListening, isSupported, toggleListening, stopListening } =
//     useSpeechRecognition({
//       onInterim: (text) => {
//         setInterimText(text);
//         setDisease(text); // live preview while speaking
//       },
//       onResult: (text) => {
//         setInterimText("");
//         setDisease(text);
//         // auto-trigger search when voice finalises
//         submitWithValue(text);
//       },
//       onError: (msg) => {
//         setInterimText("");
//         setError(msg);
//       },
//     });

//   /* ── Text input change ── */
//   const handleChange = (e) => {
//     const val = e.target.value;
//     setDisease(val);
//     setInterimText("");
//     if (val.length > 0) {
//       setSuggestions(
//         allDiseases.filter((d) => d.toLowerCase().includes(val.toLowerCase()))
//       );
//       setShowSuggestions(true);
//     } else {
//       setShowSuggestions(false);
//     }
//   };

//   const selectSuggestion = (name) => {
//     setDisease(name);
//     setShowSuggestions(false);
//     inputRef.current?.focus();
//   };

//   /* ── Search ── */
//   const submitWithValue = async (value) => {
//     const query = (value || disease).trim();
//     setError("");
//     setResult(null);
//     setShowSuggestions(false);

//     if (!query) { setError("Please enter or speak a disease name."); return; }

//     setLoading(true);
//     try {
//       const res = await axios.post(
//         "https://nutra1-project-1.onrender.com/api/nutra/search",
//         { disease: query }
//       );
//       setResult(res.data);
//     } catch {
//       setError("Could not fetch Ayurvedic information. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const submitHandler = () => {
//     if (isListening) stopListening();
//     submitWithValue(disease);
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") submitHandler();
//   };

//   /* ── Mic button click ── */
//   const handleVoiceClick = () => {
//     setError("");
//     setInterimText("");
//     toggleListening();
//   };

//   return (
//     <div className="ud-root">
//       <GlobalStyle />

//       {/* ── Hero ── */}
//       <header className="ud-hero">
//         <p className="ud-hero-eyebrow">Ancient Wisdom · Modern Guidance</p>
//         <h1 className="ud-hero-title">
//           Ayurvedic &amp;<br />Nutraceutical Care
//         </h1>
//         <p className="ud-hero-subtitle">
//           Search or speak a condition to explore natural remedies
//         </p>

//         <div className="ud-search-wrap" ref={wrapRef}>
//           <div className="ud-search-row">
//             {/* Text input */}
//             <input
//               ref={inputRef}
//               className="ud-search-input"
//               value={disease}
//               onChange={handleChange}
//               onKeyDown={handleKeyDown}
//               placeholder="e.g. Diabetes, Arthritis, Fever…"
//               autoComplete="off"
//             />

//             {/* ── Voice button ── */}
//             {isSupported && (
//               <button
//                 className="ud-voice-btn"
//                 onClick={handleVoiceClick}
//                 disabled={loading}
//                 title={isListening ? "Stop listening" : "Search by voice"}
//                 aria-label={isListening ? "Stop voice search" : "Start voice search"}
//               >
//                 {isListening && <span className="ud-voice-pulse" />}
//                 <MicIcon active={isListening} />
//               </button>
//             )}

//             {/* Search button */}
//             <button
//               className="ud-search-btn"
//               onClick={submitHandler}
//               disabled={loading}
//             >
//               {loading ? "Searching…" : "Search"}
//             </button>
//           </div>

//           {/* Listening badge */}
//           {isListening && (
//             <div style={{ textAlign: "center" }}>
//               <span className="ud-listening-badge">
//                 <span className="ud-listening-dot" />
//                 Listening… speak your disease name
//               </span>
//               {interimText && (
//                 <p className="ud-interim-hint">"{interimText}"</p>
//               )}
//             </div>
//           )}

//           {/* Browser not supported */}
//           {!isSupported && (
//             <p className="ud-no-voice">
//               🎤 Voice search is not supported in this browser. Try Chrome or Edge.
//             </p>
//           )}

//           {/* Suggestions dropdown */}
//           {showSuggestions && suggestions.length > 0 && (
//             <div className="ud-suggestions">
//               {suggestions.slice(0, 8).map((item, i) => (
//                 <div
//                   key={i}
//                   className="ud-suggestion-item"
//                   onClick={() => selectSuggestion(item)}
//                 >
//                   {item}
//                 </div>
//               ))}
//             </div>
//           )}

//           {error && <p className="ud-error">{error}</p>}
//         </div>
//       </header>

//       {/* ── Loading skeleton ── */}
//       {loading && (
//         <div className="ud-section">
//           <div className="ud-grid">
//             {[1, 2, 3].map((i) => (
//               <SkeletonCard key={i} />
//             ))}
//           </div>
//         </div>
//       )}

//       {/* ── Results ── */}
//       {result?.results?.map((group, i) => (
//         <div key={i}>
//           {/* Disease banner */}
//           <div
//             className="ud-banner"
//             style={{ backgroundImage: `url(${group.diseaseImage})` }}
//           >
//             <div className="ud-banner-overlay" />
//             <div className="ud-banner-text">
//               <p className="ud-banner-label">Showing results for</p>
//               <h2 className="ud-banner-disease">{group.disease}</h2>
//             </div>
//           </div>

//           {/* Cards */}
//           <div className="ud-section">
//             <div className="ud-section-header">
//               <div className="ud-section-line" />
//               <span className="ud-section-label">Recommended Remedies</span>
//               <div className="ud-section-line" />
//             </div>

//             <div className="ud-grid">
//               {group.suggestions.map((item, idx) => (
//                 <div key={idx} className="ud-card">
//                   <div className="ud-card-img-wrap">
//                     {item.plantImage ? (
//                       <img
//                         src={item.plantImage}
//                         alt={item.medicine}
//                         className="ud-card-img"
//                       />
//                     ) : (
//                       <div style={{ fontSize: 40 }}>🌿</div>
//                     )}
//                   </div>
//                   <div className="ud-card-body">
//                     <h3 className="ud-card-name">{item.medicine}</h3>
//                     <ul className="ud-advice-list">
//                       {item.advicePoints.map((p, pi) => (
//                         <li key={pi} className="ud-advice-item">
//                           <span className="ud-advice-dot" />
//                           <span>{p}</span>
//                         </li>
//                       ))}
//                     </ul>
//                     {item.safetyNotes && (
//                       <div className="ud-safety">
//                         <span className="ud-safety-label">Safety:</span>
//                         {item.safetyNotes}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default UserDashboard;

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  const [query, setQuery] = useState("");
  const [allDiseases, setAllDiseases] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchRef = useRef(null);

  useEffect(() => {
    axios
      .get("https://nutra1-project-1.onrender.com/api/nutra/diseases")
      .then((res) => {
        setAllDiseases(res.data);
      })
      .catch((err) => {
        console.error("Failed to load diseases:", err);
      });
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!query.trim()) {
      setError("Please enter a disease name.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await axios.post(
        "https://nutra1-project-1.onrender.com/api/nutra/search",
        {
          disease: query,
        }
      );

      if (!res.data?.results || res.data.results.length === 0) {
        setError("No information found for this disease.");
      }

      setResult(res.data);
    } catch (err) {
      console.error("Disease search error:", err);

      setError(
        err.response?.data?.message ||
          "Failed to fetch disease information."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDiseaseSelect = (disease) => {
    setQuery(disease);
    setError("");

    if (searchRef.current) {
      searchRef.current.focus();
    }
  };

  return (
    <>
      <style>
        {`
          * {
            box-sizing: border-box;
          }

          .ud-page {
            min-height: 100vh;
            background: #f7faf8;
            padding: 40px 20px 70px;
            font-family: Arial, Helvetica, sans-serif;
            color: #24332b;
          }

          .ud-container {
            max-width: 1200px;
            margin: 0 auto;
          }

          .ud-header {
            text-align: center;
            margin-bottom: 35px;
          }

          .ud-title {
            margin: 0;
            font-size: 36px;
            font-weight: 700;
            color: #1f5135;
          }

          .ud-subtitle {
            margin-top: 10px;
            color: #68766e;
            font-size: 16px;
          }

          .ud-search-box {
            max-width: 850px;
            margin: 0 auto 25px;
            background: #ffffff;
            border-radius: 18px;
            padding: 22px;
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
          }

          .ud-search-form {
            display: flex;
            gap: 12px;
          }

          .ud-search-input {
            flex: 1;
            height: 50px;
            padding: 0 18px;
            border: 1px solid #d6dfd9;
            border-radius: 12px;
            outline: none;
            font-size: 15px;
            color: #24332b;
          }

          .ud-search-input:focus {
            border-color: #4b8b63;
            box-shadow: 0 0 0 3px rgba(75, 139, 99, 0.12);
          }

          .ud-search-button {
            border: none;
            border-radius: 12px;
            padding: 0 25px;
            background: #2f7047;
            color: #ffffff;
            font-size: 15px;
            font-weight: 600;
            cursor: pointer;
            transition: 0.2s ease;
          }

          .ud-search-button:hover {
            background: #245b39;
            transform: translateY(-1px);
          }

          .ud-search-button:disabled {
            opacity: 0.65;
            cursor: not-allowed;
            transform: none;
          }

          .ud-disease-list {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 8px;
            margin-top: 18px;
          }

          .ud-disease-button {
            border: 1px solid #d8e4dc;
            background: #f7fbf8;
            color: #37654a;
            padding: 7px 13px;
            border-radius: 30px;
            cursor: pointer;
            font-size: 12px;
            transition: 0.2s ease;
          }

          .ud-disease-button:hover {
            background: #2f7047;
            color: #ffffff;
            border-color: #2f7047;
          }

          .ud-error {
            max-width: 850px;
            margin: 15px auto;
            padding: 13px 16px;
            background: #fff3f3;
            border: 1px solid #f1caca;
            border-radius: 10px;
            color: #a23b3b;
            font-size: 14px;
          }

          .ud-loading {
            text-align: center;
            padding: 30px;
            color: #5f7065;
            font-size: 15px;
          }

          .ud-results {
            margin-top: 35px;
          }

          .ud-result-group {
            margin-bottom: 50px;
          }

          .ud-banner {
            min-height: 300px;
            border-radius: 22px;
            overflow: hidden;
            position: relative;
            background-size: cover;
            background-position: center;
            display: flex;
            align-items: flex-end;
            box-shadow: 0 12px 35px rgba(0, 0, 0, 0.12);
          }

          .ud-banner-overlay {
            position: absolute;
            inset: 0;
            background:
              linear-gradient(
                to top,
                rgba(0, 0, 0, 0.72),
                rgba(0, 0, 0, 0.12)
              );
          }

          .ud-banner-text {
            position: relative;
            z-index: 2;
            padding: 32px;
            width: 100%;
          }

          .ud-banner-label {
            margin: 0 0 8px;
            color: rgba(255, 255, 255, 0.85);
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 1px;
          }

          .ud-banner-disease {
            margin: 0;
            color: #ffffff;
            font-size: 34px;
            font-weight: 700;
          }

          /* Disease information website link */
          .ud-info-link {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            margin-top: 18px;
            padding: 11px 18px;
            background: rgba(255, 255, 255, 0.95);
            color: #245b39;
            border-radius: 50px;
            text-decoration: none;
            font-size: 13px;
            font-weight: 600;
            box-shadow: 0 3px 12px rgba(0, 0, 0, 0.12);
            transition:
              background 0.2s ease,
              color 0.2s ease,
              transform 0.2s ease,
              box-shadow 0.2s ease;
          }

          .ud-info-link:hover {
            background: #2f7047;
            color: #ffffff;
            transform: translateY(-2px);
            box-shadow: 0 6px 18px rgba(0, 0, 0, 0.18);
          }

          .ud-info-link-icon {
            font-size: 15px;
          }

          .ud-info-link-arrow {
            font-size: 16px;
            transition: transform 0.2s ease;
          }

          .ud-info-link:hover .ud-info-link-arrow {
            transform: translate(2px, -2px);
          }

          .ud-section {
            margin-top: 28px;
          }

          .ud-section-title {
            margin: 0 0 18px;
            font-size: 24px;
            color: #244d34;
          }

          .ud-grid {
            display: grid;
            grid-template-columns: repeat(
              auto-fit,
              minmax(250px, 1fr)
            );
            gap: 20px;
          }

          .ud-card {
            background: #ffffff;
            border-radius: 18px;
            overflow: hidden;
            box-shadow: 0 7px 25px rgba(0, 0, 0, 0.07);
            border: 1px solid #e7eee9;
            transition:
              transform 0.2s ease,
              box-shadow 0.2s ease;
          }

          .ud-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 30px rgba(0, 0, 0, 0.11);
          }

          .ud-card-image {
            width: 100%;
            height: 190px;
            object-fit: cover;
            display: block;
          }

          .ud-card-content {
            padding: 20px;
          }

          .ud-card h3 {
            margin: 0 0 14px;
            color: #285d3c;
            font-size: 20px;
          }

          .ud-card ul {
            padding-left: 19px;
            margin: 0;
          }

          .ud-card li {
            margin-bottom: 8px;
            color: #5d6b63;
            font-size: 14px;
            line-height: 1.5;
          }

          .ud-safety {
            margin-top: 16px;
            padding: 11px 12px;
            background: #fff9ed;
            border-left: 4px solid #d69b32;
            border-radius: 8px;
            color: #6e5a35;
            font-size: 13px;
            line-height: 1.5;
          }

          .ud-safety-label {
            font-weight: 700;
            margin-right: 5px;
          }

          .ud-card-disclaimer {
            margin-top: 12px;
            font-size: 11px;
            line-height: 1.5;
            color: #8a948d;
          }

          .ud-empty {
            text-align: center;
            padding: 40px 20px;
            color: #69776f;
          }

          @media (max-width: 700px) {
            .ud-page {
              padding: 25px 14px 50px;
            }

            .ud-title {
              font-size: 28px;
            }

            .ud-search-form {
              flex-direction: column;
            }

            .ud-search-button {
              height: 48px;
            }

            .ud-banner {
              min-height: 250px;
            }

            .ud-banner-text {
              padding: 23px;
            }

            .ud-banner-disease {
              font-size: 27px;
            }

            .ud-info-link {
              font-size: 12px;
              padding: 10px 14px;
            }
          }
        `}
      </style>

      <div className="ud-page">
        <div className="ud-container">

          {/* Header */}
          <div className="ud-header">
            <h1 className="ud-title">
              Nutraceutical Recommendation
            </h1>

            <p className="ud-subtitle">
              Search a health condition to explore available
              herbal and nutraceutical information.
            </p>
          </div>

          {/* Search */}
          <div className="ud-search-box">
            <form
              className="ud-search-form"
              onSubmit={handleSearch}
            >
              <input
                ref={searchRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter disease name, e.g. diabetes"
                className="ud-search-input"
                list="disease-options"
              />

              <datalist id="disease-options">
                {allDiseases.map((disease, index) => (
                  <option
                    key={index}
                    value={disease}
                  />
                ))}
              </datalist>

              <button
                type="submit"
                className="ud-search-button"
                disabled={loading}
              >
                {loading ? "Searching..." : "Search"}
              </button>
            </form>

            {/* Quick disease selection */}
            {allDiseases.length > 0 && (
              <div className="ud-disease-list">
                {allDiseases.map((disease, index) => (
                  <button
                    key={index}
                    type="button"
                    className="ud-disease-button"
                    onClick={() =>
                      handleDiseaseSelect(disease)
                    }
                  >
                    {disease}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Error */}
          {error && (
            <div className="ud-error">
              {error}
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="ud-loading">
              Searching for disease information...
            </div>
          )}

          {/* Results */}
          {result?.results?.length > 0 && (
            <div className="ud-results">

              {result.results.map((group, i) => (
                <div
                  key={i}
                  className="ud-result-group"
                >

                  {/* Disease banner */}
                  <div
                    className="ud-banner"
                    style={{
                      backgroundImage: `url(${group.diseaseImage})`,
                    }}
                  >
                    <div className="ud-banner-overlay" />

                    <div className="ud-banner-text">
                      <p className="ud-banner-label">
                        Showing results for
                      </p>

                      <h2 className="ud-banner-disease">
                        {group.displayName ||
                          group.disease}
                      </h2>

                      {/* COMPLETE DISEASE INFORMATION LINK */}
                      {group.informationLink && (
<Link
  to={`/disease/${encodeURIComponent(group.disease)}`}
  className="ud-info-link"
>
  <span className="ud-info-link-icon">
    📖
  </span>

  View Complete Disease Information

  <span className="ud-info-link-arrow">
    →
  </span>
</Link>
                      )}
                    </div>
                  </div>

                  {/* Herbal recommendations */}
                  <div className="ud-section">
                    <h2 className="ud-section-title">
                      Recommended Herbal Options
                    </h2>

                    {group.suggestions &&
                    group.suggestions.length > 0 ? (
                      <div className="ud-grid">

                        {group.suggestions.map(
                          (item, idx) => (
                            <div
                              key={idx}
                              className="ud-card"
                            >

                              {item.plantImage ? (
                                <img
                                  src={item.plantImage}
                                  alt={item.medicine}
                                  className="ud-card-image"
                                  onError={(e) => {
                                    e.currentTarget.style.display =
                                      "none";
                                  }}
                                />
                              ) : (
                                <div
                                  style={{
                                    height: "190px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent:
                                      "center",
                                    background:
                                      "#eef6f0",
                                    fontSize: "55px",
                                  }}
                                >
                                  🌿
                                </div>
                              )}

                              <div className="ud-card-content">

                                <h3>
                                  {item.medicine}
                                </h3>

                                {item.advicePoints &&
                                  item.advicePoints.length >
                                    0 && (
                                    <ul>
                                      {item.advicePoints.map(
                                        (
                                          point,
                                          pointIndex
                                        ) => (
                                          <li
                                            key={
                                              pointIndex
                                            }
                                          >
                                            {point}
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  )}

                                {item.safetyNotes && (
                                  <div className="ud-safety">
                                    <span className="ud-safety-label">
                                      Safety:
                                    </span>

                                    {item.safetyNotes}
                                  </div>
                                )}

                                {item.disclaimer && (
                                  <div className="ud-card-disclaimer">
                                    {item.disclaimer}
                                  </div>
                                )}

                              </div>
                            </div>
                          )
                        )}

                      </div>
                    ) : (
                      <div className="ud-empty">
                        No herbal recommendations
                        available for this disease.
                      </div>
                    )}
                  </div>

                </div>
              ))}

            </div>
          )}

          {/* No results */}
          {result &&
            (!result.results ||
              result.results.length === 0) &&
            !loading &&
            !error && (
              <div className="ud-empty">
                No disease information found.
              </div>
            )}

        </div>
      </div>
    </>
  );
};

export default UserDashboard;