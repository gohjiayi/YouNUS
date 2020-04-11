<template>
<<<<<<< HEAD
  <div>
    <button type="button" class="btn btn-primary ml-4" @click="openTaskModal()">Create New Task</button>
    <div class="container gantt-containet">
      <ganttComponent ref="ganttComponent" id="js-gantt-container" class="left-container" :tasks="tasks.data && tasks.data.length ? tasks : ganttData"
        @task-updated="logTaskUpdate" @link-updated="logLinkUpdate" 
        @taskSelected="selectTask()">
      </ganttComponent>
=======
  <div class="container gantt-containet">
    <ganttComponent id="js-gantt-container" class="left-container" :tasks="tasks.data && tasks.data.length ? tasks : ganttData"
      @task-updated="logTaskUpdate" @link-updated="logLinkUpdate"
      @taskSelected="selectTask()">
    </ganttComponent>
>>>>>>> bb07246f75f6b70a75eaeb71f256095cf3a685ac

      <!-- <div class="download-containet">
        <button type="button" class="btn btn-danger download" @click="downloadProcess">Download</button>
      </div> -->
    </div>
  </div>
</template>
<<<<<<< HEAD
=======

>>>>>>> bb07246f75f6b70a75eaeb71f256095cf3a685ac
<script>

import ganttComponent from "@/components/gantt";
import { mapActions, mapGetters } from "vuex";
// eslint-disable-next-line no-unused-vars
import jsPDF from 'jspdf';
// eslint-disable-next-line no-unused-vars
import html2canvas from 'html2canvas';
import GanttMixin from "@/mixins/GanttMixin.vue"

export default {
  name: 'gantt',
  components: {ganttComponent},
  data () {
    return {
      messages: [],
      ganttData: {
        data: [], links: []
      },
      projectId: "",
    }
  },
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
    ...mapActions("gantt",["FETCH_GANTTS", "ADD_TASK_GANTT", "UPDATE_TASK_GANTT", "ADD_TASK_LINK", "UPDATE_TASK_LINK"]), //, ["FETCH_EVENTS", "ADD_EVENTS", "UPDATE_EVENTS"]
    addMessage (message) {
      console.log("message", message);
    },

    async logTaskUpdate (id, mode, task) {
      if (mode === "create") {
        delete task.id
        await this.ADD_TASK_GANTT(task).then(res => {
            console.log("res", res);
            this.FETCH_GANTTS();
        })
        .catch(err => {
          console.log(
            `add : ${err}`
          );
        });

      } else if (mode === "update") {
        console.log("task", task);

        await this.UPDATE_TASK_GANTT(task).then(res => {
          console.log("res", res);
          this.FETCH_GANTTS();
        })
        .catch(err => {
          console.log(
            `update : ${err}`
          );
        });
      }
    },

    async logLinkUpdate (id, mode, link) {
      if (mode === "create") {
        delete link.id
        await this.ADD_TASK_LINK(link).then(res => {
            console.log("res", res);
            this.FETCH_GANTTS();
        })
        .catch(err => {
          console.log(
            `add : ${err}`
          );
        });
      } else if (mode === "update") {
        await this.UPDATE_TASK_LINK(link).then(res => {
          console.log("res", res);
          this.FETCH_GANTTS();
        })
        .catch(err => {
          console.log(
            `update : ${err}`
          );
        });
      }
    },

    selectTask: function(task){
      console.log("task 134", task);
    },
    createOwnerElement() {
      let newItem = document.createElement("div");
      let textnode = document.createTextNode("Water");
      newItem.appendChild(textnode);

      var list = document.getElementsByClassName("gantt_cal_larea");
      console.log("list", list);

      if (list[0]) list[0].insertBefore(newItem, list[0].childNodes[2]);
    },
  },

  created() {
    // this.FETCH_GANTTS();
  },
  async mounted() {
    this.ganttData = await this.FETCH_GANTTS();
  }
}
</script>

<style>
  .container {
    height: 100%;
    width: 100%;
  }
  .left-container {
    overflow: hidden;
    position: relative;
    height: 100%;
    width: 100%;
  }
  .right-container {
    border-right: 1px solid #cecece;
    float: right;
    height: 100%;
    width: 340px;
    box-shadow: 0 0 5px 2px #aaa;
    position: relative;
    z-index:2;
  }
  .gantt-messages {
    list-style-type: none;
    height: 50%;
    margin: 0;
    overflow-x: hidden;
    overflow-y: auto;
    padding-left: 5px;
  }
  .gantt-messages > .gantt-message {
    background-color: #f4f4f4;
    box-shadow:inset 5px 0 #d69000;
    font-family: Geneva, Arial, Helvetica, sans-serif;
    font-size: 14px;
    margin: 5px 0;
    padding: 8px 0 8px 10px;
  }

  .gantt-containet {
    position: relative;
    margin-bottom: 5rem;
  }

  .download-containet {
    position: absolute;
    bottom: -5rem;
    right: 0;
  }
<<<<<<< HEAD

  .owner-list {
    display: grid;
    padding-left: 10px;
    margin-top: 10px;
    padding-right: 10px;
  }
</style>
=======
</style>
>>>>>>> bb07246f75f6b70a75eaeb71f256095cf3a685ac
