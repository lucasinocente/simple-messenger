import React, { useEffect } from 'react';
import './MessagesList.scss'

const MessagesList = ({ conversation, user }) => {
  useEffect(() => {
    const messages = document.getElementById("messages-list");
    messages.scrollTop = messages.scrollHeight;
  }, [conversation]);
  console.log(conversation)
  return (
    <div className="messages-list" id="messages-list">
      <div className="card">
        {
          conversation ? conversation.map((message, key) =>
            <div className="card-content" key={key}>
              <div
                className={`content ${
                  message.sender.uid === user.uid ? 'send' : 'received'
                }`}
                key={key}
              >
                <div className="sender">
                  <p>
                    <strong>{message.sender ? message.sender.email : ''}</strong>
                  </p>
                </div>
                <p>{message.text || message.message}</p>
              </div>
            </div>
          ) :
          <div className="card-content">
            <p>Carregando mensagens...</p>
          </div> 
        }
      </div>
    </div>
  );
}

export default MessagesList;