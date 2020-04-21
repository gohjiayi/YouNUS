<template>
    
  <div class="home-container">
    <div class="row p-3">
      <Module v-for="module in moduleCodes" :module="module" />
    </div>
  </div>
</template>

<script>
import Module from "./Module.vue"
import { mapGetters } from "vuex";

export default {
  components:{
    Module
  },
  data: function() {
    return {
      moduleCodes: ["BT3103","BT3102","GEH1019","IS3103"],
      moduleNames: ["Application Systems Development for Business Analytics", 
                    "Computational Methods for Business Analytics",
                    "Food & Health",
                    "Information Systems Leadership and Communication"]
    }
  },
  computed: {
    //map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user"
    })
  }
}
</script>

<style>
body {
    background-color: #EEEEEE;
}


</style>
