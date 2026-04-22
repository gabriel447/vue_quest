export default {
  id: 'ref',
  moduleId: 'reactivity',
  title: 'ref()',
  icon: '📦',
  xpReward: 30,
  docUrl: 'https://vuejs.org/api/reactivity-core#ref',

  theory: [
    {
      title: 'ref() — o contentor mágico',
      body: `Pensa no ref() como uma caixinha. Você guarda qualquer valor dentro dela — número, string, booleano, objeto, array — e o Vue fica de olho nessa caixa o tempo todo.

Quando o valor muda, o Vue atualiza o HTML automaticamente. Sem reload, sem manipulação manual do DOM.`,
      code: `<script setup>
import { ref } from 'vue'

const nome = ref('Vue')
const pontos = ref(0)
const ativo = ref(true)
</script>`,
    },
    {
      title: '.value — como acessar o conteúdo da caixa',
      body: `No script, você sempre precisa usar .value para ler ou alterar o que está dentro da ref. É como abrir a caixinha antes de usar o que está lá dentro.

No template (HTML), o Vue abre a caixinha automaticamente — você usa direto, sem .value.`,
      code: `<script setup>
import { ref } from 'vue'

const count = ref(0)

function incrementar() {
  count.value++        // ← .value obrigatório no script
}
</script>

<template>
  <p>{{ count }}</p>   <!-- ← sem .value no template -->
  <button @click="incrementar">+1</button>
</template>`,
    },
    {
      title: 'ref() com objetos e arrays',
      body: `A ref() funciona com qualquer tipo de valor, inclusive objetos e arrays. Quando você usa um objeto dentro de ref(), o Vue torna todo ele reativo automaticamente.

Para substituir o valor inteiro de uma ref, basta reatribuir o .value.`,
      code: `<script setup>
import { ref } from 'vue'

const usuario = ref({ nome: 'Ana', nivel: 1 })
const itens = ref(['Vue', 'React', 'Svelte'])

// Acessar propriedade
usuario.value.nome = 'Bruno'

// Substituir o objeto inteiro
usuario.value = { nome: 'Carol', nivel: 5 }

// Adicionar ao array
itens.value.push('Angular')
</script>`,
    },
    {
      title: 'Armadilha: nunca reatribua a variável',
      body: `A armadilha mais comum com ref(): reatribuir a variável em vez de usar .value. Quando você faz isso, você quebra o vínculo reativo — o Vue para de rastrear o valor.

Sempre altere DENTRO da caixinha (.value), nunca troque a caixinha por outra.`,
      code: `<script setup>
import { ref } from 'vue'

const count = ref(0)

// ❌ Errado — quebra a reatividade
// count = 5
// count = ref(5)

// ✅ Correto — altera dentro da caixinha
count.value = 5
count.value++
</script>`,
    },
  ],

  flashcards: [
    {
      id: 'ref-fc-1',
      front: 'O que é ref() e para que serve?',
      back: 'É um "contentor" reativo. Guarda qualquer valor e o Vue atualiza o HTML automaticamente quando ele muda.',
      code: `const count = ref(0)`,
      lessonTitle: 'ref()',
    },
    {
      id: 'ref-fc-2',
      front: 'Quando usar .value com ref()?',
      back: 'Sempre no script. No template o Vue desembrulha automaticamente.',
      code: `// script: count.value++
// template: {{ count }}`,
      lessonTitle: 'ref()',
    },
    {
      id: 'ref-fc-3',
      front: 'O que acontece se você reatribuir a variável de uma ref?',
      back: 'Quebra a reatividade. O Vue para de rastrear. Sempre use .value para alterar.',
      code: `// ❌ count = 5
// ✅ count.value = 5`,
      lessonTitle: 'ref()',
    },
    {
      id: 'ref-fc-4',
      front: 'ref() funciona com objetos e arrays?',
      back: 'Sim. O Vue torna o objeto/array inteiro reativo. Para substituir tudo, atribua ao .value.',
      code: `const user = ref({ name: 'Ana' })
user.value.name = 'Bruno'
user.value = { name: 'Carol' }`,
      lessonTitle: 'ref()',
    },
  ],

  challenges: [
    {
      id: 'ref-ch-1',
      type: 'fill-blank',
      title: 'Crie sua primeira ref',
      description: 'Declare uma ref chamada `mensagem` com o valor inicial "Olá, Vue!" e exiba ela no template.',
      xpReward: 20,
      template: `<script setup>
import { ___ } from 'vue'

const mensagem = ___('Olá, Vue!')
</script>

<template>
  <p>{{ ___ }}</p>
</template>`,
      blanks: ['ref', 'ref', 'mensagem'],
      solution: `<script setup>
import { ref } from 'vue'

const mensagem = ref('Olá, Vue!')
</script>

<template>
  <p>{{ mensagem }}</p>
</template>`,
      hint: 'Importe ref de "vue", crie a ref com ref(valor) e use o nome da variável no template.',
    },
    {
      id: 'ref-ch-2',
      type: 'fill-blank',
      title: 'Contador com .value',
      description: 'Complete as funções usando .value para incrementar e resetar o contador.',
      xpReward: 30,
      template: `<script setup>
import { ref } from 'vue'

const count = ref(0)

function incrementar() {
  count.___++
}

function resetar() {
  count.___ = 0
}
</script>

<template>
  <h2>{{ count }}</h2>
  <button @click="incrementar">+1</button>
  <button @click="resetar">Reset</button>
</template>`,
      blanks: ['value', 'value'],
      solution: `<script setup>
import { ref } from 'vue'

const count = ref(0)

function incrementar() {
  count.value++
}

function resetar() {
  count.value = 0
}
</script>

<template>
  <h2>{{ count }}</h2>
  <button @click="incrementar">+1</button>
  <button @click="resetar">Reset</button>
</template>`,
      hint: 'No script, acesse o valor da ref sempre com .value.',
    },
    {
      id: 'ref-ch-4',
      type: 'fill-blank',
      title: 'Toggle com ref booleana',
      description: 'Complete o código para alternar a visibilidade do painel ao clicar no botão.',
      xpReward: 25,
      template: `<script setup>
import { ref } from 'vue'

const visivel = ___(false)

function alternar() {
  visivel.___ = !visivel.value
}
</script>

<template>
  <button @click="alternar">
    {{ visivel ? 'Ocultar' : 'Mostrar' }}
  </button>
  <div v-if="visivel">
    👋 Painel visível!
  </div>
</template>`,
      blanks: ['ref', 'value'],
      solution: `<script setup>
import { ref } from 'vue'

const visivel = ref(false)

function alternar() {
  visivel.value = !visivel.value
}
</script>

<template>
  <button @click="alternar">
    {{ visivel ? 'Ocultar' : 'Mostrar' }}
  </button>
  <div v-if="visivel">
    👋 Painel visível!
  </div>
</template>`,
      hint: 'ref(false) cria um booleano reativo. Use .value para inverter com !visivel.value.',
    },
    {
      id: 'ref-ch-3',
      type: 'fix-bug',
      title: 'Corrija os bugs da ref',
      description: 'O código tem 3 erros com ref. Encontre e corrija.',
      xpReward: 40,
      buggyCode: `<script setup>
import { ref } from 'vue'

const score = ref(100)
const nome = ref('Ana')

function dobrar() {
  score = score.value * 2
}

function renomear() {
  nome = ref('Bruno')
}

function resetar() {
  score.value = 0
  nome.value = ''
}
</script>

<template>
  <p>{{ score }} — {{ nome }}</p>
  <button @click="dobrar">Dobrar</button>
  <button @click="renomear">Renomear</button>
  <button @click="resetar">Resetar</button>
</template>`,
      solution: `<script setup>
import { ref } from 'vue'

const score = ref(100)
const nome = ref('Ana')

function dobrar() {
  score.value = score.value * 2
}

function renomear() {
  nome.value = 'Bruno'
}

function resetar() {
  score.value = 0
  nome.value = ''
}
</script>

<template>
  <p>{{ score }} — {{ nome }}</p>
  <button @click="dobrar">Dobrar</button>
  <button @click="renomear">Renomear</button>
  <button @click="resetar">Resetar</button>
</template>`,
      explanation: '1) score = ... reatribui a variável — use score.value =. 2) nome = ref(...) cria uma nova ref em vez de alterar — use nome.value =. Ambos quebram a reatividade.',
    },
  ],
}
