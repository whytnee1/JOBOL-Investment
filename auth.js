
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { cert, getApps, initializeApp } from "firebase-admin/app";

// Read Firebase Admin credentials
const projectId = process.env.AUTH_FIREBASE_PROJECT_ID;
const clientEmail = process.env.AUTH_FIREBASE_CLIENT_EMAIL;

const rawPrivateKey = process.env.AUTH_FIREBASE_PRIVATE_KEY;

// Convert escaped newline characters into actual newlines
const privateKey = rawPrivateKey
  ?.replace(/\\n/g, "\n")
  .trim();

// Validate Firebase configuration
if (!projectId || !clientEmail || !privateKey) {
  throw new Error(
    "Firebase Admin credentials are missing. Check AUTH_FIREBASE_PROJECT_ID, AUTH_FIREBASE_CLIENT_EMAIL, and AUTH_FIREBASE_PRIVATE_KEY in your environment variables."
  );
}

// Initialize Firebase Admin only once
const firebaseApp =
  getApps().find((app) => app.name === "[DEFAULT]") ||
  initializeApp({
    credential: cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  });

// NextAuth configuration
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],

  adapter: FirestoreAdapter({
    credential: cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  }),
});

