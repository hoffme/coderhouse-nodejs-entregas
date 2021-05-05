import operacion from './operacion';

const operaciones = async (): Promise<void> => {
    const tests = [
        { a: 4, b: 5, metodo: 'suma', res: 9 },
        { a: 5, b: 4, metodo: 'suma', res: 9 },
        { a: 4, b: -5, metodo: 'suma', res: -1 },
        { a: -4, b: 5, metodo: 'suma', res: 1 },
        { a: 4, b: 5, metodo: 'sumas', err: true },
        { a: 4, b: 5, metodo: 'resta', res: -1 },
        { a: 5, b: 4, metodo: 'resta', res: 1 },
        { a: 4, b: -5, metodo: 'resta', res: 9 },
        { a: -4, b: 5, metodo: 'resta', res: -9 },
        { a: 4, b: 5, metodo: 'restas', err: true },
    ]
    
    for await (const [i, { a, b, metodo, res, err }] of tests.entries()) {
        console.log(`TEST ${i}:\n\ta: ${a}\n\tb: ${b}\n\tmetodo: ${metodo}`);

        try {
            const resultado = await operacion(a, b, metodo);
            console.log(`\tresultado: ${resultado}\n\tOK: ${resultado === res}`);
        } catch (e) {
            console.log(`\terror: ${e.message}\n\tOK: ${err === true}`);
        }
    }
}

(() => {
    operaciones();
})()