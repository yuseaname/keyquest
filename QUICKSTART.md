# Quick Start - Firebase Integration

Get KeyQuest running with cloud saves in 5 minutes!

## 1?? Install Dependencies

```bash
cd keyquest
npm install
```

## 2?? Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Add project"
3. Name it `keyquest-dev`
4. Disable Google Analytics
5. Click "Create project"

## 3?? Enable Anonymous Auth

1. Go to **Authentication** ? **Sign-in method**
2. Enable **Anonymous**
3. Save

## 4?? Create Firestore Database

1. Go to **Firestore Database**
2. Click "Create database"
3. Select "Start in production mode"
4. Choose location (any)
5. Enable

## 5?? Add Security Rules

Go to **Rules** tab and paste:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      match /{document=**} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
}
```

Click **Publish**.

## 6?? Get Firebase Config

1. **Project Settings** (gear icon)
2. Scroll to "Your apps"
3. Click **</>** (web icon)
4. Register app as `KeyQuest Web`
5. Copy the config values

## 7?? Configure Your App

Create `.env` file:

```bash
cp .env.example .env
```

Add your Firebase config:

```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=keyquest-dev.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=keyquest-dev
VITE_FIREBASE_STORAGE_BUCKET=keyquest-dev.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

## 8?? Start Development Server

```bash
npm run dev
```

Open `http://localhost:5173`

## ? Verify It Works

Open browser console, you should see:

```
? Anonymous user signed in: abc123def456...
? Firebase Auth initialized
```

Create a character and check Firestore Console - you should see your data!

---

## Troubleshooting

**Problem**: "Firebase: Error (auth/configuration-not-found)"
- **Solution**: Check your `.env` file has all variables

**Problem**: "Missing or insufficient permissions"
- **Solution**: Verify security rules are published

**Problem**: No console messages
- **Solution**: Hard refresh (Ctrl+Shift+R)

---

## Next Steps

- ? Game automatically saves every 2 seconds
- ? Progress survives browser restart
- ? Works offline (syncs when back online)
- ? Battle results logged to Firestore

Read [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) for detailed docs.
