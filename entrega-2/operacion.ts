import Calculo from './calculo';

interface Modulos { [key: string]: string }

const modulos: Modulos = {
    suma: './suma.js',
    resta: './resta.js',
}

const operacion = async (a: number, b: number, operacion: string): Promise<number> => {
    if (!(operacion in modulos)) throw new Error('operacion invalida')

    const module = await import(modulos[operacion]);
    
    const calculo: Calculo = new (module.default)(a, b);

    return calculo.resultado();
}

export default operacion;