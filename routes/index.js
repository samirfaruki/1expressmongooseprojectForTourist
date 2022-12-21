var express = require("express");
const tourController = require("../controllers/tourcontroller");
const authController = require("../controllers/authcontroller");
var router = express.Router();

// router
//   .route("/top-5-cheap")
//   .get(tourController.aliasTopTours, tourController.getAllTours);
router.get("/getall", tourController.getAllTours);
router.post("/create", tourController.createPost);

router.delete("/blogs/:id", tourController.delete);
router.patch("/blogs/:id", tourController.patch);
router.get("/blogs/:id", tourController.getOne);
router.get("/average", tourController.Average);
router.get("/monthlyPlan/:year", tourController.monthlyplan);

// user routes started from here
router.post("/signUp", authController.signupUser);
router.get("/getallUsers", authController.getAllUsers);

module.exports = router;
