import { useState } from "react";
import dayjs from "dayjs";
import { Chatbot } from "supersimpledev";
import loadingSpinner from "../assets/loading-spinner.gif";
import "./ChatInput.css";

export function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState("");
  // const [isLoading, setIsLoading] = React.useState(false);

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  async function sendMessage() {
    // if (isLoading || inputText === "") {
    //   return;
    // }

    // setIsLoading(true);

    setInputText("");

    const newChatMessages = [
      ...chatMessages,

      {
        message: inputText,
        sender: "user",
        id: crypto.randomUUID(),
        time: dayjs().valueOf(),
      },
    ];

    /* This creates a temporary Loading... message
        Because I don't to save this message in newChatMessages,
        it will be remove later, when the response is added.
    */
    setChatMessages([
      ...newChatMessages,

      {
        message: <img src={loadingSpinner} className="loading-spinner" />,
        sender: "robot",
        id: crypto.randomUUID(),
      },
    ]);

    const response = await Chatbot.getResponseAsync(inputText);

    setChatMessages([
      ...newChatMessages,

      {
        message: response,
        sender: "robot",
        id: crypto.randomUUID(),
        time: dayjs().valueOf(),
      },
    ]);

    // setIsLoading(false);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      sendMessage();
    } else if (event.key === "Escape") {
      setInputText("");
    }
  }

  function clearMessages() {
    setChatMessages([]);
  }

  return (
    <div className="chat-input-container">
      <input
        className="chat-input"
        placeholder="Send a message to Chatbot"
        size="30"
        onChange={saveInputText}
        onKeyDown={handleKeyDown}
        value={inputText}
      />
      <button className="send-button" onClick={sendMessage}>
        Send
      </button>

      <button onClick={clearMessages} className="clear-button">
        Clear
      </button>
    </div>
  );
}
