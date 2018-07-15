const { MongoClient, ObjectID } = require('mongodb');


const dbUrl = 'mongodb://localhost:27017/TodoApp';
MongoClient.connect(dbUrl, { useNewUrlParser: true }, (err, client) => {
    if (err) {
        return console.log('Unable to connecto to MongoDB server.');
    }
    console.log('Connected to MongoDB server');

    const db = client.db('TodoApp');

    //deletemany
    /* db.collection('Todos').deleteMany({ text: 'lunch' }).then((result) => {
        console.log(result);
    }); */

    //deleteone
    /* db.collection('Todos').deleteOne({ text: 'lunch' }).then((result) => {
        console.log(result);
    }); */

    //find one and delete
    /* db.collection('Todos').findOneAndDelete({ completed: 'false' }).then((result) => {
        console.log(result);
    }); */

    //...
    db.collection('Users').deleteMany({ name: 'Andrew' });

    //it's id wasnt ObjectID
    db.collection('Users').findOneAndDelete({ _id: 123 }).then((results) => {
        console.log(JSON.stringify(results, undefined, 2));
    });

    //client.close();
});