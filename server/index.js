const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const userRoute = require("./routes/userRoute");
const chatRoute = require("./routes/chatRoute");
const messageRoute = require("./routes/messageRoute");


const connectToMongo = async () => {
    try {
      mongoose.set("strictQuery", false);
      mongoose.connect(process.env.MONGO_URL);
      console.log("Connected to Mongo Successfully!");
    } catch (error) {
      console.log(error);
    }
  };

connectToMongo()

const app = express();
app.use(express.json());
app.use(cors());


app.use("/api/users", userRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

const port = process.env.PORT || 5000;

app.listen(port, (req, res) => {
  console.log(`Server running on port : ${port}`);
});



