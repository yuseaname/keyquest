/**
 * Collectibles Data
 * All available collectibles in the game
 */

import type { Collectible, MonsterCard, Title } from '@/types/collectibles';

// ============================================
// CHARACTER SKINS
// ============================================

export const CHARACTER_SKINS: Collectible[] = [
  // Blade Dancer Skins
  {
    id: 'blade-dancer-blaze',
    type: 'skin',
    name: 'Blaze Armor',
    description: 'Forged in the heart of the Fire Caverns, this armor burns with eternal flame.',
    rarity: 'epic',
    imageUrl: '/collectibles/skins/blade-dancer-blaze.png',
    classRestriction: 'blade-dancer',
    category: 'Fire Theme',
    obtainMethod: 'Complete Fire Caverns with 95%+ accuracy',
  },
  {
    id: 'blade-dancer-frost',
    type: 'skin',
    name: 'Frostbound Warrior',
    description: 'Armor kissed by eternal winter, resistant to all flames.',
    rarity: 'epic',
    imageUrl: '/collectibles/skins/blade-dancer-frost.png',
    classRestriction: 'blade-dancer',
    category: 'Frost Theme',
    obtainMethod: 'Defeat Frost Queen Glaciana',
  },
  
  // Ember Mage Skins
  {
    id: 'ember-mage-inferno',
    type: 'skin',
    name: 'Inferno Robes',
    description: 'Woven from the flames of defeated foes, these robes amplify fire magic.',
    rarity: 'legendary',
    imageUrl: '/collectibles/skins/ember-mage-inferno.png',
    classRestriction: 'ember-mage',
    category: 'Fire Theme',
    obtainMethod: 'Defeat Inferno Lord Pyraxis without taking damage',
  },
  {
    id: 'ember-mage-aurora',
    type: 'skin',
    name: 'Aurora Sage',
    description: 'Blessed by the northern lights, grants mastery over both fire and ice.',
    rarity: 'legendary',
    imageUrl: '/collectibles/skins/ember-mage-aurora.png',
    classRestriction: 'ember-mage',
    category: 'Seasonal',
    obtainMethod: 'Winter Event Exclusive',
    isLimited: true,
  },
  
  // Shadow Rogue Skins
  {
    id: 'shadow-rogue-void',
    type: 'skin',
    name: 'Void Stalker',
    description: 'Draped in darkness itself, becomes nearly invisible in shadow.',
    rarity: 'epic',
    imageUrl: '/collectibles/skins/shadow-rogue-void.png',
    classRestriction: 'shadow-rogue',
    category: 'Shadow Theme',
    obtainMethod: 'Complete Shadow Library with 100% accuracy',
  },
  
  // Spirit Healer Skins
  {
    id: 'spirit-healer-blossom',
    type: 'skin',
    name: 'Cherry Blossom Priestess',
    description: 'Adorned with eternal spring blossoms, heals with nature\'s grace.',
    rarity: 'rare',
    imageUrl: '/collectibles/skins/spirit-healer-blossom.png',
    classRestriction: 'spirit-healer',
    category: 'Nature Theme',
    obtainMethod: 'Reach Level 20',
  },
  
  // Technomancer Skins
  {
    id: 'technomancer-cyber',
    type: 'skin',
    name: 'Cyber Nexus',
    description: 'Fully integrated with the digital realm, circuits glow with power.',
    rarity: 'legendary',
    imageUrl: '/collectibles/skins/technomancer-cyber.png',
    classRestriction: 'technomancer',
    category: 'Tech Theme',
    obtainMethod: 'Defeat SYSTEM_CORE.exe',
  },
];

// ============================================
// ABILITY SKINS
// ============================================

export const ABILITY_SKINS: Collectible[] = [
  {
    id: 'slash-combo-shadow',
    type: 'ability-skin',
    name: 'Shadow Slash',
    description: 'Your slashes leave trails of darkness instead of light.',
    rarity: 'rare',
    imageUrl: '/collectibles/abilities/shadow-slash.png',
    classRestriction: 'blade-dancer',
    obtainMethod: 'Defeat 50 enemies with Slash Combo',
  },
  {
    id: 'flame-surge-ice',
    type: 'ability-skin',
    name: 'Frost Surge',
    description: 'Convert your flames to freezing ice shards.',
    rarity: 'epic',
    imageUrl: '/collectibles/abilities/frost-surge.png',
    classRestriction: 'ember-mage',
    obtainMethod: 'Use Flame Surge 100 times',
  },
  {
    id: 'renewal-starlight',
    type: 'ability-skin',
    name: 'Starlight Renewal',
    description: 'Healing magic shimmers with celestial energy.',
    rarity: 'rare',
    imageUrl: '/collectibles/abilities/starlight-renewal.png',
    classRestriction: 'spirit-healer',
    obtainMethod: 'Heal 10,000 total HP',
  },
];

