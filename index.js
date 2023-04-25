const http = require('http');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');
var cors = require('cors');

const itemsRouter = require('./routes/items');

var app = express();
app.use(express.json());

app.use('/items', itemsRouter);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use('/', (req, res) => {
    res.send('Hi this a GET Response from NODE');
});


const server = http.createServer(app);
const port = 3000;
server.listen(port, () => {
    console.log('Example app listening on port 3000!');

});
/*
var server = app.listen(3000, () => {
});*/