export default class Ellenorzes {
    private _idő: Date;
    private _rendszam: string;

    public constructor(sor: string) {
        const m: string[] = sor.split(" ");
        const óra = parseInt(m[0]);
        const perc = parseInt(m[1]);
        const masodperc = parseInt(m[2]);
        this._idő = new Date(0, 0, 0, óra, perc, masodperc, 0);
        this._rendszam = m[3];
    }
    public get ido(): Date {
        return this._idő;
    }
    public get rendszam(): string {
        return this._rendszam;
    }
}