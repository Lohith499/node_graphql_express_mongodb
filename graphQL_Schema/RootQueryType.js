let { GraphQLObjectType,GraphQLString,GraphQLList, GraphQLNonNull, GraphQLID} = require("graphql");
let mongoose = require("mongoose");
const m_item = require("../mongoDB_schema/item");
const m_customer = require("../mongoDB_schema/customer");
const m_order = require("../mongoDB_schema/order");
const m_address=require("../mongoDB_schema/address");
const gSchema = require("./gSchema");
const graphqlFields=require("graphql-fields");

const RootQueryType = new GraphQLObjectType({
    name: "Query",
    description: "Root Query",
    fields: () => ({
        item: {
            type: gSchema.ItemType,
            description: "Return Single Item",
            args: {
                id: { type: GraphQLString }
            },
            resolve: async (id,args,context,info) => {
                let x;
                    await m_item.findOne({ id: id }, async (err, doc) => {
                        x = doc;
                    });
                return x;
            }
        },
        items: {
            type: new GraphQLList(gSchema.ItemType),
            description: "Return list of Items",
            resolve: async (id,args,context,info) => {
                let x;
                const topLevelFields = graphqlFields(info);
                console.log("Hit items");
                if(Object.keys(topLevelFields).includes("orders")){
                    await m_item.aggregate([
                        { $lookup:
                          {
                            from: 'orders',
                            localField: '_id',
                            foreignField: 'itemID',
                            as: 'orders'
                          }
                        }
                      ],async(err,doc)=>{
                        //  console.log(doc)
                        x = await doc.map(item => { return { id: item["_id"].toString(), name: item.name, category: item.category, price: item.price,orders : item.orders }});
                      })
                      console.log(x);
                      return await x;
                }  else{
                    await m_item.find(async (err, doc) => {
                        x = await doc.map(item => { return { id: item["_id"], name: item.name, category: item.category, price: item.price } });
                    });
                    return await x;
                }  
            }
        },
        customer: {
            type: gSchema.CustomerType,
            description: "Return Single Customer",
            args: {
                id: { type: GraphQLString }
            },
            resolve: async (id) => {
                let x;
                    await m_customer.findOne({ id: id }, async (err, doc) => {
                        x = doc;
                    });
                return x;
            }
        },
        customers: {
            type: new GraphQLList(gSchema.CustomerType),
            description: "Return list of Customers",
            resolve: async () => {
                let x;
                    await m_customer.find(async (err, doc) => {
                        x = await doc.map(item => { return { id: item["_id"], firstname: item.firstname, lastname: item.lastname, mobile: item.mobile, city: item.city } });
                    });
                return x;
            }
        },
        order: {
            type: gSchema.OrderType,
            description: "Return Single Order",
            args: {
                id: { type: GraphQLString }
            },
            resolve: async (id) => {
                let x;
                    await m_order.findOne({ id: id }, async (err, doc) => {
                        x = doc;
                    });
                return x;
            }
        },
        orders: {
            type: new GraphQLList(gSchema.OrderType),
            description: "Return list of Orders",
            resolve: async () => {
                let x;
                await m_order.find(async (err, doc) => {
                    x = await doc.map(item => { return { _id: item["_id"], itemID: item.itemID, customerID: item.customerID, orderDate: item.orderDate, quantity: item.quantity } });
                });
                return x;
               /* let x;
                await mongoose.connect(config.DB_CONNECT, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }, async (err) => {
                    if (err) throw new Error(err)
                    await m_order.find(async (err, doc) => {
                        x = await doc.map(item => { return { id: item["_id"], itemID: item.itemID, customerID: item.customerID, orderDate: item.orderDate, quantity: item.quantity } });
                    });
                });
                return x; */
            }
        },
        address: {
            type : gSchema.AddressType,
            description : "returns an address",
            args : {
                id : {type : new GraphQLNonNull(GraphQLID)}
            },
            resolve: async()=>{
                let output=null;
                output =await m_address.findById({id : id})
                return output;

            }
        },
        addresses : {
            type : new GraphQLList(gSchema.AddressType),
            description: "return list of addresses",
            resolve:async()=>{
                let x=await m_address.find({})
                return x;
            }
        }
    })
})


module.exports = RootQueryType;