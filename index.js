import express from 'express';
import cors from 'cors';
import fetch from  'isomorphic-fetch';
import _ from 'lodash';
import colorcolor from 'colorcolor';

import skb3B from  './router/skb3B';
import skb2X from  './router/skb2X';
import skb3C from  './router/skb3C';

const app = express();
app.use(cors());
app.use('/3B', skb3B);
app.use('/2X', skb2X);
app.use('/3C', skb3C);

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

app.get('/2D', (req, res) => {
    //console.log((!/[^0-9a-f#]/i.test("#ababab") && /^#/.test("#ababab")));
    console.log(req.query);
    function canonazeColor() {
        if (req.query.color){
            const color = req.query.color.replace(/\s+/g, "");
            console.log(color);
            if (!/[^0-9a-f#]/i.test(color) && /^#/.test(color) && (color.length == 4 || color.length == 7)){
                console.log('#123456');
                return color;
            }
            if (!/[^0-9a-f]/i.test(color) && (color.length == 3 || color.length == 6)) {
                console.log("123456");
                return `#${color}`;
            }
            if (/^rgb/.test(color)) {
                console.log("rgb");
                const rgbArr = color.match(/[0-9]+/g);
                if (rgbArr.length == 3 && rgbArr[0] < 256 && rgbArr[1] < 256 && rgbArr[2] < 256) {
                    return color;
                }
            }
            const colorTmp = color.replace(/%20/g,"");
            if (/^hsl\([0-9]{1,3},[0-9]{1,3}%,[0-9]{1,3}%\)$/.test(colorTmp)) {
                const rgbArr = colorTmp.match(/[0-9]+/g);
                console.log("hsl ",colorTmp);
                if (rgbArr.length == 3 && rgbArr[0] < 361 && rgbArr[1] < 101 && rgbArr[2] < 101) {
                    return colorTmp;
                }
            }
        }
       return false;
    }
    const color = canonazeColor();
    if (color){
        res.send(colorcolor(color, "hex"));
    }else{
        res.send("Invalid color");
    }
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

app.get('/', function(req, res) {
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

app.get(/^\/3A.*/i, function(req, res) {
    const idArr = req.path.match(/[^\/]+/g);
    let id = json;
    for (let i = 1; idArr.length>i; i++){ //перебор со 2-го элемента, т.к. в 1-м корневой роут
        let update = false;
        _.forOwn(id, function(value, key) {
            if (key == idArr[i]){
                id = id[idArr[i]];
                update = true;
            }
        });
        if (!update) {
            id = undefined;
        }
    }
    console.log("Запрос ",idArr,"Ответ: ",id);
    if (id === undefined){
        res.status(404).send("Not Found");
    }else{
        res.json(id);
    }
});


app.listen(3000, () => {
    console.log('Your app listening on port 3000!');
});
