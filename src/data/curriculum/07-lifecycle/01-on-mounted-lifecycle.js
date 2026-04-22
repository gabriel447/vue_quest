export default {
  id: 'lifecycle-mounted',
  moduleId: 'lifecycle',
  title: 'onMounted — nasci',
  icon: '🌅',
  xpReward: 25,
  docUrl: 'https://vuejs.org/api/composition-api-lifecycle#onmounted',

  theory: [
    {
      title: 'onMounted — o componente nasceu',
      body: `O onMounted é o "nasci" — o componente acabou de aparecer na tela e o DOM está completamente pronto. É o melhor lugar para: buscar dados da API, focar inputs, inicializar plugins externos.`,
      code: `<script setup>
import { ref, onMounted } from 'vue'

const inputRef = ref(null)

onMounted(() => {
  console.log('Componente montado! DOM pronto.')
  inputRef.value?.focus()
})
</script>

<template>
  <input ref="inputRef" placeholder="Foco automático!" />
</template>`,
    },
    {
      title: 'Ciclo de vida completo',
      body: `Todo componente Vue passa por fases bem definidas. Em cada fase você pode registrar um hook para executar código no momento certo.`,
      code: `<script setup>
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
} from 'vue'

onBeforeMount(() => console.log('1. prestes a montar'))
onMounted(() => console.log('2. montado ✅'))
onBeforeUpdate(() => console.log('3. prestes a atualizar'))
onUpdated(() => console.log('4. atualizado'))
onBeforeUnmount(() => console.log('5. prestes a destruir'))
onUnmounted(() => console.log('6. destruído'))
</script>`,
    },
    {
      title: 'onUpdated — após re-renders',
      body: `O onUpdated roda após cada re-render. É raro precisar dele — geralmente computed e watch resolvem. Cuidado: nunca mude estado dentro do onUpdated sem condição — loop infinito!`,
      code: `<script setup>
import { ref, onUpdated } from 'vue'

const msgs = ref([])
const listaEl = ref(null)

onUpdated(() => {
  // Rola para o fim quando chegam novas mensagens
  listaEl.value?.scrollTo(0, listaEl.value.scrollHeight)
  // ⚠️ NUNCA: msgs.value.push(...) — loop infinito!
})
</script>`,
    },
  ],

  flashcards: [
    {
      id: 'lc-mounted-fc-1',
      front: 'O que está disponível no onMounted que não estava antes?',
      back: 'O DOM completo e os elementos do template. Template refs são null antes de montar.',
      code: `onMounted(() => {
  el.value.focus() // ✅ existe agora
})`,
      lessonTitle: 'onMounted — nasci',
    },
    {
      id: 'lc-mounted-fc-2',
      front: 'Qual é a ordem dos principais lifecycle hooks?',
      back: 'onBeforeMount → onMounted → onBeforeUpdate → onUpdated → onBeforeUnmount → onUnmounted',
      code: `// setup → onMounted → [updates] → onUnmounted`,
      lessonTitle: 'onMounted — nasci',
    },
    {
      id: 'lc-mounted-fc-3',
      front: 'Por que nunca mudar estado dentro do onUpdated sem condição?',
      back: 'Causa loop infinito: mudança → re-render → onUpdated → mudança → re-render...',
      code: `// ❌ Loop infinito:
onUpdated(() => { count.value++ })`,
      lessonTitle: 'onMounted — nasci',
    },
  ],

  challenges: [
    {
      id: 'lc-mounted-ch-1',
      type: 'fill-blank',
      title: 'Relógio em tempo real',
      description: 'Complete: inicie o relógio no onMounted e limpe o intervalo no onUnmounted.',
      xpReward: 30,
      template: `<script setup>
import { ref, ___, onUnmounted } from 'vue'

const hora = ref(new Date().toLocaleTimeString())
let timer = null

___(()  => {
  timer = setInterval(() => {
    hora.___ = new Date().toLocaleTimeString()
  }, 1000)
})

onUnmounted(() => clearInterval(___))
</script>

<template>
  <p style="font-size:2rem;font-family:monospace">{{ hora }}</p>
</template>`,
      blanks: ['onMounted', 'onMounted', 'value', 'timer'],
      solution: `<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const hora = ref(new Date().toLocaleTimeString())
let timer = null

onMounted(() => {
  timer = setInterval(() => {
    hora.value = new Date().toLocaleTimeString()
  }, 1000)
})

onUnmounted(() => clearInterval(timer))
</script>

<template>
  <p style="font-size:2rem;font-family:monospace">{{ hora }}</p>
</template>`,
      hint: 'onMounted inicia o intervalo. onUnmounted limpa para evitar memory leak.',
    },
  ],
}
