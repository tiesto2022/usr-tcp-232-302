const express = require('express');
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;


const bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

let capturarPeso = [];

// Modulo incluido en nodejs
const Net = require('net');

app.post('/weight', async (req, res, next) => {
    req.on('data', (peso) => {
        console.log(`BODY: ${peso}`);
        capturarPeso.push(peso.toString());
    });
    req.on('end', () => {
        console.log('No hay mas data...');
    });
    res.status(200).end();    
});


app.get('/getPeso', async (req, res, next) => {
    if(capturarPeso.length != 0) {
        const peso = capturarPeso;
        capturarPeso = [];
        res.status(200).json({error: false, peso });
    }
    res.status(204).json({error: true, peso: 0 }); 
        
});

app.listen(port,  () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
