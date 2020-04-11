<template>
    <div class="home-container">
        <div class="row p-3">
            <Module v-for="(m,i) in 4" :key="i" :module="i+1" />
        </div>
    </div>
</template>

<script>
    import Module from "@/pages/Module.vue"
    export default {
        components:{
            Module
        },
    }
</script>

<style>
</style>
