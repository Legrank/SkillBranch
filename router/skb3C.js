/**
 * Created by Dima on 25.11.2016.
 */
import express from 'express';
import fetch from  'isomorphic-fetch';
import mongoose from 'mongoose';
import promise from 'bluebird';

import pokemonJson from './pokemon';
import Pokemon from './model/pokemon';

const router = express.Router();
mongoose.Promise = promise;
mongoose.connect('mongodb://legrank:1qaz@ds159737.mlab.com:59737/pokemon');

function pokemonUpdate (id, limit) {
    const pokemon1 = new Pokemon({
        height: pokemonJson[id].height,
        weight: pokemonJson[id].weight,
        name: pokemonJson[id].name,
    });
    pokemon1.save()
        .then(() => {
            console.log('Update ',id);
            if (id < limit) {
                pokemonUpdate(id + 1, limit);
            }
        }).catch(() => {
            console.log('Err');
    });
}

async function pokemonFind(req) {
    const limit = req.query.limit ? +req.query.limit : 20;
    const offset = req.query.offset ? +req.query.offset : 0;
    const pokemon = await Pokemon.find().limit(limit).skip(offset).sort({ name: 1 });
    return pokemon;
}

//pokemonUpdate(21,pokemonJson.length);

router.get("/", async(req, res) => {
    res.send(await pokemonFind(req));
});

router.get("/light", async(req, res) => {
    const limit = req.query.limit ? +req.query.limit : 20;
    const offset = req.query.offset ? +req.query.offset : 0;
    const pokemon = await Pokemon.find().limit(limit).skip(offset).sort({ weight: 1, name: 1 });
    res.send(pokemon);
});

router.get("/huge", async(req, res) => {
    const limit = req.query.limit ? +req.query.limit : 20;
    const offset = req.query.offset ? +req.query.offset : 0;
    const pokemon = await Pokemon.find().limit(limit).skip(offset).sort({ height: -1, name: 1  });
    res.json(pokemon);
});

router.get("/micro", async(req, res) => {
    const limit = req.query.limit ? +req.query.limit : 20;
    const offset = req.query.offset ? +req.query.offset : 0;
    const pokemon = await Pokemon.find().limit(limit).skip(offset).sort({  height: 1, name: 1 });
    res.send(pokemon);
});

router.get("/fat", async(req, res) => {
    const limit = req.query.limit ? +req.query.limit : 20;
    const offset = req.query.offset ? +req.query.offset : 0;
    const pokemon = await Pokemon.find().limit(limit).skip(offset).sort({ angular : -1, name: 1 });
    res.send(pokemon);
});

router.get("/angular", async(req, res) => {
    const limit = req.query.limit ? +req.query.limit : 20;
    const offset = req.query.offset ? +req.query.offset : 0;
    const pokemon = await Pokemon.find().limit(limit).skip(offset).sort({ angular : 1, name: 1 });
    res.send(pokemon);
});

router.get("/heavy", async(req, res) => {
    const limit = req.query.limit ? +req.query.limit : 20;
    const offset = req.query.offset ? +req.query.offset : 0;
    const pokemon = await Pokemon.find().limit(limit).skip(offset).sort({ weight: -1, name: 1 });
    res.send(pokemon);
});

router.get("/update", (req, res) => {
    const petsUrl = 'http://pokeapi.co/api/v2/pokemon/1/';
    fetch(petsUrl)
        .then(async (res) => {
            await res.json();
        })
        .catch(err => {
            console.log('Чтото пошло не так:', err);
            res.send("Ошибка");
        });
});

module.exports = router