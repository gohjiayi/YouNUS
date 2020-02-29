<template>
  
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50"
      >
        <nav-tabs-card>
          <template slot="content">
            <span class="md-nav-tabs-title">Tasks:</span>
            <md-tabs class="md-success" md-alignment="left">
              <md-tab id="tab-home" md-label="Bugs" md-icon="bug_report">
                <nav-tabs-table></nav-tabs-table>
              </md-tab>

              <md-tab id="tab-pages" md-label="Website" md-icon="code">
                <nav-tabs-table></nav-tabs-table>
              </md-tab>

              <md-tab id="tab-posts" md-label="server" md-icon="cloud">
                <nav-tabs-table></nav-tabs-table>
              </md-tab>
            </md-tabs>
          </template>
        </nav-tabs-card>
      </div>
    </div>
  </div>  
</template>

<script>
import sweetalert from 'sweetalert';
import {
  NavTabsCard,
  NavTabsTable,
} from "@/components";

export default {
  components: {
    NavTabsCard,
    NavTabsTable
  },
  data() {
    return {
      todos: [{
        title: 'Prototype - Part 1',
        project: 'Working on Module Page Development',
        done: false,
      }, {
        title: 'Prototype - Part 2',
        project: 'Working on Sidebar',
        done: true,
      }, {
        title: 'Actual Application',
        project: 'Refining of Web Page',
        done: false,
      }, {
        title: 'Actual Application',
        project: '',
        done: false,
      }],
    };
  },
  methods: {
    createTodo(newTodo) {
      this.todos.push(newTodo);
      sweetalert('Success!', 'To-Do created!', 'success');
    },
  },
};
</script>
