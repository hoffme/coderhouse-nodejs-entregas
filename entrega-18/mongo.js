// use prueba;

db.createCollection('items');

db.items.insert([
    { nombre: 'Fideos', categoria: 'Harina', stock: 20 },
    { nombre: 'Leche', categoria: 'Lacteos', stock: 30 },
    { nombre: 'Crema', categoria: 'Lacteos', stock: 15 },
])

db.items.find()

// show dbs;
// show collections