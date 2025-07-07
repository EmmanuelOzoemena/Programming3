import dayjs from "dayjs";
import RobotProfileImage from "../assets/robot.png";
import UserProfileImage from "../assets/user.png";
import "./ChatMessage.css";

export function ChatMessage({ message, sender, time }) {
  // const message = props.message;
  // const sender = props.sender;
  // const { message, sender } = props;

  /*
    if (sender === "robot") {
      return (
        <div>
          <img src="robot.png" alt="user picture" width="40" />
          {message}
        </div>
      );
    }
  */

  return (
    <div
      className={sender === "user" ? "chat-message-user" : "chat-message-robot"}
    >
      {sender === "robot" && (
        <img
          className="chat-message-profile"
          src={RobotProfileImage}
          alt="robot picture"
        />
      )}

      <div className="chat-message-text">
        {message}

        {time && (
          <div className="chat-message-time">{dayjs(time).format("h:mma")}</div>
        )}
      </div>

      {sender === "user" && (
        <img
          className="chat-message-profile"
          src={UserProfileImage}
          alt="user picture"
        />
      )}
    </div>
  );
}
