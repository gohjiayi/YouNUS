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
table {
   width: 100%;
   
   td, th { 
      color: darken($baseColor, 10%);
      padding: $padding; 
   }
   
   td {
      text-align: center;
      vertical-align: middle;
      
      &:last-child {
         font-size: 0.95em;
         line-height: 1.4;
         text-align: left;
      }
   }
   
   th { 
      background-color: lighten($baseColor, 50%);
      font-weight: 300;
   }
   
   tr {     
      &:nth-child(2n) { background-color: white; }
      &:nth-child(2n+1) { background-color: lighten($baseColor, 55%) }
   }
}

ptitle {
    font-size: 18px
}

p pdetails {
    padding-bottom: 100px;
}

table {
    border-collapse: collapse;
    width: 100%;
}

td,th {
    border: 1px solid #ddd;
    padding: 8px;
}

th {
    text-align: left;
}

td {
    font-size:14px;
}
</style>
