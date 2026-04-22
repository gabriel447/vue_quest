export default {
  id: 'on-before-unmount',
  moduleId: 'communication',
  title: 'onBeforeUnmount',
  icon: '🧹',
  xpReward: 25,
  docUrl: 'https://vuejs.org/api/composition-api-lifecycle#onbeforeunmount',

  theory: [
    {
      title: 'onBeforeUnmount — o último desejo',
      body: `O onBeforeUnmount é o "último desejo" — roda antes do componente sair da tela. O componente ainda está funcional aqui. É o momento de salvar dados, limpar timers e remover event listeners — coisas que continuariam rodando e causariam memory leaks.`,
      code: `<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const tempo = ref(0)
let timer = null

onMounted(() => {
  timer = setInterval(() => tempo.value++, 1000)
  window.addEventListener('resize', onResize)
})

onBeforeUnmount(() => {
  clearInterval(timer)                         // para o timer
  window.removeEventListener('resize', onResize) // remove o listener
})
</script>`,
    },
    {
      title: 'onUnmounted — após a destruição',
      body: `O onUnmounted roda depois que o componente foi completamente removido. O DOM já não existe. Última chance para cleanup de recursos externos.`,
      code: `<script setup>
import { onUnmounted } from 'vue'

const socket = new WebSocket('wss://exemplo.com')

onUnmounted(() => {
  socket.close() // fecha a conexão ao destruir o componente
})
</script>`,
    },
    {
      title: 'Memory leak — o que acontece sem cleanup',
      body: `Sem cleanup, recursos criados no componente continuam rodando mesmo depois que ele some da tela. Isso se chama memory leak — a memória vai crescendo indefinidamente até o browser travar.`,
      code: `// ❌ Sem cleanup: timer roda PARA SEMPRE
onMounted(() => {
  setInterval(() => console.log('vazando!'), 1000)
})

// ✅ Com cleanup: timer para quando o componente some
let timer
onMounted(() => { timer = setInterval(..., 1000) })
onBeforeUnmount(() => clearInterval(timer))`,
    },
  ],

  flashcards: [
    {
      id: 'obu-fc-1',
      front: 'Para que serve onBeforeUnmount?',
      back: 'Para limpar recursos antes do componente ser destruído: timers, event listeners, WebSockets. Evita memory leaks.',
      code: `onBeforeUnmount(() => {
  clearInterval(timer)
  socket.close()
})`,
      lessonTitle: 'onBeforeUnmount',
    },
    {
      id: 'obu-fc-2',
      front: 'O que é memory leak e como evitar?',
      back: 'Recursos (timers, listeners) que continuam rodando após o componente ser destruído. Evite sempre fazendo cleanup no onBeforeUnmount.',
      code: `let timer
onMounted(() => { timer = setInterval(fn, 1000) })
onBeforeUnmount(() => clearInterval(timer))`,
      lessonTitle: 'onBeforeUnmount',
    },
  ],

  challenges: [
    {
      id: 'obu-ch-1',
      type: 'fill-blank',
      title: 'Cronômetro com cleanup',
      description: 'Complete: inicie o timer no onMounted e limpe-o no onBeforeUnmount.',
      xpReward: 30,
      template: `<script setup>
import { ref, onMounted, ___ } from 'vue'

const segundos = ref(0)
let timer = null

___(()  => {
  timer = setInterval(() => segundos.value++, 1000)
})

___(() => {
  clearInterval(___)
})
</script>

<template>
  <h2>{{ segundos }}s</h2>
  <p>O timer é limpo ao desmontar o componente ✅</p>
</template>`,
      blanks: ['onBeforeUnmount', 'onMounted', 'onBeforeUnmount', 'timer'],
      solution: `<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const segundos = ref(0)
let timer = null

onMounted(() => {
  timer = setInterval(() => segundos.value++, 1000)
})

onBeforeUnmount(() => {
  clearInterval(timer)
})
</script>

<template>
  <h2>{{ segundos }}s</h2>
  <p>O timer é limpo ao desmontar o componente ✅</p>
</template>`,
      hint: 'onMounted inicia. onBeforeUnmount limpa com clearInterval(timer).',
    },
  ],
}
