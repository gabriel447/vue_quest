export default {
  id: 'provide-inject',
  moduleId: 'components',
  title: 'Provide / Inject',
  icon: '💉',
  xpReward: 40,
  docUrl: 'https://vuejs.org/guide/components/provide-inject',

  theory: [
    {
      title: 'O problema do prop drilling',
      body: `Imagine passar uma prop por 5 componentes só para chegar no neto. Isso é prop drilling — componentes do meio precisam conhecer dados que não usam.
Provide/inject resolve isso: o avô provê dados e o neto injeta diretamente, sem passar pelos intermediários.`,
      code: `<!-- ❌ Prop drilling: todos precisam passar 'usuario' -->
<App :usuario="user">
  <Layout :usuario="user">
    <Sidebar :usuario="user">
      <UserMenu :usuario="user" />
    </Sidebar>
  </Layout>
</App>

<!-- ✅ Provide/inject: avô provê, neto injeta -->
<App>  <!-- provê 'usuario' -->
  <Layout>
    <Sidebar>
      <UserMenu />  <!-- injeta 'usuario' diretamente -->
    </Sidebar>
  </Layout>
</App>`,
    },
    {
      title: 'provide() e inject() básico',
      body: `O ancestral usa provide() para disponibilizar um valor. Qualquer descendente usa inject() para acessá-lo. O primeiro argumento é uma chave (string ou Symbol) — use o mesmo nos dois lados.`,
      code: `<!-- Pai.vue — provê o dado -->
<script setup>
import { provide } from 'vue'

provide('tema', 'escuro')
provide('idioma', 'pt-BR')
</script>

<!-- Neto.vue — injeta o dado -->
<script setup>
import { inject } from 'vue'

const tema = inject('tema')
const idioma = inject('idioma')

console.log(tema)   // 'escuro'
console.log(idioma) // 'pt-BR'
</script>

<template>
  <p>Tema: {{ tema }}</p>
</template>`,
    },
    {
      title: 'Provide reativo — compartilhando estado',
      body: `Para que o valor injetado reaja a mudanças, provide uma ref ou reactive. O inject recebe a referência viva — quando o pai muda, todos os filhos enxergam a mudança automaticamente.`,
      code: `<!-- App.vue — provê estado reativo -->
<script setup>
import { ref, provide } from 'vue'

const count = ref(0)
const usuario = ref({ nome: 'Ana', nivel: 5 })

provide('count', count)           // injeta a ref inteira
provide('usuario', usuario)

function incrementar() {
  count.value++
}

provide('incrementar', incrementar)  // provê a função também
</script>

<!-- QualquerNeto.vue -->
<script setup>
import { inject } from 'vue'

const count = inject('count')      // count é a ref reativa
const incrementar = inject('incrementar')
</script>

<template>
  <button @click="incrementar">{{ count }}</button>
</template>`,
    },
    {
      title: 'Valor padrão no inject',
      body: `inject() aceita um segundo argumento como valor padrão — caso o provide não tenha sido chamado. Use quando o componente pode funcionar com ou sem o contexto sendo provido.`,
      code: `<script setup>
import { inject } from 'vue'

// Valor padrão: 'claro' se nenhum ancestral proveu 'tema'
const tema = inject('tema', 'claro')

// Factory function como default (para objetos)
const config = inject('config', () => ({ lang: 'pt', debug: false }), true)

// Sem padrão: undefined se não for provido
const usuario = inject('usuario')
if (!usuario) {
  console.warn('Componente usado fora do contexto de usuário')
}
</script>`,
    },
    {
      title: 'Provide no nível da aplicação',
      body: `Você pode prover valores para toda a aplicação via app.provide() no main.js. Isso é ideal para configurações globais, serviços, ou dados que toda a app precisa.
Para casos mais complexos, prefira Pinia — mas provide/inject é ótimo para configurações simples.`,
      code: `// main.js — provide global
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

app.provide('apiUrl', 'https://api.exemplo.com')
app.provide('versao', '2.1.0')
app.provide('featureFlags', {
  darkMode: true,
  betaFeatures: false,
})

app.mount('#app')

// Qualquer componente pode injetar:
// const apiUrl = inject('apiUrl')`,
    },
  ],

  flashcards: [
    {
      id: 'provide-fc-1',
      front: 'Que problema provide/inject resolve?',
      back: 'Prop drilling — evita passar props por componentes intermediários que não precisam delas.',
      code: `// Avô provê
provide('user', user)

// Neto injeta diretamente
const user = inject('user')`,
      lessonTitle: 'Provide / Inject',
    },
    {
      id: 'provide-fc-2',
      front: 'Como prover e injetar um valor?',
      back: '`provide(chave, valor)` no ancestral. `inject(chave)` no descendente.',
      code: `// Pai
provide('tema', 'escuro')

// Filho/neto
const tema = inject('tema') // 'escuro'`,
      lessonTitle: 'Provide / Inject',
    },
    {
      id: 'provide-fc-3',
      front: 'Como fazer o provide ser reativo?',
      back: 'Provide uma `ref` ou `reactive`. O inject recebe a referência viva e reage às mudanças.',
      code: `// Pai
const count = ref(0)
provide('count', count)

// Filho — reage quando count muda
const count = inject('count')`,
      lessonTitle: 'Provide / Inject',
    },
    {
      id: 'provide-fc-4',
      front: 'Como definir um valor padrão no inject?',
      back: 'Passe o padrão como segundo argumento: `inject(chave, padrão)`.',
      code: `const tema = inject('tema', 'claro')
// 'claro' se nenhum ancestral proveu 'tema'`,
      lessonTitle: 'Provide / Inject',
    },
    {
      id: 'provide-fc-5',
      front: 'Como prover um valor para toda a aplicação?',
      back: '`app.provide(chave, valor)` no main.js — disponível em qualquer componente.',
      code: `// main.js
app.provide('apiUrl', 'https://api.com')

// Qualquer componente
const url = inject('apiUrl')`,
      lessonTitle: 'Provide / Inject',
    },
  ],

  challenges: [
    {
      id: 'provide-ch-1',
      type: 'fill-blank',
      title: 'provide() básico',
      description: 'Complete o App.vue para prover o tema e o idioma para todos os descendentes.',
      xpReward: 20,
      template: `<!-- App.vue -->
<script setup>
import { ___ } from 'vue'

___('tema', 'escuro')
___('idioma', 'pt-BR')
</script>`,
      blanks: ['provide', 'provide', 'provide'],
      solution: `<!-- App.vue -->
<script setup>
import { provide } from 'vue'

provide('tema', 'escuro')
provide('idioma', 'pt-BR')
</script>`,
      hint: 'provide(chave, valor) — importe de "vue" e chame no setup.',
    },
    {
      id: 'provide-ch-2',
      type: 'fill-blank',
      title: 'inject() básico',
      description: 'Complete o componente filho para injetar tema e idioma providos pelo ancestral.',
      xpReward: 25,
      template: `<script setup>
import { ___ } from 'vue'

const tema = ___('tema')
const idioma = ___('idioma')
</script>

<template>
  <p>Tema: {{ tema }} | Idioma: {{ idioma }}</p>
</template>`,
      blanks: ['inject', 'inject', 'inject'],
      solution: `<script setup>
import { inject } from 'vue'

const tema = inject('tema')
const idioma = inject('idioma')
</script>

<template>
  <p>Tema: {{ tema }} | Idioma: {{ idioma }}</p>
</template>`,
      hint: 'inject(chave) retorna o valor provido pelo ancestral mais próximo.',
    },
    {
      id: 'provide-ch-3',
      type: 'fill-blank',
      title: 'Provide reativo',
      description: 'Complete para prover um contador reativo e uma função para incrementar.',
      xpReward: 35,
      template: `<script setup>
import { ref, ___ } from 'vue'

const count = ___(0)

function incrementar() {
  count.value++
}

___('count', count)
___('incrementar', incrementar)
</script>`,
      blanks: ['provide', 'ref', 'provide', 'provide'],
      solution: `<script setup>
import { ref, provide } from 'vue'

const count = ref(0)

function incrementar() {
  count.value++
}

provide('count', count)
provide('incrementar', incrementar)
</script>`,
      hint: 'Provide a ref diretamente (não o .value) para manter a reatividade.',
    },
    {
      id: 'provide-ch-4',
      type: 'fill-blank',
      title: 'inject com valor padrão',
      description: 'Complete o inject para usar "claro" como tema padrão e {} como config padrão.',
      xpReward: 30,
      template: `<script setup>
import { inject } from 'vue'

const tema = inject('tema', ___)
const config = inject('config', ___)
</script>

<template>
  <p :class="\`tema-\${tema}\`">Olá!</p>
</template>`,
      blanks: ["'claro'", '{}'],
      solution: `<script setup>
import { inject } from 'vue'

const tema = inject('tema', 'claro')
const config = inject('config', {})
</script>

<template>
  <p :class="\`tema-\${tema}\`">Olá!</p>
</template>`,
      hint: 'O segundo argumento do inject é o valor padrão quando nenhum ancestral proveu a chave.',
    },
    {
      id: 'provide-ch-5',
      type: 'fix-bug',
      title: 'Bugs no provide/inject',
      description: 'O código tem 3 erros relacionados ao provide/inject. Encontre e corrija.',
      xpReward: 40,
      buggyCode: `<!-- App.vue -->
<script setup>
import { ref } from 'vue'

const user = ref({ nome: 'Ana' })
provide('user', user.value)
</script>

<!-- filho.vue -->
<script setup>
const user = inject('user')
</script>

<template>
  <p>{{ user.nome }}</p>
</template>`,
      solution: `<!-- App.vue -->
<script setup>
import { ref, provide } from 'vue'

const user = ref({ nome: 'Ana' })
provide('user', user)
</script>

<!-- filho.vue -->
<script setup>
import { inject } from 'vue'

const user = inject('user')
</script>

<template>
  <p>{{ user.nome }}</p>
</template>`,
      explanation: '1) provide não foi importado de "vue". 2) provide("user", user.value) passa o objeto estático — passe a ref inteira (user) para manter reatividade. 3) inject não foi importado de "vue" no filho.',
    },
  ],
}
