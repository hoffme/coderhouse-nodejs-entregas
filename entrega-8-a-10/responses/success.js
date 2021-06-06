export default (res, obj = {}) => {
    const data = { result: obj };

    res.status(200).json(data);
}