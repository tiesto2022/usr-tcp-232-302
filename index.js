const express = require('express');
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;


const bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Modulo incluido en nodejs
const Net = require('net');

app.post('/weight', async (req, res, next) => {
    console.log("OK");
    console.time("Peticion")
    req.on('data', (peso) => {
          console.log({ peso });
        });
        req.on('end', () => {
          console.log('No hay más data en la respuesta.');
        });
    console.timeEnd();
    res.status(200).end();    
});

app.listen(port,  () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
