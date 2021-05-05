abstract class Calculo {
    protected readonly a: number;
    protected readonly b: number;

    constructor(a: number, b: number) {
        this.a = a;
        this.b = b;
    }

    abstract resultado(): number
}

export default Calculo;