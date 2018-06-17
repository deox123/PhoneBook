const express = require('express');
const path = require('path');
const mysql = require('mysql');

const app = express();

// const database = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'phonebook'
// });

// database.connect((err) => {
//     if (err) {
//         throw err;
//     }
//     console.log('MySql Connected...');
// });

const mockData = [{"ID":1,"LastName":"Mil","FirstName":"Nikola","number":"315464"},{"ID":2,"LastName":"Gacic","FirstName":"Selena","number":"315-13-456-464"}];

app.use(express.static(path.join(__dirname, 'client/build')));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/api/contacts', (req, res) => {
    // database.query('SELECT * from phonebook', function (error, results, fields) {
    //     if (error) throw error;
    //     res.send(JSON.stringify(results));
    // });
    res.send(mockData)
});

app.post('api/new', function (req, res, next) {
    // database.query(
    //     `INSERT INTO phonebook (LastName, FirstName) VALUES (${req.body.firstName}, ${req.body.lastName})`,
    //     function (error, results, fields) {
    //         if (error) throw error;
    //         res.send(JSON.stringify(results));
    //     });
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
  });

  const port = process.env.PORT || 5000;
  app.listen(port);
  
  console.log(`Phonebook listening on ${port}`);