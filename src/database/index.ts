import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    await mongoose
      .connect("mongodb://127.0.0.1:27017/shop-wave")
      .then(() => console.log("Shop-wave database conected successfull"));
  } catch (error) {
    console.error(error);
  }
};

export default connectToDB;
