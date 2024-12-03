const express = require("express");

const V1 = require("./src/routes/v1/indexRoute");
const app = express();
const port = process.env.API_PORT || 3000;
app.use(express.json());

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
