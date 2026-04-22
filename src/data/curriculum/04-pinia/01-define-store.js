export default {
  id: 'define-store',
  moduleId: 'pinia',
  title: 'defineStore',
  icon: '🏦',
  xpReward: 35,
  docUrl: 'https://pinia.vuejs.org/core-concepts/',

  theory: [
    {
      title: 'defineStore — o contrato do Pinia',
      body: `O defineStore é o "contrato" — ele cria o depósito central de dados e as regras de como mexer neles. Todo dado que precisa ser compartilhado entre componentes vai para uma store.`,
      code: `// stores/contador.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useContadorStore = defineStore('contador', () => {
  // state
  const count = ref(0)

  // getter
  const dobro = computed(() => count.value * 2)

  // action
  function incrementar() {
    count.value++
  }

  return { count, dobro, incrementar }
})`,
    },
    {
      title: 'Usando a store num componente',
      body: `Para usar a store, importe o composable e chame-o no setup. Você tem acesso a todos os dados e ações.`,
      code: `<script setup>
import { useContadorStore } from '@/stores/contador'

const store = useContadorStore()
</script>

<template>
  <p>Count: {{ store.count }}</p>
  <p>Dobro: {{ store.dobro }}</p>
  <button @click="store.incrementar()">+1</button>
</template>`,
    },
    {
      title: 'storeToRefs — reatividade ao desestruturar',
      body: `Desestruturar diretamente a store quebra a reatividade. Use storeToRefs() para manter o vínculo reativo ao extrair state e getters. Ações podem ser desestruturadas normalmente.`,
      code: `<script setup>
import { storeToRefs } from 'pinia'
import { useContadorStore } from '@/stores/contador'

const store = useContadorStore()

// ❌ Quebra reatividade
// const { count } = store

// ✅ storeToRefs preserva reatividade
const { count, dobro } = storeToRefs(store)

// ✅ Ações podem ser desestruturadas normalmente
const { incrementar } = store
</script>`,
    },
  ],

  flashcards: [
    {
      id: 'pinia-ds-fc-1',
      front: 'O que é defineStore no Pinia?',
      back: 'Cria uma store: um depósito centralizado de state, getters e actions que pode ser compartilhado entre componentes.',
      code: `export const useStore = defineStore('id', () => {
  const x = ref(0)
  return { x }
})`,
      lessonTitle: 'defineStore',
    },
    {
      id: 'pinia-ds-fc-2',
      front: 'Por que usar storeToRefs() ao desestruturar?',
      back: 'Para preservar a reatividade do state e getters. Sem isso, os valores viram cópias estáticas.',
      code: `const { count } = storeToRefs(store)`,
      lessonTitle: 'defineStore',
    },
    {
      id: 'pinia-ds-fc-3',
      front: 'Qual é o nome convencional de uma store Pinia?',
      back: 'useNomeStore — começa com "use" seguido do nome e "Store". Exemplo: useCarrinhoStore, useUsuarioStore.',
      code: `export const useUsuarioStore = defineStore(...)`,
      lessonTitle: 'defineStore',
    },
  ],

  challenges: [
    {
      id: 'pinia-ds-ch-1',
      type: 'fill-blank',
      title: 'Crie sua primeira store',
      description: 'Complete a store de pontuação com state, getter e action.',
      xpReward: 40,
      template: `import { ___ } from 'pinia'
import { ref, computed } from 'vue'

export const usePontuacaoStore = ___('pontuacao', () => {
  const pontos = ___(0)

  const nivel = ___(() =>
    Math.floor(pontos.value / 100) + 1
  )

  function ganharPontos(qtd) {
    pontos.___ += qtd
  }

  return { pontos, nivel, ganharPontos }
})`,
      blanks: ['defineStore', 'defineStore', 'ref', 'computed', 'value'],
      solution: `import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const usePontuacaoStore = defineStore('pontuacao', () => {
  const pontos = ref(0)

  const nivel = computed(() =>
    Math.floor(pontos.value / 100) + 1
  )

  function ganharPontos(qtd) {
    pontos.value += qtd
  }

  return { pontos, nivel, ganharPontos }
})`,
      hint: 'defineStore cria a store. ref para state, computed para getters, funções para actions.',
    },
  ],
}
