<template>
  <div class="col-md-3 col-12 col-sm-6">
    <div class="card">
      <div class="card-body module d-flex flex-column justify-content-center text-center title">
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
  min-height: 100px;
}
</style>
