

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
      .get("https://nutra1-project-2.onrender.com/api/nutra/diseases")
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
        "https://nutra1-project-2.onrender.com/api/nutra/search",
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