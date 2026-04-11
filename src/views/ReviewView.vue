<script setup>
import { ref, computed } from 'vue'
import { useProgressStore } from '../stores/progress.js'
import { useSRSStore } from '../stores/srs.js'
import { allFlashcards } from '../data/curriculum/index.js'
import FlashCard from '../components/srs/FlashCard.vue'
import LevelUpToast from '../components/game/LevelUpToast.vue'

const progress = useProgressStore()
const srs = useSRSStore()

const SESSION_LIMIT = 5

// Quantidade de cards devidos (para o badge do nav)
const dueCount = computed(() => {
  const now = Date.now()
  return allFlashcards.filter(fc => {
    const card = srs.getCard(fc.id)
    return card && (!card.nextReview || card.nextReview <= now)
  }).length
})

// Snapshot fixo da sessão — não muda enquanto a sessão está rolando
function buildQueue() {
  const now = Date.now()
  return allFlashcards.filter(fc => {
    const card = srs.getCard(fc.id)
    return card && (!card.nextReview || card.nextReview <= now)
  }).slice(0, SESSION_LIMIT)
}

const sessionQueue = ref(buildQueue())
const currentIndex = ref(0)
const sessionResults = ref([])
const sessionDone = ref(false)

const levelUpShow = ref(false)
const levelUpData = ref({ level: 1, title: '' })

const currentCard = computed(() => sessionQueue.value[currentIndex.value])
const totalInSession = computed(() => sessionQueue.value.length)
const sessionProgress = computed(() =>
  totalInSession.value > 0
    ? Math.round((currentIndex.value / totalInSession.value) * 100)
    : 0
)

function onRated({ cardId, quality }) {
  srs.review(cardId, quality)
  const result = progress.recordReview(quality)
  if (result?.levelUp) {
    levelUpData.value = result
    levelUpShow.value = true
  }

  sessionResults.value.push({ id: cardId, quality })

  if (currentIndex.value < sessionQueue.value.length - 1) {
    currentIndex.value++
  } else {
    sessionDone.value = true
  }
}

function resetSession() {
  sessionQueue.value = buildQueue()
  currentIndex.value = 0
  sessionResults.value = []
  sessionDone.value = false
}

const sessionStats = computed(() => {
  const results = sessionResults.value
  if (!results.length) return null
  const perfect = results.filter(r => r.quality >= 4).length
  const ok = results.filter(r => r.quality === 3).length
  const failed = results.filter(r => r.quality < 3).length
  const xpEarned = results.reduce((sum, r) => {
    if (r.quality === 5) return sum + 15
    if (r.quality === 4) return sum + 10
    if (r.quality >= 3) return sum + 5
    return sum
  }, 0)
  return { perfect, ok, failed, total: results.length, xpEarned }
})
</script>

