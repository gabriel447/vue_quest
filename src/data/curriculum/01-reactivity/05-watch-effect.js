export default {
  id: 'watch-effect',
  moduleId: 'reactivity',
  title: 'watchEffect()',
  icon: '🔍',
  xpReward: 30,
  docUrl: 'https://vuejs.org/api/reactivity-core#watcheffect',

  theory: [
    {
      title: 'watchEffect() — o vigia automático',
      body: `O watchEffect() é como um vigia que rastreia tudo automaticamente. Você não precisa dizer o que ele deve vigiar — ele descobre sozinho ao observar quais refs são acessadas dentro da função.

E ele roda imediatamente quando o componente monta — sem precisar de immediate: true.`,
      code: `<script setup>
import { ref, watchEffect } from 'vue'

const userId = ref(1)
const dados = ref(null)

watchEffect(async () => {
  // Acessa userId.value → Vue registra como dependência automaticamente
  const res = await fetch(\`/api/users/\${userId.value}\`)
  dados.value = await res.json()
})
</script>`,
    },
    {
      title: 'watchEffect vs watch',
      body: `watchEffect: rastreia dependências automaticamente, roda imediatamente, não recebe valor antigo.
watch: você escolhe o que vigiar, só roda na mudança, recebe valor novo e antigo.

Use watchEffect quando não precisar do valor anterior e quiser código mais conciso.`,
      code: `<script setup>
import { ref, watch, watchEffect } from 'vue'

const count = ref(0)

// watch: explícito, recebe novo e antigo
watch(count, (novo, antigo) => {
  console.log(antigo, '→', novo)
})

// watchEffect: automático, sem valor antigo
watchEffect(() => {
  console.log('count é:', count.value)
  // roda imediatamente e cada vez que count mudar
})
</script>`,
    },
    {
      title: 'Cleanup dentro do watchEffect',
      body: `Quando você faz uma requisição dentro do watchEffect, se o usuário trocar de estado antes da resposta chegar, você pode ter dados desatualizados. O cleanup resolve isso: cancela o que estava em andamento antes de rodar de novo.`,
      code: `<script setup>
import { ref, watchEffect } from 'vue'

const id = ref(1)

watchEffect((onCleanup) => {
  const controller = new AbortController()

  fetch(\`/api/items/\${id.value}\`, { signal: controller.signal })
    .then(r => r.json())
    .then(data => console.log(data))

  // Cancela a requisição anterior antes de fazer uma nova
  onCleanup(() => controller.abort())
})
</script>`,
    },
    {
      title: 'Parar o watchEffect',
      body: `Assim como o watch, o watchEffect retorna uma função para parar de rodar. Útil para desativar efeitos condicionalmente.`,
      code: `<script setup>
import { ref, watchEffect } from 'vue'

const ativo = ref(true)

const parar = watchEffect(() => {
  if (ativo.value) {
    console.log('Efeito rodando...')
  }
})

function desativar() {
  parar() // para o watchEffect
}
</script>`,
    },
  ],

  flashcards: [
    {
      id: 'weffect-fc-1',
      front: 'O que é watchEffect e como ele rastreia dependências?',
      back: 'É um vigia automático — rastreia todas as refs acessadas dentro da função e roda quando qualquer uma delas muda. Roda imediatamente.',
      code: `watchEffect(() => {
  console.log(count.value) // rastreado automaticamente
})`,
      lessonTitle: 'watchEffect()',
    },
    {
      id: 'weffect-fc-2',
      front: 'Qual a principal diferença entre watchEffect e watch?',
      back: 'watchEffect: automático, roda imediatamente, sem valor antigo.\nwatch: explícito, só na mudança, recebe novo e antigo.',
      code: `// watch: (novo, antigo)
// watchEffect: só novo`,
      lessonTitle: 'watchEffect()',
    },
    {
      id: 'weffect-fc-3',
      front: 'Quando usar watchEffect ao invés de watch?',
      back: 'Quando não precisar do valor anterior e quiser rastreamento automático de dependências.',
      code: `watchEffect(() => {
  buscar(id.value) // id rastreado automaticamente
})`,
      lessonTitle: 'watchEffect()',
    },
    {
      id: 'weffect-fc-4',
      front: 'Como cancelar operações anteriores no watchEffect?',
      back: 'Use o parâmetro onCleanup — a função registrada roda antes de cada novo disparo.',
      code: `watchEffect((onCleanup) => {
  const ctrl = new AbortController()
  fetch(url, { signal: ctrl.signal })
  onCleanup(() => ctrl.abort())
})`,
      lessonTitle: 'watchEffect()',
    },
  ],

  challenges: [
    {
      id: 'weffect-ch-1',
      type: 'fill-blank',
      title: 'Log automático com watchEffect',
      description: 'Complete o watchEffect para logar automaticamente sempre que nome ou pontos mudarem.',
      xpReward: 25,
      template: `<script setup>
import { ref, ___ } from 'vue'

const nome = ref('Ana')
const pontos = ref(0)

___(()  => {
  console.log(\`\${nome.___}: \${pontos.value} pts\`)
})
</script>

<template>
  <input v-model="nome" placeholder="Nome" />
  <button @click="pontos++">+1 ponto</button>
  <p>{{ nome }}: {{ pontos }} pts</p>
</template>`,
      blanks: ['watchEffect', 'watchEffect', 'value'],
      solution: `<script setup>
import { ref, watchEffect } from 'vue'

const nome = ref('Ana')
const pontos = ref(0)

watchEffect(() => {
  console.log(\`\${nome.value}: \${pontos.value} pts\`)
})
</script>

<template>
  <input v-model="nome" placeholder="Nome" />
  <button @click="pontos++">+1 ponto</button>
  <p>{{ nome }}: {{ pontos }} pts</p>
</template>`,
      hint: 'watchEffect rastreia automaticamente todas as refs acessadas dentro da função.',
    },
    {
      id: 'weffect-ch-2',
      type: 'fill-blank',
      title: 'Busca automática com watchEffect',
      description: 'Complete o watchEffect para buscar usuários automaticamente quando o ID mudar.',
      xpReward: 35,
      template: `<script setup>
import { ref, watchEffect } from 'vue'

const userId = ref(1)
const usuario = ref(null)

___(() => {
  fetch(\`https://jsonplaceholder.typicode.com/users/\${userId.___}\`)
    .then(r => r.json())
    .then(data => { usuario.___ = data })
})
</script>

<template>
  <button @click="userId--" :disabled="userId <= 1">←</button>
  <span>User #{{ userId }}</span>
  <button @click="userId++" :disabled="userId >= 10">→</button>
  <p v-if="usuario">{{ usuario.name }} — {{ usuario.email }}</p>
</template>`,
      blanks: ['watchEffect', 'value', 'value'],
      solution: `<script setup>
import { ref, watchEffect } from 'vue'

const userId = ref(1)
const usuario = ref(null)

watchEffect(() => {
  fetch(\`https://jsonplaceholder.typicode.com/users/\${userId.value}\`)
    .then(r => r.json())
    .then(data => { usuario.value = data })
})
</script>

<template>
  <button @click="userId--" :disabled="userId <= 1">←</button>
  <span>User #{{ userId }}</span>
  <button @click="userId++" :disabled="userId >= 10">→</button>
  <p v-if="usuario">{{ usuario.name }} — {{ usuario.email }}</p>
</template>`,
      hint: 'watchEffect roda imediatamente e novamente quando userId.value muda.',
    },
    {
      id: 'weffect-ch-3',
      type: 'fix-bug',
      title: 'Bugs no watchEffect',
      description: 'O código tem 2 erros com watchEffect. Encontre e corrija.',
      xpReward: 35,
      buggyCode: `<script setup>
import { ref, watchEffect } from 'vue'

const tema = ref('claro')
const fonte = ref(16)

watchEffect(tema, fonte, () => {
  document.body.className = tema.value
  document.body.style.fontSize = fonte.value + 'px'
})
</script>

<template>
  <button @click="tema = tema === 'claro' ? 'escuro' : 'claro'">
    Toggle tema
  </button>
  <input type="range" v-model.number="fonte" min="12" max="24" />
</template>`,
      solution: `<script setup>
import { ref, watchEffect } from 'vue'

const tema = ref('claro')
const fonte = ref(16)

watchEffect(() => {
  document.body.className = tema.value
  document.body.style.fontSize = fonte.value + 'px'
})
</script>

<template>
  <button @click="tema.value = tema.value === 'claro' ? 'escuro' : 'claro'">
    Toggle tema
  </button>
  <input type="range" v-model.number="fonte" min="12" max="24" />
</template>`,
      explanation: '1) watchEffect recebe apenas uma função — não liste as fontes separadamente como no watch. 2) No template, alterações inline em refs precisam de .value.',
    },
  ],
}
