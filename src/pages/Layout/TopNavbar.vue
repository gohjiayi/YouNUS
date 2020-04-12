<template>
    <md-toolbar md-elevation="0" class="md-transparent">
        <div class="md-toolbar-row">
            <div class="md-toolbar-section-start">
                <h3 class="md-title">{{ $route.name }}</h3>
            </div>
            <div class="md-toolbar-section-end">
                <md-button class="md-just-icon md-simple md-toolbar-toggle"
                           :class="{ toggled: $sidebar.showSidebar }"
                           @click="toggleSidebar">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </md-button>

                <div class="md-collapse">
                    <div class="md-autocomplete">
                        <md-autocomplete class="search"
                                         v-model="selectedEmployee"
                                         :md-options="employees">
                            <label>Search...</label>
                        </md-autocomplete>
                    </div>
                    <md-list>
                        <md-list-item href="#/">
                            <i class="material-icons">assignment</i>
                            <p class="hidden-lg hidden-md">Projects</p>
                        </md-list-item>

                        <li class="md-list-item">
                            <a href="#/notifications"
                               class="md-list-item-router md-list-item-container md-button-clean dropdown">
                                <div class="md-list-item-content">
                                    <drop-down>
                                        <md-button slot="title"
                                                   class="md-button md-just-icon md-simple"
                                                   data-toggle="dropdown">
                                            <md-icon>notifications</md-icon>
                                            <span class="notification">5</span>
                                            <p class="hidden-lg hidden-md">Notifications</p>
                                        </md-button>
                                        <ul class="dropdown-menu dropdown-menu-right">
                                            <li><a href="#">Mike John responded to your email</a></li>
                                            <li><a href="#">You have 5 new tasks</a></li>
                                            <li><a href="#">You're now friend with Andrew</a></li>
                                            <li><a href="#">Another Notification</a></li>
                                            <li><a href="#">Another One</a></li>
                                        </ul>
                                    </drop-down>
                                </div>
                            </a>
                        </li>

                        <md-list-item href="#/user">
                            <template v-if="user.loggedIn">
                                <div class="nav-item">{{user.data.displayName}}</div>
                                <li class="nav-item">
                                    <a class="nav-link" @click.prevent="signOut">Sign out</a>
                                </li>
                            </template>

                            <template v-else>
                                <li class="nav-item">
                                    <router-link to="login" class="nav-link">Login</router-link>
                                </li>

                                <li class="nav-item">
                                    <router-link to="register" class="nav-link">Register</router-link>
                                </li>
                            </template>
                        </md-list-item>

                    </md-list>
                </div>
            </div>
        </div>
    </md-toolbar>
</template>

<script>
import { mapGetters } from "vuex";
import firebase from "firebase";

export default {
  data() {
    return {
      selectedEmployee: null,
      employees: [
        "Jim Halpert",
        "Dwight Schrute",
        "Michael Scott",
        "Pam Beesly",
        "Angela Martin",
        "Kelly Kapoor",
        "Ryan Howard",
        "Kevin Malone"
      ]
    };
  },
  methods: {
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({
            name: "home"
          });
        });
    }
  },
  computed: {
    ...mapGetters({
    // map `this.user` to `this.$store.getters.user`
      user: "user"
    })
  },
};
</script>

<style lang="css"></style>