// ============================================
// MONSTER CARDS
// ============================================

export const MONSTER_CARDS: MonsterCard[] = [
  // Fire Caverns
  {
    id: 'fire-imp-card',
    enemyId: 'fire-imp',
    name: 'Fire Imp',
    description: 'A mischievous creature of living flame',
    lore: 'Born from volcanic eruptions, these imps dance in magma pools and delight in burning everything they touch.',
    imageUrl: '/collectibles/cards/fire-imp.png',
    stats: {
      health: 50,
      damage: 8,
      attackSpeed: 2.5,
    },
    weakness: 'Ice',
    resistances: ['Fire'],
    realmOrigin: 'Fire Caverns',
    rarity: 'common',
    xpBonus: 5,
  },
  {
    id: 'lava-hound-card',
    enemyId: 'lava-hound',
    name: 'Lava Hound',
    description: 'A fierce beast born from molten rock',
    lore: 'These hounds were once normal wolves until they fell into a lava pit. Now they roam the caverns, hunting for prey.',
    imageUrl: '/collectibles/cards/lava-hound.png',
    stats: {
      health: 75,
      damage: 12,
      attackSpeed: 2.0,
    },
    weakness: 'Water',
    resistances: ['Fire', 'Physical'],
    realmOrigin: 'Fire Caverns',
    rarity: 'uncommon',
    xpBonus: 10,
  },
  {
    id: 'inferno-lord-card',
    enemyId: 'inferno-lord',
    name: 'Inferno Lord Pyraxis',
    description: 'The ancient ruler of the Fire Caverns',
    lore: 'Once a great elemental mage, Pyraxis became consumed by his own power. Now he rules the Fire Caverns as an immortal flame lord.',
    imageUrl: '/collectibles/cards/inferno-lord.png',
    stats: {
      health: 500,
      damage: 35,
      attackSpeed: 4.0,
    },
    weakness: 'Precision typing',
    resistances: ['Fire', 'Physical', 'Magic'],
    realmOrigin: 'Fire Caverns',
    rarity: 'legendary',
    xpBonus: 50,
  },
  
  // Frost Vale
  {
    id: 'frost-sprite-card',
    enemyId: 'frost-sprite',
    name: 'Frost Sprite',
    description: 'A tiny being of crystallized ice',
    lore: 'These playful creatures are actually frozen tears of the Frost Queen, given life through her sorrow.',
    imageUrl: '/collectibles/cards/frost-sprite.png',
    stats: {
      health: 40,
      damage: 6,
      attackSpeed: 2.0,
    },
    weakness: 'Fire',
    resistances: ['Ice'],
    realmOrigin: 'Frost Vale',
    rarity: 'common',
    xpBonus: 5,
  },
  {
    id: 'frost-queen-card',
    enemyId: 'frost-queen',
    name: 'Frost Queen Glaciana',
    description: 'The immortal ruler of Frost Vale',
    lore: 'Cursed to eternal frozen beauty, Glaciana cannot feel warmth or love. She freezes all who approach, not out of malice, but loneliness.',
    imageUrl: '/collectibles/cards/frost-queen.png',
    stats: {
      health: 450,
      damage: 30,
      attackSpeed: 3.5,
    },
    weakness: 'Fire magic',
    resistances: ['Ice', 'Physical'],
    realmOrigin: 'Frost Vale',
    rarity: 'legendary',
    xpBonus: 50,
  },
  
  // Shadow Library
  {
    id: 'void-librarian-card',
    enemyId: 'void-librarian',
    name: 'The Void Librarian',
    description: 'Keeper of all forbidden texts',
    lore: 'No one knows if the Librarian was once human. Some say he IS the library itself - every book, every word, every forbidden secret.',
    imageUrl: '/collectibles/cards/void-librarian.png',
    stats: {
      health: 550,
      damage: 40,
      attackSpeed: 4.5,
    },
    weakness: 'Accuracy',
    resistances: ['Shadow', 'Mind', 'Physical'],
    realmOrigin: 'Shadow Library',
    rarity: 'legendary',
    xpBonus: 60,
  },
];

