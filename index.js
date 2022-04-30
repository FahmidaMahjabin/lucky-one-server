const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 7000;
// middleware
app.use(cors());
app.use(express.json());
// connect to mongodb


const uri = "mongodb+srv://shopInServer:NET7jTV025ngZ09l@cluster0.dfsqs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){
    try{
        await client.connect();
        const productCollection = client.db("shop-in").collection("products");
        console.log("mongodb connected")
        app.get("/products", async (req, res) =>{
            const cursor =  productCollection.find({});
            const products =await cursor.toArray();
            res.send(products)

        })
    }
    finally{}
}
run().catch(console.dir)



// app methods
app.listen(port, ()=>{
    console.log(`port running ${port}`)
})
