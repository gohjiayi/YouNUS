<template>
  <nav class="navbar navbar-dark bg-dark">
  
      <a class="navbar-brand disabled">
          <img src="/youNUS_logo2.png" width="65" height="75" class="d-inline-block align-top" alt="">
      </a>

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
  z-index: 10;
  position: fixed;
  width: 100%;
}
nav a{
  color: white !important;
}
</style>
