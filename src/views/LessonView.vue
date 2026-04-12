<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProgressStore } from '../stores/progress.js'
import { useSRSStore } from '../stores/srs.js'
import { useNotesStore } from '../stores/notes.js'
import { getLessonById, getModuleById } from '../data/curriculum/index.js'
import ChallengeEditor from '../components/challenge/ChallengeEditor.vue'
import LevelUpToast from '../components/game/LevelUpToast.vue'
import CodeEditor from '../components/challenge/CodeEditor.vue'

const route = useRoute()
const router = useRouter()
const progress = useProgressStore()
const srs = useSRSStore()
const notes = useNotesStore()

const lesson = computed(() => getLessonById(route.params.id))

// Seção ativa: 'theory' | 'challenges' | 'notes'
const allChallengesAlreadyDone = lesson.value?.challenges?.every(ch => progress.isChallengeComplete(ch.id)) ?? false
const theoryAlreadyDone = progress.isLessonComplete(lesson.value?.id)

const showCompletion = ref(allChallengesAlreadyDone)
const showTheoryCompletion = ref(theoryAlreadyDone)
const activeTab = ref(allChallengesAlreadyDone ? 'challenges' : 'theory')
const currentTheoryIndex = ref(0)
const currentChallengeIndex = ref(0)

// Notes
const noteContent = ref(notes.getNote(route.params.id)?.content || '')
let saveTimeout = null
function autoSaveNote() {
  clearTimeout(saveTimeout)
  saveTimeout = setTimeout(() => {
    notes.setNote(route.params.id, noteContent.value)
  }, 800)
}

// Level up toast
const levelUpShow = ref(false)
const levelUpData = ref({ level: 1, title: '' })

function showLevelUp(data) {
  levelUpData.value = data
  levelUpShow.value = true
}

// Módulo desta lição
const lessonModule = computed(() => getModuleById(lesson.value?.moduleId))

// Módulo está completo quando todas as lições têm teoria concluída
const isModuleComplete = computed(() => {
  const mod = lessonModule.value
  if (!mod || !mod.lessons.length) return false
  return mod.lessons.every(l => progress.isLessonComplete(l.id))
})

// Registrar flashcards da lição ao concluí-la
function registerLessonFlashcards() {
  lesson.value?.flashcards?.forEach(fc => srs.registerCard(fc.id))
}

// Se já concluiu teoria E todos os desafios, garante que os cards estão registrados
if (allChallengesAlreadyDone && theoryAlreadyDone) registerLessonFlashcards()

// Completar lição ao terminar teoria
function finishTheory() {
  showTheoryCompletion.value = true
  const result = progress.completeLesson(lesson.value.id)
  if (result?.levelUp) showLevelUp(result)

  // Se todas as lições do módulo estão completas, marca o módulo
  const mod = lessonModule.value
  if (mod && mod.lessons.every(l => progress.isLessonComplete(l.id))) {
    progress.completeModule(mod.id)
  }
}

// Desafio completo
function onChallengeComplete({ challengeId, firstTry }) {
  const result = progress.completeChallenge(challengeId, firstTry)
  if (result?.levelUp) showLevelUp(result)

  // Libera os flashcards só quando teoria + todos os desafios estiverem concluídos
  const allDone = lesson.value?.challenges?.every(ch => progress.isChallengeComplete(ch.id))
  if (allDone && progress.isLessonComplete(lesson.value.id)) {
    registerLessonFlashcards()
  }
}

function nextChallenge() {
  const last = (lesson.value?.challenges?.length ?? 0) - 1
  if (currentChallengeIndex.value < last) {
    currentChallengeIndex.value++
  } else {
    showCompletion.value = true
  }
}

const isLastTheory = computed(() =>
  currentTheoryIndex.value === (lesson.value?.theory?.length ?? 0) - 1
)

const currentChallenge = computed(() =>
  lesson.value?.challenges?.[currentChallengeIndex.value]
)

const allChallengesDone = computed(() =>
  lesson.value?.challenges?.every(ch => progress.isChallengeComplete(ch.id))
)

const isLessonFullyComplete = computed(() =>
  (lesson.value?.challenges?.every(ch => progress.isChallengeComplete(ch.id)) ?? false) &&
  progress.isLessonComplete(lesson.value?.id)
)
</script>

