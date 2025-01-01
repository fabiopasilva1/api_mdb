const ConsultaService = require("../services/ConsultaService");

class ConsultaController {
    static async find(req, res) {
        const { filtros } = req.body;
        const { table, limit, page } = req.query;
        try {
            const response = await ConsultaService.find(req, res);
            if (response) res.status(200).json(response);
        } catch (error) {
            console.log({ error });
            res.status(500).json({ error });
        }
    }
}

module.exports = { ConsultaController };
