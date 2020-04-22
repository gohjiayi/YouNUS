<template>
    <div>
        <ul>
            You have <b>{{tasksList.length}}</b> active tasks
        </ul>
    </div>
</template>

<script>
    const firebase = require('../../firebase/firebaseConfig.js');
    export default {
        data(){ 
            return {
                tasksList: [],
                // counter:0
            };
        }, 
        mounted() {
            var date = new Date().toJSON().slice(0,10)
            firebase.db.collection('tasks').where("date", ">=", date).get().then((querySnapShot)=>{
                let tasks={} 
                querySnapShot.forEach(doc=>{
                    tasks=doc.data();
                    this.tasksList.push({tasks});
                });


                
            });

             
        },
    };
</script>


