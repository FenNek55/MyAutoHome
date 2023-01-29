<template>
    <div class="card">
        <slot/>
    </div>
</template>

<style scoped>
    .card {
        position: relative;
        overflow: hidden;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
        padding: 30px;
    }
</style>