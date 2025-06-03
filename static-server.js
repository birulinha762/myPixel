// static-server.js
const express = require('express');
const app = express();
const path = require('path');
const staticPort = 8080; // A porta para o servidor estático

// Serve os arquivos estáticos da pasta 'client'
app.use(express.static(path.join(__dirname, 'client'))); 

app.listen(staticPort, () => {
    console.log(`Servidor estático rodando em http://localhost:${staticPort}`);
    console.log(`Abra http://localhost:${staticPort}/index.html no seu navegador para testar.`);
});