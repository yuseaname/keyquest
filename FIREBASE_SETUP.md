# Firebase Setup Guide for KeyQuest

This guide will walk you through setting up Firebase for KeyQuest's cloud save system.

## Prerequisites

- A Google account
- Node.js 18+ installed
- KeyQuest project cloned

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click **"Add project"**
3. Enter project name: `keyquest` (or your preferred name)
4. Disable Google Analytics (optional for this project)
5. Click **"Create project"**

## Step 2: Enable Anonymous Authentication

1. In your Firebase project, go to **Authentication** (left sidebar)
2. Click **"Get started"**
3. Go to **"Sign-in method"** tab
4. Find **"Anonymous"** in the providers list
5. Toggle it to **Enabled**
6. Click **"Save"**

? Now users can play without creating accounts!

## Step 3: Create Firestore Database

1. Go to **Firestore Database** (left sidebar)
2. Click **"Create database"**
3. Select **"Start in production mode"** (we'll add security rules next)
4. Choose a location (pick closest to your target audience)
5. Click **"Enable"**

## Step 4: Add Security Rules

1. In Firestore, go to the **"Rules"** tab
2. Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      // Characters subcollection
      match /characters/{characterId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
      
      // Battle logs subcollection
      match /battles/{battleId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
}
```

3. Click **"Publish"**

? Now your database is secure - users can only access their own data!

## Step 5: Get Firebase Config

1. In Firebase Console, click the **?? gear icon** (Project Settings)
2. Scroll down to **"Your apps"**
3. Click the **</>** (web) icon to add a web app
4. Enter app nickname: `KeyQuest Web`
5. **Don't** check "Firebase Hosting" (we'll deploy elsewhere)
6. Click **"Register app"**
7. Copy the `firebaseConfig` object

It should look like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "keyquest-12345.firebaseapp.com",
  projectId: "keyquest-12345",
  storageBucket: "keyquest-12345.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

## Step 6: Add Config to Your Project

1. In your KeyQuest project, create `.env` file:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and add your Firebase values:
   ```env
   VITE_FIREBASE_API_KEY=AIzaSy...
   VITE_FIREBASE_AUTH_DOMAIN=keyquest-12345.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=keyquest-12345
   VITE_FIREBASE_STORAGE_BUCKET=keyquest-12345.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=1:123456789:web:abc123
   ```

3. **Important**: Add `.env` to `.gitignore` (already done)
   ```
   .env
   .env.local
   ```

## Step 7: Test the Integration

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the dev server:
   ```bash
   npm run dev
   ```

3. Open `http://localhost:5173`

4. Check browser console for:
   ```
   ? Anonymous user signed in: abc123...
   ? Firebase Auth initialized
   ```

5. Create a character and make some progress

6. Check Firestore Console:
   - Go to Firestore Database
   - You should see a `users` collection
   - Click to see your user document
   - Inside, check the `characters` subcollection

## Step 8: Test Offline Functionality

1. With the game open, go to Network tab in DevTools
2. Check "Offline" mode
3. Make changes (create character, level up, etc.)
4. Uncheck "Offline" mode
5. Changes should sync automatically

Look for console message: `?? Auto-saved character`

## Firestore Data Structure

Your database will look like this:

```
users/
??? {anonymous_uid}/
    ??? username: "Typist_abc123"
    ??? email: ""
    ??? createdAt: timestamp
    ??? lastLogin: timestamp
    ??? settings: {
    ?   soundEnabled: true,
    ?   musicEnabled: true,
    ?   ...
    ? }
    ??? statistics: {
    ?   totalWordsTyped: 245,
    ?   averageWPM: 68,
    ?   battlesWon: 3,
    ?   ...
    ? }
    ??? characters/
    ?   ??? {character_id}/
    ?       ??? name: "Aria"
    ?       ??? classType: "ember-mage"
    ?       ??? level: 7
    ?       ??? experience: 1420
    ?       ??? stats: { ... }
    ?       ??? abilities: [ ... ]
    ?       ??? inventory: [ ... ]
    ??? battles/
        ??? {timestamp}/
            ??? characterId: "..."
            ??? realmId: "fire-caverns-1"
            ??? result: "victory"
            ??? wpm: 72
            ??? accuracy: 94
```

## Troubleshooting

### "Auth error: permission denied"
- Check that Anonymous auth is enabled
- Verify security rules are published

### "Firestore: Missing or insufficient permissions"
- Check security rules
- Make sure user is authenticated (check console for `? Anonymous user signed in`)

### "Failed to get document"
- Check network tab for errors
- Verify Firebase config values are correct
- Check Firestore indexes (should auto-create)

### Data not syncing
- Check browser console for errors
- Verify you're online (check network icon in browser)
- Try hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

## Production Deployment

When deploying to production:

1. **Environment Variables**: Set them in your hosting platform
   - Vercel: Project Settings > Environment Variables
   - Netlify: Site Settings > Build & Deploy > Environment
   - Firebase Hosting: Use `.env.production`

2. **Firebase Quotas**: Free tier includes:
   - 50K reads/day
   - 20K writes/day
   - 1 GB storage
   
   Should be enough for ~1000 daily users

3. **Upgrade Plan**: If you exceed limits, upgrade to Blaze (pay-as-you-go)

## Optional: Convert Anonymous to Permanent Account

To add email/password login later:

```typescript
import { linkWithCredential, EmailAuthProvider } from 'firebase/auth';

// Convert anonymous user to email/password
async function convertToEmailAccount(email: string, password: string) {
  const credential = EmailAuthProvider.credential(email, password);
  await linkWithCredential(auth.currentUser!, credential);
  // All progress is preserved!
}
```

## Need Help?

- Firebase Docs: https://firebase.google.com/docs
- KeyQuest Issues: Create an issue on GitHub
- Community: Discord server (link in README)

---

?? **Congratulations!** Your game now has cloud saves with zero user friction!
