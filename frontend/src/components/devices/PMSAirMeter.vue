<template>
    <Card>
        <h2>Jakość powietrza</h2>
        <div class="pms__date">Ostatnio aktualizowane: {{ newestEntry?.timestamp.toLocaleString() }}</div>
        <div class="pms__entry">PM 1.0: <span class="pms__value" :class="pm1Class">{{ newestEntry?.pm1 }}</span></div>
        <div class="pms__entry">PM 2.5: <span class="pms__value" :class="pm25Class">{{ newestEntry?.pm25 }}</span></div>
        <div class="pms__entry">PM 10: <span class="pms__value" :class="pm10Class">{{ newestEntry?.pm10 }}</span></div>
    </Card>
</template>

<script lang="ts" setup>
import Card from '../Card.vue'
import axios from 'axios'
import { onMounted, ref, computed } from 'vue';

interface PMSEntry {
    id: number;
    timestamp: Date;
    pm1: number;
    pm25: number;
    pm10: number;
}

interface AirQuality {
    data: [number, string, number, number, number][];
}

const airQuality = ref<AirQuality>({data: []})
const newestEntry = ref<PMSEntry | null>(null)

const pm25Class = computed(() => {
    if (!newestEntry.value) return 'pms__value--good';

    if (newestEntry.value?.pm25 < 25) {
        return 'pms__value--good';
    } else if (newestEntry.value?.pm25 < 50) {
        return 'pms__value--medium';
    } else if (newestEntry.value?.pm25 < 100) {
        return 'pms__value--bad';
    } else {
        return 'pms__value--very-bad';
    }
})

const pm10Class = computed(() => {
    if (!newestEntry.value) return 'pms__value--good';

    if (newestEntry.value?.pm10 < 50) {
        return 'pms__value--good';
    } else if (newestEntry.value?.pm10 < 100) {
        return 'pms__value--medium';
    } else if (newestEntry.value?.pm10 < 200) {
        return 'pms__value--bad';
    } else {
        return 'pms__value--very-bad';
    }
})

const pm1Class = computed(() => {
    if (!newestEntry.value) return 'pms__value--good';

    if (newestEntry.value?.pm1 < 10) {
        return 'pms__value--good';
    } else if (newestEntry.value?.pm1 < 20) {
        return 'pms__value--medium';
    } else if (newestEntry.value?.pm1 < 50) {
        return 'pms__value--bad';
    } else {
        return 'pms__value--very-bad';
    }
})

const getDeviceData = () => {
    axios.get('http://192.168.0.128:5000/pms').then((response) => {
        airQuality.value = response.data;
        newestEntry.value = {
            id: airQuality.value.data[0][0],
            timestamp: new Date(parseInt(airQuality.value.data[0][1]) * 1000),
            pm1: airQuality.value.data[0][2],
            pm25: airQuality.value.data[0][3],
            pm10: airQuality.value.data[0][4]
        }
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
h2 {
    margin-bottom: 4px;
}

.loader--hidden {
    display: none;
}

.pms__date {
    margin-bottom: 12px;
    color: rgb(186, 186, 186);
    font-size: 14px;
}

.pms__entry {
    margin-bottom: 12px;
    font-size: 16px;
}

.pms__entry:last-child {
    margin-bottom: 0;
}

.pms__value {
    font-weight: bold;
}

.pms__value--good {
    color: rgb(55, 180, 55);
}

.pms__value--medium {
    color: rgb(255, 255, 0);
}

.pms__value--bad {
    color: rgb(255, 165, 0);
}

.pms__value--very-bad {
    color: rgb(255, 0, 0);
}
</style>