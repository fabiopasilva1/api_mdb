const express = require("express");
const cors = require("cors");
const compression = require("compression");
const V1 = require("./src/routes/v1/indexRoute");
const corsOptionsDelegate = require("./src/config/corsOptionsDelegate");
const app = express();
const port = process.env.API_PORT || 3000;
app.use(express.json());
app.use((req, res, next) => {
    cors(corsOptionsDelegate)(req, res, (err) => {
        if (err) {
            return res.status(403).json({
                error: "CORS error",
                message: "A origem da requisição não está autorizada.",
            });
        }
        next();
    });
});
compression({
    level: 6,
    threshold: 1024 * 10,
    filter: (req, res, next) => {
        console.log(req.headers["x-no-compression"]);
        if (req.headers["x-no-compression"]) {
            return next && next();
        }
        return compression.filter(req, res);
    },
});
app.use("/", V1);

process.on("uncaughtException", function (err) {
    console.log("Caught exception: " + err);
});
process.on("SyntaxError", function (err) {
    console.log("Caught exception: " + err);
});
app.listen(port, () => {
    console.log("Example app listening on port " + port + "!");
});
