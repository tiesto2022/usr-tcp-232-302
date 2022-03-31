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
    res.on('data', (chunk) => {
          console.log(`BODY: ${chunk}`);
        });
        res.on('end', () => {
          console.log('No more data in response.');
        });
    res.status(200).end();
    /*   
   
    req.socket.on('data',function(d){
     const values = d.toString().split('=');
     const peso = values[1].trim();
     console.log('Pesando....', peso);
     //console.log({ peso } );            
     //res.end();
    });   */
    
});

app.listen(port,  () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
