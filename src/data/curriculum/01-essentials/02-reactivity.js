export default {
  id: 'reactivity',
  moduleId: 'essentials',
  title: 'Reactivity Fundamentals',
  icon: '⚡',
  xpReward: 30,
  docUrl: 'https://vuejs.org/guide/essentials/reactivity-fundamentals',

  theory: [
    {
      title: 'ref() — a base da reatividade',
      body: `ref() cria um container reativo para qualquer valor. Quando o valor muda, Vue atualiza o DOM automaticamente.
Dentro do <script>, acesse e altere com .value. No template, o .value é desembrulhado automaticamente.`,
      code: `<script setup>
import { ref } from 'vue'

const count = ref(0)
const name = ref('Vue')
const isVisible = ref(true)

function increment() {
  count.value++        // .value obrigatório no script
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
      body: `reactive() torna um objeto inteiro reativo. Acesse as propriedades diretamente, sem .value.
Limitação importante: só funciona com objetos (não com primitivos como string, number, boolean).`,
      code: `<script setup>
import { reactive } from 'vue'

const user = reactive({
  name: 'Ana',
  age: 25,
  level: 3,
})

// Acesso e mutação diretos — sem .value
function birthday() {
  user.age++
  user.level = Math.floor(user.age / 5)
}
</script>

<template>
  <p>{{ user.name }}, {{ user.age }} anos</p>
  <p>Nível {{ user.level }}</p>
  <button @click="birthday">Fazer aniversário</button>
</template>`,
    },
    {
      title: 'ref() vs reactive() — quando usar cada um',
      body: `ref() funciona com qualquer tipo e pode ser reatribuído. É a escolha padrão do time Vue.
reactive() é elegante para objetos agrupados, mas perde reatividade se você reatribuir o objeto inteiro.`,
      code: `import { ref, reactive } from 'vue'

// ✅ ref() — versátil, funciona com tudo
const count = ref(0)
const user = ref({ name: 'Ana', age: 25 })
count.value = 100               // reatribuição OK
user.value = { name: 'João' }  // OK

// ⚠️ reactive() — só objetos, não reatribua
const form = reactive({ email: '', password: '' })
form.email = 'test@vue.com'    // OK — mutação
// form = { email: 'x' }      // ❌ perde reatividade!

// Regra prática: use ref() por padrão`,
    },
    {
      title: 'Atualização do DOM é assíncrona — nextTick()',
      body: `Vue faz batching de atualizações: o DOM não muda imediatamente após você alterar o estado.
Use nextTick() quando precisar acessar o DOM atualizado logo após uma mudança de estado.`,
      code: `<script setup>
import { ref, nextTick } from 'vue'

const count = ref(0)
const countEl = ref(null)

async function increment() {
  count.value++
  // DOM ainda não atualizou aqui!
  console.log(countEl.value?.textContent) // valor antigo

  await nextTick()
  // Agora o DOM está atualizado
  console.log(countEl.value?.textContent) // valor novo
}
</script>

<template>
  <p ref="countEl">{{ count }}</p>
  <button @click="increment">+1</button>
</template>`,
    },
    {
      title: 'Pitfalls da reatividade — armadilhas comuns',
      body: `Cuidado com situações que quebram a reatividade: destructuring de reactive e reatribuição de ref.`,
      code: `import { ref, reactive } from 'vue'

const state = reactive({ count: 0, name: 'Vue' })

// ❌ Desestruturação quebra reatividade do reactive()
const { count } = state  // count não é mais reativo!

// ✅ Use ref ou toRef para desestruturar com reatividade
import { toRef } from 'vue'
const count = toRef(state, 'count')  // continua reativo

// ✅ ref() pode ser reatribuído sem perder reatividade
const msg = ref('olá')
msg.value = 'novo valor'  // OK — ainda reativo`,
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

// template
// <p>{{ count }}</p>`,
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

// ❌ quebra reatividade
msg = ref('Oi')

// ✅ correto
msg.value = 'Oi'`,
      lessonTitle: 'Reactivity Fundamentals',
    },
    {
      id: 'react-fc-5',
      front: 'Como reactive() reage a mudanças aninhadas?',
      back: 'Mudanças em propriedades aninhadas **também são reativas** — Vue rastreia toda a árvore do objeto.',
      code: `const user = reactive({ address: { city: 'SP' } })
user.address.city = 'RJ' // ✅ Vue detecta`,
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
      title: 'Preferências com reactive()',
      description: 'Complete o objeto reactive e os bindings do template para as preferências do usuário.',
      xpReward: 50,
      template: `<script setup>
import { ___ } from 'vue'

const prefs = ___({
  darkMode: false,
  fontSize: 16,
  language: 'pt-BR',
})
</script>

<template>
  <div>
    <button @click="prefs.darkMode = !prefs.darkMode">
      {{ prefs.darkMode ? '🌙 Dark' : '☀️ Light' }}
    </button>

    <input
      type="range"
      min="12"
      max="24"
      ___="prefs.fontSize"
    />
    <span>{{ prefs.fontSize }}px</span>

    <pre>{{ prefs }}</pre>
  </div>
</template>`,
      blanks: ['reactive', 'reactive', 'v-model.number'],
      solution: `<script setup>
import { reactive } from 'vue'

const prefs = reactive({
  darkMode: false,
  fontSize: 16,
  language: 'pt-BR',
})
</script>

<template>
  <div>
    <button @click="prefs.darkMode = !prefs.darkMode">
      {{ prefs.darkMode ? '🌙 Dark' : '☀️ Light' }}
    </button>

    <input
      type="range"
      min="12"
      max="24"
      v-model.number="prefs.fontSize"
    />
    <span>{{ prefs.fontSize }}px</span>

    <pre>{{ prefs }}</pre>
  </div>
</template>`,
      hint: 'reactive() aceita um objeto. Acesse as props diretamente: prefs.darkMode (sem .value).',
    },
    {
      id: 'react-ch-5',
      type: 'fix-bug',
      title: 'Bug no .value',
      description: 'O código abaixo tem um bug sutil — o estado muda mas o template não atualiza. Encontre e corrija.',
      xpReward: 30,
      buggyCode: `<script setup>
import { ref } from 'vue'

const message = ref('Olá Vue!')

function shout() {
  message = message.toUpperCase()
}

function reset() {
  message = ref('Olá Vue!')
}
</script>

<template>
  <p>{{ message }}</p>
  <button @click="shout">GRITAR</button>
  <button @click="reset">Reset</button>
</template>`,
      solution: `<script setup>
import { ref } from 'vue'

const message = ref('Olá Vue!')

function shout() {
  message.value = message.value.toUpperCase()
}

function reset() {
  message.value = 'Olá Vue!'
}
</script>

<template>
  <p>{{ message }}</p>
  <button @click="shout">GRITAR</button>
  <button @click="reset">Reset</button>
</template>`,
      explanation: 'Dentro do script, refs precisam de .value para leitura E escrita. Reatribuir a variável (message = ...) quebra o link reativo.',
    },
  ],
}
