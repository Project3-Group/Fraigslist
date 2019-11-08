const path = require("path");
const router = require("express").Router();
const itemsRoute = require('./items');
const userRoute = require('./user');

// API Routes
router.use("/items", itemsRoute);
router.use("/user", userRoute);

// If no API routes are hit, send the React app
router.use(function (req, res) {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
