export default {
  id: 'template-ref',
  moduleId: 'templates-directives',
  title: 'Template Ref',
  icon: '🪝',
  xpReward: 25,
  docUrl: 'https://vuejs.org/guide/essentials/template-refs',

  theory: [
    {
      title: 'Template Ref — o gancho',
      body: `O Template Ref é o "gancho" — ele te dá acesso direto a um elemento do DOM, como se fosse um document.getElementById() mas dentro do Vue. Útil quando você precisa controlar algo que só o browser sabe fazer: focar, medir tamanho, usar bibliotecas externas.`,
      code: `<script setup>
import { ref, onMounted } from 'vue'

const inputEl = ref(null)  // inicia como null

onMounted(() => {
  inputEl.value.focus()  // acessa o elemento real do DOM
})
</script>

<template>
  <!-- ref="inputEl" conecta o elemento à variável -->
  <input ref="inputEl" placeholder="Foco automático!" />
</template>`,
    },
    {
      title: 'Acessar só depois de montar',
      body: `A ref do elemento é null até o componente montar. Por isso, só acesse dentro de onMounted ou em handlers de eventos — nunca direto no topo do script.`,
      code: `<script setup>
import { ref, onMounted } from 'vue'

const canvasEl = ref(null)

// ❌ Ainda é null aqui
// console.log(canvasEl.value)

onMounted(() => {
  // ✅ Agora existe!
  const ctx = canvasEl.value.getContext('2d')
  ctx.fillStyle = '#42b883'
  ctx.fillRect(0, 0, 100, 100)
})
</script>

<template>
  <canvas ref="canvasEl" width="200" height="200" />
</template>`,
    },
    {
      title: 'ref em componentes',
      body: `Você pode usar ref em componentes filho também. Com <script setup>, o componente filho precisa expor explicitamente o que quer compartilhar usando defineExpose().`,
      code: `<!-- ComponenteFilho.vue -->
<script setup>
import { ref } from 'vue'
const count = ref(0)

defineExpose({ count, incrementar: () => count.value++ })
</script>

<!-- Pai -->
<script setup>
import { ref } from 'vue'
import Filho from './Filho.vue'

const filhoRef = ref(null)

function chamarFilho() {
  filhoRef.value.incrementar()
}
</script>

<template>
  <Filho ref="filhoRef" />
  <button @click="chamarFilho">Incrementar filho</button>
</template>`,
    },
  ],

  flashcards: [
    {
      id: 'tref-fc-1',
      front: 'O que é um Template Ref e para que serve?',
      back: 'Dá acesso direto a um elemento DOM. Como document.getElementById(), mas dentro do Vue. Use para focar, medir, ou integrar bibliotecas externas.',
      code: `const input = ref(null)
// <input ref="input" />
// input.value.focus()`,
      lessonTitle: 'Template Ref',
    },
    {
      id: 'tref-fc-2',
      front: 'Quando o valor de um template ref fica disponível?',
      back: 'Só após o componente montar (onMounted). Antes disso, o valor é null.',
      code: `onMounted(() => {
  inputEl.value.focus() // ✅
})`,
      lessonTitle: 'Template Ref',
    },
    {
      id: 'tref-fc-3',
      front: 'Como expor dados de um componente filho via ref?',
      back: 'Use defineExpose() no componente filho com <script setup>. Sem isso, o pai não consegue acessar nada.',
      code: `// Filho
defineExpose({ count, reset })`,
      lessonTitle: 'Template Ref',
    },
  ],

  challenges: [
    {
      id: 'tref-ch-1',
      type: 'fill-blank',
      title: 'Auto-foco com template ref',
      description: 'Complete: crie a ref do input e foque-o quando o botão "Editar" for clicado.',
      xpReward: 30,
      template: `<script setup>
import { ref, nextTick } from 'vue'

const editando = ref(false)
const inputEl = ___(null)

async function ativarEdicao() {
  editando.value = true
  await nextTick()
  inputEl.___.focus()
}
</script>

<template>
  <button v-if="!editando" @click="ativarEdicao">✏️ Editar</button>
  <input
    v-else
    ___="inputEl"
    placeholder="Editando..."
    @blur="editando = false"
  />
</template>`,
      blanks: ['ref', 'value', 'ref'],
      solution: `<script setup>
import { ref, nextTick } from 'vue'

const editando = ref(false)
const inputEl = ref(null)

async function ativarEdicao() {
  editando.value = true
  await nextTick()
  inputEl.value.focus()
}
</script>

<template>
  <button v-if="!editando" @click="ativarEdicao">✏️ Editar</button>
  <input
    v-else
    ref="inputEl"
    placeholder="Editando..."
    @blur="editando = false"
  />
</template>`,
      hint: 'ref(null) cria a ref do elemento. ref="inputEl" conecta no template. nextTick espera o DOM antes de .focus().',
    },
    {
      id: 'tref-ch-2',
      type: 'fix-bug',
      title: 'Bug no template ref',
      description: 'O código tenta acessar o elemento antes do componente montar. Corrija.',
      xpReward: 30,
      buggyCode: `<script setup>
import { ref } from 'vue'

const inputEl = ref(null)
inputEl.value.focus() // tenta focar antes de montar
</script>

<template>
  <input ref="inputEl" placeholder="Auto-foco" />
</template>`,
      solution: `<script setup>
import { ref, onMounted } from 'vue'

const inputEl = ref(null)

onMounted(() => {
  inputEl.value.focus()
})
</script>

<template>
  <input ref="inputEl" placeholder="Auto-foco" />
</template>`,
      explanation: 'inputEl.value é null até o componente montar. Sempre acesse template refs dentro de onMounted ou em handlers de eventos.',
    },
  ],
}
