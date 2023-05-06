import React, { useState } from "react";

const ChatComponent = ({ chats }) => {
  const [currentChat, setCurrentChat] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [chatOpened, setChatOpened] = useState(false);

  const handleChatClick = (chat) => {
    setCurrentChat(chat);
    setChatOpened(true);
  };

  const getLastMessageForCurrentOrder = (messageList) => {
    if (messageList.length > 0) {
      const lastMessage = messageList[messageList.length - 1];
      return lastMessage.message;
    }
    return "";
  };

  const getLastMessageTimeStamp = (messageList) => {
    if (messageList.length > 0) {
      const lastMessage = messageList[messageList.length - 1];
      return lastMessage.timestamp;
    }
    return "";
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const showAllChats = (chats) => {
    return chats.map((chat) => (
      <div
        className="chat-item"
        key={chat.id}
        onClick={() => handleChatClick(chat)}
        data-order-id={chat.orderId}
      >
        <div className="image-wrapper">
          <img src={chat.imageURL} alt={chat.title} />
        </div>
        <div className="chat-content">
          <p className="chat-title">{chat.title}</p>
          <p className="chat-order-id">OrderId : {chat.orderId}</p>
          <p class="chat-last-message">
            {" "}
            {getLastMessageForCurrentOrder(chat.messageList)}{" "}
          </p>
        </div>
        <div className="date-wrapper">
          <p> {getLastMessageTimeStamp(chat.messageList)} </p>
        </div>
      </div>
    ));
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const getSearchChats = (chats) => {
    return chats
      .filter((chat) => {
        return (
          chat.title
            .toLocaleLowerCase()
            .startsWith(searchText.toLocaleLowerCase()) ||
          searchText == chat.orderId
        );
      })
      .map((chat) => (
        <div
          className="chat-item"
          key={chat.id}
          onClick={() => handleChatClick(chat)}
        >
          <div className="image-wrapper">
            <img src={chat.imageURL} alt={chat.title} />
          </div>
          <div className="chat-content">
            <p>{chat.title}</p>
            <p>OrderId : {chat.orderId}</p>
            <p> {getLastMessageForCurrentOrder(chat.messageList)} </p>
          </div>
          <div className="date-wrapper">
            <p> {getLastMessageTimeStamp(chat.messageList)} </p>
          </div>
        </div>
      ));
  };

  const handChatChange = (e) => {
    if (e.keyCode == 13) {
      let currentMessage = e.target.value;
      let currentChatObject = {
        messageId: "msg4",
        message: currentMessage,
        timestamp: new Date().getTime(),
        sender: "USER",
        messageType: "text"
      };

      setCurrentChat({
        ...currentChat,
        messageList: [...currentChat.messageList, currentChatObject]
      });
      console.log(currentChat);
    }
  };

  return (
    <div className="chat-wrapper">
      <div className="chat-container">
        <div className="chat-list-wrapper">
          <div className="search-wrapper">
            <input
              placeholder="Start Typing for Search"
              type="text"
              className="search-input"
              onChange={handleSearchChange}
            />
          </div>
          <div className="chat-list">
            {searchText.trim() == ""
              ? showAllChats(chats)
              : getSearchChats(chats)}
          </div>
        </div>
        <div class={`chat-thread-window ${chatOpened ? "chat-active" : ""}`}>
          {currentChat && (
            <div className="chat-ux">
              <div class="chat-user-heading">
                <img src={currentChat.imageURL} alt="" />
                <h2></h2>
                {currentChat.title}
              </div>
              <div className="chat-thread">
                {currentChat.messageList.map((message) => (
                  <div
                    key={message.messageId}
                    className={`message ${message.sender}`}
                  >
                    <p>{message.message}</p>
                    <span>{formatTimestamp(message.timestamp)}</span>
                  </div>
                ))}
              </div>
              <input type class="chat-input" onKeyDown={handChatChange} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
