export default (ctx, obj = {}) => {
    const data = { result: obj };

    ctx.status = 200
    ctx.body = data;
}