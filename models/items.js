const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs');
mongoose.promise = Promise

// const regex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/

// Define itemsSchema
const itemsSchema = new Schema({
    itemName: {
        type: String,
        required: true,
    },
    imageLink: {
        // put in url regex? 
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: false,
    },
    quantity: {
        type: integer,
        required: true,
    },
    price: {
        // regex for integer + 2 decimals
        type: integer,
        required: true,
    },
    itemDescription: {
        type: String,
        required: true,
    },
    inCart: {
        type: Boolean, 
        default: false,
    }
})

// Define schema methods
itemsSchema.methods = {
    checkPassword: function (inputPassword) {
        return bcrypt.compareSync(inputPassword, this.password)
    },
    hashPassword: plainTextPassword => {
        return bcrypt.hashSync(plainTextPassword, 10)
    }
}

const Items = mongoose.model('Items', itemsSchema)
module.exports = Items