const imgur = require('imgur');
const db = require("../models");
console.log("DB logs");
console.log(db);
// Defining methods for the ItemsController
module.exports = {
    findAll: function (req, res) {
        db.Items
            .find({ quantity: { $gte:1}})
            .sort({ date: -1 })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    create: function (req, res) {
        const apiKey = '13a9a629b87f1a7';
        console.log(apiKey);
        // request.open('POST', 'https://api.imgur.com/3/image/');
        // request.setRequestHeader('Authorization', 'Client-ID' + apiKey);
        // request.onreadystatechange = () => {
        //     if (request.status === 200 && request.readyState === 4) {
        //         let res = JSON.parse(request.responseText);
        //         console.log(res);
        //         req.body.imageLink = `https://i.imgur.com/${res.data.id}.png`;

        //         console.log("--------------------")
        //         console.log(req.params.id)
        //         console.log("worked")
        imgur.setClientId(apiKey);
        imgur.setAPIUrl('https://api.imgur.com/3/');
        console.log(req.body.imageLink);
        // imgur.uploadFile("C:/Users/jgrod/OneDrive/Pictures/Harambe.jpg").then(json => {
        imgur.uploadFile(req.body.imageLink).then(json => {

            console.log("=====DATA ======");

            console.log(json.data);
            req.body.imageLink = json.data.link
            db.Items
                .create(req.body)
                .then(dbModel => res.json(dbModel))
                .catch(err => res.status(422).json(err));
        }).catch(err => {
            if (err) throw err;
        })

    },
    findById: function (req, res) {
        db.Items
            .findById(req.params.id)
            .then(dbItem => res.json(dbItem))
            .catch(err => res.status(422).json(err));
    },
    update: function (req, res) {
        // console.log(req.params.id)
        // console.log(req.body)
        db.Items
            .findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(dbUpdate => res.json(dbUpdate))
            .catch(err => res.status(422).json(err));
    },
    findByUserId: function (req, res) {
        db.Items
            .find({ id: req.params.id })
            // .populate('items')
            .then(dbUser => res.json(dbUser))
            .catch(err => res.status(422).json(err));
    },
    remove: function(req, res) {
        console.log("where is this")
        console.log(req.params)
        db.Items
          .findById({ _id: req.params.id })
          .then(dbDelete => dbDelete.remove())
          .then(dbDelete => res.json(dbDelete))
          .catch(err => res.status(422).json(err));
      }
};
