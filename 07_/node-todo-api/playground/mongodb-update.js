const { MongoClient, ObjectID } = require('mongodb');


const dbUrl = 'mongodb://localhost:27017/TodoApp';
MongoClient.connect(dbUrl, { useNewUrlParser: true }, (err, client) => {
    if (err) {
        return console.log('Unable to connecto to MongoDB server.');
    }
    console.log('Connected to MongoDB server');

    const db = client.db('TodoApp');
    /* db.collection('Todos').findOneAndUpdate({
        _id: new ObjectID('5b4b916ecf9ea4159061174e')
    }, {
        $set: {
            completed: true
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    }); */

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5b4b938f612f6e0914cd4cdb')
    }, {
            $set: {
                name: 'John'
            },
            $inc: {
                age: 1
            }
        }, {
            returnOriginal: false
        }).then((result) => {
            console.log(result);
        });

    //client.close();
});