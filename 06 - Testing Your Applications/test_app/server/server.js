const express = require('express');

var app = express();

app.get('/', (req, res) => {
    //res.send('hello world');
    //res.status(404).send('hello world');
    res.status(404).send({
        error: 'Page not found.',
        name: 'Todo App v1.0'
    });
});

app.get('/users', (req, res) => {
    //res.send('hello world');
    //res.status(404).send('hello world');
    res.send([{
        name: 'a',
        age: 22
    }, {
        name: 'b',
        age: 23
    }, {
        name: 'c',
        age: 24
    }]);
});

app.listen(3000);

module.exports.app = app;