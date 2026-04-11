export default {
  id: 'components-basics',
  moduleId: 'essentials',
  title: 'Components Basics',
  icon: '🧩',
  xpReward: 40,
  docUrl: 'https://vuejs.org/guide/essentials/component-basics',

  theory: [
    {
      title: 'O que são componentes e por que usar?',
      body: `Componentes são blocos reutilizáveis de UI — cada um encapsula template, lógica e estilos.
São o building block fundamental do Vue. Cada arquivo .vue é um componente.`,
      code: `<!-- MeuBotao.vue — um componente autônomo -->
<script setup>
import { ref } from 'vue'

const count = ref(0)

function click() {
  count.value++
}
</script>

<template>
  <button @click="click" class="btn">
    Clicado {{ count }} vezes
  </button>
</template>

<style scoped>
/* scoped: só afeta este componente */
.btn {
  background: #42b883;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
</style>`,
    },
    {
      title: 'Usando componentes — import e instâncias',
      body: `Importe o arquivo .vue e use como tag HTML customizada no template.
Cada instância do componente tem seu próprio estado — completamente independente.`,
      code: `<!-- App.vue -->
<script setup>
import MeuBotao from './MeuBotao.vue'
import UserCard from './UserCard.vue'
import SearchBar from './SearchBar.vue'
</script>

<template>
  <!-- Cada instância é independente — states separados -->
  <MeuBotao />   <!-- count = 0 próprio -->
  <MeuBotao />   <!-- count = 0 próprio -->
  <MeuBotao />   <!-- count = 0 próprio -->

  <!-- Componentes mais complexos -->
  <UserCard />
  <SearchBar />
</template>`,
    },
    {
      title: 'Props — pai → filho',
      body: `Props são dados passados do componente pai para o filho.
O filho declara com defineProps(). Dados fluem sempre de pai para filho (one-way data flow).`,
      code: `<!-- UserCard.vue -->
<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    default: 1,
  },
  isOnline: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div class="card">
    <span :class="{ online: props.isOnline }">●</span>
    <h3>{{ props.name }}</h3>
    <span>Nível {{ props.level }}</span>
  </div>
</template>

<!-- Pai usando UserCard -->
<template>
  <UserCard name="Ana Silva" :level="5" :is-online="true" />
  <UserCard name="Bruno" />  <!-- level=1, isOnline=false -->
</template>`,
    },
    {
      title: 'Emits — filho → pai',
      body: `O filho se comunica com o pai emitindo eventos via defineEmits().
O pai escuta com @nomeDoEvento. Dados podem ser passados junto com o evento.`,
      code: `<!-- ConfirmDialog.vue -->
<script setup>
const props = defineProps({
  message: String,
})

const emit = defineEmits(['confirm', 'cancel'])

function handleConfirm() {
  emit('confirm', { timestamp: Date.now() })
}
</script>

<template>
  <div class="dialog">
    <p>{{ props.message }}</p>
    <button @click="handleConfirm">✅ Confirmar</button>
    <button @click="emit('cancel')">❌ Cancelar</button>
  </div>
</template>

<!-- Pai.vue -->
<template>
  <ConfirmDialog
    message="Tem certeza?"
    @confirm="(data) => console.log('Confirmado em', data.timestamp)"
    @cancel="showDialog = false"
  />
</template>`,
    },
    {
      title: 'Slots — injeção de conteúdo',
      body: `Slots permitem que o pai injete conteúdo dentro do filho.
O filho define onde o conteúdo aparece com <slot />. Cria componentes altamente reutilizáveis.`,
      code: `<!-- Card.vue — componente de layout reutilizável -->
<template>
  <div class="card">
    <div class="card-header">
      <slot name="header">Título padrão</slot>
    </div>
    <div class="card-body">
      <slot />  <!-- slot padrão (sem nome) -->
    </div>
    <div class="card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<!-- Pai usando o Card com slots nomeados -->
<template>
  <Card>
    <template #header>
      <h2>🏆 Ranking</h2>
    </template>

    <!-- Conteúdo do slot padrão -->
    <p>Ana: 1200 pts</p>
    <p>Bruno: 950 pts</p>

    <template #footer>
      <button>Ver todos</button>
    </template>
  </Card>
</template>`,
    },
  ],

  flashcards: [
    {
      id: 'cb-fc-1',
      front: 'Como declarar props no componente filho?',
      back: 'Use `defineProps()` no `<script setup>`. É uma macro — não precisa importar.',
      code: `const props = defineProps({
  title: String,
  count: { type: Number, default: 0 },
})`,
      lessonTitle: 'Components Basics',
    },
    {
      id: 'cb-fc-2',
      front: 'Como o filho envia eventos para o pai?',
      back: 'Declare com `defineEmits()` e dispare com `emit()`. O pai escuta com `@nomeEvento`.',
      code: `const emit = defineEmits(['change'])
emit('change', novoValor)
// Pai: <Filho @change="handler" />`,
      lessonTitle: 'Components Basics',
    },
    {
      id: 'cb-fc-3',
      front: 'O que é um slot?',
      back: 'Um "buraco" no template do filho onde o pai injeta conteúdo.',
      code: `<!-- Filho -->
<div><slot /></div>

<!-- Pai -->
<Card><p>Meu conteúdo</p></Card>`,
      lessonTitle: 'Components Basics',
    },
    {
      id: 'cb-fc-4',
      front: 'Cada instância de componente tem estado compartilhado?',
      back: 'Não — cada instância tem seu **próprio estado independente**.',
      code: `<Counter />  <!-- count = 0 próprio -->
<Counter />  <!-- count = 0 próprio -->`,
      lessonTitle: 'Components Basics',
    },
    {
      id: 'cb-fc-5',
      front: 'Como implementar v-model em um componente customizado?',
      back: 'Receba a prop `modelValue` e emita `update:modelValue`.',
      code: `defineProps({ modelValue: String })
defineEmits(['update:modelValue'])
// <input :value="modelValue"
//   @input="emit('update:modelValue', $event.target.value)">`,
      lessonTitle: 'Components Basics',
    },
    {
      id: 'cb-fc-6',
      front: 'Props são somente leitura no filho?',
      back: 'Sim — nunca mute props diretamente. Emita um evento e deixe o pai decidir.',
      code: `// ❌
props.count++

// ✅
emit('update:count', props.count + 1)`,
      lessonTitle: 'Components Basics',
    },
  ],

  challenges: [
    {
      id: 'cb-ch-1',
      type: 'fill-blank',
      title: 'Declarar props com tipos e defaults',
      description: 'Complete o componente para aceitar `name` (String, required), `score` (Number, default 0) e `isActive` (Boolean, default false).',
      xpReward: 25,
      template: `<script setup>
const props = ___({
  name: {
    type: ___,
    required: true,
  },
  score: {
    type: Number,
    ___: 0,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <p :class="{ active: props.isActive }">
    {{ props.name }} — {{ props.score }} pts
  </p>
</template>`,
      blanks: ['defineProps', 'String', 'default'],
      solution: `<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <p :class="{ active: props.isActive }">
    {{ props.name }} — {{ props.score }} pts
  </p>
</template>`,
      hint: 'defineProps() com objeto de configuração. type, required, default são as opções.',
    },
    {
      id: 'cb-ch-2',
      type: 'fill-blank',
      title: 'Emitir evento com dados',
      description: 'Complete o componente de rating: ao clicar em uma estrela, emita o evento "rate" com o valor (1-5).',
      xpReward: 25,
      template: `<script setup>
const ___ = ___(['rate'])
</script>

<template>
  <div class="stars">
    <button
      v-for="n in 5"
      :key="n"
      @click="emit('rate', n)"
    >
      ⭐ {{ n }}
    </button>
  </div>
</template>`,
      blanks: ['emit', 'defineEmits'],
      solution: `<script setup>
const emit = defineEmits(['rate'])
</script>

<template>
  <div class="stars">
    <button
      v-for="n in 5"
      :key="n"
      @click="emit('rate', n)"
    >
      ⭐ {{ n }}
    </button>
  </div>
</template>`,
      hint: 'defineEmits() retorna a função emit. Use emit("nomeEvento", valor).',
    },
    {
      id: 'cb-ch-3',
      type: 'fill-blank',
      title: 'AlertCard com props, emit e slot',
      description: 'Complete: declare as props, o emit, e use-os no template com :class e @click.',
      xpReward: 60,
      template: `<script setup>
const props = ___({
  type: { type: String, default: 'info' },
  message: String,
})

const emit = ___(['close'])

const icons = { success: '✅', error: '🔴', warning: '⚠️', info: 'ℹ️' }
</script>

<template>
  <div :class="['alert', \`alert-\${props.type}\`]">
    <span>{{ icons[props.type] }}</span>
    <div>
      <p>{{ props.___ }}</p>
      <slot />
    </div>
    <button @click="emit('___')">×</button>
  </div>
</template>`,
      blanks: ['defineProps', 'defineEmits', 'message', 'close'],
      solution: `<script setup>
const props = defineProps({
  type: { type: String, default: 'info' },
  message: String,
})

const emit = defineEmits(['close'])

const icons = { success: '✅', error: '🔴', warning: '⚠️', info: 'ℹ️' }
</script>

<template>
  <div :class="['alert', \`alert-\${props.type}\`]">
    <span>{{ icons[props.type] }}</span>
    <div>
      <p>{{ props.message }}</p>
      <slot />
    </div>
    <button @click="emit('close')">×</button>
  </div>
</template>`,
      hint: 'defineProps() declara os dados que o pai passa. defineEmits() declara eventos que o filho dispara.',
    },
    {
      id: 'cb-ch-4',
      type: 'fill-blank',
      title: 'v-model em componente customizado',
      description: 'Complete: a prop correta para v-model e o evento que o pai espera receber.',
      xpReward: 55,
      template: `<script setup>
const props = defineProps({
  ___: { type: Number, default: 50 },
  min: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
  label: { type: String, default: 'Valor' },
})

const emit = defineEmits(['___:modelValue'])
</script>

<template>
  <div>
    <label>{{ props.label }}: {{ props.modelValue }}</label>
    <input
      type="range"
      :min="props.min"
      :max="props.max"
      :value="props.modelValue"
      @input="emit('update:modelValue', Number($event.target.value))"
    />
  </div>
</template>`,
      blanks: ['modelValue', 'update'],
      solution: `<script setup>
const props = defineProps({
  modelValue: { type: Number, default: 50 },
  min: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
  label: { type: String, default: 'Valor' },
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div>
    <label>{{ props.label }}: {{ props.modelValue }}</label>
    <input
      type="range"
      :min="props.min"
      :max="props.max"
      :value="props.modelValue"
      @input="emit('update:modelValue', Number($event.target.value))"
    />
  </div>
</template>`,
      hint: 'v-model no componente pai usa a prop "modelValue" e o evento "update:modelValue" no filho.',
    },
    {
      id: 'cb-ch-5',
      type: 'fix-bug',
      title: 'Comunicação pai-filho com bugs',
      description: 'O código tem 3 erros: props não declaradas corretamente, emit sem defineEmits, e prop sendo mutada diretamente. Corrija.',
      xpReward: 35,
      buggyCode: `<!-- Filho.vue -->
<script setup>
import { defineProps, defineEmits } from 'vue'  // erro 1

const props = defineProps(['title', 'count'])

// erro 2: sem defineEmits
function handleClick() {
  emit('clicked', props.count + 1)
  props.count++  // erro 3: nunca mute props!
}
</script>

<template>
  <div @click="handleClick">
    {{ props.title }}: {{ props.count }}
  </div>
</template>`,
      solution: `<!-- Filho.vue -->
<script setup>
// defineProps e defineEmits são macros — NÃO importar de 'vue'
const props = defineProps({
  title: String,
  count: Number,
})

const emit = defineEmits(['clicked'])

function handleClick() {
  // Emite com o novo valor — pai decide se atualiza
  emit('clicked', props.count + 1)
  // Nunca: props.count++ — props são somente-leitura!
}
</script>

<template>
  <div @click="handleClick">
    {{ props.title }}: {{ props.count }}
  </div>
</template>`,
      explanation: '1) defineProps/defineEmits são macros do compilador — não importar de "vue". 2) defineEmits() deve ser chamado para usar emit. 3) Props são somente-leitura — emita o evento e deixe o pai atualizar.',
    },
  ],
}
