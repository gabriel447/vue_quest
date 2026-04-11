<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { EditorView, ViewPlugin, Decoration } from '@codemirror/view'
import { EditorState } from '@codemirror/state'
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language'
import { basicSetup } from 'codemirror'
import { html } from '@codemirror/lang-html'
import { javascript } from '@codemirror/lang-javascript'
import { tags } from '@lezer/highlight'

const props = defineProps({
  modelValue: { type: String, default: '' },
  language: { type: String, default: 'html' },
  readonly: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue'])

const editorEl = ref(null)
let view = null

// Dracula Soft — cores exatas igual ao VS Code do usuário
const draculaSoftHighlight = HighlightStyle.define([
  // Keywords: const, if, import, from, watch, return...
  { tag: tags.keyword,                        color: '#ff92d0', fontWeight: 'bold' },
  // Tags HTML: <template>, <div>, <script>...
  { tag: tags.tagName,                        color: '#ff92d0' },
  { tag: tags.angleBracket,                   color: '#f8f8f2' },
  // Atributos HTML: name, class, v-if... (itálico igual Dracula Soft)
  { tag: tags.attributeName,                  color: '#5af78e', fontStyle: 'italic' },
  // Valores de atributo e strings: "toast", 'vue', 'close'
  { tag: [tags.attributeValue, tags.string],  color: '#ffffa5' },
  // Comentários
  { tag: tags.comment,                        color: '#7970a9', fontStyle: 'italic' },
  // Tipos: Boolean, Number, String
  { tag: tags.typeName,                       color: '#62d6e8', fontStyle: 'italic' },
  // Funções: defineProps, watch, setTimeout, emit
  { tag: tags.function(tags.variableName),    color: '#5af78e' },
  { tag: tags.function(tags.propertyName),    color: '#5af78e' },
  // Números: 4000
  { tag: tags.number,                         color: '#caa9fa' },
  // Booleanos
  { tag: tags.bool,                           color: '#caa9fa' },
  // Operadores: =>, =, +, ...
  { tag: tags.operator,                       color: '#ff92d0' },
  // Propriedades: .show, .value
  { tag: tags.propertyName,                   color: '#f8f8f2' },
  // Definições de variáveis: const x =
  { tag: tags.definition(tags.variableName),  color: '#f8f8f2' },
  // Variáveis e self (this, props)
  { tag: [tags.variableName, tags.self],      color: '#f8f8f2' },
  // Pontuação
  { tag: tags.punctuation,                    color: '#f8f8f2' },
  { tag: tags.bracket,                        color: '#f8f8f2' },
  // Classe
  { tag: tags.className,                      color: '#62d6e8' },
])

// Tema de interface (cores do editor, não do código)
const draculaSoftTheme = EditorView.theme({
  '&': {
    background: '#22212c',
    color: '#f8f8f2',
    fontSize: '0.92rem',
    fontFamily: "'Fira Code', 'JetBrains Mono', monospace",
  },
  '.cm-scroller': { lineHeight: '1.75' },
  '.cm-content': { caretColor: '#f8f8f2', padding: '1rem' },
  '.cm-line': { color: '#f8f8f2' },
  '.cm-activeLine': { background: '#2d2b38' },
  '.cm-gutters': {
    background: '#22212c',
    borderRight: '1px solid rgba(255,255,255,0.05)',
    color: '#7970a9',
    minWidth: '2.5rem',
  },
  '.cm-activeLineGutter': { background: '#2d2b38' },
  '.cm-cursor, .cm-dropCursor': { borderLeftColor: '#f8f8f2', borderLeftWidth: '2px' },
  '&.cm-focused .cm-selectionBackground, .cm-selectionBackground': {
    background: '#454158 !important',
  },
}, { dark: true })

// Marca a própria palavra selecionada com cm-selectionMatch
// (o CM6 por padrão só marca as outras ocorrências, não a selecionada)
const highlightSelectedWord = ViewPlugin.fromClass(
  class {
    constructor(view) { this.decorations = this.compute(view) }
    update(u) {
      if (u.selectionSet || u.docChanged) this.decorations = this.compute(u.view)
    }
    compute(view) {
      const sel = view.state.selection.main
      if (sel.empty) return Decoration.none
      const word = view.state.sliceDoc(sel.from, sel.to)
      if (!word.trim()) return Decoration.none
      return Decoration.set([Decoration.mark({ class: 'cm-selectionMatch' }).range(sel.from, sel.to)])
    }
  },
  { decorations: v => v.decorations }
)

onMounted(() => {
  const lang = props.language === 'js' ? javascript() : html()

  const extensions = [
    basicSetup,
    draculaSoftTheme,
    syntaxHighlighting(draculaSoftHighlight),
    lang,
    EditorView.lineWrapping,
    highlightSelectedWord,
  ]

  if (props.readonly) {
    extensions.push(EditorState.readOnly.of(true))
  } else {
    extensions.push(
      EditorView.updateListener.of(update => {
        if (update.docChanged) {
          emit('update:modelValue', update.state.doc.toString())
        }
      })
    )
  }

  view = new EditorView({
    state: EditorState.create({
      doc: props.modelValue || '',
      extensions,
    }),
    parent: editorEl.value,
  })
})

onBeforeUnmount(() => {
  view?.destroy()
})

watch(() => props.modelValue, (val) => {
  if (!view) return
  const current = view.state.doc.toString()
  if (val !== current) {
    view.dispatch({
      changes: { from: 0, to: current.length, insert: val ?? '' },
    })
  }
})
</script>

<template>
  <div ref="editorEl" class="code-editor-root" :class="{ 'is-readonly': readonly }" />
</template>

<style scoped>
.code-editor-root {
  border: 1px solid rgba(121, 112, 169, 0.35);
  border-radius: 10px;
  overflow: hidden;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.code-editor-root:focus-within {
  border-color: #caa9fa;
  box-shadow: 0 0 0 2px rgba(202, 169, 250, 0.12);
}

.code-editor-root.is-readonly {
  cursor: default;
  user-select: text;
}

.code-editor-root.is-readonly:focus-within {
  border-color: rgba(121, 112, 169, 0.35);
  box-shadow: none;
}
</style>

<style>
.cm-editor .cm-selectionBackground,
.cm-editor.cm-focused .cm-selectionBackground {
  background: #454158 !important;
}
.cm-editor .cm-content ::selection {
  background-color: #454158;
}

/* Garante que o CM6 respeite o border-radius do container */
.cm-editor {
  border-radius: inherit;
}
.cm-editor .cm-scroller {
  border-radius: inherit;
}
</style>
