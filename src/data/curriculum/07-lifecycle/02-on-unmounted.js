export default {
  id: 'lifecycle-unmounted',
  moduleId: 'lifecycle',
  title: 'onUnmounted — morri',
  icon: '🌙',
  xpReward: 25,
  docUrl: 'https://vuejs.org/api/composition-api-lifecycle#onunmounted',

  theory: [
    {
      title: 'onUnmounted — o componente morreu',
      body: `O onUnmounted é o "morri" — o componente está saindo da tela e o DOM já foi removido. É a última chance de limpar qualquer coisa que continua rodando: timers, WebSockets, event listeners globais.`,
      code: `<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const online = ref(navigator.onLine)

function atualizar() { online.value = navigator.onLine }

onMounted(() => {
  window.addEventListener('online', atualizar)
  window.addEventListener('offline', atualizar)
})

onUnmounted(() => {
  // Sem isso, os listeners continuam rodando para sempre
  window.removeEventListener('online', atualizar)
  window.removeEventListener('offline', atualizar)
})
</script>

<template>
  <p>Status: {{ online ? '🟢 Online' : '🔴 Offline' }}</p>
</template>`,
    },
    {
      title: 'O que esquecemos de limpar causa memory leak',
      body: `Recursos que o programador esquece de limpar consomem memória e CPU indefinidamente. Com o tempo, o browser fica lento e pode travar.`,
      code: `// ❌ Recursos vazando:
onMounted(() => {
  setInterval(fn, 1000)           // timer rodando pra sempre
  window.addEventListener(...)    // listener acumulando
  new WebSocket(...)              // conexão aberta eternamente
})

// ✅ Cleanup correto:
let timer, socket
onMounted(() => {
  timer = setInterval(fn, 1000)
  socket = new WebSocket(url)
})
onUnmounted(() => {
  clearInterval(timer)
  socket.close()
})`,
    },
  ],

  flashcards: [
    {
      id: 'lc-unmounted-fc-1',
      front: 'Quando roda o onUnmounted?',
      back: 'Após o componente ser completamente removido do DOM. O DOM já não existe aqui.',
      code: `onUnmounted(() => {
  clearInterval(timer)
  socket.close()
})`,
      lessonTitle: 'onUnmounted — morri',
    },
    {
      id: 'lc-unmounted-fc-2',
      front: 'O que deve ser limpo no onUnmounted?',
      back: 'Tudo que continua rodando após o componente sumir: timers, event listeners globais, WebSockets, subscriptions.',
      code: `clearInterval(timer)
window.removeEventListener('resize', fn)
socket.close()`,
      lessonTitle: 'onUnmounted — morri',
    },
  ],

  challenges: [
    {
      id: 'lc-unmounted-ch-1',
      type: 'fix-bug',
      title: 'Memory leak no componente',
      description: 'O componente cria recursos mas nunca os limpa. Adicione o cleanup correto.',
      xpReward: 35,
      buggyCode: `<script setup>
import { ref, onMounted } from 'vue'

const count = ref(0)
const largura = ref(window.innerWidth)

onMounted(() => {
  setInterval(() => count.value++, 1000)
  window.addEventListener('resize', () => {
    largura.value = window.innerWidth
  })
})
</script>

<template>
  <p>{{ count }}s | {{ largura }}px</p>
</template>`,
      solution: `<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const count = ref(0)
const largura = ref(window.innerWidth)

let timer = null
function onResize() { largura.value = window.innerWidth }

onMounted(() => {
  timer = setInterval(() => count.value++, 1000)
  window.addEventListener('resize', onResize)
})

onUnmounted(() => {
  clearInterval(timer)
  window.removeEventListener('resize', onResize)
})
</script>

<template>
  <p>{{ count }}s | {{ largura }}px</p>
</template>`,
      explanation: '1) setInterval precisa de clearInterval no onUnmounted. 2) addEventListener precisa de removeEventListener — mas para remover, o handler precisa ser uma função nomeada (não arrow inline).',
    },
  ],
}
