const chatModel = require("../models/chatModel");

const createChat = async (req, res) => {
  const { firstId, secondId } = req.body;
  try {
    const chat = await chatModel.findOne({
      members: { $all: { firstId, secondId } },
    });
    if (chat) return res.status(200).json(chat);
    const newChat = new chatModel({ members: [firstId, secondId] });
    const responce = await newChat.save();
    res.status(200).json(responce);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const findUserChats = async (req, res) => {
  const userId = req.params.userId;
  try {
    const chats = await chatModel.find({
      members: { $in: [userId] },
    });
    res.status(200).json(chats);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const findChat = async (req, res) => {
  const { firstId, secondId } = req.body;
  try {
    const chat = await chatModel.findOne({
      members: { $all: [firstId, secondId]  },
    });
    res.status(200).json(chat);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {createChat,findUserChats,findChat};

/*

import { Request, Response } from "express";
import chatModel from "../models/chatModel";

export const createChat = async (req: Request, res: Response): Promise<void> => {
  const { firstId, secondId } = req.body;
  try {
    const chat = await chatModel.findOne({
      members: { $all: [firstId, secondId] },
    });
    if (chat) {
      res.status(200).json(chat);
      return;
    }

    const newChat = new chatModel({ members: [firstId, secondId] });
    const response = await newChat.save();
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const findUserChats = async (req: Request, res: Response): Promise<void> => {
  const userId = req.params.userId;
  try {
    const chats = await chatModel.find({
      members: { $in: [userId] },
    });
    res.status(200).json(chats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const findChat = async (req: Request, res: Response): Promise<void> => {
  const { firstId, secondId } = req.body;
  try {
    const chat = await chatModel.findOne({
      members: { $all: [firstId, secondId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};


*/