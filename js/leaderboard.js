// ============================================================
//  Leaderboard — Firebase Firestore read/write utilities
//  Collection: "scores"
//  Document fields: { game, player, score, timestamp }
// ============================================================

import { db } from './firebase-config.js';
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const SCORES_COLLECTION = 'scores';

/**
 * Submit a score to Firestore.
 * @param {string} game   - Game identifier, e.g. 'snake', 'tetris'
 * @param {string} player - Display name (from localStorage fallback)
 * @param {number} score  - Numeric score
 * @returns {Promise<string>} Document ID on success
 */
export async function submitScore(game, player, score) {
  try {
    const docRef = await addDoc(collection(db, SCORES_COLLECTION), {
      game,
      player: player.trim().toUpperCase().slice(0, 12),
      score: Math.floor(score),
      timestamp: serverTimestamp()
    });
    console.log(`[Leaderboard] Score submitted: ${game} / ${player} / ${score}`);
    return docRef.id;
  } catch (err) {
    console.error('[Leaderboard] submitScore failed:', err);
    throw err;
  }
}

/**
 * Get top N scores for a specific game.
 * @param {string} game  - Game identifier
 * @param {number} n     - Number of entries (default 5)
 * @returns {Promise<Array<{player, score, timestamp}>>}
 */
export async function getTopScores(game, n = 5) {
  try {
    const q = query(
      collection(db, SCORES_COLLECTION),
      where('game', '==', game),
      orderBy('score', 'desc'),
      limit(n)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (err) {
    console.error(`[Leaderboard] getTopScores(${game}) failed:`, err);
    return [];
  }
}

/**
 * Get the single highest score for a game (for game card hi-score display).
 * @param {string} game
 * @returns {Promise<{player, score}|null>}
 */
export async function getHiScore(game) {
  const scores = await getTopScores(game, 1);
  return scores.length > 0 ? scores[0] : null;
}

// ---- localStorage helpers ----

const PLAYER_KEY = 'arcade_player_name';

export function getSavedPlayerName() {
  return localStorage.getItem(PLAYER_KEY) || '';
}

export function savePlayerName(name) {
  localStorage.setItem(PLAYER_KEY, name.trim().toUpperCase().slice(0, 12));
}
