import React, { useEffect, useState  } from 'react';
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

const addUserToken = async ({ uid, token }) => {
  return database.ref('users/' + uid).update({ token });
};

const getContacts = async (setContacts) => {
  database.ref(`users/`)
    .on("value", snapshot => {
			const data = snapshot.val();
			if (!data) return;

			const contacts = Object.keys(data)
			.map(function(message) {
				return data[message];
			})
			.filter(function(contact) {
				return contact.email !== firebase.auth().currentUser.email;
			});

			return setContacts(contacts);
    });
};

const addAdminToConversation = async (history, user, room) => {
  await database.ref(`messages/${room}`).update({ admin: user.uid });
  history.push(`/messages/${room}`);
};

const Messages = ({ history }) => {
  const [contacts, setContacts] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async function(user) {
      if (!user) return (window.location.href = "/login");

      const admin = await checkIsAdmin(firebase);
      if (!admin) return window.location.href = '/login';
      setUser(user);

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

      return getContacts(setContacts);
    });
  }, []);

  return (
    <div className="App">
      <section className="container-messages">
        <header>
          <button type="button" onClick={logout}>
            Logout
          </button>
        </header>
        <div className="container row">
          <div className="column column-messages">
            <div className="contacts">
                { 
                  contacts && 
                    contacts.map(({ uid, email }, key) =>
                      <div className="message" key={key}>
                        <a 
                          href="#"
                          onClick={() => addAdminToConversation(history, user, uid)}
                          className="message"
                        >
                          {email}
                        </a>
                      </div>
                    )
                }
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Messages;
