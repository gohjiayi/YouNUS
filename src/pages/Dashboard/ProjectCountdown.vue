<template>
    <div>
        <div>
            <table style="width:100%">
                <tr name="header">
                    <th>Module </th>
                    <th>Project Name</th>
                    <th>Due In</th>
                    <th>Due Date</th>
                </tr>
                <tr name="content" v-for="project in projectsList">
                    <td>{{project.item.module}}</td>
                    <td>{{project.item.projectName}}</td>
                    <td>{{project.item.countdown}}</td>
                    <td>{{project.item.dueDate}}</td>
                </tr>
            </table>
        </div>

    </div>
</template>

<script>
    const firebase = require('../../firebase/firebaseConfig.js');
    export default {
        props: {

        },
        data() {
            return {
                projectsList: [],
            };
        },
        mounted() {
            // current date => to get upcoming projects
            var time = new Date().toJSON().slice(0, 10)
            firebase.db.collection('projects').orderBy("dueDate").where("dueDate", ">=", time).get().then((querySnapShot) => {
                let item = {}
                querySnapShot.forEach(doc => {
                    item = doc.data();
                    const diffTime = Math.abs(Date.parse(item.dueDate) - new Date());
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24) - 1);
                    if (diffDays == 0) {
                        item.countdown = "less than a day";
                    } else if(diffDays == 1) {
                        item.countdown = diffDays + " day";
                    } else {
                        item.countdown = diffDays + " days";
                    }


                    this.projectsList.push({ item });
                });
            });
        },
    };
</script>

<style scoped>
td, th { 
    color: #232d9d;
    border: 0.5px solid #ddd;
    padding: 8px; 
}
   
td {
    text-align: center;
    vertical-align: middle;
    font-size:14px;
}
   
th { 
    background-color: #3e4a74;
    font-weight: 500;
    font-size:14px;
    color:white;
}


tr:nth-child(even) { background: white}
tr:nth-child(even):hover { background: #f1f1f1}
tr:nth-child(odd) { background: #f8f9ff }
tr:nth-child(odd):hover { background: #d9dfef}


</style>
