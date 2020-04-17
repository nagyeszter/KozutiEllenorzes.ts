import fs from "fs";
import Megoldas from "../Megoldas";
import Ellenorzes from "../Ellenorzes";

describe("Megoldás osztály unit tesztek", () => {
    const instance: Megoldas = new Megoldas("jarmu.txt");

    it("Megoldás osztálypéldány ellenőrzése", async () => {
        expect(instance).toBeInstanceOf(Megoldas);
    });

    it("Ellenőrzés", async () => {
        expect(instance.ledolgozottOra).toBe(6);
    });
    it("Ellenőrzés", async () => {
        const napielso: string[] = ["8 óra: FD-2717", "9 óra: GK-3407", "10 óra: RQ-8890", "11 óra: IN-5066", "12 óra: GC-0459", "13 óra: CH-1893"];
        for (let i = 0; i < napielso.length; i++) {
            expect(instance.elsoEllenorzott[i]).toBe(napielso[i]);
        }

    });

    it("Ellenőrzés", async () => {
        expect(instance.jarmuTipusok).toBe("Autóbusz: 10 Kamion: 12 Motor: 15");

    });
    it("Ellenőrzés", async () => {
        expect(instance.leghosszabbIdoszak).toBe("8 : 57 : 48 - 9 : 6 : 1");

    });

    it("Ellenőrzés", async () => {
        expect(instance.rendszamKereses("F*-*7*7")).toBe("FD-2717");

    });
});