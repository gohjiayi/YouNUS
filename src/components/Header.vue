
<template>
    <nav class="navbar navbar-dark bg-dark">
        <router-link to="/" class="mr-5">Main</router-link>
        <router-link to="/dashboard">Dashboard</router-link>
    </nav>
</template>

<script>
    export default {
    }
</script>

<style scoped>
    .navbar{
        display: block;
        border-radius: 0 !important;
    }
    nav a{
        color: white !important;
    }
</style>
