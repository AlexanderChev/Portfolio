'use strict';
let fs = require('fs');
let express = require('express');
let app = express();
let path = require('path');
let pug = require('pug');
let session = require('express-session');
let bodyParser = require('body-parser');
let MongoStore = require('connect-mongo')(session);

let config = require('./config.json');

app.set('view engine', 'pug');
app.set('views', path.resolve(`./${config.http.publicRoot}/template/pages`));

app.use(express.static(path.resolve(config.http.publicRoot)));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

////routs

app.get('/', (req, res) => {
   res.setHeader('Content-type', 'text/html;charset=utf8');
   res.end('работает!');
});

app.use((req,res,next) => res.status(404).send('Page not found!'));

app.use((err,req,res,next) => {
    res.status(500);
    res.render('error', {error: err.message});
    console.log(err.message, err.stack);
});

app.listen(config.http.port, config.http.host, () => {
    let uploadDir = path.resolve(config.http.publicRoot,  'upload');

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    }

console.log(`Server is up on ${config.http.host}:${config.http.port}!`);
});