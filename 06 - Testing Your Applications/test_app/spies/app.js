const db = require('./db.js');

module.exports.handleSignup = (email, password) => {
    //chekc if the email already exists
    //save the user to the database
    db.saveUser({ email, password });
    //send the welcome email
};