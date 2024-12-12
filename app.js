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
        console.error('Error mit DB', err);
    } else {
        console.log('Connected');
    }
});




app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/test', (req, res) => {
    db.execute("insert into comment (comment, post_id) values ('test comment', 1)", (err, result) => {
        if (err) {
            res.status(400).send("Failed:", err);
        } else {
            res.json({ message: 'Succesful'});
        }
    });
});

app.get('/home', (req, res) => {
    res.sendFile(__dirname + '/public/html/home.html');
});

app.get('/profil', (req, res) => {
    res.sendFile(__dirname + '/public/html/profile.html');
});

app.get('/messager', (req, res) => {
    res.sendFile(__dirname + '/public/html/Messages.html');
});

app.get('/conntacts', (req, res) => {
    res.sendFile(__dirname + '/public/html/contacts.html');
});

app.get('/support', (req, res) => {
    res.sendFile(__dirname + '/public/html/Support.html');
});

app.get('/imprint', (req, res) => {
    res.sendFile(__dirname + '/public/html/imprint.html');
});

app.get('/About-US', (req, res) => {
    res.sendFile(__dirname + '/public/html/about.html');
});

app.get('/api/:id', (req, res) => {
    console.log(req.params.id);
    db.execute("select comment from comment where post_id = ?", [req.params.id], (err, result) => {
        if (err) {
            console.error("Tot: ", err);
        } else {
            res.json(result);
        }
    });
});

app.post('/api/:id', (req, res) => {
    const { comment } = req.body;
    console.log(comment);
    
    if (!comment) {
        return res.status(400).json({ message: 'No comment' });
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

// Register System

app.post('/apii/:username', (req, res) => {
    const { username, name, password } = req.body;


    if (!username || !name || !password) {
        return res.status(400).json({ message: 'Error json format' });
    }

    console.log(username, name, password)

    const query = 'INSERT INTO user (username, name, password) VALUES (?, ?, ?)';
    db.query(query, [username, name, password], (err, result) => {
        if (err) {
            console.error('Error register1', err);
            return res.status(500).send('error register2');
        }
        res.status(200).send({ message: 'Sucessful registered' });
    });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server läuft auf port ${port}`);
});