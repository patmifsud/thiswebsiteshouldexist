import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseApp = firebase.initializeApp({
   apiKey: "AIzaSyDH3AFJvLZDKXXeaH0U8XOpBiOEeCEwnwo",
   authDomain: "thiswebsiteshouldexist.firebaseapp.com",
   projectId: "thiswebsiteshouldexist",
   storageBucket: "thiswebsiteshouldexist.appspot.com",
   messagingSenderId: "264813934238",
   appId: "1:264813934238:web:f2f1e70ed3ab0b67176d8f",
   measurementId: "G-MR9Z7YXV58"
})

const db = firebaseApp.firestore();

export {db};