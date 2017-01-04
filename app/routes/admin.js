'use strict';

let express = require('express');
let router = express.Router();
let fs = require('fs');
let path = require('path');
let mongoose = require('mongoose');
let multiparty = require('multiparty');
let config = require('../config.json');

//page Index
router.get('/', (req, res, next) => {
    if (!req.session.isReg) {
        res.redirect('/');
    }else {
        res.render('admin');
    }
});

//page Blog
router.post('/post', (req,res) => {
    if(!req.body.postDate || !req.body.postBody || !req.body.postName) {
        return res.json({error: 'Заполните все поля'})
    }

    let Model = mongoose.model('post'),
        item = new Model({
            title: req.body.postName,
            date: req.body.postDate,
            body: req.body.postBody
        });

    item.save().then(
        i => res.json({ success: 'Запись успешно добавлена!' })
    );e => {
        let error = Object.keys(e.errors)
            .map(key => e.errors[key].message)
            .join(', ');
        res.json({ error: error })
    }
});

//page Works
router.post('/work', (res, req) => {
    let form = new multiparty.Form();

    form.parse(req, function (err, fields, files) {
        if(err) {
            return res.json({error: err.message || err})
        }

        let Model = mongoose.model('work'),
            item = new Model({
                title: fields.workName,
                tech: fields.workTech,
                link: fields.workLink
            });

        item.save().then(work => {
            let pictures = files.workPicture.filter(f => f.size).map((file, key) => {
                let newFilePath = path.join('upload', `${work._id}_${key}${path.extname(file.path)}`);

                fs.writeFileSync(path.resolve(config.http.publicRoot, newFilePath), fs.readFileSync(file.path));

                return newFilePath;
            });

            return Model.update({ _id: work._id}, { $pushAll: {pictures: pictures} });
        }, e => {
            throw new Error(Object.keys(e.errors).map(key => e.errors[key].message).join(', '));
        }).then(
            i => res.json({ success: 'Запись успешно добавлена!' }),
            e => res.json({ error: e.message })
        );
    });
});

module.exports = router;
