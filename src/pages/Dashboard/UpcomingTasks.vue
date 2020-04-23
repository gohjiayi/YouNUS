<template>
    <div>
        <ul>
            <li v-for="task in tasksList" v-bind:key="task.id">
                <ptitle> 
                <b> Module and Task: </b> ({{ task.Module.module }}) {{ task.Details.title}}
                </ptitle>
                <br />
                Due Date: {{ task.Details.date}} || Status: {{ task.Details.status.name}}
                <br />
                <br />
            </li>
        </ul>
    </div>
</template>

<script>
    const firebase = require('../../firebase/firebaseConfig.js');
    export default {
        data(){
            return {
                tasksList: [],
                modulesList:[]
            };
        },
        mounted() {
            // current date => to get upcoming tasks
            var time= new Date().toJSON().slice(0,10)
            // console.log(time)
            firebase.db.collection('tasks').orderBy("date").limit(5).where("date", ">=", time).get().then((querySnapShot)=>{
                let item={}
                querySnapShot.forEach(doc=>{
                    item=doc.data();
                    // console.log(item)
                    if ((item.status.name == "In Progress") || (item.status.name == "To Do") || (item.status.name == "To Review)")) {
                        // this.tasksList.push({item});
                        let projectID={}
                        projectID= item.projectId
                        // console.log(projectID)
                        let project={}
                        firebase.db.collection('projects').doc(projectID).get().then((docRef) => { 
                            project=docRef.data()
                            if (typeof project !== 'undefined') {
                                console.log(project)
                                console.log(project.module)
                                this.tasksList.push({['Module']: project, ['Details']: item})
                            } else {
                                // console.log("no such document")
                                this.tasksList.push({['Module']: { ['module']: 'Unknown module'}, ['Details']: item})
                            }
                            })
                        };
                    })
                });

        },
    };
</script>

<style scoped>
    ptitle {
        font-size: 18px
    }

    p pdetails {
        padding-bottom: 100px;
    }

    li {
    font-size: 14px;
    margin-left: 10px;
    list-style-type: circle;
    }
</style>

