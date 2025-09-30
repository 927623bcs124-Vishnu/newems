// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  "projectId": "studio-8601033038-49563",
  "appId": "1:444575341405:web:9ab27b7899ac50768da6b4",
  "apiKey": "AIzaSyAST6g1-HFH2fmkF8kxqV1Pv4IpkzR_Q40",
  "authDomain": "studio-8601033038-49563.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "444575341405"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
