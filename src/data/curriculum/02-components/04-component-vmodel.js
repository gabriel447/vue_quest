export default {
  id: 'component-vmodel',
  moduleId: 'components',
  title: 'Component v-model',
  icon: '🔁',
  xpReward: 40,
  docUrl: 'https://vuejs.org/guide/components/v-model',

  theory: [
    {
      title: 'v-model em componentes — o que acontece por baixo',
      body: `Quando você usa v-model num componente, Vue expande para :modelValue + @update:modelValue. O componente filho recebe o valor via prop modelValue e notifica mudanças emitindo update:modelValue.
Esse padrão é convenção — a prop e o evento têm nomes fixos por padrão.`,
      code: `<!-- O que você escreve: -->
<MeuInput v-model="texto" />

<!-- O que Vue expande para: -->
<MeuInput
  :modelValue="texto"
  @update:modelValue="texto = $event"
/>

<!-- Filho precisa implementar: -->
<script setup>
defineProps({ modelValue: String })
defineEmits(['update:modelValue'])
</script>`,
    },
    {
      title: 'defineModel() — Vue 3.4+',
      body: `No Vue 3.4+, use defineModel() para simplificar. Ele cria a prop modelValue e o emit update:modelValue automaticamente e retorna uma ref que você pode ler e escrever diretamente.`,
      code: `<!-- Filho com defineModel (Vue 3.4+) -->
<script setup>
const model = defineModel()
</script>

<template>
  <input
    :value="model"
    @input="model = $event.target.value"
  />
  <!-- Ou mais simples com v-model: -->
  <input v-model="model" />
</template>

<!-- Pai usa normalmente: -->
<MeuInput v-model="texto" />`,
    },
    {
      title: 'v-model manual (sem defineModel)',
      body: `Se não usar defineModel, implemente manualmente: receba modelValue como prop e emita update:modelValue. É mais verboso mas útil para entender o que acontece.`,
      code: `<!-- Implementação manual -->
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

<!-- Pai usa com v-model: -->
<MeuInput v-model="nome" />`,
    },
    {
      title: 'Múltiplos v-models',
      body: `Um componente pode ter múltiplos v-models com nomes customizados. Defina o nome após v-model: no pai. No filho, o nome vira o nome da prop e do evento de atualização.`,
      code: `<!-- Pai: v-model:nome e v-model:email -->
<FormCadastro
  v-model:nome="dados.nome"
  v-model:email="dados.email"
/>

<!-- Filho com defineModel nomeado: -->
<script setup>
const nome = defineModel('nome')
const email = defineModel('email')
</script>

<template>
  <input v-model="nome" placeholder="Nome" />
  <input v-model="email" type="email" placeholder="Email" />
</template>`,
    },
    {
      title: 'Quando usar v-model vs props + emit',
      body: `Use v-model quando o componente representa um "valor editável" — como um input customizado, um date picker, um color picker. Use props + emit para outros tipos de comunicação.
v-model é uma convenção de interface: quem usa seu componente espera que um v-model simples "funcione".`,
      code: `<!-- ✅ Use v-model: componentes de input -->
<MeuInput v-model="nome" />
<MeuSelect v-model="opcao" />
<MeuDatePicker v-model="data" />

<!-- ✅ Use props + emit: outros casos -->
<CardProduto :produto="item" @comprar="checkout" />
<Modal :aberto="isOpen" @fechar="isOpen = false" />
<Tabela :dados="rows" @ordenar="handleSort" />`,
    },
  ],

  flashcards: [
    {
      id: 'vmodel-fc-1',
      front: 'O que v-model em um componente expande para?',
      back: '`:modelValue="val"` + `@update:modelValue="val = $event"`',
      code: `<MeuInput v-model="texto" />
// equivale a:
<MeuInput :modelValue="texto" @update:modelValue="texto = $event" />`,
      lessonTitle: 'Component v-model',
    },
    {
      id: 'vmodel-fc-2',
      front: 'O que faz defineModel() no Vue 3.4+?',
      back: 'Cria automaticamente a prop `modelValue` e o emit `update:modelValue`, retornando uma ref mutável.',
      code: `const model = defineModel()
// agora model.value é leitura + escrita
<input v-model="model" />`,
      lessonTitle: 'Component v-model',
    },
    {
      id: 'vmodel-fc-3',
      front: 'Como implementar v-model manualmente (sem defineModel)?',
      back: 'Prop `modelValue` + emit `update:modelValue`.',
      code: `defineProps({ modelValue: String })
defineEmits(['update:modelValue'])
// template: :value + @input emit`,
      lessonTitle: 'Component v-model',
    },
    {
      id: 'vmodel-fc-4',
      front: 'Como criar múltiplos v-models em um componente?',
      back: 'Use `v-model:nome` no pai. No filho, `defineModel(\'nome\')`.',
      code: `// Pai
<Form v-model:nome="n" v-model:email="e" />

// Filho
const nome = defineModel('nome')
const email = defineModel('email')`,
      lessonTitle: 'Component v-model',
    },
    {
      id: 'vmodel-fc-5',
      front: 'Quando usar v-model vs props + emit?',
      back: 'v-model para componentes de input (valor editável). Props + emit para outros tipos de comunicação.',
      code: `// ✅ v-model: input customizado
<MeuInput v-model="texto" />

// ✅ props+emit: lógica de negócio
<Card :item="p" @comprar="checkout" />`,
      lessonTitle: 'Component v-model',
    },
  ],

  challenges: [
    {
      id: 'vmodel-ch-1',
      type: 'fill-blank',
      title: 'v-model com defineModel',
      description: 'Complete o componente InputTexto usando defineModel para funcionar com v-model.',
      xpReward: 25,
      template: `<!-- InputTexto.vue -->
<script setup>
const model = ___()
</script>

<template>
  <input v-___="model" class="input" />
</template>

<!-- Uso no pai: -->
<!-- <InputTexto v-model="nome" /> -->`,
      blanks: ['defineModel', 'model'],
      solution: `<!-- InputTexto.vue -->
<script setup>
const model = defineModel()
</script>

<template>
  <input v-model="model" class="input" />
</template>`,
      hint: 'defineModel() cria a prop e o emit automaticamente. v-model no input interno funciona normalmente.',
    },
    {
      id: 'vmodel-ch-2',
      type: 'fill-blank',
      title: 'v-model manual',
      description: 'Implemente v-model manualmente: prop modelValue + emit update:modelValue.',
      xpReward: 30,
      template: `<script setup>
const props = defineProps({ ___: String })
const emit = defineEmits(['___:modelValue'])
</script>

<template>
  <input
    :value="props.modelValue"
    @input="emit('update:modelValue', $event.target.___)"
  />
</template>`,
      blanks: ['modelValue', 'update', 'value'],
      solution: `<script setup>
const props = defineProps({ modelValue: String })
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <input
    :value="props.modelValue"
    @input="emit('update:modelValue', $event.target.value)"
  />
</template>`,
      hint: 'A prop é modelValue, o evento é update:modelValue. $event.target.value captura o texto do input.',
    },
    {
      id: 'vmodel-ch-3',
      type: 'fill-blank',
      title: 'Múltiplos v-models',
      description: 'Complete o FormLogin com dois v-models: email e senha.',
      xpReward: 35,
      template: `<!-- FormLogin.vue -->
<script setup>
const email = defineModel('___')
const senha = defineModel('___')
</script>

<template>
  <input v-model="email" type="email" placeholder="Email" />
  <input v-model="senha" type="password" placeholder="Senha" />
</template>

<!-- Pai:
<FormLogin v-model:email="form.email" v-model:senha="form.senha" />
-->`,
      blanks: ['email', 'senha'],
      solution: `<!-- FormLogin.vue -->
<script setup>
const email = defineModel('email')
const senha = defineModel('senha')
</script>

<template>
  <input v-model="email" type="email" placeholder="Email" />
  <input v-model="senha" type="password" placeholder="Senha" />
</template>`,
      hint: 'defineModel(\'nome\') cria um v-model nomeado. No pai: v-model:nome="valor".',
    },
    {
      id: 'vmodel-ch-4',
      type: 'fill-blank',
      title: 'Usando v-model no pai',
      description: 'Complete o pai para usar v-model com o MeuInput e exibir o valor digitado.',
      xpReward: 25,
      template: `<script setup>
import { ref } from 'vue'
import MeuInput from './MeuInput.vue'

const texto = ___('' )
</script>

<template>
  <MeuInput ___="texto" />
  <p>Você digitou: {{ ___ }}</p>
</template>`,
      blanks: ['ref', 'v-model', 'texto'],
      solution: `<script setup>
import { ref } from 'vue'
import MeuInput from './MeuInput.vue'

const texto = ref('')
</script>

<template>
  <MeuInput v-model="texto" />
  <p>Você digitou: {{ texto }}</p>
</template>`,
      hint: 'v-model no componente filho funciona igual ao v-model em inputs nativos.',
    },
    {
      id: 'vmodel-ch-5',
      type: 'fix-bug',
      title: 'Bugs no v-model de componente',
      description: 'O componente tem 3 erros na implementação do v-model. Encontre e corrija.',
      xpReward: 40,
      buggyCode: `<!-- InputCustom.vue -->
<script setup>
const props = defineProps({ value: String })
const emit = defineEmits(['input'])
</script>

<template>
  <input
    :value="props.value"
    @input="emit('input', $event.target.value)"
  />
</template>

<!-- Pai usa v-model: -->
<!-- <InputCustom v-model="texto" /> -->`,
      solution: `<!-- InputCustom.vue -->
<script setup>
const props = defineProps({ modelValue: String })
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <input
    :value="props.modelValue"
    @input="emit('update:modelValue', $event.target.value)"
  />
</template>`,
      explanation: '1) A prop deve se chamar modelValue, não value — é a convenção do v-model. 2) O evento deve ser update:modelValue, não input — Vue espera esse nome. 3) No template, props.value → props.modelValue para bater com a prop correta.',
    },
  ],
}
