export default {
  id: 'prop-binding',
  moduleId: 'templates-directives',
  title: ':prop (v-bind)',
  icon: '📮',
  xpReward: 25,
  docUrl: 'https://vuejs.org/guide/essentials/template-syntax#attribute-bindings',

  theory: [
    {
      title: ':prop — o sedex do Vue',
      body: `O :prop (v-bind) é o "sedex" — ele envia uma informação para um atributo HTML ou para um componente filho. O {{ }} só funciona dentro do conteúdo HTML, não em atributos. Para atributos dinâmicos, você precisa do :.`,
      code: `<script setup>
import { ref } from 'vue'
const url = ref('https://vuejs.org')
const desabilitado = ref(true)
const imgSrc = ref('/logo.png')
</script>

<template>
  <!-- ❌ Errado — {{ }} não funciona em atributos -->
  <!-- <a href="{{ url }}">Link</a> -->

  <!-- ✅ Correto — use : para atributos dinâmicos -->
  <a :href="url">Documentação Vue</a>
  <button :disabled="desabilitado">Enviar</button>
  <img :src="imgSrc" :alt="'Logo Vue'" />
</template>`,
    },
    {
      title: 'Shorthand e binding de objeto',
      body: `Você pode usar a forma curta no Vue 3.4+: se a variável tem o mesmo nome do atributo, basta escrever :id sem valor.

Para vincular múltiplos atributos de uma vez, passe um objeto para v-bind sem argumento.`,
      code: `<script setup>
import { ref } from 'vue'
const id = ref('titulo')
const classe = ref('destaque')
</script>

<template>
  <!-- Vue 3.4+: :id equivale a :id="id" -->
  <div :id>Título</div>

  <!-- Múltiplos atributos de uma vez -->
  <div v-bind="{ id: 'box', class: 'card', 'data-tipo': 'info' }">
    Todos de uma vez
  </div>
</template>`,
    },
    {
      title: ':class — classes dinâmicas',
      body: `O :class é especial — aceita objeto (chave = classe, valor = condição) ou array. Pode coexistir com class estático no mesmo elemento.`,
      code: `<script setup>
import { ref } from 'vue'
const ativo = ref(true)
const temErro = ref(false)
</script>

<template>
  <!-- Objeto: classe aparece quando o valor é truthy -->
  <div :class="{ ativo, erro: temErro }">...</div>

  <!-- Classe estática + dinâmica juntas -->
  <button class="btn" :class="{ 'btn-primary': ativo }">Enviar</button>

  <!-- Array de classes -->
  <div :class="['base', ativo ? 'ativo' : 'inativo']">...</div>
</template>`,
    },
    {
      title: ':style — estilos dinâmicos',
      body: `O :style aceita um objeto CSS com propriedades em camelCase. Pode ser um objeto direto ou um computed para lógica mais complexa.`,
      code: `<script setup>
import { ref, computed } from 'vue'
const cor = ref('#42b883')
const tamanho = ref(16)

const estilo = computed(() => ({
  color: cor.value,
  fontSize: tamanho.value + 'px',
  fontWeight: 'bold',
}))
</script>

<template>
  <!-- Inline simples -->
  <p :style="{ color: cor, fontSize: tamanho + 'px' }">Texto</p>

  <!-- Computed para lógica complexa -->
  <p :style="estilo">Texto estilizado</p>
</template>`,
    },
  ],

  flashcards: [
    {
      id: 'bind-fc-1',
      front: 'Por que usar : em vez de {{ }} em atributos?',
      back: '{{ }} só funciona no conteúdo HTML. Para atributos dinâmicos (src, href, disabled...) use : (v-bind).',
      code: `<img :src="url" />
<button :disabled="loading">`,
      lessonTitle: ':prop (v-bind)',
    },
    {
      id: 'bind-fc-2',
      front: 'Como aplicar classes condicionalmente?',
      back: 'Use :class com objeto. Chave = nome da classe, valor = condição booleana.',
      code: `<div :class="{ ativo: isAtivo, erro: temErro }">`,
      lessonTitle: ':prop (v-bind)',
    },
    {
      id: 'bind-fc-3',
      front: 'Como combinar classe estática com dinâmica?',
      back: 'Use class="" e :class="" juntos — Vue mescla automaticamente.',
      code: `<button class="btn" :class="{ primary: ativo }">`,
      lessonTitle: ':prop (v-bind)',
    },
    {
      id: 'bind-fc-4',
      front: 'Como aplicar estilos inline dinâmicos?',
      back: 'Use :style com objeto CSS. Propriedades em camelCase e sempre inclua a unidade (px, %).',
      code: `<p :style="{ fontSize: size + 'px', color: cor }">`,
      lessonTitle: ':prop (v-bind)',
    },
  ],

  challenges: [
    {
      id: 'bind-ch-1',
      type: 'fill-blank',
      title: 'Card de perfil com bindings',
      description: 'Complete os bindings dinâmicos da imagem, link e botão do card.',
      xpReward: 30,
      template: `<script setup>
import { ref } from 'vue'
const nome = ref('Ana Silva')
const avatar = ref('https://i.pravatar.cc/80')
const site = ref('https://vuejs.org')
const carregando = ref(false)
</script>

<template>
  <div>
    <img ___="avatar" ___="nome" width="80" />
    <h2>{{ nome }}</h2>
    <a ___="site" target="_blank">Site</a>
    <button ___="carregando" @click="carregando = true">
      {{ carregando ? 'Seguindo...' : 'Seguir' }}
    </button>
  </div>
</template>`,
      blanks: [':src', ':alt', ':href', ':disabled'],
      solution: `<script setup>
import { ref } from 'vue'
const nome = ref('Ana Silva')
const avatar = ref('https://i.pravatar.cc/80')
const site = ref('https://vuejs.org')
const carregando = ref(false)
</script>

<template>
  <div>
    <img :src="avatar" :alt="nome" width="80" />
    <h2>{{ nome }}</h2>
    <a :href="site" target="_blank">Site</a>
    <button :disabled="carregando" @click="carregando = true">
      {{ carregando ? 'Seguindo...' : 'Seguir' }}
    </button>
  </div>
</template>`,
      hint: ':src para imagem, :href para link, :disabled para botão. Sempre : antes do atributo.',
    },
    {
      id: 'bind-ch-2',
      type: 'fill-blank',
      title: 'Botão com :class dinâmico',
      description: 'Complete o :class para alternar entre os estilos claro e escuro.',
      xpReward: 25,
      template: `<script setup>
import { ref } from 'vue'
const escuro = ref(false)
</script>

<template>
  <button
    class="btn"
    ___="{ 'btn-escuro': escuro, 'btn-claro': !escuro }"
    ___="{ background: escuro ? '#1a1a2e' : '#f0f0f0', color: escuro ? '#fff' : '#000' }"
    @click="escuro = !escuro"
  >
    {{ escuro ? '🌙 Escuro' : '☀️ Claro' }}
  </button>
</template>`,
      blanks: [':class', ':style'],
      solution: `<script setup>
import { ref } from 'vue'
const escuro = ref(false)
</script>

<template>
  <button
    class="btn"
    :class="{ 'btn-escuro': escuro, 'btn-claro': !escuro }"
    :style="{ background: escuro ? '#1a1a2e' : '#f0f0f0', color: escuro ? '#fff' : '#000' }"
    @click="escuro = !escuro"
  >
    {{ escuro ? '🌙 Escuro' : '☀️ Claro' }}
  </button>
</template>`,
      hint: ':class com objeto e :style com objeto CSS. class estático e :class coexistem.',
    },
    {
      id: 'bind-ch-3',
      type: 'fix-bug',
      title: 'Bugs nos bindings',
      description: 'O código tem 3 erros de binding. Encontre e corrija.',
      xpReward: 35,
      buggyCode: `<script setup>
import { ref } from 'vue'
const ativo = ref(true)
const tamanho = ref(16)
const url = ref('https://vuejs.org')
</script>

<template>
  <img src="{{ url }}" alt="Logo" />

  <p :style="{ fontSize: tamanho }">Texto</p>

  <div :class="ativo ? 'ativo' + '' : 'inativo'">Box</div>
</template>`,
      solution: `<script setup>
import { ref } from 'vue'
const ativo = ref(true)
const tamanho = ref(16)
const url = ref('https://vuejs.org')
</script>

<template>
  <img :src="url" alt="Logo" />

  <p :style="{ fontSize: tamanho + 'px' }">Texto</p>

  <div :class="ativo ? 'ativo' : 'inativo'">Box</div>
</template>`,
      explanation: '1) Atributos dinâmicos usam :src, não {{ }}. 2) fontSize precisa de unidade: tamanho + "px". 3) Concatenação errada com "+" — o ternário já está correto sem precisar do + "".',
    },
  ],
}
