<template>
  <div ref="gantt"></div>
</template>

<script>
import 'dhtmlx-gantt'
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

  methods: {
    $_initGanttEvents: function() {
      if (!this.gantt.$_eventsInitialized) {
        this.gantt.attachEvent('onTaskSelected', (id) => {
          let task = this.gantt.getTask(id);
          this.$emit('task-selected', task);
        });

        this.gantt.attachEvent('onTaskIdChange', (id, new_id) => {
          if (this.gantt.getSelectedId() == new_id) {
            let task = this.gantt.getTask(new_id);
            this.$emit('task-selected', task);
          }
        });

        this.gantt.$_eventsInitialized = true;
      }
    },

    $_initDataProcessor: function() {
      if (!this.gantt.$_dataProcessorInitialized) {
        this.gantt.createDataProcessor((entity, action, data, id) => { 
          this.$emit(`${entity}-updated`, id, action, data);
        });

        this.gantt.$_dataProcessorInitialized = true;
      }
    }
  },

  mounted: function () {
    this.$_initGanttEvents();
    this.gantt.config.xml_date = "%Y-%m-%d";

    this.gantt.init(this.$refs.gantt);
    this.gantt.parse(this.$props.tasks);

    this.$_initDataProcessor();
  }
}
</script>

<style lang="css" scoped>
    @import "~dhtmlx-gantt/codebase/dhtmlxgantt.css";
</style>