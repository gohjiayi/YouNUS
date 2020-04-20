<template>
  <div class="home-container">
    <div class="row p-3">
      <Module v-for="module in modules" :module="module" />
    </div>
  </div>
</template>

<script>
import Module from "./Module.vue"
export default {
  components:{
    Module
  },
  data: function() {
    return {
      modules: ["BT3103","BT3102","GEH1019","IS3103"]
    }
  }
}
</script>

<style>

</style>
