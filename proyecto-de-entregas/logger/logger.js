import pino from 'pino';

class Logger {
    constructor(type, options) {
        switch (type) {
            case 'file':
                this.logger = pino(options?.path || './logs/log.txt');
                break;
            default:
                this.logger = pino();
                break;
        }
    }

    info(message) { this.logger.info(message) }

    warn(message) { this.logger.warn(message) }

    error(message) { this.logger.error(message) }
}

export default Logger;