const express = require('express');
const timeout = require('connect-timeout')
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

app.use(timeout('40s'))

var bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


// Modulo incluido en nodejs
const Net = require('net');

app.get('/', (req, res) => {
    console.log('Ingreso a la raiz');
    try {
        // Numero de puerto y direccion ip del servidor tcp del convertidor
        const port = 20108;
        const host = '170.0.10.200';
        
        //const os = require( 'os' );
        //const networkInterfaces = os.networkInterfaces( );
        //console.log( networkInterfaces );

        // Creo un nuevo cliente TCP
        const client = new Net.Socket();

        // envio una peticion de conexion al servidor

        client.connect({ port: port, host: host }, function() {
            // Si no hay error el servidor acepta la peticion y
            // crea un nuevo socket dedicado para nosotros
            console.log('TCP Conexión establecida con el servidor.' );
        });

        // El cliente puede recibir data del servidor y leer desde el socket
        client.on('data', function(weight) {
            const values = weight.toString().split('=');
            const peso = values[1].trim();

            // Solicito el final de la petición después de recibir los datos
            client.destroy();

            //res.json({ msg: `Data recibida desde el servidor: ${weight.toString()}.` });
            console.log({ peso });
            res.json({ peso });
        });

        client.on('close', function() {
            console.log('Solicito el final de la conexión');
        });


        client.on('error', function(err) {
            console.log(`Error generado: ${err}`);
        });


    }
    catch (e) {
        console.log(`Error al ${ e }`)
    }

});


app.post('/weight', (req, res) => {
    console.log('obteniendo peso...');
   
    req.socket.on('data',function(d){
     console.log('Pesando....');
     const values = d.toString().split('=');
     const peso = values[1].trim();
     console.log({ peso } );            
     res.end();
    });   
    
});


app.listen(port,  () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
