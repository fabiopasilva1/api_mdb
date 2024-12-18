var allowlist = ["https://uneel.com.br", "http://uneel.localhost"];
const corsOptionsDelegate = function (req, callback) {
    const origin = req.header("Origin");
    console.log(origin);

    if (allowlist.indexOf(origin) !== -1) {
        // Permitir a origem
        callback(null, { origin: true });
    } else {
        // Rejeitar a origem
        callback(new Error("Not allowed by CORS"), { origin: false });
    }
};

module.exports = corsOptionsDelegate;
