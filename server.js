const express = require("express");

const V1 = require("./src/routes/v1/indexRoute");
const app = express();

app.use(express.json());

app.use("/", V1);

process.on("uncaughtException", function (err) {
    console.log("Caught exception: " + err);
});
process.on("SyntaxError", function (err) {
    console.log("Caught exception: " + err);
});
app.listen(3000, () => {
    console.log("Example app listening on port 3000!");
});
