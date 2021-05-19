import Archivo from "./archivo.js";

const datos = [
    {
        title: 'Escuadra',
        price: 123.45,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'
    },
    {
        title: 'Calculadora',
        price: 234.56,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png'
    },
    {
        title: 'Globo Terráqueo',
        price: 345.67,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png'
    }
]


const archivo = new Archivo('productos.txt');

(async () => {
    console.log('Leyendo archivo no creado: ', await archivo.leer())

    await archivo.guardar(datos[0])
    console.log('Guardando elemento');

    console.log('Leyendo archivo con 1 elemento agregado: ', await archivo.leer())

    await archivo.borrar()
    console.log('Archivo borrado');

    console.log('Leyendo archivo borrado', await archivo.leer())

    await archivo.guardar(datos[1])
    console.log('Guardando elemento');
    await archivo.guardar(datos[2])
    console.log('Guardando elemento');

    console.log('Leyendo archivo con 2 elementos agregados', await archivo.leer())

    await archivo.guardar(datos[0])
    console.log('Guardando elemento');

    console.log('Leyendo archivo con 3 elementos agregado', await archivo.leer())

    await archivo.borrar()
    console.log('Archivo borrado');
})()