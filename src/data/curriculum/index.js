export const modules = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    icon: '🚀',
    description: 'Introdução ao Vue.js: o que é, como funciona e seu primeiro componente.',
    color: '#06b6d4',
    lessons: [],
  },
  {
    id: 'essentials',
    title: 'Essentials',
    icon: '🟢',
    description: 'Os fundamentos do Vue.js: templates, reatividade, componentes básicos.',
    color: '#42b883',
    lessons: [],
  },
  {
    id: 'components',
    title: 'Components In-Depth',
    icon: '🧩',
    description: 'Props, eventos, slots, provide/inject e mais.',
    color: '#3b82f6',
    locked: true,
    lessons: [],
  },
  {
    id: 'reusability',
    title: 'Reusability',
    icon: '♻️',
    description: 'Composables, diretivas customizadas e plugins.',
    color: '#8b5cf6',
    locked: true,
    lessons: [],
  },
  {
    id: 'built-ins',
    title: 'Built-in Components',
    icon: '⚙️',
    description: 'Transition, KeepAlive, Teleport, Suspense.',
    color: '#f59e0b',
    locked: true,
    lessons: [],
  },
  {
    id: 'scaling-up',
    title: 'Scaling Up',
    icon: '📦',
    description: 'Vue Router, Pinia, SSR e estrutura de projetos grandes.',
    color: '#ef4444',
    locked: true,
    lessons: [],
  },
  {
    id: 'best-practices',
    title: 'Best Practices',
    icon: '✅',
    description: 'Performance, segurança, acessibilidade e convenções.',
    color: '#10b981',
    locked: true,
    lessons: [],
  },
  {
    id: 'typescript',
    title: 'TypeScript',
    icon: '🔷',
    description: 'Vue com TypeScript: tipagem de props, emits, composables e mais.',
    color: '#3178c6',
    locked: true,
    lessons: [],
  },
  {
    id: 'extra-topics',
    title: 'Extra Topics',
    icon: '🌟',
    description: 'Tópicos avançados: animações, Web Components, renderização e otimizações.',
    color: '#f97316',
    locked: true,
    lessons: [],
  },
]

export const allLessons = modules.flatMap(m => m.lessons)

export const allFlashcards = allLessons.flatMap(l =>
  (l.flashcards || []).map(fc => ({ ...fc, lessonId: l.id, moduleId: l.moduleId, lessonTitle: l.title }))
)

export const allChallenges = allLessons.flatMap(l =>
  (l.challenges || []).map(ch => ({ ...ch, lessonId: l.id, moduleId: l.moduleId, lessonTitle: l.title }))
)

export function getModuleById(id) {
  return modules.find(m => m.id === id)
}

export function getLessonById(id) {
  return allLessons.find(l => l.id === id)
}

export function getFlashcardById(id) {
  return allFlashcards.find(fc => fc.id === id)
}
