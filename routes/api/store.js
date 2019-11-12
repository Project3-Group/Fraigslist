const router = require("express").Router();
const itemsContr = require("../../controllers/items");

// route /:id
router.route('/:id')
    .get(itemsContr.findByUserId)


module.exports = router;
