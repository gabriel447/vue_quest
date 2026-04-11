<script setup>
import { ref, computed } from 'vue'
import CodeEditor from '../challenge/CodeEditor.vue'

const props = defineProps({
  card: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['rated'])
const flipped = ref(false)

function flip() {
  flipped.value = !flipped.value
}

function rate(quality) {
  emit('rated', { cardId: props.card.id, quality })
  flipped.value = false
}

// Se o código começa com < é HTML/Vue, senão é JS
const codeLang = computed(() =>
  props.card.code?.trimStart().startsWith('<') ? 'html' : 'js'
)
</script>

<template>
  <div class="flashcard-wrapper">
    <!-- Contexto -->
    <div class="card-context">
      <span class="badge badge-green">{{ card.lessonTitle }}</span>
    </div>

    <!-- Card com fade toggle (sem 3D para CodeMirror renderizar corretamente dentro) -->
    <div class="card-scene">
      <!-- Frente -->
      <Transition name="card-fade" mode="out-in">
        <div v-if="!flipped" class="card-face card-front" @click="flip" key="front">
          <div class="face-label">PERGUNTA</div>
          <p class="card-text">{{ card.front }}</p>
          <button class="flip-hint" @click.stop="flip">
            Revelar resposta →
          </button>
        </div>

        <!-- Verso — texto + código dentro do mesmo card -->
        <div v-else class="card-face card-back" key="back">
          <div class="face-label">RESPOSTA</div>
          <p class="card-text">{{ card.back }}</p>
          <div v-if="card.code" class="card-code-block">
            <div class="code-label-small">Exemplo:</div>
            <CodeEditor :model-value="card.code" :language="codeLang" readonly />
          </div>
        </div>
      </Transition>
    </div>

    <!-- Rating buttons -->
    <Transition name="fade">
      <div v-if="flipped" class="rating-area">
        <p class="rating-label">Como foi?</p>
        <div class="rating-buttons">
          <button class="rate-btn rate-1" @click="rate(1)">
            <span>1</span>
            <small>Apagão</small>
          </button>
          <button class="rate-btn rate-2" @click="rate(2)">
            <span>2</span>
            <small>Errei</small>
          </button>
          <button class="rate-btn rate-3" @click="rate(3)">
            <span>3</span>
            <small>Difícil</small>
          </button>
          <button class="rate-btn rate-4" @click="rate(4)">
            <span>4</span>
            <small>Ok</small>
          </button>
          <button class="rate-btn rate-5" @click="rate(5)">
            <span>5</span>
            <small>Fácil</small>
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.flashcard-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
}

.card-context { text-align: center; }

.card-scene {
  width: 100%;
}

.card-face {
  width: 100%;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  min-height: 220px;
  cursor: pointer;
}

.card-back {
  background: var(--bg-card);
  border-color: rgba(66, 184, 131, 0.25);
  cursor: default;
  align-items: flex-start;
}

.card-fade-enter-active,
.card-fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.card-fade-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.card-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.face-label {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 3px;
  color: var(--text-dim);
}

.card-text {
  font-size: 1.05rem;
  text-align: center;
  line-height: 1.7;
  white-space: pre-line;
}

.card-back .card-text { text-align: left; width: 100%; }

.flip-hint {
  background: transparent;
  border: 1px dashed var(--border);
  color: var(--text-muted);
  padding: 0.5rem 1.25rem;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
  margin-top: 0.5rem;
}
.flip-hint:hover { border-color: var(--vue-green); color: var(--vue-green); }

.card-code-block {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  width: 100%;
  margin-top: 0.5rem;
}

.code-label-small {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 2px;
  color: var(--text-dim);
}

.rating-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.rating-label {
  font-size: 0.85rem;
  color: var(--text-muted);
  font-weight: 600;
  letter-spacing: 1px;
}

.rating-buttons {
  display: flex;
  gap: 0.5rem;
  width: 100%;
}

.rate-btn {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
  padding: 0.75rem 0.5rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
  cursor: pointer;
  transition: all 0.2s;
  background: var(--bg-card);
  color: var(--text);
}

.rate-btn span { font-size: 1.2rem; font-weight: 800; color: var(--text); }
.rate-btn small { font-size: 0.72rem; color: var(--text-muted); }


.rate-1:hover { background: rgba(239,68,68,0.15); border-color: var(--danger); color: var(--danger); }
.rate-2:hover { background: rgba(249,115,22,0.15); border-color: var(--streak-orange); color: var(--streak-orange); }
.rate-3:hover { background: rgba(234,179,8,0.15); border-color: #eab308; color: #eab308; }
.rate-4:hover { background: rgba(59,130,246,0.15); border-color: var(--info); color: var(--info); }
.rate-5:hover { background: rgba(16,185,129,0.15); border-color: var(--success); color: var(--success); }

.fade-enter-active { animation: fadeIn 0.3s ease; }
.fade-leave-active { animation: fadeIn 0.3s ease reverse; }
</style>
