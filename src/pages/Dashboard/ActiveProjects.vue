<template>
    <div>
        <ul>
            <!-- <li v-for="project in projectsList" v-bind:key="project.id">
             {{ project.projects.projectName}} From Module: {{project.projects.module}}
            </li> -->
            You have <b>{{projectsList.length}}</b> active projects
        </ul>
    </div>
</template>

<script>
    const firebase = require('../../firebase/firebaseConfig.js');
    export default {
        data(){ 
            return {
                projectsList: [],
                // counter:0
            };
        }, 
        mounted() {
            var date = new Date().toJSON().slice(0,10)
            firebase.db.collection('projects').where("dueDate", ">=", date).get().then((querySnapShot)=>{
                let projects={} 
                querySnapShot.forEach(doc=>{
                    projects=doc.data();
                    this.projectsList.push({projects});
                });
                // this.counter = projects.length

                
            });

             
        },
    };
</script>


