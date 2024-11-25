require("dotenv").config();
const { MongoClient } = require("mongodb");

const url = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

// Conex o com o MongoDB
let db;
async function connect() {
    try {
        const client = await MongoClient.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // compressors: "zlib",
            // zlibCompressionLevel: -1,
            connectTimeoutMS: 1000 * 60 * 50, //50min,
            serverSelectionTimeoutMS: 1000 * 60 * 50,
            maxPoolSize: 50, //recomendado ,
            maxConnecting: 25,
            retryReads: true,
        });

        console.log("Conectado ao MongoDB");
        db = client.db(dbName);

        return { db, client };
    } catch (err) {
        console.error("Erro ao conectar ao MongoDB:", err);
        throw err;
    }
}

module.exports = { connect };
