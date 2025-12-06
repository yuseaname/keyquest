# Changelog

All notable changes to KeyQuest will be documented in this file.

## [1.2.0] - Leaderboards & Collectibles System - 2024

### ?? Added - Leaderboards

- **6 Leaderboard Categories**: WPM, Accuracy, Combo, XP, Boss Clears, Speed Runs
- **Real-time Rankings**: Updates automatically after battles
- **Player Rank Display**: Shows your position in each category
- **Top 100 Leaderboard**: See the best typists globally
- **Rank Icons**: ?????? for top 3 players
- **Visual Highlights**: "YOU" badge for current player
- **Seasonal Resets**: Monthly competition cycles

### ?? Added - Collectibles System

- **41+ Collectibles** across 8 types:
  - 7 Character Skins (class-specific cosmetics)
  - 3 Ability Skins (visual variants)
  - 6 Monster Cards (collectible cards with lore)
  - 4 Realm Relics (achievement artifacts)
  - 13 Titles (display under username)
  - 3 Emotes (character expressions)
  - 5 Profile Frames (leaderboard borders)
  - Auras & Effects (planned)

- **Rarity System**: Common, Uncommon, Rare, Epic, Legendary
- **Collection Tracking**: Track completion percentage
- **Equip System**: Customize your character's appearance
- **"New!" Badges**: Highlight recently obtained items

### ? Added - Missions System

- **Daily Missions**: 5 missions that reset every 24 hours
- **Weekly Missions**: 3 missions that reset on Mondays
- **Realm Missions**: Challenges specific to each realm
- **Boss Missions**: Defeat bosses under special conditions
- **Achievement Missions**: Long-term goals for dedicated players

### ?? New Files

#### Types
- `src/types/collectibles.ts` - Type definitions for all systems

#### Game Data
- `src/game/collectibles/index.ts` - All collectibles data
- `src/game/collectibles/missions.ts` - All missions data

#### Store
- `src/store/collectiblesStore.ts` - Zustand store for collectibles & missions

#### Services
- Updated `src/services/database.ts` - Added leaderboard & collectibles operations

#### Pages
- Updated `src/pages/LeaderboardPage.tsx` - Complete redesign with categories

#### Documentation
- `LEADERBOARDS_COLLECTIBLES.md` - Implementation guide
- `COLLECTIBLES_REFERENCE.md` - Quick reference for all items

### ?? Modified

- `src/types/index.ts` - Re-exports collectibles types
- `src/store/index.ts` - Exports new collectibles store
- `src/services/database.ts` - Added new database operations
- `README.md` - Updated with new features

### ??? Database Schema

Extended Firestore structure:
```
leaderboards/{category}/entries/{uid} - Player rankings
users/{uid}/collectibles/{id} - Owned collectibles
users/{uid}/missions/{id} - Mission progress
```

### ?? Security

- Leaderboards: Public read, authenticated write (own entry only)
- Collectibles: Private to user
- Missions: Private to user

### ?? Motivation Features

- **Competition**: Global rankings drive improvement
- **Collection**: Completionist gameplay loop
- **Daily Engagement**: Missions provide daily goals
- **Status Symbols**: Show off rare collectibles
- **Long-term Goals**: Achievements keep players engaged

---

## [1.1.0] - Firebase Integration - 2024

### ?? Added

- **Anonymous Authentication**: Players can start immediately without creating accounts
- **Cloud Save System**: Progress automatically saves to Firebase Firestore
- **Offline Support**: Game works offline, syncs when connection returns
- **Auto-Save**: Character data saves every 2 seconds (debounced)
- **Battle Logging**: All battles recorded to Firestore for analytics
- **Save Indicator**: Visual feedback showing save status (?? saved, ?? saving, ?? offline)
- **Cross-Session Persistence**: Progress survives browser restarts

### ?? New Files

#### Services
- `src/services/firebase.ts` - Firebase initialization and auth
- `src/services/database.ts` - Firestore database operations
- `src/services/index.ts` - Services exports

#### Hooks
- `src/hooks/useFirebaseAuth.ts` - Firebase authentication hook
- `src/hooks/useAutoSave.ts` - Auto-save and battle save hooks

#### Components
- `src/components/SaveIndicator.tsx` - Cloud save status indicator

