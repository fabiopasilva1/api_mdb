const swaggerAutogen = require("swagger-autogen")({
    openapi: "3.0.0",
});

const doc = {
    info: {
        version: "1.0.0",
        title: "MongRest API",
        description: "Rest API for MongoDB",
    },
    servers: [
        {
            url: ["http://localhost:3001", "https://infra.apihostpress.com.br"],
        },
    ],
    tags: [{ name: "Login", name: "Consulta" }],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            },
        },
    },
    schemes: ["http", "https"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./endpoints.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
