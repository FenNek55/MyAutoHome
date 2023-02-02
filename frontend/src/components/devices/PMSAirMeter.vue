<template>
    <Card>
        <h2>Jakość powietrza</h2>
        <div class="pms__date">Ostatnio aktualizowane: {{ lastUpdateDate }}</div>
        <div class="pms__entry">PM 1.0 μg/m3: <span class="pms__value" :class="pm1Class">{{ newestEntry?.pm1 }}</span></div>
        <div class="pms__entry">PM 2.5 μg/m3: <span class="pms__value" :class="pm25Class">{{ newestEntry?.pm25 }}</span></div>
        <div class="pms__entry">PM 10 μg/m3: <span class="pms__value" :class="pm10Class">{{ newestEntry?.pm10 }}</span></div>
    </Card>
</template>

<script lang="ts" setup>
import Card from '../Card.vue'
import { computed } from 'vue';
import type { PMSEntry } from '../../types'

const props = defineProps<{
    newestEntry: PMSEntry | null,
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

const pm25Class = computed(() => {
    if (!props.newestEntry) return 'pms__value--good';

    if (props.newestEntry.pm25 < 25) {
        return 'pms__value--good';
    } else if (props.newestEntry.pm25 < 50) {
        return 'pms__value--medium';
    } else if (props.newestEntry.pm25 < 100) {
        return 'pms__value--bad';
    } else {
        return 'pms__value--very-bad';
    }
})

const pm10Class = computed(() => {
    if (!props.newestEntry) return 'pms__value--good';

    if (props.newestEntry.pm10 < 50) {
        return 'pms__value--good';
    } else if (props.newestEntry.pm10 < 100) {
        return 'pms__value--medium';
    } else if (props.newestEntry.pm10 < 200) {
        return 'pms__value--bad';
    } else {
        return 'pms__value--very-bad';
    }
})

const pm1Class = computed(() => {
    if (!props.newestEntry) return 'pms__value--good';

    if (props.newestEntry.pm1 < 10) {
        return 'pms__value--good';
    } else if (props.newestEntry.pm1 < 20) {
        return 'pms__value--medium';
    } else if (props.newestEntry.pm1 < 50) {
        return 'pms__value--bad';
    } else {
        return 'pms__value--very-bad';
    }
})
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