// ============================================
// TITLES
// ============================================

export const TITLES: Title[] = [
  // Achievement Titles
  {
    id: 'spellbreaker',
    name: 'Spellbreaker',
    description: 'Defeat 10 bosses',
    requirement: 'Boss victories: 10',
    color: '#f59e0b',
    rarity: 'rare',
  },
  {
    id: 'swiftfinger',
    name: 'Swiftfinger',
    description: 'Reach 100 WPM',
    requirement: 'WPM: 100+',
    color: '#3b82f6',
    rarity: 'epic',
  },
  {
    id: 'combo-king',
    name: 'Combo King',
    description: 'Achieve a 100 combo',
    requirement: 'Max combo: 100',
    color: '#a855f7',
    rarity: 'epic',
  },
  {
    id: 'zero-mistake-master',
    name: 'Zero-Mistake Master',
    description: 'Complete a realm with no errors',
    requirement: 'Perfect realm run',
    color: '#22c55e',
    rarity: 'legendary',
  },
  {
    id: 'speedrunner',
    name: 'Speedrunner',
    description: 'Complete Fire Caverns in under 5 minutes',
    requirement: 'Time: < 5:00',
    color: '#ef4444',
    rarity: 'epic',
  },
  {
    id: 'flamebound-champion',
    name: 'Flamebound Champion',
    description: 'Seasonal winner of Fire Caverns leaderboard',
    requirement: 'Top 10 in season',
    color: '#ff6b35',
    rarity: 'legendary',
    iconUrl: '/titles/flamebound.png',
  },
  {
    id: 'typing-legend',
    name: 'Typing Legend',
    description: 'Reach 150 WPM',
    requirement: 'WPM: 150+',
    color: '#fbbf24',
    rarity: 'legendary',
  },
  {
    id: 'completionist',
    name: 'Completionist',
    description: 'Collect all monster cards',
    requirement: 'Monster cards: 100%',
    color: '#8b5cf6',
    rarity: 'legendary',
  },
  
  // Class-Specific Titles
  {
    id: 'blade-master',
    name: 'Blade Master',
    description: 'Reach level 50 as Blade Dancer',
    requirement: 'Blade Dancer level 50',
    color: '#dc2626',
    rarity: 'epic',
  },
  {
    id: 'shadow-assassin',
    name: 'Shadow Assassin',
    description: 'Complete 100 battles with Shadow Rogue',
    requirement: 'Shadow Rogue battles: 100',
    color: '#7c3aed',
    rarity: 'rare',
  },
  {
    id: 'pyromancer',
    name: 'Pyromancer',
    description: 'Deal 100,000 fire damage as Ember Mage',
    requirement: 'Fire damage: 100K',
    color: '#f97316',
    rarity: 'epic',
  },
  {
    id: 'divine-healer',
    name: 'Divine Healer',
    description: 'Heal 50,000 total HP as Spirit Healer',
    requirement: 'Healing: 50K',
    color: '#10b981',
    rarity: 'rare',
  },
  {
    id: 'digital-overlord',
    name: 'Digital Overlord',
    description: 'Master all Technomancer abilities',
    requirement: 'All abilities maxed',
    color: '#06b6d4',
    rarity: 'legendary',
  },
];

// ============================================
// RELICS
// ============================================