<template>
  <div class="page" v-if="lesson">
    <div class="container">
      <!-- Header -->
      <div class="lesson-header animate-fade-in">
        <RouterLink :to="`/module/${lesson.moduleId}`" class="back-link">
          ← {{ lesson.moduleId }}
        </RouterLink>
        <div class="lesson-title-row">
          <span class="lesson-icon">{{ lesson.icon }}</span>
          <div>
            <h1>{{ lesson.title }}</h1>
            <a :href="lesson.docUrl" target="_blank" class="doc-link">
              📖 Ver documentação oficial →
            </a>
          </div>
        </div>
      </div>

      <!-- LIÇÃO CONCLUÍDA -->
      <div v-if="isLessonFullyComplete" class="lesson-complete-card card mt-3 animate-fade-in">
        <div class="lc-icon">✅</div>
        <div class="lc-body">
          <h3>Lição concluída</h3>
          <p class="text-muted">Você completou a teoria e todos os desafios desta lição.</p>
        </div>
        <RouterLink to="/review" class="btn btn-secondary btn-sm">⚡ Revisar flashcards</RouterLink>
      </div>

      <!-- Tabs (só quando não concluída) -->
      <div v-if="!isLessonFullyComplete" class="tabs mt-3">
        <button
          class="tab-btn"
          :class="{ active: activeTab === 'theory' }"
          @click="activeTab = 'theory'"
        >
          📖 Teoria
        </button>
        <button
          class="tab-btn"
          :class="{ active: activeTab === 'challenges', 'tab-locked': !showTheoryCompletion }"
          :disabled="!showTheoryCompletion"
          @click="showTheoryCompletion && (activeTab = 'challenges')"
        >
          ⚔️ Desafios
        </button>
        <button
          class="tab-btn"
          :class="{ active: activeTab === 'notes' }"
          @click="activeTab = 'notes'"
        >
          📝 Notas
        </button>
      </div>

      <!-- TEORIA -->
      <div v-if="!isLessonFullyComplete && activeTab === 'theory'" class="tab-content animate-fade-in">
        <!-- Banner pós-conclusão -->
        <template v-if="showTheoryCompletion">
          <div class="lesson-complete-card card mt-3 animate-fade-in">
            <div class="lc-icon">🎉</div>
            <div class="lc-body">
              <h3>Teoria concluída!</h3>
              <p class="text-muted">Agora coloque em prática o que aprendeu.</p>
            </div>
            <button class="btn btn-secondary btn-sm" @click="activeTab = 'challenges'">
              Ir para Desafios ⚔️
            </button>
          </div>
        </template>

        <!-- Slides da teoria (fluxo normal ou modo visualização) -->
        <template v-else>
          <div class="theory-card card mt-2">
            <div class="theory-header">
              <h2>{{ lesson.theory[currentTheoryIndex].title }}</h2>
              <span class="theory-slide-num">{{ currentTheoryIndex + 1 }} / {{ lesson.theory.length }}</span>
            </div>
            <p class="theory-body">{{ lesson.theory[currentTheoryIndex].body }}</p>
            <CodeEditor
              v-if="lesson.theory[currentTheoryIndex].code"
              :model-value="lesson.theory[currentTheoryIndex].code"
              :language="lesson.theory[currentTheoryIndex].code.trimStart().startsWith('<') ? 'html' : 'js'"
              readonly
            />

            <div class="theory-nav">
              <button
                class="btn btn-ghost"
                :disabled="currentTheoryIndex === 0"
                @click="currentTheoryIndex--"
              >
                Anterior
              </button>

              <button
                v-if="!isLastTheory"
                class="btn btn-primary"
                @click="currentTheoryIndex++"
              >
                Próximo ({{ currentTheoryIndex + 1 }}/{{ lesson.theory.length }})
              </button>
              <button
                v-else-if="!isLessonFullyComplete"
                class="btn btn-primary"
                @click="finishTheory"
              >
                Concluir ✓
              </button>
            </div>
          </div>

          <div v-if="!isLessonFullyComplete" class="unlock-reward mt-3">
            <div class="unlock-icon">⚔️</div>
            <div class="unlock-body">
              <span class="unlock-title">Recompensa ao concluir</span>
              <span class="unlock-desc">{{ lesson.challenges?.length || 0 }} desafios práticos desbloqueados</span>
            </div>
            <div class="unlock-badge">🔒</div>
          </div>
        </template>
      </div>

      <!-- DESAFIOS -->
      <div v-if="!isLessonFullyComplete && activeTab === 'challenges'" class="tab-content animate-fade-in">
        <div v-if="lesson.challenges?.length > 0">

          <div v-if="!showCompletion" class="challenge-segments mt-2">
            <div
              v-for="(ch, i) in lesson.challenges"
              :key="ch.id"
              class="segment"
              :class="{
                active: i === currentChallengeIndex,
                done: progress.isChallengeComplete(ch.id),
              }"
              @click="currentChallengeIndex = i"
            />
          </div>

          <div v-if="!showCompletion" class="card">
            <ChallengeEditor
              v-if="currentChallenge"
              :key="currentChallenge.id"
              :challenge="currentChallenge"
              :is-complete="progress.isChallengeComplete(currentChallenge.id)"
              :current-index="currentChallengeIndex"
              :total="lesson.challenges.length"
              @complete="onChallengeComplete"
              @skip="nextChallenge"
            />

          </div>

          <div v-if="!showCompletion && !allChallengesDone" class="unlock-reward mt-3">
            <div class="unlock-icon">⚡</div>
            <div class="unlock-body">
              <span class="unlock-title">Recompensa ao concluir</span>
              <span class="unlock-desc">{{ lesson.flashcards?.length || 0 }} flashcards desbloqueados</span>
            </div>
            <div class="unlock-badge">🔒</div>
          </div>

          <div v-if="showCompletion" class="lesson-complete-card card mt-3 animate-fade-in">
            <div class="lc-icon">⚔️</div>
            <div class="lc-body">
              <h3>Desafios concluídos!</h3>
              <p class="text-muted">Todos os desafios desta lição foram completados.</p>
            </div>
            <RouterLink v-if="isModuleComplete" to="/review" class="btn btn-primary btn-sm">
              Ir para revisão →
            </RouterLink>
          </div>
        </div>
        <div v-else class="card">
          <p class="text-muted">Esta lição ainda não tem desafios. Em breve!</p>
        </div>
      </div>

      <!-- NOTAS -->
      <div v-if="!isLessonFullyComplete && activeTab === 'notes'" class="tab-content animate-fade-in">
        <div class="notes-area card">
          <div class="notes-header">
            <h3>📝 Suas Notas — {{ lesson.title }}</h3>
            <span class="autosave-indicator text-muted">salvo automaticamente</span>
          </div>
          <textarea
            v-model="noteContent"
            class="notes-textarea"
            placeholder="Escreva suas anotações aqui... O quê você aprendeu? O que foi difícil? Suas próprias palavras ajudam a memorizar."
            @input="autoSaveNote"
          />
          <div class="notes-tip">
            💡 Dica: Explicar o conceito com suas próprias palavras é a técnica de aprendizado mais eficaz.
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
.lesson-header { display: flex; flex-direction: column; gap: 1rem; }
.back-link { color: var(--text-muted); text-decoration: none; font-size: 0.9rem; }
.back-link:hover { color: var(--vue-green); }

