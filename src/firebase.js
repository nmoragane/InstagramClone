import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyB955i_2EJ8GUQ_0lMc61hPGUszyQcOkDs",
    authDomain: "intagram-clone-7eac0.firebaseapp.com",
    projectId: "intagram-clone-7eac0",
    storageBucket: "intagram-clone-7eac0.appspot.com",
    messagingSenderId: "77417289629",
    appId: "1:77417289629:web:4d3dcc3666283e2d134174",
    measurementId: "G-0HW47K4YYB"
  });

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();

  export  {db, auth, storage};