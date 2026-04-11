<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  show: Boolean,
  level: Number,
  title: String,
})
const emit = defineEmits(['close'])

watch(() => props.show, (val) => {
  if (val) setTimeout(() => emit('close'), 4000)
})
</script>

<template>
  <Transition name="toast">
    <div v-if="show" class="level-up-toast">
      <div class="toast-inner">
        <div class="toast-icon">🎉</div>
        <div class="toast-content">
          <div class="toast-title">LEVEL UP!</div>
          <div class="toast-sub">Lv {{ level }} — {{ title }}</div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.level-up-toast {
  position: fixed;
  top: 80px;
  right: 1.5rem;
  z-index: 999;
  pointer-events: none;
}

.toast-inner {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  color: #1a1a2e;
  padding: 1rem 1.5rem;
  border-radius: var(--radius);
  box-shadow: 0 8px 32px rgba(251, 191, 36, 0.4);
  font-weight: 700;
}

.toast-icon { font-size: 2rem; }
.toast-title { font-size: 1.1rem; letter-spacing: 2px; }
.toast-sub { font-size: 0.9rem; opacity: 0.8; }

.toast-enter-active { animation: toastIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); }
.toast-leave-active { animation: toastOut 0.3s ease forwards; }

@keyframes toastIn {
  from { transform: translateX(120%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}
@keyframes toastOut {
  to { transform: translateX(120%); opacity: 0; }
}
</style>
