process.on('message', count => {
    const randoms = [];
    for (let i = 0; i < parseInt(count); i++) randoms.push(Math.random());
    process.send(randoms);
})