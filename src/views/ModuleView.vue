<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProgressStore } from '../stores/progress.js'
import { useSRSStore } from '../stores/srs.js'
import { getModuleById } from '../data/curriculum/index.js'

const route = useRoute()
const router = useRouter()
const progress = useProgressStore()
const srs = useSRSStore()

const mod = computed(() => getModuleById(route.params.id))

const lessonsWithStatus = computed(() => {
  const lessons = mod.value?.lessons || []
  return lessons.map((lesson, index) => {
    const completed = progress.isLessonComplete(lesson.id)
    const prevCompleted = index === 0 || progress.isLessonComplete(lessons[index - 1].id)
    const locked = !prevCompleted && !completed
    const now = Date.now()
    const dueCards = (lesson.flashcards || []).filter(fc => {
      const card = srs.getCard(fc.id)
      return !card || !card.nextReview || card.nextReview <= now
    }).length
    const reviewedCards = (lesson.flashcards || []).filter(fc => {
      const card = srs.getCard(fc.id)
      return card && card.repetitions > 0
    }).length
    return { ...lesson, completed, locked, dueCards, reviewedCards }
  })
})

const moduleProgress = computed(() => {
  const total = lessonsWithStatus.value.length
  const done = lessonsWithStatus.value.filter(l => l.completed).length
  return { total, done, percent: total > 0 ? Math.round((done / total) * 100) : 0 }
})

function goToLesson(lesson) {
  router.push(`/lesson/${lesson.id}`)
}
</script>

<template>
  <div class="page" v-if="mod">
    <div class="container">
      <!-- Header do módulo -->
      <div class="module-hero animate-fade-in">
        <RouterLink to="/" class="back-link">← Voltar</RouterLink>
        <div class="module-title-row">
          <span class="module-icon">{{ mod.icon }}</span>
          <div>
            <h1>{{ mod.title }}</h1>
            <p class="text-muted">{{ mod.description }}</p>
          </div>
        </div>

        <!-- Progresso do módulo -->
        <div class="module-progress card">
          <div class="progress-meta">
            <span>{{ moduleProgress.done }} de {{ moduleProgress.total }} lições completas</span>
            <span class="text-green">{{ moduleProgress.percent }}%</span>
          </div>
          <div class="progress-bar mt-1">
            <div
              class="progress-bar-fill"
              :style="{ width: moduleProgress.percent + '%', background: mod.color }"
            />
          </div>
        </div>
      </div>

      <!-- Lista de lições -->
      <div class="lessons-list mt-3">
        <div
          v-for="(lesson, index) in lessonsWithStatus"
          :key="lesson.id"
          class="lesson-item card"
          :class="{ completed: lesson.completed, locked: lesson.locked }"
          @click="!lesson.locked && goToLesson(lesson)"
        >
          <div class="lesson-number">{{ String(index + 1).padStart(2, '0') }}</div>
          <div class="lesson-icon">{{ lesson.icon }}</div>
          <div class="lesson-info">
            <h3>{{ lesson.title }}</h3>
            <div v-if="!lesson.locked" class="lesson-meta">
              <span class="badge badge-blue">Teoria</span>
              <span class="badge badge-green">Desafios</span>
              <span class="badge badge-purple">Flashcards</span>
            </div>
            <p v-else class="locked-hint">Complete a lição anterior para desbloquear</p>
          </div>
          <div class="lesson-status">
            <span v-if="lesson.locked" class="lock-icon">🔒</span>
            <span v-else-if="lesson.completed" class="status-done">✅</span>
            <span v-else class="status-arrow">→</span>
            <span v-if="!lesson.locked" class="xp-tag">+{{ lesson.xpReward }} XP</span>
          </div>
        </div>
      </div>

      <!-- Boss Battle -->
      <div v-if="mod.bossBattle" class="boss-battle card mt-3">
        <div class="boss-header">
          <span class="boss-icon">👹</span>
          <div>
            <h3>{{ mod.bossBattle.title }}</h3>
            <p class="text-muted">{{ mod.bossBattle.description }}</p>
          </div>
          <span class="xp-big">+{{ mod.bossBattle.xpReward }} XP</span>
        </div>
        <div class="boss-requirements">
          <span class="text-muted" style="font-size:0.85rem">Requisitos: </span>
          <span
            v-for="req in mod.bossBattle.requirements"
            :key="req"
            class="req-badge"
            :class="{ met: progress.isLessonComplete(req) }"
          >
            {{ progress.isLessonComplete(req) ? '✅' : '🔒' }}
            {{ req.replace(/-/g, ' ') }}
          </span>
        </div>
        <button
          class="btn btn-primary mt-2"
          :disabled="!mod.bossBattle.requirements.every(r => progress.isLessonComplete(r))"
        >
          Iniciar Boss Battle 👹
        </button>
      </div>
    </div>
  </div>

  <div v-else class="page">
    <div class="container">
      <p class="text-muted">Módulo não encontrado.</p>
      <RouterLink to="/" class="btn btn-secondary mt-2">← Voltar</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.module-hero { display: flex; flex-direction: column; gap: 1.25rem; }

.back-link {
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s;
}
.back-link:hover { color: var(--vue-green); }

.module-title-row {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.module-icon { font-size: 3rem; line-height: 1; }

.module-progress { padding: 1.25rem; }
.progress-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.lessons-list { display: flex; flex-direction: column; gap: 0.75rem; }

.lesson-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  padding: 1.25rem;
  transition: all 0.2s;
}

.lesson-item:hover {
  border-color: var(--vue-green);
  transform: translateX(4px);
}

.lesson-item.completed { border-color: rgba(66,184,131,0.3); }
.lesson-item.locked { opacity: 0.45; cursor: not-allowed; }
.lesson-item.locked:hover { border-color: var(--border); transform: none; }
.locked-hint { font-size: 0.8rem; color: var(--text-dim); margin: 0; }
.lock-icon { font-size: 1.1rem; }

.lesson-number {
  font-size: 0.8rem;
  font-weight: 800;
  color: var(--text-dim);
  font-variant-numeric: tabular-nums;
  flex-shrink: 0;
}

.lesson-icon { font-size: 1.5rem; flex-shrink: 0; }
.lesson-info { flex: 1; }
.lesson-info h3 { margin-bottom: 0.4rem; }
.lesson-meta { display: flex; gap: 0.5rem; flex-wrap: wrap; }

.lesson-status {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;
  flex-shrink: 0;
}

.status-done { font-size: 1.3rem; }
.status-arrow { color: var(--text-dim); font-size: 1.2rem; }
.xp-tag { font-size: 0.75rem; color: var(--xp-gold); font-weight: 700; }

.boss-battle {
  background: linear-gradient(135deg, rgba(239,68,68,0.08), rgba(139,92,246,0.08));
  border-color: rgba(239,68,68,0.3);
}

.boss-header {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.boss-icon { font-size: 2.5rem; flex-shrink: 0; }
.xp-big { font-size: 1.2rem; font-weight: 800; color: var(--xp-gold); flex-shrink: 0; }

.boss-requirements {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 0.75rem;
}

.req-badge {
  font-size: 0.8rem;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  background: var(--bg);
  border: 1px solid var(--border);
  color: var(--text-dim);
}

.req-badge.met {
  border-color: rgba(16,185,129,0.4);
  color: var(--success);
}
</style>
