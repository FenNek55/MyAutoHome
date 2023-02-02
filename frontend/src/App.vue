<template>
  <main class="container">
    <h1>MyAutoHome</h1>
    <section class="cards">
      <BlindsOne/>
      <PMSAirMeter :newestEntry="newestEntry"/>
    </section>
  </main>
</template>

<script lang="ts" setup>
import BlindsOne from './components/devices/BlindsOne.vue'
import PMSAirMeter from './components/devices/PMSAirMeter.vue';
import { onMounted, ref } from 'vue';
import axios from 'axios'
import type { PMSEntry } from './types'

const airQuality = ref<PMSEntry[]>([])
const newestEntry = ref<PMSEntry | null>(null)

const getDeviceData = () => {
    axios.get('http://192.168.0.128:5000/pms').then((response) => {
        airQuality.value = response.data;
        newestEntry.value = response.data[0];
    })
}

onMounted(() => {
    getDeviceData()

    setInterval(() => {
        getDeviceData()
    }, 60000)
});
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
