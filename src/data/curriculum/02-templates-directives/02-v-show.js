export default {
  id: 'v-show',
  moduleId: 'templates-directives',
  title: 'v-show',
  icon: '👁️',
  xpReward: 20,
  docUrl: 'https://vuejs.org/guide/essentials/conditional#v-show',

  theory: [
    {
      title: 'v-show — esconde ou mostra',
      body: `O v-show é o "esconde ou mostra" — o elemento sempre existe no DOM, ele apenas recebe display: none quando a condição é false. É como colocar um pano sobre algo em vez de destruir.

Por estar sempre no DOM, o toggle é instantâneo — sem criar/destruir elementos.`,
      code: `<script setup>
import { ref } from 'vue'
const menuAberto = ref(false)
</script>

<template>
  <button @click="menuAberto = !menuAberto">☰ Menu</button>

  <!-- Sempre existe no DOM, só o display muda -->
  <nav v-show="menuAberto">
    <a>Início</a>
    <a>Perfil</a>
    <a>Sair</a>
  </nav>
</template>`,
    },
    {
      title: 'Limitações do v-show',
      body: `O v-show tem duas limitações importantes: não funciona na tag <template> (que não gera elemento real no DOM), e não suporta v-else.

Para esses casos, use v-if.`,
      code: `<!-- ❌ v-show não funciona em <template> -->
<template v-show="ok">
  <p>Não vai funcionar</p>
</template>

<!-- ✅ Use v-if em <template> -->
<template v-if="ok">
  <p>Funciona!</p>
</template>

<!-- ❌ v-show não tem v-else -->
<div v-show="a">A</div>
<!-- não dá para fazer v-else aqui -->`,
    },
    {
      title: 'v-show vs v-if — tabela de decisão',
      body: `A escolha certa depende do padrão de uso:

v-show: elemento sempre renderizado, toggle via CSS → ideal quando alterna muito (modais, menus, tooltips).
v-if: elemento criado/destruído → ideal para condições raras, permissões, carregamento de dados.`,
      code: `<!-- v-show: elementos que alternam com frequência -->
<Dropdown v-show="aberto" />
<Tooltip v-show="hovered" />
<Drawer v-show="sidebarAberta" />

<!-- v-if: condições raramente mudam -->
<PainelAdmin v-if="user.isAdmin" />
<GraficoVendas v-if="dados.length > 0" :data="dados" />
<MensagemErro v-if="temErro" :erro="erro" />`,
    },
  ],

  flashcards: [
    {
      id: 'vshow-fc-1',
      front: 'Como v-show oculta elementos?',
      back: 'Adicionando display:none via CSS. O elemento sempre existe no DOM — apenas fica invisível.',
      code: `<div v-show="false">
<!-- display: none aplicado -->
</div>`,
      lessonTitle: 'v-show',
    },
    {
      id: 'vshow-fc-2',
      front: 'Quais são as limitações do v-show?',
      back: 'Não funciona em <template> e não suporta v-else.',
      code: `<!-- ❌ -->
<template v-show="ok">...`,
      lessonTitle: 'v-show',
    },
    {
      id: 'vshow-fc-3',
      front: 'v-show ou v-if para um menu que abre/fecha frequentemente?',
      back: 'v-show — o toggle é só CSS, sem criar/destruir o elemento. Muito mais eficiente para alternâncias frequentes.',
      code: `<nav v-show="menuAberto">...</nav>`,
      lessonTitle: 'v-show',
    },
  ],

  challenges: [
    {
      id: 'vshow-ch-1',
      type: 'fill-blank',
      title: 'Tooltip com v-show',
      description: 'Complete: use v-show para mostrar o tooltip ao passar o mouse e @mouseenter/@mouseleave para controlar.',
      xpReward: 25,
      template: `<script setup>
import { ref } from 'vue'
const hovered = ref(false)
</script>

<template>
  <div
    style="display:inline-block; position:relative"
    @___="hovered = true"
    @___="hovered = false"
  >
    <button>Passe o mouse ℹ️</button>
    <div ___="hovered" style="position:absolute; background:#333; color:#fff; padding:4px 8px; border-radius:4px; top:100%; left:0; white-space:nowrap">
      v-show mantém o elemento no DOM!
    </div>
  </div>
</template>`,
      blanks: ['mouseenter', 'mouseleave', 'v-show'],
      solution: `<script setup>
import { ref } from 'vue'
const hovered = ref(false)
</script>

<template>
  <div
    style="display:inline-block; position:relative"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
  >
    <button>Passe o mouse ℹ️</button>
    <div v-show="hovered" style="position:absolute; background:#333; color:#fff; padding:4px 8px; border-radius:4px; top:100%; left:0; white-space:nowrap">
      v-show mantém o elemento no DOM!
    </div>
  </div>
</template>`,
      hint: '@mouseenter dispara quando o mouse entra, @mouseleave quando sai. v-show mostra/oculta via CSS.',
    },
    {
      id: 'vshow-ch-2',
      type: 'fix-bug',
      title: 'v-show usado errado',
      description: 'O código usa v-show em dois lugares onde não funciona ou não é ideal. Corrija.',
      xpReward: 30,
      buggyCode: `<script setup>
import { ref } from 'vue'
const admin = ref(false)
const tooltipVisivel = ref(false)
</script>

<template>
  <template v-show="admin">
    <h2>Painel Admin</h2>
    <p>Apenas para admins</p>
  </template>

  <button @click="tooltipVisivel = !tooltipVisivel">
    Info
  </button>
  <p v-show="tooltipVisivel">Esta é a dica!</p>
  <p v-else>Clique para ver a dica</p>
</template>`,
      solution: `<script setup>
import { ref } from 'vue'
const admin = ref(false)
const tooltipVisivel = ref(false)
</script>

<template>
  <template v-if="admin">
    <h2>Painel Admin</h2>
    <p>Apenas para admins</p>
  </template>

  <button @click="tooltipVisivel = !tooltipVisivel">
    Info
  </button>
  <p v-show="tooltipVisivel">Esta é a dica!</p>
</template>`,
      explanation: '1) v-show não funciona em <template> — use v-if. 2) v-show não suporta v-else — remova o v-else.',
    },
  ],
}
