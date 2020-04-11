<template>
    <nav class="navbar navbar-dark bg-dark">
        

        <div class="container">
            <router-link to="/home" class="mr-5">Modules</router-link>
            <router-link to="/dashboard">Dashboard</router-link>

          
            <li class="md-list-item">
                <a href="#/"
                   class="md-list-item-router md-list-item-container md-button-clean dropdown">
                    <div class="md-list-item-content">
                        <drop-down>
                            <md-button slot="title"
                                       class="md-button md-just-icon md-simple"
                                       data-toggle="dropdown">
                                <md-icon>notifications</md-icon>
                            </md-button>
                            <ul class="dropdown-menu dropdown-menu-right">
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
                            </ul>
                        </drop-down>
                    </div>
                </a>
            </li>


            
        </div>


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
                            name: "home"
                        });
                    });
            }
        }
    };
</script>

<style scoped>
    .navbar {
        display: block;
        border-radius: 0 !important;
    }

    nav a {
        color: white !important;
    }
</style>