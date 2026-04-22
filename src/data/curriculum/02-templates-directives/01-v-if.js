export default {
  id: 'v-if',
  moduleId: 'templates-directives',
  title: 'v-if',
  icon: '🚪',
  xpReward: 25,
  docUrl: 'https://vuejs.org/guide/essentials/conditional',

  theory: [
    {
      title: 'v-if — nasce ou morre',
      body: `O v-if é o "nasce ou morre" do Vue. Quando a condição é false, o elemento é completamente removido do HTML. Quando é true, ele é criado e inserido. Não é só esconder — é literalmente existir ou não existir no DOM.`,
      code: `<script setup>
import { ref } from 'vue'
const logado = ref(false)
const nivel = ref(3)
</script>

<template>
  <h1 v-if="logado">Bem-vindo de volta! 👋</h1>
  <p v-if="nivel >= 5">⭐ Você é Expert!</p>
</template>`,
    },
    {
      title: 'v-else e v-else-if',
      body: `Encadeie condições exatamente como um if/else do JavaScript. A regra: os blocos precisam ser irmãos consecutivos — sem elementos no meio.`,
      code: `<script setup>
import { ref } from 'vue'
const nota = ref(78)
</script>

<template>
  <p v-if="nota >= 90">🏆 Excelente — Nota A</p>
  <p v-else-if="nota >= 80">✅ Muito bom — Nota B</p>
  <p v-else-if="nota >= 70">👍 Bom — Nota C</p>
  <p v-else>📚 Precisa estudar mais</p>
</template>`,
    },
    {
      title: 'v-if em template — sem wrapper no DOM',
      body: `Quando precisa condicionar vários elementos sem criar uma div desnecessária, use <template v-if>. A tag <template> é invisível — não aparece no HTML final.`,
      code: `<template>
  <!-- ❌ Cria um div extra no DOM -->
  <div v-if="temPermissao">
    <h2>Painel Admin</h2>
    <p>Dados confidenciais</p>
  </div>

  <!-- ✅ Nenhum elemento extra -->
  <template v-if="temPermissao">
    <h2>Painel Admin</h2>
    <p>Dados confidenciais</p>
  </template>
</template>`,
    },
    {
      title: 'v-if vs v-show — quando usar cada um',
      body: `v-if: cria e destrói o elemento a cada alternância — mais custoso, mas não renderiza nada desnecessariamente.
v-show: sempre existe no DOM, apenas muda o CSS display — alternância muito mais rápida.

Regra: toggle frequente → v-show. Condição rara ou baseada em permissão → v-if.`,
      code: `<!-- ✅ v-show: toggle frequente (menu, modal, tooltip) -->
<nav v-show="menuAberto">...</nav>
<Modal v-show="modalAberto" />

<!-- ✅ v-if: condição raramente muda -->
<PainelAdmin v-if="usuario.isAdmin" />
<ErrorBoundary v-if="temErro" />`,
    },
  ],

  flashcards: [
    {
      id: 'vif-fc-1',
      front: 'Qual a diferença entre v-if e v-show?',
      back: 'v-if remove/cria o elemento no DOM.\nv-show apenas liga/desliga display:none — o elemento sempre existe.',
      code: `<div v-if="ok">Cria/remove</div>
<div v-show="ok">Mostra/oculta</div>`,
      lessonTitle: 'v-if',
    },
    {
      id: 'vif-fc-2',
      front: 'Como condicionar vários elementos sem criar uma div wrapper?',
      back: 'Use <template v-if>. A tag template não aparece no DOM final.',
      code: `<template v-if="ok">
  <h1>Título</h1>
  <p>Parágrafo</p>
</template>`,
      lessonTitle: 'v-if',
    },
    {
      id: 'vif-fc-3',
      front: 'Quando usar v-show em vez de v-if?',
      back: 'Quando o elemento alterna frequentemente (menus, modais, tooltips). v-show é mais eficiente para toggle rápido.',
      code: `<Modal v-show="aberto" />`,
      lessonTitle: 'v-if',
    },
    {
      id: 'vif-fc-4',
      front: 'Qual a regra para usar v-else e v-else-if?',
      back: 'Devem ser irmãos consecutivos do v-if, sem nenhum elemento no meio.',
      code: `<p v-if="a">A</p>
<p v-else-if="b">B</p>
<p v-else>Padrão</p>`,
      lessonTitle: 'v-if',
    },
  ],

  challenges: [
    {
      id: 'vif-ch-1',
      type: 'fill-blank',
      title: 'Login com v-if/v-else',
      description: 'Exiba o painel logado ou o formulário de login dependendo do estado.',
      xpReward: 25,
      template: `<script setup>
import { ref } from 'vue'
const logado = ref(false)
const nome = ref('')
</script>

<template>
  <div ___="logado">
    <h2>Olá, {{ nome }}! 👋</h2>
    <button @click="logado = false">Sair</button>
  </div>
  <div ___>
    <input v-model="nome" placeholder="Seu nome" />
    <button @click="logado = true">Entrar</button>
  </div>
</template>`,
      blanks: ['v-if', 'v-else'],
      solution: `<script setup>
import { ref } from 'vue'
const logado = ref(false)
const nome = ref('')
</script>

<template>
  <div v-if="logado">
    <h2>Olá, {{ nome }}! 👋</h2>
    <button @click="logado = false">Sair</button>
  </div>
  <div v-else>
    <input v-model="nome" placeholder="Seu nome" />
    <button @click="logado = true">Entrar</button>
  </div>
</template>`,
      hint: 'v-if no bloco logado, v-else no bloco de login. Devem ser irmãos consecutivos.',
    },
    {
      id: 'vif-ch-2',
      type: 'fill-blank',
      title: 'Sistema de badges com v-else-if',
      description: 'Exiba o badge correto baseado no nível do usuário.',
      xpReward: 30,
      template: `<script setup>
import { ref } from 'vue'
const nivel = ref(7)
</script>

<template>
  <span v-if="nivel >= 10">🥇 Ouro</span>
  <span ___="nivel >= 5">🥈 Prata</span>
  <span ___>🥉 Bronze</span>
  <br />
  <button @click="nivel++">+1 nível (atual: {{ nivel }})</button>
</template>`,
      blanks: ['v-else-if', 'v-else'],
      solution: `<script setup>
import { ref } from 'vue'
const nivel = ref(7)
</script>

<template>
  <span v-if="nivel >= 10">🥇 Ouro</span>
  <span v-else-if="nivel >= 5">🥈 Prata</span>
  <span v-else>🥉 Bronze</span>
  <br />
  <button @click="nivel++">+1 nível (atual: {{ nivel }})</button>
</template>`,
      hint: 'v-else-if continua a cadeia condicional. v-else captura tudo que não passou pelas condições anteriores.',
    },
    {
      id: 'vif-ch-3',
      type: 'fix-bug',
      title: 'Bugs no v-if',
      description: 'O sistema de badges tem 3 erros na lógica condicional. Corrija.',
      xpReward: 35,
      buggyCode: `<script setup>
import { ref } from 'vue'
const score = ref(85)
</script>

<template>
  <p v-if="score >= 50">🥉 Iniciante</p>
  <p v-if="score >= 75">🥈 Intermediário</p>
  <p v-else-if="score >= 90">🥇 Expert</p>
  <p v-if="score < 50">❌ Reprovado</p>
</template>`,
      solution: `<script setup>
import { ref } from 'vue'
const score = ref(85)
</script>

<template>
  <p v-if="score >= 90">🥇 Expert</p>
  <p v-else-if="score >= 75">🥈 Intermediário</p>
  <p v-else-if="score >= 50">🥉 Iniciante</p>
  <p v-else>❌ Reprovado</p>
</template>`,
      explanation: '1) Condições fora de ordem — a mais ampla (>=50) captura tudo. 2) v-if separado quebra a cadeia — use v-else-if. 3) Último caso use v-else, não v-if com condição explícita.',
    },
  ],
}
