export default (ctx, message, status = 400) => {
    const data = { error: message };

    ctx.response.status = status;
    ctx.body = data;
}