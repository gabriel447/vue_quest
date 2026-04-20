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
      body: `v-model é um atalho poderoso. Em vez de escrever :value + @input manualmente, você usa só v-model e ele faz os dois. O estado reativo é sempre a fonte da verdade — o input apenas reflete e atualiza esse estado.`,
      code: `<script setup>
import { ref } from 'vue'
const text = ref('')
const message = ref('Olá Vue!')
</script>

<template>
  <!-- v-model é atalho para: :value + @input -->
  <input v-model="text" />

  <!-- Equivalente manual (mais verbose): -->
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
      body: `O v-model é inteligente e se adapta ao tipo de elemento. Em checkboxes vira boolean (ou array se múltiplos), em radio buttons vira a string do selecionado, em selects vira o value da option escolhida.`,
      code: `<script setup>
import { ref } from 'vue'
const checked = ref(false)       // checkbox simples → boolean
const selected = ref([])         // múltiplos checkboxes → array
const answer = ref('')           // radio buttons → string
const city = ref('')             // select → string
const bio = ref('')              // textarea → string
</script>

<template>
  <!-- Checkbox: boolean -->
  <input type="checkbox" v-model="checked" />

  <!-- Múltiplos checkboxes: array de values marcados -->
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

  <!-- Textarea funciona igual ao input de texto -->
  <textarea v-model="bio" rows="4" />
</template>`,
    },
    {
      title: 'Modificadores — .lazy, .number, .trim',
      body: `Três modificadores que resolvem casos comuns automaticamente: .lazy atualiza só ao sair do campo (não a cada tecla), .number converte a string para número (inputs sempre retornam string por padrão), .trim remove espaços extras das bordas.`,
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
      body: `Select com atributo multiple retorna um array de todos os selecionados — aponte para um ref([]). Checkboxes podem ter valores customizados (não só true/false) com true-value e false-value.`,
      code: `<script setup>
import { ref } from 'vue'
const selectedLanguages = ref([])   // select multiple → array
const toggleValue = ref('off')       // checkbox com value custom
</script>

<template>
  <!-- Select múltiplo → array de selecionados -->
  <select v-model="selectedLanguages" multiple>
    <option value="vue">Vue</option>
    <option value="react">React</option>
    <option value="svelte">Svelte</option>
  </select>
  <p>Selecionados: {{ selectedLanguages }}</p>

  <!-- Checkbox com valores customizados (não boolean) -->
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
      body: `Para formulários complexos, use reactive() para agrupar todos os campos num único objeto. Facilita reset, validação e submissão — e uma computed isValid mantém o template limpo.`,
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
  Object.assign(form, {
    name: '', email: '', age: null,
    plan: 'basic', agreedToTerms: false,
  })
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
// <input type="checkbox" value="Vue" v-model="selected" />
// <input type="checkbox" value="React" v-model="selected" />`,
      lessonTitle: 'Form Input Bindings',
    },
    {
      id: 'form-fc-5',
      front: 'Como usar v-model num select múltiplo?',
      back: 'Adicione `multiple` ao `<select>` e aponte v-model para um array.',
      code: `const langs = ref([])
// <select v-model="langs" multiple>
//   <option value="vue">Vue</option>
// </select>`,
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
      type: 'fill-blank',
      title: 'Formulário com reactive()',
      description: 'Complete o reactive() para o form e os v-model com os modificadores corretos.',
      xpReward: 35,
      template: `<script setup>
import { reactive, computed } from 'vue'

const form = ___({
  username: '',
  age: 0,
  newsletter: false,
})

const isValid = computed(() =>
  form.username.length > 2 && form.age >= 18
)
</script>

<template>
  <input ___ placeholder="Username" />
  <input ___ type="number" placeholder="Idade" />
  <label>
    <input type="checkbox" v-model="form.newsletter" />
    Receber newsletter
  </label>
  <p v-if="isValid">✅ Formulário válido!</p>
  <p v-else>❌ Preencha corretamente</p>
</template>`,
      blanks: ['reactive', 'v-model.trim="form.username"', 'v-model.number="form.age"'],
      solution: `<script setup>
import { reactive, computed } from 'vue'

const form = reactive({
  username: '',
  age: 0,
  newsletter: false,
})

const isValid = computed(() =>
  form.username.length > 2 && form.age >= 18
)
</script>

<template>
  <input v-model.trim="form.username" placeholder="Username" />
  <input v-model.number="form.age" type="number" placeholder="Idade" />
  <label>
    <input type="checkbox" v-model="form.newsletter" />
    Receber newsletter
  </label>
  <p v-if="isValid">✅ Formulário válido!</p>
  <p v-else>❌ Preencha corretamente</p>
</template>`,
      hint: 'reactive() agrupa campos do form num objeto. Use .trim para texto e .number para números.',
    },
    {
      id: 'form-ch-5',
      type: 'fix-bug',
      title: 'Bugs no formulário',
      description: 'O formulário tem 3 erros. Encontre e corrija.',
      xpReward: 30,
      buggyCode: `<script setup>
import { ref } from 'vue'
const accepted = ref(false)
const quantity = ref(1)

function submit() {
  console.log(quantity.value + 1)
}
</script>

<template>
  <form @submit="submit">
    <input type="checkbox" :checked="accepted" />
    <p>Aceito: {{ accepted }}</p>

    <input type="number" v-model="quantity" />
    <p>Qty + 1 = {{ quantity + 1 }}</p>

    <button type="submit">Enviar</button>
  </form>
</template>`,
      solution: `<script setup>
import { ref } from 'vue'
const accepted = ref(false)
const quantity = ref(1)

function submit() {
  console.log(quantity.value + 1)
}
</script>

<template>
  <form @submit.prevent="submit">
    <input type="checkbox" v-model="accepted" />
    <p>Aceito: {{ accepted }}</p>

    <input type="number" v-model.number="quantity" />
    <p>Qty + 1 = {{ quantity + 1 }}</p>

    <button type="submit">Enviar</button>
  </form>
</template>`,
      explanation: '1) :checked é unidirecional — use v-model para two-way binding no checkbox. 2) v-model.number converte o valor para number. 3) @submit sem .prevent recarrega a página.',
    },
  ],
}
