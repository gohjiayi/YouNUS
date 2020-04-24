<template>
  <div class="default">
    <app-header />
    <router-view style="padding-top:70px"></router-view>
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