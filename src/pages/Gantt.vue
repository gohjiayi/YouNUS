<template>
  <div ref="gantt"></div> 
</template>
 
<script>
import {gantt} from 'dhtmlx-gantt';
export default {
  name: 'gantt',
  props: {
    tasks: {
      type: Object,
      default () {
        return {data: [], links: []}
      }
    }
  },
 
  mounted: function () {
    gantt.config.xml_date = "%Y-%m-%d";
    gantt.config.autosize = "y";
    gantt.init(this.$refs.gantt);
    gantt.parse(this.$props.tasks);
  }
}
</script>
 
<style scoped>
@import "~dhtmlx-gantt/codebase/dhtmlxgantt.css";
</style>
