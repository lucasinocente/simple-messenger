import React, { useEffect, useState  } from 'react';
import firebase from '../../firebase/Firebase';

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

const sendMessage = async (event, uid, message) => {
  event.preventDefault();

  const messages = 
    database.ref().child(`messages/${uid}`).push();

  return messages.set({
    room: uid,
    sender: uid,
    message,
    timestamp: Date.now()
  });
};

const getUser = async ({ uid, email }) => {
  database.ref('/users/' + uid)
    .once('value')
    .then(function(snapshot) {
      if(snapshot.val()) {
        console.log('user!', snapshot.val())
      } else {
        addUser({ uid, email });
      }
    });
};

const getMessages = async (uid, setConversation) => {
  database.ref(`messages/${uid}`)
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
  const [uid, setUid] = useState();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async function(user) {
      if (!user) return window.location.href = '/login';

      const { uid, email } = user;
      setUid(uid);
      getUser({ uid, email });
      getMessages(uid, setConversation);
    });
  }, []);

  return (
    <div className="App">
      <section className="container-messages">
        <header>
          <button type="button" onClick={logout}>Logout</button>
        </header>
        <div className="container row ">
          <div className="column column-messages">
            <div className="messages">
              {
                conversation && conversation.map((item, key) =>
                  <div className="message" key={key}>
                    {item.message}
                  </div>
                )
              }
            </div>
            <div className="form">
              <form onSubmit={(e) => sendMessage(e, uid, message)}>
                <input type="text" onChange={(e) => setMessage(e.target.value)}></input>
                <button type="submit">Send</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Messages;
