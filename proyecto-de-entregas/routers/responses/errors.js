export default (res, message, status = 400) => {
    const data = { error: message };

    res.status(status).json(data);
}