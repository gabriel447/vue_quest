export default {
  id: 'reactive',
  moduleId: 'reactivity',
  title: 'reactive()',
  icon: '🔮',
  xpReward: 30,
  docUrl: 'https://vuejs.org/api/reactivity-core#reactive',

  theory: [
    {
      title: 'reactive() — o objeto vivo',
      body: `O reactive() transforma um objeto JavaScript comum num "objeto vivo". Ele rastreia todas as propriedades automaticamente — sem precisar de .value para acessar nada.

Ideal para agrupar dados relacionados, como os campos de um formulário ou o estado de um perfil de usuário.`,
      code: `<script setup>
import { reactive } from 'vue'

const perfil = reactive({
  nome: 'Ana',
  nivel: 3,
  xp: 1200,
})

function levelUp() {
  perfil.nivel++       // sem .value!
  perfil.xp += 500
}
</script>`,
    },
    {
      title: 'Acesso direto — sem .value',
      body: `Diferente da ref(), com reactive() você acessa e altera as propriedades diretamente, como num objeto JavaScript normal.

Isso deixa o código mais limpo quando você tem muitos campos relacionados.`,
      code: `<script setup>
import { reactive } from 'vue'

const form = reactive({
  email: '',
  senha: '',
  lembrar: false,
})

function limpar() {
  form.email = ''      // direto, sem .value
  form.senha = ''
  form.lembrar = false
}
</script>

<template>
  <input v-model="form.email" placeholder="Email" />
  <input v-model="form.senha" type="password" />
  <p>Email: {{ form.email }}</p>
</template>`,
    },
    {
      title: 'reactive() só funciona com objetos',
      body: `A limitação do reactive(): só funciona com objetos (e arrays). Não dá para usar com primitivos como string, number ou boolean diretamente.

Para primitivos, sempre use ref(). Use reactive() apenas quando fizer sentido agrupar propriedades relacionadas num objeto.`,
      code: `<script setup>
import { reactive, ref } from 'vue'

// ✅ reactive com objeto
const estado = reactive({ count: 0, msg: '' })

// ✅ ref com primitivo
const nome = ref('Vue')
const ativo = ref(true)

// ❌ reactive com primitivo — não funciona
// const count = reactive(0)
// const nome = reactive('Vue')
</script>`,
    },
    {
      title: 'Armadilha: nunca desestruture um reactive',
      body: `Se você desestruturar um objeto reactive(), as propriedades extraídas perdem a reatividade — elas viram valores estáticos normais.

Se precisar extrair propriedades reativas, use toRefs() para manter o vínculo.`,
      code: `<script setup>
import { reactive, toRefs } from 'vue'

const estado = reactive({ count: 0, nome: 'Vue' })

// ❌ Desestruturação quebra a reatividade
// const { count, nome } = estado  // count e nome não são reativos!

// ✅ toRefs mantém a reatividade
const { count, nome } = toRefs(estado)
// Agora count.value e nome.value são reativos
</script>`,
    },
  ],

  flashcards: [
    {
      id: 'reactive-fc-1',
      front: 'O que é reactive() e quando usar?',
      back: 'Transforma um objeto em reativo. Use quando quiser agrupar propriedades relacionadas sem precisar de .value.',
      code: `const form = reactive({ email: '', senha: '' })`,
      lessonTitle: 'reactive()',
    },
    {
      id: 'reactive-fc-2',
      front: 'Qual a diferença entre ref() e reactive()?',
      back: 'ref(): qualquer tipo, acesso via .value.\nreactive(): só objetos, acesso direto às propriedades.',
      code: `const n = ref(0)          // .value
const obj = reactive({x:0}) // direto`,
      lessonTitle: 'reactive()',
    },
    {
      id: 'reactive-fc-3',
      front: 'O que acontece ao desestruturar um reactive()?',
      back: 'As propriedades perdem a reatividade. Use toRefs() para manter o vínculo reativo.',
      code: `const { x } = toRefs(estado) // ✅
// x.value ainda é reativo`,
      lessonTitle: 'reactive()',
    },
    {
      id: 'reactive-fc-4',
      front: 'reactive() funciona com primitivos (number, string)?',
      back: 'Não. reactive() só funciona com objetos. Para primitivos, use ref().',
      code: `// ❌ reactive(0)
// ✅ ref(0)`,
      lessonTitle: 'reactive()',
    },
  ],

  challenges: [
    {
      id: 'reactive-ch-1',
      type: 'fill-blank',
      title: 'Crie um objeto reativo',
      description: 'Complete o código criando um placar reativo com reactive() e exiba os dados no template.',
      xpReward: 25,
      template: `<script setup>
import { ___ } from 'vue'

const placar = ___({
  jogador: 'Ana',
  pontos: 0,
})

function marcar() {
  placar.pontos += 10
}
</script>

<template>
  <p>{{ placar.___ }}: {{ placar.___ }} pts</p>
  <button @click="marcar">+10 pontos</button>
</template>`,
      blanks: ['reactive', 'reactive', 'jogador', 'pontos'],
      solution: `<script setup>
import { reactive } from 'vue'

const placar = reactive({
  jogador: 'Ana',
  pontos: 0,
})

function marcar() {
  placar.pontos += 10
}
</script>

<template>
  <p>{{ placar.jogador }}: {{ placar.pontos }} pts</p>
  <button @click="marcar">+10 pontos</button>
</template>`,
      hint: 'Use reactive() para criar o objeto e acesse as propriedades diretamente, sem .value.',
    },
    {
      id: 'reactive-ch-2',
      type: 'fill-blank',
      title: 'Formulário com reactive()',
      description: 'Complete o formulário usando reactive() para agrupar os campos e v-model para vinculá-los.',
      xpReward: 35,
      template: `<script setup>
import { reactive } from 'vue'

const form = ___({
  nome: '',
  email: '',
  aceito: false,
})

function enviar() {
  alert(\`Enviado: \${form.nome} — \${form.email}\`)
}

function limpar() {
  form.___ = ''
  form.___ = ''
  form.___ = false
}
</script>

<template>
  <input v-model="form.nome" placeholder="Nome" />
  <input v-model="form.email" placeholder="Email" />
  <label>
    <input type="checkbox" v-model="form.aceito" />
    Aceito os termos
  </label>
  <button @click="enviar" :disabled="!form.aceito">Enviar</button>
  <button @click="limpar">Limpar</button>
</template>`,
      blanks: ['reactive', 'nome', 'email', 'aceito'],
      solution: `<script setup>
import { reactive } from 'vue'

const form = reactive({
  nome: '',
  email: '',
  aceito: false,
})

function enviar() {
  alert(\`Enviado: \${form.nome} — \${form.email}\`)
}

function limpar() {
  form.nome = ''
  form.email = ''
  form.aceito = false
}
</script>

<template>
  <input v-model="form.nome" placeholder="Nome" />
  <input v-model="form.email" placeholder="Email" />
  <label>
    <input type="checkbox" v-model="form.aceito" />
    Aceito os termos
  </label>
  <button @click="enviar" :disabled="!form.aceito">Enviar</button>
  <button @click="limpar">Limpar</button>
</template>`,
      hint: 'reactive() agrupa os campos. Acesse e altere as propriedades diretamente: form.nome = "".',
    },
    {
      id: 'reactive-ch-3',
      type: 'fix-bug',
      title: 'Bugs no reactive()',
      description: 'O código tem 3 erros com reactive(). Encontre e corrija.',
      xpReward: 40,
      buggyCode: `<script setup>
import { reactive } from 'vue'

const estado = reactive({ count: 0, msg: 'Olá' })

function incrementar() {
  estado.value.count++
}

function resetar() {
  estado = reactive({ count: 0, msg: 'Olá' })
}

const { count } = estado
</script>

<template>
  <p>{{ count }} — {{ estado.msg }}</p>
  <button @click="incrementar">+1</button>
  <button @click="resetar">Reset</button>
</template>`,
      solution: `<script setup>
import { reactive } from 'vue'

const estado = reactive({ count: 0, msg: 'Olá' })

function incrementar() {
  estado.count++
}

function resetar() {
  estado.count = 0
  estado.msg = 'Olá'
}
</script>

<template>
  <p>{{ estado.count }} — {{ estado.msg }}</p>
  <button @click="incrementar">+1</button>
  <button @click="resetar">Reset</button>
</template>`,
      explanation: '1) reactive() não usa .value — acesse direto: estado.count++. 2) Reatribuir o reactive quebra a reatividade — mute as propriedades individualmente. 3) Desestruturar quebra a reatividade — use estado.count no template.',
    },
  ],
}
