export default {
  id: 'v-model',
  moduleId: 'templates-directives',
  title: 'v-model',
  icon: '🪞',
  xpReward: 30,
  docUrl: 'https://vuejs.org/guide/essentials/forms',

  theory: [
    {
      title: 'v-model — o espelho',
      body: `O v-model é o "espelho" — o que você digita no input reflete na variável e, se a variável mudar, o input atualiza também. É um atalho para :value + @input juntos.`,
      code: `<script setup>
import { ref } from 'vue'
const texto = ref('')
</script>

<template>
  <!-- v-model é equivalente a: -->
  <input :value="texto" @input="texto = $event.target.value" />

  <!-- Forma simples com v-model: -->
  <input v-model="texto" />

  <p>Você digitou: "{{ texto }}"</p>
  <p>{{ texto.length }} caracteres</p>
</template>`,
    },
    {
      title: 'v-model em diferentes inputs',
      body: `O v-model se adapta ao tipo de elemento. Checkbox vira boolean, radio vira string, select vira o value da option selecionada.`,
      code: `<script setup>
import { ref } from 'vue'
const aceito = ref(false)        // checkbox → boolean
const selecionados = ref([])     // múltiplos checkboxes → array
const nivel = ref('')            // radio → string
const cidade = ref('')           // select → string
</script>

<template>
  <input type="checkbox" v-model="aceito" />

  <input type="checkbox" value="Vue" v-model="selecionados" />
  <input type="checkbox" value="React" v-model="selecionados" />

  <input type="radio" value="junior" v-model="nivel" />
  <input type="radio" value="senior" v-model="nivel" />

  <select v-model="cidade">
    <option value="sp">São Paulo</option>
    <option value="rj">Rio de Janeiro</option>
  </select>
</template>`,
    },
    {
      title: 'Modificadores — .lazy, .number, .trim',
      body: `Três modificadores que resolvem casos comuns:
.lazy: atualiza só ao sair do campo (não a cada tecla).
.number: converte a string para número automaticamente.
.trim: remove espaços extras das bordas.`,
      code: `<!-- .lazy: atualiza no evento 'change', não a cada tecla -->
<input v-model.lazy="usuario" />

<!-- .number: inputs sempre retornam string — .number converte -->
<input v-model.number="idade" type="number" />

<!-- .trim: remove espaços do início e fim -->
<input v-model.trim="nome" />

<!-- Combinando modificadores -->
<input v-model.trim.lazy="email" type="email" />`,
    },
  ],

  flashcards: [
    {
      id: 'vmodel-fc-1',
      front: 'O que faz o v-model?',
      back: 'Cria binding bidirecional — equivale a :value + @input. O input reflete a variável e vice-versa.',
      code: `<input v-model="texto" />`,
      lessonTitle: 'v-model',
    },
    {
      id: 'vmodel-fc-2',
      front: 'Como vincular múltiplos checkboxes a um array?',
      back: 'Aponte todos para o mesmo ref([]) com v-model. Cada checkbox precisa de um value.',
      code: `const selecionados = ref([])
// <input type="checkbox" value="A" v-model="selecionados" />`,
      lessonTitle: 'v-model',
    },
    {
      id: 'vmodel-fc-3',
      front: 'O que faz v-model.number?',
      back: 'Converte automaticamente a string do input para number. Sem isso, todo input retorna string.',
      code: `<input v-model.number="idade" type="number" />`,
      lessonTitle: 'v-model',
    },
    {
      id: 'vmodel-fc-4',
      front: 'Qual a diferença entre v-model e v-model.lazy?',
      back: 'v-model atualiza a cada tecla. v-model.lazy atualiza só ao sair do campo (evento change).',
      code: `<input v-model="ao_vivo" />
<input v-model.lazy="ao_sair" />`,
      lessonTitle: 'v-model',
    },
  ],

  challenges: [
    {
      id: 'vmodel-ch-1',
      type: 'fill-blank',
      title: 'Formulário de cadastro',
      description: 'Complete os v-model com os modificadores corretos e desabilite o botão quando inválido.',
      xpReward: 35,
      template: `<script setup>
import { ref, computed } from 'vue'
const nome = ref('')
const email = ref('')
const idade = ref(0)
const aceito = ref(false)

const valido = computed(() =>
  nome.value.length > 2 &&
  email.value.includes('@') &&
  idade.value >= 18 &&
  aceito.value
)
</script>

<template>
  <input ___.trim="nome" placeholder="Nome" />
  <input ___="email" type="email" placeholder="Email" />
  <input ___.number="idade" type="number" placeholder="Idade" />
  <label>
    <input type="checkbox" v-model="aceito" /> Aceito os termos
  </label>
  <button ___="!valido">Cadastrar</button>
  <p v-if="valido">✅ Formulário válido!</p>
</template>`,
      blanks: ['v-model', 'v-model', 'v-model', ':disabled'],
      solution: `<script setup>
import { ref, computed } from 'vue'
const nome = ref('')
const email = ref('')
const idade = ref(0)
const aceito = ref(false)

const valido = computed(() =>
  nome.value.length > 2 &&
  email.value.includes('@') &&
  idade.value >= 18 &&
  aceito.value
)
</script>

<template>
  <input v-model.trim="nome" placeholder="Nome" />
  <input v-model="email" type="email" placeholder="Email" />
  <input v-model.number="idade" type="number" placeholder="Idade" />
  <label>
    <input type="checkbox" v-model="aceito" /> Aceito os termos
  </label>
  <button :disabled="!valido">Cadastrar</button>
  <p v-if="valido">✅ Formulário válido!</p>
</template>`,
      hint: '.trim remove espaços, .number converte para number. :disabled desabilita o botão.',
    },
    {
      id: 'vmodel-ch-2',
      type: 'fix-bug',
      title: 'Bugs no v-model',
      description: 'O formulário tem 3 erros com v-model. Corrija.',
      xpReward: 35,
      buggyCode: `<script setup>
import { ref } from 'vue'
const aceito = ref(false)
const quantidade = ref(1)

function enviar() {
  console.log(quantidade.value + 1)
}
</script>

<template>
  <form @submit="enviar">
    <input type="checkbox" :checked="aceito" />
    <p>Aceito: {{ aceito }}</p>

    <input type="number" v-model="quantidade" />
    <p>Qty + 1 = {{ quantidade + 1 }}</p>

    <button type="submit">Enviar</button>
  </form>
</template>`,
      solution: `<script setup>
import { ref } from 'vue'
const aceito = ref(false)
const quantidade = ref(1)

function enviar() {
  console.log(quantidade.value + 1)
}
</script>

<template>
  <form @submit.prevent="enviar">
    <input type="checkbox" v-model="aceito" />
    <p>Aceito: {{ aceito }}</p>

    <input type="number" v-model.number="quantidade" />
    <p>Qty + 1 = {{ quantidade + 1 }}</p>

    <button type="submit">Enviar</button>
  </form>
</template>`,
      explanation: '1) :checked é unidirecional — use v-model no checkbox. 2) v-model.number converte para number. 3) @submit sem .prevent recarrega a página.',
    },
  ],
}
