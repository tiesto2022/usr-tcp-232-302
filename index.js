const express = require('express');
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

// Modulo incluido en nodejs
const Net = require('net');

app.get('/', (req, res) => {
    res.json({ message: 'OK' });
    try {
        // Numero de puerto y direccion ip del servidor tcp del convertidor
        const port = 20108;
        const host = '170.0.10.200';

        // Creo un nuevo cliente TCP
        const client = new Net.Socket();

        // envio una peticion de conexion al servidor

        client.connect({ port: port, host: host }, function() {
            // Si no hay error el servidor acepta la peticion y
            // crea un nuevo socket dedicado para nosotros
            res.json({ msg: 'TCP Conexión establecida con el servidor.' });

            // El cliente puede recibir data del servidor y leer desde el socket
            client.on('data', function(weight) {
                res.json({ msg: `Data recibida desde el servidor: ${weight.toString()}.` });

                // Solicito el final de la petición después de recibir los datos
                client.end();
            });

            client.on('end', function() {
                res.json({ msg: 'Solicito el final de la conexión'});
            });
        });
        
        
            client.on('error', function(err) {
                client.close();
                res.json({ msg: `Error: ${err}`});
            });


    }
    catch (e) {
        res.json({ msg: `Error al ${ e }` });
    }

});

app.listen(port,  () => {
    console.log(`Example app listening at http://localhost:${port}`);
});


