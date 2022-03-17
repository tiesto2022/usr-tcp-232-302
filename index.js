const express = require('express');
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

// Modulo incluido en nodejs
const Net = require('net');

app.get('/', (req, res) => {
    console.log('Ingreso a la raiz');
    try {
    const options = {
        host: '170.0.10.200',
        port: 20108,
        timeout: 2000
    }
    const client = net.createConnection(options);

    client.on('connect', () => {
        console.log('conexion exitosa de la bascula...');
    });

    client.on('data', (a) => {
        const values = a.toString().split('=');
        const peso = values[1].trim();
        client.pause();
        client.destroy();
        res.status(200).json({ peso, error: false });
    });

    client.on('timeout', (err) => {
        client.destroy();
        res.status(400).json({
            msg: `Tiempo de espera agotado, Verifique que el convertidor no este apagado o la bascula no este ni apagada ni desconectada.`,
            error: true
        });
    });

    client.on('error', (err) => {
        client.destroy();
        res.status(400).json({
            msg: `Convertidor apagado, error al conectar con host: ${ options.host } puerto: ${ options.port }`,
            error: true
        });
    });

}
catch (e) {
    res.status(400).json({
        msg: 'Error al pesar, verifique conexion entre bascula y convertidor',
        error: true,

    });
}

});

app.listen(port,  () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
