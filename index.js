import express from 'express';
import cors from 'cors';
import fetch from  'isomorphic-fetch';

const app = express();
app.use(cors());
const j = '{"board":{"vendor":"IBM","model":"IBM-PC S-100","cpu":{"model":"80286","hz":12000},"image":"http://www.s100computers.com/My%20System%20Pages/80286%20Board/Picture%20of%2080286%20V2%20BoardJPG.jpg","video":"http://www.s100computers.com/My%20System%20Pages/80286%20Board/80286-Demo3.mp4"},"ram":{"vendor":"CTS","volume":1048576,"pins":30},"os":"MS-DOS 1.25","floppy":0,"hdd":[{"vendor":"Samsung","size":33554432,"volume":"C:"},{"vendor":"Maxtor","size":16777216,"volume":"D:"},{"vendor":"Maxtor","size":8388608,"volume":"C:"}],"monitor":null}';
const json = JSON.parse(j);
app.get('/fullname', (req, res) => {
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

app.get('/username', (req, res) => {
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

app.get('/sum', (req, res) => {
    const sum = (+req.query.a || 0) + (+req.query.b || 0);
    res.send(sum.toString());
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
