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

import registration from './02-components/01-registration.js'
import propsInDepth from './02-components/02-props-in-depth.js'
import customEvents from './02-components/03-custom-events.js'
import componentVmodel from './02-components/04-component-vmodel.js'
import slots from './02-components/05-slots.js'
import scopedSlots from './02-components/06-scoped-slots.js'
import provideInject from './02-components/07-provide-inject.js'
import fallthroughAttrs from './02-components/08-fallthrough-attrs.js'

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
      description: 'Construa um app de lista de compras completo aplicando TUDO que você aprendeu no módulo.',
      xpReward: 150,
      requirements: [
        'template-syntax', 'reactivity', 'computed', 'conditional',
        'list-rendering', 'event-handling', 'class-style', 'form-bindings',
        'lifecycle', 'watchers', 'template-refs', 'components-basics',
      ],
      objectives: [
        'Template syntax: exibir dados com {{ }} e :bind',
        'Reactivity: ref() para itens, reactive() para o formulário',
        'Computed: total de itens, total gasto, itens filtrados',
        'Conditional: v-if/v-show para estado vazio, loading, categorias',
        'List rendering: v-for com :key para renderizar a lista',
        'Event handling: @click, @submit.prevent, @keyup.enter',
        'Class & Style: :class para item comprado, :style para prioridade',
        'Form bindings: v-model nos campos do formulário',
        'Lifecycle: onMounted para carregar do localStorage',
        'Watchers: watch para salvar no localStorage automaticamente',
        'Template refs: focar o input de nome automaticamente',
        'Components: componente separado ItemCompra com props + emit',
      ],
    },
  },
  {
    id: 'components',
    title: 'Components In-Depth',
    icon: '🧩',
    description: 'Props, eventos, slots, provide/inject e mais.',
    color: '#3b82f6',
    lessons: [
      registration,
      propsInDepth,
      customEvents,
      componentVmodel,
      slots,
      scopedSlots,
      provideInject,
      fallthroughAttrs,
    ],
    bossBattle: {
      id: 'boss-components',
      title: 'Boss: UI Component Library',
      description: 'Construa uma mini biblioteca de componentes reutilizáveis aplicando props, slots, provide/inject e mais.',
      xpReward: 200,
      requirements: [
        'registration', 'props-in-depth', 'custom-events', 'component-vmodel',
        'slots', 'scoped-slots', 'provide-inject', 'fallthrough-attrs',
      ],
      objectives: [
        'Registration: importe e use componentes localmente',
        'Props In-Depth: valide tipos, required e defaults',
        'Custom Events: comunique filho → pai com defineEmits',
        'Component v-model: crie um input customizado com defineModel',
        'Slots: crie um Card e Modal com slots nomeados',
        'Scoped Slots: crie uma lista com renderização customizável',
        'Provide/Inject: compartilhe tema escuro/claro sem prop drilling',
        'Fallthrough Attrs: crie wrappers que repassam atributos corretamente',
      ],
    },
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
