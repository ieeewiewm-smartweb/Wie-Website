import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

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

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Function to save or update the award to Firebase without comparisons
export const saveAwardToFirebase = async (award: { title: string; date: string; description: string; imageUrl: string; id?: string }) => {
  try {
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

export { app, auth, db };
