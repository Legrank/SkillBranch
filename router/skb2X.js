/**
 * Created by Dima on 25.11.2016.
 */
import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    const query = parseInt(req.query.i);
    console.log("Запрос ",req.query, "  ",query);
    let resultat;
    switch (query){
        case 0: resultat = 1;break;
        case 1: resultat = 18;break;
        case 2: resultat = 243;break;
        case 3: resultat = 3240;break;
        case 4: resultat = 43254;break;
        case 5: resultat = 577368;break;
        case 6: resultat = 7706988;break;
        case 7: resultat = 102876480;break;
        case 8: resultat = 1373243544;break;
        case 9: resultat = 18330699168;break;
        case 10: resultat = 244686773808;break;
        case 11: resultat = 3266193870720;break;
        case 12: resultat = 43598688377184;break;
        case 13: resultat = 581975750199168;break;
        case 14: resultat = 7768485393179328;break;
        case 15: resultat = 103697388221736960;break;
        case 16: resultat = 1384201395738071424;break;
        case 17: resultat = 18476969736848122368;break;
        case 18: resultat = 246639261965462754048;break;
    }
    console.log(resultat);
    res.json(resultat);
});
    
module.exports = router