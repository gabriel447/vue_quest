export default {
  id: 'slots',
  moduleId: 'components',
  title: 'Slots',
  icon: '🧲',
  xpReward: 35,
  docUrl: 'https://vuejs.org/guide/components/slots',

  theory: [
    {
      title: 'Slot padrão — passando HTML para dentro do filho',
      body: `Props passam dados. Slots passam conteúdo HTML e outros componentes. O filho usa <slot /> como um espaço reservado — o pai preenche com o que quiser.
Isso permite criar componentes genéricos como Card, Modal, Button que funcionam com qualquer conteúdo.`,
      code: `<!-- Card.vue — componente com slot -->
<template>
  <div class="card">
    <slot />
  </div>
</template>

<!-- Pai preenche o slot -->
<Card>
  <h2>Título do card</h2>
  <p>Qualquer conteúdo aqui</p>
</Card>

<Card>
  <img src="foto.jpg" />
  <button>Seguir</button>
</Card>

<!-- Sem conteúdo: slot renderiza nada -->
<Card />`,
    },
    {
      title: 'Fallback — conteúdo padrão do slot',
      body: `Você pode definir um conteúdo padrão dentro do <slot>. Ele aparece quando o pai não passa nada. Se o pai passar conteúdo, o fallback é ignorado.`,
      code: `<!-- BotaoBase.vue -->
<template>
  <button class="btn">
    <slot>
      Clique aqui
    </slot>
  </button>
</template>

<!-- Pai não passa nada → mostra fallback "Clique aqui" -->
<BotaoBase />

<!-- Pai passa conteúdo → substitui o fallback -->
<BotaoBase>Enviar formulário</BotaoBase>
<BotaoBase>🗑️ Excluir</BotaoBase>`,
    },
    {
      title: 'Named slots — múltiplos slots',
      body: `Um componente pode ter vários slots com nomes diferentes. Use name= no slot do filho e v-slot:nome (ou o atalho #nome) no pai para preencher cada um.
O slot sem nome é o slot padrão (default).`,
      code: `<!-- Layout.vue -->
<template>
  <header>
    <slot name="header" />
  </header>
  <main>
    <slot />
  </main>
  <footer>
    <slot name="footer" />
  </footer>
</template>

<!-- Pai preenche cada slot -->
<Layout>
  <template #header>
    <h1>Meu Site</h1>
  </template>

  <p>Conteúdo principal aqui</p>

  <template #footer>
    <p>© 2024</p>
  </template>
</Layout>`,
    },
    {
      title: 'v-slot e o atalho #',
      body: `v-slot:nome é a diretiva para selecionar um named slot. O atalho # é como @ para v-on ou : para v-bind. Você pode usar v-slot só em <template> ou diretamente no componente (quando há só o default slot).`,
      code: `<!-- Forma longa -->
<template v-slot:header>
  <h1>Título</h1>
</template>

<!-- Atalho # (recomendado) -->
<template #header>
  <h1>Título</h1>
</template>

<!-- Default slot — atalho # sem nome -->
<template #default>
  <p>Conteúdo padrão</p>
</template>

<!-- Ou diretamente no componente (só default): -->
<Card>
  <p>Conteúdo</p>
</Card>`,
    },
    {
      title: 'Slots como ferramenta de composição',
      body: `Slots permitem criar componentes genéricos reutilizáveis. Em vez de duplicar código, você cria um "wrapper" configurável. Um Modal, por exemplo, controla a lógica de abrir/fechar mas deixa o conteúdo para quem usa.`,
      code: `<!-- Modal.vue — controla comportamento, não conteúdo -->
<script setup>
defineProps({ titulo: String })
defineEmits(['fechar'])
</script>

<template>
  <div class="overlay">
    <div class="modal">
      <div class="modal-header">
        <h3>{{ titulo }}</h3>
        <button @click="$emit('fechar')">✕</button>
      </div>
      <div class="modal-body">
        <slot />
      </div>
      <div class="modal-footer">
        <slot name="acoes">
          <button @click="$emit('fechar')">Fechar</button>
        </slot>
      </div>
    </div>
  </div>
</template>`,
    },
  ],

  flashcards: [
    {
      id: 'slots-fc-1',
      front: 'Para que serve um slot?',
      back: 'Permite que o pai passe conteúdo HTML para dentro do filho — como um espaço reservado configurável.',
      code: `<!-- Filho -->
<div class="card"><slot /></div>

<!-- Pai -->
<Card><h2>Título</h2></Card>`,
      lessonTitle: 'Slots',
    },
    {
      id: 'slots-fc-2',
      front: 'O que é fallback content de um slot?',
      back: 'Conteúdo dentro do `<slot>` que aparece quando o pai não passa nada.',
      code: `<button>
  <slot>Clique aqui</slot>
</button>
// Sem conteúdo: mostra "Clique aqui"`,
      lessonTitle: 'Slots',
    },
    {
      id: 'slots-fc-3',
      front: 'Como usar named slots?',
      back: 'Filho: `<slot name="header" />`. Pai: `<template #header>...</template>`.',
      code: `<!-- Filho -->
<slot name="header" />
<slot />

<!-- Pai -->
<template #header><h1>Título</h1></template>
<p>Conteúdo padrão</p>`,
      lessonTitle: 'Slots',
    },
    {
      id: 'slots-fc-4',
      front: 'Qual é o atalho para v-slot?',
      back: '`#` — exatamente como `@` para v-on e `:` para v-bind.',
      code: `<!-- Equivalentes -->
<template v-slot:header>
<template #header>`,
      lessonTitle: 'Slots',
    },
    {
      id: 'slots-fc-5',
      front: 'Quando usar slots vs props?',
      back: 'Props passam dados. Slots passam conteúdo (HTML, componentes). Use slots quando o "o quê renderizar" pertence a quem usa o componente.',
      code: `<!-- Props: dados simples -->
<Card titulo="Olá" />

<!-- Slots: conteúdo rico -->
<Card><img /><button>Ação</button></Card>`,
      lessonTitle: 'Slots',
    },
  ],

  challenges: [
    {
      id: 'slots-ch-1',
      type: 'fill-blank',
      title: 'Slot padrão',
      description: 'Complete o componente Card para aceitar conteúdo via slot padrão.',
      xpReward: 20,
      template: `<!-- Card.vue -->
<template>
  <div class="card">
    <___  />
  </div>
</template>

<!-- Uso: -->
<!-- <Card><p>Olá!</p></Card> -->`,
      blanks: ['slot'],
      solution: `<!-- Card.vue -->
<template>
  <div class="card">
    <slot />
  </div>
</template>`,
      hint: '<slot /> é onde o conteúdo do pai será inserido.',
    },
    {
      id: 'slots-ch-2',
      type: 'fill-blank',
      title: 'Fallback content',
      description: 'Complete o BotaoBase com texto fallback "Confirmar" quando nenhum conteúdo for passado.',
      xpReward: 25,
      template: `<!-- BotaoBase.vue -->
<template>
  <button class="btn">
    <___>
      ___
    </slot>
  </button>
</template>`,
      blanks: ['slot', 'Confirmar'],
      solution: `<!-- BotaoBase.vue -->
<template>
  <button class="btn">
    <slot>
      Confirmar
    </slot>
  </button>
</template>`,
      hint: 'Coloque o fallback dentro do <slot>...</slot>.',
    },
    {
      id: 'slots-ch-3',
      type: 'fill-blank',
      title: 'Named slots',
      description: 'Complete o Layout com três slots nomeados: header, default e footer.',
      xpReward: 30,
      template: `<!-- Layout.vue -->
<template>
  <header>
    <slot ___="header" />
  </header>
  <main>
    <slot />
  </main>
  <footer>
    <slot ___="footer" />
  </footer>
</template>`,
      blanks: ['name', 'name'],
      solution: `<!-- Layout.vue -->
<template>
  <header>
    <slot name="header" />
  </header>
  <main>
    <slot />
  </main>
  <footer>
    <slot name="footer" />
  </footer>
</template>`,
      hint: 'name="header" nomeia o slot. O slot sem name é o padrão.',
    },
    {
      id: 'slots-ch-4',
      type: 'fill-blank',
      title: 'Preencher named slots no pai',
      description: 'Complete o pai para preencher os slots header e footer do Layout.',
      xpReward: 30,
      template: `<script setup>
import Layout from './Layout.vue'
</script>

<template>
  <Layout>
    <template ___header>
      <h1>Meu App</h1>
    </template>

    <p>Conteúdo principal</p>

    <template ___footer>
      <p>© 2024</p>
    </template>
  </Layout>
</template>`,
      blanks: ['#', '#'],
      solution: `<script setup>
import Layout from './Layout.vue'
</script>

<template>
  <Layout>
    <template #header>
      <h1>Meu App</h1>
    </template>

    <p>Conteúdo principal</p>

    <template #footer>
      <p>© 2024</p>
    </template>
  </Layout>
</template>`,
      hint: '# é o atalho para v-slot:. Use <template #nome> para preencher named slots.',
    },
    {
      id: 'slots-ch-5',
      type: 'fix-bug',
      title: 'Bugs nos slots',
      description: 'O componente tem 3 erros relacionados ao uso de slots. Encontre e corrija.',
      xpReward: 35,
      buggyCode: `<!-- Modal.vue -->
<template>
  <div class="modal">
    <div class="modal-header">
      <slot name="titulo" />
    </div>
    <div class="modal-body">
      <slot />
    </div>
  </div>
</template>

<!-- Pai -->
<template>
  <Modal>
    <template v-slot="titulo">
      <h2>Confirmar exclusão</h2>
    </template>

    <p>Tem certeza que deseja excluir?</p>

    <template slot="acoes">
      <button>Cancelar</button>
    </template>
  </Modal>
</template>`,
      solution: `<!-- Modal.vue -->
<template>
  <div class="modal">
    <div class="modal-header">
      <slot name="titulo" />
    </div>
    <div class="modal-body">
      <slot />
    </div>
  </div>
</template>

<!-- Pai -->
<template>
  <Modal>
    <template #titulo>
      <h2>Confirmar exclusão</h2>
    </template>

    <p>Tem certeza que deseja excluir?</p>
  </Modal>
</template>`,
      explanation: '1) v-slot="titulo" é sintaxe errada para named slot — use v-slot:titulo ou #titulo. 2) slot="acoes" é sintaxe antiga (Vue 2) — use <template #acoes>. 3) O slot "acoes" não existe no Modal.vue — remova ou adicione o slot correspondente.',
    },
  ],
}
