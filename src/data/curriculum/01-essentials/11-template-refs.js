export default {
  id: 'template-refs',
  moduleId: 'essentials',
  title: 'Template Refs',
  icon: '🎯',
  xpReward: 30,
  docUrl: 'https://vuejs.org/guide/essentials/template-refs',

  theory: [
    {
      title: 'Acessando o DOM diretamente com ref',
      body: `Vue abstrai o DOM — você raramente precisa acessá-lo diretamente. Mas às vezes é necessário: dar foco, medir dimensões, integrar com bibliotecas externas.
Declare uma ref(null) com o mesmo nome do atributo ref no template.`,
      code: `<script setup>
import { ref, onMounted } from 'vue'

// Deve ter o mesmo nome do atributo ref no template
const inputEl = ref(null)
const divEl = ref(null)

onMounted(() => {
  // ✅ Disponível apenas após onMounted — o DOM existe aqui
  inputEl.value.focus()

  const rect = divEl.value.getBoundingClientRect()
  console.log('Largura:', rect.width)
  console.log('Altura:', rect.height)
})

// ❌ Null antes de onMounted — o DOM não existe ainda
// console.log(inputEl.value) // null
</script>

<template>
  <input ref="inputEl" placeholder="Auto-foco!" />
  <div ref="divEl">Meu conteúdo</div>
</template>`,
    },
    {
      title: 'Template refs e o ciclo de vida',
      body: `A ref do template é null até o componente ser montado. Respeite o ciclo de vida ao acessá-la.
Use computed ou watch com cuidado — a ref pode ser null se o elemento for condicional.`,
      code: `<script setup>
import { ref, watch, onMounted } from 'vue'

const textEl = ref(null)
const isVisible = ref(true)

// ✅ Verifique se o elemento existe antes de usar
watch(isVisible, (visible) => {
  if (visible && textEl.value) {
    textEl.value.classList.add('animate')
  }
})

onMounted(() => {
  // ✅ Aqui é garantido que textEl.value existe
  console.log('Elemento:', textEl.value)
})
</script>

<template>
  <!-- ref é null quando v-if é false -->
  <p v-if="isVisible" ref="textEl">
    Texto condicional
  </p>
</template>`,
    },
    {
      title: 'refs em v-for — array de elementos',
      body: `Quando ref é usado dentro de v-for, a ref resultante é um array de todos os elementos renderizados.
O array é preenchido após a montagem.`,
      code: `<script setup>
import { ref, onMounted } from 'vue'

const itemRefs = ref([])
const items = ['Vue', 'React', 'Angular', 'Svelte']

onMounted(() => {
  console.log(itemRefs.value)         // array de elementos <li>
  console.log(itemRefs.value.length)  // 4

  // Pode manipular cada elemento
  itemRefs.value.forEach((el, i) => {
    el.style.animationDelay = \`\${i * 0.1}s\`
  })
})
</script>

<template>
  <ul>
    <li
      v-for="item in items"
      :key="item"
      ref="itemRefs"
    >
      {{ item }}
    </li>
  </ul>
</template>`,
    },
    {
      title: 'Acessando componentes filhos com ref',
      body: `ref também funciona em componentes. Com <script setup>, o filho deve usar defineExpose() para tornar suas propriedades acessíveis ao pai.
Sem defineExpose(), nada do filho é acessível.`,
      code: `<!-- Filho.vue -->
<script setup>
import { ref } from 'vue'

const count = ref(0)
const inputEl = ref(null)

function increment() { count.value++ }
function focus() { inputEl.value?.focus() }

// Expõe explicitamente o que o pai pode acessar
defineExpose({ count, increment, focus })
</script>

<template>
  <input ref="inputEl" v-model="count" />
</template>

<!-- Pai.vue -->
<script setup>
import Filho from './Filho.vue'
const filhoRef = ref(null)

function chamarFilho() {
  filhoRef.value.increment()    // ✅ exposto
  filhoRef.value.focus()        // ✅ exposto
  // filhoRef.value.inputEl   // ❌ não exposto
}
</script>

<template>
  <Filho ref="filhoRef" />
  <button @click="chamarFilho">Interagir com filho</button>
</template>`,
    },
    {
      title: 'Integrando bibliotecas externas com refs',
      body: `O uso mais comum de template refs: inicializar bibliotecas JavaScript externas que precisam de um elemento DOM real.`,
      code: `<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
// Exemplo conceitual — qualquer lib que precise do DOM

const chartEl = ref(null)
const mapEl = ref(null)
let chartInstance = null

onMounted(() => {
  // Inicializa biblioteca com o elemento DOM
  chartInstance = new Chart(chartEl.value, {
    type: 'line',
    data: chartData,
  })

  // Leaflet, Three.js, Flatpickr, etc. — mesmo padrão
  const map = L.map(mapEl.value).setView([0, 0], 13)
})

onUnmounted(() => {
  // ✅ Destrua instâncias para evitar memory leaks
  chartInstance?.destroy()
})
</script>

<template>
  <canvas ref="chartEl"></canvas>
  <div ref="mapEl" style="height: 400px"></div>
</template>`,
    },
  ],

  flashcards: [
    {
      id: 'tr-fc-1',
      front: 'Como acessar um elemento DOM diretamente?',
      back: 'Declare `ref(null)` com o mesmo nome do atributo `ref` no template. O elemento fica disponível após `onMounted`.',
      code: `const inputEl = ref(null)
onMounted(() => inputEl.value.focus())
// <input ref="inputEl" />`,
      lessonTitle: 'Template Refs',
    },
    {
      id: 'tr-fc-2',
      front: 'Por que a template ref é null antes de onMounted?',
      back: 'O DOM só existe após a montagem. Antes disso, `el.value` é `null`.',
      code: `// setup      → el.value === null
// onMounted  → el.value === <elemento DOM>`,
      lessonTitle: 'Template Refs',
    },
    {
      id: 'tr-fc-3',
      front: 'O que acontece com ref dentro de v-for?',
      back: 'A ref vira um **array** com todos os elementos renderizados.',
      code: `const itemRefs = ref([])
// <li v-for="item in items" ref="itemRefs">
// itemRefs.value → array de <li>`,
      lessonTitle: 'Template Refs',
    },
    {
      id: 'tr-fc-4',
      front: 'Como expor métodos de um filho com script setup?',
      back: 'Use `defineExpose()`. Sem ele, o pai não acessa nada do filho por ref.',
      code: `// Filho.vue
defineExpose({ count, increment })

// Pai: filhoRef.value.increment()`,
      lessonTitle: 'Template Refs',
    },
    {
      id: 'tr-fc-5',
      front: 'Como integrar uma biblioteca JS externa com Vue?',
      back: 'Inicialize em `onMounted` (DOM disponível) e destrua em `onUnmounted` (evitar memory leak).',
      code: `onMounted(() => { instance = new Lib(el.value) })
onUnmounted(() => { instance?.destroy() })`,
      lessonTitle: 'Template Refs',
    },
  ],

  challenges: [
    {
      id: 'tr-ch-1',
      type: 'fill-blank',
      title: 'Auto-foco no input',
      description: 'Complete o código para dar foco automático ao input assim que o componente for montado.',
      xpReward: 25,
      template: `<script setup>
import { ref, onMounted } from 'vue'

const ___ = ref(null)

onMounted(() => {
  inputEl.value.___()
})
</script>

<template>
  <input ref="inputEl" placeholder="Foco automático aqui!" />
</template>`,
      blanks: ['inputEl', 'focus'],
      solution: `<script setup>
import { ref, onMounted } from 'vue'

const inputEl = ref(null)

onMounted(() => {
  inputEl.value.focus()
})
</script>

<template>
  <input ref="inputEl" placeholder="Foco automático aqui!" />
</template>`,
      hint: 'Declare ref(null) com o mesmo nome do atributo ref. Use .focus() em onMounted.',
    },
    {
      id: 'tr-ch-2',
      type: 'fill-blank',
      title: 'Medidor de dimensões',
      description: 'Complete: leia as dimensões via getBoundingClientRect() e adicione/remova o listener de resize.',
      xpReward: 45,
      template: `<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const boxEl = ___(null)
const dimensions = ref(null)

function measure() {
  if (!boxEl.value) return
  const rect = boxEl.value.___()
  dimensions.value = {
    width: Math.round(rect.width),
    height: Math.round(rect.height),
  }
}

onMounted(() => {
  measure()
  window.addEventListener('resize', measure)
})

onUnmounted(() => {
  window.___(resize', measure)
})
</script>

<template>
  <div ref="boxEl" style="padding: 2rem; background: #22212c; border-radius: 8px">
    Redimensione a janela para ver as dimensões mudarem!
  </div>
  <button @click="measure">📐 Medir</button>
  <p v-if="dimensions">{{ dimensions.width }}px × {{ dimensions.height }}px</p>
</template>`,
      blanks: ['ref', 'getBoundingClientRect', 'removeEventListener(\''],
      solution: `<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const boxEl = ref(null)
const dimensions = ref(null)

function measure() {
  if (!boxEl.value) return
  const rect = boxEl.value.getBoundingClientRect()
  dimensions.value = {
    width: Math.round(rect.width),
    height: Math.round(rect.height),
  }
}

onMounted(() => {
  measure()
  window.addEventListener('resize', measure)
})

onUnmounted(() => {
  window.removeEventListener('resize', measure)
})
</script>

<template>
  <div ref="boxEl" style="padding: 2rem; background: #22212c; border-radius: 8px">
    Redimensione a janela para ver as dimensões mudarem!
  </div>
  <button @click="measure">📐 Medir</button>
  <p v-if="dimensions">{{ dimensions.width }}px × {{ dimensions.height }}px</p>
</template>`,
      hint: 'ref(null) + ref="boxEl" conecta ao elemento. getBoundingClientRect() lê dimensões. removeEventListener limpa o resize.',
    },
    {
      id: 'tr-ch-3',
      type: 'fill-blank',
      title: 'Textarea com contador de caracteres',
      description: 'Complete: contador de chars com computed, cor vermelha perto do limite, e scroll até o fim.',
      xpReward: 40,
      template: `<script setup>
import { ref, computed } from 'vue'

const textareaEl = ref(null)
const content = ref('')

const charCount = ___(() => content.value.___)

const isNearLimit = computed(() => charCount.value > 180)

function scrollToEnd() {
  if (textareaEl.value) {
    textareaEl.value.scrollTop = textareaEl.value.scrollHeight
  }
}
</script>

<template>
  <textarea
    ref="textareaEl"
    v-model="content"
    maxlength="200"
    rows="6"
    placeholder="Digite até 200 caracteres..."
    style="width: 100%"
  />

  <div style="display: flex; justify-content: space-between">
    <span :style="{ color: isNearLimit ? '#ef4444' : '#7970a9' }">
      {{ charCount }}/200
    </span>
    <button @click="scrollToEnd">⬇️ Ir para o fim</button>
  </div>
</template>`,
      blanks: ['computed', 'length'],
      solution: `<script setup>
import { ref, computed } from 'vue'

const textareaEl = ref(null)
const content = ref('')

const charCount = computed(() => content.value.length)

const isNearLimit = computed(() => charCount.value > 180)

function scrollToEnd() {
  if (textareaEl.value) {
    textareaEl.value.scrollTop = textareaEl.value.scrollHeight
  }
}
</script>

<template>
  <textarea
    ref="textareaEl"
    v-model="content"
    maxlength="200"
    rows="6"
    placeholder="Digite até 200 caracteres..."
    style="width: 100%"
  />

  <div style="display: flex; justify-content: space-between">
    <span :style="{ color: isNearLimit ? '#ef4444' : '#7970a9' }">
      {{ charCount }}/200
    </span>
    <button @click="scrollToEnd">⬇️ Ir para o fim</button>
  </div>
</template>`,
      hint: 'computed retorna content.value.length. ref="textareaEl" conecta ao elemento DOM real.',
    },
    {
      id: 'tr-ch-4',
      type: 'fix-bug',
      title: 'Filho não responde ao pai',
      description: 'O pai tenta chamar o método `reset()` do filho via ref, mas recebe erro "reset is not a function". Corrija o filho.',
      xpReward: 30,
      buggyCode: `<!-- Filho.vue — script setup não expõe nada por padrão! -->
<script setup>
import { ref } from 'vue'

const count = ref(0)

function reset() {
  count.value = 0
}

function increment() {
  count.value++
}
// ← Nenhum defineExpose aqui
</script>

<template>
  <p>Count: {{ count }}</p>
  <button @click="increment">+1</button>
</template>

<!-- Pai.vue -->
<script setup>
import { ref } from 'vue'
import Filho from './Filho.vue'
const filhoRef = ref(null)
</script>

<template>
  <Filho ref="filhoRef" />
  <button @click="filhoRef.reset()">Reset do pai</button>
</template>`,
      solution: `<!-- Filho.vue — com defineExpose -->
<script setup>
import { ref } from 'vue'

const count = ref(0)

function reset() {
  count.value = 0
}

function increment() {
  count.value++
}

// ✅ Expõe o que o pai precisa acessar
defineExpose({ count, reset, increment })
</script>

<template>
  <p>Count: {{ count }}</p>
  <button @click="increment">+1</button>
</template>

<!-- Pai.vue — sem mudanças necessárias -->
<script setup>
import { ref } from 'vue'
import Filho from './Filho.vue'
const filhoRef = ref(null)
</script>

<template>
  <Filho ref="filhoRef" />
  <button @click="filhoRef.reset()">Reset do pai</button>
</template>`,
      explanation: 'Com <script setup>, o componente é fechado por padrão — o pai não acessa nada sem defineExpose(). Use defineExpose({ método }) para expor o que o pai precisa.',
    },
  ],
}
