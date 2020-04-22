<template>
    <div>
        <ul>
            <li v-for="task in tasksList" v-bind:key="task.id">
                {{ task.item.title }} || <b> Due Date: </b> {{ task.item.date }} || <b> Status: </b> {{ task.item.status.name }}
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
            };
        }, 
        mounted() {
            // current date => to get upcoming tasks 
            var time= new Date().toJSON().slice(0,10)
            var projectID=0
            // console.log(time)
            firebase.db.collection('tasks').orderBy("date").limit(5).where("date", ">=", time).get().then((querySnapShot)=>{
                let item={} 
                querySnapShot.forEach(doc=>{
                    item=doc.data();
                    // console.log(item);
                    if ((item.status.name == "In Progress") || (item.status.name == "To Do") || (item.status.name == "To Review)")) {
                        this.tasksList.push({item});
                    }
                });
            });

            // for (task in this.tasksList) {
                // var projectID= task.item.projectId
                // console.log(projectID);
                // let project={}
                // var docRef = firebase.db.collection("projects").doc(projectID);
                // docRef.get().then(function(doc) {
                    // if (doc.exists) {
                        // console.log("Document data", doc.data());
                        // project=doc.data().module
                        // console.log("Document data", project);
                        // this.tasksList[i] = ({project: this.tasksList[i]})
                    // } else {
                        // console.log("No such document!")
                    // }
                // })
                
            // }
             
        },
    };
</script>