.lesson-title-row { display: flex; align-items: flex-start; gap: 1rem; }
.lesson-icon { font-size: 2.5rem; line-height: 1; }
.doc-link {
  color: var(--text-dim);
  text-decoration: none;
  font-size: 0.85rem;
  transition: color 0.2s;
}
.doc-link:hover { color: var(--vue-green); }

.tabs {
  display: flex;
  gap: 0.5rem;
  border-bottom: 1px solid var(--border);
  padding-bottom: 0;
}

.tab-btn {
  padding: 0.6rem 1.25rem;
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  color: var(--text-muted);
  cursor: pointer;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.2s;
  margin-bottom: -1px;
}
.tab-btn:hover:not(:disabled) { color: var(--text); }
.tab-btn.active { color: var(--vue-green); border-bottom-color: var(--vue-green); }
.tab-btn.tab-locked { opacity: 0.4; cursor: not-allowed; }
.tab-lock-icon { font-size: 0.7rem; }

.tab-content { padding-top: 1.5rem; }

.theory-progress {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.card-progress-bar {
  height: 3px;
  background: var(--border);
  margin: -1.5rem -1.5rem 1.5rem -1.5rem;
  border-radius: var(--radius) var(--radius) 0 0;
  overflow: hidden;
}

.card-progress-fill {
  height: 100%;
  background: var(--vue-green);
  transition: width 0.3s ease;
}

.theory-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.theory-slide-num {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vue-green);
  flex-shrink: 0;
  margin-top: 0.25rem;
}

.theory-card h2 {
  font-size: 1.35rem;
  line-height: 1.3;
  margin: 0;
}

.theory-body {
  color: var(--text-muted);
  line-height: 1.8;
  margin-bottom: 1.25rem;
  white-space: pre-line;
  font-size: 0.97rem;
}
.theory-code { font-size: 0.88rem; }

.theory-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1.5rem;
  gap: 0.75rem;
}


