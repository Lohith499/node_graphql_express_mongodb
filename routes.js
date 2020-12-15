const express = require("express");
const route = express.Router();
const mongoose = require("mongoose");
const items = require("./mongoDB_schema/item");
const customer = require("./mongoDB_schema/customer");
const order = require("./mongoDB_schema/order");

route.get("/", (req, res, next) => {
    res.status(200).json({ message: "Welcome to Home API", host : process.env.DB_HOST });
});


route.get("/items", async(req, res, next) => {
    const itemList = await items.find({ });
    try {
      res.send(itemList);
    } catch (err) {
      res.status(500).send(err);
    }
});


route.post("/item", (req, res, next) => {
   // mongoose.connect(config.DB_CONNECT, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
     //   if (err) throw new Error(err)
        let newItem = new items({
            name: req.body.name,
            category: req.body.category,
            price: req.body.price
        });
        newItem.save((err, doc) => {
            if (err) return res.status(500).json({ "message": "Internal Server Error" });
            return res.status(200).json({ "message": "Succesfully Added Item", data: doc })
        })
   // });
});

route.post("/customer", (req, res, next) => {
    mongoose.connect(config.DB_CONNECT, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
        if (err) throw new Error(err)
        let newCustomer = new customer({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            mobile: req.body.mobile,
            city: req.body.city
        });
        console.log(req.body)
        newCustomer.save((err, doc) => {
            if (err) return res.status(500).json({ "message": "Internal Server Error" });
            return res.status(200).json({ "message": "Succesfully Added Customer", data: doc })
        })


    });
});


route.post('/newcustomer', async (req, res,next) => {
    const newCustomer = new customer(req.body);
    try {
      let x=await newCustomer.save();
       // console.log(x);
        res.status(200).json({ "message": "Succesfully Added Customer", data: x })
    } catch (err) {
      res.status(500).send(err);
    }
  });


route.post("/order", (req, res, next) => {
    mongoose.connect(config.DB_CONNECT, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
        if (err) throw new Error(err)
        let newOrder = new order({
            itemID: req.body.itemID,
            customerID: req.body.customerID,
            quantity: req.body.quantity,
            orderDate: new Date()
        });

        newOrder.save((err, doc) => {
            if (err) return res.status(500).json({ "message": "Internal Server Error" });
            return res.status(200).json({ "message": "Succesfully Created Order", data: doc })
        })


    });
});


module.exports = route;