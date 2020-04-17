<template>
  <div class="default">
    <app-header />
    <router-view></router-view>
  </div>
</template>

<script>
import AppHeader from "@/components/Header"
export default {
  components:{
    AppHeader
  }
}
</script>

<style>

</style>