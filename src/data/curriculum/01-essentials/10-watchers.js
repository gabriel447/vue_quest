export default {
  id: 'watchers',
  moduleId: 'essentials',
  title: 'Watchers',
  icon: '👁️',
  xpReward: 35,
  docUrl: 'https://vuejs.org/guide/essentials/watchers',

  theory: [
    {
      title: 'watch() — reagindo a mudanças com efeitos colaterais',
      body: `Computed properties calculam valores. Watchers fazem outra coisa: executam efeitos colaterais quando um valor muda — como fazer um fetch, salvar no localStorage, ou tocar um som.
A diferença do computed: o watcher não retorna valor, ele age.`,
      code: `<script setup>
import { ref, watch } from 'vue'

const query = ref('')
const results = ref([])

watch(query, async (newQuery, oldQuery) => {
  console.log(\`Busca mudou: "\${oldQuery}" → "\${newQuery}"\`)

  if (newQuery.length < 2) {
    results.value = []
    return
  }

  const res = await fetch(\`/api/search?q=\${newQuery}\`)
  results.value = await res.json()
})
</script>`,
    },
    {
      title: 'watch() — fontes e opções',
      body: `O watch() pode observar refs, getters (funções arrow), objetos reactive, ou um array de múltiplas fontes ao mesmo tempo.
Opções úteis: immediate (executa imediatamente ao montar, não só quando muda) e deep (detecta mudanças aninhadas em objetos).`,
      code: `<script setup>
import { ref, reactive, watch } from 'vue'

const count = ref(0)
const user = reactive({ name: 'Ana', age: 25 })

watch(count, (novo, antigo) => console.log(novo, antigo))

watch(() => user.name, (novo) => console.log('Nome:', novo))

watch([count, () => user.age], ([novoCount, novaAge]) => {
  console.log('count ou age mudou')
})

watch(count, (val) => fetchData(val), { immediate: true })

watch(user, (val) => save(val), { deep: true })
</script>`,
    },
    {
      title: 'watchEffect() — rastreamento automático',
      body: `watchEffect() é mais simples: você escreve código que usa refs, e ele rastreia automaticamente todas elas. Executa imediatamente ao montar e toda vez que qualquer dependência mudar.
Use quando não precisa do valor anterior e não quer declarar a fonte explicitamente.`,
      code: `<script setup>
import { ref, watchEffect } from 'vue'

const userId = ref(1)
const user = ref(null)

// Rastreia userId automaticamente e busca quando muda
watchEffect(async () => {
  const res = await fetch(\`/api/users/\${userId.value}\`)
  user.value = await res.json()
})

const count = ref(0)

// Atualiza o título da página automaticamente
watchEffect(() => {
  document.title = \`Contador: \${count.value}\`
})
</script>`,
    },
    {
      title: 'Parar um watcher manualmente',
      body: `watch() e watchEffect() retornam uma função para parar o observador quando quiser. Watchers criados dentro do setup() são parados automaticamente quando o componente é destruído — você só precisa parar manualmente em casos específicos.`,
      code: `<script setup>
import { ref, watch } from 'vue'

const enabled = ref(true)

// Guarda a função de parada
const stopWatch = watch(enabled, (val) => {
  console.log('enabled mudou:', val)
})

function disable() {
  stopWatch()  // para o watcher manualmente
  console.log('Watcher parado!')
}
</script>`,
    },
    {
      title: 'watch vs watchEffect vs computed',
      body: `Use computed quando precisar de um valor derivado com cache. Use watch quando precisar do valor anterior ou controle explícito da fonte. Use watchEffect para efeitos simples que dependem de múltiplas refs sem precisar do valor anterior.`,
      code: `<script setup>
import { ref, computed, watch, watchEffect } from 'vue'

const count = ref(0)
const items = ref([])

const doubled = computed(() => count.value * 2)

watch(count, (novo, antigo) => {
  console.log(\`\${antigo} → \${novo}\`)
  localStorage.setItem('count', novo)
})

watchEffect(() => {
  document.title = \`Items: \${items.value.length}\`
})
</script>`,
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
watchEffect(() => { useSrc.value })`,
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

watch(title, (val) => {
  localStorage.setItem('note-title', val)
  showSaved()
})

___(content, (val) => {
  localStorage.setItem('note-content', val)
  showSaved()
}, { ___: true })
</script>

<template>
  <input v-model="title" placeholder="Título da nota" />
  <textarea v-model="content" placeholder="Conteúdo..." rows="6" />
  <p v-if="saved" style="color: #42b883">💾 Salvo!</p>
</template>`,
      blanks: ['watch', 'immediate'],
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
}, { immediate: true })
</script>

<template>
  <input v-model="title" placeholder="Título da nota" />
  <textarea v-model="content" placeholder="Conteúdo..." rows="6" />
  <p v-if="saved" style="color: #42b883">💾 Salvo!</p>
</template>`,
      hint: 'watch(fonte, callback) para o segundo watcher. { immediate: true } executa na montagem sem esperar mudar.',
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

___(query, (q) => {
  ___(debounceTimer)
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
      blanks: ['watch', 'clearTimeout', 'setTimeout'],
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
    {
      id: 'wa-ch-5',
      type: 'fix-bug',
      title: 'Bugs no watch',
      description: 'O código tem 3 erros relacionados ao watch. Encontre e corrija.',
      xpReward: 35,
      buggyCode: `<script setup>
import { ref, reactive } from 'vue'

const count = ref(0)
const user = reactive({ name: 'Ana' })

watch(count.value, (val) => {
  console.log('count:', val)
})

watch(user, (val) => {
  console.log('name:', val.name)
})
</script>`,
      solution: `<script setup>
import { ref, reactive, watch } from 'vue'

const count = ref(0)
const user = reactive({ name: 'Ana' })

watch(count, (val) => {
  console.log('count:', val)
})

watch(user, (val) => {
  console.log('name:', val.name)
}, { deep: true })
</script>`,
      explanation: '1) watch não estava importado. 2) watch(count.value, ...) observa o número 0, não a ref — passe a ref diretamente: watch(count, ...). 3) reactive precisa de { deep: true } para detectar mudanças em propriedades.',
    },
  ],
}
