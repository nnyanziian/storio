const express = require('express');
var compression = require('compression');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes/user');
const user = require('./controllers/user');
const auth = require('./routes/auth');
const cors = require('cors');
const app = express();


app.use(cors());
app.use(compression());

//enabling json returned format and url encording
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }));


app.use('/api/',user.verifyLogin);
//routes that don't require auth pass through /auth/ route
app.use('/auth/',auth);
app.use('/api/',routes);


app.use('/assets', express.static('uploads'));



let port = 8000;

app.listen(port, () => {
    console.log('Application Server is up and running on port number ' + port);
});

module.exports = app;


