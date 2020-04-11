<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <side-bar>
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/tasks">
        <md-icon>check_box</md-icon>
        <p>Tasks</p>
      </sidebar-link>
      <sidebar-link to="/ganttchart">
          <md-icon>low_priority</md-icon>
          <p>Gantt Chart</p>
      </sidebar-link>
      <sidebar-link to="/calendar">
          <md-icon>calendar_today</md-icon>
          <p>Calendar</p>
      </sidebar-link>
      <sidebar-link to="/resources">
        <md-icon>folder_shared</md-icon>
        <p>Resources</p>
      </sidebar-link>
      <sidebar-link to="/teammates">
        <md-icon>supervisor_account</md-icon>
        <p>Teammates</p>
      </sidebar-link>
    </side-bar>

    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content> </dashboard-content>

    </div>
  </div>
</template>

<style lang="scss"></style>

<script>
import TopNavbar from "./TopNavbar.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "@/pages/Layout/MobileMenu.vue";

export default {
  components: {
    TopNavbar,
    DashboardContent,
    MobileMenu
  }
};
</script>
