const mongoose = require('mongoose');
require('dotenv').config();

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connection successful...");
  } catch (error) {
    console.error(error);
  }
}

connectToDatabase();

// Export the mongoose instance for use in other parts of the application
module.exports = mongoose;