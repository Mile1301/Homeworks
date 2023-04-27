import "dotenv/config";
import { connectToDatabase, getDb } from "./db/mongo-connection.js";
import express from "express";
import { ObjectId } from "mongodb";
const app = express();
app.use(express.json());

// 1.Get all products
app.get("/products", async (req, res) => {
  try {
    const db = getDb();
    const productsCollection = db.collection("products");
    const productsCursor = productsCollection.find({});
    const productsData = await productsCursor.toArray();
    res.status(200).json(productsData);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: error.message });
  }
});
// 2.Get product by ID
app.get("/products/:id", async (req, res) => {
  try {
    const { id: userId } = req.params;
    const db = getDb();
    const productsCollection = db.collection("products");
    const foundProduct = await productsCollection.findOne({ _id: new ObjectId(userId) });
    if (!foundProduct) throw new Error("Product not found");
    res.status(200).json(foundProduct);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: error.message });
  }
});
// 3.Create a product
app.post("/products", async (req, res) => {
  try {
    const data = req.body;
    const db = getDb();
    const productsCollection = db.collection("products");
    const response = await productsCollection.insertOne(data);
    res.status(201).json({ msg: `Product with ${response.insertedId} has been inserted` });
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: error.message });
  }
});
// 4.Update product using PUT method
app.put("/products/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const db = getDb();
    const productsCollection = db.collection("products");
    const updatedProduct = await productsCollection.findOneAndReplace({ _id: new ObjectId(id) }, data, { returnDocument: "after" });
    if (!updatedProduct) throw new Error("Product not found");
    res.status(201).json(updatedProduct.value);
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: error.message });
  }
});
// 5.Update product using PATCH method
app.patch("/products/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;
    const db = getDb();
    const productsCollection = db.collection("products");
    const updatedProduct = await productsCollection.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: updateData }, { returnDocument: "after" });
    if (!updatedProduct) throw new Error("Product not found");
    res.status(201).json(updatedProduct.value);
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: error.message });
  }
});
// 6.Delete a product
app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const db = getDb();
    const productsCollection = db.collection("products");
    const foundProduct = await productsCollection.findOne({ _id: new ObjectId(id) });
    if (!foundProduct) throw new Error("Product not found");
    await productsCollection.deleteOne(foundProduct);
    // await productsCollection.findOneAndDelete({ _id: new ObjectId(id) }, { returnDocument: "after" });
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: error.message });
  }
});
app.listen(process.env.PORT, () => {
  connectToDatabase();
  console.log("Connected on port 3000");
});
