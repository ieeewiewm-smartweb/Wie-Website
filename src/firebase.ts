import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// 🔹 Firebase Configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const hasFirebaseConfig = !!firebaseConfig.apiKey && !!firebaseConfig.authDomain && !!firebaseConfig.projectId && !!firebaseConfig.appId;

// IMPORTANT:
// Cloudflare Pages may run builds with no VITE_* env vars configured.
// Avoid initializing Firebase in that case to prevent auth/invalid-api-key errors.
const app = hasFirebaseConfig ? (getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)) : null;

const db = app ? getFirestore(app) : null;
const auth = app ? getAuth(app) : null;
const storage = app ? getStorage(app) : null;


// Anonymous auth is not forced here because the Firebase project currently
// disallows anonymous sign-ins (auth/admin-restricted-operation).
// If you want public Firestore reads, update the Firebase rules or enable
// anonymous auth in the Firebase Console.

// Function to save or update the award to Firebase without comparisons
export const saveAwardToFirebase = async (award: { title: string; date: string; description: string; imageUrl: string; id?: string }) => {
  try {
    if (!db) {
      console.warn("Firebase is not configured (missing VITE_FIREBASE_* env vars). Skipping saveAwardToFirebase.");
      return;
    }
    const awardsRef = collection(db, "awards");

    // Log before saving data
    console.log("Award data to save:", award);

    // If the award has an ID, update the existing award
    if (award.id) {
      const awardDocRef = doc(db, "awards", award.id);
      console.log("Updating award with ID: ", award.id);
      await updateDoc(awardDocRef, award);
      console.log("Award updated with ID: ", award.id);
    } else {
      // Add new award
      const docRef = await addDoc(awardsRef, award);
      console.log("Award added with ID: ", docRef.id);
    }
  } catch (e) {
    console.error("Error saving award: ", e);
  }
};

// Function to save or update the event to Firebase
export const saveEventToFirebase = async (event: { title: string; date: string; description: string; location: string; imageUrl: string; ieeeCount: number; nonIeeeCount: number; id?: string }) => {
  try {
    const eventsRef = collection(db, "events");

    // Log before saving data
    console.log("Event data to save:", event);

    // If the event has an ID, update the existing event
    if (event.id) {
      const eventDocRef = doc(db, "events", event.id);
      console.log("Updating event with ID: ", event.id);
      await updateDoc(eventDocRef, event);
      console.log("Event updated with ID: ", event.id);
    } else {
      // Add new event
      const docRef = await addDoc(eventsRef, event);
      console.log("Event added with ID: ", docRef.id);
    }
  } catch (e) {
    console.error("Error saving event: ", e);
  }
};

export { app, auth, db, storage };
