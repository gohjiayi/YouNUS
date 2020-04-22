<template>
  <div class="content pl-4">
    <div class="projects">
      <div class="project-top-fields">
        <button
                type="button"
                class="btn btn-primary"
                @click="showTaskModal = true"
        >
          Create Task
        </button>
        <div style="display: inline-block;">
          <select
                  class="mdb-select md-form btn btn-outline-dark ml-4"
                  v-model="filterSelectedStatus"
                  :style="{ background: filterSelectedStatus.color }"
          >
            <option value="" selected disabled>Filter</option>
            <option
                    v-for="(ste,sI) in status"
                    :key="sI"
                    :value="ste"
                    :style="{ background: ste.color }"
            >{{ ste.name }}</option
            >
          </select>
        </div>
        <span class="ml-5" v-if="showBackIcon" @click="resetFilterSelectedStatus" style="cursor:pointer">
          <i class="fa fa-arrow-left"></i>
        </span>
      </div>

      <div class="task-list mt-5 pl-3 row">
        <template v-for="task in tasks">
          <div class="col-3 mb-3" v-if="isShowTask(task)" :key="task.id">
            <div
                    class="card cursor-pointer"
                    style="width: 18rem; cursor: pointer;"
                    @click="updateTask(task)"
            >
              <div class="card-body ">
                <div class="card-title flex-container">
                  <div class="text-truncate">
                    <div
                            class="status-color"
                            :style="{
                        borderColor:
                          task.status && task.status.color
                            ? task.status.color
                            : ''
                      }"
                    ></div>
                    Due on
                    <h5>{{ getDate(task.date) }}</h5>
                  </div>
                  <img
                          src="https://i2.cdn.turner.com/cnnnext/dam/assets/140926165711-john-sutter-profile-image-large-169.jpg"
                          alt=""
                          class="image--cover"
                  />
                  <div class="remove-task" @click="removeTask(task.id)">
                    <span>X</span>
                  </div>
                </div>
                <h4 class="card-text mt-4">{{ task.title }}</h4>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
    <v-dialog v-model="showTaskModal" width="900px">
      <div class="create-task pa-2" style="background:white">
        <div @click="showTaskModal = false" style="cursor:pointer">
          <i class="fa fa-times" style="float:right"></i>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="form-group text-center">
              <label for="title"
              >Title <span class="text-required">(Required)</span></label
              >
              <input
                      type="text"
                      class="form-control text-center task-title form-input-field"
                      v-model="title"
                      placeholder="Title of your task"
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-3">
            <div class="form-group">
              <label for="exampleFormControlSelect1">Assignee</label>
              <select
                      class="form-control form-input-field"
                      v-model="selectedAssignee"
              >
                <option
                        v-for="user in users"
                        :key="user.id"
                        :value="{ id: user.id, username: user.username }"
                >
                  {{ user.username }}
                </option>
              </select>
            </div>
          </div>

          <div class="col-3">
            <div class="date-picker">
              <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                          v-model="dateFormatted"
                          label="Due Date"
                          persistent-hint
                          prepend-icon="event"
                          @blur="date = parseDate(dateFormatted)"
                          v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                        v-model="date"
                        no-title
                        @input="menu = false"
                ></v-date-picker>
              </v-menu>
            </div>
          </div>

          <div class="col-3">
            <div class="form-group">
              <label for="exampleFormControlSelect1">Status</label>
              <select
                      class="form-control form-input-field"
                      v-model="selectedStatus"
                      :style="{ background: selectedStatus.color }"
              >
                <option
                        v-for="ste in status"
                        :key="ste.id"
                        :value="ste"
                        :style="{ background: ste.color }"
                >{{ ste.name }}</option
                >
              </select>
            </div>
          </div>

          <div class="col-3">
            <div class="form-group">
              <label for="exampleFormControlSelect1">Related To</label>
              <select
                      class="form-control form-input-field"
                      v-model="selectedRelared"
              >
                <option
                        v-for="related in relatedTo"
                        :key="related.id"
                        :value="related"
                >{{ related.title }}</option
                >
              </select>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="form-group">
              <label for="comment">Description</label>
              <textarea
                      class="form-control form-input-field"
                      rows="5"
                      v-model="description"
                      placeholder="description"
              ></textarea>
            </div>
          </div>
        </div>



        <div class="text-right">
          <button
                  type="button"
                  class="btn btn-outline-dark"
                  @click="showTaskModal = false"
          >
            Cancel
          </button>
          <button
                  type="button"
                  v-if="taskId"
                  class="btn btn-primary ml-4"
                  @click="UpdateSelectedTask"
          >
            Update
          </button>
          <button
                  type="button"
                  v-else
                  class="btn btn-primary ml-4"
                  @click="createTask"
          >
            Create
          </button>
        </div>
      </div>
    </v-dialog>
  </div>
