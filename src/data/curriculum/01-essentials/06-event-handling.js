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
      body: `Use v-on:evento ou a forma curta @evento para escutar eventos do DOM.
O valor pode ser uma expressão inline, o nome de um método, ou uma chamada de método.`,
      code: `<script setup>
import { ref } from 'vue'
const count = ref(0)
const color = ref('blue')

function increment() {
  count.value++
}
</script>

<template>
  <!-- Expressão inline -->
  <button @click="count++">+1 (inline)</button>

  <!-- Referência a método — Vue passa o Event automaticamente -->
  <button @click="increment">+1 (método)</button>

  <!-- Chamada com argumento -->
  <button @click="color = 'red'">Vermelho</button>

  <!-- Método com argumento explícito -->
  <button @click="console.log('clicado!', count.value)">Log</button>
</template>`,
    },
    {
      title: 'O objeto Event — acesso automático e $event',
      body: `Quando o handler é apenas o nome do método (sem parênteses), Vue passa o objeto Event automaticamente.
Para passar argumentos E acessar o event, use $event ou uma arrow function.`,
      code: `<script setup>
// Vue passa o Event automaticamente aqui
function handleClick(event) {
  console.log(event.type)          // "click"
  console.log(event.target)        // elemento clicado
  console.log(event.clientX)       // posição X do mouse
}

// Para argumentos + event: use $event ou arrow
function greet(name, event) {
  console.log(\`Olá \${name}!\`)
  console.log(event.target.textContent)
}
</script>

<template>
  <!-- Event automático -->
  <button @click="handleClick">Clique</button>

  <!-- $event explícito -->
  <button @click="greet('Vue', $event)">Olá Vue</button>

  <!-- Arrow function — mesma coisa, mais flexível -->
  <button @click="(e) => greet('Vue', e)">Olá Vue</button>
</template>`,
    },
    {
      title: 'Modificadores de evento — sem código extra',
      body: `Vue oferece modificadores que tratam casos comuns sem precisar de código dentro do método.
Isso mantém o método focado na lógica, não em detalhes do DOM.`,
      code: `<!-- .prevent → event.preventDefault() -->
<form @submit.prevent="onSubmit">

<!-- .stop → event.stopPropagation() -->
<div @click="parentClick">
  <button @click.stop="childClick">Não propaga</button>
</div>

<!-- .self → só dispara se o clique for no próprio elemento -->
<div @click.self="onDivClick">
  <span>Clicar aqui não dispara</span>
</div>

<!-- .once → dispara apenas uma vez -->
<button @click.once="subscribe">Assinar (1x)</button>

<!-- .capture → usa fase de captura ao invés de bubbling -->
<div @click.capture="onCapture">...</div>

<!-- Encadeamento de modificadores -->
<a @click.stop.prevent="navigate">Link seguro</a>`,
    },
    {
      title: 'Modificadores de tecla',
      body: `Para eventos de teclado, use modificadores para filtrar qual tecla dispara o handler.
Vue tem atalhos para as teclas mais comuns.`,
      code: `<!-- Teclas comuns: enter, tab, delete, esc, space, up, down, left, right -->

<!-- Enter envia -->
<input @keyup.enter="submit" placeholder="Enter = enviar" />

<!-- Esc cancela -->
<input @keyup.esc="cancel" placeholder="Esc = cancelar" />

<!-- Setas de navegação -->
<div @keydown.up="moveUp" @keydown.down="moveDown" tabindex="0">

<!-- Combinações com modificadores de sistema -->
<input @keyup.ctrl.enter="sendMessage" />   <!-- Ctrl+Enter -->
<input @keyup.meta.enter="sendMessage" />   <!-- Cmd+Enter (Mac) -->
<button @click.ctrl="selectAll">Ctrl+Click</button>`,
    },
    {
      title: 'Múltiplos handlers e handlers inline complexos',
      body: `Você pode passar múltiplos handlers para um evento usando vírgula.
Handlers inline podem ser funções arrow complexas se necessário.`,
      code: `<script setup>
function track(event) {
  console.log('analytics:', event.type)
}

function handleSubmit(data) {
  console.log('submit:', data)
}

function validate(event) {
  return event.target.value.length > 0
}
</script>

<template>
  <!-- Múltiplos handlers para o mesmo evento -->
  <button @click="track($event), handleSubmit(formData)">
    Enviar
  </button>

  <!-- Handler arrow com lógica inline -->
  <input
    @input="(e) => {
      if (validate(e)) value = e.target.value
    }"
  />
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
    {
      id: 'ev-fc-6',
      front: 'Como passar um argumento E acessar o Event no mesmo handler?',
      back: 'Use `$event` explicitamente, ou uma arrow function.',
      code: `<button @click="greet('Ana', $event)">
<button @click="(e) => greet('Ana', e)">`,
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
      title: 'Game de cliques',
      description: 'Complete o handler de clique (Ctrl dobra, clique normal +1) e o evento de botão direito (-5).',
      xpReward: 50,
      template: `<script setup>
import { ref, computed } from 'vue'

const clicks = ref(0)

const levelMsg = computed(() => {
  if (clicks.value >= 100) return '🔥 Lenda!'
  if (clicks.value >= 50) return '⚡ Expert!'
  if (clicks.value >= 20) return '👍 Bom!'
  return '🐣 Iniciante'
})

function handleClick(e) {
  if (e.___) {
    clicks.value *= 2
  } else {
    clicks.value++
  }
}
</script>

<template>
  <p>{{ clicks }} cliques — {{ levelMsg }}</p>
  <button
    @click="handleClick"
    @___.prevent="clicks = Math.max(0, clicks - 5)"
    style="padding: 2rem 4rem; font-size: 2rem"
  >
    👆 CLIQUE!
  </button>
  <p><small>Ctrl+Click = dobrar | Botão direito = -5</small></p>
</template>`,
      blanks: ['ctrlKey', 'contextmenu'],
      solution: `<script setup>
import { ref, computed } from 'vue'

const clicks = ref(0)

const levelMsg = computed(() => {
  if (clicks.value >= 100) return '🔥 Lenda!'
  if (clicks.value >= 50) return '⚡ Expert!'
  if (clicks.value >= 20) return '👍 Bom!'
  return '🐣 Iniciante'
})

function handleClick(e) {
  if (e.ctrlKey) {
    clicks.value *= 2
  } else {
    clicks.value++
  }
}
</script>

<template>
  <p>{{ clicks }} cliques — {{ levelMsg }}</p>
  <button
    @click="handleClick"
    @contextmenu.prevent="clicks = Math.max(0, clicks - 5)"
    style="padding: 2rem 4rem; font-size: 2rem"
  >
    👆 CLIQUE!
  </button>
  <p><small>Ctrl+Click = dobrar | Botão direito = -5</small></p>
</template>`,
      hint: 'event.ctrlKey detecta Ctrl pressionado. @contextmenu é o botão direito do mouse.',
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
