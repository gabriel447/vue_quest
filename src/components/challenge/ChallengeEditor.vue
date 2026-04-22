<script setup>
import { ref, computed, onMounted } from 'vue'
import { Repl, useStore, useVueImportMap } from '@vue/repl'
import CodemirrorEditor from '@vue/repl/codemirror-editor'
import '@vue/repl/style.css'

const props = defineProps({
  challenge: { type: Object, required: true },
  isComplete: { type: Boolean, default: false },
  currentIndex: { type: Number, default: 0 },
  total: { type: Number, default: 1 },
})

const emit = defineEmits(['complete', 'skip'])

const initialCode = props.isComplete
  ? props.challenge.solution
  : (props.challenge.buggyCode || props.challenge.template || '')

const { importMap } = useVueImportMap()
const store = useStore({ builtinImportMap: importMap })

onMounted(async () => {
  await store.setFiles({ 'App.vue': initialCode })
})

const showHint = ref(false)
const result = ref(props.isComplete ? 'correct' : null)
const attempts = ref(0)
const showSolution = ref(false)

function normalize(str) {
  return str.replace(/<!--[\s\S]*?-->/g, '').replace(/\s+/g, ' ').trim()
}

function checkAnswer() {
  attempts.value++
  const expected = normalize(props.challenge.solution)
  const given = normalize(store.activeFile.code)
  const isCorrect = given === expected
  result.value = isCorrect ? 'correct' : 'wrong'

  if (isCorrect) {
    emit('complete', { challengeId: props.challenge.id, firstTry: attempts.value === 1 })
  }
}

function toggleSolution() {
  showSolution.value = !showSolution.value
}

const feedbackMessage = computed(() => {
  if (result.value === 'correct') return '✅ Correto! Excelente!'
  if (result.value === 'wrong') return '❌ Não é isso. Tente novamente!'
  return null
})
</script>

<template>
  <div class="challenge-editor">

    <!-- Header -->
    <div class="challenge-header">
      <div class="challenge-type-badge" :class="`type-${challenge.type}`">
        <span v-if="challenge.type === 'fill-blank'">Preencha as lacunas</span>
        <span v-else-if="challenge.type === 'write-from-scratch'">Escreva do zero</span>
        <span v-else-if="challenge.type === 'fix-bug'">Corrija o bug</span>
      </div>
      <div class="xp-tag">
        <span>⭐ {{ challenge.xpReward }} XP</span>
      </div>
    </div>

    <!-- Descrição -->
    <div class="challenge-description">
      <h3>{{ challenge.title }}</h3>
      <p>{{ challenge.description }}</p>
    </div>

    <!-- Repl: editor + preview ao vivo -->
    <div class="repl-wrapper">
      <Repl
        :store="store"
        :editor="CodemirrorEditor"
        theme="dark"
        layout="horizontal"
        :show-compile-output="false"
        :show-import-map="false"
        :show-ts-config="false"
        :clear-console="false"
        :auto-resize="true"
      />
    </div>

    <!-- Feedback -->
    <Transition name="feedback">
      <div v-if="result" class="feedback-banner" :class="result">
        {{ feedbackMessage }}
        <div v-if="result === 'wrong' && challenge.explanation" class="explanation">
          {{ challenge.explanation }}
        </div>
      </div>
    </Transition>

    <!-- Dica -->
    <Transition name="fade">
      <div v-if="showHint" class="hint-box">
        💡 <span>{{ challenge.hint }}</span>
      </div>
    </Transition>

    <!-- Solução revelada -->
    <Transition name="fade">
      <div v-if="showSolution && result !== 'correct'" class="solution-reveal">
        <div class="code-label">Solução:</div>
        <pre class="solution-code">{{ challenge.solution }}</pre>
        <p v-if="challenge.explanation" class="explanation-text">{{ challenge.explanation }}</p>
      </div>
    </Transition>

    <!-- Actions -->
    <div class="challenge-actions">
      <button
        v-if="result !== 'correct' && challenge.hint"
        class="btn btn-ghost btn-sm"
        :class="{ 'hint-active': showHint }"
        @click="showHint = !showHint"
      >
        {{ showHint ? '🙈 Ocultar dica' : '💡 Ver dica' }}
      </button>

      <button
        v-if="result !== 'correct'"
        class="btn btn-ghost btn-sm"
        :class="{ 'solution-active': showSolution }"
        @click="toggleSolution"
      >
        {{ showSolution ? '🙈 Ocultar solução' : '👁️ Ver solução' }}
      </button>

      <button
        class="btn btn-primary"
        @click="result === 'correct' ? emit('skip') : checkAnswer()"
      >
        {{ result === 'correct' ? (currentIndex + 1 >= total ? 'Concluir ✓' : 'Próximo') : 'Verificar' }}
      </button>
    </div>

  </div>
</template>

<style scoped>
.challenge-editor {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.challenge-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.challenge-type-badge {
  padding: 0.3rem 0.8rem;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.type-fill-blank { background: rgba(59,130,246,0.15); color: var(--info); }
.type-write-from-scratch { background: rgba(139,92,246,0.15); color: var(--purple); }
.type-fix-bug { background: rgba(239,68,68,0.15); color: var(--danger); }

.xp-tag {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--xp-gold);
}

.challenge-description h3 { margin-bottom: 0.5rem; }
.challenge-description p { color: var(--text-muted); }

.repl-wrapper {
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid rgba(121, 112, 169, 0.35);
  height: 480px;
}

.repl-wrapper :deep(.vue-repl) {
  height: 100%;
}

.solution-reveal {
  background: rgba(13, 17, 23, 0.8);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 1rem;
}

.code-label {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 2px;
  color: var(--text-dim);
  margin-bottom: 0.5rem;
}

.solution-code {
  background: #22212c;
  border-radius: 8px;
  padding: 1rem;
  font-family: 'Fira Code', 'JetBrains Mono', monospace;
  font-size: 0.88rem;
  line-height: 1.75;
  color: #f8f8f2;
  overflow-x: auto;
  white-space: pre;
}

.feedback-banner {
  padding: 0.75rem 1rem;
  border-radius: var(--radius-sm);
  font-weight: 600;
}

.feedback-banner.correct { background: rgba(16,185,129,0.15); color: var(--success); border: 1px solid rgba(16,185,129,0.3); }
.feedback-banner.wrong { background: rgba(239,68,68,0.1); color: var(--danger); border: 1px solid rgba(239,68,68,0.2); }

.explanation {
  margin-top: 0.5rem;
  font-size: 0.85rem;
  font-weight: 400;
  opacity: 0.85;
}

.hint-box {
  background: rgba(251,191,36,0.08);
  border: 1px solid rgba(251,191,36,0.2);
  border-radius: var(--radius-sm);
  padding: 0.75rem 1rem;
  font-size: 0.9rem;
  color: var(--xp-gold);
  display: flex;
  gap: 0.5rem;
}

.challenge-actions {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  justify-content: flex-end;
}

.explanation-text {
  margin-top: 0.75rem;
  font-size: 0.9rem;
  color: var(--text-muted);
  line-height: 1.6;
  white-space: pre-line;
}

.solution-active { color: var(--vue-green); border-color: rgba(66,184,131,0.3); }
.hint-active { color: #fbbf24; border-color: rgba(251,191,36,0.3); }

.feedback-enter-active { animation: fadeIn 0.3s ease; }
.fade-enter-active { animation: fadeIn 0.25s ease; }
</style>
