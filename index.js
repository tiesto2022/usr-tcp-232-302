const express = require('express');
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;


const bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

let peso = 0, capturarPeso = [], error = false;

// Modulo incluido en nodejs
const Net = require('net');

app.post('/weight', (req, res, next) => {
    req.on('data', async (_peso) => {
        //Agrego el peso al array segun el flujo
        console.log(`Peso desde convertidor: ${ _peso }`);
        capturarPeso.push(_peso.toString()); 
    });
                
    req.on('end', () => {
        console.log('No hay mas data...');
    });
    
    req.on('error', () => {
        console.log('Error al recibir datos del convertidor...');
        capturarPeso = [];
        error = false;
    });
    res.status(200).end();    
});


app.get('/getPeso', async (req, res, next) => {
    if(capturarPeso.length !== 0) {  
        error = false;
        // Filtro para obtener solo los valores
        peso = await filtrarvalorPeso(capturarPeso); 
    }
    else {
        error = true;       
    }
    res.status(200).send({error, peso });         
});

app.listen(port,  () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

filtrarvalorPeso = async (valorFiltrar) => { 
    return new Promise((resolve, reject) => {
        const data = capturarPeso.join('').replaceAll(' ', '').split('=');
        const pesoFiltrado = data.filter(elemento => elemento.length == 6);
        resolve(pesoFiltrado[pesoFiltrado.length - 1]);
    });   
   
    
}



