// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

/* var obj = new ObjectID();
console.log(obj); */

/* var user = { name: 'andrew', age: 25 };
var { name } = user; //object destructuring
console.log(name); */

const dbUrl = 'mongodb://localhost:27017/TodoApp';
MongoClient.connect(dbUrl, { useNewUrlParser: true }, (err, client) => {
    if (err) {
        return console.log('Unable to connecto to MongoDB server.');
    }
    console.log('Connected to MongoDB server');

    const db = client.db('TodoApp');
    /* db.collection('Todos').insertOne({
        text: 'Something to do',
        completed: false
    }, (err, result) => {
        if (err) {
            return console.log('Unable to insert todo');
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
    }); */

    /* db.collection('Users').insertOne({
        //_id: 123,
        name: 'Andrew',
        age: 25,
        location: 'Philadelphia'
    }, (err, result) => {
        if (err) {
            return console.log('Unable to insert user');
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
        console.log(result.ops[0]._id.getTimestamp())
    }); */

    client.close();
});