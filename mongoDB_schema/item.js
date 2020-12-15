const mongoose = require("mongoose");
const schema = mongoose.Schema;


let itemSchema = new schema({
    name: String,
    category: String,
    price: Number
});

let Items = mongoose.model("Items", itemSchema);

module.exports = Items;