import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyBfn1o9zv93n0GF9aKCx2rCGrANQs02qAA",
    authDomain: "fuwaa-4a733.firebaseapp.com",
    databaseURL: "https://fuwaa-4a733.firebaseio.com",
    projectId: "fuwaa-4a733",
    storageBucket: "fuwaa-4a733.appspot.com",
    messagingSenderId: "295558392573"
  };

  firebase.initializeApp(config);

  export default firebase;