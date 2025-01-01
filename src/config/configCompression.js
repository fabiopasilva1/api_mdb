const compression = require("compression");
const mongrest = require("./middlewares");
const compressionMiddleware = mongrest.find(
    (mid) => mid.name === "mongrest::compression"
);

const configCompression = {
    level: compressionMiddleware?.level ?? 6,
    threshold: compressionMiddleware?.threshold ?? 1024 * 10,
    filter: (req, res, next) => {
        if (!compressionMiddleware.enable) return next && next();
        if (req.headers["x-no-compression"]) {
            return next && next();
        }

        return compression.filter(req, res);
    },
};

module.exports = { configCompression };