</template>

<script>
  // import {
  //   StatsCard
  // } from "@/components";
  import { mapActions, mapGetters } from "vuex";
  import moment from "moment";
  import VueTagsInput from "@johmun/vue-tags-input";
  import GLOBAL from "@/mixins/GLOBAL.vue"

  export default {
    components: {
      // StatsCard
      VueTagsInput
    },
    mixins:[GLOBAL],
    data() {
      return {
        showTaskModal: false,
        title: "",
        description: "",
        value: "",
        date: new Date().toISOString().substr(0, 10),
        dateFormatted: "",
        menu: false,
        selectedAssignee: "",
        selectedStatus: "",
        status: [
          // { id: 0, name: "All", color: "lightgrey" },
          { id: 1, name: "To Do", color: "#9EC1CF" },
          { id: 2, name: "In Progress", color: "#CC99C9" },
          { id: 3, name: "In Review", color: "#FFE662" },
          { id: 4, name: "Completed", color: "#9EE09E" },
          { id: 5, name: "Canceled", color: "#FF6663" }
        ],
        selectedRelared: "",
        relatedTo: [
          { id: 1, title: "Frontend" },
          { id: 2, title: "Backend" },
          { id: 3, title: "Report" },
          { id: 4, title: "Others" },
        ],
        getDate(date) {
          if (date) {
            return moment(date).format("DD MMM");
          }
        },
        taskId: "",
        filterSelectedStatus: "",
        showFilter: false,
        isShowTask(task) {
          if(this.filterSelectedStatus == null) return true
          if (!this.filterSelectedStatus || this.filterSelectedStatus.id==0) return true;
          else {
            if (
                    task.status &&
                    task.status.id &&
                    this.filterSelectedStatus &&
                    this.filterSelectedStatus.id === task.status.id
            )
              return true;
            else return false;
          }
        },
        // tags: [],
        // tagName: "",
        tag: "",
        tags: [],
        autocompleteItems: [
          {
            text: "Spain"
          },
          {
            text: "France"
          },
          {
            text: "USA"
          },
          {
            text: "Germany"
          },
          {
            text: "China"
          }
        ],
        tab: null,
        items: ["Comments", "Progress"],
        comment: "",
        getTitalNumberOfCommit() {
          let a = this.comments.map(e => {
            if (e.taskId === this.taskId) {
              return e.taskId
            }
          })

          let b = a.filter(function(el) { return el; });

          return b.length;
        },
        projectId: "",
      };
    },
    computed: {
      ...mapGetters("tasks", ["tasks"]),
      ...mapGetters("comments", ["comments"]),
      showBackIcon(){
        return this.filterSelectedStatus != "" && this.filterSelectedStatus.id != 0
      },
      computedDateFormatted() {
        return this.formatDate(this.date);
      },
      tasks() {
        return this.$store.state.tasks.tasks;
      },
      filteredItems() {
        return this.autocompleteItems.filter(i => {
          return i.text.toLowerCase().indexOf(this.tag.toLowerCase()) !== -1;
        });
      },
      comments() {
        return this.$store.state.comments.comments;
      }
    },

    watch: {
      date(val) {
        console.log(val);
        this.dateFormatted = this.formatDate(this.date);
      },
      showTaskModal(value) {
        if (!value) {
          this.taskId = "";
          (this.description = ""),
                  (this.date = ""),
                  (this.selectedAssignee = ""),
                  (this.selectedStatus = ""),
                  (this.selectedRelared = "");
          this.title = "";
          this.tags = [];
          this.tag = "";
        }
      }
    },
    methods: {
      ...mapActions("tasks", ["FETCH_TASKS", "ADD_TASKS", "UPDATE_TASK", "DELETE_TASK"]),
      ...mapActions("comments", ["FETCH_COMMENT", "ADD_COMMENT"]),
      resetFilterSelectedStatus(){
        this.filterSelectedStatus = ""
      },
      async createTask() {
        let data = {
          title: this.title,
          description: this.description,
          date: this.date,
          assignee: this.selectedAssignee,
          status: this.selectedStatus,
          relared: this.selectedRelared,
          tags: this.tags,
          projectId: this.projectId,
        };

        if (data.title) {
          await this.ADD_TASKS(data)
                  .then(res => {
                    console.log("res", res);
                    this.FETCH_TASKS({projectId: this.projectId});
                    if (this.comment) {
                      this.submitComment(res.id)
                    }
                    this.showTaskModal = false;
                  })
                  .catch(err => {
                    console.log(`add : ${err}`);
                  });
        } else {
          this.$toast.open({
            message: "Task title is required",
            type: "error",
            duration: 5000,
            dismissible: true
          });
        }
      },
      async UpdateSelectedTask() {
        if (this.taskId) {
          let obj = {
            id: this.taskId,
            title: this.title,
            description: this.description,
            date: this.date,
            assignee: this.selectedAssignee,
            status: this.selectedStatus,
            relared: this.selectedRelared,
            tags: this.tags,
            projectId: this.projectId
          };

          await this.UPDATE_TASK(obj)
                  .then(async res => {
                    console.log(res);
                    this.submitComment(this.taskId)
                    this.showTaskModal = false;
                    this.FETCH_TASKS({projectId: this.projectId});
                  })
                  .catch(err => {
                    console.log(
                            `ERROR : VIEWS : DataViewSidebar.vue : submitData -> UPDATE : ${err}`
                    );
                  });
        }
      },
      async removeTask(taskid) {
        if (taskid) {
          var isOkPress = confirm("Are you sure you want to delete this task? You will not get it back");

          if (isOkPress === true) {
            this.DELETE_TASK({id: taskid}).then(res => {
              console.log(res);
              this.showTaskModal = false;
              this.FETCH_TASKS({projectId: this.projectId});
            })
          }
        }

      },
      formatDate(date) {
        if (!date) return null;

        const [year, month, day] = date.split("-");
        return `${month}/${day}/${year}`;
      },
      parseDate(date) {
        if (!date) return null;

        const [month, day, year] = date.split("/");
        return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
      },
      updateTask(task) {
        this.showTaskModal = true;
        this.title = task.title;
        this.description = task.description;
        this.date = task.date;
        this.selectedAssignee = task.assignee;
        this.selectedStatus = task.status;
        this.selectedRelared = task.relared;
        this.taskId = task.id;
        this.tags = task.tags;
      },
      onEnterTag() {
        this.tags.push(this.tagName);
        this.tagName = "";
      },
      removeTag(tagIndex) {
        this.tags.splice(tagIndex, 1);
      },
      async submitComment(taskId) {
        let date = new Date();
        let data = {
          userName: 'Ai Fen',
          commentedOn: date.toISOString(),
          comment: this.comment,
          taskId: taskId
        };
        await this.ADD_COMMENT(data).then(res => {
          console.log(res);
          this.FETCH_COMMENT();
          this.comment = "";
        })
                .catch(err => {
                  console.log(`add : ${err}`);
                });
      }
    },
    created() {
      let obj = JSON.parse(localStorage.getItem('vuex'));
      this.projectId = obj && obj.project && obj.project.selectedProject && obj.project.selectedProject.id ? obj.project.selectedProject.id : "";

      if (!this.projectId) this.$router.replace(`/home`);
      this.FETCH_TASKS({projectId: this.projectId});
      this.FETCH_COMMENT()
    }
  };
