const express = require('express');
const xml = require('xml');
const xmlparser = require('express-xml-bodyparser')
const app = express();
app.use(express.json())
app.use(xmlparser());


const port = 9001;
let data = {
    mahasiswa : [
        {
            "Nama": "Ronaldo"
        }
    ]
}

app.get('/mahasiswa', (req, res) => {
    const query = req.query;

    if(query.type === 'xml'){
        res.set('Content-type', 'text/xml');
        return res.send(xml(data, true));
    }else{
        return res.send(data);
    }
});

app.post('/mahasiswa/tambah', (req, res) => {
    let body = req.body;
    let query = req.query;

    data.mahasiswa.push(body);
    if(query.type === 'xml'){
        res.set('Content-type', 'text/xml');
        return res.send(xml(data, true));
    }else{
        return res.send(data);
    }

})

app.listen(port, () => {
    console.log(`Port ${port} sedang berjalan`);
})