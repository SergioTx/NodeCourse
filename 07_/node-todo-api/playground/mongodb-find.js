const { MongoClient, ObjectID } = require('mongodb');


const dbUrl = 'mongodb://localhost:27017/TodoApp';
MongoClient.connect(dbUrl, { useNewUrlParser: true }, (err, client) => {
    if (err) {
        return console.log('Unable to connecto to MongoDB server.');
    }
    console.log('Connected to MongoDB server');

    const db = client.db('TodoApp');
    /* db.collection('Todos').find().toArray().then((docs) => {
        console.log('Todos');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch todos', err);
    }); */
    /* db.collection('Todos').find({
        _id: new ObjectID('5b4b916ecf9ea4159061174e')
    }).toArray().then((docs) => {
        console.log('Todos');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch todos', err);
    }); */


    /* db.collection('Todos').find().count().then((count) => {
        console.log(`Todos count: ${count}`);
    }, (err) => {
        console.log('Unable to fetch todos', err);
    }); */

    db.collection('Users').find({
        name: 'Andrew'
    }).toArray().then((docs) => {
        console.log('Users');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch users', err);
    });

    //client.close();
});