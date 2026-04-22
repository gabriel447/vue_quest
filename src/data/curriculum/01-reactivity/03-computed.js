export default {
  id: 'computed',
  moduleId: 'reactivity',
  title: 'computed()',
  icon: '🧮',
  xpReward: 30,
  docUrl: 'https://vuejs.org/api/reactivity-core#computed',

  theory: [
    {
      title: 'computed() — o valor inteligente',
      body: `Pensa no computed() como um funcionário muito eficiente. Você dá a ele uma fórmula — ele calcula o resultado e guarda em cache. Na próxima vez que você pedir, se os dados não mudaram, ele te dá o resultado guardado sem recalcular nada.

Só quando os dados originais mudam, ele recalcula.`,
      code: `<script setup>
import { ref, computed } from 'vue'

const preco = ref(100)
const quantidade = ref(3)

const total = computed(() => preco.value * quantidade.value)
</script>

<template>
  <p>Total: R$ {{ total }}</p>
</template>`,
    },
    {
      title: 'Cache — a vantagem do computed',
      body: `A diferença crucial entre computed e um método comum: o computed é cacheado. Um método recalcula toda vez que o componente renderiza — mesmo que nada tenha mudado.

Use computed para qualquer valor derivado de estado reativo.`,
      code: `<script setup>
import { ref, computed } from 'vue'

const items = ref([
  { nome: 'Vue', ativo: true },
  { nome: 'React', ativo: false },
  { nome: 'Svelte', ativo: true },
])

// ✅ computed: só recalcula quando items muda
const ativos = computed(() =>
  items.value.filter(i => i.ativo)
)

// ⚠️ método: recalcula a cada render
function getAtivos() {
  return items.value.filter(i => i.ativo)
}
</script>`,
    },
    {
      title: 'computed para filtrar e transformar listas',
      body: `Um dos usos mais comuns: filtrar e ordenar listas sem alterar o array original. O computed retorna um novo array derivado, mantendo a fonte de dados intacta.`,
      code: `<script setup>
import { ref, computed } from 'vue'

const busca = ref('')
const produtos = ref([
  { id: 1, nome: 'Curso Vue', preco: 99 },
  { id: 2, nome: 'Livro JS', preco: 49 },
  { id: 3, nome: 'Teclado', preco: 299 },
])

const filtrados = computed(() =>
  produtos.value.filter(p =>
    p.nome.toLowerCase().includes(busca.value.toLowerCase())
  )
)
</script>

<template>
  <input v-model="busca" placeholder="Buscar..." />
  <p>{{ filtrados.length }} resultado(s)</p>
  <div v-for="p in filtrados" :key="p.id">{{ p.nome }}</div>
</template>`,
    },
    {
      title: 'computed com getter e setter',
      body: `Por padrão, computed é somente leitura. Mas você pode criar um computed que também escreve — passando um objeto com get e set. Útil para transformações bidirecionais.`,
      code: `<script setup>
import { ref, computed } from 'vue'

const nome = ref('Ana')
const sobrenome = ref('Silva')

const nomeCompleto = computed({
  get() {
    return \`\${nome.value} \${sobrenome.value}\`
  },
  set(valor) {
    const [primeiro, ...resto] = valor.split(' ')
    nome.value = primeiro
    sobrenome.value = resto.join(' ')
  },
})

// nomeCompleto.value = 'João Pedro'
// → nome = 'João', sobrenome = 'Pedro'
</script>`,
    },
  ],

  flashcards: [
    {
      id: 'computed-fc-1',
      front: 'O que é computed() e qual sua vantagem?',
      back: 'É um valor derivado de estado reativo com cache. Só recalcula quando as dependências mudam — muito mais eficiente que um método.',
      code: `const total = computed(() => preco.value * qty.value)`,
      lessonTitle: 'computed()',
    },
    {
      id: 'computed-fc-2',
      front: 'Por que computed é melhor que método para valores derivados?',
      back: 'Computed é cacheado — só recalcula quando os dados mudam. Método recalcula a cada render.',
      code: `// ✅ computed: cache
// ⚠️ método: sem cache`,
      lessonTitle: 'computed()',
    },
    {
      id: 'computed-fc-3',
      front: 'Como filtrar uma lista com computed?',
      back: 'Retorne array.filter() dentro do computed. O array original não é alterado.',
      code: `const ativos = computed(() =>
  items.value.filter(i => i.ativo)
)`,
      lessonTitle: 'computed()',
    },
    {
      id: 'computed-fc-4',
      front: 'Como criar um computed que pode ser escrito?',
      back: 'Passe um objeto com get() e set(). O set recebe o novo valor atribuído.',
      code: `const full = computed({
  get() { return a.value + b.value },
  set(v) { a.value = v },
})`,
      lessonTitle: 'computed()',
    },
  ],

  challenges: [
    {
      id: 'computed-ch-1',
      type: 'fill-blank',
      title: 'Preço com desconto',
      description: 'Crie um computed que aplica 10% de desconto quando o total ultrapassar R$100.',
      xpReward: 30,
      template: `<script setup>
import { ref, ___ } from 'vue'

const preco = ref(80)
const quantidade = ref(2)

const subtotal = ___(() => preco.value * quantidade.value)

const desconto = computed(() =>
  subtotal.value > 100 ? subtotal.value * ___ : 0
)

const total = computed(() => subtotal.value - ___)
</script>

<template>
  <p>Subtotal: R$ {{ subtotal }}</p>
  <p>Desconto: R$ {{ desconto.toFixed(2) }}</p>
  <p><strong>Total: R$ {{ total.toFixed(2) }}</strong></p>
</template>`,
      blanks: ['computed', 'computed', '0.1', 'desconto.value'],
      solution: `<script setup>
import { ref, computed } from 'vue'

const preco = ref(80)
const quantidade = ref(2)

const subtotal = computed(() => preco.value * quantidade.value)

const desconto = computed(() =>
  subtotal.value > 100 ? subtotal.value * 0.1 : 0
)

const total = computed(() => subtotal.value - desconto.value)
</script>

<template>
  <p>Subtotal: R$ {{ subtotal }}</p>
  <p>Desconto: R$ {{ desconto.toFixed(2) }}</p>
  <p><strong>Total: R$ {{ total.toFixed(2) }}</strong></p>
</template>`,
      hint: 'Cada computed depende do anterior. desconto usa subtotal.value, total usa desconto.value.',
    },
    {
      id: 'computed-ch-2',
      type: 'fill-blank',
      title: 'Filtro de busca em tempo real',
      description: 'Complete o computed que filtra a lista de nomes com base no texto digitado.',
      xpReward: 35,
      template: `<script setup>
import { ref, computed } from 'vue'

const busca = ref('')
const nomes = ref(['Ana', 'Bruno', 'Carol', 'Diego', 'Elena'])

const resultado = ___(() =>
  nomes.value.___(n =>
    n.toLowerCase().includes(busca.value.toLowerCase())
  )
)
</script>

<template>
  <input v-model="busca" placeholder="Buscar nome..." />
  <p>{{ resultado.length }} encontrado(s)</p>
  <ul>
    <li v-for="nome in resultado" :key="nome">{{ nome }}</li>
  </ul>
</template>`,
      blanks: ['computed', 'filter'],
      solution: `<script setup>
import { ref, computed } from 'vue'

const busca = ref('')
const nomes = ref(['Ana', 'Bruno', 'Carol', 'Diego', 'Elena'])

const resultado = computed(() =>
  nomes.value.filter(n =>
    n.toLowerCase().includes(busca.value.toLowerCase())
  )
)
</script>

<template>
  <input v-model="busca" placeholder="Buscar nome..." />
  <p>{{ resultado.length }} encontrado(s)</p>
  <ul>
    <li v-for="nome in resultado" :key="nome">{{ nome }}</li>
  </ul>
</template>`,
      hint: 'computed() com .filter() retorna uma lista derivada. O array original não muda.',
    },
    {
      id: 'computed-ch-3',
      type: 'fix-bug',
      title: 'Bugs no computed',
      description: 'O código tem 3 erros com computed. Encontre e corrija.',
      xpReward: 40,
      buggyCode: `<script setup>
import { ref } from 'vue'

const preco = ref(50)
const qty = ref(3)

const total = preco.value * qty.value

function aumentar() {
  qty = qty.value + 1
}
</script>

<template>
  <p>Total: {{ total }}</p>
  <button @click="aumentar">+1 qty</button>
</template>`,
      solution: `<script setup>
import { ref, computed } from 'vue'

const preco = ref(50)
const qty = ref(3)

const total = computed(() => preco.value * qty.value)

function aumentar() {
  qty.value++
}
</script>

<template>
  <p>Total: {{ total }}</p>
  <button @click="aumentar">+1 qty</button>
</template>`,
      explanation: '1) computed não foi importado. 2) total precisa ser computed() para ser reativo. 3) qty = ... reatribui a variável — use qty.value++.',
    },
  ],
}
