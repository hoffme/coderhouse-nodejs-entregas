// use ecommerce;

db.createCollection('mensajes')
db.createCollection('productos')

db.productos.insert([
    {
        _id: 1,
        nombre: "Mermelada",
        categoria: 3,
        stock: 0,
        precio: 2600
    },
    {
        _id: 2,
        nombre: "Azucar",
        categoria: 2,
        stock: 3,
        precio: 512
    },
    {
        _id: 3,
        nombre: "Dulce de Leche",
        categoria: 4,
        stock: 5,
        precio: 1285
    },
    {
        _id: 4,
        nombre: "Harina",
        categoria: 4,
        stock: 10,
        precio: 3500
    },
    {
        _id: 5,
        nombre: "Leche",
        categoria: 3,
        stock: 0,
        precio: 4300
    }
])

db.mensajes.insert([
    {
        _id: 1,
        email: "a@d.com",
        mensaje: "Hola"
    },
    {
        _id: 2,
        email: "b@d.com",
        mensaje: "Hola !!!"
    },
    {
        _id: 3,
        email: "c@d.com",
        mensaje: "Todo Bien?"
    },
    {
        _id: 4,
        email: "d@d.com",
        mensaje: "Bien"
    },
    {
        _id: 5,
        email: "a@d.com",
        mensaje: "Chau"
    }
])

db.productos.find()
db.mensajes.find()

db.productos.count()
db.mensajes.count()

db.productos.insert({
    _id: 1,
    nombre: "Choclo",
    categoria: 6,
    stock: 0,
    precio: 1300
})

db.productos.find({precio: {$lt: 1000}}, {nombre:1})
db.productos.find({precio: {$gt: 1000, lt: 3000}}, {nombre:1})
db.productos.find({precio: {$gt: 3000}}, {nombre:1})
db.productos.find({}, {nombre:1}).sort({precio:1}).limit(1).skip(2)

db.productos.updateMany({}, {$set:{stock:100}})

db.productos.updateMany({precio:{$gt:4000}}, {$set:{stock:0}})

db.productos.deleteMany({precio:{$lt:1000}})

db.createUser({user:"pepe",pwd:"asd456",roles:[{role: "read", db: "ecommerce"}]})

// use ecommerce

db.productos.insertOne({_id:6, nombre: "anchoas"})