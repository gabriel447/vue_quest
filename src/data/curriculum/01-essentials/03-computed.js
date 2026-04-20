export default {
  id: 'computed',
  moduleId: 'essentials',
  title: 'Computed Properties',
  icon: '🧮',
  xpReward: 30,
  docUrl: 'https://vuejs.org/guide/essentials/computed',

  theory: [
    {
      title: 'O problema com lógica no template',
      body: `Se você colocar lógica complexa direto no template, fica difícil de ler e impossível de reutilizar em outro lugar. Computed properties resolvem isso: você escreve a lógica uma vez no script e usa o resultado limpo no template.`,
      code: `<script setup>
import { ref, computed } from 'vue'

const items = ref(['Vue', 'React', 'Angular', 'Svelte'])

const total = computed(() => items.value.length)
const hasItems = computed(() => items.value.length > 0)
</script>

<template>
  <p>{{ total }} tecnologias cadastradas</p>
  <p v-if="hasItems">Lista não está vazia!</p>
</template>`,
    },
    {
      title: 'computed() — valor que se calcula sozinho',
      body: `Uma computed é como uma variável que se atualiza automaticamente. Ela rastreia as refs que usa como dependências — quando qualquer uma mudar, ela recalcula. E o resultado fica em cache: acessar a mesma computed 100 vezes não roda a função 100 vezes.`,
      code: `<script setup>
import { ref, computed } from 'vue'

const firstName = ref('Ana')
const lastName = ref('Silva')
const score = ref(85)

const fullName = computed(() =>
  \`\${firstName.value} \${lastName.value}\`
)

const grade = computed(() => {
  if (score.value >= 90) return 'A'
  if (score.value >= 80) return 'B'
  if (score.value >= 70) return 'C'
  return 'F'
})
</script>

<template>
  <p>{{ fullName }} — Nota: {{ grade }}</p>
</template>`,
    },
    {
      title: 'Computed vs Métodos — cache vs execução',
      body: `A diferença crucial: método recalcula TODA VEZ que o componente renderiza, mesmo que nada tenha mudado. Computed só recalcula quando suas dependências mudam — o resultado fica em cache.
Para valores derivados, computed é sempre a escolha certa.`,
      code: `<script setup>
import { ref, computed } from 'vue'

const items = ref([
  { name: 'Vue', done: true },
  { name: 'React', done: false },
  { name: 'Angular', done: true },
])

// ✅ Computed: só recalcula se items mudar
const doneCount = computed(() =>
  items.value.filter(i => i.done).length
)

// ⚠️ Método: recalcula em TODA renderização
function getDoneCount() {
  return items.value.filter(i => i.done).length
}
</script>`,
    },
    {
      title: 'Computed com getter e setter (writable)',
      body: `Por padrão, computeds são só leitura. Mas você pode criar uma que também escreve — com um get() e um set(). É útil para transformações bidirecionais, como editar um nome completo e separar em nome/sobrenome.`,
      code: `<script setup>
import { ref, computed } from 'vue'

const firstName = ref('Ana')
const lastName = ref('Silva')

const fullName = computed({
  get() {
    return \`\${firstName.value} \${lastName.value}\`
  },
  set(newValue) {
    const [first, ...rest] = newValue.split(' ')
    firstName.value = first
    lastName.value = rest.join(' ')
  },
})

// fullName.value = 'João Pedro'
// → firstName = 'João', lastName = 'Pedro'
</script>`,
    },
    {
      title: 'Computed para filtros e ordenação',
      body: `Um dos usos mais clássicos: filtrar e ordenar listas sem mutar o array original. A computed retorna um novo array derivado — o original permanece intacto, o que evita bugs e mantém o histórico.`,
      code: `<script setup>
import { ref, computed } from 'vue'

const search = ref('')
const sortBy = ref('name')

const products = ref([
  { id: 1, name: 'Vue Course', price: 99 },
  { id: 2, name: 'React Book', price: 49 },
  { id: 3, name: 'Guitar', price: 299 },
])

const filtered = computed(() =>
  products.value
    .filter(p =>
      p.name.toLowerCase().includes(search.value.toLowerCase())
    )
    .sort((a, b) => a[sortBy.value] > b[sortBy.value] ? 1 : -1)
)
</script>

<template>
  <input v-model="search" placeholder="Buscar..." />
  <p>{{ filtered.length }} resultados</p>
  <div v-for="p in filtered" :key="p.id">{{ p.name }}</div>
</template>`,
    },
  ],

  flashcards: [
    {
      id: 'comp-fc-1',
      front: 'O que é uma computed property?',
      back: 'Um valor derivado de estado reativo, com cache. Recalcula automaticamente só quando as dependências mudam.',
      code: `const fullName = computed(() =>
  \`\${first.value} \${last.value}\`
)`,
      lessonTitle: 'Computed Properties',
    },
    {
      id: 'comp-fc-2',
      front: 'Por que computed é melhor que um método para valores derivados?',
      back: 'Computed é **cacheado** — só recalcula quando os dados mudam. Método recalcula a cada render.',
      code: `// Só recalcula se items mudar
const total = computed(() =>
  items.value.reduce((s, i) => s + i.price, 0)
)`,
      lessonTitle: 'Computed Properties',
    },
    {
      id: 'comp-fc-3',
      front: 'Como criar uma computed que também pode ser escrita (writable)?',
      back: 'Passe um objeto com `get()` e `set()` ao invés de uma função arrow. O `set` recebe o novo valor.',
      code: `const fullName = computed({
  get() {
    return \`\${firstName.value} \${lastName.value}\`
  },
  set(val) {
    const [first, ...rest] = val.split(' ')
    firstName.value = first
    lastName.value = rest.join(' ')
  },
})`,
      lessonTitle: 'Computed Properties',
    },
    {
      id: 'comp-fc-4',
      front: 'Como filtrar uma lista com computed?',
      back: 'Retorne `array.filter()` dentro do computed. O resultado é cacheado e o array original não é mutado.',
      code: `const ativos = computed(() =>
  items.value.filter(i => i.active)
)`,
      lessonTitle: 'Computed Properties',
    },
    {
      id: 'comp-fc-5',
      front: 'Como combinar filter e sort numa computed?',
      back: 'Encadeie os métodos: `.filter().sort()`. Retorna um novo array sem mutar o original.',
      code: `const lista = computed(() =>
  items.value
    .filter(i => i.active)
    .sort((a, b) => a.name.localeCompare(b.name))
)`,
      lessonTitle: 'Computed Properties',
    },
  ],

  challenges: [
    {
      id: 'comp-ch-1',
      type: 'fill-blank',
      title: 'Crie uma computed property',
      description: 'Complete o código para criar uma computed `doubled` que retorna `count * 2`.',
      xpReward: 20,
      template: `<script setup>
import { ref, ___ } from 'vue'

const count = ref(5)
const doubled = ___(() => count.value * 2)
</script>

<template>
  <p>{{ count }} × 2 = {{ doubled }}</p>
</template>`,
      blanks: ['computed', 'computed'],
      solution: `<script setup>
import { ref, computed } from 'vue'

const count = ref(5)
const doubled = computed(() => count.value * 2)
</script>

<template>
  <p>{{ count }} × 2 = {{ doubled }}</p>
</template>`,
      hint: 'Importe computed de "vue" e passe uma função arrow que retorna o valor calculado.',
    },
    {
      id: 'comp-ch-2',
      type: 'fill-blank',
      title: 'Computed para nota',
      description: 'Crie uma computed `grade` que retorna "Aprovado" se score >= 60, "Reprovado" caso contrário.',
      xpReward: 25,
      template: `<script setup>
import { ref, computed } from 'vue'

const score = ref(75)

const grade = ___(() =>
  score.value >= 60 ? ___ : ___
)
</script>`,
      blanks: ['computed', "'Aprovado'", "'Reprovado'"],
      solution: `<script setup>
import { ref, computed } from 'vue'

const score = ref(75)

const grade = computed(() =>
  score.value >= 60 ? 'Aprovado' : 'Reprovado'
)
</script>`,
      hint: 'Use computed() com um operador ternário dentro.',
    },
    {
      id: 'comp-ch-3',
      type: 'fill-blank',
      title: 'Carrinho de compras',
      description: 'Complete as computed properties para calcular subtotal, desconto e total do carrinho.',
      xpReward: 50,
      template: `<script setup>
import { ref, computed } from 'vue'

const cart = ref([
  { name: 'Vue Mastery', price: 29, qty: 2 },
  { name: 'Livro Vue 3', price: 49, qty: 1 },
  { name: 'Curso JS', price: 19, qty: 3 },
])

const subtotal = ___(() =>
  cart.value.reduce((sum, item) => sum + item.price * item.qty, 0)
)

const discount = computed(() =>
  subtotal.value > 100 ? subtotal.value * ___ : 0
)

const total = computed(() => subtotal.value - ___)
</script>

<template>
  <p>Subtotal: R$ {{ subtotal.toFixed(2) }}</p>
  <p>Desconto: R$ {{ discount.toFixed(2) }}</p>
  <p><strong>Total: R$ {{ total.toFixed(2) }}</strong></p>
</template>`,
      blanks: ['computed', '0.1', 'discount.value'],
      solution: `<script setup>
import { ref, computed } from 'vue'

const cart = ref([
  { name: 'Vue Mastery', price: 29, qty: 2 },
  { name: 'Livro Vue 3', price: 49, qty: 1 },
  { name: 'Curso JS', price: 19, qty: 3 },
])

const subtotal = computed(() =>
  cart.value.reduce((sum, item) => sum + item.price * item.qty, 0)
)

const discount = computed(() =>
  subtotal.value > 100 ? subtotal.value * 0.1 : 0
)

const total = computed(() => subtotal.value - discount.value)
</script>

<template>
  <p>Subtotal: R$ {{ subtotal.toFixed(2) }}</p>
  <p>Desconto: R$ {{ discount.toFixed(2) }}</p>
  <p><strong>Total: R$ {{ total.toFixed(2) }}</strong></p>
</template>`,
      hint: 'computed() para cada valor derivado. discount é 10% (0.1) do subtotal quando > 100.',
    },
    {
      id: 'comp-ch-4',
      type: 'fill-blank',
      title: 'Busca com computed',
      description: 'Complete a computed que filtra a lista de frutas com base no texto digitado.',
      xpReward: 45,
      template: `<script setup>
import { ref, computed } from 'vue'

const query = ref('')

const fruits = ref([
  'Maçã', 'Banana', 'Manga', 'Melancia',
  'Morango', 'Uva', 'Abacaxi', 'Mamão',
])

const results = ___(() =>
  fruits.value.___(f =>
    f.toLowerCase().includes(query.value.toLowerCase())
  )
)
</script>

<template>
  <input ___="query" placeholder="Buscar fruta..." />
  <p>{{ results.length }} resultado(s)</p>
  <ul>
    <li v-for="fruit in results" :key="fruit">{{ fruit }}</li>
  </ul>
</template>`,
      blanks: ['computed', 'filter', 'v-model'],
      solution: `<script setup>
import { ref, computed } from 'vue'

const query = ref('')

const fruits = ref([
  'Maçã', 'Banana', 'Manga', 'Melancia',
  'Morango', 'Uva', 'Abacaxi', 'Mamão',
])

const results = computed(() =>
  fruits.value.filter(f =>
    f.toLowerCase().includes(query.value.toLowerCase())
  )
)
</script>

<template>
  <input v-model="query" placeholder="Buscar fruta..." />
  <p>{{ results.length }} resultado(s)</p>
  <ul>
    <li v-for="fruit in results" :key="fruit">{{ fruit }}</li>
  </ul>
</template>`,
      hint: 'computed() para o valor derivado. .filter() retorna os itens que passam na condição. v-model conecta o input.',
    },
    {
      id: 'comp-ch-5',
      type: 'fix-bug',
      title: 'Bugs com computed',
      description: 'O código tem 3 erros relacionados ao computed. Encontre e corrija.',
      xpReward: 30,
      buggyCode: `<script setup>
import { ref } from 'vue'

const price = ref(10)
const qty = ref(3)

const total = price.value * qty.value

function increase() {
  qty = qty.value + 1
}
</script>

<template>
  <p>Total: {{ total }}</p>
  <button @click="increase">+1 qty</button>
</template>`,
      solution: `<script setup>
import { ref, computed } from 'vue'

const price = ref(10)
const qty = ref(3)

const total = computed(() => price.value * qty.value)

function increase() {
  qty.value = qty.value + 1
}
</script>

<template>
  <p>Total: {{ total }}</p>
  <button @click="increase">+1 qty</button>
</template>`,
      explanation: '1) computed não estava importado. 2) total precisava ser computed para reagir a mudanças. 3) qty = ... reatribui a variável — use qty.value.',
    },
  ],
}
