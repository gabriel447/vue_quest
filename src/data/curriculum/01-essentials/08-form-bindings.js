export default {
  id: 'form-bindings',
  moduleId: 'essentials',
  title: 'Form Input Bindings',
  icon: '📝',
  xpReward: 30,
  docUrl: 'https://vuejs.org/guide/essentials/forms',

  theory: [
    {
      title: 'v-model — two-way binding simplificado',
      body: `v-model cria um binding bidirecional entre um input e uma variável reativa.
É um atalho que combina :value (leitura) + @input (escrita) em uma única diretiva.`,
      code: `<script setup>
import { ref } from 'vue'
const text = ref('')
const message = ref('Olá Vue!')
</script>

<template>
  <!-- v-model é atalho para: :value + @input -->
  <input v-model="text" />

  <!-- Equivalente manual: -->
  <input
    :value="message"
    @input="message = $event.target.value"
  />

  <p>Você digitou: "{{ text }}"</p>
  <p>Caracteres: {{ text.length }}</p>
</template>`,
    },
    {
      title: 'v-model em diferentes tipos de input',
      body: `v-model adapta-se automaticamente ao tipo de elemento:
- text/textarea → usa value + input event
- checkbox → usa checked + change event
- radio → usa checked + change event
- select → usa value + change event`,
      code: `<script setup>
const checked = ref(false)          // checkbox simples
const selected = ref([])            // múltiplos checkboxes → array
const answer = ref('')              // radio buttons
const city = ref('')                // select
const bio = ref('')                 // textarea
</script>

<template>
  <!-- Checkbox: boolean -->
  <input type="checkbox" v-model="checked" />

  <!-- Múltiplos checkboxes: array -->
  <input type="checkbox" value="Vue" v-model="selected" />
  <input type="checkbox" value="React" v-model="selected" />
  <input type="checkbox" value="Angular" v-model="selected" />

  <!-- Radio: string (value do selecionado) -->
  <input type="radio" value="junior" v-model="answer" />
  <input type="radio" value="senior" v-model="answer" />

  <!-- Select -->
  <select v-model="city">
    <option value="">Escolha...</option>
    <option value="sp">São Paulo</option>
    <option value="rj">Rio de Janeiro</option>
  </select>

  <!-- Textarea -->
  <textarea v-model="bio" rows="4" />
</template>`,
    },
    {
      title: 'Modificadores — .lazy, .number, .trim',
      body: `v-model tem três modificadores que resolvem casos de uso comuns automaticamente.`,
      code: `<!-- .lazy: atualiza no evento 'change' (ao sair do campo), não a cada tecla -->
<input v-model.lazy="username" placeholder="Atualiza ao sair" />

<!-- .number: converte string para number automaticamente -->
<input v-model.number="age" type="number" />
<!-- Sem .number: age.value seria "25" (string) -->
<!-- Com .number: age.value é 25 (number) -->

<!-- .trim: remove espaços do início e fim -->
<input v-model.trim="name" placeholder="Remove espaços extras" />

<!-- Combinando modificadores -->
<input v-model.trim.lazy="email" type="email" />`,
    },
    {
      title: 'Select múltiplo e checkbox com valores customizados',
      body: `Select com atributo multiple retorna um array. Checkboxes podem ter valores customizados (não só true/false).`,
      code: `<script setup>
const selectedLanguages = ref([])     // select multiple
const toggleValue = ref('off')        // checkbox com value custom
</script>

<template>
  <!-- Select múltiplo → array de selecionados -->
  <select v-model="selectedLanguages" multiple>
    <option value="vue">Vue</option>
    <option value="react">React</option>
    <option value="svelte">Svelte</option>
  </select>
  <p>Selecionados: {{ selectedLanguages }}</p>

  <!-- Checkbox com true-value e false-value customizados -->
  <input
    type="checkbox"
    v-model="toggleValue"
    true-value="on"
    false-value="off"
  />
  <p>Valor: {{ toggleValue }}</p>
  <!-- Sem true-value: seria true/false -->
  <!-- Com true-value="on": é "on"/"off" -->
</template>`,
    },
    {
      title: 'Formulários reativos com reactive()',
      body: `Para formulários complexos, use reactive() para agrupar todos os campos em um único objeto.
Facilita reset, validação e submissão.`,
      code: `<script setup>
import { reactive, computed } from 'vue'

const form = reactive({
  name: '',
  email: '',
  age: null,
  plan: 'basic',
  agreedToTerms: false,
})

const isValid = computed(() =>
  form.name.length > 2 &&
  form.email.includes('@') &&
  form.agreedToTerms
)

function handleSubmit() {
  if (!isValid.value) return
  console.log('Enviando:', { ...form })
}

function resetForm() {
  form.name = ''
  form.email = ''
  form.age = null
  form.plan = 'basic'
  form.agreedToTerms = false
}
</script>`,
    },
  ],

  flashcards: [
    {
      id: 'form-fc-1',
      front: 'O que faz v-model?',
      back: 'Cria binding bidirecional — equivale a `:value` + `@input` juntos.',
      code: `<input v-model="text" />`,
      lessonTitle: 'Form Input Bindings',
    },
    {
      id: 'form-fc-2',
      front: 'Qual modificador converte o input para número?',
      back: '`.number` — sem ele, inputs retornam sempre string, mesmo com `type="number"`.',
      code: `<input v-model.number="age" type="number" />`,
      lessonTitle: 'Form Input Bindings',
    },
    {
      id: 'form-fc-3',
      front: 'Qual a diferença entre v-model e v-model.lazy?',
      back: '`v-model` atualiza a cada tecla. `v-model.lazy` atualiza só ao sair do campo.',
      code: `<input v-model="live" />
<input v-model.lazy="delayed" />`,
      lessonTitle: 'Form Input Bindings',
    },
    {
      id: 'form-fc-4',
      front: 'Como vincular múltiplos checkboxes a um array?',
      back: 'Aponte todos para o mesmo `ref([])` com v-model. Cada checkbox precisa de um `value`.',
      code: `const selected = ref([])
<input type="checkbox" value="Vue" v-model="selected" />
<input type="checkbox" value="React" v-model="selected" />`,
      lessonTitle: 'Form Input Bindings',
    },
    {
      id: 'form-fc-5',
      front: 'Como usar v-model num select múltiplo?',
      back: 'Adicione `multiple` ao `<select>` e aponte v-model para um array.',
      code: `const langs = ref([])
<select v-model="langs" multiple>
  <option value="vue">Vue</option>
</select>`,
      lessonTitle: 'Form Input Bindings',
    },
    {
      id: 'form-fc-6',
      front: 'Para que serve v-model.trim?',
      back: 'Remove espaços do início e fim automaticamente. Útil para campos de nome e email.',
      code: `<input v-model.trim="name" />`,
      lessonTitle: 'Form Input Bindings',
    },
  ],

  challenges: [
    {
      id: 'form-ch-1',
      type: 'fill-blank',
      title: 'Input com v-model e modificadores',
      description: 'Complete: o input de nome deve usar v-model com .trim, o de idade com .number.',
      xpReward: 20,
      template: `<script setup>
import { ref } from 'vue'
const name = ref('')
const age = ref(0)
</script>

<template>
  <input ___ placeholder="Nome (trim)" />
  <input ___ type="number" placeholder="Idade (number)" />
  <p>{{ name }}, {{ age }} anos (tipo: {{ typeof age }})</p>
</template>`,
      blanks: ['v-model.trim="name"', 'v-model.number="age"'],
      solution: `<script setup>
import { ref } from 'vue'
const name = ref('')
const age = ref(0)
</script>

<template>
  <input v-model.trim="name" placeholder="Nome (trim)" />
  <input v-model.number="age" type="number" placeholder="Idade (number)" />
  <p>{{ name }}, {{ age }} anos (tipo: {{ typeof age }})</p>
</template>`,
      hint: 'Use v-model.trim e v-model.number nos inputs corretos.',
    },
    {
      id: 'form-ch-2',
      type: 'fill-blank',
      title: 'Formulário com validação',
      description: 'Complete os v-model com modificadores corretos e desabilite o botão quando o form for inválido.',
      xpReward: 55,
      template: `<script setup>
import { ref, computed } from 'vue'

const name = ref('')
const email = ref('')
const age = ref(0)
const agreed = ref(false)

const isValid = computed(() =>
  name.value.length > 2 &&
  email.value.includes('@') &&
  age.value >= 18 &&
  agreed.value
)

function handleSubmit() {
  alert(\`Cadastro enviado: \${name.value}\`)
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <input ___.trim="name" placeholder="Nome" />
    <input ___="email" type="email" placeholder="Email" />
    <input ___.number="age" type="number" placeholder="Idade" min="18" />

    <label>
      <input type="checkbox" v-model="agreed" />
      Aceito os termos
    </label>

    <button ___="!isValid" type="submit">Cadastrar</button>
  </form>

  <pre>{{ { name, email, age, agreed, isValid } }}</pre>
</template>`,
      blanks: ['v-model', 'v-model', 'v-model', ':disabled'],
      solution: `<script setup>
import { ref, computed } from 'vue'

const name = ref('')
const email = ref('')
const age = ref(0)
const agreed = ref(false)

const isValid = computed(() =>
  name.value.length > 2 &&
  email.value.includes('@') &&
  age.value >= 18 &&
  agreed.value
)

function handleSubmit() {
  alert(\`Cadastro enviado: \${name.value}\`)
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <input v-model.trim="name" placeholder="Nome" />
    <input v-model="email" type="email" placeholder="Email" />
    <input v-model.number="age" type="number" placeholder="Idade" min="18" />

    <label>
      <input type="checkbox" v-model="agreed" />
      Aceito os termos
    </label>

    <button :disabled="!isValid" type="submit">Cadastrar</button>
  </form>

  <pre>{{ { name, email, age, agreed, isValid } }}</pre>
</template>`,
      hint: 'v-model.trim remove espaços, v-model.number converte para number. :disabled desabilita o botão.',
    },
    {
      id: 'form-ch-3',
      type: 'fill-blank',
      title: 'Seleção múltipla de skills',
      description: 'Complete: use v-model no array de skills e no select de nível de senioridade.',
      xpReward: 45,
      template: `<script setup>
import { ref } from 'vue'

const skills = ['Vue', 'React', 'Node', 'Python', 'SQL', 'Docker']
const selectedSkills = ref([])
const seniorityLevel = ref('')

function clearSelection() {
  selectedSkills.value = []
  seniorityLevel.value = ''
}
</script>

<template>
  <div>
    <h3>Suas Skills:</h3>
    <label v-for="skill in skills" :key="skill">
      <input type="checkbox" :value="skill" ___="selectedSkills" />
      {{ skill }}
    </label>

    <h3>Nível:</h3>
    <select ___="seniorityLevel">
      <option value="">Escolha...</option>
      <option value="junior">Junior</option>
      <option value="pleno">Pleno</option>
      <option value="senior">Senior</option>
    </select>

    <button @click="clearSelection">Limpar</button>

    <p>Skills: {{ selectedSkills.join(', ') || 'Nenhuma' }}</p>
    <p>Nível: {{ seniorityLevel || 'Não definido' }}</p>
  </div>
</template>`,
      blanks: ['v-model', 'v-model'],
      solution: `<script setup>
import { ref } from 'vue'

const skills = ['Vue', 'React', 'Node', 'Python', 'SQL', 'Docker']
const selectedSkills = ref([])
const seniorityLevel = ref('')

function clearSelection() {
  selectedSkills.value = []
  seniorityLevel.value = ''
}
</script>

<template>
  <div>
    <h3>Suas Skills:</h3>
    <label v-for="skill in skills" :key="skill">
      <input type="checkbox" :value="skill" v-model="selectedSkills" />
      {{ skill }}
    </label>

    <h3>Nível:</h3>
    <select v-model="seniorityLevel">
      <option value="">Escolha...</option>
      <option value="junior">Junior</option>
      <option value="pleno">Pleno</option>
      <option value="senior">Senior</option>
    </select>

    <button @click="clearSelection">Limpar</button>

    <p>Skills: {{ selectedSkills.join(', ') || 'Nenhuma' }}</p>
    <p>Nível: {{ seniorityLevel || 'Não definido' }}</p>
  </div>
</template>`,
      hint: 'Vários checkboxes com o mesmo v-model (array) formam um grupo. O :value define qual skill cada um representa.',
    },
    {
      id: 'form-ch-4',
      type: 'fix-bug',
      title: 'Bugs no formulário',
      description: 'O formulário tem 3 bugs: checkbox não atualiza, número não é numérico, e o form recarrega a página. Corrija.',
      xpReward: 30,
      buggyCode: `<script setup>
import { ref } from 'vue'
const accepted = ref(false)
const quantity = ref(1)
const email = ref('')

function submit() {
  console.log(quantity.value + 1) // deveria dar 2, mas dá "11"
}
</script>

<template>
  <form @submit="submit">
    <input type="checkbox" :checked="accepted" />
    <p>Aceito: {{ accepted }}</p>

    <input type="number" v-model="quantity" />

    <input type="email" :value="email" />

    <button type="submit">Enviar</button>
  </form>
</template>`,
      solution: `<script setup>
import { ref } from 'vue'
const accepted = ref(false)
const quantity = ref(1)
const email = ref('')

function submit() {
  console.log(quantity.value + 1) // 2 ✅
}
</script>

<template>
  <form @submit.prevent="submit">
    <input type="checkbox" v-model="accepted" />
    <p>Aceito: {{ accepted }}</p>

    <input type="number" v-model.number="quantity" />

    <input type="email" v-model="email" />

    <button type="submit">Enviar</button>
  </form>
</template>`,
      explanation: '1) Checkbox precisa de v-model, não :checked (unidirecional). 2) .number converte para number. 3) email precisa de v-model. 4) .prevent no submit.',
    },
  ],
}
