export default {
  id: 'props-in-depth',
  moduleId: 'components',
  title: 'Props In-Depth',
  icon: '📨',
  xpReward: 35,
  docUrl: 'https://vuejs.org/guide/components/props',

  theory: [
    {
      title: 'Tipos e validação de props',
      body: `Em vez de aceitar qualquer valor, você pode definir o tipo esperado de cada prop. O Vue vai avisar no console durante o desenvolvimento se o tipo errado for passado.
Passe um objeto para defineProps() em vez de um array para ativar a validação de tipos.`,
      code: `<script setup>
const props = defineProps({
  nome: String,
  idade: Number,
  ativo: Boolean,
  tags: Array,
  config: Object,
  callback: Function,
})
</script>

<template>
  <p>{{ props.nome }}, {{ props.idade }} anos</p>
  <span v-if="props.ativo">✅ Ativo</span>
</template>`,
    },
    {
      title: 'required e default',
      body: `Use a forma de objeto expandida para marcar props como obrigatórias ou definir valores padrão. Se uma prop required for omitida, o Vue avisa no console. O default pode ser um valor ou uma função (para arrays e objetos).`,
      code: `<script setup>
const props = defineProps({
  nome: {
    type: String,
    required: true,        // obrigatório — avisa se omitido
  },
  nivel: {
    type: Number,
    default: 1,            // valor padrão
  },
  tags: {
    type: Array,
    default: () => [],     // factory function para objetos/arrays
  },
  cor: {
    type: String,
    default: 'azul',
  },
})
</script>`,
    },
    {
      title: 'Validator — validação customizada',
      body: `Além do tipo, você pode validar o valor com uma função validator. Ela recebe o valor e deve retornar true (válido) ou false (inválido). Útil para aceitar só um conjunto específico de strings.`,
      code: `<script setup>
const props = defineProps({
  tamanho: {
    type: String,
    validator(value) {
      return ['sm', 'md', 'lg', 'xl'].includes(value)
    },
  },
  status: {
    type: String,
    required: true,
    validator: (v) => ['pendente', 'ativo', 'inativo'].includes(v),
  },
  nota: {
    type: Number,
    validator: (v) => v >= 0 && v <= 10,
  },
})
</script>`,
    },
    {
      title: 'camelCase vs kebab-case em props',
      body: `Declare props em camelCase no JavaScript, mas passe-as em kebab-case no template HTML — esta é a convenção Vue. O Vue faz a conversão automaticamente.`,
      code: `<!-- Filho declara em camelCase -->
<script setup>
const props = defineProps({
  nomeCompleto: String,    // camelCase no JS
  nivelUsuario: Number,
})
</script>

<!-- Pai passa em kebab-case no template -->
<template>
  <Filho
    nome-completo="Ana Silva"
    :nivel-usuario="5"
  />

  <!-- PascalCase também funciona em SFCs: -->
  <Filho
    nomeCompleto="Bruno"
    :nivelUsuario="3"
  />
</template>`,
    },
    {
      title: 'Props são somente leitura',
      body: `Nunca modifique uma prop diretamente — o Vue vai avisar no console e pode causar bugs. Props fluem de cima para baixo. Se precisar de um valor derivado da prop, use computed. Se precisar modificar, emita um evento para o pai.`,
      code: `<script setup>
import { computed } from 'vue'

const props = defineProps({
  titulo: String,
  count: Number,
})

// ✅ Derivar com computed
const tituloFormatado = computed(() =>
  props.titulo.toUpperCase()
)

// ✅ Inicializar estado local com a prop como valor inicial
import { ref } from 'vue'
const localCount = ref(props.count)

// ❌ NUNCA faça isso:
// props.titulo = 'Novo título'  → erro!
</script>`,
    },
  ],

  flashcards: [
    {
      id: 'props-fc-1',
      front: 'Como validar o tipo de uma prop?',
      back: 'Passe um objeto para defineProps() com `type: Tipo`. O Vue avisa no console se o tipo errado for passado.',
      code: `defineProps({
  nome: { type: String },
  idade: { type: Number },
})`,
      lessonTitle: 'Props In-Depth',
    },
    {
      id: 'props-fc-2',
      front: 'Como definir uma prop obrigatória com valor padrão?',
      back: 'Use `required: true` para obrigatório. Use `default: valor` para padrão. Arrays e objetos precisam de `default: () => []`.',
      code: `defineProps({
  nome: { type: String, required: true },
  nivel: { type: Number, default: 1 },
  tags: { type: Array, default: () => [] },
})`,
      lessonTitle: 'Props In-Depth',
    },
    {
      id: 'props-fc-3',
      front: 'Como validar um conjunto específico de valores aceitos?',
      back: 'Use `validator(value)` — retorne `true` se válido, `false` se inválido.',
      code: `defineProps({
  tamanho: {
    type: String,
    validator: (v) => ['sm', 'md', 'lg'].includes(v)
  }
})`,
      lessonTitle: 'Props In-Depth',
    },
    {
      id: 'props-fc-4',
      front: 'Posso modificar uma prop diretamente?',
      back: 'Não — props são somente leitura. Use `computed` para derivar valores, ou emita um evento para o pai fazer a mudança.',
      code: `// ❌ Errado
props.nome = 'novo'

// ✅ Certo: computed ou emit
const upper = computed(() => props.nome.toUpperCase())`,
      lessonTitle: 'Props In-Depth',
    },
    {
      id: 'props-fc-5',
      front: 'Como passar uma prop com nome composto (camelCase)?',
      back: 'Declare em camelCase no JS, passe em kebab-case no template.',
      code: `// Filho: defineProps({ nomeCompleto: String })
// Pai: <Filho nome-completo="Ana" />`,
      lessonTitle: 'Props In-Depth',
    },
  ],

  challenges: [
    {
      id: 'props-ch-1',
      type: 'fill-blank',
      title: 'Props com tipos',
      description: 'Complete defineProps com os tipos corretos para cada prop.',
      xpReward: 20,
      template: `<script setup>
const props = defineProps({
  titulo: ___,
  preco: ___,
  disponivel: ___,
  tags: ___,
})
</script>

<template>
  <h2>{{ props.titulo }}</h2>
  <p>R$ {{ props.preco }}</p>
  <span v-if="props.disponivel">Em estoque</span>
</template>`,
      blanks: ['String', 'Number', 'Boolean', 'Array'],
      solution: `<script setup>
const props = defineProps({
  titulo: String,
  preco: Number,
  disponivel: Boolean,
  tags: Array,
})
</script>

<template>
  <h2>{{ props.titulo }}</h2>
  <p>R$ {{ props.preco }}</p>
  <span v-if="props.disponivel">Em estoque</span>
</template>`,
      hint: 'Os tipos são as construtoras JavaScript: String, Number, Boolean, Array, Object.',
    },
    {
      id: 'props-ch-2',
      type: 'fill-blank',
      title: 'Props required e default',
      description: 'Complete: nome obrigatório, nivel com default 1, tags com default array vazio.',
      xpReward: 30,
      template: `<script setup>
const props = defineProps({
  nome: {
    type: String,
    ___: true,
  },
  nivel: {
    type: Number,
    ___: 1,
  },
  tags: {
    type: Array,
    ___: () => [],
  },
})
</script>`,
      blanks: ['required', 'default', 'default'],
      solution: `<script setup>
const props = defineProps({
  nome: {
    type: String,
    required: true,
  },
  nivel: {
    type: Number,
    default: 1,
  },
  tags: {
    type: Array,
    default: () => [],
  },
})
</script>`,
      hint: 'required: true torna a prop obrigatória. default define o valor quando omitida.',
    },
    {
      id: 'props-ch-3',
      type: 'fill-blank',
      title: 'Validator customizado',
      description: 'Complete o validator para aceitar somente os tamanhos "sm", "md", "lg".',
      xpReward: 30,
      template: `<script setup>
const props = defineProps({
  tamanho: {
    type: String,
    ___(value) {
      return ['sm', 'md', 'lg'].___(value)
    },
  },
})
</script>

<template>
  <button :class="\`btn-\${props.tamanho}\`">
    Clique
  </button>
</template>`,
      blanks: ['validator', 'includes'],
      solution: `<script setup>
const props = defineProps({
  tamanho: {
    type: String,
    validator(value) {
      return ['sm', 'md', 'lg'].includes(value)
    },
  },
})
</script>

<template>
  <button :class="\`btn-\${props.tamanho}\`">
    Clique
  </button>
</template>`,
      hint: 'validator(value) recebe o valor e retorna true/false. .includes() verifica se está no array.',
    },
    {
      id: 'props-ch-4',
      type: 'fill-blank',
      title: 'Derivar dados de props com computed',
      description: 'Complete: use computed para criar nomeFormatado (uppercase) e precoComDesconto.',
      xpReward: 35,
      template: `<script setup>
import { ___ } from 'vue'

const props = defineProps({
  nome: String,
  preco: Number,
  desconto: { type: Number, default: 0 },
})

const nomeFormatado = ___(() => props.nome.toUpperCase())
const precoComDesconto = ___(() =>
  props.preco * (1 - props.desconto / 100)
)
</script>

<template>
  <h2>{{ nomeFormatado }}</h2>
  <p>R$ {{ precoComDesconto.toFixed(2) }}</p>
</template>`,
      blanks: ['computed', 'computed', 'computed'],
      solution: `<script setup>
import { computed } from 'vue'

const props = defineProps({
  nome: String,
  preco: Number,
  desconto: { type: Number, default: 0 },
})

const nomeFormatado = computed(() => props.nome.toUpperCase())
const precoComDesconto = computed(() =>
  props.preco * (1 - props.desconto / 100)
)
</script>

<template>
  <h2>{{ nomeFormatado }}</h2>
  <p>R$ {{ precoComDesconto.toFixed(2) }}</p>
</template>`,
      hint: 'computed() para derivar valores de props sem modificá-las.',
    },
    {
      id: 'props-ch-5',
      type: 'fix-bug',
      title: 'Bugs nas props',
      description: 'O componente tem 3 erros relacionados ao uso de props. Encontre e corrija.',
      xpReward: 35,
      buggyCode: `<script setup>
const props = defineProps(['titulo', 'count'])

props.titulo = props.titulo.toUpperCase()

const double = props.count * 2
</script>

<template>
  <h2>{{ props.titulo }}</h2>
  <p>Dobro: {{ double }}</p>
</template>`,
      solution: `<script setup>
import { computed } from 'vue'

const props = defineProps({
  titulo: String,
  count: Number,
})

const tituloFormatado = computed(() => props.titulo.toUpperCase())
const double = computed(() => props.count * 2)
</script>

<template>
  <h2>{{ tituloFormatado }}</h2>
  <p>Dobro: {{ double }}</p>
</template>`,
      explanation: '1) Props mutadas diretamente — use computed para derivar valores. 2) Array em defineProps não permite validação de tipos — use objeto com type. 3) double = props.count * 2 não é reativo — use computed para que atualize quando a prop mudar.',
    },
  ],
}
