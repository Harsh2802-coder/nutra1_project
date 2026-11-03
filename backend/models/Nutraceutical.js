const mongoose = require("mongoose");

const nutraceuticalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    purpose: {
      type: String,
      required: true,
    },

    healthGoals: [
      {
        type: String, // immunity, digestion, energy, etc.
      },
    ],
        // ✅ ADD THIS
    diseases: [
      {
        type: String, // diabetes, bp, thyroid
      },
    ],


    generalDose: {
      type: String, // RDA-based range (NOT prescription)
    },

    bestTime: {
      type: String, // morning, after food, etc.
    },

    safetyNotes: {
      type: String,
    },

    disclaimer: {
      type: String,
      default: "This is not a prescription.",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Nutraceutical", nutraceuticalSchema);
