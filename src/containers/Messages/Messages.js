import React, { useEffect, useState  } from 'react';

import Header from '../../components/Header/Header';
import Page from '../../components/Page/Page';
import MessagesList from '../../components/MessagesList/MessagesList';

import firebase, { messaging } from '../../firebase/Firebase';
import { checkIsAdmin } from '../../firebase/helpers';

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

const getMessages = async (room, setConversation, setAdminId) => {
  database.ref(`messages/${room}`)
    .on('value', snapshot => {
      const data = snapshot.val();
      if( !data ) return;

      const messages = Object.keys(data).map(function (message) {
        if (message === 'admin') {
          setAdminId(data[message])
          return false;
        }
        return data[message];
      }).filter(item => !!item);
      setConversation(messages);
    }
  );
};

const Messages = () => {
  const [message, setMessage] = useState();
  const [conversation, setConversation] = useState([]);
  const [user, setUser] = useState({ email: 'carregando...'});
  const [isAdmin, setIsAdmin] = useState()
  const [adminId, setAdminId] = useState()
  const room = window.location.pathname.split('/')[2];

  const sendMessage = async (event, uid, room, message, adminId, isAdmin) => {
    event.preventDefault();
  
    const messages = 
      database.ref().child(`messages/${room}`).push();
  
    messages.set({
      sender: uid,
      receiver: isAdmin ? room : adminId,
      room,
      message,
      timestamp: Date.now()
    });

    setMessage('')
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async function(user) {
      if(!user) return window.location.href = '/login';

      const admin = await checkIsAdmin(firebase);
      const roomOwner = user.uid === room;
      if(!admin && !roomOwner) return window.location.href = '/login';

      setIsAdmin(admin);
      getUser(user);
      setUser(user);
      getMessages(room, setConversation, setAdminId);

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
  }, [isAdmin, room]);

  return (
    <>
      <Header>
        <div class="navbar-end">
          <div class="navbar-item">
            Olá, { user.email }!
          </div>
          <div class="navbar-item">
            <button
              type="button"
              class="button is-primary"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </div>
      </Header>
      <Page>
        <MessagesList conversation={conversation} user={user} />
        <div className="form">
          <form
            onSubmit={
              (e) => sendMessage(e, user.uid, room, message, adminId, isAdmin)
            }
          >
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}>
            </input>
            <button type="submit">Send</button>
          </form>
        </div>
      </Page>
    </>
  );
}

export default Messages;
