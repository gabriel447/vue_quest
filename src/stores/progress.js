import { defineStore } from 'pinia'
import { getLevelFromXP, getLevelTitle, getLevelProgress, getXPForNextLevel, XP_REWARDS } from '../utils/xp.js'

const STORAGE_KEY = 'vuequest_progress'

function loadFromStorage() {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : null
  } catch {
    return null
  }
}

function defaultState() {
  return {
    xp: 0,
    completedLessons: [],   // array of lesson IDs
    completedChallenges: [], // array of challenge IDs
    completedModules: [],   // array of module IDs
    completedBossBattles: [], // array of boss battle IDs
    streakDays: 0,
    lastActivityDate: null,
    badges: [],
    totalReviews: 0,
  }
}

export const useProgressStore = defineStore('progress', {
  state: () => {
    const saved = loadFromStorage()
    return saved || defaultState()
  },

  getters: {
    level: (state) => getLevelFromXP(state.xp),
    levelTitle: (state) => getLevelTitle(getLevelFromXP(state.xp)),
    levelProgress: (state) => getLevelProgress(state.xp),
    xpForNextLevel: (state) => getXPForNextLevel(state.xp),

    isLessonComplete: (state) => (id) => state.completedLessons.includes(id),
    isChallengeComplete: (state) => (id) => state.completedChallenges.includes(id),
    isModuleComplete: (state) => (id) => state.completedModules.includes(id),
    isBossBattleComplete: (state) => (id) => (state.completedBossBattles || []).includes(id),

    streakBonus: (state) => Math.min(state.streakDays, 10) * XP_REWARDS.STREAK_BONUS,
  },

  actions: {
    save() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.$state))
    },

    addXP(amount) {
      const oldLevel = this.level
      this.xp += amount
      const newLevel = this.level
      this.save()
      if (newLevel > oldLevel) {
        return { levelUp: true, level: newLevel, title: this.levelTitle }
      }
      return { levelUp: false }
    },

    completeLesson(lessonId) {
      if (!this.completedLessons.includes(lessonId)) {
        this.completedLessons.push(lessonId)
        this.updateStreak()
        return this.addXP(XP_REWARDS.LESSON_COMPLETE)
      }
      return { levelUp: false }
    },

    completeChallenge(challengeId, firstTry = false) {
      const xp = firstTry ? XP_REWARDS.CHALLENGE_FIRST_TRY : XP_REWARDS.CHALLENGE_COMPLETE
      if (!this.completedChallenges.includes(challengeId)) {
        this.completedChallenges.push(challengeId)
      }
      this.updateStreak()
      return this.addXP(xp)
    },

    completeModule(moduleId) {
      if (!this.completedModules.includes(moduleId)) {
        this.completedModules.push(moduleId)
        return this.addXP(XP_REWARDS.MODULE_COMPLETE)
      }
      return { levelUp: false }
    },

    recordReview(quality) {
      this.totalReviews++
      let xp = 0
      if (quality === 5) xp = XP_REWARDS.REVIEW_PERFECT
      else if (quality === 4) xp = XP_REWARDS.REVIEW_GOOD
      else if (quality >= 3) xp = XP_REWARDS.REVIEW_OK
      this.updateStreak()
      if (xp > 0) return this.addXP(xp)
      this.save()
      return { levelUp: false }
    },

    updateStreak() {
      const today = new Date().toDateString()
      const lastDate = this.lastActivityDate

      if (lastDate === today) return // already counted today

      const yesterday = new Date(Date.now() - 86400000).toDateString()
      if (lastDate === yesterday) {
        this.streakDays++
      } else if (lastDate !== today) {
        this.streakDays = 1
      }
      this.lastActivityDate = today
      this.save()
    },

    completeBossBattle(bossBattleId, xpReward) {
      if (!(this.completedBossBattles || []).includes(bossBattleId)) {
        if (!this.completedBossBattles) this.completedBossBattles = []
        this.completedBossBattles.push(bossBattleId)
        this.updateStreak()
        return this.addXP(xpReward)
      }
      return { levelUp: false }
    },

    reset() {
      Object.assign(this.$state, defaultState())
      localStorage.removeItem(STORAGE_KEY)
    },
  },
})
