const express = require("express");
const perfumeController = require("../controller/perfumeController");
const checkRole = require("../middlewares/checkRole");
const perfumeRouter = express.Router();

perfumeRouter.route("/")
  .get(perfumeController.getPerfume)
  .post(checkRole(true), perfumeController.addPerfume)
  
perfumeRouter.route("/:id")
  .get(perfumeController.getPerfumeDetail)
  .delete(checkRole(true), perfumeController.deletePerfume)
  .put(checkRole(true), perfumeController.updatePerfume)

perfumeRouter.route("/:id/comment")
  .post(perfumeController.addComment)
  .delete(perfumeController.deleteComment)



module.exports = perfumeRouter;
