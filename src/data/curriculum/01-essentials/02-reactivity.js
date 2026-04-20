export default {
  id: 'reactivity',
  moduleId: 'essentials',
  title: 'Reactivity Fundamentals',
  icon: '⚡',
  xpReward: 30,
  docUrl: 'https://vuejs.org/guide/essentials/reactivity-fundamentals',

  theory: [
    {
      title: 'ref() — a caixinha mágica do Vue',
      body: `Imagina uma caixinha mágica. Você guarda um valor lá dentro, e o Vue fica de olho nela o tempo todo. Quando você muda o valor com .value, o Vue atualiza o HTML automaticamente. Essa caixinha é a ref().
No script acesse com .value. No template, o Vue desembrulha automático — sem .value.`,
      code: `<script setup>
import { ref } from 'vue'

const count = ref(0)
const name = ref('Vue')
const isVisible = ref(true)

function increment() {
  count.value++  // .value obrigatório no script
}
</script>

<template>
  <p>{{ count }}</p>   <!-- sem .value no template -->
  <p>{{ name }}</p>
  <button @click="increment">+1</button>
</template>`,
    },
    {
      title: 'reactive() — objetos reativos',
      body: `Para objetos com vários campos, existe o reactive(). Funciona como um objeto JavaScript normal, mas o Vue rastreia todas as mudanças automaticamente — sem precisar de .value em cada acesso.
A limitação: só funciona com objetos. Não dá pra usar com string, number ou boolean diretamente.`,
      code: `<script setup>
import { reactive } from 'vue'

const user = reactive({
  name: 'Ana',
  age: 25,
  level: 3,
})

function birthday() {
  user.age++  // sem .value — acesso direto
  user.level = Math.floor(user.age / 5)
}
</script>

<template>
  <p>{{ user.name }}, {{ user.age }} anos</p>
  <p>Nível {{ user.level }}</p>
  <button @click="birthday">Fazer aniversário 🎂</button>
</template>`,
    },
    {
      title: 'ref() vs reactive() — qual usar?',
      body: `Use ref() por padrão — o time do Vue recomenda. Funciona com qualquer tipo (string, number, objeto, array) e pode ser reatribuído inteiro com .value.
Use reactive() quando quiser agrupar campos relacionados num objeto sem .value, como os campos de um formulário.`,
      code: `<script setup>
import { ref, reactive } from 'vue'

// ref funciona com qualquer tipo
const count = ref(0)
const user = ref({ name: 'Ana', age: 25 })
count.value = 100               // reatribuição OK
user.value = { name: 'João' }  // OK

// reactive é elegante para objetos agrupados
const form = reactive({ email: '', password: '' })
form.email = 'test@vue.com'    // OK — mutação direta

// ❌ Não faça: reatribuição de reactive quebra a reatividade
// form = { email: 'novo' }   // perde a referência reativa
</script>`,
    },
    {
      title: 'Atualização do DOM é assíncrona — nextTick()',
      body: `O Vue não atualiza o DOM imediatamente quando você muda um valor — ele junta todas as mudanças e aplica de uma vez (mais eficiente, chamado de batching).
Se você precisar acessar o DOM logo após uma mudança de estado, use await nextTick() para esperar a atualização.`,
      code: `<script setup>
import { ref, nextTick } from 'vue'

const count = ref(0)
const countEl = ref(null)

async function increment() {
  count.value++

  // DOM ainda não foi atualizado aqui
  console.log(countEl.value?.textContent) // valor antigo

  await nextTick()

  // Agora sim — DOM está atualizado
  console.log(countEl.value?.textContent) // valor novo
}
</script>

<template>
  <p ref="countEl">{{ count }}</p>
  <button @click="increment">+1</button>
</template>`,
    },
    {
      title: 'Armadilhas comuns da reatividade',
      body: `Duas armadilhas que todo dev Vue já caiu: (1) reatribuir a variável de uma ref em vez de usar .value — você perde o link reativo; (2) desestruturar um reactive() — as propriedades desestruturadas perdem a reatividade.`,
      code: `<script setup>
import { ref, reactive } from 'vue'

const msg = ref('Olá')
msg.value = 'Oi'    // ✅ sempre use .value para mudar

const state = reactive({ count: 0, name: 'Vue' })
state.count++       // ✅ acesse direto, nunca desestruture
</script>`,
    },
  ],

  flashcards: [
    {
      id: 'react-fc-1',
      front: 'Como criar uma variável reativa com valor inicial 0?',
      back: 'Use `ref(0)` importado de "vue". Acesse e altere com `.value` no script.',
      code: `const count = ref(0)
count.value++`,
      lessonTitle: 'Reactivity Fundamentals',
    },
    {
      id: 'react-fc-2',
      front: 'Quando usar `.value` com ref e quando não usar?',
      back: 'No `<script>`: sempre use `.value`.\nNo `<template>`: não precisa — Vue desembrulha automaticamente.',
      code: `// script
count.value++

// template: {{ count }}  ← sem .value`,
      lessonTitle: 'Reactivity Fundamentals',
    },
    {
      id: 'react-fc-3',
      front: 'Qual a diferença entre ref() e reactive()?',
      back: '`ref()` serve para qualquer tipo (primitivos e objetos), acesso via `.value`.\n`reactive()` só para objetos, acesso direto às props.',
      code: `const n = ref(0)               // primitivo
const state = reactive({ x: 0 }) // objeto`,
      lessonTitle: 'Reactivity Fundamentals',
    },
    {
      id: 'react-fc-4',
      front: 'O que acontece se reatribuir a variável de uma ref?',
      back: 'Quebra o link reativo. Sempre mute pelo `.value`, nunca reatribua a variável.',
      code: `const msg = ref('Olá')
// ❌ msg = ref('Oi')
msg.value = 'Oi' // ✅`,
      lessonTitle: 'Reactivity Fundamentals',
    },
    {
      id: 'react-fc-5',
      front: 'Por que usar `nextTick()` após mudar um estado?',
      back: 'O Vue atualiza o DOM de forma assíncrona (batching). `await nextTick()` garante que o DOM já foi atualizado antes de você acessá-lo.',
      code: `count.value++
// DOM ainda antigo aqui

await nextTick()
// DOM atualizado agora ✅`,
      lessonTitle: 'Reactivity Fundamentals',
    },
  ],

  challenges: [
    {
      id: 'react-ch-1',
      type: 'fill-blank',
      title: 'Crie uma ref reativa',
      description: 'Declare uma variável reativa `score` com valor inicial 0 e incremente ela na função.',
      xpReward: 20,
      template: `<script setup>
import { ___ } from 'vue'

const score = ___(0)

function addPoints() {
  score.___ += 10
}
</script>`,
      blanks: ['ref', 'ref', 'value'],
      solution: `<script setup>
import { ref } from 'vue'

const score = ref(0)

function addPoints() {
  score.value += 10
}
</script>`,
      hint: 'Importe ref de "vue". No script, acesse com .value',
    },
    {
      id: 'react-ch-2',
      type: 'fill-blank',
      title: 'Contador com +1 e -1',
      description: 'Complete as funções de incremento e decremento e conecte os botões.',
      xpReward: 40,
      template: `<script setup>
import { ref } from 'vue'

const count = ___(0)

function increment() {
  count.___++
}

function decrement() {
  if (count.value > 0) count.value--
}
</script>

<template>
  <button ___="decrement">-</button>
  <span>{{ count }}</span>
  <button ___="increment">+</button>
</template>`,
      blanks: ['ref', 'value', '@click', '@click'],
      solution: `<script setup>
import { ref } from 'vue'

const count = ref(0)

function increment() {
  count.value++
}

function decrement() {
  if (count.value > 0) count.value--
}
</script>

<template>
  <button @click="decrement">-</button>
  <span>{{ count }}</span>
  <button @click="increment">+</button>
</template>`,
      hint: 'ref() para criar, .value para acessar no script, @click para conectar o evento.',
    },
    {
      id: 'react-ch-3',
      type: 'fill-blank',
      title: 'Objeto reativo com reactive()',
      description: 'Complete o código usando reactive() para criar um objeto de formulário reativo.',
      xpReward: 25,
      template: `<script setup>
import { ___ } from 'vue'

const form = ___({
  name: '',
  email: '',
  age: 0,
})

function reset() {
  form.name = ''
  form.email = ''
  form.age = 0
}
</script>`,
      blanks: ['reactive', 'reactive'],
      solution: `<script setup>
import { reactive } from 'vue'

const form = reactive({
  name: '',
  email: '',
  age: 0,
})

function reset() {
  form.name = ''
  form.email = ''
  form.age = 0
}
</script>`,
      hint: 'Use reactive() para objetos. Acesse as props diretamente, sem .value.',
    },
    {
      id: 'react-ch-4',
      type: 'fill-blank',
      title: 'Placar com reactive()',
      description: 'Complete usando reactive() para criar o placar. Acesse as propriedades direto, sem .value.',
      xpReward: 50,
      template: `<script setup>
import { ___ } from 'vue'

const placar = ___({
  jogador: 'Ana',
  pontos: 0,
})

function marcar() {
  placar.___ += 10
}

function reset() {
  placar.___ = 0
}
</script>

<template>
  <p>{{ placar.jogador }}: {{ placar.pontos }} pts</p>
  <button @click="marcar">+10</button>
  <button @click="reset">Reset</button>
</template>`,
      blanks: ['reactive', 'reactive', 'pontos', 'pontos'],
      solution: `<script setup>
import { reactive } from 'vue'

const placar = reactive({
  jogador: 'Ana',
  pontos: 0,
})

function marcar() {
  placar.pontos += 10
}

function reset() {
  placar.pontos = 0
}
</script>

<template>
  <p>{{ placar.jogador }}: {{ placar.pontos }} pts</p>
  <button @click="marcar">+10</button>
  <button @click="reset">Reset</button>
</template>`,
      hint: 'reactive() para objetos. Acesse as props direto: placar.pontos (sem .value).',
    },
    {
      id: 'react-ch-5',
      type: 'fix-bug',
      title: 'Bugs no .value',
      description: 'O código tem 3 erros. Encontre e corrija.',
      xpReward: 30,
      buggyCode: `<script setup>
import { ref } from 'vue'

const count = ref(0)
const isActive = ref(false)

function increment() {
  count = count.value + 1
}

function toggle() {
  isActive.value = !isActive
}

function reset() {
  count.value = 0
  isActive = false
}
</script>

<template>
  <p>{{ count }} — {{ isActive ? 'ativo' : 'inativo' }}</p>
  <button @click="increment">+1</button>
  <button @click="toggle">Toggle</button>
  <button @click="reset">Reset</button>
</template>`,
      solution: `<script setup>
import { ref } from 'vue'

const count = ref(0)
const isActive = ref(false)

function increment() {
  count.value = count.value + 1
}

function toggle() {
  isActive.value = !isActive.value
}

function reset() {
  count.value = 0
  isActive.value = false
}
</script>

<template>
  <p>{{ count }} — {{ isActive ? 'ativo' : 'inativo' }}</p>
  <button @click="increment">+1</button>
  <button @click="toggle">Toggle</button>
  <button @click="reset">Reset</button>
</template>`,
      explanation: '1) count = ... reatribui a variável — use count.value. 2) !isActive lê a ref em si — use !isActive.value. 3) isActive = false reatribui — use isActive.value = false.',
    },
  ],
}
