import lessonRef from './01-reactivity/01-ref.js'
import lessonReactive from './01-reactivity/02-reactive.js'
import lessonComputed from './01-reactivity/03-computed.js'
import lessonWatch from './01-reactivity/04-watch.js'
import lessonWatchEffect from './01-reactivity/05-watch-effect.js'
import lessonNextTick from './01-reactivity/06-next-tick.js'

import lessonVIf from './02-templates-directives/01-v-if.js'
import lessonVShow from './02-templates-directives/02-v-show.js'
import lessonVFor from './02-templates-directives/03-v-for.js'
import lessonPropBinding from './02-templates-directives/04-prop-binding.js'
import lessonEventHandling from './02-templates-directives/05-event-handling.js'
import lessonVModel from './02-templates-directives/06-v-model.js'
import lessonTemplateRef from './02-templates-directives/07-template-ref.js'

import lessonProps from './03-communication/01-props.js'
import lessonEmits from './03-communication/02-emits.js'
import lessonSlots from './03-communication/03-slots.js'
import lessonKeepAlive from './03-communication/04-keep-alive.js'
import lessonOnMounted from './03-communication/05-on-mounted.js'
import lessonOnBeforeUnmount from './03-communication/06-on-before-unmount.js'

import lessonDefineStore from './04-pinia/01-define-store.js'
import lessonState from './04-pinia/02-state.js'
import lessonActions from './04-pinia/03-actions.js'
import lessonGetters from './04-pinia/04-getters.js'

import lessonUseNome from './05-composables/01-use-nome.js'
import lessonReturn from './05-composables/02-return.js'
import lessonReusability from './05-composables/03-reusability.js'

import lessonTeleport from './06-teleport/01-teleport.js'
import lessonTeleportTo from './06-teleport/02-to-destination.js'

import lessonLifecycleMounted from './07-lifecycle/01-on-mounted-lifecycle.js'
import lessonLifecycleUnmounted from './07-lifecycle/02-on-unmounted.js'

import lessonSlotExtra from './08-component-extras/01-slot-extra.js'
import lessonKeepAliveExtra from './08-component-extras/02-keep-alive-extra.js'

export const modules = [
  {
    id: 'reactivity',
    title: 'Reatividade Central',
    icon: '🧪',
    description: 'ref, reactive, computed, watch, watchEffect e nextTick.',
    color: '#42b883',
    lessons: [
      lessonRef,
      lessonReactive,
      lessonComputed,
      lessonWatch,
      lessonWatchEffect,
      lessonNextTick,
    ],
  },
  {
    id: 'templates-directives',
    title: 'Templates e Diretivas',
    icon: '🛠️',
    description: 'v-if, v-show, v-for, bindings, eventos, v-model e template refs.',
    color: '#3b82f6',
    locked: true,
    lessons: [
      lessonVIf,
      lessonVShow,
      lessonVFor,
      lessonPropBinding,
      lessonEventHandling,
      lessonVModel,
      lessonTemplateRef,
    ],
  },
  {
    id: 'communication',
    title: 'Comunicação e Ciclo de Vida',
    icon: '🧬',
    description: 'Props, emits, slots, KeepAlive e hooks de ciclo de vida.',
    color: '#8b5cf6',
    locked: true,
    lessons: [
      lessonProps,
      lessonEmits,
      lessonSlots,
      lessonKeepAlive,
      lessonOnMounted,
      lessonOnBeforeUnmount,
    ],
  },
  {
    id: 'pinia',
    title: 'Pinia',
    icon: '🍍',
    description: 'O banco de dados do front: defineStore, state, actions e getters.',
    color: '#f59e0b',
    locked: true,
    lessons: [
      lessonDefineStore,
      lessonState,
      lessonActions,
      lessonGetters,
    ],
  },
  {
    id: 'composables',
    title: 'Composables',
    icon: '🧩',
    description: 'Empacote lógica reutilizável com composables e o padrão useNome.',
    color: '#ef4444',
    locked: true,
    lessons: [
      lessonUseNome,
      lessonReturn,
      lessonReusability,
    ],
  },
  {
    id: 'teleport',
    title: 'Teleport',
    icon: '🌌',
    description: 'Teletransporte elementos para qualquer parte do DOM com Teleport.',
    color: '#06b6d4',
    locked: true,
    lessons: [
      lessonTeleport,
      lessonTeleportTo,
    ],
  },
  {
    id: 'lifecycle',
    title: 'Ciclo de Vida',
    icon: '🎢',
    description: 'onMounted, onUnmounted e o ciclo completo de um componente Vue.',
    color: '#10b981',
    locked: true,
    lessons: [
      lessonLifecycleMounted,
      lessonLifecycleUnmounted,
    ],
  },
  {
    id: 'component-extras',
    title: 'Extras de Componentes',
    icon: '📦',
    description: 'Slots, KeepAlive e outros recursos avançados de componentes.',
    color: '#f97316',
    locked: true,
    lessons: [
      lessonSlotExtra,
      lessonKeepAliveExtra,
    ],
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
