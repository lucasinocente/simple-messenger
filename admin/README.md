# Configurar admin

1) `npm install`

2) Configure na linha 11 do arquivo `set-user-admin.js` o seu e-mail.

3) Faça download de suas credencias em `Settings > Service accounts` - ou [clique aqui](https://console.firebase.google.com/project/_/settings/serviceaccounts/adminsdk).

4) Adicione esta credencial na raíz do projeto (**Não faça commit deste arquivo!**) trocando pelo arquivo `simple-messenger-oss-firebase-adminsdk.json`.

5) `node set-user-admin.js`;

Pronto, seu usuário está pronto para ser um administrador.