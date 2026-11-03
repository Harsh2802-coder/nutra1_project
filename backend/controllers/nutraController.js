const Nutraceutical = require("../models/Nutraceutical");


// Admin adds nutraceutical
exports.addNutraceutical = async (req, res) => {
  try {
    const nutra = await Nutraceutical.create(req.body);
    res.status(201).json(nutra);
  } catch (error) {
    res.status(500).json({ message: "Failed to add nutraceutical" });
  }
};

// Recommendation logic
exports.getRecommendations = async (req, res) => {
  const { healthGoal, pregnant, chronicDisease } = req.body;

  let recommendations = await Nutraceutical.find({
    healthGoals: healthGoal,
  });

  let safetyWarning = null;

  if (pregnant || chronicDisease) {
    safetyWarning =
      "Please consult a healthcare professional before using supplements.";
  }

  res.json({
    recommendations,
    safetyWarning,
    finalNote: "Consult doctor if condition persists.",
  });
};

exports.updateNutra = async (req, res) => {
  try {
    const updated = await Nutraceutical.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Update failed" });
  }
};

// Get all nutraceuticals (ADMIN)
exports.getAllNutras = async (req, res) => {
  try {
    const nutras = await Nutraceutical.find();
    res.json(nutras);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch nutraceuticals" });
  }
};

// Delete nutraceutical (ADMIN)
exports.deleteNutra = async (req, res) => {
  try {
    await Nutraceutical.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};

const { fetchAyurvedicData } = require("../services/externalNutraService");
// exports.searchByDisease = async (req, res) => {

//   try {
//     const { disease } = req.body;

//     if (!disease || !disease.trim()) {
//       return res.status(400).json({ message: "Disease is required" });
//     }

//     const diseases = disease
//       .split(",")
//       .map((d) => d.trim())
//       .filter(Boolean);

//     const results = [];

//     for (const d of diseases) {
//       const suggestions = await fetchAyurvedicData(d);

//       results.push({
//         disease: d,
//         suggestions,
//         generalAdvice:
//           "Balanced diet, hydration, yoga, and lifestyle correction support Ayurvedic treatment.",
//         safetyNote:
//           "Always consult a certified Ayurvedic doctor before starting medicines.",
//       });
//     }

//     res.json({
//       source: "serpapi_google_search",
//       results,
//       finalNote:
//         "Ayurvedic treatment is individualized. This information is for awareness only.",
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Ayurvedic disease search failed" });
//   }
// };
exports.searchByDisease = async (req, res) => {
  try {
    const { disease } = req.body;

    if (!disease || !disease.trim()) {
      return res.status(400).json({ message: "Disease is required" });
    }

    const diseases = disease
      .split(",")
      .map((d) => d.trim().toLowerCase())
      .filter(Boolean);

    const results = [];

    for (const d of diseases) {
      const data = await fetchAyurvedicData(d);

      if (data.length > 0) {
        results.push(data[0]); // ✅ push correct structure
      }
    }

    res.json({
      source: "local_ayurveda_database",
      results,
      finalNote:
        "Ayurvedic treatment is individualized. This information is for awareness only.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ayurvedic disease search failed" });
  }
};

const ayurvedaData = require("../data/ayurvedaDatabase.json");

// ✅ GET ALL DISEASE NAMES (for autocomplete)
exports.getAllDiseases = (req, res) => {
  try {
    const diseases = Object.keys(ayurvedaData);
    res.json(diseases);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch diseases" });
  }
};