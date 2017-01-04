'use strict';

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let fs = require('fs');
let path = require('path');
let app = express();

//Index
router.get(['/','/index'], (req, res) => {
    res.render('index');
});

//About
router.get('/about', function (req, res) {
    res.render('about');
});

//Works
router.get('/works', function (req, res) {
    let Model = mongoose.model('work');

    Model.find().then(items => {
        res.render('works', {items: items});
    });
});

//Blog
router.get('/blog', function (req, res) {
    let Model = mongoose.model('post');

    Model.find({}).then(items => {
        res.render('blog', {items: items});
    });
});

module.exports = router;