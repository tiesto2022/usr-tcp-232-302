const express = require('express');
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;


const bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

let capturarPeso = [], error = false;

// Modulo incluido en nodejs
const Net = require('net');

app.post('/weight', async (req, res, next) => {
    req.on('data', (peso) => {
        console.log(`Peso recibido desde convertidor: ${peso}`);
        capturarPeso.push(peso.toString()); 
    });
    req.on('end', () => {
        console.log('No hay mas data...');
    });
    
    req.on('error', () => {
        console.log('Error al recibir datos del convertidor...');
        capturarPeso = [];
    });
    res.status(200).end();    
});


app.get('/getPeso', async (req, res, next) => {
    let peso = 0;
    if(capturarPeso.length == 0) {
        error = true;
    }
    else {
        peso = await filtrarvalorPeso(capturarPeso);
        error = false;
    }
    capturarPeso = [];
    res.status(200).send({error, peso }); 
        
});

app.listen(port,  () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

filtrarvalorPeso = async (peso) => { 
    return new Promise((resolve, reject) => {
        // Apertura del puerto       
        const values = peso.toString().split('=');
        const pesoFiltrado = values[1].trim(); 
        resolve(pesoFiltrado);
    });
}



