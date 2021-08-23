import Logger from './logger.js';

class Log {
    
    static consoleLogger = new Logger();
    static warnLogger = new Logger('file', { path: './logs/warn.log' });
    static errorLogger = new Logger('file', { path: './logs/error.log' });

    static info(message) {
        Log.consoleLogger.info(message);
    }

    static warn(message) {
        Log.consoleLogger.warn(message);
        Log.warnLogger.warn(message);
    }

    static error(message) {
        Log.consoleLogger.error(message);
        Log.errorLogger.error(message);
    }

}

export default Log;