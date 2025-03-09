const express = require("express");
const brandRouter = express.Router();
const brandController = require("../controller/brandController");
const checkRole = require("../middlewares/checkRole");
brandRouter.route("/")
  .get(brandController.getAllBrands)

brandRouter.route("/add")
  .post(checkRole(true), brandController.addBrand)

brandRouter.route("/:brandId")
  .delete(checkRole(true), brandController.deleteBrand)
  .put(checkRole(true), brandController.updateBrand)

module.exports = brandRouter;
