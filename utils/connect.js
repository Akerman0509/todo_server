require("dotenv").config({ path: "../.env" });
const mongoose = require("mongoose");

const connect_url = process.env.MONGODB_URL;
const database_name = "todoApp";

async function connectDB() {
  try {
    await mongoose.connect(connect_url, {
      dbName: database_name, // Explicitly specify database name
    });
    console.log("Connected to MongoDB - Database: ", database_name);

    mongoose.connection.once("open", async () => {
      // Verify the connection and collection
      const collections = await mongoose.connection.db
        .listCollections()
        .toArray();
      console.log(
        "Available collections:",
        collections.map((c) => c.name)
      );
    });
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
}

module.exports = { connectDB };
