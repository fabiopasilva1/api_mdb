require("dotenv").config();
const env = require("./env");
const { MongoClient } = require("mongodb");

const url = env("MONGODB_URI", "mongodb://localhost:27017");
const dbName = env("MONGODB_DB", "");

const client = new MongoClient(url);
// Conex o com o MongoDB
let db;
async function connect() {
    try {
        await client.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            compressors: ["snappy", "zlib"],
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
