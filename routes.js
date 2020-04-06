const express = require("express");
const route = express.Router();
const mongoose = require("mongoose");
const item = require("./mongoDB_schema/item");
const customer = require("./mongoDB_schema/customer");
const order = require("./mongoDB_schema/order");

route.get("/", (req, res, next) => {
    res.status(200).json({ message: "Welcome to Home API" });
});



route.post("/item", (req, res, next) => {
    mongoose.connect(config.DB_CONNECT, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
        if (err) throw new Error(err)
        let newItem = new item({
            name: req.body.name,
            category: req.body.category,
            price: req.body.price
        });

        newItem.save((err, doc) => {
            if (err) return res.status(500).json({ "message": "Internal Server Error" });
            return res.status(200).json({ "message": "Succesfully Added Item", data: doc })
        })


    });
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