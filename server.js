// server.js
const express = require('express');
const app = express();
const port = 3000; // A porta para o servidor de coleta
const cors = require('cors'); 

// Configuração do CORS: Permite requisições do seu servidor estático (porta 8080)
// e de qualquer outro localhost para flexibilidade.
app.use(cors({
    origin: ['http://localhost:8080', 'http://127.0.0.1:8080'], // Especifique as origens permitidas
    methods: ['GET'], 
    allowedHeaders: ['Content-Type'],
}));

// Um array simples em memória para "armazenar" os eventos
const collectedEvents = [];

// Rota para o seu "pixel"
app.get('/collect', (req, res) => {
    const eventData = req.query; 

    // Adiciona a hora do recebimento no servidor
    eventData.serverTimestamp = new Date().toISOString();

    collectedEvents.push(eventData);

    console.log('--- Evento Recebido ---');
    console.log(eventData);
    console.log('-----------------------');

    // Responde com uma imagem de 1x1 pixel transparente
    res.set('Content-Type', 'image/gif');
    const transparentGif = Buffer.from('R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==', 'base64');
    res.status(200).send(transparentGif);
});

// Rota para ver os eventos coletados (para depuração)
app.get('/events', (req, res) => {
    res.json(collectedEvents);
});

// Inicia o servidor de coleta
app.listen(port, () => {
    console.log(`Servidor de coleta rodando em http://localhost:${port}`);
    console.log(`Endpoint de coleta: http://localhost:${port}/collect`);
    console.log(`Endpoint de eventos (debug): http://localhost:${port}/events`);
    console.log('\nAguardando eventos do seu pixel...');
});