/**
 * Character Creation Page
 * Allows players to create a new character and select their class
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '@/store';
import { CLASS_DEFINITIONS } from '@/game/classes';
import type { ClassType, Character } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export function CharacterCreatePage() {
  const navigate = useNavigate();
  const { addCharacter, setCurrentCharacter, user } = useGameStore();
  
  const [characterName, setCharacterName] = useState('');
  const [selectedClass, setSelectedClass] = useState<ClassType | null>(null);
  const [error, setError] = useState('');

  const handleCreateCharacter = () => {
    if (!characterName.trim()) {
      setError('Please enter a character name');
      return;
    }
    
    if (!selectedClass) {
      setError('Please select a class');
      return;
    }

    const classDefinition = CLASS_DEFINITIONS[selectedClass];
    
    const newCharacter: Character = {
      id: uuidv4(),
      userId: user?.id || 'guest',
      name: characterName.trim(),
      classType: selectedClass,
      level: 1,
      experience: 0,
      experienceToNextLevel: 100,
      stats: { ...classDefinition.baseStats },
      abilities: [...classDefinition.activeAbilities],
      equippedItems: {},
      inventory: [],
      unlockedRealms: ['fire-caverns-1'],
      createdAt: new Date(),
    };

    addCharacter(newCharacter);
    setCurrentCharacter(newCharacter);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-kq-dark-950 via-kq-dark-900 to-kq-dark-950 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl text-kq-gold-400 mb-2">Create Your Hero</h1>
          <p className="text-kq-dark-400">Choose your path and begin your adventure</p>
        </div>

        {/* Character Name Input */}
        <div className="mb-8">
          <label className="block font-display text-lg text-white mb-2">Character Name</label>
          <input
            type="text"
            value={characterName}
            onChange={(e) => {
              setCharacterName(e.target.value);
              setError('');
            }}
            placeholder="Enter your hero's name..."
            maxLength={20}
            className="w-full px-4 py-3 bg-kq-dark-800 border border-kq-dark-600 rounded-xl text-white placeholder-kq-dark-500 focus:outline-none focus:border-kq-gold-500 transition-colors font-mono"
          />
        </div>

        {/* Class Selection */}
        <div className="mb-8">
          <label className="block font-display text-lg text-white mb-4">Select Your Class</label>
          <div className="grid gap-4">
            {Object.values(CLASS_DEFINITIONS).map((classDef) => (
              <button
                key={classDef.type}
                onClick={() => {
                  setSelectedClass(classDef.type);
                  setError('');
                }}
                className={`text-left p-4 rounded-xl border-2 transition-all ${
                  selectedClass === classDef.type
                    ? 'border-kq-gold-500 bg-kq-dark-800'
                    : 'border-kq-dark-700 bg-kq-dark-800/50 hover:border-kq-dark-500'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-14 h-14 rounded-lg flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ backgroundColor: classDef.primaryColor + '33' }}
                  >
                    {classDef.type === 'blade-dancer' && '??'}
                    {classDef.type === 'shadow-rogue' && '???'}
                    {classDef.type === 'ember-mage' && '??'}
                    {classDef.type === 'spirit-healer' && '??'}
                    {classDef.type === 'technomancer' && '?'}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-display text-lg text-white">{classDef.name}</h3>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          classDef.difficulty === 'beginner'
                            ? 'bg-kq-nature-500/20 text-kq-nature-400'
                            : classDef.difficulty === 'intermediate'
                            ? 'bg-kq-gold-500/20 text-kq-gold-400'
                            : 'bg-kq-fire-500/20 text-kq-fire-400'
                        }`}
                      >
                        {classDef.difficulty}
                      </span>
                    </div>
                    <p className="text-kq-dark-400 text-sm mb-2">{classDef.description}</p>
                    <p className="text-kq-dark-500 text-xs italic">{classDef.playstyle}</p>
                    
                    {/* Passive Ability */}
                    <div className="mt-3 p-2 bg-kq-dark-900/50 rounded-lg">
                      <p className="text-xs text-kq-gold-400 font-semibold mb-1">
                        Passive: {classDef.passiveAbility.name}
                      </p>
                      <p className="text-xs text-kq-dark-400">
                        {classDef.passiveAbility.description}
                      </p>
                    </div>
                  </div>
                  
                  {selectedClass === classDef.type && (
                    <div className="text-kq-gold-400 text-xl">?</div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-kq-fire-400 text-center mb-4">{error}</p>
        )}

        {/* Create Button */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-kq-dark-700 text-white font-display rounded-xl hover:bg-kq-dark-600 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleCreateCharacter}
            className="px-8 py-3 bg-gradient-to-r from-kq-gold-500 to-kq-gold-600 text-kq-dark-900 font-display font-bold rounded-xl hover:from-kq-gold-400 hover:to-kq-gold-500 transition-all transform hover:scale-105"
          >
            Create Hero
          </button>
        </div>
      </div>
    </div>
  );
}
