const express = require('express')
const app = express()
const port = 9000

app.get('/', (req, res) => {
        res.send('OK');
        console.log('Ingreso');
        
        /*
        try {
        let net = require('net'),
            host = '170.0.10.203',
            port = 20108;

        let socket = new net.Socket();

        // for incoming data
        socket.on('data', (a) => {
            const values = a.toString().split('=');
            console.log(values[1].trim());
            socket.pause();
        });

        socket.on('error', (err) => {
            res.status(400).json({
                error: `Error al conectar con host: ${ host } puerto: ${ port }`,

            });
        });

        socket.connect(port, host);
    }
    catch (e) {
        res.status(400).json({
            error: `Error al conectar de conexion`,

        });
    }
    */
        
     /* nuevo */
        // Include Nodejs' net module.
const Net = require('net');
// The port number and hostname of the server.
const port = 20108;
const host = '170.0.10.203';

// Create a new TCP client.
const client = new Net.Socket();
// Send a connection request to the server.
client.connect({ port: port, host: host }), function() {
    // If there is no error, the server has accepted the request and created a new
    // socket dedicated to us.
    console.log('TCP connection established with the server.');

    // The client can now send data to the server by writing to its socket.
    client.write('Hello, server.');
});

// The client can also receive data from the server by reading from its socket.
client.on('data', function(chunk) {
    console.log(`Data received from the server: ${chunk.toString()}.`);

    // Request an end to the connection after the data has been received.
    client.end();
});

client.on('end', function() {
    console.log('Requested an end to the TCP connection');
});

        
     /* endi nuevo */
        
        
        
        
})

app.listen(port,  () => {
    console.log(`Example app listening at http://localhost:${port}`);
})
