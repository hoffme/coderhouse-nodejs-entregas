import { fork } from 'child_process';
import { Router } from 'express';
import path from 'path';

const __dirname = path.resolve(path.dirname(''));

const router = Router();

router.get('/', (req, res, next) => {
    const count = req.query.count || 100000000;

    const randomsController = fork(__dirname + '/workers/random.js');

    randomsController.send(count);

    randomsController.on('message', randoms => {res.json(randoms) })
})

export default router;