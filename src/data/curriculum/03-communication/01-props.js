export default {
  id: 'props',
  moduleId: 'communication',
  title: 'Props',
  icon: '🎁',
  xpReward: 30,
  docUrl: 'https://vuejs.org/guide/components/props',

  theory: [
    {
      title: 'Props — a herança do componente',
      body: `Props é a "herança" — o que o pai passa para o filho usar. É a forma de um componente pai enviar dados para um componente filho. O fluxo é sempre de cima para baixo: pai → filho.`,
      code: `<!-- Filho: CartaoUsuario.vue -->
<script setup>
const props = defineProps({
  nome: String,
  nivel: Number,
})
</script>

<template>
  <div>
    <h2>{{ props.nome }}</h2>
    <p>Nível {{ props.nivel }}</p>
  </div>
</template>

<!-- Pai -->
<template>
  <CartaoUsuario nome="Ana" :nivel="5" />
</template>`,
    },
    {
      title: 'Validação de props',
      body: `Você pode definir tipo, se é obrigatório e um valor padrão para cada prop. Isso documenta o componente e o Vue avisa no console quando algo estiver errado.`,
      code: `<script setup>
const props = defineProps({
  titulo: {
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
  ativo: {
    type: Boolean,
    default: true,
  },
})
</script>`,
    },
    {
      title: 'Props são somente leitura',
      body: `Nunca altere uma prop diretamente no filho — isso quebra o fluxo de dados. Se precisar de uma versão local modificável, copie a prop para uma ref local.`,
      code: `<script setup>
import { ref } from 'vue'

const props = defineProps({ count: Number })

// ❌ Nunca: props.count++

// ✅ Copie para uma ref local se precisar alterar
const countLocal = ref(props.count)
</script>`,
    },
  ],

  flashcards: [
    {
      id: 'props-fc-1',
      front: 'O que são props e qual o fluxo de dados?',
      back: 'Props são dados passados do pai para o filho. O fluxo é sempre de cima para baixo (unidirecional).',
      code: `// Pai: <Filho :nome="ana" />
// Filho: defineProps({ nome: String })`,
      lessonTitle: 'Props',
    },
    {
      id: 'props-fc-2',
      front: 'Como validar uma prop como obrigatória com tipo?',
      back: 'Use o objeto de configuração com type e required: true.',
      code: `defineProps({
  titulo: { type: String, required: true }
})`,
      lessonTitle: 'Props',
    },
    {
      id: 'props-fc-3',
      front: 'Pode alterar uma prop diretamente no filho?',
      back: 'Não. Props são somente leitura. Se precisar de valor local, copie para uma ref.',
      code: `const local = ref(props.valor)`,
      lessonTitle: 'Props',
    },
  ],

  challenges: [
    {
      id: 'props-ch-1',
      type: 'fill-blank',
      title: 'Componente com props',
      description: 'Complete o defineProps e use as props no template.',
      xpReward: 30,
      template: `<script setup>
const props = ___({
  nome: ___,
  pontos: {
    type: ___,
    default: 0,
  },
})
</script>

<template>
  <div>
    <h2>{{ props.___ }}</h2>
    <p>{{ props.___ }} pontos</p>
  </div>
</template>`,
      blanks: ['defineProps', 'String', 'Number', 'nome', 'pontos'],
      solution: `<script setup>
const props = defineProps({
  nome: String,
  pontos: {
    type: Number,
    default: 0,
  },
})
</script>

<template>
  <div>
    <h2>{{ props.nome }}</h2>
    <p>{{ props.pontos }} pontos</p>
  </div>
</template>`,
      hint: 'defineProps() declara as props. Acesse com props.nome no template.',
    },
  ],
}
