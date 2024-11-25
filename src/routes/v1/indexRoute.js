const express = require("express");
const router = express.Router();
const ConsultaRoute = require("./consulta/ConsultaRoute");

router.use("/consulta", ConsultaRoute);

module.exports = router;
