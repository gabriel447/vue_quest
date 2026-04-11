/**
 * SM-2 Spaced Repetition Algorithm
 * Based on SuperMemo 2 algorithm
 *
 * Quality ratings (q):
 *   0 = Complete blackout
 *   1 = Wrong, but correct answer remembered
 *   2 = Wrong, but easy after seeing answer
 *   3 = Correct with difficulty
 *   4 = Correct with hesitation
 *   5 = Perfect recall
 */

export function sm2(card, q) {
  let { easeFactor = 2.5, interval = 1, repetitions = 0 } = card

  if (q < 3) {
    // Failed — reset to beginning
    repetitions = 0
    interval = 1
  } else {
    if (repetitions === 0) {
      interval = 1
    } else if (repetitions === 1) {
      interval = 6
    } else {
      interval = Math.round(interval * easeFactor)
    }
    repetitions++
  }

  // Update ease factor
  easeFactor = easeFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
  if (easeFactor < 1.3) easeFactor = 1.3

  const nextReview = Date.now() + interval * 24 * 60 * 60 * 1000

  return { easeFactor, interval, repetitions, nextReview }
}

/**
 * Returns cards due for review today
 */
export function getDueCards(cards) {
  const now = Date.now()
  return cards.filter(card => !card.nextReview || card.nextReview <= now)
}

/**
 * Sort cards by priority: overdue first, then new
 */
export function sortByPriority(cards) {
  const now = Date.now()
  return [...cards].sort((a, b) => {
    const aOverdue = (a.nextReview || 0) - now
    const bOverdue = (b.nextReview || 0) - now
    return aOverdue - bOverdue
  })
}
