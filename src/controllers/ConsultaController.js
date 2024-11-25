const ConsultaService = require("../services/ConsultaService");

class ConsultaController {
  static async find(req, res) {
    try {
      const response = await ConsultaService.find(req, res);
      if (response) res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: "Erro ao realizar a consulta." });
    }
  }
}

module.exports = { ConsultaController };
