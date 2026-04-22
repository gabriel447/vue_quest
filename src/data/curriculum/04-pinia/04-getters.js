export default {
  id: 'pinia-getters',
  moduleId: 'pinia',
  title: 'Getters',
  icon: '🔍',
  xpReward: 25,
  docUrl: 'https://pinia.vuejs.org/core-concepts/getters.html',

  theory: [
    {
      title: 'Getters — os filtros da store',
      body: `Getters são os "filtros" — mostram o dado de um jeito específico, exatamente como um computed. São valores derivados do state, com cache — só recalculam quando o state muda.`,
      code: `import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useProdutosStore = defineStore('produtos', () => {
  const lista = ref([
    { id: 1, nome: 'Vue Course', preco: 99, ativo: true },
    { id: 2, nome: 'React Book', preco: 49, ativo: false },
    { id: 3, nome: 'Node Guide', preco: 79, ativo: true },
  ])

  // getters = computeds
  const ativos = computed(() =>
    lista.value.filter(p => p.ativo)
  )

  const totalAtivos = computed(() =>
    ativos.value.reduce((s, p) => s + p.preco, 0)
  )

  return { lista, ativos, totalAtivos }
})`,
    },
    {
      title: 'Usando getters em componentes',
      body: `Getters são acessados exatamente como state — pela instância da store. Use storeToRefs() para desestruturar com reatividade.`,
      code: `<script setup>
import { storeToRefs } from 'pinia'
import { useProdutosStore } from '@/stores/produtos'

const store = useProdutosStore()
const { ativos, totalAtivos } = storeToRefs(store)
</script>

<template>
  <p>{{ ativos.length }} produtos ativos</p>
  <p>Total: R$ {{ totalAtivos }}</p>
  <div v-for="p in ativos" :key="p.id">{{ p.nome }}</div>
</template>`,
    },
  ],

  flashcards: [
    {
      id: 'pinia-getters-fc-1',
      front: 'O que são getters no Pinia?',
      back: 'São computeds da store — valores derivados do state com cache. Só recalculam quando o state muda.',
      code: `const total = computed(() =>
  itens.value.reduce((s, i) => s + i.preco, 0)
)`,
      lessonTitle: 'Getters',
    },
    {
      id: 'pinia-getters-fc-2',
      front: 'Qual a diferença entre getter e action?',
      back: 'Getter: valor derivado (computed), somente leitura.\nAction: função que altera o state ou faz requisições.',
      code: `// getter: computed(() => ...)
// action: function() { state.value = ... }`,
      lessonTitle: 'Getters',
    },
  ],

  challenges: [
    {
      id: 'pinia-getters-ch-1',
      type: 'fill-blank',
      title: 'Getters de carrinho',
      description: 'Complete os getters para calcular o total e a quantidade de itens do carrinho.',
      xpReward: 30,
      template: `import { defineStore } from 'pinia'
import { ref, ___ } from 'vue'

export const useCarrinhoStore = defineStore('carrinho', () => {
  const itens = ref([
    { id: 1, nome: 'Curso Vue', preco: 99, qty: 2 },
    { id: 2, nome: 'Livro JS', preco: 49, qty: 1 },
  ])

  const totalItens = ___(() =>
    itens.value.reduce((s, i) => s + i.___, 0)
  )

  const totalPreco = computed(() =>
    itens.value.reduce((s, i) => s + i.preco * i.___, 0)
  )

  return { itens, totalItens, totalPreco }
})`,
      blanks: ['computed', 'computed', 'qty', 'qty'],
      solution: `import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCarrinhoStore = defineStore('carrinho', () => {
  const itens = ref([
    { id: 1, nome: 'Curso Vue', preco: 99, qty: 2 },
    { id: 2, nome: 'Livro JS', preco: 49, qty: 1 },
  ])

  const totalItens = computed(() =>
    itens.value.reduce((s, i) => s + i.qty, 0)
  )

  const totalPreco = computed(() =>
    itens.value.reduce((s, i) => s + i.preco * i.qty, 0)
  )

  return { itens, totalItens, totalPreco }
})`,
      hint: 'Getters são computeds. Use .reduce() para somar os valores.',
    },
  ],
}
