export default {
  id: 'teleport',
  moduleId: 'teleport',
  title: 'Teleport',
  icon: '🌀',
  xpReward: 30,
  docUrl: 'https://vuejs.org/guide/built-ins/teleport',

  theory: [
    {
      title: 'Teleport — o teletransportador',
      body: `O Teleport é o "teletransportador" — ele pega o HTML de onde está no código e joga para outro lugar no DOM real. Resolve o problema clássico de modais e tooltips que ficam presos no CSS do componente pai.`,
      code: `<template>
  <div class="componente" style="overflow: hidden; position: relative">
    <!-- Este botão está dentro do componente -->
    <button @click="aberto = true">Abrir Modal</button>

    <!-- O modal teletransporta para o body — fora do overflow:hidden -->
    <Teleport to="body">
      <div v-if="aberto" class="modal">
        <p>Este modal está no body, não dentro do componente!</p>
        <button @click="aberto = false">Fechar</button>
      </div>
    </Teleport>
  </div>
</template>`,
    },
    {
      title: 'Por que usar Teleport?',
      body: `Problemas que o Teleport resolve: modais cortados por overflow:hidden, z-index bloqueado por stacking context, posicionamento fixo relativo ao viewport.

O componente fica onde você escreveu no código, mas o HTML vai para onde você precisa.`,
      code: `<!-- Problema sem Teleport: modal dentro de overflow:hidden -->
<div style="overflow:hidden">
  <div class="modal">Modal cortado! ❌</div>
</div>

<!-- Solução com Teleport: HTML vai para o body -->
<div style="overflow:hidden">
  <Teleport to="body">
    <div class="modal">Modal livre! ✅</div>
  </Teleport>
</div>`,
    },
    {
      title: 'Seletores e múltiplos Teleports',
      body: `O to= aceita qualquer seletor CSS. Você pode ter múltiplos Teleports apontando para o mesmo destino — eles são adicionados em ordem.`,
      code: `<!-- Para um elemento específico -->
<Teleport to="#modais">
  <MinhaModal />
</Teleport>

<!-- Para o body -->
<Teleport to="body">
  <Notificacao />
</Teleport>

<!-- Desativado condicionalmente -->
<Teleport to="body" :disabled="isMobile">
  <Tooltip />
</Teleport>`,
    },
  ],

  flashcards: [
    {
      id: 'teleport-fc-1',
      front: 'O que é o Teleport e para que serve?',
      back: 'Move o HTML de um componente para outro lugar no DOM (ex: body), resolvendo problemas de overflow, z-index e posicionamento.',
      code: `<Teleport to="body">
  <Modal v-if="aberto" />
</Teleport>`,
      lessonTitle: 'Teleport',
    },
    {
      id: 'teleport-fc-2',
      front: 'O componente permanece no mesmo lugar lógico com Teleport?',
      back: 'Sim. A lógica (eventos, props, reatividade) permanece no componente onde foi escrito. Só o HTML vai para outro lugar.',
      code: `// Props e eventos ainda funcionam normalmente`,
      lessonTitle: 'Teleport',
    },
    {
      id: 'teleport-fc-3',
      front: 'Como desativar o Teleport condicionalmente?',
      back: 'Use :disabled="condicao". Quando true, o HTML fica no lugar original.',
      code: `<Teleport to="body" :disabled="isMobile">`,
      lessonTitle: 'Teleport',
    },
  ],

  challenges: [
    {
      id: 'teleport-ch-1',
      type: 'fill-blank',
      title: 'Modal com Teleport',
      description: 'Complete o Teleport para mover o modal para o body.',
      xpReward: 30,
      template: `<script setup>
import { ref } from 'vue'
const aberto = ref(false)
</script>

<template>
  <button @click="aberto = true">Abrir Modal</button>

  <___ to="___">
    <div
      v-if="aberto"
      style="position:fixed;inset:0;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center"
    >
      <div style="background:#22212c;padding:2rem;border-radius:8px">
        <p>Estou no body! 🌀</p>
        <button @click="aberto = false">Fechar</button>
      </div>
    </div>
  </___>
</template>`,
      blanks: ['Teleport', 'body', 'Teleport'],
      solution: `<script setup>
import { ref } from 'vue'
const aberto = ref(false)
</script>

<template>
  <button @click="aberto = true">Abrir Modal</button>

  <Teleport to="body">
    <div
      v-if="aberto"
      style="position:fixed;inset:0;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center"
    >
      <div style="background:#22212c;padding:2rem;border-radius:8px">
        <p>Estou no body! 🌀</p>
        <button @click="aberto = false">Fechar</button>
      </div>
    </div>
  </Teleport>
</template>`,
      hint: '<Teleport to="body"> move o HTML para dentro do body, fora do contexto do componente.',
    },
  ],
}
