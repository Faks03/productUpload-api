const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        maxlength: 32
    },

    description: {
        type: String,
        trim: true,
        maxlength: 2000,
    },

    price: {
        type: Number,
        trim: true,
        maxlength: 32
    },

    stock: {
        type: Number,
        trim: true,
        maxlength: 32
    },

    image: {
        type: String,
        required: true,
    },
    
    localImage: {
        type: String,
        default: null,
    },

}, { timestamps: true });


module.exports = mongoose.model("Product", productSchema);