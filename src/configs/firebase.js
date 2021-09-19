import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyA16EJYhNCHLsUOs6L7qGOCveE9tprR1bU",
  authDomain: "task-management-test.firebaseapp.com",
  projectId: "task-management-test",
  storageBucket: "task-management-test.appspot.com",
  messagingSenderId: "967212194840",
  appId: "1:967212194840:web:7903d404ab7f86bb00376d",
  measurementId: "G-S2MVSHK89T",
};

firebase.initializeApp(firebaseConfig);
// const timestamp = firebase.firestore.FieldValue.serverTimestamp;
const db = firebase.firestore();

export default db;
