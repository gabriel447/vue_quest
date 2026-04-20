export default {
  id: 'event-handling',
  moduleId: 'essentials',
  title: 'Event Handling',
  icon: '🖱️',
  xpReward: 30,
  docUrl: 'https://vuejs.org/guide/essentials/event-handling',

  theory: [
    {
      title: 'v-on / @ — escutando eventos',
      body: `@evento é a forma de reagir às ações do usuário: clique, tecla pressionada, movimento do mouse. É a forma curta de v-on:evento.
O valor pode ser uma expressão inline simples ou o nome de um método — Vue detecta automaticamente.`,
      code: `<script setup>
import { ref } from 'vue'
const count = ref(0)
const color = ref('blue')

function increment() {
  count.value++
}
</script>

<template>
  <!-- Expressão inline simples -->
  <button @click="count++">+1 (inline)</button>

  <!-- Referência ao método — Vue passa o Event automaticamente -->
  <button @click="increment">+1 (método)</button>

  <!-- Chamada com argumento -->
  <button @click="color = 'red'">Vermelho</button>
</template>`,
    },
    {
      title: 'O objeto Event — acesso automático e $event',
      body: `Quando o handler é só o nome do método (sem parênteses), o Vue entrega o objeto Event automaticamente como primeiro argumento.
Se precisar passar argumentos E o event juntos, use $event na chamada ou uma arrow function.`,
      code: `<script setup>
function handleClick(event) {
  console.log(event.type)      // "click"
  console.log(event.target)    // elemento clicado
  console.log(event.clientX)   // posição X do mouse
}

function greet(name, event) {
  console.log(\`Olá \${name}!\`)
  console.log(event.target.textContent)
}
</script>

<template>
  <!-- Event automático — método sem parênteses -->
  <button @click="handleClick">Clique</button>

  <!-- $event explícito — quando você tem outros argumentos -->
  <button @click="greet('Vue', $event)">Olá Vue</button>

  <!-- Arrow function — mesma coisa, mais flexível -->
  <button @click="(e) => greet('Vue', e)">Olá Vue</button>
</template>`,
    },
    {
      title: 'Modificadores de evento — sem código extra',
      body: `Modificadores são "poderes extras" para seus handlers. .prevent evita o comportamento padrão (form não recarrega). .stop evita que o evento suba para elementos pai.
Sem eles, você teria que escrever event.preventDefault() ou event.stopPropagation() manualmente dentro do método — com modificadores o método fica focado só na lógica.`,
      code: `<!-- .prevent → event.preventDefault() — form não recarrega -->
<form @submit.prevent="onSubmit">

<!-- .stop → event.stopPropagation() — clique não sobe ao pai -->
<div @click="parentClick">
  <button @click.stop="childClick">Não propaga</button>
</div>

<!-- .self → só dispara se o clique for no próprio elemento -->
<div @click.self="onDivClick">
  <span>Clicar aqui não dispara</span>
</div>

<!-- .once → dispara apenas uma vez, depois remove o listener -->
<button @click.once="subscribe">Assinar (só 1x)</button>

<!-- Encadeamento de modificadores -->
<a @click.stop.prevent="navigate">Link seguro</a>`,
    },
    {
      title: 'Modificadores de tecla',
      body: `Para eventos de teclado, use modificadores para filtrar qual tecla dispara o handler. Sem eles, o handler dispararia para qualquer tecla.
Vue tem atalhos para as teclas mais comuns: enter, esc, tab, space, up, down, left, right.`,
      code: `<!-- Enter envia o formulário -->
<input @keyup.enter="submit" placeholder="Enter = enviar" />

<!-- Esc cancela / fecha -->
<input @keyup.esc="cancel" placeholder="Esc = cancelar" />

<!-- Setas para navegação -->
<div @keydown.up="moveUp" @keydown.down="moveDown" tabindex="0">

<!-- Combinações com modificadores de sistema -->
<input @keyup.ctrl.enter="sendMessage" />   <!-- Ctrl+Enter -->
<input @keyup.meta.enter="sendMessage" />   <!-- Cmd+Enter (Mac) -->
<button @click.ctrl="selectAll">Ctrl+Click</button>`,
    },
    {
      title: 'Múltiplos handlers e handlers complexos',
      body: `Você pode passar múltiplos handlers para o mesmo evento separando com vírgula. Útil quando precisa fazer duas coisas ao mesmo tempo — como registrar analytics E executar a ação.`,
      code: `<script setup>
function track(event) {
  console.log('analytics:', event.type)
}

function handleSubmit(data) {
  console.log('submit:', data)
}
</script>

<template>
  <!-- Múltiplos handlers para o mesmo evento -->
  <button @click="track($event), handleSubmit(formData)">
    Enviar
  </button>
</template>`,
    },
  ],

  flashcards: [
    {
      id: 'ev-fc-1',
      front: 'Qual é a forma curta de v-on:click?',
      back: '`@click`. O `@` é o atalho para `v-on:`. Funciona com qualquer evento DOM.',
      code: `<button @click="handler">Clique</button>`,
      lessonTitle: 'Event Handling',
    },
    {
      id: 'ev-fc-2',
      front: 'Como acessar o objeto Event no handler?',
      back: 'Se passar só o nome do método (sem `()`), Vue injeta o Event como primeiro argumento automaticamente.',
      code: `function handleClick(event) {
  console.log(event.target)
}
// <button @click="handleClick">`,
      lessonTitle: 'Event Handling',
    },
    {
      id: 'ev-fc-3',
      front: 'O que fazem `.prevent` e `.stop`?',
      back: '`.prevent` → `event.preventDefault()` (evita reload do form).\n`.stop` → `event.stopPropagation()` (evita bubbling).',
      code: `<form @submit.prevent="onSubmit">
<button @click.stop="handler">`,
      lessonTitle: 'Event Handling',
    },
    {
      id: 'ev-fc-4',
      front: 'Como escutar só a tecla Enter num input?',
      back: 'Use `.enter`: `@keyup.enter="fn"`. Outros modificadores: `.esc`, `.tab`, `.space`.',
      code: `<input @keyup.enter="submit" />
<input @keyup.esc="cancel" />`,
      lessonTitle: 'Event Handling',
    },
    {
      id: 'ev-fc-5',
      front: 'O que faz `@click.once`?',
      back: 'O handler dispara **uma única vez**. Depois o listener é removido automaticamente.',
      code: `<button @click.once="showWelcome">Boas-vindas</button>`,
      lessonTitle: 'Event Handling',
    },
  ],

  challenges: [
    {
      id: 'ev-ch-1',
      type: 'fill-blank',
      title: 'Handler de clique simples',
      description: 'Conecte o botão ao método `addPoint` usando a forma curta, e o input ao handler `onKeyup` no evento keyup.',
      xpReward: 20,
      template: `<template>
  <button ___="addPoint">+1 ponto</button>
  <input ___="onKeyup" placeholder="Digite algo" />
</template>`,
      blanks: ['@click', '@keyup'],
      solution: `<template>
  <button @click="addPoint">+1 ponto</button>
  <input @keyup="onKeyup" placeholder="Digite algo" />
</template>`,
      hint: 'A forma curta de v-on: é @. Use @evento="handler".',
    },
    {
      id: 'ev-ch-2',
      type: 'fill-blank',
      title: 'Modificadores de evento',
      description: 'Complete: o form não deve recarregar a página ao submeter, e o botão interno não deve propagar o clique ao form.',
      xpReward: 25,
      template: `<template>
  <form @submit.___="handleSubmit">
    <input v-model="email" type="email" />
    <button type="button" @click.___="innerAction">
      Ação interna
    </button>
    <button type="submit">Enviar</button>
  </form>
</template>`,
      blanks: ['prevent', 'stop'],
      solution: `<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="email" type="email" />
    <button type="button" @click.stop="innerAction">
      Ação interna
    </button>
    <button type="submit">Enviar</button>
  </form>
</template>`,
      hint: '.prevent para preventDefault(), .stop para stopPropagation().',
    },
    {
      id: 'ev-ch-3',
      type: 'fill-blank',
      title: 'Contador por teclado',
      description: 'Complete os modificadores de tecla: Enter +1, Esc zera, setas ±10.',
      xpReward: 45,
      template: `<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<template>
  <h1>{{ count }}</h1>
  <input
    @keyup.___="count++"
    @keyup.___="count = 0"
    @keyup.up="count += 10"
    @keyup.down="count -= 10"
    placeholder="Enter +1 | Esc reset | ↑ +10 | ↓ -10"
    autofocus
  />
</template>`,
      blanks: ['enter', 'esc'],
      solution: `<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<template>
  <h1>{{ count }}</h1>
  <input
    @keyup.enter="count++"
    @keyup.esc="count = 0"
    @keyup.up="count += 10"
    @keyup.down="count -= 10"
    placeholder="Enter +1 | Esc reset | ↑ +10 | ↓ -10"
    autofocus
  />
</template>`,
      hint: 'Modificadores de tecla: .enter, .esc, .up, .down. Combinam com @keyup ou @keydown.',
    },
    {
      id: 'ev-ch-4',
      type: 'fill-blank',
      title: 'Modificadores e $event',
      description: 'Complete: o botão de reset dispara só uma vez, o saudação precisa do $event, e o botão interno não deve propagar o clique.',
      xpReward: 50,
      template: `<script setup>
import { ref } from 'vue'

const count = ref(0)
const msg = ref('')

function greet(name, event) {
  msg.value = \`Olá \${name}! Clicaste em: \${event.target.textContent}\`
}
</script>

<template>
  <p>{{ count }} cliques | {{ msg }}</p>
  <button @click.___="count = 0">Reset (só 1x)</button>
  <button @click="greet('Vue', ___)">Olá Vue</button>
  <div @click="count++">
    <button @click.___="msg = 'interno'">Não propaga</button>
  </div>
</template>`,
      blanks: ['once', '$event', 'stop'],
      solution: `<script setup>
import { ref } from 'vue'

const count = ref(0)
const msg = ref('')

function greet(name, event) {
  msg.value = \`Olá \${name}! Clicaste em: \${event.target.textContent}\`
}
</script>

<template>
  <p>{{ count }} cliques | {{ msg }}</p>
  <button @click.once="count = 0">Reset (só 1x)</button>
  <button @click="greet('Vue', $event)">Olá Vue</button>
  <div @click="count++">
    <button @click.stop="msg = 'interno'">Não propaga</button>
  </div>
</template>`,
      hint: '.once dispara só uma vez. $event passa o objeto evento explicitamente. .stop evita que o clique suba ao elemento pai.',
    },
    {
      id: 'ev-ch-5',
      type: 'fix-bug',
      title: 'Formulário com bugs de evento',
      description: 'O formulário recarrega a página ao submeter, o log não mostra o elemento clicado, e o Enter no input não funciona. Corrija.',
      xpReward: 30,
      buggyCode: `<script setup>
import { ref } from 'vue'
const name = ref('')

function handleSubmit() {
  console.log('Enviado:', name.value)
}

function showInfo(element, event) {
  console.log('Elemento:', element)
}
</script>

<template>
  <form @submit="handleSubmit">
    <input
      v-model="name"
      @keyup="handleSubmit"
      placeholder="Nome"
    />
    <button type="submit" @click="showInfo('botão')">
      Enviar
    </button>
  </form>
</template>`,
      solution: `<script setup>
import { ref } from 'vue'
const name = ref('')

function handleSubmit() {
  console.log('Enviado:', name.value)
}

function showInfo(element, event) {
  console.log('Elemento:', element)
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <input
      v-model="name"
      @keyup.enter="handleSubmit"
      placeholder="Nome"
    />
    <button type="submit" @click="showInfo('botão', $event)">
      Enviar
    </button>
  </form>
</template>`,
      explanation: '1) @submit.prevent evita reload. 2) @keyup.enter filtra para Enter. 3) showInfo precisa de $event como segundo argumento.',
    },
  ],
}
