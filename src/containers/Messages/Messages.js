import React, { useEffect, useState  } from 'react';
import firebase from '../../firebase/Firebase';

import './Messages.css';

const database = firebase.firestore();

const logout = async () => {
  try {
    await firebase.auth().signOut();
    window.location.href = '/login';
  } catch (error) {
    console.log('error logout', error);
  }
};

const addUser = async (user, database) => {
  const returns = await database.collection("users").doc(user.uid).set({
    uid: user.uid
  });
  console.log(returns);
};

const sendMessage = async (event, uid, message) => {
  event.preventDefault();
  const returns = await database.collection("messages").add({
    room: uid,
    uid,
    message,
    timestamp: Date.now()
  });
  console.log(returns);
};

const getUser = async (uid) => {
  const user = await database.collection("users").doc(uid);

  user.get().then(async function(user) {
    if (user.exists) {
      console.log("Document data:", user.data());
    } else {
      await addUser(user, database);
    }
    return;
  }).catch(function(error) {
      console.log("Error getting document:", error);
  });
};

const getMessages = async (uid, setConversation) => {
  try {
    const messages = database.collection("messages").where("room", "==", uid);

    messages.get().then(function(snapshot) {

    //  const messages = [];
      snapshot.forEach(function(snap) {
        console.log(snap.id, " => ", snap.data());
        const { message, uid } = snap.data();
      });

     // setConversation(messages);
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
  } catch (error) {
    console.log("Error cathing document:", error);
  }

};

const Messages = () => {
  const [conversation, setConversation] = useState();
  const [message, setMessage] = useState();
  const [uid, setUid] = useState();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async function(user) {
      if (user) {
        const { uid } = user;
        setUid(uid);
        getUser(uid);
        getMessages(uid, setConversation);
      } else {
        window.location.href = '/login';
      }
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
              <div className="message message-received">
                Olá!
              </div>
              <div className="message message-send">
                Oi, como vai você?
              </div>
            </div>
            { conversation }
            <div className="form">
              <form>
                <input type="text" onChange={(e) => setMessage(e.target.value)}></input>
                <button type="button" onClick={(e) => sendMessage(e, uid, message)}>Send</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Messages;
