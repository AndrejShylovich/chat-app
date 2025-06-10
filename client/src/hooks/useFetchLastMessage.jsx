import { useContext, useEffect, useState } from "react";
import { baseUrl, getRequest } from "../utils/services";
import { ChatContext } from "../context/ChatContext";

export const useFetchLastMessage = (chat) => {
  const { newMessage, notifications, messages } = useContext(ChatContext);
  const [latestMessage, setLatestMessage] = useState(null);

  useEffect(() => {
    const getMessages = async () => {
      const responce = await getRequest(`${baseUrl}/messages/${chat?._id}`);
      if (responce.error) {
        return console.log("Error getting messages...", error);
      }
      const lastMessage = responce[responce?.length - 1];
      setLatestMessage(lastMessage);
    };
    getMessages();
  }, [newMessage, notifications, messages]);

  return { latestMessage };
};
