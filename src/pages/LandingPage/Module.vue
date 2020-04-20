<template>
  <div class="col-md-3 col-12 col-sm-6">
    <div class="card">
      <div class="card-body module d-flex flex-column justify-content-center text-center">
        {{module}}
      </div>
    </div>
    <projects :module="module" />
  </div>
</template>

<script>
import Projects from "./Projects.vue"
export default {
  components: {
    Projects
  },
  props:['module'],
}
</script>

<style scoped>
.module{
  min-height: 80px;
}

.card{
    font-size: 30px;
    font-weight: bolder;
    color: #0094ff;
    background-color: #EEEEEE;
    opacity: 1;
    border-width:0;
}

</style>
