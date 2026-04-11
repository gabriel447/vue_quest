export default {
  id: 'template-syntax',
  moduleId: 'essentials',
  title: 'Template Syntax',
  icon: '🏷️',
  xpReward: 30,
  docUrl: 'https://vuejs.org/guide/essentials/template-syntax',

  theory: [
    {
      title: 'Interpolação de texto — Mustache {{ }}',
      body: `A forma mais básica de exibir dados reativos no template é a sintaxe de duplas chaves, também chamada de "Mustache".
O valor dentro é substituído pelo valor da propriedade reativa correspondente e atualiza automaticamente quando ela muda.

Fonte: vuejs.org/guide/essentials/template-syntax`,
      code: `<script setup>
import { ref } from 'vue'

const msg = ref('Olá, Vue!')
const score = ref(42)
</script>

<template>
  <p>Mensagem: {{ msg }}</p>
  <p>Pontuação: {{ score }}</p>

  <!-- Também funciona com expressões -->
  <p>Dobro: {{ score * 2 }}</p>
  <p>Status: {{ score > 50 ? 'Expert' : 'Iniciante' }}</p>
</template>`,
    },
    {
      title: 'Attribute Binding com v-bind / :',
      body: `Mustaches {{ }} não funcionam dentro de atributos HTML. Use a diretiva v-bind para vincular atributos dinamicamente.
A forma curta é apenas : (dois pontos). Sempre prefira a forma curta.

No Vue 3.4+, se o nome da prop é idêntico ao nome da variável, você pode omitir o valor: :id é equivalente a :id="id".`,
      code: `<script setup>
import { ref } from 'vue'

const id = ref('main-title')
const href = ref('https://vuejs.org')
const isDisabled = ref(true)
const imgSrc = ref('/logo.png')
</script>

<template>
  <!-- Forma completa -->
  <div v-bind:id="id">...</div>

  <!-- Forma curta (preferida) -->
  <div :id="id">...</div>
  <a :href="href">Documentação Vue</a>
  <button :disabled="isDisabled">Enviar</button>
  <img :src="imgSrc" :alt="'Logo Vue'" />

  <!-- Vue 3.4+: same-name shorthand -->
  <div :id>...</div>
</template>`,
    },
    {
      title: 'Expressões JavaScript no Template',
      body: `Vue suporta expressões JavaScript completas dentro das duplas chaves e em valores de diretivas.
Apenas expressões únicas que retornam valor funcionam — statements como if, for, var não são permitidos.

O template tem acesso a uma lista restrita de globais: Math, Date, e outros built-ins. Propriedades do window não são acessíveis por padrão.`,
      code: `<script setup>
import { ref } from 'vue'

const score = ref(85)
const ok = ref(true)
const msg = ref('Vue!')
</script>

<template>
  <!-- ✅ Expressões válidas — retornam um valor -->
  <p>{{ score + 10 }}</p>
  <p>{{ ok ? 'Aprovado' : 'Reprovado' }}</p>
  <p>{{ msg.toUpperCase() }}</p>

  <!-- ✅ Globais permitidos: Math, Date -->
  <p>{{ Math.max(score, 100) }}</p>
  <p>{{ Date.now() }}</p>

  <!-- ❌ Statements não funcionam (erro de compilação):
    {{ var x = 1 }}
    {{ if (ok) { return msg } }}
  -->
</template>`,
    },
    {
      title: 'Raw HTML com v-html',
      body: `A interpolação {{ }} renderiza conteúdo como texto puro (HTML é escapado automaticamente).
Para renderizar HTML real, use a diretiva v-html.

⚠️ Alerta de Segurança (XSS): NUNCA use v-html com conteúdo enviado por usuários. Isso pode abrir vulnerabilidades de Cross-Site Scripting (XSS).`,
      code: `<script setup>
import { ref } from 'vue'

const rawHtml = ref('<strong style="color:#42b883">Vue é incrível!</strong>')
const userInput = ref('<img src=x onerror=alert("XSS")>')
</script>

<template>
  <!-- Renderiza o HTML real -->
  <p v-html="rawHtml"></p>
  <!-- Resultado: <strong style="color:#42b883">Vue é incrível!</strong> -->

  <!-- Interpolação escapa o HTML — seguro para input de usuário -->
  <p>{{ rawHtml }}</p>
  <!-- Resultado: texto literal com as tags visíveis -->

  <!-- ❌ NUNCA: v-html com conteúdo de usuário -->
  <!-- <p v-html="userInput"></p> → XSS! -->
</template>`,
    },
    {
      title: 'Diretivas — v-nome:argumento.modificador',
      body: `Diretivas são atributos especiais com prefixo v-. Aplicam comportamento reativo ao DOM.
O formato completo é: v-nome:argumento.modificador="expressão"

Formas curtas: v-bind:href → :href | v-on:click → @click`,
      code: `<!-- Diretivas sem argumento -->
<p v-if="seen">Agora você me vê!</p>
<p v-else>Modo oculto</p>
<p v-show="visible">Sempre no DOM, mas pode estar oculto</p>

<!-- Diretivas com argumento (após os dois pontos) -->
<a v-bind:href="url">Link</a>  <!-- argumento: href -->
<a v-on:click="doSomething">Clique</a>  <!-- argumento: click -->

<!-- Formas curtas -->
<a :href="url">Link</a>
<a @click="doSomething">Clique</a>

<!-- Argumento dinâmico (entre colchetes) -->
<a :[attributeName]="url">Dinâmico</a>
<a @[eventName]="doSomething">Dinâmico</a>

<!-- Modificador (após o ponto) -->
<form @submit.prevent="onSubmit">...</form>`,
    },
  ],

  flashcards: [
    {
      id: 'ts-fc-1',
      front: 'Como exibir o valor de `msg` no template?',
      back: 'Use `{{ msg }}` — sintaxe Mustache. Atualiza automaticamente quando o valor muda.',
      code: `<p>{{ msg }}</p>`,
      lessonTitle: 'Template Syntax',
    },
    {
      id: 'ts-fc-2',
      front: 'Como vincular um atributo HTML dinamicamente?',
      back: 'Use `:attr="valor"` (forma curta de v-bind). Mustache `{{ }}` não funciona dentro de atributos.',
      code: `<img :src="url" />
<button :disabled="loading">Enviar</button>`,
      lessonTitle: 'Template Syntax',
    },
    {
      id: 'ts-fc-3',
      front: 'O que pode ir dentro de `{{ }}`?',
      back: 'Qualquer expressão JS que retorna um valor: ternário, método, operação. Não pode usar `var`, `if` ou `for`.',
      code: `{{ ok ? 'Sim' : 'Não' }}
{{ msg.toUpperCase() }}
{{ score * 2 }}`,
      lessonTitle: 'Template Syntax',
    },
    {
      id: 'ts-fc-4',
      front: 'Qual diretiva renderiza HTML bruto? Quando NÃO usar?',
      back: '`v-html` renderiza HTML real. Nunca use com input de usuário — risco de XSS.',
      code: `<p v-html="trustedHtml"></p>`,
      lessonTitle: 'Template Syntax',
    },
    {
      id: 'ts-fc-5',
      front: 'Quais são as formas curtas de v-bind e v-on?',
      back: '`v-bind:src` → `:src` (dois pontos)\n`v-on:click` → `@click` (arroba)',
      code: `<img :src="url" />
<button @click="submit">Enviar</button>`,
      lessonTitle: 'Template Syntax',
    },
  ],

  challenges: [
    {
      id: 'ts-ch-1',
      type: 'fill-blank',
      title: 'Interpolação básica',
      description: 'Exiba o valor da variável `username` no título de boas-vindas e a variável `score` no parágrafo de pontuação usando a sintaxe Mustache.',
      xpReward: 20,
      template: `<template>
  <h1>Bem-vindo, ___!</h1>
  <p>Pontuação: ___</p>
</template>`,
      blanks: ['{{ username }}', '{{ score }}'],
      solution: `<template>
  <h1>Bem-vindo, {{ username }}!</h1>
  <p>Pontuação: {{ score }}</p>
</template>`,
      hint: 'Use duplas chaves {{ }} para interpolar valores de variáveis no template.',
    },
    {
      id: 'ts-ch-2',
      type: 'fill-blank',
      title: 'Binding de atributos',
      description: 'Vincule o `src` da imagem à variável `avatarUrl` e o `href` do link à variável `profileUrl` usando a forma curta de v-bind.',
      xpReward: 25,
      template: `<template>
  <img ___="avatarUrl" alt="Avatar" />
  <a ___="profileUrl">Ver perfil</a>
</template>`,
      blanks: [':src', ':href'],
      solution: `<template>
  <img :src="avatarUrl" alt="Avatar" />
  <a :href="profileUrl">Ver perfil</a>
</template>`,
      hint: 'A forma curta de v-bind é : (dois pontos). Use :atributo="variável".',
    },
    {
      id: 'ts-ch-3',
      type: 'fill-blank',
      title: 'Card de perfil com bindings',
      description: 'Complete os bindings dinâmicos do card: imagem, link e botão precisam de v-bind.',
      xpReward: 40,
      template: `<script setup>
import { ref } from 'vue'

const name = ref('Ana Silva')
const avatar = ref('https://i.pravatar.cc/100')
const level = ref(7)
const website = ref('https://vuejs.org')
const isLoading = ref(false)
</script>

<template>
  <div class="card">
    <img ___="avatar" ___="name" />
    <h2>{{ name }}</h2>
    <p>Nível {{ level }}</p>
    <a ___="website" target="_blank">Website</a>
    <button ___="isLoading" @click="isLoading = true">
      {{ isLoading ? 'Carregando...' : 'Seguir' }}
    </button>
  </div>
</template>`,
      blanks: [':src', ':alt', ':href', ':disabled'],
      solution: `<script setup>
import { ref } from 'vue'

const name = ref('Ana Silva')
const avatar = ref('https://i.pravatar.cc/100')
const level = ref(7)
const website = ref('https://vuejs.org')
const isLoading = ref(false)
</script>

<template>
  <div class="card">
    <img :src="avatar" :alt="name" />
    <h2>{{ name }}</h2>
    <p>Nível {{ level }}</p>
    <a :href="website" target="_blank">Website</a>
    <button :disabled="isLoading" @click="isLoading = true">
      {{ isLoading ? 'Carregando...' : 'Seguir' }}
    </button>
  </div>
</template>`,
      hint: ':src para imagem, :href para link, :disabled para botão. A forma curta de v-bind é ":".',
    },
    {
      id: 'ts-ch-4',
      type: 'fill-blank',
      title: 'v-html vs interpolação segura',
      description: 'Complete: use v-html para o HTML confiável e {{ }} para o input do usuário (seguro contra XSS).',
      xpReward: 35,
      template: `<script setup>
import { ref } from 'vue'

const safeHtml = ref('<strong>Vue 3</strong> — framework <em>progressivo</em>.')
const userInput = ref('<script>alert("XSS!")<\/script> Olá!')
</script>

<template>
  <div>
    <h3>HTML renderizado:</h3>
    <p ___="safeHtml"></p>

    <h3>Input do usuário (seguro):</h3>
    <p>___</p>
  </div>
</template>`,
      blanks: ['v-html', '{{ userInput }}'],
      solution: `<script setup>
import { ref } from 'vue'

const safeHtml = ref('<strong>Vue 3</strong> — framework <em>progressivo</em>.')
const userInput = ref('<script>alert("XSS!")<\/script> Olá!')
</script>

<template>
  <div>
    <h3>HTML renderizado:</h3>
    <p v-html="safeHtml"></p>

    <h3>Input do usuário (seguro):</h3>
    <p>{{ userInput }}</p>
  </div>
</template>`,
      hint: 'v-html renderiza HTML real. {{ }} escapa automaticamente — nunca use v-html com input de usuário.',
    },
    {
      id: 'ts-ch-5',
      type: 'fix-bug',
      title: 'Corrija os erros de template',
      description: 'O código tem 3 erros de sintaxe de template. Encontre e corrija todos.',
      xpReward: 30,
      buggyCode: `<template>
  <div>
    <img src="{{ avatarUrl }}" alt="foto" />
    <p>Status: {{ var status = score > 50 ? 'Expert' : 'Novato' }}</p>
    <button v-bind="disabled" :class="btnClass">Enviar</button>
  </div>
</template>`,
      solution: `<template>
  <div>
    <img :src="avatarUrl" alt="foto" />
    <p>Status: {{ score > 50 ? 'Expert' : 'Novato' }}</p>
    <button :disabled="disabled" :class="btnClass">Enviar</button>
  </div>
</template>`,
      explanation: '1) Atributos precisam de :src, não {{ }}.\n2) var é statement inválido nas {{ }}.\n3) v-bind:disabled precisa de ="expressão".',
    },
  ],
}
