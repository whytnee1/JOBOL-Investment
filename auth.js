
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { cert } from "firebase-admin/app";

const projectId = process.env.AUTH_FIREBASE_PROJECT_ID;
const clientEmail = process.env.AUTH_FIREBASE_CLIENT_EMAIL;

// Convert escaped newline characters into real newlines
const privateKey = process.env.AUTH_FIREBASE_PRIVATE_KEY
  ?.replace(/\\n/g, "\n")
  .trim();

if (!projectId || !clientEmail || !privateKey) {
  throw new Error(
    "Firebase Admin credentials are missing. Check your Netlify environment variables."
  );
}

if (
  !privateKey.startsWith("-----BEGIN PRIVATE KEY-----") ||
  !privateKey.includes("-----END PRIVATE KEY-----")
) {
  throw new Error(
    "Invalid Firebase private key format. Check AUTH_FIREBASE_PRIVATE_KEY."
  );
}

const firebaseCredential = cert({
  projectId,
  clientEmail,
  privateKey,
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],

  adapter: FirestoreAdapter({
    credential: firebaseCredential,
  }),
});

