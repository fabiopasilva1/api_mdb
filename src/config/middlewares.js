const env = require("./env");

module.exports = [
    // --- Enable CORS
    {
        name: "mongrest::cors",
        enable: true,
        methods: ["POST", "GET"],
        origins: env("MONGREST_CORS_ORIGINS", "*").split(","),
        useAgent: ["postman", "curl", "insomnia", "node-fetch", "*"],
    },
    // ---
    //--- Enable Compression
    {
        name: "mongrest::compression",
        enable: true,
        level: 6,
        threshold: 1024 * 10,
    },

    //---
];
