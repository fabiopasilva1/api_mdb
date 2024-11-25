const express = require("express");
const DB = require("./src/config/database");

const V1 = require("./src/routes/v1/indexRoute");
const app = express();

app.use(express.json());

app.use("/", V1);
app.get("/lista/:page?/:limit?", async (req, res) => {
    const query = req.query;
    const params = req.params;

    console.log({ query });
    try {
        const db = await DB.connect(
            "target_credlinks",
            {
                ...query,
            },
            { ...params }
        );

        res.status(200).json(db);
    } catch (erro) {
        res.json(500).json(erro);
    }
});
// Rota para consulta dinâmica com campos específicos para regex

// app.post("/consulta", ConsultaRoute);

process.on("uncaughtException", function (err) {
    console.log("Caught exception: " + err);
});
process.on("SyntaxError", function (err) {
    console.log("Caught exception: " + err);
});
app.listen(3000, () => {
    console.log("Example app listening on port 3000!");
});
