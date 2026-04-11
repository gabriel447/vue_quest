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
      body: `v-if renderiza o elemento apenas quando a condição é verdadeira.
Quando falsa, o elemento é completamente removido do DOM — não existe na árvore.`,
      code: `<script setup>
import { ref } from 'vue'
const isLoggedIn = ref(false)
const userLevel = ref(3)
</script>

<template>
  <!-- Elemento existe no DOM somente quando true -->
  <h1 v-if="isLoggedIn">Bem-vindo de volta!</h1>

  <!-- Combinando com expressão -->
  <span v-if="userLevel >= 5">⭐ Expert</span>
</template>`,
    },
    {
      title: 'v-else e v-else-if — múltiplas condições',
      body: `v-else fornece o bloco alternativo. v-else-if permite múltiplas condições encadeadas.
Devem ser colocados imediatamente após o elemento v-if ou v-else-if.`,
      code: `<script setup>
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
      body: `Para aplicar v-if a múltiplos elementos sem adicionar um div wrapper desnecessário, use em <template>.
O <template> é uma tag invisível — não aparece no DOM final.`,
      code: `<script setup>
const hasPermission = ref(true)
</script>

<template>
  <!-- ❌ Adiciona div desnecessária no DOM -->
  <div v-if="hasPermission">
    <h2>Painel Admin</h2>
    <p>Dados confidenciais aqui</p>
    <AdminMenu />
  </div>

  <!-- ✅ Nenhuma div extra no DOM -->
  <template v-if="hasPermission">
    <h2>Painel Admin</h2>
    <p>Dados confidenciais aqui</p>
    <AdminMenu />
  </template>
</template>`,
    },
    {
      title: 'v-show — visibilidade com CSS',
      body: `v-show alterna apenas a propriedade CSS display:none. O elemento sempre existe no DOM.
Não funciona em <template> e não suporta v-else.`,
      code: `<script setup>
const isMenuOpen = ref(false)
const isAdmin = ref(true)
</script>

<template>
  <!-- v-show: toggle rápido, elemento sempre no DOM -->
  <nav v-show="isMenuOpen" class="dropdown">
    <a>Home</a>
    <a>Perfil</a>
  </nav>
  <button @click="isMenuOpen = !isMenuOpen">Menu</button>

  <!-- v-if: elemento criado/destruído -->
  <AdminPanel v-if="isAdmin" />
</template>`,
    },
    {
      title: 'v-if vs v-show — quando usar cada um',
      body: `v-if: custo maior na alternância (monta/desmonta componente + lifecycle hooks). Menor custo inicial se falso.
v-show: custo menor na alternância (só CSS), mas sempre renderiza e executa lifecycle hooks.`,
      code: `<!-- ✅ v-show: toggle frequente (modais, dropdowns, tooltips) -->
<Modal v-show="isOpen" />
<Tooltip v-show="hovered" />
<Drawer v-show="sidebarOpen" />

<!-- ✅ v-if: condição raramente muda ou depende de dados async -->
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
      front: 'v-if e v-show podem estar no mesmo elemento?',
      back: 'Sim, mas evite — é confuso. Prefira usar computed ou mover a lógica para o script.',
      code: `<!-- Evite isso -->
<div v-if="a" v-show="b">...</div>

<!-- Prefira computed -->
<div v-if="showItem">...</div>`,
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
      title: 'FAQ com v-show',
      description: 'Complete a FAQ: use v-show para as respostas e alterne o estado ao clicar.',
      xpReward: 40,
      template: `<script setup>
import { ref } from 'vue'

const open = ref([false, false, false])

const faqs = [
  { q: 'O que é Vue.js?', a: 'Um framework JavaScript progressivo para UIs reativas.' },
  { q: 'Vue é difícil?', a: 'Não! Tem curva de aprendizado suave e boa documentação.' },
  { q: 'Vue é usado no trabalho?', a: 'Sim! Grandes empresas usam Vue em produção.' },
]
</script>

<template>
  <div v-for="(faq, i) in faqs" :key="i">
    <button @click="open[i] = !open[i]">
      {{ open[i] ? '▼' : '▶' }} {{ faq.q }}
    </button>
    <p ___="open[i]">{{ faq.a }}</p>
  </div>
</template>`,
      blanks: ['v-show'],
      solution: `<script setup>
import { ref } from 'vue'

const open = ref([false, false, false])

const faqs = [
  { q: 'O que é Vue.js?', a: 'Um framework JavaScript progressivo para UIs reativas.' },
  { q: 'Vue é difícil?', a: 'Não! Tem curva de aprendizado suave e boa documentação.' },
  { q: 'Vue é usado no trabalho?', a: 'Sim! Grandes empresas usam Vue em produção.' },
]
</script>

<template>
  <div v-for="(faq, i) in faqs" :key="i">
    <button @click="open[i] = !open[i]">
      {{ open[i] ? '▼' : '▶' }} {{ faq.q }}
    </button>
    <p v-show="open[i]">{{ faq.a }}</p>
  </div>
</template>`,
      hint: 'v-show mantém o elemento no DOM mas oculta com CSS. Ideal para toggle frequente.',
    },
    {
      id: 'cond-ch-5',
      type: 'fix-bug',
      title: 'Condicionais mal posicionados',
      description: 'O código tem erros: v-else não está logo após v-if, e v-show é usado onde v-if seria mais correto. Corrija.',
      xpReward: 30,
      buggyCode: `<template>
  <div>
    <p v-if="isAdmin">Painel Admin</p>
    <span class="badge">Usuário</span>
    <p v-else>Área restrita</p>

    <!-- Carregado do servidor, raramente muda -->
    <HeavyComponent v-show="dataLoaded" :data="serverData" />
  </div>
</template>`,
      solution: `<template>
  <div>
    <p v-if="isAdmin">Painel Admin</p>
    <p v-else>Área restrita</p>
    <span class="badge">Usuário</span>

    <!-- Carregado do servidor, raramente muda: use v-if -->
    <HeavyComponent v-if="dataLoaded" :data="serverData" />
  </div>
</template>`,
      explanation: 'v-else deve ser imediatamente após v-if. Para componentes pesados que raramente alternam, v-if é melhor que v-show (não monta quando falso).',
    },
  ],
}
