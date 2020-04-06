let { GraphQLList, GraphQLObjectType,
    GraphQLString, GraphQLInt, GraphQLNonNull,
    GraphQLID } = require("graphql");
const mongoose = require("mongoose");
const m_item = require("../mongoDB_schema/item");
const m_customer = require("../mongoDB_schema/customer");
const m_order = require("../mongoDB_schema/order");

let ItemType = new GraphQLObjectType({
    name: "Item",
    description: "Returns an Item",
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        category: { type: GraphQLString },
        price: { type: GraphQLInt },
        orders: {
            type: new GraphQLList(OrderType),
            resolve: async (item) => {
                let x;
                await mongoose.connect(config.DB_CONNECT, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }, async (err) => {
                    if (err) throw new Error(err)
                    await m_order.find({ itemID: item.id }, async (err, doc) => {
                        x = await doc.map(item => { return { id: item["_id"], itemID: item.itemID, customerID: item.customerID, orderDate: item.orderDate, quantity: item.quantity } });
                    });
                });
                return x;
            }
        }
    })
});


let CustomerType = new GraphQLObjectType({
    name: "Customer",
    description: "Returns an Customer",
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLID) },
        firstname: { type: GraphQLString },
        lastname: { type: GraphQLString },
        mobile: { type: GraphQLString },
        city: { type: GraphQLString },
        orders: {
            type: new GraphQLList(OrderType),
            resolve: async (customer) => {
                let x;
                await mongoose.connect(config.DB_CONNECT, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }, async (err) => {
                    if (err) throw new Error(err)
                    await m_order.find({ customerID: customer.id }, async (err, doc) => {
                        x = await doc.map(item => { return { id: item["_id"], itemID: item.itemID, customerID: item.customerID, orderDate: item.orderDate, quantity: item.quantity } });
                    });
                });
                return x;
            }
        }

    })
});


let OrderType = new GraphQLObjectType({
    name: "Order",
    description: "Returns an Order",
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLID) },
        itemID: { type: GraphQLID },
        customerID: { type: GraphQLID },
        quantity: { type: GraphQLInt },
        orderDate: { type: GraphQLString },
        item: {
            type: ItemType,
            resolve: async (order) => {
                let x;
                await mongoose.connect(config.DB_CONNECT, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }, async (err) => {
                    if (err) throw new Error(err)
                    await m_item.findOne({ _id: order.itemID }, async (err, doc) => {
                        x = doc;
                    });
                });
                return x;
            }
        },
        customer: {
            type: CustomerType,
            resolve: async (order) => {
                let x;
                await mongoose.connect(config.DB_CONNECT, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }, async (err) => {
                    if (err) throw new Error(err)
                    await m_customer.findOne({ _id: order.customerID }, async (err, doc) => {
                        x = doc;
                    });
                });
                return x;
            }
        }
    })
});





module.exports = { ItemType, CustomerType, OrderType };