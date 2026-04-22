export default {
  id: 'pinia-actions',
  moduleId: 'pinia',
  title: 'Actions',
  icon: '🤲',
  xpReward: 30,
  docUrl: 'https://pinia.vuejs.org/core-concepts/actions.html',

  theory: [
    {
      title: 'Actions — as mãos da store',
      body: `As actions são as "mãos" — as funções que alteram os dados ou buscam coisas no backend. Toda lógica de negócio fica aqui: validações, requisições, transformações.`,
      code: `import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUsuarioStore = defineStore('usuario', () => {
  const usuario = ref(null)
  const carregando = ref(false)
  const erro = ref(null)

  async function buscarUsuario(id) {
    carregando.value = true
    erro.value = null
    try {
      const res = await fetch(\`/api/users/\${id}\`)
      usuario.value = await res.json()
    } catch (e) {
      erro.value = e.message
    } finally {
      carregando.value = false
    }
  }

  return { usuario, carregando, erro, buscarUsuario }
})`,
    },
    {
      title: 'Actions podem chamar outras actions',
      body: `Uma action pode chamar outra action da mesma store. Isso permite compor lógica complexa de forma organizada.`,
      code: `export const useCarrinhoStore = defineStore('carrinho', () => {
  const itens = ref([])

  function adicionar(item) {
    itens.value.push(item)
  }

  function remover(id) {
    itens.value = itens.value.filter(i => i.id !== id)
  }

  async function checkout() {
    const res = await fetch('/api/pedidos', {
      method: 'POST',
      body: JSON.stringify(itens.value),
    })
    if (res.ok) itens.value = [] // limpa após sucesso
  }

  return { itens, adicionar, remover, checkout }
})`,
    },
  ],

  flashcards: [
    {
      id: 'pinia-actions-fc-1',
      front: 'O que são actions no Pinia?',
      back: 'São funções que alteram o state ou fazem requisições. Toda lógica de negócio da store vai aqui.',
      code: `function incrementar() { count.value++ }
async function buscar() { ... }`,
      lessonTitle: 'Actions',
    },
    {
      id: 'pinia-actions-fc-2',
      front: 'Actions podem ser assíncronas?',
      back: 'Sim. Actions aceitam async/await normalmente — ideal para fetch e operações assíncronas.',
      code: `async function buscarDados() {
  const res = await fetch('/api/dados')
  dados.value = await res.json()
}`,
      lessonTitle: 'Actions',
    },
  ],

  challenges: [
    {
      id: 'pinia-actions-ch-1',
      type: 'fill-blank',
      title: 'Action de login',
      description: 'Complete a action de login que faz fetch e atualiza o state.',
      xpReward: 35,
      template: `import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const usuario = ref(null)
  const logado = ref(false)

  async ___ login(email, senha) {
    const res = await fetch('/api/login', {
      method: '___',
      body: JSON.stringify({ email, senha }),
    })
    const dados = await res.json()
    usuario.___ = dados.usuario
    logado.___ = true
  }

  function logout() {
    usuario.value = null
    logado.value = ___
  }

  return { usuario, logado, login, logout }
})`,
      blanks: ['function', 'POST', 'value', 'value', 'false'],
      solution: `import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const usuario = ref(null)
  const logado = ref(false)

  async function login(email, senha) {
    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, senha }),
    })
    const dados = await res.json()
    usuario.value = dados.usuario
    logado.value = true
  }

  function logout() {
    usuario.value = null
    logado.value = false
  }

  return { usuario, logado, login, logout }
})`,
      hint: 'Actions são funções normais. Podem ser async. Alteram o state via .value.',
    },
  ],
}
