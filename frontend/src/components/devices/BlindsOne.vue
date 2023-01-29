<template>
    <Card>
        <LoaderOverlay :class="{
            'loader--hidden': !areBlindsChangingPosition
        }"/>
        <h2>Żaluzje 1</h2>
        <div class="buttons-flex">
            <button @click="openBlinds">Otwórz</button>
            <button @click="closeBlinds">Zamknij</button>
        </div>
    </Card>
</template>

<script lang="ts" setup>
import Card from '../Card.vue'
import LoaderOverlay from '../LoaderOverlay.vue';
import {ref} from 'vue'
import axios from 'axios'

const areBlindsChangingPosition = ref(false)

const openBlinds = () => {
    areBlindsChangingPosition.value = true
    
    axios.get('http://192.168.0.136/open')
        .then(() => {
            areBlindsChangingPosition.value = false
        }).catch(() => {
            areBlindsChangingPosition.value = false
        })
}

const closeBlinds = () => {
    areBlindsChangingPosition.value = true
    
    axios.get('http://192.168.0.136/close')
        .then(() => {
            areBlindsChangingPosition.value = false
        }).catch(() => {
            areBlindsChangingPosition.value = false
        })
}
</script>

<style scoped>
h2 {
    margin-bottom: 24px;
}
.buttons-flex {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
}

.loader--hidden {
    display: none;
}
</style>