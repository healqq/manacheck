var connection = require('mongoose');

connection.connect('mongodb://mongodb:27017/');
var db = connection.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('connected to db');

});

module.exports = connection;