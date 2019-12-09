import React, { useEffect } from 'react';
import './MessagesList.scss'

const MessagesList = ({ conversation, user }) => {
  useEffect(() => {
    const messages = document.getElementById("messages-list");
    messages.scrollTop = messages.scrollHeight;
  }, [conversation]);

  return (
    <div className="messages-list" id="messages-list">
      <div className="card">
        {
          conversation ? conversation.map((item, key) =>
            <div className="card-content">
              <div
                className={`content ${
                  item.sender === user.uid ? 'send' : 'received'
                }`}
                key={key}
              >
                {item.message}
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