<template>
  <div class="content">
    <div class="md-layout">
      
      
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50"
      >
        <md-card>
          <md-card-header data-background-color="orange">
            <h4 class="title">Teammates for Group Project</h4>
            <p class="category">AY2019/20 Semester 2</p>
          </md-card-header>
          <md-card-content>
            <ordered-table table-header-color="orange"></ordered-table>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import {
  OrderedTable
} from "@/components";

export default {
  components: {
    OrderedTable
  },
  data() {
    return {
    };
  }
};
</script>
