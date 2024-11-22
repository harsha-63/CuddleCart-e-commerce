import mongoose from "mongoose";

const connectDb = async () => {
  // function to show the log for connecting
  mongoose.connection.on("connected", () =>
    console.log("DB Connected")
  );
  try {
    // connecting
    await mongoose.connect(`${process.env.MONGODB_URI}/ecommerce`);
  } catch (err) {
    console.log(err);
  }
};

export default connectDb;

