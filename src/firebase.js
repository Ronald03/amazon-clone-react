import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCV-dr9kDXviMkxGPcegqBpMYmckj82kvo",
  authDomain: "clone-8aca9.firebaseapp.com",
  databaseURL: "https://clone-8aca9.firebaseio.com",
  projectId: "clone-8aca9",
  storageBucket: "clone-8aca9.appspot.com",
  messagingSenderId: "814791603055",
  appId: "1:814791603055:web:ea5ad64ad2954b28e92e9a",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
