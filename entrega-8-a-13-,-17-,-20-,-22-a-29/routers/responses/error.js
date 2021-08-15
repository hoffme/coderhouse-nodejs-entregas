export default (error, req, res, next) => {
    if (error) {
        const data = { error: error.message };
        res.status(400).json(data);
    }

    next();
}