<template>
    <div class="projects-container">

        <div class="card project my-2" v-for="(project,pI) in projects" :key="pI" @click="gotohome(project)" style="cursor:pointer">
            <div class="card-body">
                <p class="title">{{project.projectName}}</p>
                <p>Due Date : {{project.dueDate}}</p>
            </div>
        </div>

        <button class="btn btn-primary btn-sm my-3" @click="openModal" type="button">Create New Project</button>
        <v-dialog v-model="showProjectModal" width="500px">
            <div class="pa-3" style="background:white">
                <div @click="showProjectModal = false">
                    <i class="fa fa-times" style="float:right"></i>
                </div>
                <p class="title mb-2">New Project</p>
                <label for="" class="">Project Name</label>
                <input v-model="projectName" type="text" class="form-control">
                <label for="" class="">Due Date</label>
                <input v-model="dueDate" type="date" name="" id="" class="form-control">
                <div class="row justify-content-end">
                    <button class="btn btn-primary btn-sm mt-2 mr-3" @click="saveProject">Save</button>
                </div>
            </div>
        </v-dialog>
    </div>
</template>

<script>
    import moment from "moment"
    import { mapActions, mapGetters, mapMutations } from "vuex"
    export default {
        props: {
            module: {
                type: Number,
                default: 1
            }
        },
        data() {
            return {
                projectName: "",
                dueDate: new Date(),
                showProjectModal: false,
                projects: []
            }
        },
        async mounted() {
            await this.FETCH_PROJECTS(this.module).then(res => {
                this.projects = res
            })
        },
        methods: {
            ...mapActions("project", ["ADD_PROJECT", "FETCH_PROJECTS"]),
            ...mapMutations("project", ["UPDATE_SELECTED_PROJECT"]),
            openModal() {
                this.showProjectModal = true
            },
            async saveProject() {
                let obj = {
                    projectName: this.projectName,
                    dueDate: this.dueDate,
                    module: this.module
                }
                await this.ADD_PROJECT(obj).then(async res => {
                    await this.FETCH_PROJECTS(this.module).then(getRes => {
                        this.projects = getRes
                        this.showProjectModal = false
                        this.projectName = ""
                        this.dueDate = new Date()
                    })
                })
            },
            gotohome(project) {
                this.UPDATE_SELECTED_PROJECT(project)
                this.$router.push("/tasks")
            }
        }
    }
</script>

<style scoped>
    .project {
        border: 1px solid black;
        border-radius: 20px !important;
    }
</style>
