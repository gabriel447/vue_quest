export default {
  id: 'lifecycle',
  moduleId: 'essentials',
  title: 'Lifecycle Hooks',
  icon: '🔄',
  xpReward: 35,
  docUrl: 'https://vuejs.org/guide/essentials/lifecycle',

  theory: [
    {
      title: 'O ciclo de vida de um componente',
      body: `Todo componente Vue passa por fases: criação, montagem no DOM, atualização e destruição.
Lifecycle hooks permitem executar código em cada fase. No Composition API, são funções que recebem um callback.`,
      code: `// Diagrama do ciclo de vida (simplificado):
//
//  setup()
//    ↓
//  onBeforeMount()   ← antes de inserir no DOM
//    ↓
//  onMounted()       ← DOM disponível ✅ mais usado
//    ↓
//  [estado muda] → onBeforeUpdate() → onUpdated()
//    ↓
//  onBeforeUnmount() ← antes de destruir
//    ↓
//  onUnmounted()     ← cleanup ✅ segundo mais usado`,
    },
    {
      title: 'onMounted — o hook mais importante',
      body: `onMounted dispara após o componente ser inserido no DOM.
Use para: acessar elementos DOM, fazer requisições de dados iniciais, inicializar bibliotecas externas.`,
      code: `<script setup>
import { ref, onMounted } from 'vue'

const users = ref([])
const isLoading = ref(true)

onMounted(async () => {
  // ✅ DOM disponível — pode acessar refs de template aqui
  // ✅ Ideal para requisições iniciais de dados
  try {
    const res = await fetch('/api/users')
    users.value = await res.json()
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div v-if="isLoading">Carregando...</div>
  <ul v-else>
    <li v-for="user in users" :key="user.id">{{ user.name }}</li>
  </ul>
</template>`,
    },
    {
      title: 'onUnmounted — limpeza e prevenção de memory leaks',
      body: `onUnmounted dispara quando o componente é removido do DOM.
Essencial para limpar: timers (setInterval/setTimeout), event listeners globais, WebSockets, subscriptions.`,
      code: `<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const time = ref(new Date().toLocaleTimeString())
const windowWidth = ref(window.innerWidth)
let clockInterval = null

function updateWidth() {
  windowWidth.value = window.innerWidth
}

onMounted(() => {
  // Inicia timer
  clockInterval = setInterval(() => {
    time.value = new Date().toLocaleTimeString()
  }, 1000)

  // Adiciona listener global
  window.addEventListener('resize', updateWidth)
})

onUnmounted(() => {
  // ✅ Limpa timer — evita memory leak
  clearInterval(clockInterval)

  // ✅ Remove listener global — evita memory leak
  window.removeEventListener('resize', updateWidth)
})
</script>`,
    },
    {
      title: 'onUpdated — após cada re-render',
      body: `onUpdated dispara após cada re-render do componente por mudança de estado.
⚠️ Nunca mude estado dentro de onUpdated sem condição — causa loop infinito.`,
      code: `<script setup>
import { ref, onUpdated } from 'vue'

const messages = ref([])
const listEl = ref(null)

onUpdated(() => {
  // ✅ Útil para sincronizar DOM com estado
  if (listEl.value) {
    // Auto-scroll para o último item quando messages muda
    listEl.value.scrollTop = listEl.value.scrollHeight
  }

  // ❌ Nunca faça isso — loop infinito!
  // messages.value.push('novo')
})
</script>

<template>
  <ul ref="listEl" style="max-height: 200px; overflow-y: auto">
    <li v-for="msg in messages" :key="msg">{{ msg }}</li>
  </ul>
</template>`,
    },
    {
      title: 'onBeforeMount e onBeforeUnmount',
      body: `onBeforeMount: chamado antes de o componente ser inserido no DOM. O template ainda não foi renderizado.
onBeforeUnmount: chamado antes de a destruição começar. O componente ainda está completamente funcional.`,
      code: `import {
  onBeforeMount,
  onBeforeUnmount,
} from 'vue'

onBeforeMount(() => {
  // DOM ainda não existe aqui
  // Útil para preparar dados síncronos antes de renderizar
  console.log('Prestes a montar...')
})

onBeforeUnmount(() => {
  // Componente ainda funcional — última chance antes de destruir
  // Útil para salvar estado antes de sair
  console.log('Prestes a desmontar...')
  saveUserProgress()
})`,
    },
  ],

  flashcards: [
    {
      id: 'lc-fc-1',
      front: 'Qual hook usar para buscar dados quando o componente carrega?',
      back: '`onMounted` — dispara após o componente ser inserido no DOM. Ideal para fetch inicial.',
      code: `onMounted(async () => {
  data.value = await fetch('/api').then(r => r.json())
})`,
      lessonTitle: 'Lifecycle Hooks',
    },
    {
      id: 'lc-fc-2',
      front: 'Qual hook usar para limpar timers e event listeners?',
      back: '`onUnmounted` — sem cleanup, recursos continuam rodando mesmo após o componente ser destruído (memory leak).',
      code: `onUnmounted(() => {
  clearInterval(timer)
  window.removeEventListener('resize', handler)
})`,
      lessonTitle: 'Lifecycle Hooks',
    },
    {
      id: 'lc-fc-3',
      front: 'Por que mudar estado dentro de onUpdated é perigoso?',
      back: 'Causa loop infinito: mudança → re-render → onUpdated → mudança → ...',
      code: `// ❌ Loop infinito
onUpdated(() => { count.value++ })`,
      lessonTitle: 'Lifecycle Hooks',
    },
    {
      id: 'lc-fc-4',
      front: 'Qual a ordem dos hooks mais usados?',
      back: '`onMounted` → `onUpdated` → `onUnmounted`',
      code: `// setup → onMounted → [re-renders] → onUnmounted`,
      lessonTitle: 'Lifecycle Hooks',
    },
    {
      id: 'lc-fc-5',
      front: 'O que é memory leak em Vue?',
      back: 'Recurso (timer, listener, WebSocket) que continua ativo após o componente ser destruído. Sempre limpe em `onUnmounted`.',
      code: `onUnmounted(() => {
  clearInterval(timer)  // ✅ sem leak
})`,
      lessonTitle: 'Lifecycle Hooks',
    },
  ],

  challenges: [
    {
      id: 'lc-ch-1',
      type: 'fill-blank',
      title: 'Fetch na montagem',
      description: 'Complete o código para buscar usuários quando o componente é montado e exibi-los.',
      xpReward: 25,
      template: `<script setup>
import { ref, ___ } from 'vue'

const users = ref([])

___(async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users?_limit=3')
  users.value = await res.json()
})
</script>

<template>
  <ul>
    <li v-for="user in users" :key="user.id">{{ user.name }}</li>
  </ul>
</template>`,
      blanks: ['onMounted', 'onMounted'],
      solution: `<script setup>
import { ref, onMounted } from 'vue'

const users = ref([])

onMounted(async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users?_limit=3')
  users.value = await res.json()
})
</script>

<template>
  <ul>
    <li v-for="user in users" :key="user.id">{{ user.name }}</li>
  </ul>
</template>`,
      hint: 'Importe e use onMounted de "vue". Pode ser async.',
    },
    {
      id: 'lc-ch-2',
      type: 'fill-blank',
      title: 'Cronômetro com cleanup',
      description: 'Complete: inicie o timer em onMounted e limpe-o em onUnmounted para evitar memory leak.',
      xpReward: 55,
      template: `<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const seconds = ref(0)
const running = ref(true)
let timer = null

const display = computed(() => {
  const m = Math.floor(seconds.value / 60).toString().padStart(2, '0')
  const s = (seconds.value % 60).toString().padStart(2, '0')
  return \`\${m}:\${s}\`
})

function startTimer() {
  timer = setInterval(() => seconds.value++, 1000)
  running.value = true
}

function stopTimer() {
  clearInterval(timer)
  running.value = false
}

function toggle() {
  running.value ? stopTimer() : startTimer()
}

___(startTimer)
___(stopTimer)
</script>

<template>
  <h1>{{ display }}</h1>
  <button @click="toggle">
    {{ running ? '⏸ Pausar' : '▶ Retomar' }}
  </button>
  <button @click="seconds = 0">🔄 Resetar</button>
</template>`,
      blanks: ['onMounted', 'onUnmounted'],
      solution: `<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const seconds = ref(0)
const running = ref(true)
let timer = null

const display = computed(() => {
  const m = Math.floor(seconds.value / 60).toString().padStart(2, '0')
  const s = (seconds.value % 60).toString().padStart(2, '0')
  return \`\${m}:\${s}\`
})

function startTimer() {
  timer = setInterval(() => seconds.value++, 1000)
  running.value = true
}

function stopTimer() {
  clearInterval(timer)
  running.value = false
}

function toggle() {
  running.value ? stopTimer() : startTimer()
}

onMounted(startTimer)
onUnmounted(stopTimer)
</script>

<template>
  <h1>{{ display }}</h1>
  <button @click="toggle">
    {{ running ? '⏸ Pausar' : '▶ Retomar' }}
  </button>
  <button @click="seconds = 0">🔄 Resetar</button>
</template>`,
      hint: 'onMounted inicia o timer quando o componente aparece. onUnmounted limpa quando sai — evita memory leak.',
    },
    {
      id: 'lc-ch-3',
      type: 'fill-blank',
      title: 'Componente com loading state',
      description: 'Complete o template: mostre loading, erro ou dados com v-if/v-else-if/v-else.',
      xpReward: 50,
      template: `<script setup>
import { ref, onMounted } from 'vue'

const posts = ref([])
const isLoading = ref(false)
const error = ref(null)

async function fetchPosts() {
  isLoading.value = true
  error.value = null
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
    if (!res.ok) throw new Error('Falha na requisição')
    posts.value = await res.json()
  } catch (e) {
    error.value = e.message
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchPosts)
</script>

<template>
  <button @click="fetchPosts">🔄 Recarregar</button>

  <p ___="isLoading">⏳ Carregando...</p>
  <p ___ style="color: red">❌ {{ error }}</p>
  <ul ___>
    <li v-for="post in posts" :key="post.id">
      <strong>{{ post.title }}</strong>
    </li>
  </ul>
</template>`,
      blanks: ['v-if', 'v-else-if="error"', 'v-else'],
      solution: `<script setup>
import { ref, onMounted } from 'vue'

const posts = ref([])
const isLoading = ref(false)
const error = ref(null)

async function fetchPosts() {
  isLoading.value = true
  error.value = null
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
    if (!res.ok) throw new Error('Falha na requisição')
    posts.value = await res.json()
  } catch (e) {
    error.value = e.message
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchPosts)
</script>

<template>
  <button @click="fetchPosts">🔄 Recarregar</button>

  <p v-if="isLoading">⏳ Carregando...</p>
  <p v-else-if="error" style="color: red">❌ {{ error }}</p>
  <ul v-else>
    <li v-for="post in posts" :key="post.id">
      <strong>{{ post.title }}</strong>
    </li>
  </ul>
</template>`,
      hint: 'v-if para loading, v-else-if="error" para erro, v-else para o conteúdo final.',
    },
    {
      id: 'lc-ch-4',
      type: 'fix-bug',
      title: 'Memory leak',
      description: 'Este componente tem um memory leak: o event listener de resize nunca é removido. Corrija o código.',
      xpReward: 30,
      buggyCode: `<script setup>
import { ref, onMounted } from 'vue'

const width = ref(window.innerWidth)
const height = ref(window.innerHeight)

onMounted(() => {
  // ❌ Listener nunca removido — memory leak!
  window.addEventListener('resize', () => {
    width.value = window.innerWidth
    height.value = window.innerHeight
  })
})
</script>

<template>
  <p>{{ width }} × {{ height }}</p>
</template>`,
      solution: `<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const width = ref(window.innerWidth)
const height = ref(window.innerHeight)

// ✅ Função nomeada para poder remover depois
function onResize() {
  width.value = window.innerWidth
  height.value = window.innerHeight
}

onMounted(() => {
  window.addEventListener('resize', onResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', onResize)
})
</script>

<template>
  <p>{{ width }} × {{ height }}</p>
</template>`,
      explanation: '1) Sempre remova event listeners globais em onUnmounted. 2) A função deve ser nomeada (não anônima) para poder ser removida com removeEventListener.',
    },
  ],
}
