import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD9CJvBTyfeWrlgV7Xk1tjt3Nvlp3ZkPO0",
  authDomain: "esp8266-led-control-1f5c7.firebaseapp.com",
  databaseURL: "https://esp8266-led-control-1f5c7-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "esp8266-led-control-1f5c7",
  storageBucket: "esp8266-led-control-1f5c7.firebasestorage.app",
  messagingSenderId: "482840490798",
  appId: "1:482840490798:web:4293da5b99f8198086c0bf",
  measurementId: "G-LCD0NH66BD"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database
const database = getDatabase(app);

// ✅ IMPORTANT EXPORT
export { database };