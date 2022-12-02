const express = require('express');
const app = express();
const Pool = require('pg').Pool;
const db = require('./Crud')
  
const pool = new Pool({
    user: 'root',
    host: 'varamanbackend.comruqr8hn6j.us-east-1.rds.amazonaws.com',
    database: 'varamanbackend',
    password: 'root2002',
    port: 5432,
  
});



  
const bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
  
  
pool.connect((err, client, release) => {
    if (err) {
        return console.error(
            'Error acquiring client', err.stack)
    }
    client.query('SELECT NOW()', (err, result) => {
        release()
        if (err) {
            return console.error(
                'Error executing query', err.stack)
        }
        console.log("Connected to Database !")
    })
})
  
app.get('/testdata', (req, res, next) => {
    console.log("TEST DATA :");
    pool.query('Select * from test')
        .then(testData => {
            console.log(testData);
            res.send(testData.rows);
        })
})

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})
  
app.post('/createusers', db.createUser)
app.post('/registernumbers', db.regNums)
app.put('/topup', db.topUp)
  
  

const server = app.listen(3000, function () {
    let host = server.address().address
    let port = server.address().port
 
})
