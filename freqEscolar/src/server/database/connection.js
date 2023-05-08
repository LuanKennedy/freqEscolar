import mongoose from "mongoose";

let mongoConnection = null;

export const connectMongo = async () => {
  if (!mongoConnection) {
    mongoConnection = await mongoose.connect(
      "MONGO_URI=mongodb+srv://luan777:jOGABhDpc0igFiCw@cluster0.ctiyqzc.mongodb.net/?retryWrites=true&w=majority"
    );
  }
  return mongoConnection;
};
