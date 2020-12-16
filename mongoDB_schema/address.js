const mongoose = require("mongoose");
const schema = mongoose.Schema;


let addressSchema = new schema({
    customerID: schema.Types.ObjectId,
    street: String,
    city: String,
    state: String,
    zipcode: Number
});

let Address= mongoose.model("Addresses", addressSchema);

module.exports = Address;