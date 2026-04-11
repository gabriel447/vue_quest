/**
 * XP and Level System
 */

// XP required to reach each level (cumulative)
export const LEVEL_THRESHOLDS = [
  0,     // Level 1
  100,   // Level 2
  250,   // Level 3
  500,   // Level 4
  900,   // Level 5
  1400,  // Level 6
  2000,  // Level 7
  2800,  // Level 8
  3800,  // Level 9
  5000,  // Level 10 — Vue Padawan
  7000,  // Level 11
  9500,  // Level 12
  12500, // Level 13
  16000, // Level 14
  20000, // Level 15 — Vue Master
]

export const LEVEL_TITLES = [
  'Iniciante',
  'Explorador',
  'Aprendiz',
  'Praticante',
  'Desenvolvedor',
  'Vue Padawan',
  'Componente Vivo',
  'Reativo',
  'Compositor',
  'Arquiteto',
  'Vue Knight',
  'Mestre da Reatividade',
  'Sensei do Template',
  'Guardião do Store',
  'Vue Master',
]

export const XP_REWARDS = {
  LESSON_COMPLETE: 30,
  CHALLENGE_FIRST_TRY: 50,
  CHALLENGE_COMPLETE: 20,
  REVIEW_PERFECT: 15,    // quality 5
  REVIEW_GOOD: 10,       // quality 4
  REVIEW_OK: 5,          // quality 3
  STREAK_BONUS: 10,      // per day of streak
  MODULE_COMPLETE: 100,
  BOSS_BATTLE_WIN: 150,
}

export function getLevelFromXP(xp) {
  let level = 1
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_THRESHOLDS[i]) {
      level = i + 1
      break
    }
  }
  return Math.min(level, LEVEL_THRESHOLDS.length)
}

export function getLevelTitle(level) {
  return LEVEL_TITLES[Math.min(level - 1, LEVEL_TITLES.length - 1)]
}

export function getXPForNextLevel(xp) {
  const level = getLevelFromXP(xp)
  const nextThreshold = LEVEL_THRESHOLDS[level] // index = level (0-based next)
  if (!nextThreshold) return null // max level
  return nextThreshold - xp
}

export function getLevelProgress(xp) {
  const level = getLevelFromXP(xp)
  const currentThreshold = LEVEL_THRESHOLDS[level - 1]
  const nextThreshold = LEVEL_THRESHOLDS[level]
  if (!nextThreshold) return 100
  return Math.round(((xp - currentThreshold) / (nextThreshold - currentThreshold)) * 100)
}
