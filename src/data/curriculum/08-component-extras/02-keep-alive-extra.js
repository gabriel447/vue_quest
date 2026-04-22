export default {
  id: 'keep-alive-extra',
  moduleId: 'component-extras',
  title: '<KeepAlive> — formol',
  icon: '🧪',
  xpReward: 25,
  docUrl: 'https://vuejs.org/guide/built-ins/keep-alive',

  theory: [
    {
      title: '<KeepAlive> — o formol',
      body: `O KeepAlive é o "formol" — mantém o componente vivo na memória mesmo quando ele não está aparecendo na tela. Sem ele, cada vez que o componente some, ele é destruído e perde todos os dados. Com ele, fica "congelado" e volta exatamente como estava.`,
      code: `<template>
  <div>
    <button @click="atual = 'A'">Aba A</button>
    <button @click="atual = 'B'">Aba B</button>

    <!-- Sem KeepAlive: estado perdido ao trocar de aba -->
    <component :is="atual === 'A' ? ComponenteA : ComponenteB" />

    <!-- Com KeepAlive: estado preservado -->
    <KeepAlive>
      <component :is="atual === 'A' ? ComponenteA : ComponenteB" />
    </KeepAlive>
  </div>
</template>`,
    },
    {
      title: 'KeepAlive com include/exclude',
      body: `Controle precisamente quais componentes são "congelados". Sem include/exclude, todos os filhos são cacheados. Isso pode usar muita memória para componentes pesados.`,
      code: `<!-- Congela apenas esses dois -->
<KeepAlive include="AbaFormulario,AbaConfiguracoes">
  <component :is="abaAtual" />
</KeepAlive>

<!-- Congela tudo exceto o resultado pesado -->
<KeepAlive exclude="RelatorioGrande">
  <component :is="abaAtual" />
</KeepAlive>

<!-- Máximo de 2 componentes em cache ao mesmo tempo -->
<KeepAlive :max="2">
  <component :is="abaAtual" />
</KeepAlive>`,
    },
    {
      title: 'onActivated e onDeactivated',
      body: `Componentes dentro do KeepAlive recebem dois hooks especiais: onActivated quando voltam a aparecer, e onDeactivated quando saem mas não são destruídos. Útil para atualizar dados ao voltar para uma aba.`,
      code: `<script setup>
import { onActivated, onDeactivated, onMounted, onUnmounted } from 'vue'

// Roda uma vez — ao criar o componente
onMounted(() => console.log('nasceu'))

// Roda cada vez que o componente aparece na tela
onActivated(() => {
  console.log('voltei! Posso buscar dados atualizados.')
})

// Roda quando o componente sai mas fica em cache
onDeactivated(() => {
  console.log('saí da tela, mas ainda existo')
})

// Nunca roda se o KeepAlive estiver ativo
onUnmounted(() => console.log('destruído (só sem KeepAlive)'))
</script>`,
    },
  ],

  flashcards: [
    {
      id: 'ka-extra-fc-1',
      front: 'Qual a diferença entre um componente com e sem KeepAlive ao trocar de aba?',
      back: 'Sem KeepAlive: destruído e recriado, perde o estado. Com KeepAlive: "congelado" em memória, mantém todo o estado.',
      code: `<KeepAlive>
  <component :is="aba" />
</KeepAlive>`,
      lessonTitle: '<KeepAlive> — formol',
    },
    {
      id: 'ka-extra-fc-2',
      front: 'Qual a diferença entre onMounted e onActivated?',
      back: 'onMounted: roda uma vez ao criar. onActivated: roda cada vez que o componente volta a aparecer (com KeepAlive).',
      code: `onMounted(() => { /* uma vez */ })
onActivated(() => { /* cada volta */ })`,
      lessonTitle: '<KeepAlive> — formol',
    },
  ],

  challenges: [
    {
      id: 'ka-extra-ch-1',
      type: 'fill-blank',
      title: 'Abas com KeepAlive',
      description: 'Complete o KeepAlive e use onActivated para atualizar o timestamp ao voltar.',
      xpReward: 30,
      template: `<script setup>
import { ref, onActivated } from 'vue'

const ultimaVez = ref('')

___(()  => {
  ultimaVez.value = new Date().toLocaleTimeString()
})
</script>

<template>
  <p>Última visita: {{ ultimaVez || 'Nunca' }}</p>
  <p>Este componente está sendo mantido vivo em memória!</p>
</template>`,
      blanks: ['onActivated'],
      solution: `<script setup>
import { ref, onActivated } from 'vue'

const ultimaVez = ref('')

onActivated(() => {
  ultimaVez.value = new Date().toLocaleTimeString()
})
</script>

<template>
  <p>Última visita: {{ ultimaVez || 'Nunca' }}</p>
  <p>Este componente está sendo mantido vivo em memória!</p>
</template>`,
      hint: 'onActivated roda cada vez que o componente volta a aparecer dentro de um KeepAlive.',
    },
  ],
}
