import templateSyntax from './01-essentials/01-template-syntax.js'
import reactivity from './01-essentials/02-reactivity.js'
import computed from './01-essentials/03-computed.js'
import conditional from './01-essentials/04-conditional.js'
import listRendering from './01-essentials/05-list-rendering.js'
import eventHandling from './01-essentials/06-event-handling.js'
import classStyle from './01-essentials/07-class-style.js'
import formBindings from './01-essentials/08-form-bindings.js'
import lifecycle from './01-essentials/09-lifecycle.js'
import watchers from './01-essentials/10-watchers.js'
import templateRefs from './01-essentials/11-template-refs.js'
import componentsBasics from './01-essentials/12-components-basics.js'

export const modules = [
  {
    id: 'essentials',
    title: 'Essentials',
    icon: '🟢',
    description: 'Os fundamentos do Vue.js: templates, reatividade, componentes básicos.',
    color: '#42b883',
    lessons: [
      templateSyntax,
      reactivity,
      computed,
      conditional,
      listRendering,
      eventHandling,
      classStyle,
      formBindings,
      lifecycle,
      watchers,
      templateRefs,
      componentsBasics,
    ],
    bossBattle: {
      id: 'boss-essentials',
      title: 'Boss: App de Lista de Compras',
      description: 'Combine tudo que aprendeu para criar uma lista de compras completa com filtros e totais.',
      xpReward: 150,
      requirements: [
        'template-syntax', 'reactivity', 'computed', 'conditional',
        'list-rendering', 'event-handling', 'form-bindings', 'components-basics',
      ],
    },
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
]

// Flat map de todas as lições
export const allLessons = modules.flatMap(m => m.lessons)

// Flat map de todos os flashcards
export const allFlashcards = allLessons.flatMap(l =>
  (l.flashcards || []).map(fc => ({ ...fc, lessonId: l.id, moduleId: l.moduleId, lessonTitle: l.title }))
)

// Flat map de todos os desafios
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
