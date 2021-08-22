import Log from '../../logger/main.js';

export default (error, req, res, next) => {
    if (error) {
        Log.error(error);
    
        const data = { error: error.message };
        res.status(400).json(data);
    }

    next();
}