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
    createOwnerElement() {
      let gantt_cal_light = document.getElementsByClassName("gantt_cal_light")[0];
      if (gantt_cal_light) gantt_cal_light.style.height = "auto";
      
      let gantt_cal_larea = document.getElementsByClassName("gantt_cal_larea")[0];
      if (gantt_cal_larea) gantt_cal_larea.style.height = "auto";

      let newItem = document.createElement("div");
      newItem.className = "owner-list";
      let textnode = document.createTextNode("Owner");
      newItem.appendChild(textnode);

      let select = document.createElement("SELECT");
      select.id = "selectElementId";
      newItem.appendChild(select);

      var list = document.getElementsByClassName("gantt_cal_larea");

      if (list[0]) list[0].insertBefore(newItem, list[0].childNodes[2]);

      for (var i = 0; i< user.length; i++) {
          var opt = document.createElement('option');
          opt.value = user[i];
          opt.innerHTML = user[i];
          if (selectEl) selectEl.appendChild(opt);
      }
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