#### Documentation
- `QUICKSTART.md` - 5-minute setup guide
- `FIREBASE_SETUP.md` - Detailed Firebase configuration
- `ARCHITECTURE.md` - System architecture diagrams
- `.env.example` - Environment variables template

### ?? Modified

- `package.json` - Added Firebase dependency (v10.7.1)
- `src/App.tsx` - Integrated Firebase auth and auto-save hooks
- `src/hooks/index.ts` - Exported new hooks
- `README.md` - Updated with Firebase setup instructions

### ??? Database Schema

```
users/{uid}/
??? User document (username, email, settings, statistics)
??? characters/{characterId}/ (character data)
??? battles/{timestamp}/ (battle logs)
```

### ?? Security

- Anonymous authentication enabled
- Firestore security rules: users can only access their own data
- Environment variables for sensitive config
- Offline persistence with IndexedDB

### ?? Performance

- Auto-save debounced (2 seconds)
- Offline persistence reduces network calls
- Efficient queries using document references
- No unnecessary re-renders

### ?? Configuration

New environment variables required:
```env
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
```

### ?? User Experience

- **Seamless**: No login screens, play immediately
- **Reliable**: Progress always saved automatically
- **Offline-First**: Continue playing without internet
- **Visual Feedback**: Save status always visible

---

## [1.0.0] - Initial Release

### ?? Core Features

- **5 Playable Classes**
  - Blade Dancer (Fast WPM-focused warrior)
  - Shadow Rogue (Precision-based assassin)
  - Ember Mage (DoT-focused spellcaster)
  - Spirit Healer (Beginner-friendly support)
  - Technomancer (Advanced combo-based)

- **4 Unique Realms**
  - Fire Caverns (Difficulty 3)
  - Frost Vale (Difficulty 4)
  - Shadow Library (Difficulty 6)
  - Cyber Nexus (Difficulty 8)

- **Typing Combat System**
  - Real-time WPM calculation
  - Accuracy tracking
  - Combo multipliers
  - Class-specific abilities
  - Damage formula: WPM × Accuracy × Class Modifiers

- **Progression System**
  - Character leveling
  - Experience and skill points
  - Stat upgrades (Precision, Agility, Mana, Fortitude)
  - Loot system
  - Inventory management

- **Game Modes**
  - Story Mode (realm progression)
  - Training Grounds (practice typing)
  - Battle Mode (combat encounters)

### ?? User Interface

- Modern fantasy aesthetic with TailwindCSS
- Responsive design (desktop & tablet)
- Framer Motion animations
- Custom color themes per class
- Battle screens with real-time stats
- Victory/Defeat screens with results

### ??? Technical Stack

- React 18.2
- TypeScript 5.2
- Vite 5.0
- Zustand (state management)
- React Router (navigation)
- Framer Motion (animations)
- TailwindCSS (styling)

### ?? Project Structure

```
src/
??? components/battle/    # Battle UI components
??? game/
?   ??? classes/         # Class definitions
?   ??? engine/          # Game logic
?   ??? realms/          # World data
??? hooks/               # Custom React hooks
??? pages/               # Route pages
??? store/               # Zustand stores
??? types/               # TypeScript definitions
```

---

## Upcoming Features

### Version 1.2 (Planned)
- [ ] Sound effects and music
- [ ] Additional realms (Storm Citadel, Ancient Ruins, Void Realm)
- [ ] Boss difficulty modes
- [ ] Achievement system
- [ ] Daily quests
- [ ] Leaderboard integration with Firebase

### Version 2.0 (Future)
- [ ] PvP typing battles
- [ ] Guild system
- [ ] Trading system
- [ ] Custom difficulty modifiers
- [ ] Mobile app (React Native)
- [ ] Account linking (convert anonymous to email)

---

## Breaking Changes

None yet - project is in v1.x

---

## Migration Guides

### Migrating to v1.1.0 (Firebase Integration)

If you were using v1.0.0 (local storage only):

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up Firebase (see QUICKSTART.md)

3. Create `.env` file with Firebase config

4. Start app - existing local data will remain local
   - New characters will use cloud save
   - To migrate old characters, export/import manually (feature coming soon)

5. No code changes needed in your fork!

---

## Support

- **Issues**: GitHub Issues
- **Docs**: See README.md
- **Setup Help**: See FIREBASE_SETUP.md
- **Architecture**: See ARCHITECTURE.md
