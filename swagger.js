const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes/items.js'];

const doc = {
    info: {
        version: "1.0.0",
        title: "My NodeJS API",
        description: "NodeJS Express REST API, Documentation Autogerated by Swagger"
    },
    host: "localhost:3000",
    basePath: "/",
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json']
};
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./index.js');
});