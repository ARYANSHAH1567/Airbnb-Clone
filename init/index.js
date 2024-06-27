// const mongoose = require('mongoose');
// const initData = require("./data.js");
// const Listing = require("../models/listing.js");

// const dbUrl = process.env.MONGODB_URI;

// main()
//  .then(() => {
//     console.log('Successfully Connected Mongoose');
//  })
//  .catch((err) => {
//     console.log(err);
//  })

//  async function main() {
//    await mongoose.connect(dbUrl);
// }

// const initDB = async () => {
//    await Listing.deleteMany({});
//    initData.data = initData.data.map((obj) => ({ ...obj, owner: "6659a811880a8517520fbd82", }));
//    await Listing.insertMany(initData.data)
//    console.log("data was initialized ...");
// }

// initDB();

require('dotenv').config(); // Load environment variables at the very beginning
const mongoose = require('mongoose');
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const dbUrl = process.env.MONGODB_URI;

if (!dbUrl) {
  console.error('MongoDB URI is not defined in the environment variables.');
  process.exit(1); // Exit the process with failure
}

const main = async () => {
  try {
    await mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Successfully Connected Mongoose');
    await initDB();
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Exit the process with failure
  }
};

const initDB = async () => {
  try {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({ ...obj, owner: "6659a811880a8517520fbd82" }));
    await Listing.insertMany(initData.data);
    console.log("Data was initialized ...");
  } catch (err) {
    console.error('Error initializing the database:', err);
  }
};

main();
