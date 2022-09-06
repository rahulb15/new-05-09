import mongoose from "mongoose";

const connectDB = async (DATABASE_URL) => {
    try {
        const DB_OPTIONS = {
            dbName: "usersDB",
        };
        await mongoose.connect(DATABASE_URL, DB_OPTIONS);
        console.log("Connected Successfully");
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

export default connectDB;