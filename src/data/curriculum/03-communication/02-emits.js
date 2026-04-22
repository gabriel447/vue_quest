export default {
  id: 'emits',
  moduleId: 'communication',
  title: 'Emits',
  icon: '📢',
  xpReward: 30,
  docUrl: 'https://vuejs.org/guide/components/events',

  theory: [
    {
      title: 'Emits — o grito do filho',
      body: `Emits é o "grito" — o filho avisa o pai que algo aconteceu. O fluxo é de baixo para cima: filho → pai. O filho emite um evento com um nome e dados, o pai escuta com @evento.`,
      code: `<!-- Filho: BotaoContador.vue -->
<script setup>
const emit = defineEmits(['incrementar', 'resetar'])

function clicar() {
  emit('incrementar', 10) // emite com valor
}
</script>

<template>
  <button @click="clicar">+10</button>
  <button @click="emit('resetar')">Reset</button>
</template>

<!-- Pai -->
<template>
  <BotaoContador
    @incrementar="pontos += $event"
    @resetar="pontos = 0"
  />
</template>`,
    },
    {
      title: 'Validação de emits',
      body: `Assim como props, você pode validar os eventos emitidos. Isso documenta o componente e previne erros.`,
      code: `<script setup>
const emit = defineEmits({
  // Sem validação
  fechar: null,

  // Com validação — retorna true se válido
  submeter: (dados) => {
    return dados.email && dados.senha
  },
})
</script>`,
    },
    {
      title: 'Props + Emits — o padrão completo de comunicação',
      body: `Props descem dados do pai para o filho. Emits sobem eventos do filho para o pai. Juntos formam o padrão completo de comunicação entre componentes.`,
      code: `<!-- Filho: InputCustomizado.vue -->
<script setup>
const props = defineProps({ modelValue: String })
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <input
    :value="props.modelValue"
    @input="emit('update:modelValue', $event.target.value)"
  />
</template>

<!-- Pai pode usar v-model! -->
<template>
  <InputCustomizado v-model="texto" />
</template>`,
    },
  ],

  flashcards: [
    {
      id: 'emits-fc-1',
      front: 'O que são emits e como o filho avisa o pai?',
      back: 'Emits são eventos do filho para o pai. O filho emite com emit("evento", dados), o pai escuta com @evento.',
      code: `// Filho: emit('salvar', dados)
// Pai: @salvar="handler"`,
      lessonTitle: 'Emits',
    },
    {
      id: 'emits-fc-2',
      front: 'Como declarar os eventos que um componente pode emitir?',
      back: 'Use defineEmits(["evento1", "evento2"]) no <script setup>.',
      code: `const emit = defineEmits(['fechar', 'salvar'])`,
      lessonTitle: 'Emits',
    },
    {
      id: 'emits-fc-3',
      front: 'Como passar dados junto com o emit?',
      back: 'Passe como segundo argumento: emit("evento", dados). O pai recebe via $event ou parâmetro do handler.',
      code: `emit('selecionar', { id: 1, nome: 'Ana' })
// Pai: @selecionar="item => console.log(item)"`,
      lessonTitle: 'Emits',
    },
  ],

  challenges: [
    {
      id: 'emits-ch-1',
      type: 'fill-blank',
      title: 'Botão que emite evento',
      description: 'Complete o defineEmits e emita o evento "curtir" com a quantidade ao clicar.',
      xpReward: 30,
      template: `<script setup>
const props = defineProps({ titulo: String })
const emit = ___(['curtir'])

function curtir() {
  ___(\'curtir\', 1)
}
</script>

<template>
  <div>
    <h3>{{ props.titulo }}</h3>
    <button @___="curtir">❤️ Curtir</button>
  </div>
</template>`,
      blanks: ['defineEmits', 'emit', 'click'],
      solution: `<script setup>
const props = defineProps({ titulo: String })
const emit = defineEmits(['curtir'])

function curtir() {
  emit('curtir', 1)
}
</script>

<template>
  <div>
    <h3>{{ props.titulo }}</h3>
    <button @click="curtir">❤️ Curtir</button>
  </div>
</template>`,
      hint: 'defineEmits declara os eventos. emit("nome", dados) os dispara. O pai escuta com @nome.',
    },
  ],
}
