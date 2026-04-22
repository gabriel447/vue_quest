export default {
  id: 'next-tick',
  moduleId: 'reactivity',
  title: 'nextTick()',
  icon: '⏱️',
  xpReward: 25,
  docUrl: 'https://vuejs.org/api/general#nexttick',

  theory: [
    {
      title: 'nextTick() — espera o Vue terminar de desenhar',
      body: `O Vue não atualiza o DOM imediatamente quando você muda um estado — ele junta todas as mudanças e aplica de uma vez (mais eficiente). Chamamos isso de "batching".

O nextTick() é o "espera um pouco" — ele garante que o Vue terminou de atualizar o HTML antes de você tentar ler ou manipular o DOM.`,
      code: `<script setup>
import { ref, nextTick } from 'vue'

const count = ref(0)

async function incrementar() {
  count.value++

  // DOM ainda NÃO foi atualizado aqui
  console.log(document.querySelector('p').textContent) // valor antigo

  await nextTick()

  // Agora sim — DOM está atualizado
  console.log(document.querySelector('p').textContent) // valor novo
}
</script>`,
    },
    {
      title: 'Caso de uso: focar input após renderizar',
      body: `O caso mais comum do nextTick: você adiciona um elemento ao DOM condicionalmente e precisa focar nele imediatamente. Sem nextTick, o elemento ainda não existe quando você tenta focá-lo.`,
      code: `<script setup>
import { ref, nextTick } from 'vue'

const editando = ref(false)
const inputEl = ref(null)

async function ativarEdicao() {
  editando.value = true

  await nextTick() // espera o input aparecer no DOM

  inputEl.value?.focus() // agora o input existe!
}
</script>

<template>
  <button v-if="!editando" @click="ativarEdicao">Editar</button>
  <input v-else ref="inputEl" placeholder="Digite aqui..." />
</template>`,
    },
    {
      title: 'nextTick com callback',
      body: `Você pode usar nextTick de duas formas: como Promise com await (mais comum) ou passando um callback. As duas funcionam igual — a Promise é mais limpa com async/await.`,
      code: `<script setup>
import { ref, nextTick } from 'vue'

const msg = ref('')

// Forma 1: async/await (recomendado)
async function atualizar() {
  msg.value = 'Novo valor'
  await nextTick()
  console.log('DOM atualizado!')
}

// Forma 2: callback
function atualizarComCallback() {
  msg.value = 'Novo valor'
  nextTick(() => {
    console.log('DOM atualizado!')
  })
}
</script>`,
    },
  ],

  flashcards: [
    {
      id: 'nexttick-fc-1',
      front: 'Por que o DOM não atualiza imediatamente no Vue?',
      back: 'O Vue usa "batching" — agrupa todas as mudanças de estado e aplica de uma vez para ser mais eficiente.',
      code: `count.value++
// DOM ainda antigo aqui
await nextTick()
// DOM atualizado aqui`,
      lessonTitle: 'nextTick()',
    },
    {
      id: 'nexttick-fc-2',
      front: 'Quando usar nextTick()?',
      back: 'Quando precisar ler ou manipular o DOM logo após uma mudança de estado — por exemplo, focar um input que acabou de aparecer.',
      code: `editando.value = true
await nextTick()
inputEl.value?.focus()`,
      lessonTitle: 'nextTick()',
    },
    {
      id: 'nexttick-fc-3',
      front: 'Quais são as formas de usar nextTick?',
      back: 'Como Promise com await ou com callback. A forma com await é mais limpa.',
      code: `await nextTick()        // Promise
nextTick(() => { ... }) // callback`,
      lessonTitle: 'nextTick()',
    },
  ],

  challenges: [
    {
      id: 'nexttick-ch-1',
      type: 'fill-blank',
      title: 'Focar input com nextTick',
      description: 'Complete o código para focar o input automaticamente depois que ele aparecer no DOM.',
      xpReward: 30,
      template: `<script setup>
import { ref, ___ } from 'vue'

const visivel = ref(false)
const inputEl = ref(null)

async function mostrar() {
  visivel.value = true
  await ___()
  inputEl.value?.focus()
}
</script>

<template>
  <button v-if="!visivel" @click="mostrar">Mostrar input</button>
  <input
    v-else
    ___="inputEl"
    placeholder="Foco automático!"
  />
</template>`,
      blanks: ['nextTick', 'nextTick', 'ref'],
      solution: `<script setup>
import { ref, nextTick } from 'vue'

const visivel = ref(false)
const inputEl = ref(null)

async function mostrar() {
  visivel.value = true
  await nextTick()
  inputEl.value?.focus()
}
</script>

<template>
  <button v-if="!visivel" @click="mostrar">Mostrar input</button>
  <input
    v-else
    ref="inputEl"
    placeholder="Foco automático!"
  />
</template>`,
      hint: 'await nextTick() antes de chamar .focus() garante que o input já existe no DOM.',
    },
    {
      id: 'nexttick-ch-2',
      type: 'fix-bug',
      title: 'Bug com DOM não atualizado',
      description: 'O código tenta ler o DOM antes do Vue atualizá-lo. Corrija usando nextTick.',
      xpReward: 35,
      buggyCode: `<script setup>
import { ref } from 'vue'

const mensagem = ref('Olá!')
const paragrafo = ref(null)

function atualizar() {
  mensagem.value = 'Vue é incrível!'
  console.log(paragrafo.value.textContent) // lê antes de atualizar
}
</script>

<template>
  <p ref="paragrafo">{{ mensagem }}</p>
  <button @click="atualizar">Atualizar</button>
</template>`,
      solution: `<script setup>
import { ref, nextTick } from 'vue'

const mensagem = ref('Olá!')
const paragrafo = ref(null)

async function atualizar() {
  mensagem.value = 'Vue é incrível!'
  await nextTick()
  console.log(paragrafo.value.textContent) // lê após atualizar
}
</script>

<template>
  <p ref="paragrafo">{{ mensagem }}</p>
  <button @click="atualizar">Atualizar</button>
</template>`,
      explanation: '1) nextTick não estava importado. 2) A função precisa ser async. 3) await nextTick() deve vir antes de ler o DOM.',
    },
  ],
}
