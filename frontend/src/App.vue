<template>
  <main class="container">
    <h1>MyAutoHome</h1>
    <section class="cards">
      <BlindsOne/>
      <PMSAirMeter/>
    </section>
  </main>
</template>

<script lang="ts" setup>
import BlindsOne from './components/devices/BlindsOne.vue'
import PMSAirMeter from './components/devices/PMSAirMeter.vue';
</script>

<style scoped>
.cards {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 22px;
}

@media(min-width: 1020px) {
  .cards {
    grid-template-columns: repeat(3, 1fr);
  }
}

h1 {
  margin: 24px 0;
}

h2 {
  margin: 0 0 12px 0;
}

</style>
