import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.get('/fullname', (req, res) => {
    function fullname(){
     const myRe = /\S+/g;
     if (!req.query.fullname || /[\d_/\\]/.test(req.query.fullname)) {
       return "Invalid fullname";
     }
     const nameArray = req.query.fullname.match(myRe);
     if ((nameArray == null) || (nameArray.length>3)) {
       return "Invalid fullname";
     }
     const fullnameTemp = nameArray.pop();
     let fullname = fullnameTemp[0].toUpperCase()+fullnameTemp.slice(1).toLowerCase();
     for (let i = 0; i < nameArray.length; i++) {
       fullname += " "+nameArray[i][0].toUpperCase()+'.';
     }
     return fullname;
   }
   res.send(fullname());
});
app.get('/', (req, res) => {
    const sum = (+req.query.a || 0) + (+req.query.b || 0);
    res.send(sum.toString());
});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
