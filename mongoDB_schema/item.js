const mongoose = require("mongoose");
const schema = mongoose.Schema;


let itemSchema = new schema({
    name: String,
    category: String,
    price: Number
});

let Item = mongoose.model("Item", itemSchema);

module.exports = Item;