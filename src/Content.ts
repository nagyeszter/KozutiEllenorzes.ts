import fs from "fs";
import http from "http";
import url from "url";
import Megoldas from "./Megoldas";

export default class Content {
    public content(req: http.IncomingMessage, res: http.ServerResponse): void {
        // favicon.ico kérés kiszolgálása:
        if (req.url === "/favicon.ico") {
            res.writeHead(200, { "Content-Type": "image/x-icon" });
            fs.createReadStream("favicon.ico").pipe(res);
            return;
        }
        // Weboldal inicializálása + head rész:
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write("<!DOCTYPE html>");
        res.write("<html lang='hu'>");
        res.write("<head>");
        res.write("<style>input, pre {font-family:monospace; font-size:1em; font-weight:bold;}</style>");
        res.write("<meta name='viewport' content='width=device-width, initial-scale=1.0'>");



        res.write("<title>KozutiEllenorzes.ts/title>");
        res.write("</head>");
        res.write("<body><form><pre class='m-3'>");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const params = url.parse(req.url as string, true).query;

        // Kezd a kódolást innen -->
        //1.feladat: Olvassa be a jarmu.txt állományban talált adatokat, s annak felhasználásával oldja meg a következő feladatokat! 
        res.write("1.feladat:\n");
        const megold: Megoldas = new Megoldas("jarmu.txt");

        //2.feladat:Határozza meg, hogy aznap legalább hány óra hosszat dolgoztak az ellenőrzést végzők, ha munkaidejük egész órakor kezdődik, és pontosan egész órakor végződik! (Minden óra 0 perc 0 másodperckor kezdődik, és 59 perc 59 másodperccel végződik.) Az eredményt jelenítse meg a képernyőn! 
        res.write("2.feladat: \n");
        res.write(`${megold.ledolgozottOra}\n`);

        //3.feladat: Műszaki ellenőrzésre minden órában egy járművet választanak ki. Azt, amelyik abban az órában először halad arra. Az ellenőrzés óráját és az ellenőrzött jármű rendszámát jelenítse meg a képernyőn a következő formában: 9 óra: AB-1234! Minden óra adata külön sorba kerüljön! Csak azon órák adatai jelenjenek meg, amikor volt ellenőrizhető jármű! 
        res.write("3.feladat:\n");
        for (const i of megold.elsoEllenorzott) {
            res.write(`${i}\n`);
        }

        //4.feladat: A rendszám első karaktere külön jelentéssel bír. Az egyes betűk közül a „B” autóbuszt, a „K” kamiont, az „M” motort jelöl, a többi rendszámhoz személygépkocsi tartozik. Jelenítse meg a képernyőn, hogy az egyes kategóriákból hány jármű haladt el az ellenőrző pont előtt! 
        res.write("4.feladat:\n");
        res.write(`${megold.jarmuTipusok}\n`);

        //5.feladat: Mettől meddig tartott a leghosszabb forgalommentes időszak? A választ jelenítse meg a képernyőn a következő formában: 9:9:13 - 9:15:3! 
        res.write("5.feladat:");
        res.write(`${megold.leghosszabbIdoszak}\n`)
        //6.feladat: A rendőrök egy baleset közelében látott járművet keresnek rendszám alapján. A szemtanúk csak a rendszám bizonyos karaktereire emlékeztek, így a rendszám ismeretlen karaktereit a * karakterrel helyettesítve keresik a nyilvántartásban. Kérjen be a felhasználótól egy ilyen rendszámot, majd jelenítse meg a képernyőn az arra illeszthető rendszámokat! 
        let rendszam: string = (params.rendszam as string);

        res.write(`Kérek egy rendszámot: <input type='text' name='rendszam' value=${rendszam} style='max-width:100px;' onChange='this.form.submit();'>\n`);
        res.write("6.feladat:");
        if (rendszam.length === 7) {
            for (const i of megold.rendszamKereses(rendszam)) {
                res.write(`${i}\n`);
            }
        }
        //7.feladat: Egy közúti ellenőrzés pontosan 5 percig tart. Amíg az ellenőrzés folyik, a járművek szabadon elhaladhatnak, a következő megállítására csak az ellenőrzés befejezése után kerül sor. Ha a rendőrök a legelső járművet ellenőrizték, akkor mely járműveket tudták ellenőrizni a szolgálat végéig? Írja az ellenőrzött járművek áthaladási idejét és rendszámát a vizsgalt.txt állományba az áthaladás sorrendjében, a bemenettel egyező formában!Ügyeljen arra, hogy az időadatokhoz tartozó számok a bevezető nullákat tartalmazzák! 
        res.write("7.feladat:");












        // Próbáljuk számra konvertálni a "kor" paraméter (http://localhost:8080/?kor=16) értékét:

        // Ha nincs "kor" paraméter megadva, vagy nem lehet számra konvertálni értékét,
        // akkor a "korod" változóba NaN érték kerül, ilyenkor legyen 18 év az értéke:



        // <---- Fejezd be a kódolást

        res.write("</pre></form>");


        // MDB core JavaScript:
        res.write("<script type='text/javascript' src='https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.15.0/js/mdb.min.js'></script>");

        res.write("</body></html>");
        res.end();
    }
}
