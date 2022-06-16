const express = require('express')
const cors = require('cors')
const app = express()
const port = 7000

app.use(cors)


// Importing the required modules
const WebSocketServer = require('ws');


const wss = new WebSocketServer.Server({ port: 8080 })

wss.on("connection", (webSocketClient) => {
  setInterval(() => {
    const array = [];
    const euro_leu = { name: "euro", value:Math.floor(Math.random()*100)+1, change:Math.floor(Math.random()*100)+1 };
    const dolar_leu = {name: "dollar", value:Math.floor(Math.random()*100)+1, change:Math.floor(Math.random()*100)+1};
    const pound_leu = {name: "pound", value:Math.floor(Math.random()*100)+1, change:Math.floor(Math.random()*100)+1 };
    array.push(euro_leu);
    array.push(dolar_leu);
    array.push(pound_leu);
    webSocketClient.send(JSON.stringify(array));
  }, 5000);
});