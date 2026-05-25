Migration script for the `leadership` collection

1) Backup your Firestore data (highly recommended)
   - Use Firebase Console Export or `gcloud firestore export gs://YOUR_BUCKET/path`

2) Prepare a service account JSON with Firestore Admin privileges and download it.

3) Install dependencies and run dry-run:

```bash
npm init -y
npm install firebase-admin minimist
node scripts/migrate-leadership.js --serviceAccount ./serviceAccountKey.json --dry
```

4) If dry-run output looks correct, apply changes (confirm with `--yes`):

```bash
node scripts/migrate-leadership.js --serviceAccount ./serviceAccountKey.json --yes
```

Notes:
- The script will slugify `name` to compute the canonical doc id for each entry.
- If a doc's id differs from the slugified name, the script will move/merge it into the canonical id.
- Always run dry-run first and keep backups.
