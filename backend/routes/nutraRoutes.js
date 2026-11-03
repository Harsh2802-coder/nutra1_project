const express = require("express");
const router = express.Router();

const {
  addNutraceutical,
  getRecommendations,
  updateNutra,
  getAllNutras,
  deleteNutra,
  searchByDisease, // ✅ add
  // getNutraData
  getAllDiseases
} = require("../controllers/nutraController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

// ADMIN ROUTES
router.post("/add", protect, adminOnly, addNutraceutical);
router.get("/", protect, adminOnly, getAllNutras);
router.put("/:id", protect, adminOnly, updateNutra);
router.delete("/:id", protect, adminOnly, deleteNutra);

// PUBLIC
router.post("/recommend", getRecommendations);
router.post("/search", searchByDisease); // ✅ NEW
router.get("/diseases", getAllDiseases);
module.exports = router;



