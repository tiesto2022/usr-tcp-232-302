const express = require('express')
const app = express()
const port = 9000

app.get('/', (req, res) => {
        res.send('OK');
        console.log('Ingreso');
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
})

app.listen(port,  () => {
    console.log(`Example app listening at http://localhost:${port}`);
})
