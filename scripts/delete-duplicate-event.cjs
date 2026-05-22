#!/usr/bin/env node
const admin = require('firebase-admin');
const dotenv = require('dotenv');

dotenv.config();

const useEmulator = process.env.USE_EMULATOR === 'true' || process.argv.includes('--emulator');
const projectId = process.env.FIREBASE_PROJECT_ID || process.env.VITE_FIREBASE_PROJECT_ID || 'ieeesousb-website';
const targetTitle = process.env.TARGET_TITLE || process.argv[2] || 'Paperback Pals – Atomic Habits';
const targetDate = process.env.TARGET_DATE || process.argv[3] || '23 Jan 2026';

if (useEmulator) {
    process.env.FIRESTORE_EMULATOR_HOST = process.env.FIRESTORE_EMULATOR_HOST || 'localhost:8080';
    console.log('Using Firestore emulator at', process.env.FIRESTORE_EMULATOR_HOST);
} else {
    console.log('Not using emulator. To target the local emulator, set USE_EMULATOR=true or pass --emulator');
}

admin.initializeApp({ projectId });
const db = admin.firestore();

(async () => {
    try {
        const eventsRef = db.collection('events');
        const snapshot = await eventsRef
            .where('title', '==', targetTitle)
            .where('date', '==', targetDate)
            .get();

        console.log('Found', snapshot.size, 'matching documents for', targetTitle, '-', targetDate);
        if (snapshot.empty) {
            console.log('No matching documents found. Nothing to delete.');
            return;
        }

        snapshot.forEach(doc => {
            console.log('-', doc.id, JSON.stringify(doc.data()));
        });

        if (!useEmulator) {
            console.log('\nSafety check: script is not targeting the emulator. Aborting without deletion.');
            console.log('To delete the local copy, run with USE_EMULATOR=true or pass --emulator');
            return;
        }

        // Delete only one document (the first) to satisfy "remove one and only one"
        const firstDoc = snapshot.docs[0];
        await firstDoc.ref.delete();
        console.log('Deleted document', firstDoc.id);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
})();
