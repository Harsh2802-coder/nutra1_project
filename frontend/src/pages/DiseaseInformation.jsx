import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
// import { useParams, useNavigate, Link } from "react-router-dom";

const DiseaseInformation = () => {
  const { disease } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDisease = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.post(
          "http://localhost:5001/api/nutra/search",
          {
            disease: disease,
          }
        );

        if (
          !response.data?.results ||
          response.data.results.length === 0
        ) {
          setError("Disease information not found.");
          return;
        }

        setData(response.data.results[0]);
      } catch (err) {
        console.error("Disease information error:", err);

        setError(
          err.response?.data?.message ||
            "Failed to load disease information."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDisease();
  }, [disease]);

  if (loading) {
    return (
      <div className="di-page">
        <div className="di-loading">
          Loading disease information...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="di-page">
        <div className="di-error">
          <h2>{error}</h2>

          <button
            className="di-back-button"
            onClick={() => navigate("/user")}
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>
        {`
          * {
            box-sizing: border-box;
          }

          .di-page {
            min-height: 100vh;
            background: #f7faf8;
            padding: 35px 20px 70px;
            font-family: Arial, Helvetica, sans-serif;
            color: #24332b;
          }

          .di-container {
            max-width: 1100px;
            margin: 0 auto;
          }

          .di-back-button {
            border: none;
            background: #2f7047;
            color: white;
            padding: 11px 18px;
            border-radius: 10px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 22px;
          }

          .di-back-button:hover {
            background: #245b39;
          }

          .di-hero {
            min-height: 330px;
            border-radius: 22px;
            overflow: hidden;
            position: relative;
            background-size: cover;
            background-position: center;
            display: flex;
            align-items: flex-end;
            box-shadow: 0 12px 35px rgba(0, 0, 0, 0.12);
          }

          .di-overlay {
            position: absolute;
            inset: 0;
            background:
              linear-gradient(
                to top,
                rgba(0, 0, 0, 0.75),
                rgba(0, 0, 0, 0.1)
              );
          }

          .di-hero-content {
            position: relative;
            z-index: 2;
            padding: 35px;
            color: white;
          }

          .di-label {
            margin: 0 0 8px;
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 1px;
            opacity: 0.85;
          }

          .di-title {
            margin: 0;
            font-size: 40px;
            font-weight: 700;
          }

          .di-content {
            margin-top: 30px;
          }

          .di-card {
            background: white;
            border: 1px solid #e5eee8;
            border-radius: 18px;
            padding: 25px;
            margin-bottom: 22px;
            box-shadow: 0 7px 25px rgba(0, 0, 0, 0.06);
          }

          .di-card h2 {
            margin: 0 0 16px;
            color: #285d3c;
            font-size: 24px;
          }

          .di-card p {
            color: #5d6b63;
            line-height: 1.7;
            font-size: 15px;
          }

          .di-list {
            margin: 0;
            padding-left: 22px;
          }

          .di-list li {
            margin-bottom: 10px;
            color: #5d6b63;
            line-height: 1.6;
          }

          .di-herbs {
            display: grid;
            grid-template-columns:
              repeat(auto-fit, minmax(240px, 1fr));
            gap: 18px;
          }

          .di-herb {
            border: 1px solid #e4ece7;
            border-radius: 15px;
            overflow: hidden;
            background: #fff;
          }

          .di-herb-image {
            width: 100%;
            height: 170px;
            object-fit: cover;
            display: block;
          }

          .di-herb-content {
            padding: 17px;
          }

          .di-herb-content h3 {
            margin: 0 0 10px;
            color: #285d3c;
            font-size: 19px;
          }

          .di-herb-content ul {
            padding-left: 18px;
            margin: 0;
          }

          .di-herb-content li {
            margin-bottom: 7px;
            color: #65736b;
            font-size: 14px;
            line-height: 1.5;
          }

          .di-safety {
            margin-top: 14px;
            padding: 12px;
            background: #fff9ed;
            border-left: 4px solid #d69b32;
            border-radius: 8px;
            color: #6e5a35;
            font-size: 13px;
            line-height: 1.5;
          }

          .di-source {
            background: #eef7f1;
            border: 1px solid #d8e8dc;
          }

          .di-source a {
            display: inline-flex;
            align-items: center;
            gap: 7px;
            margin-top: 8px;
            padding: 10px 16px;
            background: #2f7047;
            color: white;
            border-radius: 9px;
            text-decoration: none;
            font-size: 14px;
            font-weight: 600;
          }

          .di-source a:hover {
            background: #245b39;
          }

          .di-disclaimer {
            margin-top: 25px;
            padding: 16px;
            background: #fff9ed;
            border-radius: 12px;
            color: #6e5a35;
            font-size: 13px;
            line-height: 1.6;
          }

          .di-loading,
          .di-error {
            max-width: 800px;
            margin: 100px auto;
            text-align: center;
            padding: 35px;
            background: white;
            border-radius: 18px;
            box-shadow: 0 8px 30px rgba(0,0,0,0.08);
          }

          .di-error h2 {
            color: #a23b3b;
            margin-bottom: 20px;
          }

          @media (max-width: 700px) {
            .di-page {
              padding: 25px 14px 50px;
            }

            .di-title {
              font-size: 30px;
            }

            .di-hero {
              min-height: 270px;
            }

            .di-hero-content {
              padding: 24px;
            }

            .di-card {
              padding: 20px;
            }
          }
        `}
      </style>

      <div className="di-page">
        <div className="di-container">

          {/* Back */}
          <button
            className="di-back-button"
            onClick={() => navigate("/user")}
          >
            ← Back to Dashboard
          </button>

          {/* Hero */}
          <div
            className="di-hero"
            style={{
              backgroundImage: `url(${data.diseaseImage || ""})`,
            }}
          >
            <div className="di-overlay" />

            <div className="di-hero-content">
              <p className="di-label">
                Disease Information
              </p>

              <h1 className="di-title">
                {data.displayName || data.disease}
              </h1>
            </div>
          </div>

          <div className="di-content">

            {/* Overview */}
            {data.overview && (
              <div className="di-card">
                <h2>Overview</h2>
                <p>{data.overview}</p>
              </div>
            )}

            {/* Symptoms */}
            {data.symptoms &&
              data.symptoms.length > 0 && (
                <div className="di-card">
                  <h2>Symptoms</h2>

                  <ul className="di-list">
                    {data.symptoms.map(
                      (symptom, index) => (
                        <li key={index}>
                          {symptom}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}

            {/* Causes */}
            {data.causesAndRiskFactors &&
              data.causesAndRiskFactors.length > 0 && (
                <div className="di-card">
                  <h2>
                    Causes & Risk Factors
                  </h2>

                  <ul className="di-list">
                    {data.causesAndRiskFactors.map(
                      (cause, index) => (
                        <li key={index}>
                          {cause}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}

            {/* Prevention */}
            {data.preventionAndLifestyle &&
              data.preventionAndLifestyle.length > 0 && (
                <div className="di-card">
                  <h2>
                    Prevention & Lifestyle
                  </h2>

                  <ul className="di-list">
                    {data.preventionAndLifestyle.map(
                      (item, index) => (
                        <li key={index}>
                          {item}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}

            {/* When to seek help */}
            {data.whenToSeekMedicalHelp && (
              <div className="di-card">
                <h2>
                  When to Seek Medical Help
                </h2>

                <p>
                  {data.whenToSeekMedicalHelp}
                </p>
              </div>
            )}

            {/* Herbal options */}
            {data.suggestions &&
              data.suggestions.length > 0 && (
                <div className="di-card">
                  <h2>
                    Herbal & Nutraceutical Options
                  </h2>

                  <div className="di-herbs">
                    {data.suggestions.map(
                      (herb, index) => (
                        <div
                          className="di-herb"
                          key={index}
                        >
                          {herb.plantImage && (
                            <img
                              src={herb.plantImage}
                              alt={herb.medicine}
                              className="di-herb-image"
                              onError={(e) => {
                                e.currentTarget.style.display =
                                  "none";
                              }}
                            />
                          )}

                          <div className="di-herb-content">
                            <h3>
                              {herb.medicine}
                            </h3>

                            {herb.advicePoints &&
                              herb.advicePoints.length >
                                0 && (
                                <ul>
                                  {herb.advicePoints.map(
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

                            {herb.safetyNotes && (
                              <div className="di-safety">
                                <strong>
                                  Safety:
                                </strong>{" "}
                                {herb.safetyNotes}
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

            {/* Original source */}
            {data.informationLink && (
              <div className="di-card di-source">
                <h2>
                  Medical Information Source
                </h2>

                <p>
                  This page is part of your
                  nutraceutical recommendation
                  application. The following source
                  contains additional medical
                  information.
                </p>

<Link
  to={`/source-viewer?url=${encodeURIComponent(
    data.informationLink
  )}&title=${encodeURIComponent(data.displayName || data.disease)}`}
>
  📖 View Original Medical Source
</Link>
              </div>
            )}

            {/* Disclaimer */}
            <div className="di-disclaimer">
              <strong>Important:</strong>{" "}
              This information is provided for
              educational and awareness purposes only.
              It does not diagnose, treat, cure, or
              prescribe any disease. Consult a qualified
              healthcare professional before using
              herbal or nutraceutical products.
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default DiseaseInformation;