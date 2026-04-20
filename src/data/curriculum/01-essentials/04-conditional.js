export default {
  id: 'conditional',
  moduleId: 'essentials',
  title: 'Conditional Rendering',
  icon: '🔀',
  xpReward: 30,
  docUrl: 'https://vuejs.org/guide/essentials/conditional',

  theory: [
    {
      title: 'v-if — renderização condicional',
      body: `Pensa no v-if como uma porta. Quando a condição é false, a porta está fechada — o elemento nem existe no DOM. Quando é true, o elemento é criado e inserido na página.
Isso é diferente de só ocultar visualmente: o elemento realmente não existe quando false.`,
      code: `<script setup>
import { ref } from 'vue'
const isLoggedIn = ref(false)
const userLevel = ref(3)
</script>

<template>
  <!-- Elemento existe no DOM somente quando true -->
  <h1 v-if="isLoggedIn">Bem-vindo de volta! 👋</h1>

  <!-- Combinando com expressão -->
  <span v-if="userLevel >= 5">⭐ Expert</span>
</template>`,
    },
    {
      title: 'v-else e v-else-if — múltiplas condições',
      body: `Encadeie condições com v-else-if e v-else, exatamente como um if/else if/else do JavaScript. A regra é simples: eles precisam estar um logo após o outro, sem elementos no meio.`,
      code: `<script setup>
import { ref } from 'vue'
const score = ref(78)
</script>

<template>
  <div v-if="score >= 90">
    🏆 Excelente! Nota A
  </div>
  <div v-else-if="score >= 80">
    ✅ Muito bom! Nota B
  </div>
  <div v-else-if="score >= 70">
    👍 Bom! Nota C
  </div>
  <div v-else>
    📚 Precisa estudar mais. Nota F
  </div>
</template>`,
    },
    {
      title: 'v-if em <template> — sem wrapper no DOM',
      body: `E se você quiser condicionar vários elementos sem adicionar uma div desnecessária no DOM? Use <template v-if>. O <template> é uma tag invisível — ela só existe no código, não aparece na página renderizada.`,
      code: `<script setup>
import { ref } from 'vue'
const hasPermission = ref(true)
</script>

<template>
  <!-- ❌ Adiciona <div> desnecessária no DOM -->
  <div v-if="hasPermission">
    <h2>Painel Admin</h2>
    <p>Dados confidenciais aqui</p>
  </div>

  <!-- ✅ Nenhum elemento extra no DOM -->
  <template v-if="hasPermission">
    <h2>Painel Admin</h2>
    <p>Dados confidenciais aqui</p>
  </template>
</template>`,
    },
    {
      title: 'v-show — visibilidade com CSS',
      body: `O v-show é diferente do v-if: o elemento SEMPRE existe no DOM, mas fica visível ou invisível via CSS (display: none). Como o elemento já está montado, alternar é muito mais rápido.
Limitação: não funciona em <template> e não suporta v-else.`,
      code: `<script setup>
import { ref } from 'vue'
const isMenuOpen = ref(false)
const isAdmin = ref(true)
</script>

<template>
  <!-- v-show: toggle rápido, elemento sempre no DOM -->
  <nav v-show="isMenuOpen" class="dropdown">
    <a>Home</a>
    <a>Perfil</a>
  </nav>
  <button @click="isMenuOpen = !isMenuOpen">☰ Menu</button>

  <!-- v-if: cria e destrói o componente -->
  <AdminPanel v-if="isAdmin" />
</template>`,
    },
    {
      title: 'v-if vs v-show — quando usar cada um',
      body: `Regra simples: se o elemento vai aparecer/sumir frequentemente (menus, modais, tooltips) → use v-show. Se a condição raramente muda ou depende de permissão → use v-if.
v-show tem custo inicial maior (sempre renderiza), mas toggle é barato. v-if tem custo de montagem/desmontagem a cada alternância.`,
      code: `<!-- ✅ v-show: toggle frequente -->
<Modal v-show="isOpen" />
<Tooltip v-show="hovered" />
<Drawer v-show="sidebarOpen" />

<!-- ✅ v-if: condição raramente muda ou depende de auth -->
<AdminPanel v-if="user.isAdmin" />
<ErrorBoundary v-if="hasError" :error="error" />
<DataChart v-if="chartData.length > 0" :data="chartData" />`,
    },
  ],

  flashcards: [
    {
      id: 'cond-fc-1',
      front: 'Qual a diferença entre v-if e v-show?',
      back: '`v-if` cria/destrói o elemento no DOM.\n`v-show` só alterna `display:none` — o elemento sempre existe.',
      code: `<div v-if="show">Cria/destrói</div>
<div v-show="show">Só oculta</div>`,
      lessonTitle: 'Conditional Rendering',
    },
    {
      id: 'cond-fc-2',
      front: 'Quando usar v-show ao invés de v-if?',
      back: 'Quando precisa alternar frequentemente (modais, menus). v-show é mais performático para toggle.',
      code: `<Modal v-show="isOpen" />`,
      lessonTitle: 'Conditional Rendering',
    },
    {
      id: 'cond-fc-3',
      front: 'Como usar v-if em vários elementos sem criar um wrapper no DOM?',
      back: 'Use `<template v-if="...">`. O `<template>` não aparece no DOM final.',
      code: `<template v-if="ok">
  <h1>Título</h1>
  <p>Parágrafo</p>
</template>`,
      lessonTitle: 'Conditional Rendering',
    },
    {
      id: 'cond-fc-4',
      front: 'Qual a ordem correta dos condicionais encadeados?',
      back: '`v-if` → `v-else-if` → `v-else`. Devem ser elementos irmãos consecutivos.',
      code: `<div v-if="a">A</div>
<div v-else-if="b">B</div>
<div v-else>Padrão</div>`,
      lessonTitle: 'Conditional Rendering',
    },
    {
      id: 'cond-fc-5',
      front: 'Quais são as limitações do v-show?',
      back: 'Não funciona em `<template>` e não suporta `v-else`. O elemento sempre existe no DOM, só a visibilidade muda.',
      code: `<!-- ❌ v-show não funciona em <template> -->
<template v-show="ok">...</template>

<!-- ✅ Use v-if em <template> -->
<template v-if="ok">...</template>`,
      lessonTitle: 'Conditional Rendering',
    },
  ],

  challenges: [
    {
      id: 'cond-ch-1',
      type: 'fill-blank',
      title: 'v-if básico',
      description: 'Exiba a mensagem "🔓 Acesso liberado!" apenas se `hasAccess` for true, e "🔒 Acesso negado" caso contrário.',
      xpReward: 20,
      template: `<template>
  <p ___="hasAccess">🔓 Acesso liberado!</p>
  <p ___>🔒 Acesso negado</p>
</template>`,
      blanks: ['v-if', 'v-else'],
      solution: `<template>
  <p v-if="hasAccess">🔓 Acesso liberado!</p>
  <p v-else>🔒 Acesso negado</p>
</template>`,
      hint: 'Use v-if e v-else em elementos irmãos consecutivos.',
    },
    {
      id: 'cond-ch-2',
      type: 'fill-blank',
      title: 'Sistema de níveis com v-else-if',
      description: 'Complete o sistema de badges: "🥇 Ouro" se level >= 10, "🥈 Prata" se >= 5, "🥉 Bronze" caso contrário.',
      xpReward: 25,
      template: `<template>
  <span v-if="level >= 10">🥇 Ouro</span>
  <span ___="level >= 5">🥈 Prata</span>
  <span ___>🥉 Bronze</span>
</template>`,
      blanks: ['v-else-if', 'v-else'],
      solution: `<template>
  <span v-if="level >= 10">🥇 Ouro</span>
  <span v-else-if="level >= 5">🥈 Prata</span>
  <span v-else>🥉 Bronze</span>
</template>`,
      hint: 'v-else-if vem entre v-if e v-else.',
    },
    {
      id: 'cond-ch-3',
      type: 'fill-blank',
      title: 'Dashboard de login',
      description: 'Complete as diretivas condicionais e os eventos dos botões de entrar/sair.',
      xpReward: 45,
      template: `<script setup>
import { ref } from 'vue'

const isLoggedIn = ref(false)
const username = ref('')
</script>

<template>
  <div ___="isLoggedIn">
    <h2>Olá, {{ username }}! 👋</h2>
    <button @click="isLoggedIn = ___">Sair</button>
  </div>

  <div ___>
    <input v-model="username" placeholder="Seu nome" />
    <button @click="isLoggedIn = ___">Entrar</button>
  </div>
</template>`,
      blanks: ['v-if', 'false', 'v-else', 'true'],
      solution: `<script setup>
import { ref } from 'vue'

const isLoggedIn = ref(false)
const username = ref('')
</script>

<template>
  <div v-if="isLoggedIn">
    <h2>Olá, {{ username }}! 👋</h2>
    <button @click="isLoggedIn = false">Sair</button>
  </div>

  <div v-else>
    <input v-model="username" placeholder="Seu nome" />
    <button @click="isLoggedIn = true">Entrar</button>
  </div>
</template>`,
      hint: 'v-if no bloco logado, v-else no bloco de login. Entrar = true, Sair = false.',
    },
    {
      id: 'cond-ch-4',
      type: 'fill-blank',
      title: 'Tooltip com v-show',
      description: 'Complete: use v-show para mostrar o tooltip e alterne ao clicar no botão.',
      xpReward: 40,
      template: `<script setup>
import { ref } from 'vue'

const showTip = ref(false)
</script>

<template>
  <button @click="showTip = ___">
    Dica ℹ️
  </button>
  <p ___="showTip">v-show mantém o elemento no DOM — ideal para toggle rápido!</p>
</template>`,
      blanks: ['!showTip', 'v-show'],
      solution: `<script setup>
import { ref } from 'vue'

const showTip = ref(false)
</script>

<template>
  <button @click="showTip = !showTip">
    Dica ℹ️
  </button>
  <p v-show="showTip">v-show mantém o elemento no DOM — ideal para toggle rápido!</p>
</template>`,
      hint: 'v-show mostra/oculta com CSS. !showTip inverte o valor booleano a cada clique.',
    },
    {
      id: 'cond-ch-5',
      type: 'fix-bug',
      title: 'Bugs no sistema de badges',
      description: 'O sistema de badges tem 3 erros. Encontre e corrija.',
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
      explanation: '1) Condições fora de ordem — a mais ampla (>= 50) captura tudo antes das mais específicas. 2) Segundo v-if quebra a cadeia — use v-else-if para continuar o encadeamento. 3) Último v-if com condição explícita — use v-else para o caso padrão.',
    },
  ],
}
