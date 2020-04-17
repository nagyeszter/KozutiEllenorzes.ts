
import Ellenorzes from '../Ellenorzes';

describe("Ellenorzes osztály unit tesztek:", () => {
    const instance: Ellenorzes = new Ellenorzes("08 46 51 FD-2717");

    it("Ellenorzes osztálypéldány ellenőrzése", async () => {
        expect(instance).toBeInstanceOf(Ellenorzes);
    });
    it("Ellenorzes időpontja", async () => {
        expect(instance.ido.getHours() + " " + instance.ido.getMinutes() + " " + instance.ido.getSeconds()).toBe("8 46 51");
    });
    
    it("Rendszam", async () => {
        expect(instance.rendszam).toBe("FD-2717");
    });
});