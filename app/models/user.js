'use strict';

let mongoose = require('mongoose');
let crypto = require('crypto');

let User = new mongoose.Schema({
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        set(v) {
            if (v == '') {
                return v;
            }
            else {
                return crypto.createHash('md5').update(v).digest('hex');
            }
        }
    }
});


mongoose.model('user', User);