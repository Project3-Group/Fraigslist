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
    }
};
