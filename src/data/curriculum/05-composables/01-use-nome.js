export default {
  id: 'use-nome',
  moduleId: 'composables',
  title: 'useNome — a receita',
  icon: '📋',
  xpReward: 35,
  docUrl: 'https://vuejs.org/guide/reusability/composables',

  theory: [
    {
      title: 'Composable — a receita reutilizável',
      body: `Um composable é uma "receita" — você empacota lógica reativa (refs, computed, watchers) numa função com prefixo "use". Depois usa essa receita em qualquer componente sem repetir código.`,
      code: `// composables/useContador.js
import { ref } from 'vue'

export function useContador(inicial = 0) {
  const count = ref(inicial)

  function incrementar() { count.value++ }
  function decrementar() { count.value-- }
  function resetar() { count.value = inicial }

  return { count, incrementar, decrementar, resetar }
}`,
    },
    {
      title: 'Usando o composable em componentes',
      body: `Para usar um composable, importe e chame a função no setup. Os valores retornados são reativos e funcionam exatamente como se estivessem no componente.`,
      code: `<script setup>
import { useContador } from '@/composables/useContador'

const { count, incrementar, resetar } = useContador(10)
</script>

<template>
  <p>{{ count }}</p>
  <button @click="incrementar">+1</button>
  <button @click="resetar">Reset</button>
</template>`,
    },
    {
      title: 'Composable com fetch — useAsync',
      body: `Um dos composables mais úteis: encapsular lógica de fetch com loading e erro. Reutilizável em qualquer componente que precise buscar dados.`,
      code: `// composables/useAsync.js
import { ref } from 'vue'

export function useAsync(fn) {
  const dados = ref(null)
  const carregando = ref(false)
  const erro = ref(null)

  async function executar(...args) {
    carregando.value = true
    erro.value = null
    try {
      dados.value = await fn(...args)
    } catch (e) {
      erro.value = e.message
    } finally {
      carregando.value = false
    }
  }

  return { dados, carregando, erro, executar }
}`,
    },
  ],

  flashcards: [
    {
      id: 'composable-fc-1',
      front: 'O que é um composable?',
      back: 'Uma função que encapsula lógica reativa (refs, watchers, computed) para ser reutilizada em vários componentes. Sempre começa com "use".',
      code: `export function useContador() {
  const count = ref(0)
  return { count }
}`,
      lessonTitle: 'useNome — a receita',
    },
    {
      id: 'composable-fc-2',
      front: 'Por que o prefixo "use" no nome?',
      back: 'É uma convenção — indica que a função é um composable e usa reatividade do Vue internamente.',
      code: `// ✅ useContador, useFetch, useTheme
// ❌ contador, fetch, theme`,
      lessonTitle: 'useNome — a receita',
    },
    {
      id: 'composable-fc-3',
      front: 'Qual a diferença entre composable e um utilitário comum?',
      back: 'Composables usam reatividade (ref, computed, watch). Utilitários são funções puras sem estado reativo.',
      code: `// composable: retorna refs reativas
// utilitário: retorna valores calculados`,
      lessonTitle: 'useNome — a receita',
    },
  ],

  challenges: [
    {
      id: 'composable-ch-1',
      type: 'fill-blank',
      title: 'Crie um composable useContador',
      description: 'Complete o composable com as funções de incrementar e resetar.',
      xpReward: 35,
      template: `import { ref } from 'vue'

export function ___Contador(inicial = 0) {
  const count = ___(inicial)

  function incrementar() {
    count.___ ++
  }

  function resetar() {
    count.value = ___
  }

  return { count, incrementar, resetar }
}`,
      blanks: ['use', 'ref', 'value', 'inicial'],
      solution: `import { ref } from 'vue'

export function useContador(inicial = 0) {
  const count = ref(inicial)

  function incrementar() {
    count.value++
  }

  function resetar() {
    count.value = inicial
  }

  return { count, incrementar, resetar }
}`,
      hint: 'Composables começam com "use". ref() cria o state. Retorne tudo que o componente precisa usar.',
    },
  ],
}
