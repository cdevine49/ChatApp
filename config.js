import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCKPf6NcdtQ4FPHOMRR3nHiStbbsdP2wR4",
  authDomain: "chatter-bbfc1.firebaseapp.com",
  databaseURL: "https://chatter-bbfc1.firebaseio.com/",
  storageBucket: "chatter-bbfc1.appspot.com",
};

module.exports = firebase.initializeApp(firebaseConfig);
