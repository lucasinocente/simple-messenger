import React from 'react';

const MessagesList = ({ conversation, user }) => (
  <>
    {
      conversation && conversation.map((item, key) =>
        <div 
          className={`message ${item.sender === user.uid ? 'send' : 'received'}`}
          key={key}
        >
          <span className="inner">
            {item.message}
          </span>
        </div>
      )
    }
  </>
);

export default MessagesList;