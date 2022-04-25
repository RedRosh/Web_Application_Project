// for use mongo DB and mongoose
const mongoose = require("mongoose");

// connect the DB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.URI_Mongo);
    // to print message after connect
    console.log(
      `DB are Connected On MongoDB : ${conn.connection.host}`.cyan.underline
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
