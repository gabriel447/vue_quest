import { defineStore } from 'pinia'
import { sm2, getDueCards, sortByPriority } from '../utils/sm2.js'

const STORAGE_KEY = 'vuequest_srs'

function loadFromStorage() {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : {}
  } catch {
    return {}
  }
}

export const useSRSStore = defineStore('srs', {
  state: () => ({
    // Map of cardId -> { easeFactor, interval, repetitions, nextReview }
    cards: loadFromStorage(),
  }),

  getters: {
    dueCount: (state) => {
      const now = Date.now()
      return Object.values(state.cards).filter(c => !c.nextReview || c.nextReview <= now).length
    },

    dueCards: (state) => {
      const now = Date.now()
      return Object.entries(state.cards)
        .filter(([, card]) => !card.nextReview || card.nextReview <= now)
        .map(([id, card]) => ({ id, ...card }))
    },
  },

  actions: {
    save() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.cards))
    },

    // Register a new card (when user first encounters a concept)
    registerCard(id) {
      if (!this.cards[id]) {
        this.cards[id] = {
          easeFactor: 2.5,
          interval: 1,
          repetitions: 0,
          nextReview: null, // null = due immediately (new card)
        }
        this.save()
      }
    },

    // Process a review result
    // quality: 0-5 (SM-2 scale)
    review(id, quality) {
      const card = this.cards[id] || { easeFactor: 2.5, interval: 1, repetitions: 0 }
      const result = sm2(card, quality)
      this.cards[id] = result
      this.save()
      return result
    },

    // Get card state
    getCard(id) {
      return this.cards[id] || null
    },

    // Days until next review
    daysUntilReview(id) {
      const card = this.cards[id]
      if (!card || !card.nextReview) return 0
      return Math.max(0, Math.ceil((card.nextReview - Date.now()) / 86400000))
    },

    reset() {
      this.cards = {}
      localStorage.removeItem(STORAGE_KEY)
    },
  },
})
