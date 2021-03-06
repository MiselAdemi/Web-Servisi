var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require('./config');
var mongoose = require('mongoose');
var app = express();

mongoose.connect(config.database, function(err) {
    if(err) {
        console.log(err);
    }else {
        console.log("Connected to the database");
    }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));

var users = require('./app/routes/users')(app, express);
var tasks = require('./app/routes/tasks')(app, express);
var projects = require('./app/routes/projects')(app, express);

app.use('/users', users);
app.use('/tasks', tasks);
app.use('/projects', projects);

app.get('*', function(req, res) {
    res.sendFile(__dirname + '/public/views/index.html');
});

app.listen(config.port, function (err) {
    if(err) {
        console.log(err);
    }else {
        console.log("Listening on port 3000");
    }
});