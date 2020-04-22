

<template>
  <div>
    <button type="button" class="btn btn-primary ml-4" @click="openTaskModal()">Create New Task</button>
    <div class="container gantt-containet">
      <ganttComponent v-if="!loading" ref="ganttComponent" id="js-gantt-container" class="left-container"
                      @task-updated="logTaskUpdate" @link-updated="logLinkUpdate"
                      @taskSelected="selectTask()">
      </ganttComponent>

      <!-- <div class="download-containet">
        <button type="button" class="btn btn-danger download" @click="downloadProcess">Download</button>
      </div> -->
    </div>
  </div>
</template>
<script>

  import ganttComponent from "./gantt";
  import { mapActions, mapGetters } from "vuex";
  import jsPDF from 'jspdf';
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
        loading: true
      }
    },
    mixins:[GanttMixin],
    methods: {
      ...mapActions("gantt",["FETCH_GANTTS", "ADD_TASK_GANTT", "UPDATE_TASK_GANTT", "DELETE_TASK_GANTT", "ADD_TASK_LINK", "UPDATE_TASK_LINK", "DELETE_TASK_LINK"]),
      addMessage (message) {
        console.log("message", message);
      },

      async logTaskUpdate (id, mode, task) {
        let ele = document.getElementById("selectElementId");

        if (mode === "create") {
          delete task.id;
          task.owner = ele && ele.value ? ele.value : '';
          task.projectId = this.projectId;

          await this.ADD_TASK_GANTT(task).then(res => {
            console.log("res", res);
            this.FETCH_GANTTS({projectId: this.projectId});
          })
                  .catch(err => {
                    console.log(
                            `add : ${err}`
                    );
                  });

        } else if (mode === "update") {
          task.owner = ele && ele.value ? ele.value : '';
          task.projectId = this.projectId;

          await this.UPDATE_TASK_GANTT(task).then(res => {
            console.log("res", res);
            this.FETCH_GANTTS({projectId: this.projectId});
          })
                  .catch(err => {
                    console.log(
                            `update : ${err}`
                    );
                  });
        } else if (mode === "delete") {
          await this.DELETE_TASK_GANTT({id: task.id}).then(res => {
            console.log(res);
            this.FETCH_GANTTS({projectId: this.projectId});
          })
        }
      },

      async logLinkUpdate (id, mode, link) {
        if (mode === "create") {
          delete link.id;
          link.projectId = this.projectId;
          await this.ADD_TASK_LINK(link).then(res => {
            console.log("res", res);
            this.FETCH_GANTTS({projectId: this.projectId});
          })
                  .catch(err => {
                    console.log(
                            `add : ${err}`
                    );
                  });
        } else if (mode === "update") {
          link.projectId = this.projectId;
          await this.UPDATE_TASK_LINK(link).then(res => {
            console.log("res", res);
            this.FETCH_GANTTS({projectId: this.projectId});
          })
                  .catch(err => {
                    console.log(
                            `update : ${err}`
                    );
                  });
        } else if (mode === "delete") {
          await this.DELETE_TASK_LINK({id: link.id}).then(res => {
            console.log(res);
            this.FETCH_GANTTS({projectId: this.projectId});
          })
        }
      },

      selectTask: function(task){
        console.log("task 134", task);
      },
      downloadProcess() {
        setTimeout(function () {
          html2canvas(document.querySelector("#js-gantt-container")).then(canvas => {
            //$("#previewBeforeDownload").html(canvas);
            var imgData = canvas.toDataURL("image/jpeg",1);
            var pdf = new jsPDF("p", "mm", "a3");
            var pageWidth = pdf.internal.pageSize.getWidth();
            var pageHeight = pdf.internal.pageSize.getHeight();
            var imageWidth = canvas.width;
            var imageHeight = canvas.height;

            var ratio = imageWidth/imageHeight >= pageWidth/pageHeight ? pageWidth/imageWidth : pageHeight/imageHeight;
            //pdf = new jsPDF(this.state.orientation, undefined, format);
            pdf.addImage(imgData, 'JPEG', 0, 0, imageWidth * ratio, imageHeight * ratio);
            pdf.save("gantt-chart.pdf");
          });
        },500);
      },
      openTaskModal() {
        let _this = this
        let element = document.getElementsByClassName("gantt_grid_head_add")[0];
        if (element){
          element.click();
          setTimeout(() => {
            _this.createOwnerElement();
          },10)
        }
      }
    },

    async created() {
      let obj = JSON.parse(localStorage.getItem('vuex'));
      this.projectId = obj && obj.project && obj.project.selectedProject && obj.project.selectedProject.id ? obj.project.selectedProject.id : "";
      await this.FETCH_GANTTS({projectId: this.projectId}).then(res=>{
        this.ganttData = res
        this.loading = false
      })
      console.log("GANT_DATA",this.ganttData);
      if (!this.projectId) this.$router.replace(`/home`);
      // this.FETCH_GANTTS();
    },
    async mounted() {

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

  .owner-list {
    display: grid;
    padding-left: 10px;
    margin-top: 10px;
    padding-right: 10px;
  }
</style>
