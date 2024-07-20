// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOEzXemcIXKuiVtC3uPYaeQTp07i1wQoU",
  authDomain: "watchlist-ria.firebaseapp.com",
  projectId: "watchlist-ria",
  storageBucket: "watchlist-ria.appspot.com",
  messagingSenderId: "654301305680",
  appId: "1:654301305680:web:ad0afa7885cf0e976bea55",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
