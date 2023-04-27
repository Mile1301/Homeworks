import { MongoClient } from "mongodb";
const MONGO_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`;

const client = new MongoClient(MONGO_URI);

let database;

export const connectToDatabase = async () => {
  try {
    await client.db().command({ ping: 1 });
    console.log("Connected to MongoDB");
    database = client.db();
  } catch (error) {
    console.log(error);
  }
};
export const getDb = () => {
  return database;
};