.theory-dots, .challenge-dots {
  display: flex;
  gap: 0.4rem;
  align-items: center;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--border);
  cursor: pointer;
  transition: all 0.2s;
}
.dot.active { background: var(--vue-green); transform: scale(1.3); }
.dot.done { background: rgba(66,184,131,0.4); }

.challenge-timeline {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  padding: 0.5rem 0;
}

.timeline-step {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.timeline-dot {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: 2px solid var(--border);
  background: var(--bg-card);
  color: var(--text-muted);
  font-size: 0.8rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  flex-shrink: 0;
}
.timeline-step.active .timeline-dot {
  border-color: var(--vue-green);
  color: var(--vue-green);
  background: rgba(66,184,131,0.1);
}
.timeline-step.done .timeline-dot {
  border-color: var(--vue-green);
  background: rgba(66,184,131,0.15);
  color: var(--vue-green);
}

.timeline-line {
  width: 2.5rem;
  height: 2px;
  background: var(--border);
  transition: background 0.3s;
}
.timeline-line.done { background: var(--vue-green); }

.challenge-segments {
  display: flex;
  gap: 4px;
}

.segment {
  flex: 1;
  height: 4px;
  border-radius: 2px;
  background: var(--border);
  cursor: pointer;
  transition: all 0.25s;
}

.segment.active { background: var(--vue-green); opacity: 0.5; }
.segment.done { background: var(--vue-green); opacity: 1; }
.segment:hover { background: var(--vue-green); opacity: 0.35; }

.challenge-tabs {
  display: flex;
  gap: 0.5rem;
}

.ch-tab {
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 50%;
  border: 2px solid var(--border);
  background: var(--bg-card);
  color: var(--text-muted);
  cursor: pointer;
  font-weight: 700;
  font-size: 0.85rem;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ch-tab.active { border-color: var(--vue-green); color: var(--vue-green); }
.ch-tab.done { border-color: var(--success); background: rgba(16,185,129,0.1); }


.theory-complete-reward {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  background: rgba(66,184,131,0.07);
  border: 1px solid rgba(66,184,131,0.25);
  border-radius: var(--radius);
  cursor: pointer;
  transition: background 0.2s;
}
.theory-complete-reward:hover { background: rgba(66,184,131,0.12); }

.tcr-left {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.tcr-title {
  font-weight: 700;
  color: var(--vue-green);
  font-size: 1rem;
}

.tcr-sub {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.all-done-banner {
  background: rgba(66,184,131,0.1);
  border: 1px solid rgba(66,184,131,0.3);
  border-radius: var(--radius);
  padding: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
  color: var(--vue-green);
}

.notes-area { display: flex; flex-direction: column; gap: 1rem; }
.notes-header { display: flex; align-items: center; justify-content: space-between; }
.autosave-indicator { font-size: 0.8rem; }

.notes-textarea {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--text);
  font-family: -apple-system, sans-serif;
  font-size: 0.95rem;
  line-height: 1.7;
  padding: 1rem;
  resize: vertical;
  min-height: 300px;
  outline: none;
  transition: border-color 0.2s;
}
.notes-textarea:focus { border-color: var(--vue-green); }
.notes-textarea::placeholder { color: var(--text-dim); }

.notes-tip {
  font-size: 0.85rem;
  color: var(--text-dim);
  background: rgba(251,191,36,0.06);
  border: 1px solid rgba(251,191,36,0.1);
  border-radius: var(--radius-sm);
  padding: 0.75rem 1rem;
}

.unlock-reward {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.9rem 1.1rem;
  background: rgba(251,191,36,0.05);
  border: 1px dashed rgba(251,191,36,0.3);
  border-radius: var(--radius-sm);
}

.unlock-icon { font-size: 1.5rem; flex-shrink: 0; }

.unlock-body {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  flex: 1;
}

.unlock-title {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #fbbf24;
}

.unlock-desc {
  font-size: 0.9rem;
  color: var(--text-muted);
}

.unlock-badge { font-size: 1.2rem; flex-shrink: 0; }

.flashcard-cta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  font-size: 0.9rem;
}

.locked-review-hint {
  font-size: 0.8rem;
  color: var(--text-dim);
}

.lesson-complete-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  border-color: rgba(66, 184, 131, 0.3);
  background: rgba(66, 184, 131, 0.05);
}

.lc-icon { font-size: 1.8rem; flex-shrink: 0; }
.lc-body { flex: 1; }
.lc-body h3 { margin-bottom: 0.2rem; }
.lc-body p { margin: 0; font-size: 0.9rem; }

.btn-sm {
  padding: 0.35rem 0.9rem;
  font-size: 0.85rem;
}
</style>
