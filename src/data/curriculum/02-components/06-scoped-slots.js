export default {
  id: 'scoped-slots',
  moduleId: 'components',
  title: 'Scoped Slots',
  icon: '🎭',
  xpReward: 40,
  docUrl: 'https://vuejs.org/guide/components/slots#scoped-slots',

  theory: [
    {
      title: 'Slot props — dados do filho para o pai',
      body: `Normalmente dados fluem pai → filho via props. Mas e se o filho precisar disponibilizar dados para o conteúdo do slot? Use slot props: o filho passa atributos no <slot> e o pai acessa via v-slot.`,
      code: `<!-- Lista.vue — filho expõe item via slot prop -->
<script setup>
const props = defineProps({ items: Array })
</script>

<template>
  <ul>
    <li v-for="item in props.items" :key="item.id">
      <slot :item="item" :index="i" />
    </li>
  </ul>
</template>

<!-- Pai recebe o item via v-slot -->
<Lista :items="produtos" v-slot="{ item }">
  <strong>{{ item.nome }}</strong> — R$ {{ item.preco }}
</Lista>`,
    },
    {
      title: 'Desestruturando slot props',
      body: `Você pode desestruturar slot props com a sintaxe v-slot="{ prop1, prop2 }". Isso funciona exatamente como desestruturação de parâmetros em funções JavaScript.`,
      code: `<!-- Filho passa múltiplas slot props -->
<template>
  <ul>
    <li v-for="(item, index) in items" :key="item.id">
      <slot
        :item="item"
        :index="index"
        :isFirst="index === 0"
        :isLast="index === items.length - 1"
      />
    </li>
  </ul>
</template>

<!-- Pai desestrutura as props que precisa -->
<Lista :items="produtos" v-slot="{ item, index, isFirst }">
  <span v-if="isFirst">🏆 </span>
  {{ index + 1 }}. {{ item.nome }}
</Lista>`,
    },
    {
      title: 'Named scoped slots',
      body: `Você pode combinar named slots com slot props. Use v-slot:nome="{ ... }" ou o atalho #nome="{ ... }".`,
      code: `<!-- Tabela.vue -->
<template>
  <table>
    <thead>
      <tr>
        <slot name="header" :colunas="colunas" />
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in dados" :key="row.id">
        <slot name="row" :row="row" />
      </tr>
    </tbody>
  </table>
</template>

<!-- Pai: named scoped slots com desestruturação -->
<Tabela :dados="usuarios" :colunas="cols">
  <template #header="{ colunas }">
    <th v-for="col in colunas" :key="col">{{ col }}</th>
  </template>

  <template #row="{ row }">
    <td>{{ row.nome }}</td>
    <td>{{ row.email }}</td>
  </template>
</Tabela>`,
    },
    {
      title: 'Componentes renderless',
      body: `Um componente renderless não renderiza nada por conta própria — ele só fornece lógica via slot props. O pai é quem decide como renderizar. É um padrão poderoso para separar lógica de apresentação.`,
      code: `<!-- ContadorLogica.vue — só lógica, sem HTML -->
<script setup>
import { ref } from 'vue'

const count = ref(0)
const increment = () => count.value++
const decrement = () => count.value--
const reset = () => count.value = 0
</script>

<template>
  <slot
    :count="count"
    :increment="increment"
    :decrement="decrement"
    :reset="reset"
  />
</template>

<!-- Pai decide como apresentar -->
<ContadorLogica v-slot="{ count, increment, decrement }">
  <div class="meu-contador">
    <button @click="decrement">-</button>
    <big>{{ count }}</big>
    <button @click="increment">+</button>
  </div>
</ContadorLogica>`,
    },
    {
      title: 'Quando usar scoped slots',
      body: `Scoped slots são ideais quando o filho tem lógica ou dados que o pai precisa para renderizar corretamente. Exemplos: listas com formatação customizada, tabelas com células configuráveis, componentes de drag-and-drop.
A regra: se o filho tem os dados mas o pai sabe como mostrar, use scoped slot.`,
      code: `<!-- ✅ Bons casos para scoped slots: -->

<!-- Lista com renderização customizável -->
<ListaFiltrada :items="todos" v-slot="{ item }">
  <TodoItem :todo="item" />
</ListaFiltrada>

<!-- Tabela com colunas configuráveis -->
<TabelaDados :rows="users" v-slot="{ row }">
  <td>{{ row.name }}</td>
  <td><StatusBadge :status="row.status" /></td>
</TabelaDados>

<!-- Formulário com validação exposta -->
<FormValidado v-slot="{ erros, valido }">
  <p v-if="!valido">{{ erros.nome }}</p>
</FormValidado>`,
    },
  ],

  flashcards: [
    {
      id: 'scoped-fc-1',
      front: 'Como o filho passa dados para o pai via slot?',
      back: 'Adiciona atributos ao `<slot>`: `<slot :item="item" />`. O pai acessa com `v-slot="{ item }"` ou `#default="{ item }".',
      code: `// Filho
<slot :item="item" :index="i" />

// Pai
<Comp v-slot="{ item, index }">`,
      lessonTitle: 'Scoped Slots',
    },
    {
      id: 'scoped-fc-2',
      front: 'Como desestruturar slot props?',
      back: 'Use a sintaxe de desestruturação no v-slot: `v-slot="{ prop1, prop2 }"`.',
      code: `<Lista v-slot="{ item, isFirst }">
  <span v-if="isFirst">🏆</span>
  {{ item.nome }}
</Lista>`,
      lessonTitle: 'Scoped Slots',
    },
    {
      id: 'scoped-fc-3',
      front: 'Como usar named scoped slots?',
      back: '`#nome="{ props }"` — combine o atalho # com desestruturação.',
      code: `<template #row="{ row }">
  <td>{{ row.nome }}</td>
</template>`,
      lessonTitle: 'Scoped Slots',
    },
    {
      id: 'scoped-fc-4',
      front: 'O que é um componente renderless?',
      back: 'Um componente que só fornece lógica via slot props, sem renderizar HTML próprio — o pai decide a apresentação.',
      code: `<!-- Renderless: só lógica -->
<slot :count="count" :increment="increment" />

<!-- Pai decide o HTML -->
<Contador v-slot="{ count, increment }">
  <button @click="increment">{{ count }}</button>
</Contador>`,
      lessonTitle: 'Scoped Slots',
    },
    {
      id: 'scoped-fc-5',
      front: 'Quando usar scoped slots?',
      back: 'Quando o filho tem os dados mas o pai precisa decidir como renderizar.',
      code: `<Lista :items="todos" v-slot="{ item }">
  <!-- pai decide como cada item aparece -->
  <TodoItem :todo="item" />
</Lista>`,
      lessonTitle: 'Scoped Slots',
    },
  ],

  challenges: [
    {
      id: 'scoped-ch-1',
      type: 'fill-blank',
      title: 'Slot props básico',
      description: 'Complete o filho para expor cada item via slot prop.',
      xpReward: 25,
      template: `<!-- ListaItems.vue -->
<script setup>
defineProps({ items: Array })
</script>

<template>
  <ul>
    <li v-for="item in items" :key="item.id">
      <slot ___="item" />
    </li>
  </ul>
</template>`,
      blanks: [':item'],
      solution: `<!-- ListaItems.vue -->
<script setup>
defineProps({ items: Array })
</script>

<template>
  <ul>
    <li v-for="item in items" :key="item.id">
      <slot :item="item" />
    </li>
  </ul>
</template>`,
      hint: ':item="item" passa o dado como slot prop. O pai recebe com v-slot="{ item }".',
    },
    {
      id: 'scoped-ch-2',
      type: 'fill-blank',
      title: 'Receber slot props no pai',
      description: 'Complete o pai para receber o item via slot prop e exibir nome e preço.',
      xpReward: 30,
      template: `<script setup>
import ListaItems from './ListaItems.vue'
import { ref } from 'vue'

const produtos = ref([
  { id: 1, nome: 'Vue Course', preco: 99 },
  { id: 2, nome: 'React Course', preco: 89 },
])
</script>

<template>
  <ListaItems :items="produtos" ___="{ ___ }">
    <strong>{{ item.nome }}</strong> — R$ {{ item.preco }}
  </ListaItems>
</template>`,
      blanks: ['v-slot', 'item'],
      solution: `<script setup>
import ListaItems from './ListaItems.vue'
import { ref } from 'vue'

const produtos = ref([
  { id: 1, nome: 'Vue Course', preco: 99 },
  { id: 2, nome: 'React Course', preco: 89 },
])
</script>

<template>
  <ListaItems :items="produtos" v-slot="{ item }">
    <strong>{{ item.nome }}</strong> — R$ {{ item.preco }}
  </ListaItems>
</template>`,
      hint: 'v-slot="{ item }" desestrutura o slot prop. Acesse item.nome e item.preco normalmente.',
    },
    {
      id: 'scoped-ch-3',
      type: 'fill-blank',
      title: 'Named scoped slot',
      description: 'Complete o pai para usar o named scoped slot #row da Tabela.',
      xpReward: 35,
      template: `<script setup>
import Tabela from './Tabela.vue'
import { ref } from 'vue'
const users = ref([{ id: 1, nome: 'Ana', email: 'ana@vue.dev' }])
</script>

<template>
  <Tabela :rows="users">
    <template ___row___="{ row }">
      <td>{{ row.nome }}</td>
      <td>{{ row.email }}</td>
    </template>
  </Tabela>
</template>`,
      blanks: ['#', '='],
      solution: `<script setup>
import Tabela from './Tabela.vue'
import { ref } from 'vue'
const users = ref([{ id: 1, nome: 'Ana', email: 'ana@vue.dev' }])
</script>

<template>
  <Tabela :rows="users">
    <template #row="{ row }">
      <td>{{ row.nome }}</td>
      <td>{{ row.email }}</td>
    </template>
  </Tabela>
</template>`,
      hint: '#row="{ row }" combina named slot (#row) com slot props (="{ row }").',
    },
    {
      id: 'scoped-ch-4',
      type: 'fill-blank',
      title: 'Componente renderless',
      description: 'Complete o componente renderless que expõe count, increment e decrement via slot.',
      xpReward: 40,
      template: `<!-- ContadorLogica.vue -->
<script setup>
import { ref } from 'vue'

const count = ref(0)
const increment = () => count.value++
const decrement = () => count.value--
</script>

<template>
  <___
    :count="count"
    :increment="increment"
    :___="decrement"
  />
</template>`,
      blanks: ['slot', 'decrement'],
      solution: `<!-- ContadorLogica.vue -->
<script setup>
import { ref } from 'vue'

const count = ref(0)
const increment = () => count.value++
const decrement = () => count.value--
</script>

<template>
  <slot
    :count="count"
    :increment="increment"
    :decrement="decrement"
  />
</template>`,
      hint: 'O componente renderless usa <slot> para expor lógica. O pai decide o HTML.',
    },
    {
      id: 'scoped-ch-5',
      type: 'fix-bug',
      title: 'Bugs nos scoped slots',
      description: 'O código tem 3 erros no uso de scoped slots. Encontre e corrija.',
      xpReward: 40,
      buggyCode: `<!-- Lista.vue -->
<template>
  <ul>
    <li v-for="item in items" :key="item.id">
      <slot item="item" />
    </li>
  </ul>
</template>

<!-- Pai -->
<template>
  <Lista :items="produtos" v-slot="item">
    {{ item.nome }}
  </Lista>
</template>`,
      solution: `<!-- Lista.vue -->
<template>
  <ul>
    <li v-for="item in items" :key="item.id">
      <slot :item="item" />
    </li>
  </ul>
</template>

<!-- Pai -->
<template>
  <Lista :items="produtos" v-slot="{ item }">
    {{ item.nome }}
  </Lista>
</template>`,
      explanation: '1) slot item="item" passa uma string estática — use :item="item" (binding dinâmico). 2) v-slot="item" recebe o objeto inteiro de slot props — use v-slot="{ item }" para desestruturar. 3) Sem desestruturação, seria item.item.nome — errado.',
    },
  ],
}
