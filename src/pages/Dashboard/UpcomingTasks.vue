<template>
    <div>
        <ul>
            <li v-for="task in tasksList" v-bind:key="task.id">
                <ptitle> 
                <b> Task: </b> {{ task.item.title }}
                </ptitle>
                <br />
                Due Date: {{ task.item.date}} || Status: {{ task.item.status.name}}
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
            firebase.db.collection('tasks').where("date", ">=", time).orderBy("date").limit(7).get().then((querySnapShot)=>{
                let item={}
                querySnapShot.forEach(doc=>{
                    item=doc.data();
                    console.log(item.status.name)
                    if ((item.status.name == "In Progress") || (item.status.name == "To Do") || (item.status.name == "To Review)")) {
                        this.tasksList.push({item});
                        let projectID={}
                        projectID= item.projectId
                        // console.log(projectID)
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
