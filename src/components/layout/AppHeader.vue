<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useProgressStore } from '../../stores/progress.js'
import { useSRSStore } from '../../stores/srs.js'
import { useNotesStore } from '../../stores/notes.js'

const router = useRouter()
const progress = useProgressStore()
const srs = useSRSStore()
const notes = useNotesStore()

const dueCount = computed(() => srs.dueCount)
const hasCards = computed(() => Object.keys(srs.cards).length > 0)
const showResetModal = ref(false)
const resetConfirmText = ref('')

function openReset() {
  resetConfirmText.value = ''
  showResetModal.value = true
}

function confirmReset() {
  if (resetConfirmText.value.trim().toLowerCase() !== 'reset') return
  progress.reset()
  srs.reset()
  notes.reset()
  showResetModal.value = false
  resetConfirmText.value = ''
  router.push('/')
}
</script>

<template>
  <header class="app-header">
    <div class="container header-inner">
      <RouterLink to="/" class="logo">
        <span class="logo-icon">⚡</span>
        <span class="logo-text">Vue<span class="logo-accent">Quest</span></span>
      </RouterLink>

      <nav class="nav-links">
        <RouterLink to="/" class="nav-link">Início</RouterLink>
        <RouterLink v-if="hasCards" to="/review" class="nav-link">
          Revisão
          <span v-if="dueCount > 0" class="due-badge">{{ dueCount }}</span>
        </RouterLink>
        <RouterLink to="/notes" class="nav-link">Notas</RouterLink>
      </nav>

      <div class="header-stats">
        <div class="stat-item">
          <span class="stat-icon">🔥</span>
          <span class="stat-value">{{ progress.streakDays }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-icon">⭐</span>
          <span class="stat-value">{{ progress.xp }} XP</span>
        </div>
        <div class="level-badge">
          <span>Lv {{ progress.level }}</span>
        </div>

        <button class="reset-btn" @click="openReset" title="Resetar progresso">
          🗑️
        </button>
      </div>
    </div>
  </header>

  <!-- Modal de confirmação de reset -->
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="showResetModal" class="modal-overlay" @click.self="showResetModal = false">
        <div class="modal-box">
          <div class="modal-icon">⚠️</div>
          <h2 class="modal-title">Resetar tudo?</h2>
          <p class="modal-desc">
            Isso vai apagar <strong>todo o progresso</strong>: XP, lições, desafios, flashcards e notas.
            Esta ação é <strong>irreversível</strong>.
          </p>

          <div class="modal-confirm-field">
            <label>Para confirmar, digite <code>reset</code> abaixo:</label>
            <input
              v-model="resetConfirmText"
              placeholder="reset"
              class="modal-input"
              @keyup.enter="confirmReset"
              autofocus
            />
          </div>

          <div class="modal-actions">
            <button class="btn btn-ghost" @click="showResetModal = false">
              Cancelar
            </button>
            <button
              class="btn btn-danger"
              :disabled="resetConfirmText.trim().toLowerCase() !== 'reset'"
              @click="confirmReset"
            >
              🗑️ Resetar tudo
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.app-header {
  background: rgba(15, 15, 26, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-inner {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding-top: 0.85rem;
  padding-bottom: 0.85rem;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  font-size: 1.3rem;
  font-weight: 800;
  color: var(--text);
}

.logo-icon { font-size: 1.4rem; }
.logo-accent { color: var(--vue-green); }

.nav-links {
  display: flex;
  gap: 0.25rem;
  flex: 1;
}

.nav-link {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.9rem;
  border-radius: var(--radius-sm);
  text-decoration: none;
  color: var(--text-muted);
  font-weight: 500;
  transition: all 0.2s;
}

.nav-link:hover { color: var(--text); background: rgba(255,255,255,0.05); }
.nav-link.router-link-active { color: var(--vue-green); background: rgba(66, 184, 131, 0.1); }

.due-badge {
  background: var(--streak-orange);
  color: white;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.1rem 0.45rem;
  border-radius: 999px;
  min-width: 1.2rem;
  text-align: center;
}

.header-stats {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-muted);
}

.level-badge {
  background: rgba(66, 184, 131, 0.15);
  color: var(--vue-green);
  border: 1px solid rgba(66, 184, 131, 0.3);
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 700;
}

.reset-btn {
  background: transparent;
  border: 1px solid rgba(239, 68, 68, 0.2);
  color: var(--text-dim);
  padding: 0.3rem 0.6rem;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
  opacity: 0.6;
}
.reset-btn:hover {
  border-color: rgba(239, 68, 68, 0.6);
  color: #ef4444;
  opacity: 1;
  background: rgba(239, 68, 68, 0.08);
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-box {
  background: var(--bg-card);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: var(--radius-lg);
  padding: 2rem;
  max-width: 440px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  animation: slideUp 0.2s ease;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

.modal-icon { font-size: 2.5rem; text-align: center; }

.modal-title {
  font-size: 1.3rem;
  font-weight: 800;
  color: #ef4444;
  text-align: center;
  margin: 0;
}

.modal-desc {
  color: var(--text-muted);
  font-size: 0.95rem;
  line-height: 1.7;
  text-align: center;
  margin: 0;
}

.modal-desc strong { color: var(--text); }

.modal-confirm-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.modal-confirm-field label {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.modal-confirm-field code {
  background: rgba(239, 68, 68, 0.15);
  color: #ef4444;
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
  font-family: 'Fira Code', monospace;
}

.modal-input {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--text);
  font-family: 'Fira Code', monospace;
  font-size: 1rem;
  padding: 0.6rem 0.9rem;
  outline: none;
  transition: border-color 0.2s;
  width: 100%;
}

.modal-input:focus { border-color: #ef4444; }

.modal-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
}

.btn-danger {
  background: rgba(239, 68, 68, 0.15);
  border: 1px solid rgba(239, 68, 68, 0.4);
  color: #ef4444;
  padding: 0.55rem 1.25rem;
  border-radius: var(--radius-sm);
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-danger:hover:not(:disabled) {
  background: rgba(239, 68, 68, 0.25);
  border-color: #ef4444;
}

.btn-danger:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.modal-fade-enter-active,
.modal-fade-leave-active { transition: opacity 0.2s ease; }
.modal-fade-enter-from,
.modal-fade-leave-to { opacity: 0; }
</style>
