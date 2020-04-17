import fs from "fs";
import Ellenorzes from "./Ellenorzes";
import { resolve } from 'dns';
export default class Megoldas {
    private _ellenorzesek: Ellenorzes[] = [];

    constructor(forrás: string) {
        fs.readFileSync(forrás)
            .toString()
            .split("\n")
            .forEach(i => {
                const aktSor = i.trim();
                if (aktSor.length > 0) this._ellenorzesek.push(new Ellenorzes(aktSor));
            });
    }

    public get ledolgozottOra(): number {
        const elsoOra = this._ellenorzesek[0].ido.getHours();
        const utolsoOra = this._ellenorzesek[this._ellenorzesek.length - 1].ido.getHours() + 1;
        return utolsoOra - elsoOra;
    }

    public get elsoEllenorzott(): Array<string> {
        const ki: string[] = [];
        let ora = this._ellenorzesek[0].ido.getHours(); //azért let mert változik az értéke
        for (const i of this._ellenorzesek) {
            if (ora === i.ido.getHours()) {
                ki.push(i.ido.getHours() + " óra: " + i.rendszam);
                ora += 1;
            }
        }
        return ki;
    }
    public get jarmuTipusok(): string {
        let autobusz = 0;
        let kamion = 0;
        let motor = 0;
        for (const i of this._ellenorzesek) {
            if (i.rendszam[0] === 'B') {
                autobusz++;
            }
            else if (i.rendszam[0] === 'K') {
                kamion++;
            }
            else if (i.rendszam[0] === 'M') {
                motor++;
            }
        }

        return "Autóbusz: " + autobusz + "\nKamion: " + kamion + "\nMotor: " + motor;
    }

    public get leghosszabbIdoszak(): string {
        let max = 0;
        let ideiglenes: number;
        let idopont: string = "";

        for (let i = 0; i < this._ellenorzesek.length; i++) {
            if (i < this._ellenorzesek.length - 1) {
                ideiglenes = this._ellenorzesek[i + 1].ido.getTime() - this._ellenorzesek[i].ido.getTime();
                if (max < ideiglenes) {
                    max = ideiglenes;
                    idopont = this._ellenorzesek[i].ido.getHours() + " : " + this._ellenorzesek[i].ido.getMinutes() + " : " +
                        this._ellenorzesek[i].ido.getSeconds() + " - " + this._ellenorzesek[i + 1].ido.getHours() + " : " +
                        this._ellenorzesek[i + 1].ido.getSeconds() + " : " + this._ellenorzesek[i + 1].ido.getMinutes();
                    ;
                }
            }
        }
        return idopont;
    }

    public rendszamKereses(keresett: string): Array<string> {
        let egyezesek: number = 0;
        let csillagok: number = 0;
        let rendszamok: string[] = [];
        for (const item of this._ellenorzesek) {
            for (let i = 0; i < 7; i++) {
                if (keresett[i] != '*' && keresett[i] === item.rendszam[i]) {
                    egyezesek++;
                }
                if (keresett[i] === '*') {
                    csillagok++;

                }
            }
            if (egyezesek === (keresett.length - csillagok)) {
                rendszamok.push(item.rendszam);

            }
            egyezesek = 0;
            csillagok = 0;
        }
        return rendszamok;

    }
    
}
