const mongoose = require('mongoose');

const ItemSchema = mongoose.Schema({
    item_name: {
        type: String,
        require: true
    },

    category: {
        type: String,
        require: true
    },
    quantity: {
        type: String,
        require: true
    }
});

const Item = module.exports = mongoose.model('Item', ItemSchema);