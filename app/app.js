'use strict';
let fs = require('fs');
let express = require('express');
let path = require('path');
let pug = require('pug');
let session = require('express-session');
let bodyParser = require('body-parser');
let MongoStore = require('connect-mongo')(session);
let mongoose = require('./mongoose');
let app = express();

let config = require('./config.json');
let main = require('./routes/main.js');
let admin = require('./routes/admin.js');

let user = require('./models/user');
let post = require('./models/post');
let work = require('./models/work');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//--------------------------pug------------------------------//
app.set('view engine', 'pug');
app.set('views', path.resolve(__dirname, config.http.templates));

//----------------sessions---------------------//
app.use(session({
    secret: 'portfolio',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    })
}));

//------------------ Content-----------------//
fs.readFile(path.resolve(__dirname, config.http.content), 'utf8', function (err, data) {
    if (err) {
        console.log('Error: ' + err.message);
    }
    app.locals = JSON.parse(data);
});

//------------------- Static--------------------------//
app.use(express.static(path.resolve(__dirname, config.http.publicRoot)));



//---------------------routes----------------------//
app.use('/admin', require('./routes/admin'));
app.use('/', main);
app.use('/auth', require('./routes/auth'));
app.use('/mail', require('./routes/mail'));



//---------------- errors-------------------------------//
app.use((req,res,next) => res.status(404).send('Page not found!'));

app.use((err,req,res,next) => {
    res.status(500);
    res.render('error', {error: err.message});
    console.log(err.message, err.stack);
});


//---------------- Server----------------------------//
app.listen(config.http.port, config.http.host, () => {
    let uploadDir = path.resolve(__dirname, config.http.upload);
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
        console.log(uploadDir);
    }

    console.log(`Server is up on ${config.http.host}:${config.http.port}!`);
});

module.exports = app;
