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

const addUserToken = async ({ uid, token }) => {
  return database.ref('users/' + uid).update({ token });
};

const getContacts = async (setContacts) => {
  database.ref(`users/`)
    .on('value', snapshot => {
      const data = snapshot.val();
      if( !data ) return;
      
      const contacts = Object.keys(data).map(function(message) {
        return data[message];
      });

      return setContacts(contacts);
    }
  );
};

const Messages = () => {
  const [contacts, setContacts] = useState();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async function(user) {
      if(!user) return window.location.href = '/login';

      const admin = await isAdmin(firebase);
      if (!admin) return window.location.href = '/login';

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
          <button type="button" onClick={logout}>Logout</button>
        </header>
        <div className="container row">
          <div className="column column-messages">
            <div className="contacts">
              {
                contacts && contacts.map(({ uid, email }, key) =>
                  <div className="message" key={key}>
                    <a href={`/messages/${uid}`} className="message">
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
}

export default Messages;
