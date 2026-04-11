<script setup>
import { useProgressStore } from '../../stores/progress.js'
import { getLevelTitle } from '../../utils/xp.js'

const progress = useProgressStore()
</script>

<template>
  <div class="xp-bar-container">
    <div class="xp-bar-header">
      <div class="level-info">
        <span class="level-number">Lv {{ progress.level }}</span>
        <span class="level-title">{{ progress.levelTitle }}</span>
      </div>
      <div class="xp-numbers">
        <span class="xp-current">{{ progress.xp }} XP</span>
        <span v-if="progress.xpForNextLevel" class="xp-next">
          +{{ progress.xpForNextLevel }} p/ próximo nível
        </span>
        <span v-else class="xp-max text-gold">NÍVEL MÁXIMO!</span>
      </div>
    </div>
    <div class="progress-bar">
      <div
        class="progress-bar-fill"
        :style="{ width: progress.levelProgress + '%' }"
      />
    </div>
  </div>
</template>

<style scoped>
.xp-bar-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.xp-bar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.level-info {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
}

.level-number {
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--vue-green);
}

.level-title {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.xp-numbers {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.85rem;
}

.xp-current { font-weight: 700; color: var(--xp-gold); }
.xp-next { color: var(--text-dim); }
</style>
