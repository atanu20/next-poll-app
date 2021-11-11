import firebase from 'firebase'


const firebaseConfig = {
  apiKey: "AIzaSyCmHxUSBsQgvUnbNynslwfpLVhZDJb8K78",
  authDomain: "next-poll-37c2c.firebaseapp.com",
  projectId: "next-poll-37c2c",
  storageBucket: "next-poll-37c2c.appspot.com",
  messagingSenderId: "655602940149",
  appId: "1:655602940149:web:b742b065c3c8f98b0f6dbc"
};


if(!firebase.apps.length) firebase.initializeApp(firebaseConfig)


// const authprovider  = firebase.auth.GoogleAuthProvider()
// const db = firebase.firestore()

// const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp

export default firebase


