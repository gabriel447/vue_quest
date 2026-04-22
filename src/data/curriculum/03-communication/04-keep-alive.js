export default {
  id: 'keep-alive',
  moduleId: 'communication',
  title: 'KeepAlive',
  icon: '🧊',
  xpReward: 25,
  docUrl: 'https://vuejs.org/guide/built-ins/keep-alive',

  theory: [
    {
      title: 'KeepAlive — o congelador',
      body: `O KeepAlive é o "congelador" — mantém o componente pausado quando ele sai da tela, preservando todo o estado. Sem ele, quando um componente é removido do DOM, ele é destruído e perde tudo.`,
      code: `<template>
  <!-- Sem KeepAlive: componente destrói ao trocar de aba -->
  <ComponenteA v-if="aba === 'a'" />
  <ComponenteB v-if="aba === 'b'" />

  <!-- Com KeepAlive: estado preservado -->
  <KeepAlive>
    <ComponenteA v-if="aba === 'a'" />
    <ComponenteB v-if="aba === 'b'" />
  </KeepAlive>
</template>`,
    },
    {
      title: 'include, exclude e max',
      body: `Você pode controlar quais componentes são "congelados" usando include/exclude (por nome) e quantos ficam em memória com max.`,
      code: `<template>
  <!-- Só congela esses componentes específicos -->
  <KeepAlive include="ComponenteA,ComponenteB">
    <component :is="abaAtual" />
  </KeepAlive>

  <!-- Congela todos exceto esse -->
  <KeepAlive exclude="FormularioHeavy">
    <component :is="abaAtual" />
  </KeepAlive>

  <!-- Máximo de 3 componentes em cache -->
  <KeepAlive :max="3">
    <component :is="abaAtual" />
  </KeepAlive>
</template>`,
    },
    {
      title: 'Hooks onActivated e onDeactivated',
      body: `Componentes dentro do KeepAlive ganham dois hooks extras: onActivated (quando volta a aparecer) e onDeactivated (quando sai da tela mas não é destruído).`,
      code: `<script setup>
import { onActivated, onDeactivated } from 'vue'

onActivated(() => {
  console.log('Voltei à tela! Posso atualizar dados.')
})

onDeactivated(() => {
  console.log('Saí da tela, mas não fui destruído.')
})
</script>`,
    },
  ],

  flashcards: [
    {
      id: 'ka-fc-1',
      front: 'O que faz o KeepAlive?',
      back: 'Mantém componentes "congelados" em memória quando saem da tela, preservando o estado. Sem ele, o componente é destruído e perde tudo.',
      code: `<KeepAlive>
  <component :is="atual" />
</KeepAlive>`,
      lessonTitle: 'KeepAlive',
    },
    {
      id: 'ka-fc-2',
      front: 'Quando usar KeepAlive?',
      back: 'Em abas, wizards ou rotas onde o usuário volta frequentemente e não deve perder o estado (formulário preenchido, scroll, dados carregados).',
      code: `<KeepAlive><AbaFormulario v-if="aba === 1" /></KeepAlive>`,
      lessonTitle: 'KeepAlive',
    },
    {
      id: 'ka-fc-3',
      front: 'Quais hooks extras o KeepAlive adiciona?',
      back: 'onActivated (ao voltar à tela) e onDeactivated (ao sair sem destruir).',
      code: `onActivated(() => { /* atualizar dados */ })
onDeactivated(() => { /* pausar timers */ })`,
      lessonTitle: 'KeepAlive',
    },
  ],

  challenges: [
    {
      id: 'ka-ch-1',
      type: 'fill-blank',
      title: 'Preservar estado com KeepAlive',
      description: 'Envolva os componentes com KeepAlive para preservar o estado ao trocar de aba.',
      xpReward: 25,
      template: `<script setup>
import { ref } from 'vue'
const aba = ref('A')
</script>

<template>
  <button @click="aba = 'A'">Aba A</button>
  <button @click="aba = 'B'">Aba B</button>

  <___>
    <div v-if="aba === 'A'">
      <input placeholder="Digite algo na aba A..." />
    </div>
    <div v-else>
      <input placeholder="Digite algo na aba B..." />
    </div>
  </___>
</template>`,
      blanks: ['KeepAlive', 'KeepAlive'],
      solution: `<script setup>
import { ref } from 'vue'
const aba = ref('A')
</script>

<template>
  <button @click="aba = 'A'">Aba A</button>
  <button @click="aba = 'B'">Aba B</button>

  <KeepAlive>
    <div v-if="aba === 'A'">
      <input placeholder="Digite algo na aba A..." />
    </div>
    <div v-else>
      <input placeholder="Digite algo na aba B..." />
    </div>
  </KeepAlive>
</template>`,
      hint: 'Envolva os componentes condicionais com <KeepAlive>...</KeepAlive>.',
    },
  ],
}
