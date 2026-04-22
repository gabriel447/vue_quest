export default {
  id: 'v-for',
  moduleId: 'templates-directives',
  title: 'v-for',
  icon: '🔁',
  xpReward: 30,
  docUrl: 'https://vuejs.org/guide/essentials/list',

  theory: [
    {
      title: 'v-for — o carimbador',
      body: `O v-for é o "carimbador" — ele pega um bloco de HTML e carimba (repete) para cada item de uma lista. Em vez de escrever 50 <li> na mão, você escreve um e deixa o v-for repetir.`,
      code: `<script setup>
import { ref } from 'vue'
const jogadores = ref([
  { id: 1, nome: 'Ana', pontos: 980 },
  { id: 2, nome: 'Bruno', pontos: 750 },
  { id: 3, nome: 'Carol', pontos: 1200 },
])
</script>

<template>
  <ul>
    <li v-for="jogador in jogadores" :key="jogador.id">
      {{ jogador.nome }}: {{ jogador.pontos }} pts
    </li>
  </ul>
</template>`,
    },
    {
      title: ':key — o RG de cada item',
      body: `O :key é como um RG para cada elemento da lista. O Vue usa ele para saber qual elemento é qual quando a lista muda. Sem :key, o Vue pode atualizar o elemento errado.

Regra: sempre use um ID único e estável. Nunca use o índice em listas que podem mudar de ordem.`,
      code: `<!-- ✅ Key único e estável -->
<li v-for="item in items" :key="item.id">

<!-- ⚠️ Índice: problemático se a lista reordena -->
<li v-for="(item, i) in items" :key="i">

<!-- ✅ Índice OK apenas em listas estáticas que nunca reordenam -->
<li v-for="(passo, i) in passosFixos" :key="i">`,
    },
    {
      title: 'v-for com índice e objetos',
      body: `Acesse o índice passando um segundo parâmetro. Para objetos, o v-for itera pelas propriedades: (valor, chave, índice).`,
      code: `<template>
  <!-- Com índice -->
  <li v-for="(item, index) in items" :key="item.id">
    #{{ index + 1 }} — {{ item.nome }}
  </li>

  <!-- Iterando objeto -->
  <div v-for="(valor, chave) in perfil" :key="chave">
    {{ chave }}: {{ valor }}
  </div>

  <!-- Repetindo N vezes (começa em 1) -->
  <span v-for="n in 5" :key="n">⭐</span>
</template>`,
    },
    {
      title: 'Nunca use v-if e v-for no mesmo elemento',
      body: `v-if tem prioridade sobre v-for — então ele não consegue acessar a variável do v-for. A solução correta: use <template v-for> e coloque o v-if no elemento filho. Melhor ainda: use um computed filtrado.`,
      code: `<!-- ❌ v-if não acessa 'todo' do v-for -->
<li v-for="todo in todos" v-if="!todo.feito" :key="todo.id">

<!-- ✅ template externo, v-if no filho -->
<template v-for="todo in todos" :key="todo.id">
  <li v-if="!todo.feito">{{ todo.titulo }}</li>
</template>

<!-- ✅ Melhor: computed filtrado -->
// const pendentes = computed(() => todos.value.filter(t => !t.feito))`,
    },
  ],

  flashcards: [
    {
      id: 'vfor-fc-1',
      front: 'Qual a sintaxe básica do v-for?',
      back: 'v-for="item in lista" com :key obrigatório. Key deve ser único e estável (use item.id).',
      code: `<li v-for="item in items" :key="item.id">
  {{ item.nome }}
</li>`,
      lessonTitle: 'v-for',
    },
    {
      id: 'vfor-fc-2',
      front: 'O que nunca usar como :key? Por quê?',
      back: 'Nunca use o índice em listas que podem ser reordenadas — o Vue pode atualizar o elemento errado.',
      code: `// ✅ :key="item.id"
// ❌ :key="index" (se a lista pode reordenar)`,
      lessonTitle: 'v-for',
    },
    {
      id: 'vfor-fc-3',
      front: 'Como acessar o índice no v-for?',
      back: 'Segundo parâmetro: v-for="(item, index) in lista"',
      code: `<li v-for="(item, i) in items" :key="item.id">
  {{ i + 1 }}. {{ item.nome }}
</li>`,
      lessonTitle: 'v-for',
    },
    {
      id: 'vfor-fc-4',
      front: 'Pode usar v-if e v-for no mesmo elemento?',
      back: 'Não recomendado — v-if tem prioridade e não acessa a variável do v-for. Use <template v-for> ou um computed filtrado.',
      code: `<template v-for="item in items" :key="item.id">
  <li v-if="item.ativo">{{ item.nome }}</li>
</template>`,
      lessonTitle: 'v-for',
    },
  ],

  challenges: [
    {
      id: 'vfor-ch-1',
      type: 'fill-blank',
      title: 'Lista de tarefas',
      description: 'Complete o v-for para renderizar as tarefas com a key correta.',
      xpReward: 25,
      template: `<script setup>
import { ref } from 'vue'
const tarefas = ref([
  { id: 1, titulo: 'Aprender Vue', feito: false },
  { id: 2, titulo: 'Praticar v-for', feito: false },
  { id: 3, titulo: 'Fazer projeto', feito: true },
])
</script>

<template>
  <ul>
    <li
      ___="tarefa in tarefas"
      :key="tarefa.___"
      :style="{ textDecoration: tarefa.feito ? 'line-through' : 'none' }"
    >
      {{ tarefa.titulo }}
    </li>
  </ul>
</template>`,
      blanks: ['v-for', 'id'],
      solution: `<script setup>
import { ref } from 'vue'
const tarefas = ref([
  { id: 1, titulo: 'Aprender Vue', feito: false },
  { id: 2, titulo: 'Praticar v-for', feito: false },
  { id: 3, titulo: 'Fazer projeto', feito: true },
])
</script>

<template>
  <ul>
    <li
      v-for="tarefa in tarefas"
      :key="tarefa.id"
      :style="{ textDecoration: tarefa.feito ? 'line-through' : 'none' }"
    >
      {{ tarefa.titulo }}
    </li>
  </ul>
</template>`,
      hint: 'v-for="item in lista" com :key="item.id" usando o ID único de cada tarefa.',
    },
    {
      id: 'vfor-ch-2',
      type: 'fill-blank',
      title: 'Ranking com índice',
      description: 'Complete o v-for para exibir o ranking com posição (#1, #2...) e os dados de cada jogador.',
      xpReward: 30,
      template: `<script setup>
import { ref } from 'vue'
const ranking = ref([
  { id: 1, nome: 'Carol', pontos: 1200 },
  { id: 2, nome: 'Ana', pontos: 980 },
  { id: 3, nome: 'Bruno', pontos: 750 },
])
</script>

<template>
  <ol>
    <li v-for="(___, index) in ranking" :key="jogador.id">
      #{{ ___ + 1 }} — {{ jogador.nome }}: {{ jogador.pontos }} pts
    </li>
  </ol>
</template>`,
      blanks: ['jogador', 'index'],
      solution: `<script setup>
import { ref } from 'vue'
const ranking = ref([
  { id: 1, nome: 'Carol', pontos: 1200 },
  { id: 2, nome: 'Ana', pontos: 980 },
  { id: 3, nome: 'Bruno', pontos: 750 },
])
</script>

<template>
  <ol>
    <li v-for="(jogador, index) in ranking" :key="jogador.id">
      #{{ index + 1 }} — {{ jogador.nome }}: {{ jogador.pontos }} pts
    </li>
  </ol>
</template>`,
      hint: 'O segundo parâmetro do v-for é o índice: (item, index) in lista.',
    },
    {
      id: 'vfor-ch-3',
      type: 'fix-bug',
      title: 'Bugs no v-for',
      description: 'O código tem 3 erros com v-for. Encontre e corrija.',
      xpReward: 40,
      buggyCode: `<script setup>
import { ref } from 'vue'
const items = ref(['Vue', 'React', 'Angular'])

function remover() {
  items.value = items.value.slice(1)
}
</script>

<template>
  <li v-for="(item, i) in items" v-if="item" :key="i">
    {{ item }}
  </li>
  <button @click="remover">Remover primeiro</button>
</template>`,
      solution: `<script setup>
import { ref } from 'vue'
const items = ref(['Vue', 'React', 'Angular'])

function remover() {
  items.value = items.value.slice(1)
}
</script>

<template>
  <template v-for="item in items" :key="item">
    <li>{{ item }}</li>
  </template>
  <button @click="remover">Remover primeiro</button>
</template>`,
      explanation: '1) v-if e v-for no mesmo elemento — use template v-for com v-if no filho (e aqui o v-if é desnecessário). 2) :key="i" (índice) muda ao remover — use :key="item" com valor único estável.',
    },
  ],
}