export const RELICS: Collectible[] = [
  {
    id: 'pyraxis-crown-fragment',
    type: 'relic',
    name: 'Pyraxis Crown Fragment',
    description: 'A shard of the Inferno Lord\'s crown, still warm to the touch.',
    rarity: 'legendary',
    imageUrl: '/collectibles/relics/pyraxis-crown.png',
    obtainMethod: 'Defeat Pyraxis with 100% accuracy',
  },
  {
    id: 'glaciana-tear',
    type: 'relic',
    name: 'Glaciana\'s Frozen Tear',
    description: 'A single tear from the Frost Queen, frozen in eternal sadness.',
    rarity: 'legendary',
    imageUrl: '/collectibles/relics/glaciana-tear.png',
    obtainMethod: 'Complete Frost Vale without taking damage',
  },
  {
    id: 'ancient-manuscript',
    type: 'relic',
    name: 'Ancient Manuscript',
    description: 'A forbidden text from the Shadow Library, its pages whisper secrets.',
    rarity: 'epic',
    imageUrl: '/collectibles/relics/manuscript.png',
    obtainMethod: 'Discover hidden room in Shadow Library',
  },
  {
    id: 'cyber-core',
    type: 'relic',
    name: 'Cyber Core Fragment',
    description: 'A piece of SYSTEM_CORE.exe, still pulsing with digital energy.',
    rarity: 'legendary',
    imageUrl: '/collectibles/relics/cyber-core.png',
    obtainMethod: 'Defeat SYSTEM_CORE.exe in under 10 minutes',
  },
];

// ============================================
// EMOTES
// ============================================

export const EMOTES: Collectible[] = [
  {
    id: 'emote-victory',
    type: 'emote',
    name: 'Victory Dance',
    description: 'Celebrate your typing prowess!',
    rarity: 'common',
    imageUrl: '/collectibles/emotes/victory.gif',
    animationUrl: '/collectibles/emotes/victory-anim.gif',
    obtainMethod: 'Win 10 battles',
  },
  {
    id: 'emote-thinking',
    type: 'emote',
    name: 'Thinking',
    description: 'Hmm, what word comes next?',
    rarity: 'common',
    imageUrl: '/collectibles/emotes/thinking.gif',
    obtainMethod: 'Complete tutorial',
  },
  {
    id: 'emote-fire',
    type: 'emote',
    name: 'On Fire!',
    description: 'Your fingers are blazing!',
    rarity: 'rare',
    imageUrl: '/collectibles/emotes/fire.gif',
    animationUrl: '/collectibles/emotes/fire-anim.gif',
    obtainMethod: 'Achieve 100+ WPM',
  },
];

// ============================================
// PROFILE FRAMES
// ============================================

export const FRAMES: Collectible[] = [
  {
    id: 'frame-bronze',
    type: 'frame',
    name: 'Bronze Frame',
    description: 'A simple bronze border for your profile.',
    rarity: 'common',
    imageUrl: '/collectibles/frames/bronze.png',
    obtainMethod: 'Reach level 5',
  },
  {
    id: 'frame-silver',
    type: 'frame',
    name: 'Silver Frame',
    description: 'A polished silver border for skilled typists.',
    rarity: 'uncommon',
    imageUrl: '/collectibles/frames/silver.png',
    obtainMethod: 'Reach level 15',
  },
  {
    id: 'frame-gold',
    type: 'frame',
    name: 'Gold Frame',
    description: 'A gleaming gold border for true champions.',
    rarity: 'rare',
    imageUrl: '/collectibles/frames/gold.png',
    obtainMethod: 'Reach level 30',
  },
  {
    id: 'frame-diamond',
    type: 'frame',
    name: 'Diamond Frame',
    description: 'A brilliant diamond border for legendary typists.',
    rarity: 'epic',
    imageUrl: '/collectibles/frames/diamond.png',
    obtainMethod: 'Reach level 50',
  },
  {
    id: 'frame-flame',
    type: 'frame',
    name: 'Eternal Flame Frame',
    description: 'Wreathed in perpetual fire, for Fire Caverns champions.',
    rarity: 'legendary',
    imageUrl: '/collectibles/frames/flame.png',
    animationUrl: '/collectibles/frames/flame-anim.gif',
    obtainMethod: 'Top 10 in Fire Caverns seasonal leaderboard',
    isLimited: true,
  },
];

// Helper function to get all collectibles
export function getAllCollectibles(): Collectible[] {
  return [
    ...CHARACTER_SKINS,
    ...ABILITY_SKINS,
    ...RELICS,
    ...EMOTES,
    ...FRAMES,
  ];
}

// Helper function to get collectibles by type
export function getCollectiblesByType(type: Collectible['type']): Collectible[] {
  return getAllCollectibles().filter(c => c.type === type);
}

// Helper function to get collectibles by rarity
export function getCollectiblesByRarity(rarity: Collectible['rarity']): Collectible[] {
  return getAllCollectibles().filter(c => c.rarity === rarity);
}
