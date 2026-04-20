<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProgressStore } from '../stores/progress.js'
import { getModuleById, modules } from '../data/curriculum/index.js'
import LevelUpToast from '../components/game/LevelUpToast.vue'

const route = useRoute()
const router = useRouter()
const progress = useProgressStore()

const mod = computed(() => getModuleById(route.params.moduleId))
const boss = computed(() => mod.value?.bossBattle)

const nextModule = computed(() => {
  const idx = modules.findIndex(m => m.id === route.params.moduleId)
  return idx >= 0 && idx < modules.length - 1 ? modules[idx + 1] : null
})

const isComplete = computed(() =>
  boss.value ? progress.isBossBattleComplete(boss.value.id) : false
)

const allRequirementsMet = computed(() =>
  boss.value?.requirements.every(r => progress.isLessonComplete(r)) ?? false
)

const showConfirm = ref(false)
const levelUpShow = ref(false)
const levelUpLevel = ref(1)
const levelUpTitle = ref('')

function completeBoss() {
  if (!boss.value) return
  const result = progress.completeBossBattle(boss.value.id, boss.value.xpReward)
  showConfirm.value = false
  if (result?.levelUp) {
    levelUpLevel.value = result.level
    levelUpTitle.value = result.title
    levelUpShow.value = true
  }
}
</script>

<template>
  <div class="page" v-if="boss">
    <div class="container">
      <RouterLink :to="`/module/${route.params.moduleId}`" class="back-link">
        ← Voltar ao módulo
      </RouterLink>

      <!-- Header -->
      <div class="boss-hero animate-fade-in">
        <div class="boss-title-row">
          <span class="boss-hero-icon">👹</span>
          <div>
            <h1>{{ boss.title }}</h1>
            <p class="text-muted">{{ boss.description }}</p>
          </div>
          <span class="xp-big">+{{ boss.xpReward }} XP</span>
        </div>
      </div>

      <!-- Concluído -->
      <div v-if="isComplete" class="complete-card card mt-3 animate-fade-in">
        <div class="complete-icon">🏆</div>
        <div>
          <h3>Boss derrotado!</h3>
          <p class="text-muted">Você concluiu este Boss Battle e ganhou +{{ boss.xpReward }} XP.</p>
        </div>
        <div class="complete-actions">
          <RouterLink v-if="nextModule" :to="`/module/${nextModule.id}`" class="btn btn-primary btn-sm">
            Próximo módulo →
          </RouterLink>
          <RouterLink :to="`/module/${route.params.moduleId}`" class="btn btn-secondary btn-sm">
            ← Voltar ao módulo
          </RouterLink>
        </div>
      </div>

      <!-- Conteúdo -->
      <div v-else>
        <!-- Requisitos -->
        <div class="card mt-3">
          <h3 class="section-title">Requisitos</h3>
          <div class="req-list">
            <span
              v-for="req in boss.requirements"
              :key="req"
              class="req-badge"
              :class="{ met: progress.isLessonComplete(req) }"
            >
              {{ progress.isLessonComplete(req) ? '✅' : '🔒' }}
              {{ req.replace(/-/g, ' ') }}
            </span>
          </div>
        </div>

        <!-- Desafio -->
        <div class="card mt-3">
          <h3 class="section-title">Seu desafio</h3>
          <p class="text-muted">
            Crie um <strong>App de Lista de Compras</strong> completo. O app deve usar <strong>todos</strong> os conceitos do módulo:
          </p>
          <ul class="objectives">
            <li v-for="obj in (boss.objectives || [])" :key="obj">{{ obj }}</li>
            <template v-if="!boss.objectives">
              <li>Adicionar itens com nome e quantidade</li>
              <li>Marcar itens como comprados (reativamente)</li>
              <li>Filtrar por: todos / pendentes / comprados</li>
              <li>Mostrar total de itens e total gasto</li>
              <li>Remover itens da lista</li>
              <li>Usar pelo menos um componente filho</li>
            </template>
          </ul>
          <p class="text-muted mt-2" style="font-size:0.85rem">
            Crie o projeto localmente ou use o
            <a href="https://play.vuejs.org" target="_blank" rel="noopener" class="doc-link">Vue Playground</a>.
            Quando terminar e estiver satisfeito com o resultado, marque como concluído.
          </p>
        </div>

        <!-- Ação -->
        <div class="mt-3" v-if="!showConfirm">
          <button
            class="btn btn-danger"
            :disabled="!allRequirementsMet"
            @click="showConfirm = true"
          >
            Marcar como concluído 🏆
          </button>
          <p v-if="!allRequirementsMet" class="text-muted mt-1" style="font-size:0.85rem">
            Complete todos os requisitos antes de concluir o Boss Battle.
          </p>
        </div>

        <!-- Confirmação -->
        <div v-if="showConfirm" class="confirm-card card mt-3 animate-fade-in">
          <p><strong>Você realmente concluiu o App de Lista de Compras?</strong></p>
          <p class="text-muted" style="font-size:0.9rem">
            Seja honesto — o objetivo é aprender de verdade. Só confirme se você implementou o app.
          </p>
          <div class="confirm-actions">
            <button class="btn btn-ghost" @click="showConfirm = false">Cancelar</button>
            <button class="btn btn-danger" @click="completeBoss">Sim, concluí! 🏆</button>
          </div>
        </div>
      </div>
    </div>

    <LevelUpToast :show="levelUpShow" :level="levelUpLevel" :title="levelUpTitle" @close="levelUpShow = false" />
  </div>

  <div v-else class="page">
    <div class="container">
      <p class="text-muted">Boss Battle não encontrado.</p>
      <RouterLink to="/" class="btn btn-secondary mt-2">← Voltar</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.back-link {
  display: inline-block;
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  transition: color 0.2s;
}
.back-link:hover { color: var(--vue-green); }

