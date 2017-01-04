'use strict';

let router = require('express').Router();
let mongoose = require('mongoose');
let crypto = require('crypto');

router.post('/', (req, res) => {
    if(!req.body.login || !req.body.password) {
        return res.json({error: 'Укажите логин и пароль!'})
    }

    let Model = mongoose.model('user'),
        password = crypto.createHash('md5')
            .update(req.body.password)
            .digest('hex');
    console.log(password);
    console.log(req.body.login);
    Model.findOne({
        login: req.body.login,
        password: password
    }).then(item => {
        if (!item) {
            res.json({ error: 'Неверный логин или пароль!'});
        }else {
            req.session.isReg = true;
            res.json({});
        }
    });
});

module.exports = router;