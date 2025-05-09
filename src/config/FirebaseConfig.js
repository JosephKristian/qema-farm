import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD-jh_Dd2anJ1poULWVinTvct33mQF6_Ag",
  authDomain: "qema-farm-15c45.firebaseapp.com",
  databaseURL: "https://qema-farm-15c45-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "qema-farm-15c45",
  storageBucket: "qema-farm-15c45.firebasestorage.app",
  messagingSenderId: "160346592714",
  appId: "1:160346592714:web:e25e5f1a412fe6c58aab33",
  measurementId: "G-VR5C0V3ZML"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);

export { database, auth, storage };