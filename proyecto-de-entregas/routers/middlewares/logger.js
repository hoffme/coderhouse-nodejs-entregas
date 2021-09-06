import Log from '../../logger/main.js';

const ExpressLogger = (req, res, next) => {
    if (res.headersSent) {
        Log.info({ methods: req.method, url: req.url, status: res.statusCode });
    } else {
        res.on('finish', () => {
            Log.info({ methods: req.method, url: req.url, status: res.statusCode });
        })
    }
    
    next();
};

export default ExpressLogger;