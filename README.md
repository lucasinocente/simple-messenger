# Simple Messenger

Simple Messenger is a self-hosted tool for communicate to your friends :D

---

# How to use

## Install Client Application

1. Install dependencies
```
npm install
```

2. Create a Firebase Project (https://firebase.google.com)

3. Create a Auth Method at `Authentication > Sign-in method > Email/Password`

4. Enable first option and `e-mail link` too.

5. Create a Realtime Database Project

6. Setup environment variables
- Copy and rename `.env.example` to `.env.local`
- Replace `.env.local` content with your configuration

```
REACT_APP_API_KEY=your-web-api-key
REACT_APP_AUTH_DOMAIN=your-app.firebaseapp.com
REACT_APP_DATABASE_URL=https://your-app.firebaseio.com
REACT_APP_PROJECT_ID=your-app
REACT_APP_MESSEAGING_SENDER_ID=your-sender-id
REACT_APP_WEB_PUSH_CERTIFICATES=your-web-push-certificates
REACT_APP_APP_ID=-your-app-id
```

To discovery your key, at Firebase console go to `Settings > Project Settings`.

7. Change your sender id in `firebase-messaging-sw.js` and `manifest.json`.

8. Change your Database rule at `Database > rules` to:
```
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```
CAUTION! THIS WILL OPEN YOUR DATABASE! KEEP YOUR KEY SAFE!

Visit https://firebase.google.com/docs/database/security to learn more about security rules.

9. Run the project

```
npm start
```

## Install Admin Application

1. In the client application (http://localhost:3000) create a usar with your e-mail

2. Go to `admin` and install dependencies

```
cd admin
npm install
```

3. In `/admin/set-user-admin.js` line 11 set your e-mail. 

4. Download your credentials at Firebase console `Settings > Service accounts` - or [click here](https://console.firebase.google.com/project/_/settings/serviceaccounts/adminsdk).

5. Change this file for `simple-messenger-oss-firebase-adminsdk.json`. NEVER COMMIT YOUR CREDENTIAL JSON!

6. Run 
```
node set-user-admin.js;
```

Okay, your user now is admin and can see a list of contacts.

## Deploy firebase cloud functions

1. Go to `functions` and install dependencies

```
cd functions
npm install
```

2. Deploy functions by running `npm run deploy`

And you all set to go, notifications will be sent if browser is in background and messages exchange from user and admin.

## Contributing

Help us a build this:

![](https://lucas-inocente.storage.googleapis.com/1571195790101.photo4988079820080523380.jpg)
![](https://lucas-inocente.storage.googleapis.com/1571195790002.photo4988079820080523379.jpg)

