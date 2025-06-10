const messageModel = require("../models/messageModel");

const createMessage = async (req, res) => {
  const { chatId, senderId, text } = req.body;
  const message = new messageModel({
    chatId,
    senderId,
    text
  })
  try {
    const responce = await message.save();
    //console.log(responce)
    res.status(200).json(responce);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getMessages = async (req, res) => {
  const chatId = req.params;
  //console.log(chatId)
  try {
    const messages = await messageModel.find(chatId)
    //console.log(messages)
    res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};


module.exports = { createMessage ,getMessages };