.boss-hero { margin-bottom: 0; }

.boss-title-row {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.boss-hero-icon { font-size: 3rem; flex-shrink: 0; line-height: 1; }
.xp-big { font-size: 1.2rem; font-weight: 800; color: var(--xp-gold); flex-shrink: 0; margin-left: auto; }

.section-title { margin-bottom: 0.75rem; }

.req-list { display: flex; flex-wrap: wrap; gap: 0.5rem; }

.req-badge {
  font-size: 0.8rem;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  background: var(--bg);
  border: 1px solid var(--border);
  color: var(--text-dim);
}
.req-badge.met { border-color: rgba(16,185,129,0.4); color: var(--success); }

.objectives {
  padding-left: 1.25rem;
  margin: 0.75rem 0 0;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  color: var(--text);
}

.doc-link { color: var(--vue-green); text-decoration: none; }
.doc-link:hover { text-decoration: underline; }

.complete-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: linear-gradient(135deg, rgba(16,185,129,0.08), rgba(66,184,131,0.08));
  border-color: rgba(16,185,129,0.3);
}
.complete-icon { font-size: 2.5rem; flex-shrink: 0; }
.complete-actions { display: flex; gap: 0.75rem; flex-wrap: wrap; margin-left: auto; }

.confirm-card {
  background: linear-gradient(135deg, rgba(239,68,68,0.08), rgba(139,92,246,0.08));
  border-color: rgba(239,68,68,0.3);
}
.confirm-actions { display: flex; gap: 0.75rem; margin-top: 1rem; }

.btn-danger {
  background: rgba(239,68,68,0.15);
  color: #ef4444;
  border: 1px solid rgba(239,68,68,0.4);
  padding: 0.6rem 1.25rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-danger:hover:not(:disabled) {
  background: rgba(239,68,68,0.25);
  border-color: rgba(239,68,68,0.7);
}
.btn-danger:disabled { opacity: 0.45; cursor: not-allowed; }
</style>
