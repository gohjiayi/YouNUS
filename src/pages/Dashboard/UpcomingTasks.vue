<template>
    <div>
        <ul>
            <li v-for="task in tasksList" v-bind:key="task.id">
                <ptitle>
                    <b> Task: </b> {{ task.item.title }}
                </ptitle>
                <br />
                Due Date: </a>{{ task.item.date}} || Status: {{ task.item.status.name}}
                <a v-if="task.item.status.name == 'To Do'"><div class="foo todo"></div></a>
                <a v-if="task.item.status.name == 'In Review'"><div class="foo inreview"></div></a>
                <a v-if="task.item.status.name == 'Completed'"><div class="foo completed"></div></a>
                <a v-if="task.item.status.name == 'Cancelled'"><div class="foo cancelled"></div></a>
                <a v-if="task.item.status.name == 'In Progress'"><div class="foo inprogress"></div></a>

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
            firebase.db.collection('tasks').orderBy("date").limit(7).where("date", ">=", time).get().then((querySnapShot)=>{
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
    font-size: 16px;
}
p pdetails {
    padding-bottom: 100px;
}
li {
font-size: 14px;
margin-left: 10px;
list-style-type: none;
}

.foo {
  float: left;
  width: 18px;
  height: 18px;
  margin: 5px;
  border: 1px solid rgba(0, 0, 0, .2);
  cursor: default;
}

.todo {
  background: rgba(158, 193, 207,1);
}

.inreview {
  background: rgba(255, 230, 98, 1);
}

.completed {
  background: rgba(158, 224, 158,1);
}

.cancelled {
  background: rgba(255, 102, 99,1);
}

.inprogress {
  background: rgba(204, 153, 201,1);
}
</style>
