// import React from 'react';
import '../styles/ChatBot.css';

const ChatBot = () => {
  return (
    <div className="chat-container">
      <div className="chat-message">
        <img src="/fox-avatar.png" alt="Fox Avatar" className="chat-avatar" />
        <div className="message-bubble">
          this is chatbot text
        </div>
      </div>
    </div>
  );
};

export default ChatBot;