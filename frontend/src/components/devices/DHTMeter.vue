<template>
    <Card>
        <h2>Warunki powietrza</h2>
        <div class="dht__date">Ostatnio aktualizowane: {{ lastUpdateDate }}</div>
        <div class="dht__entry">Temperatura: <span class="dht__value">{{ newestEntry?.temperature }}°C</span></div>
        <div class="dht__entry">Wilgotność: <span class="dht__value">{{ newestEntry?.humidity }}%</span></div>
    </Card>
</template>

<script lang="ts" setup>
import Card from '../Card.vue'
import { computed } from 'vue';
import type { DHTEntry } from '../../types'

const props = defineProps<{
    newestEntry: DHTEntry | null,
}>()

const lastUpdateDate = computed(() => {
    //date from timestamp
    if (!props.newestEntry) return '...';

    const date = new Date(+props.newestEntry.timestamp * 1000);
    console.log(date)
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${day}.${month}.${year} ${hours}:${minutes}`;
})
</script>

<style scoped>
h2 {
    margin-bottom: 4px;
}

.loader--hidden {
    display: none;
}

.dht__date {
    margin-bottom: 12px;
    color: rgb(186, 186, 186);
    font-size: 14px;
}

.dht__entry {
    margin-bottom: 12px;
    font-size: 16px;
}

.dht__entry:last-child {
    margin-bottom: 0;
}

.dht__value {
    font-weight: bold;
}

.dht__value--good {
    color: rgb(55, 180, 55);
}

.dht__value--medium {
    color: rgb(255, 255, 0);
}

.dht__value--bad {
    color: rgb(255, 165, 0);
}

.dht__value--very-bad {
    color: rgb(255, 0, 0);
}
</style>