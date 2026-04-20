export default {
  id: 'registration',
  moduleId: 'components',
  title: 'Component Registration',
  icon: '📦',
  xpReward: 30,
  docUrl: 'https://vuejs.org/guide/components/registration',

  theory: [
    {
      title: 'Registro local — o padrão com script setup',
      body: `Com <script setup>, basta importar o componente e ele já fica disponível no template automaticamente — sem precisar declarar nada. É chamado de registro local porque o componente só existe dentro daquele arquivo.
Isso é o mais recomendado: o bundle fica menor (tree-shaking funciona) e fica claro de onde cada componente vem.`,
      code: `<!-- App.vue -->
<script setup>
// Importou = registrado. Sem mais nada.
import MeuBotao from './MeuBotao.vue'
import CardUsuario from './CardUsuario.vue'
</script>

<template>
  <MeuBotao />
  <CardUsuario nome="Ana" />
</template>`,
    },
    {
      title: 'Registro global — app.component()',
      body: `Registro global torna o componente disponível em toda a aplicação, sem precisar importar em cada arquivo. Use com moderação — impede tree-shaking e torna as dependências menos explícitas.
É útil para componentes usados em quase toda página, como ícones ou botões base.`,
      code: `// main.js
import { createApp } from 'vue'
import App from './App.vue'
import BaseButton from './components/BaseButton.vue'
import BaseIcon from './components/BaseIcon.vue'

const app = createApp(App)

// Disponível em qualquer template sem importar
app.component('BaseButton', BaseButton)
app.component('BaseIcon', BaseIcon)

app.mount('#app')`,
    },
    {
      title: 'PascalCase vs kebab-case',
      body: `No template Vue, você pode usar tanto PascalCase (<MeuComponente />) quanto kebab-case (<meu-componente />). A convenção recomendada é PascalCase — fica claro que é um componente Vue, não um elemento HTML nativo.
No registro, o nome sempre vai em PascalCase. Ao usar em templates HTML puro (fora de SFCs), prefira kebab-case pois HTML é case-insensitive.`,
      code: `<script setup>
import MeuComponente from './MeuComponente.vue'
</script>

<template>
  <!-- Ambos funcionam em SFCs: -->
  <MeuComponente />        <!-- ✅ recomendado em SFC -->
  <meu-componente />       <!-- ✅ também válido -->

  <!-- Em HTML puro (não SFC), use kebab-case: -->
  <!-- <meu-componente></meu-componente> -->
</template>`,
    },
    {
      title: 'Instâncias independentes',
      body: `Cada uso de um componente cria uma instância independente com seu próprio estado. Se você usar <Contador /> três vezes, cada um tem seu próprio count. Eles não compartilham estado por padrão.
Para compartilhar estado entre componentes, você precisará de props, emits ou uma store (Pinia).`,
      code: `<script setup>
import Contador from './Contador.vue'
</script>

<template>
  <!-- Cada instância tem seu próprio estado -->
  <Contador />   <!-- count = 0 (independente) -->
  <Contador />   <!-- count = 0 (independente) -->
  <Contador />   <!-- count = 0 (independente) -->
</template>

<!-- Contador.vue -->
<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<template>
  <button @click="count++">{{ count }}</button>
</template>`,
    },
    {
      title: 'Componentes em v-for e condicionais',
      body: `Componentes funcionam com todas as diretivas Vue — v-for, v-if, v-show. Ao usar em v-for, não esqueça o :key. Componentes também podem ser passados como props (componentes dinâmicos com :is).`,
      code: `<script setup>
import CardProduto from './CardProduto.vue'
import EmptyState from './EmptyState.vue'

const produtos = ref([
  { id: 1, nome: 'Vue Course', preco: 99 },
  { id: 2, nome: 'React Course', preco: 89 },
])
</script>

<template>
  <!-- v-if com componente -->
  <EmptyState v-if="produtos.length === 0" />

  <!-- v-for com componente — :key obrigatório -->
  <CardProduto
    v-for="p in produtos"
    :key="p.id"
    :nome="p.nome"
    :preco="p.preco"
  />
</template>`,
    },
  ],

  flashcards: [
    {
      id: 'reg-fc-1',
      front: 'Como registrar um componente localmente em script setup?',
      back: 'Basta importá-lo. Com `<script setup>`, importar o componente já o registra automaticamente.',
      code: `import MeuComp from './MeuComp.vue'
// Pronto — use <MeuComp /> no template`,
      lessonTitle: 'Component Registration',
    },
    {
      id: 'reg-fc-2',
      front: 'Qual a diferença entre registro local e global?',
      back: 'Local: disponível só no arquivo que importa — recomendado (tree-shaking). Global: disponível em toda a app — use só para componentes base reutilizados em todo lugar.',
      code: `// Global (main.js)
app.component('BaseBtn', BaseBtn)

// Local (qualquer .vue)
import BaseBtn from './BaseBtn.vue'`,
      lessonTitle: 'Component Registration',
    },
    {
      id: 'reg-fc-3',
      front: 'PascalCase ou kebab-case para componentes?',
      back: 'PascalCase é recomendado em SFCs — deixa claro que é um componente Vue, não um elemento HTML nativo.',
      code: `<!-- ✅ Recomendado em SFC -->
<MeuComponente />

<!-- ✅ Também válido -->
<meu-componente />`,
      lessonTitle: 'Component Registration',
    },
    {
      id: 'reg-fc-4',
      front: 'Componentes usados múltiplas vezes compartilham estado?',
      back: 'Não — cada uso cria uma **instância independente** com seu próprio estado.',
      code: `<!-- Cada um tem seu próprio count -->
<Contador />
<Contador />
<Contador />`,
      lessonTitle: 'Component Registration',
    },
    {
      id: 'reg-fc-5',
      front: 'Como usar um componente dentro de v-for?',
      back: 'Igual a elementos HTML — adicione `:key` obrigatório.',
      code: `<CardProduto
  v-for="p in produtos"
  :key="p.id"
  :nome="p.nome"
/>`,
      lessonTitle: 'Component Registration',
    },
  ],

  challenges: [
    {
      id: 'reg-ch-1',
      type: 'fill-blank',
      title: 'Importar e usar um componente',
      description: 'Complete a importação do componente Saudacao e use-o no template.',
      xpReward: 20,
      template: `<script setup>
___ Saudacao from './Saudacao.vue'
</script>

<template>
  <___  nome="Ana" />
</template>`,
      blanks: ['import', 'Saudacao'],
      solution: `<script setup>
import Saudacao from './Saudacao.vue'
</script>

<template>
  <Saudacao nome="Ana" />
</template>`,
      hint: 'import NomeDoComponente from "./caminho" — sem necessidade de registrar.',
    },
    {
      id: 'reg-ch-2',
      type: 'fill-blank',
      title: 'Componente condicional',
      description: 'Complete: mostre EmptyState quando a lista estiver vazia, CardItem para cada item.',
      xpReward: 25,
      template: `<script setup>
import CardItem from './CardItem.vue'
import EmptyState from './EmptyState.vue'
import { ref } from 'vue'
const items = ref([{ id: 1, name: 'Vue' }])
</script>

<template>
  <EmptyState ___="items.length === 0" />
  <CardItem
    ___="item in items"
    :___="item.id"
    :name="item.name"
  />
</template>`,
      blanks: ['v-if', 'v-for', 'key'],
      solution: `<script setup>
import CardItem from './CardItem.vue'
import EmptyState from './EmptyState.vue'
import { ref } from 'vue'
const items = ref([{ id: 1, name: 'Vue' }])
</script>

<template>
  <EmptyState v-if="items.length === 0" />
  <CardItem
    v-for="item in items"
    :key="item.id"
    :name="item.name"
  />
</template>`,
      hint: 'v-if para condicional, v-for para lista, :key obrigatório no v-for.',
    },
    {
      id: 'reg-ch-3',
      type: 'fill-blank',
      title: 'Registro global',
      description: 'Complete o registro global do componente BaseButton no main.js.',
      xpReward: 25,
      template: `import { createApp } from 'vue'
import App from './App.vue'
import BaseButton from './components/BaseButton.vue'

const app = ___(App)

app.___('BaseButton', ___)

app.mount('#app')`,
      blanks: ['createApp', 'component', 'BaseButton'],
      solution: `import { createApp } from 'vue'
import App from './App.vue'
import BaseButton from './components/BaseButton.vue'

const app = createApp(App)

app.component('BaseButton', BaseButton)

app.mount('#app')`,
      hint: 'createApp() cria a app. app.component(nome, componente) registra globalmente.',
    },
    {
      id: 'reg-ch-4',
      type: 'fill-blank',
      title: 'Múltiplas instâncias independentes',
      description: 'Complete o componente Contador para que cada instância tenha seu próprio estado.',
      xpReward: 30,
      template: `<!-- Contador.vue -->
<script setup>
import { ___ } from 'vue'
const count = ___(0)
</script>

<template>
  <button @click="___++">{{ count }}</button>
</template>`,
      blanks: ['ref', 'ref', 'count'],
      solution: `<!-- Contador.vue -->
<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<template>
  <button @click="count++">{{ count }}</button>
</template>`,
      hint: 'ref() cria estado reativo local — cada instância tem o seu próprio.',
    },
    {
      id: 'reg-ch-5',
      type: 'fix-bug',
      title: 'Bugs no registro de componentes',
      description: 'O código tem 3 erros no registro e uso de componentes. Encontre e corrija.',
      xpReward: 35,
      buggyCode: `<script>
import CardUser from './CardUser.vue'
import { ref } from 'vue'

const users = ref([
  { id: 1, name: 'Ana' },
  { id: 2, name: 'Bruno' },
])
</script>

<template>
  <card-user
    v-for="user in users"
    :name="user.name"
  />
</template>`,
      solution: `<script setup>
import CardUser from './CardUser.vue'
import { ref } from 'vue'

const users = ref([
  { id: 1, name: 'Ana' },
  { id: 2, name: 'Bruno' },
])
</script>

<template>
  <CardUser
    v-for="user in users"
    :key="user.id"
    :name="user.name"
  />
</template>`,
      explanation: '1) <script> sem "setup" — variáveis não ficam disponíveis no template sem setup. 2) <card-user> funciona mas PascalCase é convencional em SFCs — use <CardUser>. 3) :key faltando no v-for.',
    },
  ],
}
