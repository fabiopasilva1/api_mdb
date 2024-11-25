const { connect } = require("../config/mongoconnection");
class ConsultaService {
    constructor() {
        this.projection = {
            nome: 1,
            cpf: 1,
            email: 1,
            logradouro: 1,
            numero: 1,
            complemento: 1,
            bairro: 1,
            cidade: 1,
            uf: 1,
            cep: 1,
            cbo: 1,
            tel_fixo1: 1,
            tel_fixo2: 1,
            tel_fixo3: 1,
            celular1: 1,
            celular2: 1,
            celular3: 1,
            dt_nascimento: 1,
            renda_presumida: 1,
        };
    }
    async find(req, res) {
        const { db, client } = await connect();
        try {
            const { filtros } = req.body;
            const { table, limit, page } = req.query;
            const _limit = parseInt(limit ?? 10);
            const skip = parseInt(page ?? 1) * _limit;

            // Validação básica
            if (!filtros || !Array.isArray(filtros) || filtros.length === 0) {
                return res.status(400).json({
                    error: "Os filtros são obrigatórios e devem ser uma lista com pelo menos um item.",
                });
            }

            // Construção do filtro dinâmico
            let query = {};
            for (let filtro of filtros) {
                const { campo, valor, regex } = filtro;

                if (!campo || typeof valor === "undefined") {
                    return res.status(400).json({
                        error: 'Cada filtro deve conter os campos "campo", "valor" e opcionalmente "regex".',
                    });
                }

                if (regex) {
                    // Usa regex para buscas parciais
                    query[campo] = {
                        $regex: `/^${valor}/`, // $regex: valor,
                        $options: "i",
                    };
                } else {
                    // Busca exata
                    query[campo] = valor;
                }
            }
            console.log({ query });
            // Consulta ao banco
            const collection = db.collection(table); // Nome da coleção
            const keys = Object.keys(query);
            const _index = keys.map((k) => ({ [k]: 1 }));

            collection
                .createIndex(_index)
                .then((r) => {
                    console.log({
                        r,
                        DOCUMENT: "ConsultaService",
                        message: "Index created",
                        _index,
                    });
                })
                .catch((e) => {
                    console.log({
                        code: e.code,
                        codeName: e.codeName,
                        DOCUMENT: "ConsultaService",
                        message: "Index already exists",
                        _index,
                    });
                });
            const result = await collection
                .aggregate([{ $match: query }, { $count: "total" }])
                .toArray();
            const total = result[0]?.total || 0;
            const cursor = collection.find(query, {
                _id: 0,
                projection: { ...this.projection },
            });

            cursor.skip(skip);
            cursor.limit(_limit);

            const results = await cursor.toArray();
            client.close(true);
            //   console.log(client.);
            console.log({ query });
            res.status(200).json({
                total: total,
                page: page ?? 1,
                pageSize: limit,
                data: results,
            });
        } catch (error) {
            client.close(true);

            res.status(500).json({ error: "Erro ao realizar a consulta." });
        }
    }
}

module.exports = new ConsultaService();
