const mongoose = require("mongoose");
const schema = mongoose.Schema;


let customerSchema = new schema({
    firstname: String,
    lastname: String,
    mobile: String,
    city: String
},{versionKey: false});

let Customer = mongoose.model("customers", customerSchema);

module.exports = Customer;