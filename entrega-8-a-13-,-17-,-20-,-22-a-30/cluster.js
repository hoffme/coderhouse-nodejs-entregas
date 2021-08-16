import cluster from 'cluster';
import os from 'os';

import app from './app.js';

if (cluster.isPrimary) {
    const count_cpu = os.cpus().length;

    console.log(`Master ${process.pid} is running`);

    for (let i = 0; i < count_cpu; i++) cluster.fork();

    cluster.on('disconnect', (worker, code, singal) => {
        console.log(`worker ${worker.process.pid} died with code ${code}`);
    })
} else {
    console.log(`Worker ${process.pid} is running`);
    
    app();
}