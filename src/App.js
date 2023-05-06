import "./styles.css";
import ChatComponent from "./components/ChatComponent";
import { useEffect, useState } from "react";

export default function App() {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    async function fetchChats() {
      let response = await fetch(
        "https://my-json-server.typicode.com/codebuds-fk/chat/chats"
      );
      console.log(response);
      let data = await response.json();
      console.log(data);
      setChats(data);
    }
    fetchChats();
  }, []);

  return (
    <div className="App">
      <ChatComponent chats={chats} />;
    </div>
  );
}

const apiResponse = [
  {
    id: 1,
    title: "Flipkart Support",
    imageURL:
      "https://rukminim1.flixcart.com/image/300/300/k0vbgy80pkrrdj/speaker/mobile-tablet-speaker/4/n/n/boat-stone-grenade-original-imafg96ffpnpgdv4.jpeg?q=90",
    orderId: "OD1234567890",
    latestMessageTimestamp: 1632205237669,
    messageList: [
      {
        messageId: "msg1",
        message: "Hi, what can I help you with?",
        timestamp: 1632205137669,
        sender: "BOT",
        messageType: "text"
      },
      {
        messageId: "msg2",
        message: "Need help with this order",
        timestamp: 1632205237669,
        sender: "USER",
        messageType: "text"
      }
    ]
  },
  {
    id: 2,
    title: "Another Chat",
    imageURL: "https://example.com/another-image.jpg",
    orderId: "OD0987654321",
    latestMessageTimestamp: 1632205237669,
    messageList: [
      {
        messageId: "msg3",
        message: "Hello!",
        timestamp: 1632205137669,
        sender: "BOT",
        messageType: "text"
      },
      {
        messageId: "msg4",
        message: "How can I assist you?",
        timestamp: 1632205237669,
        sender: "USER",
        messageType: "text"
      }
    ]
  }
];
