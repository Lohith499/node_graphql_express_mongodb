const mongoose = require("mongoose");
const schema = mongoose.Schema;


let customerSchema = new schema({
    firstname: String,
    lastname: String,
    mobile: Number,
    city: String
});

let Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;