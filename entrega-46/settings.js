import dotenv from 'dotenv';
import minimist from 'minimist';

dotenv.config();

const args = minimist(process.argv.slice(2), {
    alias: {
        p: 'port'
    },
    default: {
        port: 8080
    }
})

const PORT = args.port;

const STORAGE_METHOD = process.env.STORAGE_METHOD || (MODE === "production" ? "mongo" : "memory");

export {
    PORT,
    STORAGE_METHOD
}