const express = require("express");
const {
  ConsultaController,
} = require("../../../controllers/ConsultaController");
const router = express.Router();

router.post("/", ConsultaController.find);

module.exports = router;
