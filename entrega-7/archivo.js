import fs from 'fs';

class Archivo {
    constructor(ruta) {
        this.ruta = ruta;
    }

    async leer() {
        try {
            const datos = await fs.promises.readFile(this.ruta)
            return JSON.parse(datos.toString());
        } catch (e) {
            return []
        }
    }

    async guardar(objecto) {
        const objetos = await this.leer();

        objecto.id = objetos.length + 1;

        const nuevosObjetos = [ ...objetos, objecto ];

        try {
            return await fs.promises.writeFile(this.ruta, JSON.stringify(nuevosObjetos));
        } catch (e) {
            throw new Error(`no se pudo guardar el objeto, error: ${e.message}`)
        }
    }

    async borrar() {
        try {
            return await fs.promises.rm(this.ruta);
        } catch (e) {
            throw new Error(`no se pudo borrar el archivo, error: ${e.message}`)
        }
    }
}

export default Archivo;