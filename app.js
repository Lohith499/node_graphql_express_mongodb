const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const route = require("./routes");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const RootQueryType = require("./graphQL_Schema/RootQueryType");
const RootMutationType = require("./graphQL_Schema/RootMutationType");
const expressGraphQL = require("express-graphql");
const {
    GraphQLSchema
} = require("graphql");


const { parsed: config } = dotenv.config();
global.config = config;


app.use(bodyParser.json());




const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
})
app.use("/graphql", expressGraphQL({
    schema: schema,
    graphiql: true
}))

app.use("/", route);



app.listen(3000, (err) => {
    console.log("Server Started at 3000");
})
