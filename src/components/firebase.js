import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC_rLBrXMV9HNvYurR3mcFPCQ4DeYJamgE",
    authDomain: "practica-react-1339b.firebaseapp.com",
    projectId: "practica-react-1339b",
    storageBucket: "practica-react-1339b.appspot.com",
    messagingSenderId: "555174278400",
    appId: "1:555174278400:web:47c54b294bab3998c8efe5",
    measurementId: "G-KCVM525DLG"
  };
  
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;