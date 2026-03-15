// ============================================================
//  Firebase Configuration
//
//  HOW TO SET UP:
//  1. Go to https://console.firebase.google.com/
//  2. Create a new project (e.g. "arcade-zone")
//  3. Click "Add app" → Web (</> icon)
//  4. Register the app (no need for Firebase Hosting)
//  5. Copy the firebaseConfig object values below
//  6. In Firestore: Build → Firestore Database → Create database
//     → Start in TEST MODE (rules allow read/write for 30 days)
//  7. After 30 days, update rules so only writes are validated
// ============================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey:            "AIzaSyDAA3qGzBbvdk7NPTPhCvQ5TC8c5cGTS0s",
  authDomain:        "arcade-games-b80bc.firebaseapp.com",
  projectId:         "arcade-games-b80bc",
  storageBucket:     "arcade-games-b80bc.firebasestorage.app",
  messagingSenderId: "769498479760",
  appId:             "1:769498479760:web:dc8a6c3f8e3b260119ec15"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
