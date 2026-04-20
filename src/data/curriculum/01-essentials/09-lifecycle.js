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
      body: `Todo componente Vue passa por fases: é criado, montado no DOM, pode re-renderizar várias vezes e por fim é destruído. Em cada fase você pode registrar um hook para executar código no momento certo.`,
      code: `<script setup>
import {
  onBeforeMount, onMounted,
  onBeforeUpdate, onUpdated,
  onBeforeUnmount, onUnmounted,
} from 'vue'

onBeforeMount(() => console.log('1. antes de montar — DOM ainda não existe'))
onMounted(() => console.log('2. montado — DOM pronto ✓'))

onBeforeUpdate(() => console.log('3. antes de atualizar'))
onUpdated(() => console.log('4. atualizado — DOM reflete o novo estado'))

onBeforeUnmount(() => console.log('5. antes de destruir — componente ainda funciona'))
onUnmounted(() => console.log('6. destruído — limpe timers e listeners aqui'))
</script>`,
    },
    {
      title: 'onMounted — o hook mais importante',
      body: `onMounted roda quando o componente acabou de aparecer na tela. O DOM está disponível, então você pode acessar elementos, buscar dados da API, e inicializar bibliotecas externas.
É aqui que a maioria dos "efeitos iniciais" do componente acontecem.`,
      code: `<script setup>
import { ref, onMounted } from 'vue'

const users = ref([])
const isLoading = ref(true)

onMounted(async () => {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users?_limit=5')
    users.value = await res.json()
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div v-if="isLoading">⏳ Carregando...</div>
  <ul v-else>
    <li v-for="user in users" :key="user.id">{{ user.name }}</li>
  </ul>
</template>`,
    },
    {
      title: 'onUnmounted — limpeza e prevenção de memory leaks',
      body: `Quando um componente é removido, coisas que você criou dentro dele continuam rodando se você não limpar. Um setInterval criado em onMounted vai continuar executando mesmo depois que o componente sumiu da tela.
Use onUnmounted para limpar tudo: timers, event listeners globais, WebSockets.`,
      code: `<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const time = ref(new Date().toLocaleTimeString())
const windowWidth = ref(window.innerWidth)
let clockInterval = null

function updateWidth() {
  windowWidth.value = window.innerWidth
}

onMounted(() => {
  // Inicia recursos
  clockInterval = setInterval(() => {
    time.value = new Date().toLocaleTimeString()
  }, 1000)
  window.addEventListener('resize', updateWidth)
})

onUnmounted(() => {
  // Limpa recursos — evita memory leak!
  clearInterval(clockInterval)
  window.removeEventListener('resize', updateWidth)
})
</script>`,
    },
    {
      title: 'onUpdated — após cada re-render',
      body: `onUpdated roda após cada re-render do componente por mudança de estado. É raro precisar dele, mas é útil quando você precisa fazer algo com o DOM atualizado — como rolar para o final de uma lista de mensagens.
Cuidado: nunca mude estado dentro de onUpdated sem condição — causa loop infinito.`,
      code: `<script setup>
import { ref, onUpdated } from 'vue'

const messages = ref([])
const listEl = ref(null)

onUpdated(() => {
  // Rola para o fim da lista quando chega nova mensagem
  if (listEl.value) {
    listEl.value.scrollTop = listEl.value.scrollHeight
  }
  // ⚠️ Nunca: messages.value.push('algo') — loop infinito!
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
      body: `onBeforeMount roda antes do componente aparecer na tela — o DOM ainda não existe. Útil para preparação de dados síncronos.
onBeforeUnmount roda antes da destruição começar — o componente ainda está funcional. Ótimo para salvar dados antes de sair.`,
      code: `<script setup>
import { onBeforeMount, onBeforeUnmount } from 'vue'

onBeforeMount(() => {
  console.log('Prestes a montar...')
})

onBeforeUnmount(() => {
  console.log('Prestes a desmontar...')
  saveUserProgress()
})
</script>`,
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
      back: '`onMounted` → `onUpdated` (por re-render) → `onUnmounted`',
      code: `// setup → onMounted → [re-renders: onUpdated] → onUnmounted`,
      lessonTitle: 'Lifecycle Hooks',
    },
    {
      id: 'lc-fc-5',
      front: 'Para que servem `onBeforeMount` e `onBeforeUnmount`?',
      back: '`onBeforeMount`: roda antes de aparecer na tela — DOM ainda não existe. `onBeforeUnmount`: roda antes da destruição — componente ainda funciona, ideal para salvar dados.',
      code: `onBeforeMount(() => {
  // DOM ainda não existe aqui
})

onBeforeUnmount(() => {
  saveUserProgress() // componente ainda está vivo
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
      type: 'fill-blank',
      title: 'Log em tempo real',
      description: 'Complete: inicie o timer, role a lista automaticamente no onUpdated e limpe o timer ao desmontar.',
      xpReward: 30,
      template: `<script setup>
import { ref, onMounted, onUpdated, onUnmounted } from 'vue'

const logs = ref([])
const listEl = ref(null)
let timer = null

onMounted(() => {
  timer = ___(() => logs.value.push(new Date().toLocaleTimeString()), 1000)
})

___(() => {
  listEl.value.scrollTop = listEl.value.scrollHeight
})

onUnmounted(() => ___(timer))
</script>

<template>
  <ul ref="listEl" style="max-height:120px;overflow:auto">
    <li v-for="log in logs" :key="log">{{ log }}</li>
  </ul>
</template>`,
      blanks: ['setInterval', 'onUpdated', 'clearInterval'],
      solution: `<script setup>
import { ref, onMounted, onUpdated, onUnmounted } from 'vue'

const logs = ref([])
const listEl = ref(null)
let timer = null

onMounted(() => {
  timer = setInterval(() => logs.value.push(new Date().toLocaleTimeString()), 1000)
})

onUpdated(() => {
  listEl.value.scrollTop = listEl.value.scrollHeight
})

onUnmounted(() => clearInterval(timer))
</script>

<template>
  <ul ref="listEl" style="max-height:120px;overflow:auto">
    <li v-for="log in logs" :key="log">{{ log }}</li>
  </ul>
</template>`,
      hint: 'onUpdated roda após cada re-render — ideal para rolar a lista. onUnmounted é o lugar certo para clearInterval.',
    },
    {
      id: 'lc-ch-5',
      type: 'fix-bug',
      title: 'Bugs nos lifecycle hooks',
      description: 'O componente tem 3 erros relacionados ao ciclo de vida. Encontre e corrija.',
      xpReward: 35,
      buggyCode: `<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const inputEl = ref(null)
inputEl.value.focus()

const count = ref(0)
let timer = null

onMounted(() => {
  timer = setInterval(() => count.value++, 1000)
})

onUpdated(() => {
  count.value = 0
})

onUnmounted(() => {
  console.log('unmounted')
})
</script>

<template>
  <input ref="inputEl" placeholder="Auto-foco" />
  <p>{{ count }}</p>
</template>`,
      solution: `<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const inputEl = ref(null)
const count = ref(0)
let timer = null

onMounted(() => {
  inputEl.value.focus()
  timer = setInterval(() => count.value++, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<template>
  <input ref="inputEl" placeholder="Auto-foco" />
  <p>{{ count }}</p>
</template>`,
      explanation: '1) inputEl.value é null antes de montar — acesse dentro de onMounted. 2) Mutar estado dentro de onUpdated sem condição causa loop infinito — remova o bloco. 3) onUnmounted deve limpar o timer com clearInterval, não apenas logar.',
    },
  ],
}
