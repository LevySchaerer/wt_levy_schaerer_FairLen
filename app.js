const express = require('express');
const path = require('path');
const mysql = require('mysql2');

const app = express();
const port = 3000;


app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


const db = mysql.createConnection({
    host: 'localhost',
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

app.get('/test', (req, res) => {
    db.execute("insert into comment (comment, post_id) values ('test comment', 1)", (err, result) => {
        if (err) {
            res.status(400).send("Failed:", err);
        } else {
            res.json({ message: 'It worked'});
        }
    });
});

app.get('/webseite', (req, res) => {
    res.sendFile(__dirname + '/public/home.html');
});

app.get('/api/:id', (req, res) => {
    console.log(req.params.id);
    db.execute("select comment from comment where post_id = ?", [req.params.id], (err, result) => {
        if (err) {
            console.error("Kabudddd: ", err);
        } else {
            res.json(result);
        }
    });
});

app.post('/api/:id', (req, res) => {
    const { comment } = req.body;
    console.log(comment);
    
    if (!comment) {
        return res.status(400).json({ message: 'Kommentar ist erforderlich!' });
    }
    
    const sql = "INSERT INTO comment (comment, post_id) VALUES (?, ?)";

    db.execute(sql, [comment, req.params.id], (err, result) => {
        if (err) {
            console.error("Fehler beim Speichern: ", err);
            return res.status(500).json({ message: 'Fehler beim Speichern der Daten' });
        } else {
            db.commit();
            return res.status(200).json({ message: 'Kommentar wurde erfolgreich gespeichert' });
        }
    });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server läuft auf http://<deine-ip>:${port}`);
});