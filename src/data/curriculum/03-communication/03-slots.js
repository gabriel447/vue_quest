export default {
  id: 'slots',
  moduleId: 'communication',
  title: 'Slots',
  icon: '🅿️',
  xpReward: 30,
  docUrl: 'https://vuejs.org/guide/components/slots',

  theory: [
    {
      title: 'Slots — o estacionamento',
      body: `O slot é o "estacionamento" — o componente filho deixa uma vaga e o pai coloca o HTML que quiser dentro. Isso torna componentes muito mais flexíveis e reutilizáveis.`,
      code: `<!-- Filho: Cartao.vue -->
<template>
  <div class="cartao">
    <slot />  <!-- a vaga -->
  </div>
</template>

<!-- Pai -->
<template>
  <!-- O pai coloca qualquer conteúdo na vaga -->
  <Cartao>
    <h2>Título qualquer</h2>
    <p>Qualquer conteúdo aqui!</p>
  </Cartao>
</template>`,
    },
    {
      title: 'Conteúdo padrão e slots nomeados',
      body: `Você pode definir um conteúdo padrão para o slot — aparece quando o pai não passa nada. Slots nomeados permitem múltiplas "vagas" no mesmo componente.`,
      code: `<!-- Filho: Modal.vue -->
<template>
  <div class="modal">
    <header>
      <slot name="cabecalho">Título padrão</slot>
    </header>
    <main>
      <slot />  <!-- slot padrão (sem nome) -->
    </main>
    <footer>
      <slot name="rodape">
        <button>Fechar</button>
      </slot>
    </footer>
  </div>
</template>

<!-- Pai -->
<template>
  <Modal>
    <template #cabecalho>
      <h1>Meu Modal</h1>
    </template>

    <p>Conteúdo principal aqui</p>

    <template #rodape>
      <button @click="fechar">Cancelar</button>
      <button @click="salvar">Salvar</button>
    </template>
  </Modal>
</template>`,
    },
    {
      title: 'Scoped Slots — dados do filho para o pai',
      body: `Scoped slots permitem que o filho passe dados de volta para o pai através do slot. O pai decide como renderizar usando os dados do filho.`,
      code: `<!-- Filho: Lista.vue -->
<template>
  <ul>
    <li v-for="item in items" :key="item.id">
      <slot :item="item" :index="index" />
    </li>
  </ul>
</template>

<!-- Pai decide a renderização -->
<template>
  <Lista :items="produtos">
    <template #default="{ item }">
      <strong>{{ item.nome }}</strong> — R$ {{ item.preco }}
    </template>
  </Lista>
</template>`,
    },
  ],

  flashcards: [
    {
      id: 'slots-fc-1',
      front: 'O que é um slot e para que serve?',
      back: 'É um espaço reservado no filho onde o pai injeta conteúdo HTML. Torna componentes reutilizáveis e flexíveis.',
      code: `// Filho: <slot />
// Pai: <Comp><p>Conteúdo</p></Comp>`,
      lessonTitle: 'Slots',
    },
    {
      id: 'slots-fc-2',
      front: 'Como criar múltiplas vagas no mesmo componente?',
      back: 'Use slots nomeados: <slot name="X" /> no filho e <template #X> no pai.',
      code: `// Filho: <slot name="header" />
// Pai: <template #header>...</template>`,
      lessonTitle: 'Slots',
    },
    {
      id: 'slots-fc-3',
      front: 'O que é um scoped slot?',
      back: 'Um slot que passa dados do filho para o pai: <slot :item="item" /> no filho e <template #default="{ item }"> no pai.',
      code: `// Filho: <slot :item="item" />
// Pai: <template #default="{ item }">`,
      lessonTitle: 'Slots',
    },
  ],

  challenges: [
    {
      id: 'slots-ch-1',
      type: 'fill-blank',
      title: 'Componente Card com slot',
      description: 'Complete o componente Card com um slot padrão e use-o no template do pai.',
      xpReward: 30,
      template: `<script setup>
// Componente Card (filho)
</script>

<template>
  <div style="border:1px solid #caa9fa; border-radius:8px; padding:1rem">
    <___  />
  </div>
</template>`,
      blanks: ['slot'],
      solution: `<script setup>
// Componente Card (filho)
</script>

<template>
  <div style="border:1px solid #caa9fa; border-radius:8px; padding:1rem">
    <slot />
  </div>
</template>`,
      hint: '<slot /> cria a vaga onde o conteúdo do pai vai aparecer.',
    },
  ],
}
