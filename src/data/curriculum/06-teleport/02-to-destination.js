export default {
  id: 'teleport-to',
  moduleId: 'teleport',
  title: 'to="destino"',
  icon: '📍',
  xpReward: 20,
  docUrl: 'https://vuejs.org/guide/built-ins/teleport#basic-usage',

  theory: [
    {
      title: 'to="body" — o destino mais comum',
      body: `O destino mais comum do Teleport é o body — o elemento raiz da página. Isso garante que modais, drawers e notificações ficam fora de qualquer contexto CSS que possa causar problemas.`,
      code: `<template>
  <!-- Notificações no canto da tela -->
  <Teleport to="body">
    <div style="position:fixed; top:1rem; right:1rem; z-index:9999">
      <div v-for="n in notificacoes" :key="n.id" class="toast">
        {{ n.mensagem }}
      </div>
    </div>
  </Teleport>
</template>`,
    },
    {
      title: 'Outros destinos',
      body: `O to= aceita qualquer seletor CSS válido. Você pode teleportar para um elemento com ID específico, ideal para portais de notificação ou áreas de modais centralizadas.`,
      code: `<!-- index.html -->
<!-- <div id="modais"></div> -->
<!-- <div id="notificacoes"></div> -->

<template>
  <Teleport to="#modais">
    <ConfirmacaoModal v-if="confirmando" />
  </Teleport>

  <Teleport to="#notificacoes">
    <Toast v-for="t in toasts" :key="t.id" :mensagem="t.msg" />
  </Teleport>
</template>`,
    },
  ],

  flashcards: [
    {
      id: 'teleport-to-fc-1',
      front: 'Quais seletores o to= do Teleport aceita?',
      back: 'Qualquer seletor CSS válido: "body", "#id", ".classe", "[data-x]". O elemento precisa existir no DOM.',
      code: `<Teleport to="body">
<Teleport to="#modais">
<Teleport to=".portal">`,
      lessonTitle: 'to="destino"',
    },
    {
      id: 'teleport-to-fc-2',
      front: 'Por que to="body" é o destino mais comum?',
      back: 'O body é o elemento raiz — fora de qualquer contexto CSS (overflow, z-index, stacking context) que possa interferir.',
      code: `<Teleport to="body">
  <Modal />  <!-- livre de overflow:hidden -->
</Teleport>`,
      lessonTitle: 'to="destino"',
    },
  ],

  challenges: [
    {
      id: 'teleport-to-ch-1',
      type: 'fill-blank',
      title: 'Notificação teletransportada',
      description: 'Complete o Teleport para mover as notificações para o body.',
      xpReward: 20,
      template: `<script setup>
import { ref } from 'vue'
const msgs = ref([])
let id = 0

function notificar(texto) {
  const nid = ++id
  msgs.value.push({ id: nid, texto })
  setTimeout(() => {
    msgs.value = msgs.value.filter(m => m.id !== nid)
  }, 3000)
}
</script>

<template>
  <button @click="notificar('Ação realizada!')">Disparar notificação</button>

  <Teleport ___="body">
    <div style="position:fixed;top:1rem;right:1rem;display:flex;flex-direction:column;gap:0.5rem;z-index:9999">
      <div
        v-for="m in msgs"
        :key="m.___"
        style="background:#42b883;color:#000;padding:0.75rem 1rem;border-radius:8px"
      >
        {{ m.texto }}
      </div>
    </div>
  </___>
</template>`,
      blanks: ['to', 'id', 'Teleport'],
      solution: `<script setup>
import { ref } from 'vue'
const msgs = ref([])
let id = 0

function notificar(texto) {
  const nid = ++id
  msgs.value.push({ id: nid, texto })
  setTimeout(() => {
    msgs.value = msgs.value.filter(m => m.id !== nid)
  }, 3000)
}
</script>

<template>
  <button @click="notificar('Ação realizada!')">Disparar notificação</button>

  <Teleport to="body">
    <div style="position:fixed;top:1rem;right:1rem;display:flex;flex-direction:column;gap:0.5rem;z-index:9999">
      <div
        v-for="m in msgs"
        :key="m.id"
        style="background:#42b883;color:#000;padding:0.75rem 1rem;border-radius:8px"
      >
        {{ m.texto }}
      </div>
    </div>
  </Teleport>
</template>`,
      hint: 'to="body" aponta para o elemento body. :key deve usar o id único de cada mensagem.',
    },
  ],
}
