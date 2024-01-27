const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product.models");


// Connect to mongodb
  mongoose.set("strictQuery", false);
  mongoose.connect("mongodb+srv://aromal:aromal@crud.rhvwqes.mongodb.net/crud?retryWrites=true&w=majority")
    .then(() => { 
        console.log("Connected!");       
    }).catch((err) => {
        console.log(err.message);
    })

const app = express();
app.use(express.json());

app.listen(1234, () =>{
    console.log("Listening to port 1234");
});
/* app.get("/", (req, res) => {
  res.send("Hello World");
}); */

app.get("/products", async(req, res) =>{
    try {
        const product = await Product.find({});
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

app.get("/products/:id", async(req, res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

// const dummyData = { 
//     "productName": "pen1",
//     "quantity" : 10,
//     "price" : 12
// };
app.post("/products", async(req, res) =>{
    try {
        const product = await Product.create(req.body);
        // const product = dummyData;
        res.status(200).json(product)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

app.put("/products/:id", async(req, res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if (!product) {
            return res.status(404).json({message: `cannot find any item with id ${id}`});
        } 
        const updatedData = await Product.findById(id);
        res.status(200).json(updatedData);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
})

app.delete("/products/:id", async(req, res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({message: `cannot find any item with id ${id}`});
        }         
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
})

