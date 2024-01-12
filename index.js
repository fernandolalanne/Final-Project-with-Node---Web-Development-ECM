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

let estadoJuego = {
    jugador: 1,
    // Otros datos del juego...
  };

const imagenesJugadores = {
    1: '/static/img/x.png',
    2: '/static/img/o.png',
    };

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

// En el servidor
app.post('/cambiarJugador', (req, res) => {
    // Cambiar el jugador en el estado del juego
    const imagenURL = imagenesJugadores[estadoJuego.jugador];
    const estiloBoton = (estadoJuego.jugador === 1) ? 'btn-outline-danger' : 'btn-outline-light';
    const jug = estadoJuego.jugador;
    estadoJuego.jugador = (estadoJuego.jugador === 1) ? 2 : 1; // (condición) ? valorSiCierto : valorSiFalso:
    console.log(`Jugador cambiado a: ${estadoJuego.jugador}`);
    // Enviar el nuevo valor del jugador como respuesta
    // res.send(estadoJuego.jugador.toString());
    res.json({
        jugador_anterior: jug,
        jugador: estadoJuego.jugador,
        imagenURL: imagenURL,
        estiloBoton: estiloBoton,
    });
});

// app.post('/changePlayer', (req, res) => {
//     // Change the player in the game state
//     const imageURL = playerImages[gameState.player];
//     const buttonStyle = (gameState.player === 1) ? 'btn-outline-danger' : 'btn-outline-light';
//     const prevPlayer = gameState.player;
//     gameState.player = (gameState.player === 1) ? 2 : 1; // (condition) ? valueIfTrue : valueIfFalse:
//     console.log(`Player changed to: ${gameState.player}`);
//     // Send the new player value as a response
//     // res.send(gameState.player.toString());
//     res.json({
//         previous_player: prevPlayer,
//         player: gameState.player,
//         imageURL: imageURL,
//         buttonStyle: buttonStyle,
//     });
// });




app.use(function (req, res) {
    console.log("et c'est le 404 : " + req.url);

    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html');

    res.end("<html><head><title>la quatre cent quatre</title></head><body><img  src=\"https://upload.wikimedia.org/wikipedia/commons/b/b4/Peugeot_404_Champs.jpg\" /></body></html>");

})

app.listen(port, hostname);
console.log(`Server running at http://${hostname}:${port}/`);