<template>
  <div class="page">
    <div class="container">
      <!-- Header -->
      <div class="review-header animate-fade-in">
        <RouterLink to="/" class="back-link">← Início</RouterLink>
        <h1>⚡ Revisão Espaçada</h1>
        <p class="text-muted">
          Revise o que aprendeu. Avalie honestamente — o algoritmo agenda a próxima revisão automaticamente.
        </p>
      </div>

      <!-- Sessão vazia -->
      <div v-if="totalInSession === 0 && !sessionDone" class="empty-state card mt-3">
        <div class="empty-icon">🎉</div>
        <h2>Tudo em dia!</h2>
        <p class="text-muted">Nenhum card para revisar agora. Continue estudando novas lições!</p>
        <RouterLink to="/" class="btn btn-primary mt-2">
          Ver módulos →
        </RouterLink>
      </div>

      <!-- Progresso da sessão -->
      <div v-if="totalInSession > 0 && !sessionDone" class="session-meta mt-3">
        <div class="session-progress-text">
          <span class="text-muted">{{ currentIndex + 1 }} / {{ totalInSession }}</span>
          <span class="text-green">{{ sessionProgress }}%</span>
        </div>
        <div class="progress-bar mt-1">
          <div class="progress-bar-fill" :style="{ width: sessionProgress + '%' }" />
        </div>
      </div>

      <!-- Card atual -->
      <div v-if="currentCard && !sessionDone" class="flashcard-area mt-3">
        <FlashCard
          :key="currentCard.id"
          :card="currentCard"
          @rated="onRated"
        />
      </div>

      <!-- Resultado da sessão -->
      <div v-if="sessionDone" class="session-done card mt-3 animate-fade-in">
        <div class="done-icon">🏆</div>
        <h2>Sessão Completa!</h2>

        <div v-if="sessionStats" class="session-stats">
          <div class="stat-row">
            <div class="stat-item-done">
              <span class="stat-num green">{{ sessionStats.perfect }}</span>
              <span class="stat-lbl">Acertos fáceis</span>
            </div>
            <div class="stat-item-done">
              <span class="stat-num yellow">{{ sessionStats.ok }}</span>
              <span class="stat-lbl">Ok / difícil</span>
            </div>
            <div class="stat-item-done">
              <span class="stat-num red">{{ sessionStats.failed }}</span>
              <span class="stat-lbl">Erros</span>
            </div>
          </div>
          <div class="xp-earned">
            +{{ sessionStats.xpEarned }} XP ganhos nesta sessão!
          </div>
        </div>

        <div class="done-actions mt-3">
          <RouterLink to="/" class="btn btn-secondary">
            ← Início
          </RouterLink>
          <button
            v-if="dueCount > 0"
            class="btn btn-primary"
            @click="resetSession"
          >
            Continuar revisão ({{ dueCount }} restantes)
          </button>
        </div>
      </div>

      <!-- Legenda de avaliação -->
      <div v-if="currentCard && !sessionDone" class="rating-guide card mt-3">
        <div class="guide-title text-muted">Guia de avaliação SM-2</div>
        <div class="guide-items">
          <div class="guide-item">
            <span class="guide-num">1-2</span>
            <span>Errei — próxima revisão amanhã</span>
          </div>
          <div class="guide-item">
            <span class="guide-num">3</span>
            <span>Difícil — revisão em alguns dias</span>
          </div>
          <div class="guide-item">
            <span class="guide-num">4-5</span>
            <span>Fácil — intervalo aumenta progressivamente</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <LevelUpToast
    :show="levelUpShow"
    :level="levelUpData.level"
    :title="levelUpData.title"
    @close="levelUpShow = false"
  />
</template>

<style scoped>
.review-header { display: flex; flex-direction: column; gap: 0.5rem; }
.back-link { color: var(--text-muted); text-decoration: none; font-size: 0.9rem; }
.back-link:hover { color: var(--vue-green); }

.empty-state {
  text-align: center;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.empty-icon { font-size: 4rem; }

.session-meta { display: flex; flex-direction: column; }
.session-progress-text {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.flashcard-area { padding: 0.5rem 0; }

.session-done {
  text-align: center;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
}

.done-icon { font-size: 3.5rem; }

.session-stats { width: 100%; display: flex; flex-direction: column; gap: 1rem; }
.stat-row {
  display: flex;
  justify-content: center;
  gap: 2rem;
}

.stat-item-done {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.stat-num {
  font-size: 2rem;
  font-weight: 800;
}
.stat-num.green { color: var(--success); }
.stat-num.yellow { color: var(--xp-gold); }
.stat-num.red { color: var(--danger); }
.stat-lbl { font-size: 0.8rem; color: var(--text-muted); }

.xp-earned {
  background: rgba(251,191,36,0.1);
  border: 1px solid rgba(251,191,36,0.2);
  border-radius: var(--radius-sm);
  padding: 0.75rem 1.5rem;
  color: var(--xp-gold);
  font-weight: 700;
  font-size: 1.1rem;
}

.done-actions { display: flex; gap: 1rem; }

.rating-guide {
  padding: 1rem;
  border-color: rgba(255,255,255,0.05);
}

.guide-title {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 2px;
  margin-bottom: 0.75rem;
}

.guide-items { display: flex; flex-direction: column; gap: 0.4rem; }

.guide-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.85rem;
  color: var(--text-muted);
}

.guide-num {
  font-size: 0.8rem;
  font-weight: 700;
  background: var(--border);
  color: var(--text);
  padding: 0.1rem 0.5rem;
  border-radius: 4px;
  min-width: 2rem;
  text-align: center;
}
</style>
