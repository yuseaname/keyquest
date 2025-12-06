# KeyQuest: Chronicles of the Typing Realms

A typing-based RPG adventure where your keyboard becomes your weapon. Choose a class, embark on quests, fight monsters by typing attacks, unlock abilities, gather loot, and progress through realms.

## ?? Features

- **5 Unique Classes**: Blade Dancer, Shadow Rogue, Ember Mage, Spirit Healer, Technomancer
- **Typing Combat System**: Damage = WPM × Accuracy × Class Modifiers
- **Multiple Realms**: Fire Caverns, Frost Vale, Shadow Library, Cyber Nexus
- **Ability System**: Passive and active abilities unique to each class
- **Progression**: Level up, unlock skills, collect loot
- **Cloud Save**: Anonymous authentication with Firebase - no account needed!
- **Offline Support**: Play offline, sync when back online
- **?? Leaderboards**: Compete globally across 6 categories (WPM, Accuracy, Combo, etc.)
- **?? Collectibles System**: 41+ items including skins, cards, titles, relics, frames
- **? Missions**: Daily, weekly, realm, boss, and achievement challenges

## ?? Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Firebase project (for cloud saves)

### Installation

```bash
# Navigate to project directory
cd keyquest

# Install dependencies
npm install
```

### Firebase Setup

**Quick Setup** (5 minutes): See [QUICKSTART.md](./QUICKSTART.md)

**Detailed Guide**: See [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)

**TL;DR:**
1. Create Firebase project ? Enable Anonymous Auth
2. Create Firestore database ? Add security rules
3. Copy config values to `.env` file
4. Run `npm run dev` ? Start playing!

Configuration template:
```bash
cp .env.example .env
# Edit .env with your Firebase config
```

### Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
npm run preview
```

## ??? Project Structure

```
keyquest/
??? src/
?   ??? components/       # UI components
?   ?   ??? battle/       # Battle-specific components
?   ??? game/
?   ?   ??? classes/      # Class definitions
?   ?   ??? engine/       # Game loop, damage calc, word gen
?   ?   ??? realms/       # Realm and enemy data
?   ??? hooks/            # Custom React hooks
?   ??? pages/            # Page components
?   ??? store/            # Zustand state management
?   ??? types/            # TypeScript interfaces
?   ??? utils/            # Utility functions
??? public/               # Static assets
??? ...config files
```

## ?? Game Classes

| Class | Difficulty | Playstyle |
|-------|------------|-----------|
| Blade Dancer | Intermediate | Fast bursts, WPM bonuses |
| Shadow Rogue | Advanced | Precision, critical strikes |
| Ember Mage | Intermediate | Sustained damage, burn DoT |
| Spirit Healer | Beginner | Accuracy buffs, mistake forgiveness |
| Technomancer | Advanced | Pattern combos, tech abilities |

## ??? Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: TailwindCSS
- **State**: Zustand
- **Animation**: Framer Motion
- **Routing**: React Router
- **Backend**: Firebase (Auth + Firestore)
- **Offline**: IndexedDB persistence

## ?? Firestore Security Rules

Add these security rules to your Firebase project:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      // User's characters subcollection
      match /characters/{characterId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
      
      // User's battle logs subcollection
      match /battles/{battleId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
}
```

## ?? Database Structure

```
users/{uid}/
??? username: string
??? email: string
??? createdAt: timestamp
??? lastLogin: timestamp
??? settings: {
?   soundEnabled: boolean
?   musicEnabled: boolean
?   soundVolume: number
?   musicVolume: number
?   ...
? }
??? statistics: {
?   totalWordsTyped: number
?   averageWPM: number
?   battlesWon: number
?   ...
? }
??? characters/{characterId}/
    ??? name: string
    ??? classType: string
    ??? level: number
    ??? experience: number
    ??? stats: { ... }
    ??? abilities: [ ... ]
    ??? inventory: [ ... ]
    ??? createdAt: timestamp
```

## ?? How Cloud Save Works

1. **First Visit**: Game automatically creates anonymous Firebase user
2. **Playing**: Progress auto-saves to Firestore every 2 seconds
3. **Offline**: Changes stored locally, synced when online
4. **Cross-Device**: Use same browser = same anonymous ID = same save

To link progress to a permanent account (future feature):
- Players can convert anonymous account to email/password
- All progress transfers automatically

## ?? Documentation

- **[QUICKSTART.md](./QUICKSTART.md)** - Get started in 5 minutes
- **[FIREBASE_SETUP.md](./FIREBASE_SETUP.md)** - Complete Firebase setup guide
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System architecture & data flow diagrams
- **[LEADERBOARDS_COLLECTIBLES.md](./LEADERBOARDS_COLLECTIBLES.md)** - Leaderboards & Collectibles implementation guide
- **[COLLECTIBLES_REFERENCE.md](./COLLECTIBLES_REFERENCE.md)** - Quick reference for all collectibles & missions

## ?? Troubleshooting

### Common Issues

**Firebase not connecting?**
- Check `.env` file exists and has correct values
- Verify Firebase project has Anonymous Auth enabled
- Check browser console for error messages

**Data not saving?**
- Verify Firestore security rules are published
- Check you're authenticated (look for ?? icon in top-right)
- Open Firestore Console to see if data is appearing

**Offline mode not working?**
- IndexedDB should be enabled in your browser
- Try hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

## ?? License

MIT License - feel free to use for learning and personal projects.
