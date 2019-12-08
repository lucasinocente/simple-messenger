import React from 'react';
import './MessagesList.scss'

const MessagesList = ({ conversation, user }) => (
  <div className="messages-list">
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

export default MessagesList;