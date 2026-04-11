<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useProgressStore } from '../stores/progress.js'
import { useSRSStore } from '../stores/srs.js'
import { modules } from '../data/curriculum/index.js'
import XPBar from '../components/game/XPBar.vue'

const router = useRouter()
const progress = useProgressStore()
const srs = useSRSStore()

const dueReviews = computed(() => srs.dueCount)
const hasCompletedModule = computed(() => progress.completedModules.length > 0)

// Calcula progresso de cada módulo e unlock dinâmico
const modulesWithProgress = computed(() =>
  modules.map((mod, index) => {
    const total = mod.lessons.length
    const done = mod.lessons.filter(l => progress.isLessonComplete(l.id)).length
    const percent = total > 0 ? Math.round((done / total) * 100) : 0

    // Primeiro módulo sempre desbloqueado.
    // Demais: desbloqueiam quando todas as lições do anterior estiverem completas.
    let locked = false
    if (index > 0) {
      const prev = modules[index - 1]
      const prevAllDone = prev.lessons.length > 0 &&
        prev.lessons.every(l => progress.isLessonComplete(l.id))
      locked = !prevAllDone
    }

    return { ...mod, done, total, percent, locked }
  })
)

const totalLessonsComplete = computed(() =>
  progress.completedLessons.length
)
</script>

<template>
  <div class="page">
    <div class="container">
      <!-- Hero Welcome -->
      <div class="hero animate-fade-in">
        <div class="hero-left">
          <h1 class="hero-title">
            Bem-vindo ao <span class="text-green">Vue Quest</span>
          </h1>
          <p class="hero-sub">
            Domine Vue.js escrevendo código real. Cada dia de prática te deixa mais forte.
          </p>
        </div>
        <div class="hero-stats">
          <div class="stat-card">
            <div class="stat-icon">🔥</div>
            <div class="stat-value">{{ progress.streakDays }}</div>
            <div class="stat-label">dias seguidos</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">📚</div>
            <div class="stat-value">{{ totalLessonsComplete }}</div>
            <div class="stat-label">lições completas</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">🎯</div>
            <div class="stat-value">{{ dueReviews }}</div>
            <div class="stat-label">revisões pendentes</div>
          </div>
        </div>
      </div>

      <!-- XP Bar -->
      <div class="card mt-3">
        <XPBar />
      </div>

      <!-- Review CTA -->
      <div v-if="dueReviews > 0" class="review-cta mt-3">
        <div class="cta-content">
          <span class="cta-icon">⚡</span>
          <div>
            <div class="cta-title">{{ dueReviews }} card(s) esperando revisão</div>
            <div class="cta-sub">Revise agora para não quebrar seu streak!</div>
          </div>
        </div>
        <RouterLink to="/review" class="btn btn-primary">
          Revisar agora →
        </RouterLink>
      </div>

      <!-- Skill Map -->
      <section class="skill-map mt-4">
        <h2 class="section-title">Mapa de Habilidades</h2>
        <div class="modules-grid">
          <div
            v-for="mod in modulesWithProgress"
            :key="mod.id"
            class="module-card card"
            :class="{ locked: mod.locked, active: !mod.locked }"
            @click="!mod.locked && router.push(`/module/${mod.id}`)"
          >
            <div class="module-header">
              <span class="module-icon">{{ mod.icon }}</span>
              <div class="module-info">
                <h3>{{ mod.title }}</h3>
                <p class="text-muted">{{ mod.description }}</p>
              </div>
              <div v-if="mod.locked" class="lock-icon">🔒</div>
            </div>

            <div v-if="!mod.locked && mod.total > 0" class="module-progress">
              <div class="progress-meta">
                <span class="text-muted">{{ mod.done }}/{{ mod.total }} lições</span>
                <span :class="mod.percent === 100 ? 'text-green' : 'text-muted'">
                  {{ mod.percent }}%
                </span>
              </div>
              <div class="progress-bar">
                <div
                  class="progress-bar-fill"
                  :style="{ width: mod.percent + '%', background: mod.color }"
                />
              </div>
            </div>

            <div v-if="mod.locked" class="locked-msg">
              Complete o módulo anterior para desbloquear
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.hero {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 2rem;
  padding: 2rem 0;
}

.hero-title { font-size: 2.2rem; margin-bottom: 0.5rem; }
.hero-sub { color: var(--text-muted); font-size: 1.05rem; }

.hero-stats {
  display: flex;
  gap: 1rem;
  flex-shrink: 0;
}

.stat-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1rem 1.25rem;
  text-align: center;
  min-width: 90px;
}

.stat-icon { font-size: 1.5rem; }
.stat-value { font-size: 1.8rem; font-weight: 800; color: var(--text); }
.stat-label { font-size: 0.75rem; color: var(--text-dim); }

.review-cta {
  background: linear-gradient(135deg, rgba(249,115,22,0.12), rgba(251,191,36,0.08));
  border: 1px solid rgba(249,115,22,0.3);
  border-radius: var(--radius);
  padding: 1.25rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.cta-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.cta-icon { font-size: 2rem; }
.cta-title { font-weight: 700; font-size: 1rem; }
.cta-sub { color: var(--text-muted); font-size: 0.85rem; }

.section-title {
  font-size: 1.3rem;
  margin-bottom: 1.25rem;
  color: var(--text);
}

.modules-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.module-card {
  cursor: default;
  transition: all 0.2s;
}

.module-card.active {
  cursor: pointer;
}

.module-card.active:hover {
  border-color: var(--vue-green);
  transform: translateX(4px);
}

.module-card.locked {
  opacity: 0.5;
}

.module-header {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.module-icon { font-size: 2rem; flex-shrink: 0; }

.module-info { flex: 1; }
.module-info h3 { margin-bottom: 0.25rem; }
.module-info p { font-size: 0.9rem; }

.lock-icon { font-size: 1.5rem; }

.module-progress { margin-top: 1rem; }

.progress-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  margin-bottom: 0.4rem;
}

.locked-msg {
  margin-top: 0.75rem;
  font-size: 0.8rem;
  color: var(--text-dim);
}
</style>
