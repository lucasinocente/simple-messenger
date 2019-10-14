export const isAdmin = (firebase) => {
  return firebase.auth().currentUser.getIdTokenResult()
    .then((idTokenResult) => {
      if (idTokenResult.claims.admin) {
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
} 