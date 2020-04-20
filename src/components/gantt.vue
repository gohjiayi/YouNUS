<template>
  <div ref="gantt"></div> 
</template>
 
<script>
import moment from "moment"
import { mapActions, mapGetters } from "vuex";
import {gantt} from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/ext/dhtmlxgantt_marker.js';
import "dhtmlx-gantt/codebase/dhtmlxgantt.css"
import $ from 'jquery'
import GanttMixin from "@/mixins/GanttMixin.vue"
export default {
  mixins:[GanttMixin],
  computed: {
    ...mapGetters("gantt", ["gantt"]),
    tasks() {
      let gantt = this.$store.state.gantt.gantt,
          task = {
            data: [], link: []
          };

      if (gantt.data) {
        task = {
          data: gantt && gantt.data ? gantt.data : [],
          links: gantt && gantt.links ? gantt.links : [],
        }
      }
      return task
    }
  },
 methods: {
   init(){
     this.$_initGanttEvents();
    gantt.config.xml_date = "%Y-%m-%d";
    gantt.config.autosize = "y";
    gantt.config.start_date = new Date(moment().subtract(60,"days"))
    gantt.config.show_tasks_outside_timescale = true;
    console.log("TASKS",this.tasks);
    try{
      gantt.clearAll();
    }catch(e){}
    gantt.init(this.$refs.gantt, new Date(moment().subtract(60,"days")),new Date(moment().add(60,"days")));
    gantt.parse(this.tasks);
    var dateToStr = gantt.date.date_to_str(gantt.config.task_date);
    gantt.addMarker({
      start_date: new Date(), //a Date object that sets the marker's date
      css: "today", //a CSS class applied to the marker
      text: "Today", //the marker title
      title: dateToStr( new Date()) // the marker's tooltip
    });
    this.$_initDataProcessor();
    this.$forceUpdate()
    gantt.refreshData();
   },
    $_initGanttEvents: function() {
      let _this = this
      if (!gantt.$_eventsInitialized) {
        gantt.attachEvent('onTaskSelected', (id) => {
          let task = gantt.getTask(id);
          this.$emit('taskSelected', task);
        });
        gantt.attachEvent('onTaskIdChange', (id, new_id) => {
          if (gantt.getSelectedId() == new_id) {
            let task = gantt.getTask(new_id);
            this.$emit('taskSelected', task);
          }
        });
        gantt.attachEvent("onTaskDblClick", function(id, e) {
          let task = gantt.getTask(id);
            setTimeout(() => {
              _this.createOwnerElement();
            },10)
            setTimeout(()=>{
              _this.setOwner(task);
            },100)
          _this.$emit('taskSelected', task);
          gantt.showLightbox(id);
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
      // var el = $('[task_id="k7iXeGO3hHJ6aZ5d73X2"]');
      console.log("hello");
    },
    setOwner(task) {
      console.log("OWNER",task);
      if (task && task.owner) {
        let selectEl = document.getElementById('selectElementId');
        console.log("SELE",selectEl);
        if (selectEl) selectEl.value = task.owner;
      }
    }
  },
  watch: {
    tasks: function(newValue) {
      this.init()
      if (newValue) {
        gantt.parse(this.tasks);

        newValue.data.forEach(e => {
          if (e.type === "urgent") {
            let el = $(`[task_id=${e.id}]`)[2];
           
           if (el) el.classList.add("gantt_task_line_urgent");
          }
        });
      }
    }
  },
  mounted: function () { 
    this.init()
  }
}
</script>
 
<style>
@import "~dhtmlx-gantt/codebase/dhtmlxgantt.css";

.gantt_task_line_urgent {
  background: red;
}
</style>