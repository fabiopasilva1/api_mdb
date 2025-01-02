const V1 = require("./src/routes/v1/indexRoute");

module.exports = function (app) {
    app.use("/", V1);
};
