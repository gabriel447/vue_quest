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
      body: `Expressões simples no template são ok. Mas lógica complexa polui o template, dificulta a leitura e não pode ser reutilizada.
Computed properties resolvem isso: lógica no script, template limpo.`,
      code: `<!-- ❌ Ruim: lógica complexa no template -->
<p>
  {{ tasks.filter(t => t.done && t.priority === 'high').length }}
  de {{ tasks.length }} tarefas prioritárias concluídas
</p>

<!-- ✅ Bom: computed property -->
<p>{{ highPriorityDone }} de {{ tasks.length }} tarefas prioritárias concluídas</p>`,
    },
    {
      title: 'computed() — valores derivados com cache',
      body: `computed() cria um valor que é calculado a partir de outras refs ou reactive(). Vue rastreia as dependências automaticamente e só recalcula quando elas mudam.
O resultado é cacheado — acessar a mesma computed 100x não executa a função 100x.`,
      code: `<script setup>
import { ref, computed } from 'vue'

const firstName = ref('Ana')
const lastName = ref('Silva')
const score = ref(85)

// Só recalcula quando firstName ou lastName mudam
const fullName = computed(() =>
  \`\${firstName.value} \${lastName.value}\`
)

// Só recalcula quando score muda
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
      body: `Computed: cacheia o resultado. Só recalcula quando as dependências mudam. Ideal para valores derivados.
Método: executa toda vez que o componente renderiza, mesmo sem mudanças. Use para ações.`,
      code: `import { ref, computed } from 'vue'

const items = ref([
  { name: 'Vue', done: true },
  { name: 'React', done: false },
  { name: 'Angular', done: true },
])

// ✅ computed — cacheado, só recalcula se items mudar
const doneCount = computed(() =>
  items.value.filter(i => i.done).length
)

// ❌ método — executa a cada render (desnecessário aqui)
function getDoneCount() {
  return items.value.filter(i => i.done).length
}

// Regra: valor derivado = computed. Ação/evento = método.`,
    },
    {
      title: 'Computed com getter e setter (writable)',
      body: `Por padrão, computeds são somente-leitura (apenas getter). Você pode criar um setter para torná-las graváveis.
Útil para sincronizar dados entre componentes ou transformações bidirecionais.`,
      code: `<script setup>
import { ref, computed } from 'vue'

const firstName = ref('Ana')
const lastName = ref('Silva')

const fullName = computed({
  // Getter: lê e combina
  get() {
    return \`\${firstName.value} \${lastName.value}\`
  },
  // Setter: decompõe e distribui
  set(newValue) {
    const [first, ...rest] = newValue.split(' ')
    firstName.value = first
    lastName.value = rest.join(' ')
  },
})

// Usar o setter:
// fullName.value = 'João Costa'
// → firstName = 'João', lastName = 'Costa'
</script>`,
    },
    {
      title: 'Computed para filtros e ordenação',
      body: `Um caso de uso clássico: filtrar e ordenar listas sem mutar o array original.
A computed retorna um novo array derivado — o original permanece intacto.`,
      code: `<script setup>
import { ref, computed } from 'vue'

const search = ref('')
const sortBy = ref('name')

const products = ref([
  { id: 1, name: 'Vue Course', price: 99, category: 'Dev' },
  { id: 2, name: 'React Book', price: 49, category: 'Dev' },
  { id: 3, name: 'Guitar', price: 299, category: 'Music' },
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
      front: 'Computed pode fazer fetch ou ter side effects?',
      back: 'Não. Computed deve ser uma função pura. Para side effects, use `watch()` ou `onMounted()`.',
      code: `// ❌ Nunca
const bad = computed(() => fetch('/api'))

// ✅ Use watch para side effects
watch(id, () => fetch('/api/' + id.value))`,
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
      title: 'Computed com bug de cache',
      description: 'O contador de tarefas nunca atualiza mesmo quando tasks muda. Encontre e corrija o problema.',
      xpReward: 30,
      buggyCode: `<script setup>
import { ref } from 'vue'

const tasks = ref([
  { title: 'Estudar Vue', done: true },
  { title: 'Fazer PR', done: false },
])

// Esta função não tem cache e tem um bug de escopo
const doneCount = tasks.value.filter(t => t.done).length

function addTask(title) {
  tasks.value.push({ title, done: false })
}
</script>

<template>
  <p>{{ doneCount }} feitas de {{ tasks.length }}</p>
  <button @click="addTask('Nova tarefa')">+ Tarefa</button>
</template>`,
      solution: `<script setup>
import { ref, computed } from 'vue'

const tasks = ref([
  { title: 'Estudar Vue', done: true },
  { title: 'Fazer PR', done: false },
])

const doneCount = computed(() =>
  tasks.value.filter(t => t.done).length
)

function addTask(title) {
  tasks.value.push({ title, done: false })
}
</script>

<template>
  <p>{{ doneCount }} feitas de {{ tasks.length }}</p>
  <button @click="addTask('Nova tarefa')">+ Tarefa</button>
</template>`,
      explanation: 'doneCount precisa ser computed(() => ...) para reagir quando tasks muda. Um valor calculado uma vez (sem computed) nunca se atualiza.',
    },
  ],
}
