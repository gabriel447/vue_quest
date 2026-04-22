export default {
  id: 'slot-extra',
  moduleId: 'component-extras',
  title: '<slot /> — espaço reservado',
  icon: '🪣',
  xpReward: 25,
  docUrl: 'https://vuejs.org/guide/components/slots',

  theory: [
    {
      title: '<slot /> — o espaço reservado',
      body: `O <slot /> é o "espaço reservado" — o componente filho deixa um buraco para o pai colocar o que quiser dentro. É a base para criar componentes verdadeiramente flexíveis e reutilizáveis como Card, Modal, Button.`,
      code: `<!-- Componente Botao.vue -->
<template>
  <button class="btn">
    <slot />  <!-- pai coloca o conteúdo aqui -->
  </button>
</template>

<!-- Uso: conteúdo diferente a cada vez -->
<Botao>Salvar ✅</Botao>
<Botao>Cancelar ❌</Botao>
<Botao><span>🔍</span> Buscar</Botao>`,
    },
    {
      title: 'Conteúdo padrão no slot',
      body: `Se o pai não passar nada para o slot, o conteúdo padrão aparece. É uma ótima prática para componentes com comportamento default razoável.`,
      code: `<!-- Componente Alerta.vue -->
<template>
  <div class="alerta">
    <slot>
      ⚠️ Atenção! (conteúdo padrão)
    </slot>
  </div>
</template>

<!-- Sem conteúdo: usa o padrão -->
<Alerta />

<!-- Com conteúdo: substitui o padrão -->
<Alerta>🔴 Erro crítico no sistema!</Alerta>`,
    },
    {
      title: 'Slots nomeados para layouts',
      body: `Com slots nomeados, o componente define múltiplas "vagas" com nomes. O pai decide o que colocar em cada uma. Perfeito para componentes de layout como Card, Modal, Page.`,
      code: `<!-- Layout.vue -->
<template>
  <div class="layout">
    <header><slot name="header" /></header>
    <main><slot /></main>  <!-- slot padrão -->
    <footer><slot name="footer" /></footer>
  </div>
</template>

<!-- Uso -->
<Layout>
  <template #header>
    <h1>Meu App</h1>
  </template>

  <p>Conteúdo principal da página</p>

  <template #footer>
    <p>© 2024 Vue Quest</p>
  </template>
</Layout>`,
    },
  ],

  flashcards: [
    {
      id: 'slot-extra-fc-1',
      front: 'Como definir conteúdo padrão para um slot?',
      back: 'Coloque o conteúdo dentro da tag <slot>. Aparece quando o pai não passa nada.',
      code: `<slot>Conteúdo padrão</slot>`,
      lessonTitle: '<slot /> — espaço reservado',
    },
    {
      id: 'slot-extra-fc-2',
      front: 'Como o pai passa conteúdo para um slot nomeado?',
      back: 'Use <template #nome> ou <template v-slot:nome>.',
      code: `<template #header>
  <h1>Título</h1>
</template>`,
      lessonTitle: '<slot /> — espaço reservado',
    },
  ],

  challenges: [
    {
      id: 'slot-extra-ch-1',
      type: 'fill-blank',
      title: 'Componente Card com slots nomeados',
      description: 'Complete o Card com slot padrão e slots nomeados para header e footer.',
      xpReward: 30,
      template: `<template>
  <div style="border:1px solid #caa9fa;border-radius:8px;overflow:hidden">
    <div style="background:#2d2b38;padding:1rem">
      <___ name="___">Título do Card</___ >
    </div>

    <div style="padding:1rem">
      <___ />
    </div>

    <div style="background:#2d2b38;padding:0.75rem;font-size:0.85rem">
      <slot name="___">Rodapé padrão</slot>
    </div>
  </div>
</template>`,
      blanks: ['slot', 'header', 'slot', 'slot', 'footer'],
      solution: `<template>
  <div style="border:1px solid #caa9fa;border-radius:8px;overflow:hidden">
    <div style="background:#2d2b38;padding:1rem">
      <slot name="header">Título do Card</slot>
    </div>

    <div style="padding:1rem">
      <slot />
    </div>

    <div style="background:#2d2b38;padding:0.75rem;font-size:0.85rem">
      <slot name="footer">Rodapé padrão</slot>
    </div>
  </div>
</template>`,
      hint: 'Slots nomeados: <slot name="X">. Slot padrão (sem nome): <slot />.',
    },
  ],
}
