import mongoose from "mongoose";

const dbConfig = {
  connect: async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/jobportal`);
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1); 
    }
    },
  disconnect: async () => {
    try {
        await mongoose.disconnect();
        console.log("Database disconnected successfully");
    } catch (error) {
        console.error("Database disconnection failed:", error);
    }
    },
};
export default dbConfig;