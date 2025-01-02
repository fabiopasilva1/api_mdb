const ConsultaService = require("../services/ConsultaService");

class ConsultaController {
    static async find(req, res) {
        /* 
        #swagger.tags = ['Consulta']
        #swagger.summary = 'Realiza donsulta de dados no banco de dados'
        #swagger.description = 'Retorna valores de quantidades ao consultar'
        #swagger.security = [{
            "apiKeyAuth": []
        }] 
        #swagger.requestBody = {
            required: true,
            description: 'Informa os filtros a serem usados na consulta',
            content: {
                'application/json': {
                    schema: {
                        type: 'array', required: ['campo', 'valor'], properties: { campo: {
                                type: 'string',
                                description: 'Nome do Campo',
                                example: 'uf'
                            },
                            valor: {
                                type: 'string',
                                description: 'Valor do campo',
                                example: 'SP'
                            },
                            regex: {
                                type: 'boolean',
                                description: 'Indica se a consulta deve ser feita com regex',
                                example: true
                            }
                        }
                    }
                }
            }
        }
            #swagger.parameters['table'] = {
            in: 'query',
            type: 'string',
            description: 'Nome da Tabela',
            example: 'target_cred_links2s'
        }
            #swagger.parameters['limit'] = {
            in: 'query',
            type: 'number',
            description: 'Limite de registros', 
            example: 10 
        }
            #swagger.parameters['page'] = {
            in: 'query',
            type: 'number',
            description: 'Pagina atual', 
            example: 1 
        }
            }
        */

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
