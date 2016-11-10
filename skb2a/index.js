import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
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

app.listen(3000, () => {
    console.log('Your app listening on port 3000!');
});
