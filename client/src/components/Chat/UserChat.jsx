import { useContext } from "react";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipientUser";
import { Stack } from "react-bootstrap";
import avarter from "../../assets/undraw_Male_avatar_g98d.png";
import { ChatContext } from "../../context/ChatContext";
import { useFetchLastMessage } from "../../hooks/useFetchLastMessage";
import { unreadNotificationsFunc } from "../../utils/unreadNotifications";
import moment from "moment";

function UserChat(chat) {
  const { recipientUser } = useFetchRecipientUser(chat.chat, chat.user);

  const { latestMessage } = useFetchLastMessage(chat.chat);

  const { onlineUsers, notifications, markThisUserNotificationsAsRead } =
    useContext(ChatContext);
  const unreadNotifications = unreadNotificationsFunc(notifications);

  const thisUserNotifications = unreadNotifications?.filter(
    (n) => n.senderId == recipientUser?._id
  );

  const isOnline = onlineUsers?.some((user) => {
    user?.userId === recipientUser?.id;
  });

  const truncateText = (text) => {
    let shortText = text.substring(0, 20);
    if (text.length > 20) {
      shortText = shortText + "...";
    }
    return shortText;
  };
  const checkArray = onlineUsers?.filter(
    (onlineUser) => onlineUser.userId === recipientUser?._id
  );
  
  return (
    <Stack
      direction="horizontal"
      gap={3}
      className="user-card align-items-center p-2 justify-content-between"
      role="button"
      onClick={() => {
        if (thisUserNotifications?.length !== 0) {
          markThisUserNotificationsAsRead(thisUserNotifications, notifications);
        }
      }}
    >
      <div className="d-flex">
        <div className="me-2">
          <img src={avarter} height="35px" />
          {checkArray.map((message) => (
            <div key={message.userId}>
              <span className="user-online"></span>
            </div>
          ))}
        </div>
        <div className="text-context">
            <div className="name">{recipientUser?.username}</div>
          <div className="text">
            {latestMessage?.text && (
              <span>{truncateText(latestMessage?.text)}</span>
            )}
          </div>
        </div>
      </div>
      <div className="d-flex flex-column align-items-end">
        <div className="date">
          {moment(latestMessage?.createdAt).calendar()}
        </div>
        <div
          className={
            thisUserNotifications?.length > 0 ? "this-user-notifications" : ""
          }
        >
          {thisUserNotifications?.length > 0
            ? thisUserNotifications?.length
            : ""}
        </div>
        <span className={isOnline ? "user-online" : ""}></span>
      </div>
    </Stack>
  );
}

export default UserChat;
