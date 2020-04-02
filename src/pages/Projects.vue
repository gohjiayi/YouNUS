<template>
  <!-- <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-30 md-xsmall-size-50 md-size-25"
      >
        <stats-card data-background-color="green">

          <template slot="header">
          Project 1
          </template>

          <template slot="content">
            <h4 class="title">Group Project</h4>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>date_range</md-icon>
              Due 2 Mar 2020 23:59
            </div>
          </template>
        </stats-card>
      </div>
    </div>
  </div> -->
  <!-- <div class="container"> -->
    <v-app class="calendar-container" id="dayspan" v-cloak>
      <ds-calendar-app :calendar="calendar" 
        @click:event="showEvent"
        @click:more="viewDay"
        @click:date="viewDay"
        @change="updateRange">
      </ds-calendar-app>
    </v-app>
  <!-- </div> --> 
</template>

<script>
// import {
//   StatsCard
// } from "@/components";
import { Calendar } from 'dayspan';


// import * as moment from 'moment'
export default {
  components: {
    //StatsCard
  },
  name: 'app',
  data() {
    return {
      calendar: Calendar.months()
    };
  },

  methods: {
  },
  mounted() {
    let navigationDrawer = document.getElementsByClassName("v-navigation-drawer")[0];
    if (navigationDrawer) navigationDrawer.style.marginLeft = "19%";
    
    let calendarTopBar = document.getElementsByClassName("ds-app-calendar-toolbar")[0];
    if (calendarTopBar) {
      calendarTopBar.style.marginLeft = "19%";
      calendarTopBar.style.width = "81%";
    }
  }
};
</script>

<style lang="scss" scoped>
    .v-navigation-drawer-close {
      z-index: -10;
    }
</style>
