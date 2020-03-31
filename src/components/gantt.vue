<template>
  <div ref="gantt"></div> 
</template>
 
<script>
import {gantt} from 'dhtmlx-gantt';
import $ from 'jquery'
export default {
  props: {
    tasks: {
      type: Object,
      default () {
        return {data: [], links: []}
      }
    }
  },
 methods: {
    $_initGanttEvents: function() {
      if (!gantt.$_eventsInitialized) {
        gantt.attachEvent('onTaskSelected', (id) => {
          let task = gantt.getTask(id);
          setTimeout(() => {
            this.createOwnerElement();
          })
          
          this.$emit('taskSelected', task);
        });
        gantt.attachEvent('onTaskIdChange', (id, new_id) => {
          if (gantt.getSelectedId() == new_id) {
            let task = gantt.getTask(new_id);
            this.$emit('taskSelected', task);
          }
        });
        gantt.$_eventsInitialized = true;
      }
    },
    $_initDataProcessor: function() {
      // if (!gantt.$_dataProcessorInitialized) {
        gantt.createDataProcessor((entity, action, data, id) => {
          console.log("entity", entity);
          
          this.$emit(`${entity}-updated`, id, action, data);
        });
        gantt.$_dataProcessorInitialized = true;
      // }
    },
    changeEvents() {
    }
  },
  watch: {
    tasks: function(newValue) {
      if (newValue) {
        this.tasks.data = newValue.data,
        this.tasks.links = newValue.links;
        gantt.parse(this.$props.tasks);
      }
    }
  },
  mounted: function () { 
    this.$_initGanttEvents();
    gantt.config.xml_date = "%Y-%m-%d";
    gantt.config.autosize = "y";
    gantt.init(this.$refs.gantt);
    gantt.parse(this.$props.tasks);
    this.$_initDataProcessor();
  }
}
</script>
 
<style>
@import "~dhtmlx-gantt/codebase/dhtmlxgantt.css";
</style>