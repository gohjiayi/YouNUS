<template>
    <nav class="navbar navbar-dark">
        <a class="navbar-brand">
            <img src="/youNUS_logo2.png" width="65">
        </a>

        <template v-if="user.loggedIn">
            <ul>
                <li><router-link to="/home" class="mr-5">Main</router-link></li>
                <li><router-link to="/dashboard">Dashboard</router-link></li>
                <li style="float:right">
                    <a class="nav-link" @click.prevent="signOut">Sign out</a>
                </li>
                <li style="float:right">
                    <name>{{user.data.displayName}}</name>
                </li>
            </ul>
        </template>
        <template v-else>
            <ul>
                <li style="float:right" display:inline>
                    <router-link to="auth" class="nav-link">Login/Register</router-link>
                </li>
            </ul>
        </template>

        
    </nav>
</template>

<script>
import { mapGetters } from "vuex";
import firebase from "firebase";
export default {
  computed: {
    ...mapGetters({
// map `this.user` to `this.$store.getters.user`
      user: "user"
    })
  },
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({
            name: "auth"
          });
        });
    }
  }
};
</script>

<style scoped>
.navbar{
  display: block;
  border-radius: 0 !important;
  z-index: 10;
  position: fixed;
  width: 100%;
  background-color: #060a38
}
nav a{
  color: white !important;
}

li {
  float: left;
  display: inline;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 10px;
  text-decoration: none;
  cursor: pointer;
}

li a:hover {
  background-color: #1057c7;
  font-style:italic
}
.active {
  background-color: #87aceb;
}

li name{
  display: block;
  color: #ef9349;
  text-align: center;
  font-weight:bold;
  padding: 10px;
  text-decoration: none;
}
</style>
