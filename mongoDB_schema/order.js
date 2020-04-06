const mongoose = require("mongoose");
const schema = mongoose.Schema;


let orderSchema = new schema({
    itemID: String,
    customerID: String,
    orderDate: Date,
    quantity: Number

});

let Order = mongoose.model("Order", orderSchema);

module.exports = Order;