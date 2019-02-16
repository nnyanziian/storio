/* Connection module */
const mongoose = require('mongoose');
const config = require('../config/db.json');
let mongoDB = config.live;


mongoose.connect(mongoDB, {
	useNewUrlParser: true,
	useCreateIndex: true
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
	console.log('Db Connected successfully '+mongoDB)
});

module.exports = {
	mongoose
}