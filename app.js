const express = require('express');
const path = require('path');
const mysql = require('mysql2');

const app = express();
const PORT = 5000;


app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


const db = mysql.createConnection({
    host: '172.16.2.196',
    user: 'app',
    password: '00PW4AppUser00',
    database: 'fair_len'
});


db.connect((err) => {
    if (err) {
        console.error('Fehler beim Verbinden mit der Datenbank:', err);
    } else {
        console.log('Mit der MySQL-Datenbank verbunden!');
    }
});




app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'index.html'));
});


app.get('/webseite', (req, res) => {
    res.sendFile(__dirname + '/public/fair-len.html');
});

app.get('/api/:id', (req, res) => {
    console.log(req.params.id);
    db.query("select * from comment", (err, result) => {
        if (err) {
            console.error("Kabudddd: ", err);
        } else {
            res.json(result);
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server läuft unter http://localhost:${PORT}`);
});
