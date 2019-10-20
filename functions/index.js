const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.sendNotification = functions.database.ref('/messages/{roomId}/{messageId}').onCreate((eventSnapshot, context) => {
  const roomId = context.params.roomId;
  const messageId = context.params.messageId;
  const senderId = eventSnapshot.val().sender;
  const receiverId = eventSnapshot.val().receiver;
  
  if (!eventSnapshot.val()) {
    return;
  }

  const getDeviceTokensPromise = admin
    .database()
    .ref(`/users/${receiverId}/token`)
    .once('value');

  return getDeviceTokensPromise.then(results => {
    const tokensSnapshot = results;

    if (!tokensSnapshot.val()) {
      return console.log('There are no notification token to send to.');
    }

    payload = {
      notification: {
        title: 'New Message',
        body: eventSnapshot.val().message
      },
      data: {
        title: 'New Message',
        body: eventSnapshot.val().message,
        eventName: 'new_message'
      }
    };

    return admin
      .messaging()
      .sendToDevice(tokensSnapshot.val(), payload)
      .then(response => {
        const tokensToRemove = [];
        const error = response.results.error;
        if (error) {
          console.error('Failure sending notification to', tokens, error);
          if (error.code === 'messaging/invalid-registration-token' || error.code === 'messaging/registration-token-not-registered') {
            tokensToRemove.push(tokensSnapshot.ref.remove());
          }
        }
        return Promise.all(tokensToRemove);
      });
  });
});
