const express = require('express');
const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser')

const app = express();

const database = mysql.createConnection({
    host: 'sql7.freemysqlhosting.net',
    user: 'sql7243515',
    password: 'IAyHtnPDk8',
    database: 'sql7243515'
});

database.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySql Connected...');
});

const mockData = [{ "id": 1, "lastName": "Mil", "firstName": "Nikola", "number": "315464" }, { "id": 2, "lastName": "Gacic", "firstName": "Selena", "number": "315-13-456-464" }];

app.use(express.static(path.join(__dirname, 'client/build')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/api/contacts', (req, res) => {
    database.query('SELECT * from phonebook', function (error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify(results));
    });
});

app.post('/api/new', function (req, res, next) {
    database.query(
        `INSERT INTO phonebook (firstName, lastName, number) VALUES ('${req.body.firstName}', '${req.body.lastName}', '${req.body.number}')`,
        function (error, results, fields) {
            if (error) throw error;
            res.send(JSON.stringify(results));
        });
})

app.post('/api/delete', function (req, res, next) {
    database.query(
        `DELETE FROM phonebook WHERE id in ( ${req.body.toString()})`,
        function (error, results, fields) {
            if (error) throw error;
            res.send(JSON.stringify(results));
        });
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Phonebook listening on ${port}`);