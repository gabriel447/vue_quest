# Vue Quest ⚡

App gamificado para aprender Vue.js com spaced repetition, desafios de código e sistema de XP.

Baseado na documentação oficial: [vuejs.org/guide](https://vuejs.org/guide)

## O que tem no app

- **12 lições completas** do módulo Essentials com teoria paginada
- **35 desafios de código** (fill-in-blank, escreva do zero, corrija o bug)
- **49 flashcards** com revisão espaçada (algoritmo SM-2 igual ao Anki)
- **Sistema de XP e 15 níveis** — de Iniciante a Vue Master
- **Streak diário** para manter consistência
- **Notas pessoais** por lição, salvas automaticamente

## Como rodar localmente

```bash
npm install
npm run dev
```

Acesse: [http://localhost:5173](http://localhost:5173)

## Deploy na Vercel

### Opção 1 — Via interface (recomendado)

1. Acesse [vercel.com](https://vercel.com) e faça login
2. Clique em **Add New Project**
3. Importe o repositório `vuejs_game`
4. As configurações são detectadas automaticamente:
   - **Framework:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Clique em **Deploy**

### Opção 2 — Via CLI

```bash
npm install -g vercel
vercel
```

## Build para produção

```bash
npm run build
```

Os arquivos ficam na pasta `dist/`.

## Stack

- Vue 3 + Composition API + `<script setup>`
- Vite
- Pinia (state management)
- Vue Router 4
- localStorage (sem backend, zero configuração)

## Como adicionar mais lições

Crie um arquivo em `src/data/curriculum/01-essentials/` seguindo o padrão dos existentes e registre no `src/data/curriculum/index.js`.

Cada lição tem:
- `theory[]` — blocos de teoria com código
- `flashcards[]` — cards para revisão espaçada (SM-2)
- `challenges[]` — desafios de código (`fill-blank`, `write-from-scratch`, `fix-bug`)
