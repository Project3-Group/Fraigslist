const db = require("../models");
console.log("DB logs");
console.log(db);
// Defining methods for the ItemsController
module.exports = {
    findAll: function (req, res) {
        db.Items
            .find(req.query)
            .sort({ date: -1 })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    create: function (req, res) {
        console.log("worked")
        db.Items
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
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
    }
};
