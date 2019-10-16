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

3. Setup environment variables
- Copy and rename `.env.example` to `.env.local`
- Replace `.env.local` content with your configuration

```
REACT_APP_API_KEY=your-web-api-key
REACT_APP_AUTH_DOMAIN=your-app.firebaseapp.com
REACT_APP_DATABASE_URL=https://your-app.firebaseio.com
REACT_APP_PROJECT_ID=your-app
```

To discovery your key, at Firebase console go to `Settings > Project Settings`.

4. Run the project

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

## Contributing

Help us a build this:

![](https://lucas-inocente.storage.googleapis.com/1571195790101.photo4988079820080523380.jpg)
![](https://lucas-inocente.storage.googleapis.com/1571195790002.photo4988079820080523379.jpg)

