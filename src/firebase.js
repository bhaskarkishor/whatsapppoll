import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
// import 'firebase/functions';
// import 'firebase/storage';

const firebaseConfig = { 
  apiKey: "AIzaSyC88Bz0jV2a2t3nYreebvQoTnl6TEdhSv0",
  authDomain: "cod-clan-name-poll.firebaseapp.com",
  projectId: "cod-clan-name-poll",
  storageBucket: "cod-clan-name-poll.appspot.com",
  messagingSenderId: "37230535426",
  appId: "1:37230535426:web:1fbf0f278356b8897d981b"
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : '';

if(window.location.hostname === 'localhost') {
  firebase.firestore().useEmulator('localhost', 8090);
  firebase.auth().useEmulator("http://localhost:9099");
  // Firestore.functions().useEmulator('localhost', 5001);
  /* OLD implementation */
  // firebase.firestore().settings({ host: 'localhost:8080', ssl: false });
  // firebase.functions().useFunctionsEmulator('http://localhost:5001');
}

// export const GoogleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const firebaseAuth = firebase.auth();
export const db = firebase.firestore();
// export const firebaseFunctions = firebase.functions();
// export const firebaseStorage = firebase.storage();
export default firebase;
