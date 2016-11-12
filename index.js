import express from 'express';
import cors from 'cors';
import fetch from  'isomorphic-fetch';

const app = express();
app.use(cors());
app.get('/2B', (req, res) => {
function fullname(){
        const query = req.query.fullname;
        if (!query || /[\d_/]/.test(query)) {
            return "Invalid fullname";
        }
        const myRe = /\S+/g;
        const nameArray = query.match(myRe);
        if ((nameArray == null) || (nameArray.length>3)) {
            return "Invalid fullname";
        }
        let fullname = nameArray.pop();
        fullname = fullname[0].toUpperCase()+fullname.slice(1).toLowerCase();
        for (let i = 0; i < nameArray.length; i++) {
            fullname += ` ${nameArray[i][0].toUpperCase()}.`;
        }
        return fullname;
    }
    res.send(fullname());
});

app.get('/2C', (req, res) => {
    function fullname(){
        const query = req.query.username ? req.query.username : '';
        const myRe = /^(?:https?\:)?\@*(?:(?:\/\/)?.*?\/)?\@*(.*?)(?:(?:\?|\/).*)?$/;
        const nameArray = query.match(myRe);
        if (nameArray == null) {
            return "Invalid username";
        }
        const username = `@${nameArray[1]}`;
        return username;
    }
    res.send(fullname());
});

app.get('/2A', (req, res) => {
    const sum = (+req.query.a || 0) + (+req.query.b || 0);
    res.send(sum.toString());
});

const pcUrl = 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json';

let json = {};
fetch(pcUrl)
    .then(async (res) => {
        json = await res.json();
    })
    .catch(err => {
        console.log('Чтото пошло не так:', err);
    });

app.get('/3A',async function(req, res) {
    res.send(json);
});

app.get('/3A/volumes', function(req, res) {
    const hddArr = {};
    for (let i=0; json.hdd.length>i; i++){
        if (hddArr[json.hdd[i].volume] == undefined) {
            hddArr[json.hdd[i].volume] = json.hdd[i].size;
        }else{
            hddArr[json.hdd[i].volume] += json.hdd[i].size;
        }
    };
    const hddJson = JSON.stringify(hddArr,function(key, value) {
        if (key != ""){
            //console.log("key: "+key, "value: "+value);
            return value+"B";
        }
        return value;
    });
    console.log(hddJson);
    res.send(hddJson);
});

app.get('/3A/:id1?/:id2?/:id3?', function(req, res) {
    const id1 = req.params.id1 ? req.params.id1 : '';
    const id2 = req.params.id2 ? req.params.id2 : '';
    const id3 = req.params.id3 ? req.params.id3 : '';
    const idArr = [id1,id2,id3];
    let id = json;
    for (let i = 0; idArr.length>i; i++){
        if (idArr[i] && id !== undefined) {
            id = id[idArr[i]];
        }
    }
    console.log("Запрос ",idArr,"Ответ: ",id)
    if (id === undefined){
        res.status(404).send("Not found");
    }else{
        res.json(id);
    }
});

app.listen(3000, () => {
    console.log('Your app listening on port 3000!');
});
