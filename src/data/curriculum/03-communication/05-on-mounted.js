export default {
  id: 'on-mounted',
  moduleId: 'communication',
  title: 'onMounted',
  icon: '🌱',
  xpReward: 25,
  docUrl: 'https://vuejs.org/api/composition-api-lifecycle#onmounted',

  theory: [
    {
      title: 'onMounted — estou pronto',
      body: `O onMounted é o "estou pronto" — roda quando o componente acabou de aparecer na tela e o DOM está disponível. É aqui que você faz fetch inicial, inicializa bibliotecas externas e acessa template refs.`,
      code: `<script setup>
import { ref, onMounted } from 'vue'

const usuarios = ref([])
const carregando = ref(true)

onMounted(async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users?_limit=3')
  usuarios.value = await res.json()
  carregando.value = false
})
</script>

<template>
  <p v-if="carregando">⏳ Carregando...</p>
  <ul v-else>
    <li v-for="u in usuarios" :key="u.id">{{ u.name }}</li>
  </ul>
</template>`,
    },
    {
      title: 'O DOM existe no onMounted',
      body: `A diferença do onMounted para o resto do script: o DOM está pronto. Você pode acessar elementos via template refs, medir tamanhos, iniciar animações.`,
      code: `<script setup>
import { ref, onMounted } from 'vue'

const inputEl = ref(null)
const containerEl = ref(null)

onMounted(() => {
  inputEl.value.focus()

  const altura = containerEl.value.clientHeight
  console.log('Altura do container:', altura)
})
</script>

<template>
  <div ref="containerEl">
    <input ref="inputEl" placeholder="Auto-focado!" />
  </div>
</template>`,
    },
  ],

  flashcards: [
    {
      id: 'onmounted-fc-1',
      front: 'Quando usar onMounted?',
      back: 'Para fetch inicial, acesso ao DOM, inicialização de bibliotecas — qualquer coisa que precisa do DOM pronto.',
      code: `onMounted(async () => {
  dados.value = await fetch('/api').then(r => r.json())
})`,
      lessonTitle: 'onMounted',
    },
    {
      id: 'onmounted-fc-2',
      front: 'Por que não acessar o DOM fora do onMounted?',
      back: 'O DOM não existe antes do componente montar. Template refs são null até o onMounted ser chamado.',
      code: `const el = ref(null)
// ❌ el.value é null aqui
onMounted(() => {
  el.value.focus() // ✅
})`,
      lessonTitle: 'onMounted',
    },
  ],

  challenges: [
    {
      id: 'onmounted-ch-1',
      type: 'fill-blank',
      title: 'Fetch no onMounted',
      description: 'Complete o código para buscar dados ao montar o componente.',
      xpReward: 25,
      template: `<script setup>
import { ref, ___ } from 'vue'

const posts = ref([])

___(async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
  posts.___ = await res.json()
})
</script>

<template>
  <ul>
    <li v-for="post in posts" :key="post.id">{{ post.title }}</li>
  </ul>
</template>`,
      blanks: ['onMounted', 'onMounted', 'value'],
      solution: `<script setup>
import { ref, onMounted } from 'vue'

const posts = ref([])

onMounted(async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
  posts.value = await res.json()
})
</script>

<template>
  <ul>
    <li v-for="post in posts" :key="post.id">{{ post.title }}</li>
  </ul>
</template>`,
      hint: 'onMounted pode ser async. Atribua o resultado a posts.value.',
    },
  ],
}
