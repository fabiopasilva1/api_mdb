const configCompression = {
    level: 6,
    threshold: 1024 * 10,
    filter: (req, res, next) => {
        console.log({
            headers_compression_no: req.headers["x-no-compression"],
        });
        if (req.headers["x-no-compression"]) {
            return next && next();
        }
        return compression.filter(req, res);
    },
};
module.exports = { configCompression };
