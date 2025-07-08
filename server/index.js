import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute.js";
import chatRoute from "./routes/chatRoute.js";
import messageRoute from "./routes/messageRoute.js";

dotenv.config();

const connectToMongo = async () => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to Mongo Successfully!");
    } catch (error) {
        console.log(error);
    }
};

await connectToMongo();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/users", userRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

const port = process.env.PORT || 5000;

app.listen(port, (req, res) => {
    console.log(`Server running on port: ${port}`);
});