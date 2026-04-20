export default {
  id: 'custom-events',
  moduleId: 'components',
  title: 'Custom Events',
  icon: '📡',
  xpReward: 35,
  docUrl: 'https://vuejs.org/guide/components/events',

  theory: [
    {
      title: 'defineEmits — declarando eventos',
      body: `Todo evento que um componente filho pode emitir deve ser declarado com defineEmits(). Isso serve de documentação e permite que o Vue valide os eventos. Use emit() para disparar o evento, com um payload opcional como segundo argumento.`,
      code: `<!-- Filho.vue -->
<script setup>
const emit = defineEmits(['adicionar', 'remover', 'resetar'])

function adicionar() {
  emit('adicionar', { id: Date.now(), nome: 'Item' })
}

function remover(id) {
  emit('remover', id)
}
</script>

<template>
  <button @click="adicionar">Adicionar</button>
  <button @click="remover(1)">Remover</button>
  <button @click="emit('resetar')">Resetar</button>
</template>`,
    },
    {
      title: 'Escutando eventos no pai',
      body: `O pai escuta eventos com @nome-do-evento. O handler recebe o payload como argumento. Você pode usar uma função separada ou inline com $event para acessar o payload.`,
      code: `<!-- Pai.vue -->
<script setup>
import { ref } from 'vue'
import Filho from './Filho.vue'

const items = ref([])
const total = ref(0)

function onAdicionar(item) {
  items.value.push(item)
}
</script>

<template>
  <!-- Handler como função -->
  <Filho @adicionar="onAdicionar" />

  <!-- Inline com $event -->
  <Filho @remover="items.value = items.value.filter(i => i.id !== $event)" />

  <!-- Sem payload -->
  <Filho @resetar="items.value = []" />
</template>`,
    },
    {
      title: 'Nomenclatura — camelCase no JS, kebab-case no template',
      body: `Declare e emita eventos em camelCase no JavaScript. No template do pai, escute em kebab-case — o Vue faz a conversão automaticamente. Isso segue a convenção HTML de atributos em lowercase.`,
      code: `<!-- Filho emite em camelCase -->
<script setup>
const emit = defineEmits(['itemAdicionado', 'formSubmetido'])

function salvar() {
  emit('itemAdicionado', novoItem)
  emit('formSubmetido', formData)
}
</script>

<!-- Pai escuta em kebab-case -->
<template>
  <Filho
    @item-adicionado="onItemAdicionado"
    @form-submetido="onFormSubmetido"
  />

  <!-- camelCase também funciona em SFCs: -->
  <Filho
    @itemAdicionado="onItemAdicionado"
  />
</template>`,
    },
    {
      title: 'Validação de eventos',
      body: `Você pode validar o payload de um evento passando um objeto em vez de array para defineEmits(). A função de validação recebe o payload e deve retornar true (válido) ou false (inválido). Em dev, Vue avisa no console se a validação falhar.`,
      code: `<script setup>
const emit = defineEmits({
  // Sem validação
  click: null,

  // Com validação
  submit: (payload) => {
    if (!payload.email || !payload.senha) {
      console.warn('submit precisa de email e senha')
      return false
    }
    return true
  },

  atualizar: (id, valor) => {
    return typeof id === 'number' && valor !== undefined
  },
})
</script>`,
    },
    {
      title: 'Padrão emit + watch para comunicação bidirecional',
      body: `Um padrão comum: o filho recebe dados via prop e comunica mudanças via emit. O pai controla o estado e o filho apenas notifica. Isso mantém o fluxo unidirecional e o estado previsível.`,
      code: `<!-- Filho: recebe via prop, emite mudança -->
<script setup>
const props = defineProps({ valor: Number })
const emit = defineEmits(['atualizar'])

function incrementar() {
  emit('atualizar', props.valor + 1)
}
function decrementar() {
  emit('atualizar', props.valor - 1)
}
</script>

<template>
  <button @click="decrementar">-</button>
  <span>{{ props.valor }}</span>
  <button @click="incrementar">+</button>
</template>

<!-- Pai: mantém o estado -->
<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>
<template>
  <Contador :valor="count" @atualizar="count = $event" />
</template>`,
    },
  ],

  flashcards: [
    {
      id: 'ev-in-fc-1',
      front: 'Como declarar eventos que um componente pode emitir?',
      back: '`const emit = defineEmits([\'evento1\', \'evento2\'])`. Depois use `emit(\'evento1\', payload)`.',
      code: `const emit = defineEmits(['salvar', 'cancelar'])
emit('salvar', { id: 1, nome: 'Ana' })`,
      lessonTitle: 'Custom Events',
    },
    {
      id: 'ev-in-fc-2',
      front: 'Como o pai recebe o payload de um emit?',
      back: 'Via argumento do handler, ou com `$event` inline.',
      code: `// Handler
<Filho @salvar="onSalvar" />
function onSalvar(payload) { ... }

// Inline
<Filho @salvar="dados = $event" />`,
      lessonTitle: 'Custom Events',
    },
    {
      id: 'ev-in-fc-3',
      front: 'camelCase ou kebab-case nos eventos emitidos?',
      back: 'Emita em camelCase no JS. Escute em kebab-case no template (Vue converte automaticamente).',
      code: `// Filho emite:
emit('itemAdicionado', item)

// Pai escuta:
<Filho @item-adicionado="handler" />`,
      lessonTitle: 'Custom Events',
    },
    {
      id: 'ev-in-fc-4',
      front: 'Como validar o payload de um evento emitido?',
      back: 'Passe um objeto para defineEmits() com funções que retornam true/false.',
      code: `defineEmits({
  submit: (payload) => !!payload.email
})`,
      lessonTitle: 'Custom Events',
    },
    {
      id: 'ev-in-fc-5',
      front: 'Qual o padrão correto para comunicação bidirecional filho → pai?',
      back: 'Filho recebe dados via prop e emite mudanças. Pai mantém o estado e atualiza via handler.',
      code: `// Filho: prop + emit
emit('atualizar', novoValor)

// Pai: mantém estado
<Filho :valor="count" @atualizar="count = $event" />`,
      lessonTitle: 'Custom Events',
    },
  ],

  challenges: [
    {
      id: 'ev-in-ch-1',
      type: 'fill-blank',
      title: 'Emitir evento com payload',
      description: 'Complete o defineEmits e o emit para enviar o item ao pai ao clicar.',
      xpReward: 20,
      template: `<script setup>
const props = defineProps({ item: Object })
const emit = ___(['selecionar'])

function selecionar() {
  ___(\'selecionar\', props.item)
}
</script>

<template>
  <div @click="selecionar">{{ props.item.nome }}</div>
</template>`,
      blanks: ['defineEmits', 'emit'],
      solution: `<script setup>
const props = defineProps({ item: Object })
const emit = defineEmits(['selecionar'])

function selecionar() {
  emit('selecionar', props.item)
}
</script>

<template>
  <div @click="selecionar">{{ props.item.nome }}</div>
</template>`,
      hint: 'defineEmits declara os eventos. emit(nome, payload) dispara o evento.',
    },
    {
      id: 'ev-in-ch-2',
      type: 'fill-blank',
      title: 'Múltiplos eventos',
      description: 'Complete os emits para incrementar e resetar o contador.',
      xpReward: 25,
      template: `<script setup>
const props = defineProps({ count: Number })
const emit = defineEmits(['___ ', '___'])
</script>

<template>
  <button @click="emit('incrementar')">+1</button>
  <button @click="emit('resetar')">Reset</button>
  <span>{{ props.count }}</span>
</template>`,
      blanks: ['incrementar', 'resetar'],
      solution: `<script setup>
const props = defineProps({ count: Number })
const emit = defineEmits(['incrementar', 'resetar'])
</script>

<template>
  <button @click="emit('incrementar')">+1</button>
  <button @click="emit('resetar')">Reset</button>
  <span>{{ props.count }}</span>
</template>`,
      hint: 'Declare todos os eventos que o componente pode emitir no array do defineEmits.',
    },
    {
      id: 'ev-in-ch-3',
      type: 'fill-blank',
      title: 'Escutar evento no pai',
      description: 'Complete o pai para escutar o evento "selecionar" e atualizar o item selecionado.',
      xpReward: 30,
      template: `<script setup>
import { ref } from 'vue'
import CardItem from './CardItem.vue'

const selecionado = ref(null)
const items = ref([
  { id: 1, nome: 'Vue' },
  { id: 2, nome: 'React' },
])
</script>

<template>
  <CardItem
    v-for="item in items"
    :key="item.id"
    :item="item"
    ___="selecionar"="selecionado = ___"
  />
  <p>Selecionado: {{ selecionado?.nome }}</p>
</template>`,
      blanks: ['@', '$event'],
      solution: `<script setup>
import { ref } from 'vue'
import CardItem from './CardItem.vue'

const selecionado = ref(null)
const items = ref([
  { id: 1, nome: 'Vue' },
  { id: 2, nome: 'React' },
])
</script>

<template>
  <CardItem
    v-for="item in items"
    :key="item.id"
    :item="item"
    @selecionar="selecionado = $event"
  />
  <p>Selecionado: {{ selecionado?.nome }}</p>
</template>`,
      hint: '@nome-do-evento escuta o evento. $event é o payload recebido.',
    },
    {
      id: 'ev-in-ch-4',
      type: 'fill-blank',
      title: 'Validação de evento',
      description: 'Complete o defineEmits com validação: submit exige que o payload tenha email.',
      xpReward: 35,
      template: `<script setup>
const emit = defineEmits({
  submit: (___)  => {
    return !!payload.___
  },
})

function handleSubmit(email) {
  emit('submit', { email })
}
</script>`,
      blanks: ['payload', 'email'],
      solution: `<script setup>
const emit = defineEmits({
  submit: (payload) => {
    return !!payload.email
  },
})

function handleSubmit(email) {
  emit('submit', { email })
}
</script>`,
      hint: 'Passe um objeto para defineEmits com funções validadoras. Retorne true/false.',
    },
    {
      id: 'ev-in-ch-5',
      type: 'fix-bug',
      title: 'Bugs nos eventos customizados',
      description: 'O componente tem 3 erros relacionados a eventos. Encontre e corrija.',
      xpReward: 35,
      buggyCode: `<!-- Filho.vue -->
<script setup>
const props = defineProps({ valor: Number })

function incrementar() {
  emit('atualizar', props.valor + 1)
}
</script>

<template>
  <button @click="incrementar">+1</button>
</template>

<!-- Pai.vue -->
<template>
  <Filho :valor="count" @atualizar="count++" />
</template>`,
      solution: `<!-- Filho.vue -->
<script setup>
const props = defineProps({ valor: Number })
const emit = defineEmits(['atualizar'])

function incrementar() {
  emit('atualizar', props.valor + 1)
}
</script>

<template>
  <button @click="incrementar">+1</button>
</template>

<!-- Pai.vue -->
<template>
  <Filho :valor="count" @atualizar="count = $event" />
</template>`,
      explanation: '1) emit() usado sem defineEmits — declare os eventos com defineEmits. 2) emit() chamado sem declarar a variável — const emit = defineEmits([...]). 3) @atualizar="count++" ignora o payload — use $event para receber o novo valor: count = $event.',
    },
  ],
}
