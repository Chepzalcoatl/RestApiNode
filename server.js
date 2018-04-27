//Import library
const express     = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser  = require('body-parser');
const db          = require('./config');

//Select PORT
const port = 8000;

// Create Express Application
var app = express();

// Add Body Parser Middleware
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//Connect Mongo BD
MongoClient.connect(db.url, (err, client) => {
    if (err) return console.log(err)
    // Client returned
    var db = client.db('test');
    require('./app/routes')(app, db);
    app.listen(port, () => {
        console.log('We are live on ' + port);
    });
}); 