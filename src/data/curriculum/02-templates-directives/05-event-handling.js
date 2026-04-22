export default {
  id: 'event-handling',
  moduleId: 'templates-directives',
  title: '@evento',
  icon: '🔔',
  xpReward: 25,
  docUrl: 'https://vuejs.org/guide/essentials/event-handling',

  theory: [
    {
      title: '@evento — o interfone do Vue',
      body: `O @evento é o "interfone" — ele escuta quando o usuário faz algo (clicar, digitar, pressionar tecla) e chama uma função. É a forma curta de v-on:evento.`,
      code: `<script setup>
import { ref } from 'vue'
const count = ref(0)

function incrementar() {
  count.value++
}
</script>

<template>
  <!-- Expressão inline -->
  <button @click="count++">+1</button>

  <!-- Método -->
  <button @click="incrementar">+1 com método</button>

  <!-- Outros eventos -->
  <input @keyup="console.log('tecla!')" />
  <input @focus="console.log('focado!')" />
</template>`,
    },
    {
      title: 'O objeto Event e $event',
      body: `Quando você passa só o nome do método (sem parênteses), o Vue entrega o objeto Event automaticamente.

Se precisar passar argumentos E o event ao mesmo tempo, use $event na chamada.`,
      code: `<script setup>
function handleClick(event) {
  console.log(event.target)    // elemento clicado
  console.log(event.clientX)   // posição X
}

function saudar(nome, event) {
  console.log(\`Olá \${nome}!\`, event.target.textContent)
}
</script>

<template>
  <!-- Event automático — método sem () -->
  <button @click="handleClick">Clique</button>

  <!-- $event explícito com outros argumentos -->
  <button @click="saudar('Vue', $event)">Olá Vue</button>
</template>`,
    },
    {
      title: 'Modificadores — .prevent, .stop, .once',
      body: `Modificadores são "poderes extras" para seus handlers. Sem eles, você teria que chamar event.preventDefault() ou event.stopPropagation() manualmente dentro do método.`,
      code: `<!-- .prevent → event.preventDefault() — form não recarrega -->
<form @submit.prevent="enviar">

<!-- .stop → event.stopPropagation() — não propaga ao pai -->
<button @click.stop="acao">Não propaga</button>

<!-- .once → dispara apenas uma vez -->
<button @click.once="assinar">Assinar (1x)</button>

<!-- .self → só dispara se clicar no próprio elemento -->
<div @click.self="fecharModal">
  <button>Não fecha o modal</button>
</div>

<!-- Encadeamento -->
<a @click.stop.prevent="navegar">Link seguro</a>`,
    },
    {
      title: 'Modificadores de tecla',
      body: `Para eventos de teclado, use modificadores para filtrar qual tecla dispara o handler. Sem eles, o handler dispararia para qualquer tecla.`,
      code: `<!-- Teclas específicas -->
<input @keyup.enter="enviar" placeholder="Enter = enviar" />
<input @keyup.esc="cancelar" placeholder="Esc = cancelar" />
<div @keydown.up="moverCima" @keydown.down="moverBaixo" tabindex="0" />

<!-- Combinações -->
<input @keyup.ctrl.enter="enviarMensagem" />
<input @keyup.meta.enter="enviarMensagem" />  <!-- Cmd+Enter no Mac -->`,
    },
  ],

  flashcards: [
    {
      id: 'event-fc-1',
      front: 'Qual é a forma curta de v-on:click?',
      back: '@click. O @ é atalho para v-on:. Funciona com qualquer evento DOM.',
      code: `<button @click="handler">Clique</button>`,
      lessonTitle: '@evento',
    },
    {
      id: 'event-fc-2',
      front: 'Como acessar o objeto Event no handler?',
      back: 'Se passar só o nome do método (sem ()), Vue injeta o Event automaticamente como primeiro argumento.',
      code: `function click(event) { console.log(event.target) }
// <button @click="click">`,
      lessonTitle: '@evento',
    },
    {
      id: 'event-fc-3',
      front: 'O que fazem .prevent e .stop?',
      back: '.prevent → event.preventDefault() (evita reload do form).\n.stop → event.stopPropagation() (evita bubbling).',
      code: `<form @submit.prevent="enviar">
<button @click.stop="acao">`,
      lessonTitle: '@evento',
    },
    {
      id: 'event-fc-4',
      front: 'Como escutar a tecla Enter num input?',
      back: '@keyup.enter="fn". Outros modificadores: .esc, .tab, .space, .up, .down.',
      code: `<input @keyup.enter="enviar" />`,
      lessonTitle: '@evento',
    },
  ],

  challenges: [
    {
      id: 'event-ch-1',
      type: 'fill-blank',
      title: 'Eventos básicos',
      description: 'Conecte o botão ao método addPonto e o input ao handler onKeyup.',
      xpReward: 20,
      template: `<script setup>
import { ref } from 'vue'
const pontos = ref(0)
const tecla = ref('')

function addPonto() { pontos.value++ }
function onKeyup(e) { tecla.value = e.key }
</script>

<template>
  <button ___="addPonto">+1 ponto</button>
  <input ___="onKeyup" placeholder="Digite algo" />
  <p>Pontos: {{ pontos }} | Tecla: {{ tecla }}</p>
</template>`,
      blanks: ['@click', '@keyup'],
      solution: `<script setup>
import { ref } from 'vue'
const pontos = ref(0)
const tecla = ref('')

function addPonto() { pontos.value++ }
function onKeyup(e) { tecla.value = e.key }
</script>

<template>
  <button @click="addPonto">+1 ponto</button>
  <input @keyup="onKeyup" placeholder="Digite algo" />
  <p>Pontos: {{ pontos }} | Tecla: {{ tecla }}</p>
</template>`,
      hint: '@click para botão, @keyup para teclado. O @ é a forma curta de v-on:.',
    },
    {
      id: 'event-ch-2',
      type: 'fill-blank',
      title: 'Formulário com modificadores',
      description: 'Complete: o form não deve recarregar a página, o botão interno não deve propagar o clique.',
      xpReward: 30,
      template: `<script setup>
import { ref } from 'vue'
const email = ref('')
const enviado = ref(false)
</script>

<template>
  <form @submit.___="enviado = true">
    <input v-model="email" type="email" placeholder="Email" />
    <div @click="console.log('div clicado')">
      <button type="button" @click.___="console.log('botão interno')">
        Ação interna
      </button>
    </div>
    <button type="submit">Enviar</button>
  </form>
  <p v-if="enviado">✅ Enviado: {{ email }}</p>
</template>`,
      blanks: ['prevent', 'stop'],
      solution: `<script setup>
import { ref } from 'vue'
const email = ref('')
const enviado = ref(false)
</script>

<template>
  <form @submit.prevent="enviado = true">
    <input v-model="email" type="email" placeholder="Email" />
    <div @click="console.log('div clicado')">
      <button type="button" @click.stop="console.log('botão interno')">
        Ação interna
      </button>
    </div>
    <button type="submit">Enviar</button>
  </form>
  <p v-if="enviado">✅ Enviado: {{ email }}</p>
</template>`,
      hint: '.prevent para não recarregar. .stop para não propagar o clique ao elemento pai.',
    },
    {
      id: 'event-ch-3',
      type: 'fix-bug',
      title: 'Bugs nos eventos',
      description: 'O formulário tem 3 erros de evento. Corrija.',
      xpReward: 35,
      buggyCode: `<script setup>
import { ref } from 'vue'
const nome = ref('')

function enviar() { console.log('Enviado:', nome.value) }
function mostrarInfo(elemento, event) { console.log(elemento, event.target) }
</script>

<template>
  <form @submit="enviar">
    <input v-model="nome" @keyup="enviar" placeholder="Nome" />
    <button @click="mostrarInfo('botão')">Enviar</button>
  </form>
</template>`,
      solution: `<script setup>
import { ref } from 'vue'
const nome = ref('')

function enviar() { console.log('Enviado:', nome.value) }
function mostrarInfo(elemento, event) { console.log(elemento, event.target) }
</script>

<template>
  <form @submit.prevent="enviar">
    <input v-model="nome" @keyup.enter="enviar" placeholder="Nome" />
    <button @click="mostrarInfo('botão', $event)">Enviar</button>
  </form>
</template>`,
      explanation: '1) @submit sem .prevent recarrega a página. 2) @keyup sem .enter dispara para qualquer tecla. 3) mostrarInfo precisa de $event como segundo argumento.',
    },
  ],
}
