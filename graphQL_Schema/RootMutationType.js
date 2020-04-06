const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList
} = require("graphql");
let mongoose = require("mongoose");
const m_item = require("../mongoDB_schema/item");
const m_customer = require("../mongoDB_schema/customer");
const m_order = require("../mongoDB_schema/order");
const gSchema = require("./gSchema");


let RootMutationType = new GraphQLObjectType({
    name: "Mutation",
    description: "Root Mutation",
    fields: () => ({
        addCustomer: {
            type: gSchema.CustomerType,
            description: "Adds a Cusotmer",
            args: {
                firstname: { type: GraphQLString },
                lastname: { type: GraphQLString },
                mobile: { type: GraphQLString },
                city: { type: GraphQLString }
            },
            resolve: (parent, args) => {
                return new Promise(async (resolve, reject) => {
                    let newCustomer = new m_customer({
                        firstname: args.firstname,
                        lastname: args.lastname,
                        mobile: args.mobile,
                        city: args.city
                    });
                    await mongoose.connect(config.DB_CONNECT, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }, async (err) => {
                        if (err) throw new Error(err)
                        await newCustomer.save(async (err, doc) => {
                            if (err) reject({ "message": "Internal Server Error" });
                            console.log("doc")
                            console.log(doc)
                            return resolve(doc);
                        });
                    });
                });
            }
        }
    })
})

module.exports = RootMutationType;