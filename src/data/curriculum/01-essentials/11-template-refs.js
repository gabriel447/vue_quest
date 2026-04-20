export default {
  id: 'template-refs',
  moduleId: 'essentials',
  title: 'Template Refs',
  icon: '🎯',
  xpReward: 30,
  docUrl: 'https://vuejs.org/guide/essentials/template-refs',

  theory: [
    {
      title: 'Acessando o DOM diretamente',
      body: `Em Vue, você raramente precisa acessar o DOM diretamente — as diretivas resolvem quase tudo. Mas às vezes é necessário: dar foco a um input, medir dimensões, ou integrar com uma biblioteca JavaScript externa.
Para isso, declare uma ref(null) e use o atributo ref= no template com o mesmo nome.`,
      code: `<script setup>
import { ref, onMounted } from 'vue'

const inputEl = ref(null)  // começa null — preenchido ao montar
const divEl = ref(null)

onMounted(() => {
  // Só acesse aqui — o elemento existe após a montagem
  inputEl.value.focus()

  const rect = divEl.value.getBoundingClientRect()
  console.log('Largura:', rect.width)
  console.log('Altura:', rect.height)
})
</script>

<template>
  <!-- ref= conecta o elemento à variável -->
  <input ref="inputEl" placeholder="Auto-foco ao abrir! 🎯" />
  <div ref="divEl">Meu conteúdo</div>
</template>`,
    },
    {
      title: 'useTemplateRef() — Vue 3.5+',
      body: `No Vue 3.5+, a forma recomendada é useTemplateRef(). Recebe o nome do atributo ref= como argumento. É mais explícita que a abordagem antiga e evita conflito com outras refs.
Se você usar Vue < 3.5, declare uma ref(null) com o mesmo nome da string do atributo ref no template.`,
      code: `<script setup>
import { useTemplateRef, onMounted } from 'vue'

// Vue 3.5+: useTemplateRef — forma recomendada
const inputEl = useTemplateRef('my-input')

onMounted(() => {
  inputEl.value.focus()
})
</script>

<template>
  <!-- O string no useTemplateRef deve bater com o atributo ref= -->
  <input ref="my-input" placeholder="Focado automaticamente!" />
</template>

<!-- Vue < 3.5: use ref(null) com mesmo nome -->
<!-- const inputEl = ref(null) + <input ref="inputEl" /> -->`,
    },
    {
      title: 'Ref em componente filho — defineExpose()',
      body: `Quando você usa ref= em um componente filho com <script setup>, o componente é privado por padrão — você não acessa nada de fora. Para expor métodos ou dados, o filho usa defineExpose().
Prefira props e emit para comunicação normal. Reserve template refs para controle direto quando necessário.`,
      code: `<!-- ComponenteFilho.vue -->
<script setup>
import { ref } from 'vue'

const count = ref(0)

function reset() {
  count.value = 0
}

// Expõe só o que o pai pode acessar
defineExpose({ reset, count })
</script>

<!-- ComponentePai.vue -->
<script setup>
import { ref, onMounted } from 'vue'
import ComponenteFilho from './ComponenteFilho.vue'

const filho = ref(null)

onMounted(() => {
  filho.value.reset()        // ✅ método exposto
  console.log(filho.value.count)  // ✅ dado exposto
})
</script>

<template>
  <ComponenteFilho ref="filho" />
</template>`,
    },
    {
      title: 'Refs dentro de v-for',
      body: `Quando você usa ref= dentro de um v-for, você recebe um array com todos os elementos criados (na ordem em que aparecem no DOM, não necessariamente a do array original).`,
      code: `<script setup>
import { ref, onMounted } from 'vue'

const items = ref(['Vue', 'React', 'Svelte'])
const itemEls = ref([])  // array de elementos DOM

onMounted(() => {
  // itemEls.value é array de todos os <li> criados
  console.log('Elementos:', itemEls.value.length)
  itemEls.value[0].style.fontWeight = 'bold'
})
</script>

<template>
  <ul>
    <li
      v-for="item in items"
      :key="item"
      ref="itemEls"
    >
      {{ item }}
    </li>
  </ul>
</template>`,
    },
    {
      title: 'Ref como função',
      body: `Em vez de um string, você pode passar uma função para o atributo ref. Ela recebe o elemento (ou null quando desmontado) e é chamada toda vez que o elemento é montado ou atualizado.
Útil para lógica mais complexa ou quando não quer declarar uma variável separada.`,
      code: `<script setup>
import { ref } from 'vue'

const inputEl = ref(null)

// Função ref: recebe o elemento ao montar, null ao desmontar
function setInputRef(el) {
  inputEl.value = el
  if (el) el.focus()  // foca imediatamente ao montar
}
</script>

<template>
  <!-- Função em vez de string -->
  <input :ref="setInputRef" placeholder="Focado!" />
</template>`,
    },
  ],

  flashcards: [
    {
      id: 'ref-fc-1',
      front: 'Como acessar um elemento DOM diretamente em Vue?',
      back: 'Declare `const el = ref(null)` e adicione `ref="el"` no template. O elemento estará disponível em `el.value` após `onMounted`.',
      code: `const el = ref(null)
onMounted(() => el.value.focus())
// <input ref="el" />`,
      lessonTitle: 'Template Refs',
    },
    {
      id: 'ref-fc-2',
      front: 'Quando a template ref está disponível?',
      back: 'Só após `onMounted`. Antes disso, o valor é `null` — acessar antes causa erro.',
      code: `const el = ref(null)
// setup: el.value === null ❌
onMounted(() => el.value.focus()) // ✅`,
      lessonTitle: 'Template Refs',
    },
    {
      id: 'ref-fc-3',
      front: 'Por que um componente filho com script setup é "privado"?',
      back: 'Por padrão, nada é exposto ao pai. Use `defineExpose({ prop, method })` para tornar acessível.',
      code: `// filho
defineExpose({ reset, count })

// pai
filho.value.reset() // ✅`,
      lessonTitle: 'Template Refs',
    },
    {
      id: 'ref-fc-4',
      front: 'O que acontece com ref= dentro de v-for?',
      back: 'Você recebe um **array** com todos os elementos criados pelo v-for.',
      code: `const items = ref([])
// <li v-for="..." ref="items">
// items.value = [li, li, li, ...]`,
      lessonTitle: 'Template Refs',
    },
    {
      id: 'ref-fc-5',
      front: 'Qual é a forma recomendada de template ref no Vue 3.5+?',
      back: '`useTemplateRef("nome")` — mais explícita que declarar `ref(null)` com mesmo nome do atributo.',
      code: `const el = useTemplateRef('my-input')
// <input ref="my-input" />`,
      lessonTitle: 'Template Refs',
    },
  ],

  challenges: [
    {
      id: 'ref-ch-1',
      type: 'fill-blank',
      title: 'Auto-foco no input',
      description: 'Complete o código para dar foco automático ao input quando o componente é montado.',
      xpReward: 25,
      template: `<script setup>
import { ref, ___ } from 'vue'

const inputEl = ___(null)

___(()=> {
  inputEl.value.___()
})
</script>

<template>
  <input ___="inputEl" placeholder="Estou focado!" />
</template>`,
      blanks: ['onMounted', 'ref', 'onMounted', 'focus', 'ref'],
      solution: `<script setup>
import { ref, onMounted } from 'vue'

const inputEl = ref(null)

onMounted(() => {
  inputEl.value.focus()
})
</script>

<template>
  <input ref="inputEl" placeholder="Estou focado!" />
</template>`,
      hint: 'ref(null) para declarar, onMounted para acessar, .focus() para focar.',
    },
    {
      id: 'ref-ch-2',
      type: 'fill-blank',
      title: 'Medir elemento com ref',
      description: 'Complete para medir a largura e altura do card após a montagem.',
      xpReward: 30,
      template: `<script setup>
import { ref, onMounted } from 'vue'

const cardEl = ___(null)
const dimensions = ref({ width: 0, height: 0 })

onMounted(() => {
  const rect = cardEl.___.getBoundingClientRect()
  dimensions.value.width = Math.round(rect.___)
  dimensions.value.height = Math.round(rect.___)
})
</script>

<template>
  <div ref="___" class="card" style="padding: 2rem">
    <p>Largura: {{ dimensions.width }}px</p>
    <p>Altura: {{ dimensions.height }}px</p>
  </div>
</template>`,
      blanks: ['ref', 'value', 'width', 'height', 'cardEl'],
      solution: `<script setup>
import { ref, onMounted } from 'vue'

const cardEl = ref(null)
const dimensions = ref({ width: 0, height: 0 })

onMounted(() => {
  const rect = cardEl.value.getBoundingClientRect()
  dimensions.value.width = Math.round(rect.width)
  dimensions.value.height = Math.round(rect.height)
})
</script>

<template>
  <div ref="cardEl" class="card" style="padding: 2rem">
    <p>Largura: {{ dimensions.width }}px</p>
    <p>Altura: {{ dimensions.height }}px</p>
  </div>
</template>`,
      hint: 'getBoundingClientRect() retorna um objeto com width, height, top, left etc.',
    },
    {
      id: 'ref-ch-3',
      type: 'fill-blank',
      title: 'Foco condicional',
      description: 'Complete para focar o input de busca quando o usuário abre o modal.',
      xpReward: 45,
      template: `<script setup>
import { ref, nextTick } from 'vue'

const isOpen = ref(false)
const searchEl = ref(null)

async function openModal() {
  isOpen.value = true
  await ___()
  searchEl.___?.focus()
}
</script>

<template>
  <button @click="openModal">🔍 Abrir busca</button>

  <div v-if="isOpen" class="modal">
    <input ref="___" placeholder="Buscar..." />
    <button @click="isOpen = false">✕ Fechar</button>
  </div>
</template>`,
      blanks: ['nextTick', 'value', 'searchEl'],
      solution: `<script setup>
import { ref, nextTick } from 'vue'

const isOpen = ref(false)
const searchEl = ref(null)

async function openModal() {
  isOpen.value = true
  await nextTick()
  searchEl.value?.focus()
}
</script>

<template>
  <button @click="openModal">🔍 Abrir busca</button>

  <div v-if="isOpen" class="modal">
    <input ref="searchEl" placeholder="Buscar..." />
    <button @click="isOpen = false">✕ Fechar</button>
  </div>
</template>`,
      hint: 'nextTick() espera o DOM atualizar após v-if mudar. .value? usa optional chaining para evitar erro se null.',
    },
    {
      id: 'ref-ch-4',
      type: 'fill-blank',
      title: 'Refs dentro de v-for',
      description: 'Complete para coletar os elementos <li> criados pelo v-for e deixar o primeiro em negrito ao montar.',
      xpReward: 30,
      template: `<script setup>
import { ref, onMounted } from 'vue'

const items = ['Vue', 'React', 'Svelte']
const itemEls = ___([] )

onMounted(() => {
  itemEls.___[0].style.fontWeight = 'bold'
})
</script>

<template>
  <ul>
    <li v-for="item in items" :key="item" ___="itemEls">
      {{ item }}
    </li>
  </ul>
</template>`,
      blanks: ['ref', 'value', 'ref'],
      solution: `<script setup>
import { ref, onMounted } from 'vue'

const items = ['Vue', 'React', 'Svelte']
const itemEls = ref([])

onMounted(() => {
  itemEls.value[0].style.fontWeight = 'bold'
})
</script>

<template>
  <ul>
    <li v-for="item in items" :key="item" ref="itemEls">
      {{ item }}
    </li>
  </ul>
</template>`,
      hint: 'Quando ref= está dentro de v-for, o resultado em .value é um array de elementos DOM.',
    },
    {
      id: 'ref-ch-5',
      type: 'fix-bug',
      title: 'Bugs com template ref',
      description: 'O componente tem 3 erros relacionados ao uso de template refs. Encontre e corrija.',
      xpReward: 30,
      buggyCode: `<script setup>
import { ref } from 'vue'

const inputEl = ref(null)
inputEl.value.focus()

function clear() {
  inputEl.focus()
}
</script>

<template>
  <input ref="input" placeholder="Texto" />
  <button @click="clear">Limpar</button>
</template>`,
      solution: `<script setup>
import { ref, onMounted } from 'vue'

const inputEl = ref(null)

onMounted(() => {
  inputEl.value.focus()
})

function clear() {
  inputEl.value.focus()
}
</script>

<template>
  <input ref="inputEl" placeholder="Texto" />
  <button @click="clear">Limpar</button>
</template>`,
      explanation: '1) inputEl.value é null até montar — acesse dentro de onMounted. 2) inputEl.focus() está faltando .value. 3) ref="input" não bate com a variável inputEl — os nomes devem ser iguais.',
    },
  ],
}
