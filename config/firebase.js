import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
   apiKey: "AIzaSyBXfd44TiezK6JpzRQQLgo0RfavkkbkRvk",
  authDomain: "jobol-investments.firebaseapp.com",
  projectId: "jobol-investments",
  storageBucket: "jobol-investments.firebasestorage.app",
  messagingSenderId: "125248696266",
  appId: "1:125248696266:web:d7b7270d76457b9f10e933"
};

// Initialize Firebase only once
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export function getFirebaseAuth() {
  return getAuth(app);
}

export { app };
export default app;
