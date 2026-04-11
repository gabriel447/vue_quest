<script setup>
import { computed } from 'vue'
import { useNotesStore } from '../stores/notes.js'
import { allLessons } from '../data/curriculum/index.js'

const notes = useNotesStore()

const notesWithLesson = computed(() =>
  notes.getAllNotes()
    .filter(n => n.content?.trim())
    .map(n => {
      const lesson = allLessons.find(l => l.id === n.lessonId)
      return { ...n, lesson }
    })
    .filter(n => n.lesson)
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
)
</script>

<template>
  <div class="page">
    <div class="container">
      <div class="notes-header animate-fade-in">
        <h1>📝 Suas Notas</h1>
        <p class="text-muted">Todas as suas anotações em um só lugar.</p>
      </div>

      <div v-if="notesWithLesson.length === 0" class="empty-state card mt-3">
        <div class="empty-icon">📝</div>
        <h3>Nenhuma nota ainda</h3>
        <p class="text-muted">Abra uma lição e use a aba "Notas" para anotar o que aprendeu.</p>
        <RouterLink to="/" class="btn btn-primary mt-2">Ver módulos</RouterLink>
      </div>

      <div class="notes-grid mt-3">
        <div
          v-for="note in notesWithLesson"
          :key="note.lessonId"
          class="note-card card"
        >
          <div class="note-header">
            <div class="note-lesson-info">
              <span class="note-icon">{{ note.lesson.icon }}</span>
              <div>
                <div class="note-lesson-title">{{ note.lesson.title }}</div>
                <div class="note-date text-muted">
                  {{ new Date(note.updatedAt).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) }}
                </div>
              </div>
            </div>
            <RouterLink :to="`/lesson/${note.lessonId}`" class="btn btn-ghost btn-sm">
              Editar →
            </RouterLink>
          </div>
          <div class="note-content">{{ note.content }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.notes-header { display: flex; flex-direction: column; gap: 0.5rem; }

.empty-state {
  text-align: center;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}
.empty-icon { font-size: 3rem; }

.notes-grid { display: flex; flex-direction: column; gap: 1rem; }

.note-card { padding: 1.25rem; }

.note-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.note-lesson-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.note-icon { font-size: 1.5rem; }
.note-lesson-title { font-weight: 700; }
.note-date { font-size: 0.8rem; }

.note-content {
  font-size: 0.9rem;
  line-height: 1.7;
  color: var(--text-muted);
  white-space: pre-wrap;
  max-height: 200px;
  overflow: hidden;
  mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
}
</style>
