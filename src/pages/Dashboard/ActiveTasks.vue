<template>
  <card-component>
    <div class="level is-mobile">
      <div class="level-item">
        <div class="is-widget-label">
          <h3 class="subtitle is-spaced">
            {{ label }}
          </h3>
          <h1 class="title">
            <b>{{tasksList.length}}</b> 
          </h1>
        </div>
      </div>
      <div v-if="icon" class="level-item has-widget-icon">
        <div class="is-widget-icon">
          <b-icon :icon="icon" size="is-large" :type="type"/>
        </div>
      </div>
    </div>
  </card-component>
</template>

<script>
import CardComponent from './CardComponent'
import GrowingNumber from './GrowingNumber'
const firebase = require('../../firebase/firebaseConfig.js');
export default {
  name: 'ActiveTasks',
  components: { GrowingNumber, CardComponent },
  props: {
    icon: {
      type: String,
      default: null
    },
    number: {
      type: Number,
      default: 0
    },
    prefix: {
      type: String,
      default: null
    },
    suffix: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: null
    }
  },
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
                    if ((tasks.assignee.username == "Jia Yi")) {
                        this.tasksList.push({tasks});
                    }
                });


            });

             
        }
}
</script>

<style scoped>
b {
    font-size: 30px;
    font-weight: 500;
}
</style>