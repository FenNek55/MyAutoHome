<template>
  <main class="container">
    <h1>MyAutoHome</h1>
    <section class="cards">
      <BlindsOne/>
      <PMSAirMeter :newestEntry="newestPmsEntry"/>
      <DHTMeter :newestEntry="newestDhtEntry"/>
    </section>
  </main>
</template>

<script lang="ts" setup>
import BlindsOne from './components/devices/BlindsOne.vue'
import PMSAirMeter from './components/devices/PMSAirMeter.vue';
import DHTMeter from './components/devices/DHTMeter.vue';
import { onMounted, ref } from 'vue';
import axios from 'axios'
import type { PMSEntry, DHTEntry } from './types'

const pmsData = ref<PMSEntry[]>([])
const newestPmsEntry = ref<PMSEntry | null>(null)

const dhtData = ref<DHTEntry[]>([])
const newestDhtEntry = ref<DHTEntry | null>(null)

const getPmsData = () => {
    axios.get('http://192.168.0.128:5000/pms').then((response) => {
        pmsData.value = response.data;
        newestPmsEntry.value = response.data[0];
    })
}

const getDhtData = () => {
    axios.get('http://192.168.0.128:5000/dht').then((response) => {
        dhtData.value = response.data;
        newestDhtEntry.value = response.data[0];
    })
}

onMounted(() => {
  getPmsData()
  getDhtData()

    setInterval(() => {
      getPmsData()
      getDhtData()
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
