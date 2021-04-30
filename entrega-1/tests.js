const nombre = 'Elon';
const apellido = 'Musk';
const libros = [
    { nombre: 'El señor de las moscas', autor: 'William Golding' },
    { nombre: 'Fundacion',              autor: 'Isacc Asimov'    }
];
const mascotas = ['perro', 'gato'];

const usuario = new Usuario(nombre, apellido, libros, mascotas);

let expected = null;
let obtained = null;

//------------------------------------------------------

console.log('test-01-getFullName');

expected = `${nombre} ${apellido}`;
obtained = usuario.getFullName();

console.log(expected, obtained, expected === obtained);

//------------------------------------------------------

console.log('test-02-getMascotas');

expected = 2;
obtained = usuario.getMascotas();

console.log(expected, obtained, expected === obtained);

//------------------------------------------------------

console.log('test-03-getBooks');

expected = libros.map(libro => libro.nombre);
obtained = usuario.getBooks();

console.log(expected, obtained, obtained.includes(expected[0]) && obtained.includes(expected[1]));

//------------------------------------------------------

console.log('test-04-addMascota');

usuario.addMascota('doge');

expected = 3;
obtained = usuario.getMascotas();

console.log(expected, obtained, expected === obtained);

//------------------------------------------------------

console.log('test-05-addBook');

usuario.addBook('Harry Potter', 'J. K. Rowling')

expected = [...libros.map(libro => libro.nombre), 'Harry Potter'];
obtained = usuario.getBooks();

console.log(expected, obtained, 
    obtained.includes(expected[0]) && 
    obtained.includes(expected[1]) &&
    obtained.includes(expected[2])
);