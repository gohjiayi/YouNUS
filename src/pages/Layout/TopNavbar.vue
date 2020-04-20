<template>
  <md-toolbar md-elevation="0" class="md-transparent">
    <div class="md-toolbar-row">
      <div class="md-toolbar-section-start">
        <span class="mr-5" @click="changeCalendarType" style="cursor:pointer" v-if="showCalendarBackButton">
          <i class="fa fa-arrow-left"></i>
        </span>
        <h3 class="md-title">{{ $route.name }}</h3>
      </div>

      <div class="md-toolbar-section-end">
        <md-button
          class="md-just-icon md-simple md-toolbar-toggle"
          :class="{ toggled: $sidebar.showSidebar }"
          @click="toggleSidebar"
        >
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </md-button>
      </div>

    </div>
  </md-toolbar>
</template>

<script>
import {mapGetters,mapMutations} from "vuex"
export default {
  methods: {
    ...mapMutations("events", ["SET_CALENDAR_TYPE"]),
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    changeCalendarType(){
      this.SET_CALENDAR_TYPE(2)
    }
  },
  computed:{
    ...mapGetters("events",["calendarType"]),
    showCalendarBackButton(){
      return this.calendarType != 2
    },
  }
};
</script>

<style lang="css"></style>
