// import firebase
import firebase from "firebase/app";
import "firebase/firestore";

// config value from add firebase sdk script
const config = {
  apiKey: "AIzaSyBB6d0ZJ6-k1MmRhkWR9YWWkBN_ARh8G54",
  authDomain: "page-inspector.firebaseapp.com",
  projectId: "page-inspector",
  storageBucket: "page-inspector.appspot.com",
  messagingSenderId: "500699617087",
  appId: "1:500699617087:web:7bd7c8a441ed954a4f258a"
};

// init app
firebase.initializeApp(config);

// export default firestore
export default firebase.firestore();