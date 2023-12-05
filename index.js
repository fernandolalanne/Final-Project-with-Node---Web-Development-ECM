import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';


const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const hostname = '127.0.0.1';
const port = 3000;

app.use("/static", express.static(path.join(__dirname, '/static')))
app.use(express.json()); // Agregado
app.use(express.urlencoded({ extended: true })); // Agregado

app.get('/', (req, res) => {
    res.redirect(301, '/static/index.html')
})


app.post('/cellClick', (req, res) => {
    const cellNumber = req.body.cell;
    // Realiza acciones según el clic en la celda (actualizar el estado del juego, etc.)
    console.log(`Celda clickeada: ${cellNumber}`);
    res.send('Celda clickeada recibida en el servidor.');
    // res.json(result);
});


app.use(function (req, res) {
    console.log("et c'est le 404 : " + req.url);

    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html');

    res.end("<html><head><title>la quatre cent quatre</title></head><body><img  src=\"https://upload.wikimedia.org/wikipedia/commons/b/b4/Peugeot_404_Champs.jpg\" /></body></html>");

})

app.listen(port, hostname);
console.log(`Server running at http://${hostname}:${port}/`);
