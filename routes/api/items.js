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
    .delete(itemsContr.remove);

module.exports = router;
