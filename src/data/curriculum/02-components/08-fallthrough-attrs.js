export default {
  id: 'fallthrough-attrs',
  moduleId: 'components',
  title: 'Fallthrough Attributes',
  icon: '🌊',
  xpReward: 35,
  docUrl: 'https://vuejs.org/guide/components/attrs',

  theory: [
    {
      title: 'O que são fallthrough attributes?',
      body: `Quando você passa atributos para um componente que ele não declarou como prop (nem como emit), eles "caem através" para o elemento raiz do componente automaticamente.
class, style, id e event listeners são os casos mais comuns. Isso permite configurar o componente de fora sem precisar redeclarar cada atributo.`,
      code: `<!-- BotaoBase.vue — sem declarar class como prop -->
<template>
  <button>Clique</button>
</template>

<!-- Pai passa class e id -->
<BotaoBase class="btn-primario" id="meu-botao" />

<!-- HTML gerado: -->
<!-- <button class="btn-primario" id="meu-botao">Clique</button> -->

<!-- Mesmo com classes existentes — Vue mescla: -->
<!-- BotaoBase tem class="btn" internamente -->
<!-- Pai passa class="btn-grande" -->
<!-- Resultado: class="btn btn-grande" -->`,
    },
    {
      title: '$attrs — acessando os atributos não declarados',
      body: `$attrs é um objeto que contém todos os atributos fallthrough. Você pode usá-lo no template para acessar ou repassar esses atributos manualmente.
Inclui class, style, id e event listeners (como @click passado do pai).`,
      code: `<!-- Acessando $attrs no template -->
<script setup>
import { useAttrs } from 'vue'

const attrs = useAttrs()
</script>

<template>
  <div>
    <!-- $attrs inclui tudo: class, style, eventos... -->
    <p>Atributos recebidos: {{ JSON.stringify($attrs) }}</p>

    <!-- Repassar manualmente para elemento interno -->
    <input v-bind="$attrs" />
  </div>
</template>`,
    },
    {
      title: 'inheritAttrs: false — desabilitando fallthrough automático',
      body: `Por padrão, fallthrough é automático no elemento raiz. Use inheritAttrs: false quando quiser controlar onde os atributos são aplicados — por exemplo, num elemento interno em vez da raiz.`,
      code: `<!-- InputComLabel.vue -->
<script>
export default { inheritAttrs: false }
</script>

<script setup>
const props = defineProps({ label: String })
</script>

<template>
  <div class="input-wrapper">
    <label>{{ props.label }}</label>
    <!-- Atributos do pai vão para o input, não para o div -->
    <input v-bind="$attrs" />
  </div>
</template>

<!-- Pai: -->
<InputComLabel
  label="Email"
  type="email"
  placeholder="seu@email.com"
  class="input-grande"
/>
<!-- type, placeholder e class vão para o <input>, não para o <div> -->`,
    },
    {
      title: 'Event listeners em $attrs',
      body: `Listeners como @click também fazem parte do $attrs. Quando você usa v-bind="$attrs", os listeners são incluídos automaticamente. Isso permite criar wrappers que repassa eventos sem precisar redeclará-los.`,
      code: `<!-- BotaoWrapper.vue -->
<script>
export default { inheritAttrs: false }
</script>

<template>
  <div class="wrapper">
    <!-- v-bind="$attrs" inclui @click, @focus, etc do pai -->
    <button class="btn" v-bind="$attrs">
      <slot />
    </button>
  </div>
</template>

<!-- Pai: -->
<BotaoWrapper
  @click="handleClick"
  @focus="handleFocus"
  class="btn-grande"
>
  Enviar
</BotaoWrapper>
<!-- @click e @focus vão para o <button>, não para o <div> -->`,
    },
    {
      title: 'Múltiplos elementos raiz',
      body: `Se o componente tem múltiplos elementos raiz (fragments), Vue não sabe onde aplicar os fallthrough attrs e emite um aviso. Você precisa usar v-bind="$attrs" explicitamente no elemento desejado.`,
      code: `<!-- ❌ Vue avisa: não sabe onde aplicar os attrs -->
<template>
  <header>...</header>
  <main>...</main>
</template>

<!-- ✅ Diga explicitamente onde -->
<script>
export default { inheritAttrs: false }
</script>

<template>
  <header v-bind="$attrs">...</header>
  <main>...</main>
</template>

<!-- Ou aplique em elemento específico: -->
<template>
  <header>...</header>
  <main v-bind="$attrs">...</main>
</template>`,
    },
  ],

  flashcards: [
    {
      id: 'attrs-fc-1',
      front: 'O que são fallthrough attributes?',
      back: 'Atributos passados para um componente que não são props/emits — class, style, id, listeners — são aplicados automaticamente ao elemento raiz do componente.',
      code: `<MeuBtn class="grande" @click="handler" />
// class e @click vão para o raiz de MeuBtn`,
      lessonTitle: 'Fallthrough Attributes',
    },
    {
      id: 'attrs-fc-2',
      front: 'Como acessar os fallthrough attributes no componente?',
      back: 'Via `$attrs` no template ou `useAttrs()` no script.',
      code: `// Script
import { useAttrs } from 'vue'
const attrs = useAttrs()

// Template
<input v-bind="$attrs" />`,
      lessonTitle: 'Fallthrough Attributes',
    },
    {
      id: 'attrs-fc-3',
      front: 'Como desabilitar o fallthrough automático?',
      back: '`inheritAttrs: false` no options object. Então aplique `$attrs` manualmente onde quiser.',
      code: `<script>
export default { inheritAttrs: false }
</script>
// Agora: <input v-bind="$attrs" />`,
      lessonTitle: 'Fallthrough Attributes',
    },
    {
      id: 'attrs-fc-4',
      front: 'Os event listeners (@click) fazem parte do $attrs?',
      back: 'Sim — `v-bind="$attrs"` inclui listeners. Isso permite criar wrappers sem redeclarar eventos.',
      code: `// Pai: <Btn @click="fn" />
// Filho com inheritAttrs:false:
<button v-bind="$attrs">  // @click está aqui`,
      lessonTitle: 'Fallthrough Attributes',
    },
    {
      id: 'attrs-fc-5',
      front: 'O que acontece com fallthrough em componentes com múltiplos elementos raiz?',
      back: 'Vue emite aviso pois não sabe onde aplicar. Use `inheritAttrs: false` e `v-bind="$attrs"` no elemento desejado.',
      code: `// Múltiplas raízes: use explicitamente
<header v-bind="$attrs">...
<main>...`,
      lessonTitle: 'Fallthrough Attributes',
    },
  ],

  challenges: [
    {
      id: 'attrs-ch-1',
      type: 'fill-blank',
      title: 'Repassar $attrs para elemento interno',
      description: 'Complete o InputField para que type, placeholder e class do pai vão para o <input>, não para o <div>.',
      xpReward: 25,
      template: `<!-- InputField.vue -->
<script>
export default { inheritAttrs: ___ }
</script>

<script setup>
defineProps({ label: String })
</script>

<template>
  <div class="field">
    <label>{{ label }}</label>
    <input v-bind="___" />
  </div>
</template>`,
      blanks: ['false', '$attrs'],
      solution: `<!-- InputField.vue -->
<script>
export default { inheritAttrs: false }
</script>

<script setup>
defineProps({ label: String })
</script>

<template>
  <div class="field">
    <label>{{ label }}</label>
    <input v-bind="$attrs" />
  </div>
</template>`,
      hint: 'inheritAttrs: false desativa o fallthrough automático. v-bind="$attrs" aplica manualmente.',
    },
    {
      id: 'attrs-ch-2',
      type: 'fill-blank',
      title: 'Acessar $attrs no script',
      description: 'Complete para acessar $attrs via useAttrs() e exibir a classe recebida.',
      xpReward: 30,
      template: `<script setup>
import { ___ } from 'vue'

const attrs = ___()
</script>

<template>
  <div>
    <p>Classe: {{ attrs.___ }}</p>
    <slot />
  </div>
</template>`,
      blanks: ['useAttrs', 'useAttrs', 'class'],
      solution: `<script setup>
import { useAttrs } from 'vue'

const attrs = useAttrs()
</script>

<template>
  <div>
    <p>Classe: {{ attrs.class }}</p>
    <slot />
  </div>
</template>`,
      hint: 'useAttrs() retorna o mesmo objeto que $attrs no template.',
    },
    {
      id: 'attrs-ch-3',
      type: 'fill-blank',
      title: 'Wrapper com eventos repassados',
      description: 'Complete o BotaoWrapper para repassar todos os atributos (incluindo @click) para o <button> interno.',
      xpReward: 30,
      template: `<!-- BotaoWrapper.vue -->
<script>
export default { inheritAttrs: false }
</script>

<template>
  <div class="wrapper">
    <button class="btn" ___="___">
      <slot>Clique</slot>
    </button>
  </div>
</template>`,
      blanks: ['v-bind', '$attrs'],
      solution: `<!-- BotaoWrapper.vue -->
<script>
export default { inheritAttrs: false }
</script>

<template>
  <div class="wrapper">
    <button class="btn" v-bind="$attrs">
      <slot>Clique</slot>
    </button>
  </div>
</template>`,
      hint: 'v-bind="$attrs" aplica todos os atributos, incluindo @click e outras classes.',
    },
    {
      id: 'attrs-ch-4',
      type: 'fill-blank',
      title: 'Múltiplos elementos raiz',
      description: 'Complete para aplicar $attrs no <main> e desabilitar o fallthrough automático.',
      xpReward: 30,
      template: `<script>
export default { inheritAttrs: ___ }
</script>

<template>
  <header>Cabeçalho</header>
  <main ___="$attrs">
    <slot />
  </main>
</template>`,
      blanks: ['false', 'v-bind'],
      solution: `<script>
export default { inheritAttrs: false }
</script>

<template>
  <header>Cabeçalho</header>
  <main v-bind="$attrs">
    <slot />
  </main>
</template>`,
      hint: 'Com múltiplas raízes, inheritAttrs: false é necessário. Aplique v-bind="$attrs" onde quiser.',
    },
    {
      id: 'attrs-ch-5',
      type: 'fix-bug',
      title: 'Bugs nos fallthrough attributes',
      description: 'O componente tem 3 erros no uso de fallthrough attributes. Encontre e corrija.',
      xpReward: 35,
      buggyCode: `<!-- InputWrapper.vue -->
<script setup>
import { useAttrs } from 'vue'
const attrs = useAttrs()

defineProps({ label: String })
</script>

<template>
  <div class="wrapper">
    <label>{{ label }}</label>
    <input v-bind="attrs" />
  </div>
</template>

<!-- Pai: -->
<InputWrapper label="Nome" class="input-lg" placeholder="Digite..." />`,
      solution: `<!-- InputWrapper.vue -->
<script>
export default { inheritAttrs: false }
</script>

<script setup>
import { useAttrs } from 'vue'
const attrs = useAttrs()

defineProps({ label: String })
</script>

<template>
  <div class="wrapper">
    <label>{{ label }}</label>
    <input v-bind="attrs" />
  </div>
</template>`,
      explanation: '1) Falta inheritAttrs: false — sem isso, class e placeholder vão para o <div> E para o <input> (duplicados). 2) inheritAttrs: false deve ser em um bloco <script> separado (não script setup). 3) Sem inheritAttrs: false, v-bind="attrs" e fallthrough automático causam atributos duplicados.',
    },
  ],
}
