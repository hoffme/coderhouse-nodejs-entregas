import Express, { json, urlencoded } from 'express';
import DB from './db';

const app = Express();

app.use(json());
app.use(urlencoded({ extended: true }));

const db = new DB();

app.get('/', (req, res) => {
    const result = db.getAll();
    res.status(200).json({ result });
})

app.get('/:id', (req, res) => {
    const id = req.params.id;
    const result = db.get(id);
    res.status(200).json({ result })
})

app.post('/:id', (req, res) => {
    const id = req.params.id;
    const value = req.body;

    db.set(id, value);

    res.status(200).json({ result: 'ok' })
})

app.delete('/:id', (req, res) => {
    const id = req.params.id;
    db.remove(id);
    
    res.status(200).json({ result: 'ok' })
})

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})

server.on('error', err => {
    console.error('error de servidor: ', err);
})