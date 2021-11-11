import firebase from "./firebase-config";

export const googleProvider=new firebase.auth.GoogleAuthProvider()
export const db=firebase.firestore()
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp