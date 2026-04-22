export default {
  id: 'composable-return',
  moduleId: 'composables',
  title: 'return — o balcão',
  icon: '🏪',
  xpReward: 25,
  docUrl: 'https://vuejs.org/guide/reusability/composables#conventions-and-best-practices',

  theory: [
    {
      title: 'return — o balcão do composable',
      body: `O return é o "balcão" — você escolhe quais ferramentas da receita o componente pode usar. Tudo que não está no return fica privado dentro do composable. Isso cria uma API pública clara.`,
      code: `import { ref, computed } from 'vue'

export function useTimer() {
  const segundos = ref(0)
  let intervalo = null  // privado — não retornado

  const display = computed(() => {
    const m = Math.floor(segundos.value / 60).toString().padStart(2, '0')
    const s = (segundos.value % 60).toString().padStart(2, '0')
    return \`\${m}:\${s}\`
  })

  function iniciar() { intervalo = setInterval(() => segundos.value++, 1000) }
  function pausar() { clearInterval(intervalo) }
  function resetar() { segundos.value = 0 }

  // Balcão: só expõe o que o componente precisa
  return { display, iniciar, pausar, resetar }
  // 'segundos' e 'intervalo' ficam privados
}`,
    },
    {
      title: 'Retornar refs vs valores primitivos',
      body: `Sempre retorne refs, não seus .value. Se você retornar .value, o componente recebe um número/string estático — sem reatividade.`,
      code: `import { ref, computed } from 'vue'

export function useContador() {
  const count = ref(0)
  const dobro = computed(() => count.value * 2)

  // ❌ Quebra a reatividade
  // return { count: count.value, dobro: dobro.value }

  // ✅ Retorna as refs — reatividade preservada
  return { count, dobro }
}`,
    },
  ],

  flashcards: [
    {
      id: 'return-fc-1',
      front: 'O que o return define em um composable?',
      back: 'A API pública — o que o componente pode usar. Tudo que não está no return é privado.',
      code: `return { count, incrementar }
// 'intervalo' fica privado`,
      lessonTitle: 'return — o balcão',
    },
    {
      id: 'return-fc-2',
      front: 'Deve retornar ref ou .value?',
      back: 'Sempre retorne a ref em si — não o .value. .value retorna um primitivo estático, sem reatividade.',
      code: `// ✅ return { count }
// ❌ return { count: count.value }`,
      lessonTitle: 'return — o balcão',
    },
  ],

  challenges: [
    {
      id: 'return-ch-1',
      type: 'fix-bug',
      title: 'Return quebrado do composable',
      description: 'O composable retorna .value em vez das refs. Corrija para preservar a reatividade.',
      xpReward: 30,
      buggyCode: `import { ref, computed } from 'vue'

export function usePlacar() {
  const pontos = ref(0)
  const nivel = computed(() => Math.floor(pontos.value / 100) + 1)

  function marcar(qtd) { pontos.value += qtd }

  // Bug: retornando .value quebra a reatividade
  return {
    pontos: pontos.value,
    nivel: nivel.value,
    marcar,
  }
}`,
      solution: `import { ref, computed } from 'vue'

export function usePlacar() {
  const pontos = ref(0)
  const nivel = computed(() => Math.floor(pontos.value / 100) + 1)

  function marcar(qtd) { pontos.value += qtd }

  return { pontos, nivel, marcar }
}`,
      explanation: 'Retornar .value cria cópias estáticas — sem reatividade. Sempre retorne a ref/computed em si.',
    },
  ],
}
