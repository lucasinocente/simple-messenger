const admin = require("firebase-admin");
const serviceAccount = require("./simple-messenger-oss-firebase-adminsdk.json");

console.log('Inicializando aplicação...')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://simple-messenger-oss.firebaseio.com"
});

admin.auth().getUserByEmail('your-email-here@something.com').then(async (user) => {
  console.log('Verificando', user.email);

  if(user.customClaims && user.customClaims.admin) {
    console.log('Usuário já é admin!');
    process.exit();
  }

  console.log('Adicionando admin para', user.email);

  await admin.auth().setCustomUserClaims(user.uid, {
    admin: true
  });

  console.log('Adicionado!');
  process.exit();
})
.catch((error) => {
  console.log(error);
  process.exit();
});