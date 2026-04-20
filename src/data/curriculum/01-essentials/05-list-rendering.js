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
      body: `Imagina ter que escrever 50 <li> na mão. O v-for faz isso por você: percorre cada item de um array e repete o elemento para cada um. O segundo parâmetro (opcional) é o índice da posição.`,
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

    <!-- Com índice — começa em 0 -->
    <li v-for="(player, index) in players" :key="player.id">
      #{{ index + 1 }} {{ player.name }}
    </li>
  </ul>
</template>`,
    },
    {
      title: ':key — o RG de cada item da lista',
      body: `O :key é como um RG para cada elemento. O Vue usa ele para rastrear qual elemento é qual quando a lista muda. Sem :key, o Vue pode misturar os elementos errados ao reordenar, causando bugs visuais.
Regra: sempre use um ID estável e único como key. Nunca use o índice em listas que podem ser reordenadas.`,
      code: `<!-- ✅ Correto: key único e estável (ID do dado) -->
<li v-for="item in items" :key="item.id">{{ item.name }}</li>
<li v-for="user in users" :key="user.uuid">{{ user.email }}</li>

<!-- ⚠️ Evitar: índice como key em listas que mudam de ordem -->
<!-- Se você adicionar/remover/reordenar, Vue pode reutilizar -->
<!-- o elemento errado, causando bugs visuais -->
<li v-for="(item, i) in items" :key="i">{{ item.name }}</li>

<!-- ✅ Índice como key é OK somente em listas estáticas -->
<li v-for="(step, i) in staticSteps" :key="i">{{ step }}</li>`,
    },
    {
      title: 'v-for com objetos — iterando propriedades',
      body: `O v-for também funciona em objetos JavaScript! Você itera pelas propriedades. Os parâmetros são: valor, chave, índice — nessa ordem.`,
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
      body: `O v-for aceita um número inteiro para repetir N vezes — útil para criar estrelas de avaliação, grids, etc. O valor vai de 1 até N (não de 0!).
Use <template v-for> para renderizar múltiplos elementos por item sem criar uma div wrapper.`,
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
      body: `Nunca coloque v-if e v-for no mesmo elemento. O v-if tem prioridade e não consegue acessar a variável do v-for — vai dar erro.
A solução certa: use <template v-for> com v-if no elemento filho. Mas o melhor mesmo é usar uma computed filtrada — mais limpo e mais performático.`,
      code: `<!-- ❌ Errado: v-if não acessa 'todo' do v-for -->
<li v-for="todo in todos" v-if="!todo.done" :key="todo.id">

<!-- ✅ Certo: template externo, v-if no filho -->
<template v-for="todo in todos" :key="todo.id">
  <li v-if="!todo.done">{{ todo.title }}</li>
</template>

<!-- ✅ Melhor ainda: computed filtrada (mais performático) -->
const activeTodos = computed(() =>
  todos.value.filter(t => !t.done)
)`,
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
      front: 'Como iterar as propriedades de um objeto com v-for?',
      back: 'Passe o objeto diretamente. Os parâmetros são: `(value, key, index)` — nessa ordem.',
      code: `<div v-for="(value, key, index) in profile" :key="key">
  {{ index + 1 }}. {{ key }}: {{ value }}
</div>`,
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
    <li ___="tech in techs" :key="tech">{{ tech }}</li>
  </ul>
</template>`,
      blanks: ['v-for'],
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
      title: 'Ordenar lista com computed',
      description: 'Complete a computed que retorna os números ordenados do maior para o menor.',
      xpReward: 50,
      template: `<script setup>
import { ref, computed } from 'vue'

const nums = ref([42, 7, 95, 13, 78])

const sorted = ___(() =>
  [...nums.value].___((___, b) => b - a)
)
</script>

<template>
  <li v-for="n in sorted" :key="n">{{ n }}</li>
</template>`,
      blanks: ['computed', 'sort', 'a'],
      solution: `<script setup>
import { ref, computed } from 'vue'

const nums = ref([42, 7, 95, 13, 78])

const sorted = computed(() =>
  [...nums.value].sort((a, b) => b - a)
)
</script>

<template>
  <li v-for="n in sorted" :key="n">{{ n }}</li>
</template>`,
      hint: '[...array] cria uma cópia antes de ordenar. b - a = decrescente (maior primeiro).',
    },
    {
      id: 'list-ch-5',
      type: 'fix-bug',
      title: 'Bugs no v-for',
      description: 'O código tem 3 erros relacionados ao v-for. Encontre e corrija.',
      xpReward: 35,
      buggyCode: `<script setup>
import { ref } from 'vue'

const items = ref(['Vue', 'React', 'Angular'])

function remove() {
  items = items.value.slice(1)
}
</script>

<template>
  <li v-for="(item, i) in items" v-if="item" :key="i">
    {{ item }}
  </li>
  <button @click="remove">Remover</button>
</template>`,
      solution: `<script setup>
import { ref } from 'vue'

const items = ref(['Vue', 'React', 'Angular'])

function remove() {
  items.value = items.value.slice(1)
}
</script>

<template>
  <template v-for="item in items" :key="item">
    <li>{{ item }}</li>
  </template>
  <button @click="remove">Remover</button>
</template>`,
      explanation: '1) items = ... reatribui — use items.value. 2) v-if e v-for no mesmo elemento — use <template v-for> com v-if no filho. 3) :key="i" (índice) muda ao remover — use :key="item".',
    },
  ],
}
