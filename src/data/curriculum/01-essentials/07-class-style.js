export default {
  id: 'class-style',
  moduleId: 'essentials',
  title: 'Class & Style Bindings',
  icon: '🎨',
  xpReward: 30,
  docUrl: 'https://vuejs.org/guide/essentials/class-and-style',

  theory: [
    {
      title: ':class com objeto — classes condicionais',
      body: `Use :class com um objeto onde as chaves são nomes de classes e os valores são condições booleanas.
Vue adiciona a classe apenas quando o valor é truthy. Pode coexistir com o atributo class estático.`,
      code: `<script setup>
import { ref } from 'vue'
const isActive = ref(true)
const hasError = ref(false)
const isLoading = ref(false)
</script>

<template>
  <!-- Objeto inline -->
  <div :class="{ active: isActive, error: hasError }">...</div>

  <!-- Estático + dinâmico juntos -->
  <button class="btn" :class="{ loading: isLoading, disabled: !isActive }">
    Enviar
  </button>

  <!-- Resultado quando isActive=true, hasError=false: -->
  <!-- <div class="active">...</div> -->
</template>`,
    },
    {
      title: ':class com computed — objeto separado',
      body: `Para classes mais complexas, extraia o objeto para uma computed property.
Isso mantém o template limpo e a lógica testável.`,
      code: `<script setup>
import { ref, computed } from 'vue'

const status = ref('success') // 'success' | 'error' | 'warning'
const isLarge = ref(true)

// Objeto de classes em computed → template limpo
const cardClasses = computed(() => ({
  'card': true,
  'card--success': status.value === 'success',
  'card--error': status.value === 'error',
  'card--warning': status.value === 'warning',
  'card--large': isLarge.value,
}))
</script>

<template>
  <!-- Template limpo, lógica no computed -->
  <div :class="cardClasses">
    Mensagem de status
  </div>
</template>`,
    },
    {
      title: ':class com array — múltiplas classes',
      body: `Use um array para aplicar múltiplas classes. Pode misturar strings, refs e objetos dentro do array.`,
      code: `<script setup>
const baseClass = ref('btn')
const sizeClass = ref('btn--lg')
const isActive = ref(true)
const theme = 'dark'  // string estática
</script>

<template>
  <!-- Array de strings e refs -->
  <button :class="[baseClass, sizeClass]">Botão</button>

  <!-- Mistura de tudo: string, ref, objeto, ternário -->
  <div :class="[
    'container',
    theme,
    { active: isActive },
    isActive ? 'highlighted' : 'dimmed'
  ]">
    Conteúdo
  </div>
</template>`,
    },
    {
      title: ':style com objeto — estilos dinâmicos',
      body: `Use :style com um objeto CSS. As propriedades podem ser camelCase ou kebab-case (entre aspas).
Vue adiciona prefixos de vendor automaticamente quando necessário.`,
      code: `<script setup>
import { ref, computed } from 'vue'

const color = ref('#42b883')
const fontSize = ref(16)
const opacity = ref(1)

// Objeto de estilos em computed
const textStyle = computed(() => ({
  color: color.value,
  fontSize: fontSize.value + 'px',
  opacity: opacity.value,
  fontWeight: 'bold',
  textShadow: \`0 0 10px \${color.value}\`,
}))
</script>

<template>
  <!-- Objeto inline -->
  <p :style="{ color, fontSize: fontSize + 'px' }">Texto</p>

  <!-- computed (melhor prática) -->
  <p :style="textStyle">Texto com estilo</p>
</template>`,
    },
    {
      title: ':style com array — múltiplos objetos',
      body: `Passe um array de objetos de estilo para combinar múltiplos estilos.
O último objeto tem prioridade sobre os anteriores.`,
      code: `<script setup>
const baseStyles = {
  fontFamily: "'Fira Code', monospace",
  borderRadius: '8px',
  padding: '1rem',
}

const themeStyles = computed(() => ({
  background: isDark.value ? '#1a1a2e' : '#ffffff',
  color: isDark.value ? '#f8f8f2' : '#1a1a2e',
}))

const customStyles = { border: '2px solid #42b883' }
</script>

<template>
  <!-- Array combina todos os objetos -->
  <div :style="[baseStyles, themeStyles, customStyles]">
    Conteúdo estilizado
  </div>
</template>`,
    },
  ],

  flashcards: [
    {
      id: 'cs-fc-1',
      front: 'Como aplicar uma classe condicionalmente?',
      back: 'Use `:class` com objeto. A chave é o nome da classe, o valor é a condição.',
      code: `<div :class="{ active: isActive, error: hasError }">`,
      lessonTitle: 'Class & Style Bindings',
    },
    {
      id: 'cs-fc-2',
      front: 'Como combinar classes estáticas com dinâmicas?',
      back: 'Use `class="..."` e `:class="..."` juntos no mesmo elemento — Vue mescla automaticamente.',
      code: `<div class="card" :class="{ active: isActive }">`,
      lessonTitle: 'Class & Style Bindings',
    },
    {
      id: 'cs-fc-3',
      front: 'Como aplicar estilos inline dinâmicos?',
      back: 'Use `:style` com um objeto CSS. Propriedades em camelCase.',
      code: `<p :style="{ color: '#42b883', fontSize: size + 'px' }">`,
      lessonTitle: 'Class & Style Bindings',
    },
    {
      id: 'cs-fc-4',
      front: 'Quando usar computed para classes/estilos?',
      back: 'Quando a lógica é complexa — move a lógica para o script e deixa o template limpo.',
      code: `const classes = computed(() => ({
  active: isActive.value,
  error: hasError.value,
}))
// <div :class="classes">`,
      lessonTitle: 'Class & Style Bindings',
    },
    {
      id: 'cs-fc-5',
      front: 'Como passar múltiplas classes dinâmicas com array?',
      back: 'Use `:class` com array — pode misturar strings e objetos.',
      code: `<div :class="['base', sizeClass, { active: isActive }]">`,
      lessonTitle: 'Class & Style Bindings',
    },
  ],

  challenges: [
    {
      id: 'cs-ch-1',
      type: 'fill-blank',
      title: 'Classe condicional com objeto',
      description: 'Adicione a classe "highlight" quando `isHighlighted` for true, e "error" quando `hasError` for true.',
      xpReward: 20,
      template: `<template>
  <p ___="{ highlight: isHighlighted, error: hasError }">
    Texto com classes dinâmicas
  </p>
</template>`,
      blanks: [':class'],
      solution: `<template>
  <p :class="{ highlight: isHighlighted, error: hasError }">
    Texto com classes dinâmicas
  </p>
</template>`,
      hint: 'Use :class com um objeto. Chave = nome da classe, valor = condição.',
    },
    {
      id: 'cs-ch-2',
      type: 'fill-blank',
      title: 'Style dinâmico',
      description: 'Aplique as propriedades CSS `color` e `fontSize` dinamicamente ao parágrafo.',
      xpReward: 25,
      template: `<script setup>
import { ref } from 'vue'
const textColor = ref('#42b883')
const textSize = ref(18)
</script>

<template>
  <p ___="{ color: textColor, fontSize: textSize + 'px' }">
    Texto com estilo dinâmico
  </p>
</template>`,
      blanks: [':style'],
      solution: `<script setup>
import { ref } from 'vue'
const textColor = ref('#42b883')
const textSize = ref(18)
</script>

<template>
  <p :style="{ color: textColor, fontSize: textSize + 'px' }">
    Texto com estilo dinâmico
  </p>
</template>`,
      hint: 'Use :style com objeto. Propriedades CSS em camelCase.',
    },
    {
      id: 'cs-ch-3',
      type: 'fill-blank',
      title: 'Botão de toggle temático',
      description: 'Complete o :class e :style para alternar entre tema escuro e claro ao clicar.',
      xpReward: 40,
      template: `<script setup>
import { ref } from 'vue'
const isDark = ref(false)
</script>

<template>
  <button
    class="btn"
    ___="{ 'btn-dark': isDark, 'btn-light': !isDark }"
    ___="{ background: isDark ? '#1a1a2e' : '#f0f0f0', color: isDark ? '#f8f8f2' : '#1a1a2e' }"
    @click="isDark = !isDark"
  >
    {{ isDark ? '🌙 Modo escuro' : '☀️ Modo claro' }}
  </button>
</template>`,
      blanks: [':class', ':style'],
      solution: `<script setup>
import { ref } from 'vue'
const isDark = ref(false)
</script>

<template>
  <button
    class="btn"
    :class="{ 'btn-dark': isDark, 'btn-light': !isDark }"
    :style="{ background: isDark ? '#1a1a2e' : '#f0f0f0', color: isDark ? '#f8f8f2' : '#1a1a2e' }"
    @click="isDark = !isDark"
  >
    {{ isDark ? '🌙 Modo escuro' : '☀️ Modo claro' }}
  </button>
</template>`,
      hint: ':class com objeto condicional. :style com objeto CSS. class estático e :class coexistem.',
    },
    {
      id: 'cs-ch-4',
      type: 'fill-blank',
      title: 'Customizador de texto em tempo real',
      description: 'Complete a computed que monta o objeto de estilos e aplique-a no parágrafo.',
      xpReward: 50,
      template: `<script setup>
import { ref, computed } from 'vue'

const fontSize = ref(16)
const textColor = ref('#f8f8f2')
const bgColor = ref('#22212c')

const textStyle = ___(() => ({
  fontSize: fontSize.value + '___',
  color: ___,
  background: bgColor.value,
  padding: '1rem',
  borderRadius: '8px',
}))
</script>

<template>
  <div>
    <label>
      Tamanho: {{ fontSize }}px
      <input type="range" v-model.number="fontSize" min="12" max="32" />
    </label>
    <label>
      Cor do texto
      <input type="color" v-model="textColor" />
    </label>
    <p ___="textStyle">
      ✨ Customizando estilos em tempo real com Vue!
    </p>
  </div>
</template>`,
      blanks: ['computed', 'px', 'textColor.value', ':style'],
      solution: `<script setup>
import { ref, computed } from 'vue'

const fontSize = ref(16)
const textColor = ref('#f8f8f2')
const bgColor = ref('#22212c')

const textStyle = computed(() => ({
  fontSize: fontSize.value + 'px',
  color: textColor.value,
  background: bgColor.value,
  padding: '1rem',
  borderRadius: '8px',
}))
</script>

<template>
  <div>
    <label>
      Tamanho: {{ fontSize }}px
      <input type="range" v-model.number="fontSize" min="12" max="32" />
    </label>
    <label>
      Cor do texto
      <input type="color" v-model="textColor" />
    </label>
    <p :style="textStyle">
      ✨ Customizando estilos em tempo real com Vue!
    </p>
  </div>
</template>`,
      hint: 'computed retorna objeto CSS. fontSize precisa de "px". :style aplica o objeto de estilos.',
    },
    {
      id: 'cs-ch-5',
      type: 'fix-bug',
      title: 'Classes e estilos com bugs',
      description: 'O código tem erros: class binding usando string em vez de objeto, e fontSize sem unidade px. Corrija.',
      xpReward: 30,
      buggyCode: `<script setup>
import { ref } from 'vue'
const isActive = ref(true)
const size = ref(16)
const mood = ref('happy')
</script>

<template>
  <!-- Bug 1: string não é objeto condicional -->
  <div :class="isActive ? 'active' : '' + 'card'">

  <!-- Bug 2: fontSize sem px -->
  <p :style="{ fontSize: size, color: 'green' }">Texto</p>

  <!-- Bug 3: array com objeto mal formado -->
  <span :class="['badge', mood === 'happy' : 'green' : 'red']">
    Badge
  </span>
</template>`,
      solution: `<script setup>
import { ref } from 'vue'
const isActive = ref(true)
const size = ref(16)
const mood = ref('happy')
</script>

<template>
  <!-- Correto: objeto condicional + classe estática -->
  <div class="card" :class="{ active: isActive }">

  <!-- Correto: fontSize com px -->
  <p :style="{ fontSize: size + 'px', color: 'green' }">Texto</p>

  <!-- Correto: array com ternário para string -->
  <span :class="['badge', mood === 'happy' ? 'green' : 'red']">
    Badge
  </span>
</template>`,
      explanation: '1) Use :class com objeto { active: isActive }. 2) fontSize precisa de + "px". 3) Ternário usa ? e :, não : e :.',
    },
  ],
}
