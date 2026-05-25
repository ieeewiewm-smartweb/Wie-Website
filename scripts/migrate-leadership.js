// migrate-leadership.js
// Usage:
//   node migrate-leadership.js --serviceAccount ./serviceAccountKey.json --dry
//   node migrate-leadership.js --serviceAccount ./serviceAccountKey.json --yes
//
// This script will normalize Firestore doc IDs in the `leadership` collection
// by slugifying the `name` field and moving/merging documents when IDs differ.
// It performs a dry-run by default when `--dry` is provided.

const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");
const args = require("minimist")(process.argv.slice(2));

if (!args.serviceAccount) {
    console.error("Missing --serviceAccount path to a Firebase service account JSON file.");
    process.exit(1);
}
const dryRun = !!args.dry;
const autoYes = !!args.yes;

const svcPath = path.resolve(args.serviceAccount);
if (!fs.existsSync(svcPath)) {
    console.error("Service account file not found:", svcPath);
    process.exit(1);
}
const serviceAccount = require(svcPath);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const slugify = (name) =>
    (name || "")
        .toString()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

(async () => {
    try {
        const colRef = db.collection("leadership");
        const snapshot = await colRef.get();
        console.log(`Found ${snapshot.size} documents in 'leadership'`);
        const ops = [];

        for (const docSnap of snapshot.docs) {
            const data = docSnap.data() || {};
            const currentId = docSnap.id;
            const name = (data.name || "").toString().trim();
            const targetId = slugify(name) || currentId;

            if (currentId === targetId) continue;

            const targetSnap = await colRef.doc(targetId).get();

            // Build merged object: prefer source (current doc) fields first,
            // then fill missing from target doc if present.
            const merged = {
                name: data.name || (targetSnap.exists ? targetSnap.get("name") : ""),
                role: data.role || (targetSnap.exists ? targetSnap.get("role") : ""),
                description: data.description || (targetSnap.exists ? targetSnap.get("description") : ""),
                image: data.image || (targetSnap.exists ? targetSnap.get("image") : ""),
            };

            ops.push({ from: currentId, to: targetId, merged, existsTarget: targetSnap.exists });
        }

        if (ops.length === 0) {
            console.log("No docs require moving/merging.");
            process.exit(0);
        }

        console.log("Planned operations:");
        ops.forEach((o) =>
            console.log(
                `${o.existsTarget ? "MERGE" : "MOVE"}: '${o.from}' -> '${o.to}' (target exists: ${o.existsTarget})`
            )
        );

        if (dryRun) {
            console.log("Dry run — no changes made. Rerun without --dry and with --yes to apply.");
            process.exit(0);
        }

        if (!autoYes) {
            console.log("Run will modify Firestore. Rerun with --yes to apply.");
            process.exit(0);
        }

        // Apply changes
        for (const o of ops) {
            const fromRef = colRef.doc(o.from);
            const toRef = colRef.doc(o.to);
            // Write merged data (merge with existing target)
            await toRef.set(o.merged, { merge: true });
            // Delete old doc
            await fromRef.delete();
            console.log(`Applied: '${o.from}' -> '${o.to}'`);
        }

        console.log("Migration complete.");
        process.exit(0);
    } catch (err) {
        console.error("Migration error:", err);
        process.exit(1);
    }
})();
