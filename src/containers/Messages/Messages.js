import React from 'react';
import './Messages.css';

const Messages = () => {
  return (
    <div className="App">
      <section className="container row">
        <div className="column column-contacts">
          <div className="contacts">
            <div className="contact selected">
              Pedro Inocente
            </div>
            <div className="contact">
              Maíra Martini
            </div>
            <div className="contact">
              Rosane Inocente
            </div>
          </div>
        </div>
        <div className="column column-messages">
          <div className="messages">
            <div className="message message-received">
              Olá!
            </div>
            <div className="message message-send">
              Oi, como vai você?
            </div>
          </div>
          <div className="form">
            <form>
              <input type="text"></input>
              <button type="button">Send</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Messages;
