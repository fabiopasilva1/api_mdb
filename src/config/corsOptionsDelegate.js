const mongrest = require("./middlewares");
const cors = mongrest.find((mid) => mid.name === "mongrest::cors");

var allowlist = [...cors.origins];
var allowMehods = [...cors.methods];
var allowUseAgenge = [...cors.useAgent];

const corsOptionsDelegate = function (req, callback) {
    if (!cors.enable) return callback(null, { origin: false });
    try {
        const origin = req.header("Origin");
        const userAgent = req.header("User-Agent");
        const methods = req.method;

        if (
            (origin === undefined &&
                allowUseAgenge.includes(userAgent.split("/")[0])) ||
            allowUseAgenge.includes("*")
        ) {
            if (allowMehods.includes(methods) || allowMehods.includes("*")) {
                if (allowlist.includes(origin) || allowlist.includes("*")) {
                    return callback(null, {
                        origin: true,
                        methods: cors.methods,
                    });
                } else {
                    return callback(new Error("Origin not allowed by CORS"), {
                        origin: false,
                    });
                }
            } else {
                return callback(new Error("Method not allowed by CORS"), {
                    origin: false,
                });
            }
        } else {
            return callback(new Error("User-Agent not allowed by CORS"), {
                origin: false,
            });
        }
    } catch (error) {
        console.error("Error in CORS options delegate:", error);
        return callback(new Error("Internal server error"), { origin: false });
    }
};

module.exports = corsOptionsDelegate;
