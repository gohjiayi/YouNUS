<template>
    <div>
        <ul>
            <li v-for="project in projectsList" v-bind:key="project.id">
                <ptitle>{{ project.item.module }}: {{ project.item.projectName }}</ptitle>
                <p>
                    <pdetails>Due <b>in {{ project.item.countdown }}</b>, on {{ project.item.dueDate }}</pdetails>
                </p>
            </li>

        </ul>

        <div>
            <table style="width:100%">
                <tr>
                    <th>Module </th>
                    <th>Project Name</th>
                    <th>Due In</th>
                    <th>Due Date</th>
                </tr>
                <tr v-for="project in projectsList">
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
                    if (diffDays == 1) {
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
    ptitle {
        font-size: 18px
    }

    p pdetails {
        padding-bottom: 100px;
    }

    table {
        font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
        border-collapse: collapse;
        width: 100%;
    }

   td,th {
        border: 1px solid #ddd;
        padding: 8px;
    }

   th {
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: left;
        color: black;
    }
</style>
