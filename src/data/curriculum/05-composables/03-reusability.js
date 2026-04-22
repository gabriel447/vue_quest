export default {
  id: 'reusability',
  moduleId: 'composables',
  title: 'Reutilização',
  icon: '♻️',
  xpReward: 30,
  docUrl: 'https://vuejs.org/guide/reusability/composables#extracting-composables-for-code-organization',

  theory: [
    {
      title: 'Reutilização — copia e cola inteligente',
      body: `A reutilização é o "copia e cola inteligente" — você usa a mesma lógica em 10 componentes sem repetir código. Se a lógica mudar, você muda só no composable e todos se atualizam automaticamente.`,
      code: `// useLocalStorage.js — lógica de localStorage reutilizável
import { ref, watch } from 'vue'

export function useLocalStorage(chave, valorInicial) {
  const valor = ref(JSON.parse(localStorage.getItem(chave)) ?? valorInicial)

  watch(valor, (novo) => {
    localStorage.setItem(chave, JSON.stringify(novo))
  }, { deep: true })

  return valor
}

// Usado em qualquer componente:
const tema = useLocalStorage('tema', 'claro')
const favoritos = useLocalStorage('favoritos', [])
const config = useLocalStorage('config', { idioma: 'pt' })`,
    },
    {
      title: 'Compondo composables',
      body: `Composables podem usar outros composables — composição em camadas. Isso permite criar ferramentas complexas a partir de peças simples.`,
      code: `// useFetch.js
import { ref } from 'vue'

export function useFetch(url) {
  const dados = ref(null)
  const carregando = ref(true)
  const erro = ref(null)

  fetch(url)
    .then(r => r.json())
    .then(d => dados.value = d)
    .catch(e => erro.value = e.message)
    .finally(() => carregando.value = false)

  return { dados, carregando, erro }
}

// useUsuario.js — compõe useFetch
import { useFetch } from './useFetch'
import { computed } from 'vue'

export function useUsuario(id) {
  const { dados: usuario, carregando } = useFetch(\`/api/users/\${id}\`)
  const nomeCompleto = computed(() =>
    usuario.value ? \`\${usuario.value.name}\` : ''
  )
  return { usuario, nomeCompleto, carregando }
}`,
    },
  ],

  flashcards: [
    {
      id: 'reuse-fc-1',
      front: 'Qual a principal vantagem dos composables para reutilização?',
      back: 'Lógica centralizada — mudou em um lugar, reflete em todos os componentes. Sem duplicação de código.',
      code: `// 10 componentes usam useLocalStorage
// Para alterar o comportamento: muda só um arquivo`,
      lessonTitle: 'Reutilização',
    },
    {
      id: 'reuse-fc-2',
      front: 'Composables podem usar outros composables?',
      back: 'Sim — composição em camadas. Composables complexos são construídos a partir de composables simples.',
      code: `export function useUsuario(id) {
  const { dados } = useFetch(\`/api/users/\${id}\`)
  return { dados }
}`,
      lessonTitle: 'Reutilização',
    },
  ],

  challenges: [
    {
      id: 'reuse-ch-1',
      type: 'fill-blank',
      title: 'useWindowSize reutilizável',
      description: 'Complete o composable que rastreia o tamanho da janela.',
      xpReward: 35,
      template: `import { ref, onMounted, ___ } from 'vue'

export function ___WindowSize() {
  const largura = ___(window.innerWidth)
  const altura = ref(window.innerHeight)

  function atualizar() {
    largura.___ = window.innerWidth
    altura.value = window.innerHeight
  }

  onMounted(() => window.addEventListener('resize', atualizar))
  ___(() => window.removeEventListener('resize', atualizar))

  return { largura, altura }
}`,
      blanks: ['onUnmounted', 'use', 'ref', 'value', 'onUnmounted'],
      solution: `import { ref, onMounted, onUnmounted } from 'vue'

export function useWindowSize() {
  const largura = ref(window.innerWidth)
  const altura = ref(window.innerHeight)

  function atualizar() {
    largura.value = window.innerWidth
    altura.value = window.innerHeight
  }

  onMounted(() => window.addEventListener('resize', atualizar))
  onUnmounted(() => window.removeEventListener('resize', atualizar))

  return { largura, altura }
}`,
      hint: 'Lifecycle hooks funcionam dentro de composables. onUnmounted para cleanup.',
    },
  ],
}
