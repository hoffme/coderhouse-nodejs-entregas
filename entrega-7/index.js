import express from 'express';

import Archivo from "./archivo.js";

const PORT = 8080;

const app = express();

const productos = new Archivo('./productos.txt');
const visitas = { items: 0, item: 0 };

const randomInt = (min, max) => Math.round((Math.random() * (max - min)) + min);

app.get('/items', async (req, res) => {
    visitas.items++;

    const items = await productos.leer();

    res.json({ items, cantidad: items.length })
})

app.get('/item-random', async (req, res) => {
    visitas.item++;

    const items = await productos.leer();
    const indice = randomInt(0, items.length);

    res.json({ item: items[indice] })
})

app.get('/visitas', (req, res) => {
    res.json(visitas)
})

const server = app.listen(PORT, () => {
    console.log(`inicializado en http://localhost:${PORT}`);
})

server.on('error', err => console.error(`Error en servidor: ${err}`));