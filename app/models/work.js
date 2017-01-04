'use strict';

let mongoose = require('mongoose'),
    Work = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    tech: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true
    }
});

mongoose.model('work', Work);