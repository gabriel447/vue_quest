<script setup>
import { ref, computed } from 'vue'
import CodeEditor from './CodeEditor.vue'

const props = defineProps({
  challenge: { type: Object, required: true },
  isComplete: { type: Boolean, default: false },
  currentIndex: { type: Number, default: 0 },
  total: { type: Number, default: 1 },
})

const emit = defineEmits(['complete', 'skip'])

// Se já concluído, mostra a solução; senão mostra o template/buggyCode
const userAnswer = ref(
  props.isComplete
    ? props.challenge.solution
    : (props.challenge.buggyCode || props.challenge.template || '')
)
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
  const given = normalize(userAnswer.value)
  const isCorrect = given === expected
  result.value = isCorrect ? 'correct' : 'wrong'

  if (isCorrect) {
    const firstTry = attempts.value === 1
    emit('complete', { challengeId: props.challenge.id, firstTry })
  }
}

function toggleSolution() {
  showSolution.value = !showSolution.value
  // nunca toca em userAnswer — o código do usuário permanece intacto
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
      <div class="challenge-header-right">
        <div class="xp-tag">
          <span>⭐ {{ challenge.xpReward }} XP</span>
          <span v-if="attempts === 1 && !result" class="bonus-hint">+bônus primeira tentativa!</span>
        </div>
      </div>
    </div>

    <!-- Descrição -->
    <div class="challenge-description">
      <h3>{{ challenge.title }}</h3>
      <p style="white-space: pre-line">{{ challenge.description }}</p>
    </div>

    <!-- Setup code (se existir) -->
    <div v-if="challenge.setup" class="setup-code">
      <div class="code-label">Contexto:</div>
      <CodeEditor :model-value="challenge.setup" :language="challenge.setup.trimStart().startsWith('<') ? 'html' : 'js'" readonly />
    </div>

    <!-- Editor -->
    <div class="editor-area">
      <div class="code-label">
        Seu código:
        <span v-if="challenge.type === 'fix-bug'" class="buggy-note">⚠️ Código com bug abaixo</span>
      </div>
      <CodeEditor v-model="userAnswer" :language="userAnswer.trimStart().startsWith('<') ? 'html' : 'js'" />
    </div>

    <!-- Feedback -->
    <Transition name="feedback">
      <div
        v-if="result"
        class="feedback-banner"
        :class="result"
      >
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

    <!-- Solução revelada -->
    <Transition name="fade">
      <div v-if="showSolution && result !== 'correct'" class="solution-reveal">
        <div class="code-label">Solução:</div>
        <CodeEditor :model-value="challenge.solution" :language="challenge.solution.trimStart().startsWith('<') ? 'html' : 'js'" readonly />
        <p v-if="challenge.explanation" class="explanation-text">{{ challenge.explanation }}</p>
      </div>
    </Transition>
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

.challenge-header-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.challenge-num {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vue-green);
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
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--xp-gold);
}

.bonus-hint { font-size: 0.75rem; color: var(--vue-green); }

.challenge-description h3 { margin-bottom: 0.5rem; }
.challenge-description p { color: var(--text-muted); }

.setup-code, .solution-reveal {
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
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.buggy-note { color: var(--danger); font-weight: 600; letter-spacing: normal; }

.editor-area { display: flex; flex-direction: column; }

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
