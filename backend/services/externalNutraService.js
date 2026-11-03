// require("dotenv").config();

// const ayurvedaData = require("../data/ayurvedaDatabase.json");

// exports.fetchAyurvedicData = async (disease) => {
//   const key = disease.toLowerCase().trim();

//   if (!ayurvedaData[key]) {
//     return [];
//   }

//   const diseaseData = ayurvedaData[key];

//   const suggestions = diseaseData.herbs.map((herb) => {
//     return {
//       medicine: herb.name,
//       plantImage: herb.plantImage,   // from JSON
//       advicePoints: herb.advicePoints,
//       safetyNotes: herb.safety,
//       disclaimer:
//         "For educational purposes only. Consult Ayurvedic doctor before use."
//     };
//   });

//   return [
//     {
//       disease: key,
//       diseaseImage: diseaseData.diseaseImage,  // from JSON
//       suggestions
//     }
//   ];
// };
require("dotenv").config();

const ayurvedaData = require("../data/ayurvedaDatabase.json");

exports.fetchAyurvedicData = async (disease) => {
  try {
    const key = disease.toLowerCase().trim();

    // Disease does not exist
    if (!ayurvedaData[key]) {
      return [];
    }

    const diseaseData = ayurvedaData[key];

    // Convert herbs into recommendation format
    const suggestions = (diseaseData.herbs || []).map((herb) => {
      return {
        medicine: herb.name,
        plantImage: herb.plantImage || "",
        advicePoints: herb.advicePoints || [],
        safetyNotes: herb.safety || "",
        disclaimer:
          "For educational purposes only. Consult a qualified healthcare professional before using herbal products.",
      };
    });

    return [
      {
        // Disease name
        disease: key,

        // Disease image
        diseaseImage: diseaseData.diseaseImage || "",

        // Website containing complete disease information
        informationLink: diseaseData.informationLink || "",

        // Herbal/nutraceutical suggestions
        suggestions,
      },
    ];
  } catch (error) {
    console.error("Ayurvedic data error:", error);
    return [];
  }
};