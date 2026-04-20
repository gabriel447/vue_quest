export default {
  id: 'components-basics',
  moduleId: 'essentials',
  title: 'Components Basics',
  icon: '🧩',
  xpReward: 40,
  docUrl: 'https://vuejs.org/guide/essentials/component-basics',

  theory: [
    {
      title: 'O que são componentes?',
      body: `Componentes são como blocos de LEGO. Em vez de escrever uma página inteira num arquivo gigante, você divide a UI em peças reutilizáveis. Cada componente tem seu próprio estado, template e estilo encapsulados num arquivo .vue.
Com <script setup>, os componentes importados ficam disponíveis automaticamente no template — sem precisar registrar.`,
      code: `<!-- MeuBotao.vue — componente reutilizável -->
<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<template>
  <button @click="count++">Cliques: {{ count }}</button>
</template>

<!-- App.vue — usando o componente -->
<script setup>
import MeuBotao from './MeuBotao.vue'  // importou = registrado!
</script>

<template>
  <!-- Cada instância tem seu próprio estado -->
  <MeuBotao />
  <MeuBotao />
  <MeuBotao />
</template>`,
    },
    {
      title: 'Props — dados do pai para o filho',
      body: `Props são como parâmetros de função para componentes. O pai passa dados para o filho via :prop. O filho declara o que aceita com defineProps(). Dados sempre fluem de cima para baixo — o filho nunca modifica a prop diretamente.`,
      code: `<!-- CartaoUsuario.vue -->
<script setup>
const props = defineProps({
  nome: String,
  nivel: { type: Number, default: 1 },
  isAdmin: Boolean,
})
</script>

<template>
  <div class="card">
    <h3>{{ props.nome }}</h3>
    <span>Nível {{ props.nivel }}</span>
    <span v-if="props.isAdmin">👑 Admin</span>
  </div>
</template>

<!-- Pai passa as props -->
<CartaoUsuario nome="Ana Silva" :nivel="5" :isAdmin="true" />
<CartaoUsuario nome="Bruno" />  <!-- nivel usa o default: 1 -->`,
    },
    {
      title: 'Emits — eventos do filho para o pai',
      body: `E se o filho precisar avisar o pai que algo aconteceu? Ele emite um evento com defineEmits(). O pai escuta com @evento. A comunicação é unidirecional: dados descem via props, eventos sobem via emit.`,
      code: `<!-- BotaoContador.vue -->
<script setup>
const emit = defineEmits(['incrementar', 'resetar'])

function adicionar() {
  emit('incrementar', 10)  // payload opcional
}
</script>

<template>
  <button @click="adicionar">+10</button>
  <button @click="emit('resetar')">Reset</button>
</template>

<!-- Pai ouve os eventos -->
<script setup>
import { ref } from 'vue'
const total = ref(0)

function onIncrement(valor) {
  total.value += valor
}
</script>

<template>
  <p>Total: {{ total }}</p>
  <BotaoContador
    @incrementar="onIncrement"
    @resetar="total = 0"
  />
</template>`,
    },
    {
      title: 'Slots — conteúdo passado pelo pai',
      body: `Props passam dados. Slots passam HTML e outros componentes. O filho usa <slot /> como placeholder — o pai preenche esse espaço com o que quiser. Útil para criar componentes genéricos como Card, Modal ou Button.`,
      code: `<!-- CardBase.vue — componente genérico com slot -->
<template>
  <div class="card">
    <slot />  <!-- o conteúdo do pai vai aqui -->
  </div>
</template>

<!-- Pai preenche o slot com qualquer conteúdo -->
<CardBase>
  <h2>Título do card</h2>
  <p>Qualquer conteúdo aqui</p>
</CardBase>

<CardBase>
  <img src="foto.jpg" />
  <button>Seguir</button>
</CardBase>`,
    },
    {
      title: 'Componentes dinâmicos com <component :is>',
      body: `Use <component :is="..."> para renderizar um componente diferente dinamicamente. Combine com <KeepAlive> para preservar o estado quando o componente não está visível — útil em tabs e wizards.`,
      code: `<script setup>
import { ref } from 'vue'
import TabHome from './TabHome.vue'
import TabPerfil from './TabPerfil.vue'
import TabConfig from './TabConfig.vue'

const tabs = [
  { name: 'Home', component: TabHome },
  { name: 'Perfil', component: TabPerfil },
  { name: 'Config', component: TabConfig },
]

const currentTab = ref(tabs[0])
</script>

<template>
  <div class="tabs">
    <button
      v-for="tab in tabs"
      :key="tab.name"
      @click="currentTab = tab"
    >
      {{ tab.name }}
    </button>
  </div>

  <!-- KeepAlive preserva o estado das tabs -->
  <KeepAlive>
    <component :is="currentTab.component" />
  </KeepAlive>
</template>`,
    },
  ],

  flashcards: [
    {
      id: 'comp-b-fc-1',
      front: 'Como registrar um componente para usar no template?',
      back: 'Com `<script setup>`, basta importar — o componente fica disponível automaticamente no template.',
      code: `import MeuComp from './MeuComp.vue'
// <MeuComp /> já funciona no template`,
      lessonTitle: 'Components Basics',
    },
    {
      id: 'comp-b-fc-2',
      front: 'Como passar dados do pai para o filho?',
      back: 'Pai usa `:prop="valor"`. Filho declara com `defineProps()`.',
      code: `// filho
const props = defineProps({ titulo: String })

// pai
// <Filho :titulo="'Olá'" />`,
      lessonTitle: 'Components Basics',
    },
    {
      id: 'comp-b-fc-3',
      front: 'Como o filho comunica algo ao pai?',
      back: 'Filho usa `defineEmits()` + `emit("evento", payload)`. Pai escuta com `@evento="handler"`.',
      code: `// filho
const emit = defineEmits(['salvo'])
emit('salvo', dados)

// pai: @salvo="onSalvo"`,
      lessonTitle: 'Components Basics',
    },
    {
      id: 'comp-b-fc-4',
      front: 'O que é um slot?',
      back: 'Um placeholder no filho onde o pai injeta conteúdo HTML/componentes.',
      code: `// filho: <slot />

// pai
<Filho>
  <p>Conteúdo aqui</p>
</Filho>`,
      lessonTitle: 'Components Basics',
    },
    {
      id: 'comp-b-fc-5',
      front: 'Como renderizar componentes dinamicamente?',
      back: 'Use `<component :is="comp">`. Combine com `<KeepAlive>` para preservar o estado quando o componente não está visível.',
      code: `<KeepAlive>
  <component :is="currentTab.component" />
</KeepAlive>`,
      lessonTitle: 'Components Basics',
    },
  ],

  challenges: [
    {
      id: 'comp-b-ch-1',
      type: 'fill-blank',
      title: 'Definindo e usando props',
      description: 'Complete o defineProps do componente filho e a passagem de props no pai.',
      xpReward: 30,
      template: `<!-- CartaoJogador.vue (filho) -->
<script setup>
const props = ___({
  nome: String,
  pontos: Number,
  posicao: { type: Number, _____: 0 },
})
</script>

<template>
  <div class="card">
    <span class="pos">#{{ props.posicao }}</span>
    <strong>{{ props.nome }}</strong>
    <span>{{ props.pontos }} pts</span>
  </div>
</template>

<!-- App.vue (pai) — passe as props corretamente -->
<template>
  <CartaoJogador
    ___="'Ana Silva'"
    ___="1250"
    ___="1"
  />
</template>`,
      blanks: ['defineProps', 'default', ':nome', ':pontos', ':posicao'],
      solution: `<!-- CartaoJogador.vue (filho) -->
<script setup>
const props = defineProps({
  nome: String,
  pontos: Number,
  posicao: { type: Number, default: 0 },
})
</script>

<template>
  <div class="card">
    <span class="pos">#{{ props.posicao }}</span>
    <strong>{{ props.nome }}</strong>
    <span>{{ props.pontos }} pts</span>
  </div>
</template>

<!-- App.vue (pai) — passe as props corretamente -->
<template>
  <CartaoJogador
    :nome="'Ana Silva'"
    :pontos="1250"
    :posicao="1"
  />
</template>`,
      hint: 'defineProps declara o que o filho aceita. O pai passa com :prop="valor".',
    },
    {
      id: 'comp-b-ch-2',
      type: 'fill-blank',
      title: 'Emitindo eventos',
      description: 'Complete o componente filho para emitir um evento "adicionado" quando o botão é clicado.',
      xpReward: 40,
      template: `<!-- BotaoAdicionar.vue (filho) -->
<script setup>
const props = defineProps({ item: String })
const emit = ___(['adicionado'])

function handleClick() {
  ___(___,  props.item)
}
</script>

<template>
  <button @click="handleClick">
    ➕ Adicionar {{ props.item }}
  </button>
</template>

<!-- App.vue (pai) -->
<script setup>
import { ref } from 'vue'
const lista = ref([])

function onAdicionado(item) {
  lista.value.push(item)
}
</script>

<template>
  <BotaoAdicionar item="Vue" ___="onAdicionado" />
  <ul>
    <li v-for="(i, idx) in lista" :key="idx">{{ i }}</li>
  </ul>
</template>`,
      blanks: ['defineEmits', 'emit', "'adicionado'", '@adicionado'],
      solution: `<!-- BotaoAdicionar.vue (filho) -->
<script setup>
const props = defineProps({ item: String })
const emit = defineEmits(['adicionado'])

function handleClick() {
  emit('adicionado', props.item)
}
</script>

<template>
  <button @click="handleClick">
    ➕ Adicionar {{ props.item }}
  </button>
</template>

<!-- App.vue (pai) -->
<script setup>
import { ref } from 'vue'
const lista = ref([])

function onAdicionado(item) {
  lista.value.push(item)
}
</script>

<template>
  <BotaoAdicionar item="Vue" @adicionado="onAdicionado" />
  <ul>
    <li v-for="(i, idx) in lista" :key="idx">{{ i }}</li>
  </ul>
</template>`,
      hint: 'defineEmits declara os eventos. emit("nome", payload) dispara. O pai ouve com @nome="handler".',
    },
    {
      id: 'comp-b-ch-3',
      type: 'fill-blank',
      title: 'Componente com slot',
      description: 'Complete o componente Card genérico com slot e use-o no pai com conteúdo diferente.',
      xpReward: 35,
      template: `<!-- Card.vue (filho com slot) -->
<script setup>
defineProps({ titulo: { type: String, default: '' } })
</script>

<template>
  <div class="card">
    <h3 v-if="titulo">{{ titulo }}</h3>
    <___  />
  </div>
</template>

<!-- App.vue (pai) -->
<template>
  <Card titulo="Perfil">
    <p>Ana Silva — Nível 7</p>
    <button>Seguir</button>
  </Card>

  <Card>
    <img src="/avatar.jpg" alt="Avatar" />
  </Card>
</template>`,
      blanks: ['slot'],
      solution: `<!-- Card.vue (filho com slot) -->
<script setup>
defineProps({ titulo: { type: String, default: '' } })
</script>

<template>
  <div class="card">
    <h3 v-if="titulo">{{ titulo }}</h3>
    <slot />
  </div>
</template>

<!-- App.vue (pai) -->
<template>
  <Card titulo="Perfil">
    <p>Ana Silva — Nível 7</p>
    <button>Seguir</button>
  </Card>

  <Card>
    <img src="/avatar.jpg" alt="Avatar" />
  </Card>
</template>`,
      hint: '<slot /> é o placeholder onde o pai injeta conteúdo.',
    },
    {
      id: 'comp-b-ch-4',
      type: 'fill-blank',
      title: 'Comunicação completa — prop + emit',
      description: 'Complete o componente contador com prop `valor` e emit `atualizar` para comunicação bidirecional.',
      xpReward: 55,
      template: `<!-- Contador.vue (filho) -->
<script setup>
const props = defineProps({ valor: Number })
const emit = defineEmits(['___'])

function incrementar() {
  ___(___,  props.valor + 1)
}

function decrementar() {
  if (props.valor > 0) emit('atualizar', props.valor - 1)
}
</script>

<template>
  <div>
    <button @click="decrementar">-</button>
    <span>{{ props.valor }}</span>
    <button @click="incrementar">+</button>
  </div>
</template>

<!-- App.vue (pai) -->
<script setup>
import { ref } from 'vue'
const total = ref(0)
</script>

<template>
  <Contador :valor="total" @___="total = $event" />
  <p>Total: {{ total }}</p>
</template>`,
      blanks: ['atualizar', 'emit', "'atualizar'", 'atualizar'],
      solution: `<!-- Contador.vue (filho) -->
<script setup>
const props = defineProps({ valor: Number })
const emit = defineEmits(['atualizar'])

function incrementar() {
  emit('atualizar', props.valor + 1)
}

function decrementar() {
  if (props.valor > 0) emit('atualizar', props.valor - 1)
}
</script>

<template>
  <div>
    <button @click="decrementar">-</button>
    <span>{{ props.valor }}</span>
    <button @click="incrementar">+</button>
  </div>
</template>

<!-- App.vue (pai) -->
<script setup>
import { ref } from 'vue'
const total = ref(0)
</script>

<template>
  <Contador :valor="total" @atualizar="total = $event" />
  <p>Total: {{ total }}</p>
</template>`,
      hint: 'O filho emite "atualizar" com o novo valor. O pai escuta com @atualizar e atualiza sua ref. $event é o payload do emit.',
    },
    {
      id: 'comp-b-ch-5',
      type: 'fix-bug',
      title: 'Comunicação pai-filho com bugs',
      description: 'O código tem 3 erros na comunicação pai-filho. Encontre e corrija.',
      xpReward: 35,
      buggyCode: `<!-- Filho.vue -->
<script setup>
const props = defineProps({ count: Number })
const emit = defineEmits('atualizar')

function increment() {
  props.count++
}
</script>

<template>
  <button @click="increment">+1</button>
  <p>{{ props.count }}</p>
</template>

<!-- App.vue -->
<script setup>
import { ref } from 'vue'
import Filho from './Filho.vue'

const value = ref(0)
</script>

<template>
  <p>Total: {{ value }}</p>
  <Filho :count="value" @atualizar="value" />
</template>`,
      solution: `<!-- Filho.vue -->
<script setup>
const props = defineProps({ count: Number })
const emit = defineEmits(['atualizar'])

function increment() {
  emit('atualizar', props.count + 1)
}
</script>

<template>
  <button @click="increment">+1</button>
  <p>{{ props.count }}</p>
</template>

<!-- App.vue -->
<script setup>
import { ref } from 'vue'
import Filho from './Filho.vue'

const value = ref(0)
</script>

<template>
  <p>Total: {{ value }}</p>
  <Filho :count="value" @atualizar="value = $event" />
</template>`,
      explanation: '1) defineEmits recebe um array, não uma string. 2) Nunca modifique props — use emit com o payload. 3) @atualizar="value" não faz nada — use $event para receber o valor: value = $event.',
    },
  ],
}
