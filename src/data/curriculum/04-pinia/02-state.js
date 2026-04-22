export default {
  id: 'pinia-state',
  moduleId: 'pinia',
  title: 'State',
  icon: '🗄️',
  xpReward: 25,
  docUrl: 'https://pinia.vuejs.org/core-concepts/state.html',

  theory: [
    {
      title: 'State — as gavetas da store',
      body: `O state são as "gavetas" — onde os dados ficam guardados. São refs que qualquer componente da aplicação pode ler. No Setup Store (estilo Composition API), são simplesmente refs retornadas.`,
      code: `import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUsuarioStore = defineStore('usuario', () => {
  // state = refs retornadas
  const nome = ref('')
  const email = ref('')
  const nivel = ref(1)
  const logado = ref(false)

  return { nome, email, nivel, logado }
})`,
    },
    {
      title: 'Lendo e alterando o state',
      body: `Qualquer componente pode ler e alterar o state diretamente pela store. Mudanças são refletidas em todos os componentes que usam a store.`,
      code: `<script setup>
import { useUsuarioStore } from '@/stores/usuario'

const store = useUsuarioStore()

function login() {
  store.nome = 'Ana'
  store.logado = true
}

function logout() {
  store.nome = ''
  store.logado = false
}
</script>

<template>
  <p v-if="store.logado">Olá, {{ store.nome }}!</p>
  <button @click="store.logado ? logout() : login()">
    {{ store.logado ? 'Sair' : 'Entrar' }}
  </button>
</template>`,
    },
    {
      title: '$reset e $patch',
      body: `A Pinia oferece $patch para atualizar múltiplos campos de uma vez, e $reset para voltar ao estado inicial (só disponível no Options Store).`,
      code: `<script setup>
import { useUsuarioStore } from '@/stores/usuario'

const store = useUsuarioStore()

// Atualiza múltiplos campos de uma vez
store.$patch({
  nome: 'Bruno',
  nivel: 5,
  logado: true,
})
</script>`,
    },
  ],

  flashcards: [
    {
      id: 'pinia-state-fc-1',
      front: 'O que é o state no Pinia?',
      back: 'São as refs retornadas pela store — os dados centralizados que qualquer componente pode ler e alterar.',
      code: `const nome = ref('')
return { nome } // state`,
      lessonTitle: 'State',
    },
    {
      id: 'pinia-state-fc-2',
      front: 'Como alterar o state de fora da store?',
      back: 'Acesse diretamente pela instância da store: store.nome = "Ana". Ou use $patch para múltiplos campos.',
      code: `store.nome = 'Ana'
store.$patch({ nome: 'Ana', nivel: 5 })`,
      lessonTitle: 'State',
    },
  ],

  challenges: [
    {
      id: 'pinia-state-ch-1',
      type: 'fill-blank',
      title: 'State de carrinho',
      description: 'Complete o state da store de carrinho e a função de adicionar itens.',
      xpReward: 30,
      template: `import { defineStore } from 'pinia'
import { ___, computed } from 'vue'

export const useCarrinhoStore = defineStore('carrinho', () => {
  const itens = ___([])
  const aberto = ___(false)

  const total = computed(() =>
    itens.value.reduce((s, i) => s + i.preco, 0)
  )

  function adicionar(item) {
    itens.___.push(item)
  }

  return { itens, aberto, total, adicionar }
})`,
      blanks: ['ref', 'ref', 'ref', 'value'],
      solution: `import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCarrinhoStore = defineStore('carrinho', () => {
  const itens = ref([])
  const aberto = ref(false)

  const total = computed(() =>
    itens.value.reduce((s, i) => s + i.preco, 0)
  )

  function adicionar(item) {
    itens.value.push(item)
  }

  return { itens, aberto, total, adicionar }
})`,
      hint: 'State = refs. Arrays também usam ref([]).',
    },
  ],
}
