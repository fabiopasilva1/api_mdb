require("dotenv").config();
const { MongoClient } = require("mongodb");

class DB {
    static async connect(collection, query, { page, limit = 10 } = {}) {
        const client = new MongoClient(process.env.MONGODB_URI);

        try {
            const database = client.db(process.env.MONGODB_DB);

            const _collection = database.collection(collection);

            const _limit = parseInt(limit);
            const skip = parseInt(page) * _limit;
            const projection = {
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
            const keys = Object.keys(query);
            const _index = keys.map((k) => ({ [k]: 1 }));

            _collection.createIndex(_index);

            //   _collection.createIndex({ ...projection });
            // Use projection to limit returned fields
            const cursor = _collection.find(query, {
                _id: 0,
                projection: { ...projection },
            });
            cursor.skip(skip);
            cursor.limit(_limit);

            const results = await cursor.toArray();

            // Use estimatedDocumentCount for a faster, approximate count
            const total = await _collection.count(query);
            await client.close();
            return {
                count: total,
                results,
            };
        } catch (error) {
            console.log(error);
            await client.close();
        } finally {
            await client.close();
        }
    }
}
module.exports = DB;
