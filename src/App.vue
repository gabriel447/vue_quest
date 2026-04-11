<script setup>
import AppHeader from './components/layout/AppHeader.vue'
</script>

<template>
  <div id="app-wrapper">
    <AppHeader />
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style>
#app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
}
</style>
