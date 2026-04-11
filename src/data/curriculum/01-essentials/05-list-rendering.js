export default {
  id: 'list-rendering',
  moduleId: 'essentials',
  title: 'List Rendering',
  icon: '📋',
  xpReward: 30,
  docUrl: 'https://vuejs.org/guide/essentials/list',

  theory: [
    {
      title: 'v-for — iterando arrays',
      body: `v-for renderiza um elemento para cada item de um array.
A sintaxe é "item in array". Você também pode acessar o índice como segundo parâmetro.`,
      code: `<script setup>
import { ref } from 'vue'

const players = ref([
  { id: 1, name: 'Ana', score: 980 },
  { id: 2, name: 'Bruno', score: 750 },
  { id: 3, name: 'Carol', score: 1200 },
])
</script>

<template>
  <ul>
    <!-- Sem índice -->
    <li v-for="player in players" :key="player.id">
      {{ player.name }}: {{ player.score }} pts
    </li>

    <!-- Com índice -->
    <li v-for="(player, index) in players" :key="player.id">
      #{{ index + 1 }} {{ player.name }}
    </li>
  </ul>
</template>`,
    },
    {
      title: ':key — identificação única dos itens',
      body: `O atributo :key é obrigatório em v-for. Ele ajuda Vue a identificar cada elemento para atualizações eficientes.
Use sempre um valor único e estável — geralmente um ID do banco de dados.`,
      code: `<!-- ✅ Correto: key único e estável (ID do dado) -->
<li v-for="item in items" :key="item.id">{{ item.name }}</li>
<li v-for="user in users" :key="user.uuid">{{ user.email }}</li>

<!-- ⚠️ Evitar: índice como key em listas que podem mudar -->
<!-- Se você adicionar/remover/reordenar, Vue pode reutilizar -->
<!-- o elemento errado, causando bugs visuais -->
<li v-for="(item, i) in items" :key="i">{{ item.name }}</li>

<!-- ✅ Índice como key é OK somente em listas estáticas -->
<li v-for="(step, i) in staticSteps" :key="i">{{ step }}</li>`,
    },
    {
      title: 'v-for com objetos — iterando propriedades',
      body: `v-for também funciona em objetos JavaScript. Os parâmetros são: valor, chave, índice.`,
      code: `<script setup>
const profile = {
  name: 'Ana Silva',
  level: 5,
  xp: 2400,
  streak: 12,
}
</script>

<template>
  <!-- (value, key, index) -->
  <div v-for="(value, key, index) in profile" :key="key">
    {{ index + 1 }}. {{ key }}: {{ value }}
  </div>

  <!-- Resultado:
    1. name: Ana Silva
    2. level: 5
    3. xp: 2400
    4. streak: 12
  -->
</template>`,
    },
    {
      title: 'v-for com range e <template>',
      body: `v-for aceita um número inteiro para repetir N vezes. O valor vai de 1 a N.
Use <template v-for> para renderizar múltiplos elementos por item sem wrapper.`,
      code: `<!-- Repetir 5 estrelas: valores 1, 2, 3, 4, 5 -->
<span v-for="n in 5" :key="n">
  {{ n <= userRating ? '⭐' : '☆' }}
</span>

<!-- Múltiplos elementos por item sem div wrapper -->
<template v-for="item in items" :key="item.id">
  <dt>{{ item.term }}</dt>
  <dd>{{ item.definition }}</dd>
</template>`,
    },
    {
      title: 'v-for + v-if — nunca no mesmo elemento',
      body: `Nunca use v-if e v-for no mesmo elemento — v-if tem prioridade e não tem acesso à variável do v-for.
Use <template v-for> e coloque v-if no filho, ou melhor: use uma computed filtrada.`,
      code: `<!-- ❌ Errado: v-if não acessa 'todo' do v-for -->
<li v-for="todo in todos" v-if="!todo.done" :key="todo.id">

<!-- ✅ Certo: template externo, v-if interno -->
<template v-for="todo in todos" :key="todo.id">
  <li v-if="!todo.done">{{ todo.title }}</li>
</template>

<!-- ✅ Melhor ainda: computed filtrada (mais performático) -->
const activeTodos = computed(() =>
  todos.value.filter(t => !t.done)
)
// <li v-for="todo in activeTodos" :key="todo.id">`,
    },
  ],

  flashcards: [
    {
      id: 'list-fc-1',
      front: 'Como renderizar uma lista com v-for?',
      back: 'Use `v-for="item in items"` com `:key` obrigatório. A key deve ser única (ex: `item.id`).',
      code: `<li v-for="item in items" :key="item.id">
  {{ item.name }}
</li>`,
      lessonTitle: 'List Rendering',
    },
    {
      id: 'list-fc-2',
      front: 'O que nunca usar como :key? Por quê?',
      back: 'Nunca use o **índice** como key em listas que podem ser reordenadas ou filtradas — causa bugs de renderização.',
      code: `<!-- ✅ ID estável -->
<li v-for="u in users" :key="u.id">

<!-- ❌ Índice muda -->
<li v-for="(u, i) in users" :key="i">`,
      lessonTitle: 'List Rendering',
    },
    {
      id: 'list-fc-3',
      front: 'Como acessar o índice de cada item no v-for?',
      back: 'Desestruture com `(item, index)` — o índice é o segundo parâmetro.',
      code: `<li v-for="(item, i) in items" :key="item.id">
  {{ i + 1 }}. {{ item.name }}
</li>`,
      lessonTitle: 'List Rendering',
    },
    {
      id: 'list-fc-4',
      front: 'Pode usar v-if e v-for no mesmo elemento?',
      back: 'Evite — v-if tem prioridade e não acessa a variável do v-for. Use `<template v-for>` com v-if no filho.',
      code: `<template v-for="item in items" :key="item.id">
  <li v-if="item.active">{{ item.name }}</li>
</template>`,
      lessonTitle: 'List Rendering',
    },
    {
      id: 'list-fc-5',
      front: 'Quais métodos de array Vue detecta automaticamente?',
      back: 'push, pop, shift, unshift, splice, sort, reverse. Substituir o array inteiro também funciona.',
      code: `items.value.push('novo')   // ✅
items.value.sort()          // ✅`,
      lessonTitle: 'List Rendering',
    },
    {
      id: 'list-fc-6',
      front: 'Como repetir um elemento N vezes com v-for?',
      back: 'Passe um número: `v-for="n in 5"`. O `n` vai de 1 a 5.',
      code: `<span v-for="n in 5" :key="n">⭐</span>`,
      lessonTitle: 'List Rendering',
    },
  ],

  challenges: [
    {
      id: 'list-ch-1',
      type: 'fill-blank',
      title: 'Lista simples com v-for',
      description: 'Complete o v-for para renderizar cada tecnologia do array com a key correta.',
      xpReward: 20,
      template: `<template>
  <ul>
    <li ___ in techs" :key="tech">{{ tech }}</li>
  </ul>
</template>`,
      blanks: ['v-for="tech'],
      solution: `<template>
  <ul>
    <li v-for="tech in techs" :key="tech">{{ tech }}</li>
  </ul>
</template>`,
      hint: 'A sintaxe é: v-for="item in array" com :key obrigatório.',
    },
    {
      id: 'list-ch-2',
      type: 'fill-blank',
      title: 'Lista com índice e objeto',
      description: 'Complete o v-for para acessar o player e seu índice, exibindo a posição (#1, #2...) e o nome.',
      xpReward: 25,
      template: `<template>
  <ol>
    <li v-for="(___, ___) in players" :key="player.id">
      #{{ index + 1 }} — {{ player.name }}: {{ player.score }} pts
    </li>
  </ol>
</template>`,
      blanks: ['player', 'index'],
      solution: `<template>
  <ol>
    <li v-for="(player, index) in players" :key="player.id">
      #{{ index + 1 }} — {{ player.name }}: {{ player.score }} pts
    </li>
  </ol>
</template>`,
      hint: 'O segundo parâmetro do v-for é o índice: (item, index) in array.',
    },
    {
      id: 'list-ch-3',
      type: 'fill-blank',
      title: 'Lista de tarefas com computed filtrada',
      description: 'Complete a computed que filtra tarefas pendentes e a função que marca uma como concluída.',
      xpReward: 55,
      template: `<script setup>
import { ref, computed } from 'vue'

const todos = ref([
  { id: 1, title: 'Estudar Vue 3', done: false },
  { id: 2, title: 'Fazer projeto', done: false },
  { id: 3, title: 'Ler documentação', done: true },
  { id: 4, title: 'Praticar desafios', done: false },
])

const activeTodos = ___(() =>
  todos.value.___(t => !t.done)
)

function complete(id) {
  const todo = todos.value.find(t => t.id === id)
  if (todo) todo.___ = true
}
</script>

<template>
  <h3>{{ activeTodos.length }} pendentes</h3>
  <ul>
    <li v-for="todo in activeTodos" :key="todo.id">
      {{ todo.title }}
      <button @click="complete(todo.id)">✅</button>
    </li>
  </ul>
</template>`,
      blanks: ['computed', 'filter', 'done'],
      solution: `<script setup>
import { ref, computed } from 'vue'

const todos = ref([
  { id: 1, title: 'Estudar Vue 3', done: false },
  { id: 2, title: 'Fazer projeto', done: false },
  { id: 3, title: 'Ler documentação', done: true },
  { id: 4, title: 'Praticar desafios', done: false },
])

const activeTodos = computed(() =>
  todos.value.filter(t => !t.done)
)

function complete(id) {
  const todo = todos.value.find(t => t.id === id)
  if (todo) todo.done = true
}
</script>

<template>
  <h3>{{ activeTodos.length }} pendentes</h3>
  <ul>
    <li v-for="todo in activeTodos" :key="todo.id">
      {{ todo.title }}
      <button @click="complete(todo.id)">✅</button>
    </li>
  </ul>
</template>`,
      hint: 'computed() para filtrar. .filter(t => !t.done) retorna só os pendentes. todo.done = true marca como concluído.',
    },
    {
      id: 'list-ch-4',
      type: 'fill-blank',
      title: 'Ranking dinâmico',
      description: 'Complete a computed que ordena os jogadores por pontuação (maior primeiro).',
      xpReward: 50,
      template: `<script setup>
import { ref, computed } from 'vue'

const players = ref([
  { id: 1, name: 'Ana', score: 850 },
  { id: 2, name: 'Bruno', score: 1200 },
  { id: 3, name: 'Carol', score: 975 },
  { id: 4, name: 'Diego', score: 630 },
])

// Spread para não mutar o original, sort por score decrescente
const ranking = ___(() =>
  [...players.value].___((___, b) => b.score - a.score)
)

function addPoints() {
  const points = Math.floor(Math.random() * 91) + 10
  players.value[0].score += points
}
</script>

<template>
  <button @click="addPoints">🎲 +pontos para Ana</button>
  <ol>
    <li v-for="(player, i) in ranking" :key="player.id">
      {{ i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : '' }}
      {{ player.name }} — {{ player.score }} pts
    </li>
  </ol>
</template>`,
      blanks: ['computed', 'sort', 'a'],
      solution: `<script setup>
import { ref, computed } from 'vue'

const players = ref([
  { id: 1, name: 'Ana', score: 850 },
  { id: 2, name: 'Bruno', score: 1200 },
  { id: 3, name: 'Carol', score: 975 },
  { id: 4, name: 'Diego', score: 630 },
])

const ranking = computed(() =>
  [...players.value].sort((a, b) => b.score - a.score)
)

function addPoints() {
  const points = Math.floor(Math.random() * 91) + 10
  players.value[0].score += points
}
</script>

<template>
  <button @click="addPoints">🎲 +pontos para Ana</button>
  <ol>
    <li v-for="(player, i) in ranking" :key="player.id">
      {{ i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : '' }}
      {{ player.name }} — {{ player.score }} pts
    </li>
  </ol>
</template>`,
      hint: '[...array].sort() cria cópia antes de ordenar. b.score - a.score = decrescente (maior primeiro).',
    },
    {
      id: 'list-ch-5',
      type: 'fix-bug',
      title: 'Lista com bugs de v-for',
      description: 'O código tem 3 problemas: key usando índice em lista mutável, v-if e v-for no mesmo elemento, e método não reativo. Corrija.',
      xpReward: 35,
      buggyCode: `<script setup>
import { ref } from 'vue'

const tasks = ref([
  { id: 1, title: 'Vue', done: false },
  { id: 2, title: 'React', done: true },
  { id: 3, title: 'Angular', done: false },
])

function removeFirst() {
  tasks = tasks.value.slice(1)  // ❌ bug
}
</script>

<template>
  <ul>
    <li
      v-for="(task, i) in tasks"
      v-if="!task.done"
      :key="i"
    >
      {{ task.title }}
    </li>
  </ul>
  <button @click="removeFirst">Remover primeiro</button>
</template>`,
      solution: `<script setup>
import { ref } from 'vue'

const tasks = ref([
  { id: 1, title: 'Vue', done: false },
  { id: 2, title: 'React', done: true },
  { id: 3, title: 'Angular', done: false },
])

function removeFirst() {
  tasks.value = tasks.value.slice(1)  // ✅ .value
}
</script>

<template>
  <ul>
    <template v-for="task in tasks" :key="task.id">
      <li v-if="!task.done">{{ task.title }}</li>
    </template>
  </ul>
  <button @click="removeFirst">Remover primeiro</button>
</template>`,
      explanation: '1) Use task.id como key, não o índice. 2) Separe v-for e v-if com <template>. 3) Refs precisam de .value para ser atribuídas.',
    },
  ],
}
