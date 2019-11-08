const router = require("express").Router();
const itemsContr = require("../../controllers/items");

console.log("itemscontr logs")
console.log(itemsContr)

router.route("/")
    .get(itemsContr.findAll)
    .post(itemsContr.create);

// /api/itemsContr/:id
router
    .route("/:id")
    .get(itemsContr.findById)
    .put(itemsContr.update);


module.exports = router;
