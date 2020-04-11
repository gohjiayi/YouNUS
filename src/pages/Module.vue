<template>
    <div class="col-md-3 col-12 col-sm-6">
        <div class="card">
            <div class="card-body module d-flex flex-column justify-content-center text-center title">
                Module-{{module}}
            </div>
        </div>
        <projects :module="module" />
    </div>
</template>

<script>
import Projects from "@/pages/Projects.vue"
export default {
  components: {
    Projects
  },
  props: {
    module: {
      type: Number,
      default: 1
    }
  },
}
</script>

<style scoped>
    .module {
        min-height: 100px;
    }
</style>