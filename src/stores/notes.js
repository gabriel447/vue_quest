import { defineStore } from 'pinia'

const STORAGE_KEY = 'vuequest_notes'

function loadFromStorage() {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : {}
  } catch {
    return {}
  }
}

export const useNotesStore = defineStore('notes', {
  state: () => ({
    // Map of lessonId -> { content, updatedAt }
    notes: loadFromStorage(),
  }),

  getters: {
    getNote: (state) => (lessonId) => state.notes[lessonId] || null,
    hasNote: (state) => (lessonId) => !!state.notes[lessonId]?.content?.trim(),
  },

  actions: {
    save() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.notes))
    },

    setNote(lessonId, content) {
      this.notes[lessonId] = {
        content,
        updatedAt: new Date().toISOString(),
      }
      this.save()
    },

    deleteNote(lessonId) {
      delete this.notes[lessonId]
      this.save()
    },

    getAllNotes() {
      return Object.entries(this.notes).map(([lessonId, note]) => ({
        lessonId,
        ...note,
      }))
    },

    reset() {
      this.notes = {}
      localStorage.removeItem(STORAGE_KEY)
    },
  },
})
