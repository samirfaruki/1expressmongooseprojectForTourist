var express = require("express");
const userController = require("../controllers/tourcontroller");
var router = express.Router();

// router
//   .route("/top-5-cheap")
//   .get(userController.aliasTopTours, userController.getAllTours);
router.get("/getall", userController.getAllTours);
router.post("/create", userController.createPost);

router.delete("/blogs/:id", userController.delete);
router.patch("/blogs/:id", userController.patch);
router.get("/blogs/:id", userController.getOne);
router.get("/average", userController.Average);
router.get("/monthlyPlan/:year", userController.monthlyplan);

module.exports = router;
