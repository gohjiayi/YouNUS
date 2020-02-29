<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <side-bar>
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/overview">
        <md-icon>info</md-icon>
        <p>Overview</p>
      </sidebar-link>
      <sidebar-link to="/projects">
        <md-icon>assignment</md-icon>
        <p>Projects</p>
      </sidebar-link>
      <sidebar-link to="/resources">
        <md-icon>folder_shared</md-icon>
        <p>Resources</p>
      </sidebar-link>
      <sidebar-link to="/ganttchart">
        <md-icon>low_priority</md-icon>
        <p>Gantt Chart</p>
      </sidebar-link>
      <sidebar-link to="/meeting">
        <md-icon>meeting_room</md-icon>
        <p>Meeting</p>
      </sidebar-link>
      <sidebar-link to="/tasks">
        <md-icon>check_box</md-icon>
        <p>Tasks</p>
      </sidebar-link>
      <sidebar-link to="/teammates">
        <md-icon>supervisor_account</md-icon>
        <p>Teammates</p>
      </sidebar-link>
      <sidebar-link to="/notifications">
        <md-icon>notifications</md-icon>
        <p>Notifications</p>
      </sidebar-link>
    </side-bar>

    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content> </dashboard-content>

      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>

<style lang="scss"></style>

<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "@/pages/Layout/MobileMenu.vue";

export default {
  components: {
    TopNavbar,
    DashboardContent,
    ContentFooter,
    MobileMenu
  }
};
</script>