</script>

<style lang="scss">
  .image--cover {
    margin-left: auto;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    object-position: center right;
    margin-top: 10px;
  }

  .flex-container {
    display: flex;
    position: relative;

    .remove-task {
      position: absolute;
      top: -10px;
      right: -10px;
    }
  }

  .text-required {
    color: #929292;
  }

  .status-color {
    width: 50px;
    height: 3px;
    border: 2px solid;
    margin-bottom: 5px;
  }

  .task-title {
    height: 4rem !important;
    font-size: 2rem !important;
  }

  .form-input-field {
    background-image: none !important;
    border: 1px solid #ccc !important;
  }

  .duo-date {
    .form-control {
      background-image: none !important;
      border: 1px solid #ccc !important;
    }
  }

  .v-menu {
    .theme--light {
      top: 0 !important;
      left: 0 !important;
    }
  }

  .date-picker {
    .v-text-field {
      padding-top: 0px;
      margin-top: 0px;
    }
    .v-text-field__slot {
      display: block !important;

      input {
        border: 1px solid #ccc;
      }
    }
    .v-label {
      position: relative !important;
      margin-bottom: 2px;
    }
    .v-label--active {
      max-width: 100% !important;
      transform: translateY(0px) scale(0.75) !important;
    }
    .v-input__slot {
      &:before {
        border-color: transparent !important;
      }
    }
    .v-input__prepend-outer {
      display: none;
    }
  }

  .tag-list {
    list-style: none;
    margin: 0px;
    padding: 0px;
    display: inline-block;

    li {
      display: inline-block;
      background: #555;
      color: white;
      padding: 3px 5px 3px 10px;
      border-radius: 15px;
      margin-right: 5px;
      margin-bottom: 5px;
    }

    span {
      color: white;
      cursor: pointer;
      margin-left: 5px;
      font-size: 10px;
      background: #333;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      display: inline-flex;
      text-align: center;
      align-items: center;
      justify-content: center;

      &:hover {
        color: red;
      }
    }
  }

  .tag-input-field {
    border: 0px !important;
    background: none;
    margin-bottom: 5px;
    display: inline-block !important;
    width: 200px !important;
  }

  nav .drop-down {
    list-style: none;
    overflow: hidden; /* When ul height is reduced, ensure overflowing li are not shown */
    height: 172px; /* 172px = (38 (li) + 5 (li border)) * 4 (number of li) */
    background-color: #34495e;
    font-family: Arial;
    width: 200px;
    margin: 0 auto;
    padding: 0;
    text-align: center;
    -webkit-transition: height 0.3s ease;
    transition: height 0.3s ease;
  }

  nav .drop-down.closed {
    /*  When toggled via jQuery this class will reduce the height of the ul which inconjuction
        with overflow: hidden set on the ul will hide all list items apart from the first */
    /* current li height 38px + 5px border */
    height: 43px;
  }

  nav .drop-down li {
    border-bottom: 5px solid #2c3e50;
  }

  nav .drop-down li a {
    display: block;
    color: #ecf0f1;
    text-decoration: none;
    padding: 10px; /* Larger touch target area */
  }

  nav .drop-down li:first-child a:after {
    content: "\25BC";
    float: right;
    margin-left: -30px; /* Excessive -margin to bring link text back to center */
    margin-right: 5px;
  }

  .comment-content {
    .comment-title {
      font-size: 20px;
      span {
        background: #667eea;
        padding: 3px 10px;
        border-radius: 50%;
        color: #fff;
      }
    }

    .comments {
      margin: 2rem;

      .comment-wrap {
        margin-bottom: 1.25rem;
        display: table;
        width: 100%;
        min-height: 3.3125rem;
        border: 1px solid #ccc;
        border-radius: 5px;

        .comment-block {
          padding: 1.4rem;
          background-color: #fff;
          display: table-cell;
          vertical-align: top;
          border-radius: 0.1875rem;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.08);
        }

        .comment-text {
          margin-bottom: 1.25rem;
        }
        .bottom-comment {
          color: #acb4c2;
          font-size: 0.875rem;
        }
        .comment-date {
          float: left;
        }
      }
      input,
      textarea {
        width: 100%;
        outline: none;
        border: none;
        display: block;
        margin: 0;
        padding: 0;
        -webkit-font-smoothing: antialiased;
        font-family: "PT Sans", "Helvetica Neue", "Helvetica", "Roboto", "Arial",
        sans-serif;
        font-size: 1rem;
        color: #555f77;
      }
    }
  }
  .date-picker .v-menu .v-menu__content.theme--light.v-menu__content--fixed.menuable__content__active{
    min-width: 290px;
    max-width: 290px;
    top: 177px !important;
    left: 507px !important;
    transform-origin: left top;
    z-index: 204;
  }
</style>
