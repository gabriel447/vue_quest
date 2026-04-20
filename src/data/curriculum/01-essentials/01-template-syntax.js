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
      body: `Pensa no {{ }} como uma mini janelinha no HTML que exibe o valor de uma variável. Quando o valor muda, a janelinha atualiza sozinha — sem precisar recarregar a página.
Dentro das chaves você pode colocar qualquer expressão JavaScript que retorne um valor.`,
      code: `<script setup>
import { ref } from 'vue'

const msg = ref('Olá, Vue!')
const score = ref(42)
</script>

<template>
  <p>Mensagem: {{ msg }}</p>
  <p>Pontuação: {{ score }}</p>
  <p>Dobro: {{ score * 2 }}</p>
  <p>Status: {{ score > 50 ? 'Expert' : 'Iniciante' }}</p>
</template>`,
    },
    {
      title: 'Attribute Binding com v-bind / :',
      body: `O {{ }} só funciona no conteúdo do HTML, não dentro de atributos. Para vincular atributos dinamicamente (src, href, disabled...), use v-bind: ou a forma curta : (dois pontos).
No Vue 3.4+, se o nome da variável é igual ao atributo, você pode omitir o valor: :id é o mesmo que :id="id".`,
      code: `<script setup>
import { ref } from 'vue'

const id = ref('titulo-principal')
const href = ref('https://vuejs.org')
const isDisabled = ref(true)
const imgSrc = ref('/logo.png')
</script>

<template>
  <div v-bind:id="id">...</div>
  <div :id="id">...</div>
  <a :href="href">Documentação Vue</a>
  <button :disabled="isDisabled">Enviar</button>
  <img :src="imgSrc" :alt="'Logo Vue'" />
  <div :id>...</div>
</template>`,
    },
    {
      title: 'Expressões JavaScript no Template',
      body: `Dentro do {{ }} e das diretivas você pode escrever qualquer expressão JS que retorne um valor: ternários, métodos de string, operações matemáticas.
O que NÃO funciona: declarações como var x = 1, if (...) {}, for (...) {}. Elas não retornam valor, então o Vue não sabe o que exibir.`,
      code: `<script setup>
import { ref } from 'vue'

const score = ref(85)
const ok = ref(true)
const msg = ref('Vue!')
</script>

<template>
  <p>{{ score + 10 }}</p>
  <p>{{ ok ? 'Aprovado' : 'Reprovado' }}</p>
  <p>{{ msg.toUpperCase() }}</p>
  <p>{{ Math.max(score, 100) }}</p>
  <p>{{ Date.now() }}</p>
</template>`,
    },
    {
      title: 'Raw HTML com v-html',
      body: `Por padrão, {{ }} trata tudo como texto puro — tags HTML aparecem literalmente na tela, não são interpretadas. Isso é seguro por design.
Se você tem HTML de uma fonte confiável (seu próprio sistema) e quer que ele seja renderizado de verdade, use v-html. Mas nunca com conteúdo de usuários — risco de XSS.`,
      code: `<script setup>
import { ref } from 'vue'

const highlighted = ref('<strong style="color:#42b883">Vue!</strong>')
</script>

<template>
  <p v-html="highlighted"></p>
  <p>{{ highlighted }}</p>
</template>`,
    },
    {
      title: 'Diretivas — v-nome:argumento.modificador',
      body: `Diretivas são atributos especiais que começam com v-. Elas dão superpoderes ao HTML: mostrar/ocultar elementos, repetir listas, capturar eventos.
O formato completo é v-nome:argumento.modificador="expressão". Formas curtas: v-bind:href → :href | v-on:click → @click.`,
      code: `<template>
  <p v-if="seen">Agora você me vê!</p>
  <p v-else>Modo oculto</p>
  <p v-show="visible">Sempre no DOM, mas pode estar oculto</p>

  <a v-bind:href="url">Link</a>
  <a v-on:click="doSomething">Clique</a>

  <a :href="url">Link</a>
  <a @click="doSomething">Clique</a>

  <a :[attributeName]="url">Dinâmico</a>
  <a @[eventName]="doSomething">Dinâmico</a>

  <form @submit.prevent="onSubmit">...</form>
</template>`,
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
