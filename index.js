const express = require('express');
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;


const bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const capturarPeso = [];

// Modulo incluido en nodejs
const Net = require('net');

app.post('/weight', async (req, res, next) => {
    req.on('data', (peso) => {
        console.log(`BODY: ${peso}`);
        capturarPeso.push(peso);
    });
    req.on('end', () => {
        console.log('No hay mas data...');
    });
    res.status(200).end();    
});

app.listen(port,  () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
