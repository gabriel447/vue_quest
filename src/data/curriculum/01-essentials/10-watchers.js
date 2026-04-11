export default {
  id: 'watchers',
  moduleId: 'essentials',
  title: 'Watchers',
  icon: '👁️',
  xpReward: 35,
  docUrl: 'https://vuejs.org/guide/essentials/watchers',

  theory: [
    {
      title: 'watch() — reagindo a mudanças de estado',
      body: `watch() executa uma função toda vez que uma fonte reativa muda.
Use quando precisar de efeitos colaterais (fetch, localStorage, animações) em resposta a mudanças específicas.`,
      code: `<script setup>
import { ref, watch } from 'vue'

const query = ref('')
const results = ref([])

// Reage quando query muda
watch(query, async (newQuery, oldQuery) => {
  console.log(\`Busca mudou: "\${oldQuery}" → "\${newQuery}"\`)

  if (newQuery.length < 2) {
    results.value = []
    return
  }

  // Side effect: busca dados na API
  const res = await fetch(\`/api/search?q=\${newQuery}\`)
  results.value = await res.json()
})
</script>`,
    },
    {
      title: 'watch() — fontes e opções',
      body: `watch() pode observar refs, getters (funções), objetos reactive, ou arrays de múltiplas fontes.
Opções importantes: immediate (executa na montagem), deep (detecta mudanças aninhadas).`,
      code: `import { ref, reactive, watch } from 'vue'

const count = ref(0)
const user = reactive({ name: 'Ana', age: 25 })

// Observar ref
watch(count, (novo, antigo) => console.log(novo, antigo))

// Observar propriedade de reactive (getter)
watch(() => user.name, (novo) => console.log('Nome:', novo))

// Múltiplas fontes → callback com arrays
watch([count, () => user.age], ([novoCount, novaAge]) => {
  console.log('count ou age mudou')
})

// immediate: executa também na montagem
watch(count, (val) => fetchData(val), { immediate: true })

// deep: detecta mudanças em objetos aninhados
watch(user, (val) => save(val), { deep: true })`,
    },
    {
      title: 'watchEffect() — rastreamento automático',
      body: `watchEffect() rastreia automaticamente todas as refs e reactive acessadas dentro dele.
Executa imediatamente ao montar e toda vez que qualquer dependência muda.`,
      code: `<script setup>
import { ref, watchEffect } from 'vue'

const userId = ref(1)
const user = ref(null)

// Rastreia userId.value automaticamente
// Executa imediatamente (sem { immediate: true })
watchEffect(async () => {
  // Vue detecta que userId.value é acessado aqui
  const res = await fetch(\`/api/users/\${userId.value}\`)
  user.value = await res.json()
})

// Simples: sem precisar listar a fonte explicitamente
const count = ref(0)
watchEffect(() => {
  document.title = \`Contador: \${count.value}\`
})
</script>`,
    },
    {
      title: 'Parar um watcher manualmente',
      body: `watch() e watchEffect() retornam uma função para parar o observador quando necessário.
Watchers criados dentro de setup() são parados automaticamente ao desmontar.`,
      code: `<script setup>
import { ref, watch } from 'vue'

const enabled = ref(true)

// Guardar o retorno para parar depois
const stopWatch = watch(enabled, (val) => {
  console.log('enabled mudou:', val)
})

function disable() {
  // Para o watcher manualmente
  stopWatch()
  console.log('Watcher parado')
}

// Watcher criado em setup() → parado automaticamente no onUnmounted
// Watcher criado fora do setup() → precisa parar manualmente!
</script>`,
    },
    {
      title: 'watch vs watchEffect vs computed',
      body: `Três ferramentas reativas com propósitos diferentes — escolher a certa é fundamental.`,
      code: `import { ref, computed, watch, watchEffect } from 'vue'

const count = ref(0)
const items = ref([])

// computed: valor derivado com cache → sem side effects
const doubled = computed(() => count.value * 2)
const total = computed(() => items.value.reduce((s, i) => s + i, 0))

// watch: side effect com controle total → acesso ao valor anterior
watch(count, (novo, antigo) => {
  console.log(\`\${antigo} → \${novo}\`)
  localStorage.setItem('count', novo)
})

// watchEffect: side effect auto-rastreado → sem valor anterior
watchEffect(() => {
  document.title = \`Items: \${items.value.length}\`
})

// Regra: valor derivado → computed
//         side effect com fonte explícita → watch
//         side effect auto-rastreado → watchEffect`,
    },
  ],

  flashcards: [
    {
      id: 'wa-fc-1',
      front: 'Quando usar watch() ao invés de computed()?',
      back: '`watch()` para efeitos colaterais (fetch, localStorage, logs).\n`computed()` para valores derivados.',
      code: `watch(query, (q) => fetchResults(q))`,
      lessonTitle: 'Watchers',
    },
    {
      id: 'wa-fc-2',
      front: 'Como detectar mudanças profundas em objetos?',
      back: 'Passe `{ deep: true }`. Sem isso, mudanças em propriedades aninhadas não são detectadas.',
      code: `watch(user, callback, { deep: true })`,
      lessonTitle: 'Watchers',
    },
    {
      id: 'wa-fc-3',
      front: 'Qual a diferença entre watch() e watchEffect()?',
      back: '`watch`: fonte explícita, acesso ao valor anterior.\n`watchEffect`: rastreia automaticamente, executa imediatamente.',
      code: `watch(src, (novo, antigo) => { })
watchEffect(() => { /* usa src.value */ })`,
      lessonTitle: 'Watchers',
    },
    {
      id: 'wa-fc-4',
      front: 'Como executar o watcher imediatamente na montagem?',
      back: 'Use `{ immediate: true }`. Por padrão, watch() só executa quando o valor muda.',
      code: `watch(userId, fetchUser, { immediate: true })`,
      lessonTitle: 'Watchers',
    },
    {
      id: 'wa-fc-5',
      front: 'Como observar uma propriedade específica de reactive()?',
      back: 'Use um getter como fonte: `() => obj.prop`.',
      code: `watch(() => user.name, (novo) => console.log(novo))`,
      lessonTitle: 'Watchers',
    },
  ],

  challenges: [
    {
      id: 'wa-ch-1',
      type: 'fill-blank',
      title: 'Watch básico com log',
      description: 'Complete o watch para logar os valores novo e antigo sempre que `count` mudar.',
      xpReward: 20,
      template: `<script setup>
import { ref, ___ } from 'vue'

const count = ref(0)

___(count, (newVal, oldVal) => {
  console.log(\`count: \${oldVal} → \${newVal}\`)
})
</script>

<template>
  <button @click="count++">+1 (count: {{ count }})</button>
</template>`,
      blanks: ['watch', 'watch'],
      solution: `<script setup>
import { ref, watch } from 'vue'

const count = ref(0)

watch(count, (newVal, oldVal) => {
  console.log(\`count: \${oldVal} → \${newVal}\`)
})
</script>

<template>
  <button @click="count++">+1 (count: {{ count }})</button>
</template>`,
      hint: 'Importe watch de "vue". O callback recebe (novoValor, valorAntigo).',
    },
    {
      id: 'wa-ch-2',
      type: 'fill-blank',
      title: 'Auto-save com watch',
      description: 'Complete os watchers para salvar title e content no localStorage automaticamente.',
      xpReward: 50,
      template: `<script setup>
import { ref, watch } from 'vue'

const title = ref(localStorage.getItem('note-title') || '')
const content = ref(localStorage.getItem('note-content') || '')
const saved = ref(false)
let saveTimeout = null

function showSaved() {
  saved.value = true
  clearTimeout(saveTimeout)
  saveTimeout = setTimeout(() => { saved.value = false }, 2000)
}

___(title, (val) => {
  localStorage.setItem('note-title', val)
  showSaved()
})

___(content, (val) => {
  localStorage.setItem('_______', val)
  showSaved()
})
</script>

<template>
  <input v-model="title" placeholder="Título da nota" />
  <textarea v-model="content" placeholder="Conteúdo..." rows="6" />
  <p v-if="saved" style="color: #42b883">💾 Salvo!</p>
</template>`,
      blanks: ['watch', 'watch', 'note-content'],
      solution: `<script setup>
import { ref, watch } from 'vue'

const title = ref(localStorage.getItem('note-title') || '')
const content = ref(localStorage.getItem('note-content') || '')
const saved = ref(false)
let saveTimeout = null

function showSaved() {
  saved.value = true
  clearTimeout(saveTimeout)
  saveTimeout = setTimeout(() => { saved.value = false }, 2000)
}

watch(title, (val) => {
  localStorage.setItem('note-title', val)
  showSaved()
})

watch(content, (val) => {
  localStorage.setItem('note-content', val)
  showSaved()
})
</script>

<template>
  <input v-model="title" placeholder="Título da nota" />
  <textarea v-model="content" placeholder="Conteúdo..." rows="6" />
  <p v-if="saved" style="color: #42b883">💾 Salvo!</p>
</template>`,
      hint: 'watch(fonte, callback) executa sempre que a fonte muda. localStorage.setItem salva o novo valor.',
    },
    {
      id: 'wa-ch-3',
      type: 'fill-blank',
      title: 'watchEffect para título da página',
      description: 'Use watchEffect para atualizar o document.title automaticamente quando `route` ou `count` mudar.',
      xpReward: 25,
      template: `<script setup>
import { ref, ___ } from 'vue'

const route = ref('Home')
const count = ref(0)

// Atualiza o título da página automaticamente
___(() => {
  document.title = \`\${route.value} | \${count.value} notificações\`
})
</script>`,
      blanks: ['watchEffect', 'watchEffect'],
      solution: `<script setup>
import { ref, watchEffect } from 'vue'

const route = ref('Home')
const count = ref(0)

watchEffect(() => {
  document.title = \`\${route.value} | \${count.value} notificações\`
})
</script>`,
      hint: 'watchEffect rastreia automaticamente route.value e count.value usados dentro dele.',
    },
    {
      id: 'wa-ch-4',
      type: 'fix-bug',
      title: 'Watch que não detecta mudança',
      description: 'O watch deveria atualizar o histórico quando o usuário muda de cidade, mas nunca dispara. Corrija.',
      xpReward: 35,
      buggyCode: `<script setup>
import { ref, watch } from 'vue'

const user = ref({ name: 'Ana', address: { city: 'São Paulo' } })
const history = ref([])

// Deveria detectar quando city muda
watch(user, (newUser) => {
  history.value.push(\`Viajou para \${newUser.address.city}\`)
})

function travelTo(city) {
  user.value.address.city = city
}
</script>

<template>
  <button @click="travelTo('Rio de Janeiro')">→ RJ</button>
  <button @click="travelTo('Belo Horizonte')">→ BH</button>
  <p v-for="h in history" :key="h">{{ h }}</p>
</template>`,
      solution: `<script setup>
import { ref, watch } from 'vue'

const user = ref({ name: 'Ana', address: { city: 'São Paulo' } })
const history = ref([])

// deep: true para detectar mudanças aninhadas
watch(user, (newUser) => {
  history.value.push(\`Viajou para \${newUser.address.city}\`)
}, { deep: true })

function travelTo(city) {
  user.value.address.city = city
}
</script>

<template>
  <button @click="travelTo('Rio de Janeiro')">→ RJ</button>
  <button @click="travelTo('Belo Horizonte')">→ BH</button>
  <p v-for="h in history" :key="h">{{ h }}</p>
</template>`,
      explanation: 'Mudanças em propriedades aninhadas de objetos não são detectadas sem { deep: true }. Alternativa: observe a propriedade específica com () => user.value.address.city.',
    },
    {
      id: 'wa-ch-5',
      type: 'fill-blank',
      title: 'Busca com debounce',
      description: 'Complete o debounce: cancele o timer anterior e inicie um novo antes de buscar.',
      xpReward: 55,
      template: `<script setup>
import { ref, watch } from 'vue'

const query = ref('')
const results = ref([])
const loading = ref(false)
let debounceTimer = null

const data = [
  'Vue.js', 'Vite', 'Vitest', 'Vuex', 'Vue Router',
  'Pinia', 'Nuxt', 'VueUse', 'Quasar', 'Vuetify',
]

watch(query, (q) => {
  ___(debounceTimer)        // cancela busca anterior
  results.value = []

  if (!q.trim()) return

  loading.value = true
  debounceTimer = ___(()  => {
    results.value = data.filter(item =>
      item.toLowerCase().includes(q.toLowerCase())
    )
    loading.value = false
  }, 400)
})
</script>

<template>
  <input v-model="query" placeholder="Buscar no ecossistema Vue..." />
  <p v-if="loading">🔍 Buscando...</p>
  <ul v-else>
    <li v-for="r in results" :key="r">{{ r }}</li>
  </ul>
  <p v-if="query && !loading && !results.length">Sem resultados</p>
</template>`,
      blanks: ['clearTimeout', 'setTimeout'],
      solution: `<script setup>
import { ref, watch } from 'vue'

const query = ref('')
const results = ref([])
const loading = ref(false)
let debounceTimer = null

const data = [
  'Vue.js', 'Vite', 'Vitest', 'Vuex', 'Vue Router',
  'Pinia', 'Nuxt', 'VueUse', 'Quasar', 'Vuetify',
]

watch(query, (q) => {
  clearTimeout(debounceTimer)
  results.value = []

  if (!q.trim()) return

  loading.value = true
  debounceTimer = setTimeout(() => {
    results.value = data.filter(item =>
      item.toLowerCase().includes(q.toLowerCase())
    )
    loading.value = false
  }, 400)
})
</script>

<template>
  <input v-model="query" placeholder="Buscar no ecossistema Vue..." />
  <p v-if="loading">🔍 Buscando...</p>
  <ul v-else>
    <li v-for="r in results" :key="r">{{ r }}</li>
  </ul>
  <p v-if="query && !loading && !results.length">Sem resultados</p>
</template>`,
      hint: 'Debounce = clearTimeout + setTimeout. clearTimeout cancela o timer anterior para não buscar a cada tecla.',
    },
  ],
}
