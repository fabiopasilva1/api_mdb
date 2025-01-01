const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });

const doc = {
    info: {
        version: "1.0.0",
        title: "MongRest API",
        description: "Rest API for MongoDB",
    },
    servers: [
        {
            url: "http://localhost:3001",
        },
    ],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./endpoints.js"];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require("./server"); // Your project's root file
});
