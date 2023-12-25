// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDywcjwwnFepPf3KqH29wzPHxQf84JRJP4",
  authDomain: "knowledge-corner-1.firebaseapp.com",
  projectId: "knowledge-corner-1",
  storageBucket: "knowledge-corner-1.appspot.com",
  messagingSenderId: "801452568103",
  appId: "1:801452568103:web:a18f3f5053db09153e2802",
  measurementId: "G-CQLHGBSTBS",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
