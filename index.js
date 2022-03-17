const express = require('express');
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
        res.send('OK');
        console.log('Ingreso');            
});

app.listen(port,  () => {
    console.log(`Example app listening at http://localhost:${port}`);
});


