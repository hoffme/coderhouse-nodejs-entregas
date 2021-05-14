const http = require('http');

const floatRandom = (min, max) => (Math.random() * (max - min)) + min;

const enteroRandom = (min, max) => Math.round(floatRandom(min, max))

const server = http.createServer((req, res) => {
  const data = {
    id: enteroRandom(1, 11),
    title: `producto ${enteroRandom(1, 11)}`,
    price: floatRandom(0.00, 9999.99).toFixed(2),
    thumbnail: `Foto ${enteroRandom(1, 11)}`
  }
  
  res.end(JSON.stringify(data))
})

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
  console.log(`Listening on :${PORT}`)
})