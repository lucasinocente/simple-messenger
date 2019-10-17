import React, { useEffect, useState  } from 'react';
import firebase, { messaging } from '../../firebase/Firebase';
import { isAdmin } from '../../firebase/helpers';

import './Messages.css';

const database = firebase.database();

const logout = async () => {
  try {
    await firebase.auth().signOut();
    window.location.href = '/login';
  } catch (error) {
    console.log('error logout', error);
  }
};

const addUser = async ({ uid, email }) => {
  return database.ref('users/' + uid).set({ uid, email });
};

const addUserToken = async ({ uid, token }) => {
  return database.ref('users/' + uid).update({ token });
};

const getUser = async ({ uid, email }) => {
  database.ref('/users/' + uid)
    .once('value')
    .then(function(snapshot) {
      const user = snapshot.val();
      if (!user) return addUser({ uid, email });
    });
};

const getMessages = async (room, setConversation) => {
  database.ref(`messages/${room}`)
    .on('value', snapshot => {
      const data = snapshot.val();
      if( !data ) return;

      const messages = Object.keys(data).map(function(message) {
        return data[message];
      });
      setConversation(messages);
    }
  );
};

const Messages = () => {
  const [message, setMessage] = useState();
  const [conversation, setConversation] = useState();
  const [user, setUser] = useState({});
  const room = window.location.pathname.split('/')[2];

  const sendMessage = async (event, uid, room, message) => {
    event.preventDefault();
  
    const messages = 
      database.ref().child(`messages/${room}`).push();
  
    messages.set({
      sender: uid,
      room,
      message,
      timestamp: Date.now()
    });

    setMessage('')
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async function(user) {
      if(!user) return window.location.href = '/login';

      const admin = await isAdmin(firebase);
      const roomOwner = user.uid === room;
      if(!admin && !roomOwner) return window.location.href = '/login';

      getUser(user);
      setUser(user);
      getMessages(room, setConversation);

      messaging.requestPermission()
        .then(async function() {
          const token = await messaging.getToken();
          addUserToken({ uid: user.uid, token });
        })
        .catch(function (err) {
          // TODO: Implment toaster
          console.log("Unable to get permission to notify.", err);
        });
      // TODO: Implement toaster
      // navigator.serviceWorker.addEventListener("message", (message) => console.log(message))
    });
  }, [room]);

  return (
    <div className="App">
      <header>
        Olá { user.email } <button type="button" onClick={logout}>Logout</button>
      </header>
      <section className="container-messages">
        <div className="container row">
          <div className="column column-messages">
            <div className="messages">
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
            </div>
          </div>
        </div>
      </section>
      <div className="form">
        <form onSubmit={(e) => sendMessage(e, user.uid, room, message)}>
          <input type="text" value={message} onChange={(e) => setMessage(e.target.value)}></input>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default Messages;
