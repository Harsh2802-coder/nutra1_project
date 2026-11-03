import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const PROXY_BASE = "https://nutra1-project-2.onrender.com/api/proxy";

const isSafeUrl = (url) => {
  try {
    const u = new URL(url);
    return u.protocol === "https:" || u.protocol === "http:";
  } catch {
    return false;
  }
};

const SourceViewer = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const url = params.get("url") || "";
  const title = params.get("title") || "Medical Source";

  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [checked, setChecked] = useState(false); // proxy reachability confirmed

  const proxySrc = `${PROXY_BASE}?url=${encodeURIComponent(url)}`;

  useEffect(() => {
    if (!url || !isSafeUrl(url)) return;

    setLoading(true);
    setFailed(false);
    setChecked(false);

    // Ask the proxy for the page first. If it 4xx/5xxs, axios throws
    // and we show a real error instead of a blank/broken iframe.
    axios
      .get(proxySrc, { timeout: 12000 })
      .then(() => setChecked(true))
      .catch((err) => {
        console.error("Proxy check failed:", err.message);
        setFailed(true);
        setLoading(false);
      });
  }, [url, proxySrc]);

  return (
    <>
      <style>{`
        .sv-page {
          min-height: 100vh;
          background: #f7faf8;
          font-family: Arial, Helvetica, sans-serif;
          display: flex;
          flex-direction: column;
        }
        .sv-topbar {
          background: #1f5135;
          padding: 16px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }
        .sv-back {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.25);
          color: #fff;
          font-size: 13.5px;
          font-weight: 600;
          padding: 9px 16px;
          border-radius: 10px;
          cursor: pointer;
        }
        .sv-back:hover { background: rgba(255,255,255,0.18); }
        .sv-titlebox { flex: 1; min-width: 200px; color: #fff; }
        .sv-eyebrow {
          font-size: 11px;
          letter-spacing: 1px;
          text-transform: uppercase;
          opacity: 0.75;
          margin: 0 0 2px;
        }
        .sv-title { font-size: 18px; font-weight: 700; margin: 0; }
        .sv-source { font-size: 12px; opacity: 0.65; word-break: break-all; margin: 2px 0 0; }
        .sv-frame-area { flex: 1; position: relative; background: #fff; }
        .sv-iframe { width: 100%; height: 100%; min-height: 75vh; border: none; display: block; }
        .sv-loading {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
          flex-direction: column; gap: 10px;
          color: #5f7065; font-size: 14px; background: #fff;
        }
        .sv-spinner {
          width: 28px; height: 28px;
          border: 3px solid #e5eee8;
          border-top-color: #2f7047;
          border-radius: 50%;
          animation: sv-spin 0.8s linear infinite;
        }
        @keyframes sv-spin { to { transform: rotate(360deg); } }
        .sv-fallback {
          max-width: 480px; margin: 60px auto; background: #fff;
          border: 1px solid #e5eee8; border-radius: 18px;
          padding: 36px 32px; text-align: center;
          box-shadow: 0 8px 30px rgba(0,0,0,0.08);
        }
        .sv-fallback-icon { font-size: 32px; margin-bottom: 12px; }
        .sv-fallback-title { font-size: 19px; font-weight: 700; color: #1f5135; margin-bottom: 8px; }
        .sv-fallback-text { font-size: 14px; color: #5f7065; line-height: 1.6; margin-bottom: 22px; }
        .sv-fallback-btn {
          display: inline-block; background: #2f7047; color: #fff;
          font-size: 14px; font-weight: 600; padding: 11px 26px;
          border-radius: 10px; text-decoration: none; border: none; cursor: pointer;
        }
        .sv-fallback-btn:hover { background: #245b39; }
        .sv-hint { font-size: 11px; color: #9aa79f; margin-top: 14px; }
      `}</style>

      <div className="sv-page">
        <div className="sv-topbar">
          <button className="sv-back" onClick={() => navigate(-1)}>
            ← Back
          </button>
          <div className="sv-titlebox">
            <p className="sv-eyebrow">Reference · viewed within Nutracare</p>
            <p className="sv-title">{title}</p>
            <p className="sv-source">{url}</p>
          </div>
        </div>

        <div className="sv-frame-area">
          {!url || !isSafeUrl(url) ? (
            <div className="sv-fallback">
              <div className="sv-fallback-icon">⚠️</div>
              <p className="sv-fallback-title">No source link provided</p>
              <p className="sv-fallback-text">
                We couldn't find a valid link to display.
              </p>
              <button className="sv-fallback-btn" onClick={() => navigate(-1)}>
                Go back
              </button>
            </div>
          ) : failed ? (
            <div className="sv-fallback">
              <div className="sv-fallback-icon">⚠️</div>
              <p className="sv-fallback-title">Couldn't load this source</p>
              <p className="sv-fallback-text">
                We weren't able to fetch {title} right now. You can still
                open it directly in a new tab instead.
              </p>
              <a
                className="sv-fallback-btn"
                href={url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open source in a new tab ↗
              </a>
            </div>
          ) : (
            <>
              {loading && (
                <div className="sv-loading">
                  <div className="sv-spinner" />
                  Loading source content…
                </div>
              )}
              {checked && (
                <iframe
                  key={url}
                  src={proxySrc}
                  title={title}
                  className="sv-iframe"
                  onLoad={() => setLoading(false)}
                  referrerPolicy="no-referrer"
                />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SourceViewer;