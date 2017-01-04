'use strict';

let mongoose = require('mongoose');

let Post = new mongoose.Schema({
        title: {
            type: String,
            required: true
        },
        body: {
            type: String,
            required: true
        },
        date: {
            type: String,
            required: true
        }
    });

mongoose.model('post', Post);