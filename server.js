const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require("./routes");
const mongoose = require('mongoose');
const session = require('express-session');
const dbConnection = require('./connection');
const MongoStore = require('connect-mongo')(session);
const passport = require('./passport');
const db = require('./models')
const app = express();
const PORT = process.env.PORT || 8080;
const nodemailer = require("nodemailer");
const oauth2 = require("oauth2")
const user = require('./routes/api/user')
// MIDDLEWARE
app.use(morgan('dev'))
app.use(
    bodyParser.urlencoded({
        extended: false
    })
)
app.use(bodyParser.json({limit: '50mb'}))
//Mongoose DB Connection
mongoose.Promise = global.Promise
// Sessions
app.use(
    session({
        secret: 'special-harkening', //pick a random string to make the hash that is generated secure
        store: new MongoStore({ mongooseConnection: dbConnection }),
        resave: false, //required
        saveUninitialized: false //required
    })
)
// Passport
app.use(passport.initialize())
app.use(passport.session()) // calls the deserializeUser
app.post("/mail/:id", (req, res) => {
    db.User.findOne({_id:req.params.id}, (err, res)=>{
        console.log(res.email)
        console.log("Email route hit");
    console.log(req.params);
    var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "24hrbidder@gmail.com",
                clientId: "866019043905-2gotkchkuachnjvvk9shbmhrrl3h5rkp.apps.googleusercontent.com",
                clientSecret: "XXJxWdO8hDPyjaIE728-aVVr",
                refreshToken: "1//04drX0PXBQmrDCgYIARAAGAQSNwF-L9IrtQJBpRF-8y2MGxbCWT_n-WNcxM4rDUQnwC3_FDb_6HfAMlaklr7LXQGD32-FGUqGNTk",
                accessToken: "ya29.Il-wB7ZN6d83Yo2OgjsCUBU49FQsSTcrmLCapQRBCckvy09ktcDhO1S1df5WdOyzbuMWZQP-LuZ9JioZicKLXMw29EjM-qbOiW2kchBcRnTcvBIJnzaPrZzpuylY0oFwEQ"
            }
        })
        var mailOptions = {
            from: '"Fraigslist" <24hrbidder@gmail.com>',
            to: res.email,
            subject: "Your Order || Fraigslist",
            html: "<h3>Hey there! </h3><br> <h3>This email is to confirm your recent purchase on Fraigslist. Your order is on it's way!</h3>"
        }
        transporter.sendMail(mailOptions, function (err, res) {
            if (err) {
                console.log(err);
            } else {
                console.log("Email Sent");
        
            }
        })
    })
    
        
})
app.use(express.static(path.join(__dirname, "client", "build")))
// Routes
app.use(routes)
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
// app.use('/user', user)
// Starting Server 
app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`)
})