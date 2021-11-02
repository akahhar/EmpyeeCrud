import * as firebase from "firebase";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmSBzLG3U-iojL9oK4OfPSSi8XNt4mqeU",
  authDomain: "employecrud.firebaseapp.com",
  projectId: "employecrud",
  storageBucket: "employecrud.appspot.com",
  messagingSenderId: "680504293443",
  appId: "1:680504293443:web:b1be55484d90991404bcf6",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export { firebase };
