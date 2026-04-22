export default {
  id: 'watch',
  moduleId: 'reactivity',
  title: 'watch()',
  icon: '👁️',
  xpReward: 35,
  docUrl: 'https://vuejs.org/api/reactivity-core#watch',

  theory: [
    {
      title: 'watch() — o vigia',
      body: `Pensa no watch() como um segurança. Você coloca ele para vigiar um dado específico e, quando aquele dado mudar, ele aciona uma função. Ele recebe o valor novo e o valor antigo.

Diferente do computed, o watch não retorna um valor — ele serve para disparar efeitos colaterais: salvar no localStorage, fazer uma requisição, disparar uma animação.`,
      code: `<script setup>
import { ref, watch } from 'vue'

const busca = ref('')

watch(busca, (novoValor, valorAntigo) => {
  console.log('Mudou de', valorAntigo, 'para', novoValor)
  // buscar na API, salvar histórico, etc.
})
</script>`,
    },
    {
      title: 'immediate e deep — configurações do vigia',
      body: `Por padrão, o watch espera uma mudança acontecer para disparar. Com immediate: true, ele roda na hora que o componente monta.

Com deep: true, ele vigia até as propriedades aninhadas de um objeto — sem isso, mudanças dentro de objetos não são detectadas.`,
      code: `<script setup>
import { ref, watch } from 'vue'

const configuracoes = ref({ tema: 'escuro', idioma: 'pt' })

watch(
  configuracoes,
  (novas) => {
    localStorage.setItem('config', JSON.stringify(novas))
  },
  {
    deep: true,      // detecta mudanças dentro do objeto
    immediate: true, // roda imediatamente ao montar
  }
)
</script>`,
    },
    {
      title: 'Vigiar múltiplas fontes',
      body: `Você pode passar um array de fontes para o watch vigiar várias coisas ao mesmo tempo. Os valores novos e antigos chegam em arrays correspondentes.`,
      code: `<script setup>
import { ref, watch } from 'vue'

const nome = ref('Ana')
const idade = ref(25)

watch([nome, idade], ([novoNome, novaIdade], [antigoNome, antigaIdade]) => {
  console.log(\`Nome: \${antigoNome} → \${novoNome}\`)
  console.log(\`Idade: \${antigaIdade} → \${novaIdade}\`)
})
</script>`,
    },
    {
      title: 'Parar o watch e cleanup',
      body: `O watch retorna uma função que, quando chamada, para de vigiar. Útil para cancelar watches condicionalmente.

Dentro do callback, você também pode registrar um cleanup — uma função que roda antes do próximo disparo, ideal para cancelar requisições em andamento.`,
      code: `<script setup>
import { ref, watch } from 'vue'

const ativo = ref(true)

const parar = watch(ativo, (valor) => {
  console.log('ativo:', valor)
})

// Chame parar() para cancelar o watch
function desativar() {
  parar()
}
</script>`,
    },
  ],

  flashcards: [
    {
      id: 'watch-fc-1',
      front: 'Para que serve o watch() e quando usar?',
      back: 'Para executar efeitos colaterais quando um dado muda: fetch, localStorage, animações. Não para calcular valores — use computed para isso.',
      code: `watch(valor, (novo, antigo) => { ... })`,
      lessonTitle: 'watch()',
    },
    {
      id: 'watch-fc-2',
      front: 'O que faz immediate: true no watch?',
      back: 'Faz o watch disparar imediatamente quando o componente monta, sem esperar uma mudança.',
      code: `watch(fonte, cb, { immediate: true })`,
      lessonTitle: 'watch()',
    },
    {
      id: 'watch-fc-3',
      front: 'Quando usar deep: true no watch?',
      back: 'Quando vigiar objetos — sem deep, mudanças em propriedades aninhadas não são detectadas.',
      code: `watch(objeto, cb, { deep: true })`,
      lessonTitle: 'watch()',
    },
    {
      id: 'watch-fc-4',
      front: 'Como parar um watch?',
      back: 'watch() retorna uma função. Chame essa função para cancelar o watch.',
      code: `const parar = watch(x, cb)
parar() // cancela`,
      lessonTitle: 'watch()',
    },
  ],

  challenges: [
    {
      id: 'watch-ch-1',
      type: 'fill-blank',
      title: 'Salvar no localStorage com watch',
      description: 'Complete o watch para salvar automaticamente o nome no localStorage toda vez que ele mudar.',
      xpReward: 30,
      template: `<script setup>
import { ref, ___ } from 'vue'

const nome = ref(localStorage.getItem('nome') || '')

___(nome, (novoNome) => {
  localStorage.setItem('___', novoNome)
})
</script>

<template>
  <input v-model="nome" placeholder="Seu nome..." />
  <p>Salvo: {{ nome }}</p>
</template>`,
      blanks: ['watch', 'watch', 'nome'],
      solution: `<script setup>
import { ref, watch } from 'vue'

const nome = ref(localStorage.getItem('nome') || '')

watch(nome, (novoNome) => {
  localStorage.setItem('nome', novoNome)
})
</script>

<template>
  <input v-model="nome" placeholder="Seu nome..." />
  <p>Salvo: {{ nome }}</p>
</template>`,
      hint: 'watch(fonte, callback) — o callback recebe o novo valor como primeiro argumento.',
    },
    {
      id: 'watch-ch-2',
      type: 'fill-blank',
      title: 'Watch com immediate',
      description: 'Complete o watch para carregar dados imediatamente ao montar e também quando o ID mudar.',
      xpReward: 35,
      template: `<script setup>
import { ref, watch } from 'vue'

const userId = ref(1)
const dados = ref(null)

watch(
  userId,
  async (id) => {
    const res = await fetch(\`https://jsonplaceholder.typicode.com/users/\${id}\`)
    dados.___ = await res.json()
  },
  { ___: true }
)
</script>

<template>
  <button @click="userId--" :disabled="userId <= 1">←</button>
  <span>User #{{ userId }}</span>
  <button @click="userId++">→</button>
  <p v-if="dados">{{ dados.name }}</p>
</template>`,
      blanks: ['value', 'immediate'],
      solution: `<script setup>
import { ref, watch } from 'vue'

const userId = ref(1)
const dados = ref(null)

watch(
  userId,
  async (id) => {
    const res = await fetch(\`https://jsonplaceholder.typicode.com/users/\${id}\`)
    dados.value = await res.json()
  },
  { immediate: true }
)
</script>

<template>
  <button @click="userId--" :disabled="userId <= 1">←</button>
  <span>User #{{ userId }}</span>
  <button @click="userId++">→</button>
  <p v-if="dados">{{ dados.name }}</p>
</template>`,
      hint: 'dados é uma ref — use dados.value. immediate: true faz o watch rodar ao montar.',
    },
    {
      id: 'watch-ch-3',
      type: 'fix-bug',
      title: 'Bugs no watch',
      description: 'O código tem 3 erros com watch. Encontre e corrija.',
      xpReward: 40,
      buggyCode: `<script setup>
import { ref, watch } from 'vue'

const config = ref({ tema: 'claro', fonte: 16 })
const ativo = ref(true)

watch(config.value, (nova) => {
  console.log('config mudou:', nova)
})

watch(ativo, (valor) => {
  console.log('ativo:', valor)
}, { immediate: false, deep: true })
</script>

<template>
  <button @click="config.tema = 'escuro'">Escuro</button>
  <button @click="ativo = !ativo">Toggle</button>
</template>`,
      solution: `<script setup>
import { ref, watch } from 'vue'

const config = ref({ tema: 'claro', fonte: 16 })
const ativo = ref(true)

watch(config, (nova) => {
  console.log('config mudou:', nova)
}, { deep: true })

watch(ativo, (valor) => {
  console.log('ativo:', valor)
})
</script>

<template>
  <button @click="config.value.tema = 'escuro'">Escuro</button>
  <button @click="ativo.value = !ativo.value">Toggle</button>
</template>`,
      explanation: '1) Passe a ref em si (config), não config.value — senão o watch perde a reatividade. 2) Objeto aninhado precisa de deep: true para detectar mudanças internas. 3) No template, alterações inline em refs precisam de .value.',
    },
  ],
}
