const router = require("express").Router();
const itemsContr = require("../../controllers/items");

// route "/"
router.route("/")
    .get(itemsContr.findAll)
    .post(itemsContr.create);


// route /items/:id
router.route("/:id")
    .get(itemsContr.findById)
    .put(itemsContr.update)

// route /useritems
router.route('/stuff/:id')
    .get(itemsContr.findUserItems)



module.exports = router;
