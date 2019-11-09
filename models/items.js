const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.promise = Promise;

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
        type: String,
        required: true,
    },
    price: {
        // regex for integer + 2 decimals
        type: String,
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


const Items = mongoose.model('Items', itemsSchema)
module.exports = Items