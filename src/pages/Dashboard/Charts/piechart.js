import { Doughnut } from 'vue-chartjs'
import { db } from '../../../firebase/firebaseConfig'

export default{
    extends: Doughnut,
    data: () => ({
        datacollection: {
            datasets: [{
                data:[],
                backgroundColor:[]
            }],
            labels:[]
        },
        options: {
            layout:{
                padding:{
                    left: 5,
                    right: 0,
                    top: 10,
                    bottom: 0
                }
            },
            responsive: true,
            maintainAspectRatio: false  
        }  
    }),
    methods: {
            fetchItems: function() {
                var dict = {};
                var colours  = {"To Do": "rgba(158, 193, 207,1)",  // To match colours used in the Task Page
                                "In Progress": "rgba(204, 153, 201,1)",
                                "In Review": "rgba(255, 230, 98, 1)",
                                "Completed": "rgba(158, 224, 158,1)",
                                "Canceled" : "rgba(255, 102, 99,1)"
                }
                var today = new Date();
                db.collection('tasks').get().then(querySnapShot => { 
                    querySnapShot.forEach(doc => {
                        var status = doc.data().status.name
                        var docDate = new Date(doc.data().date)
                        if(+docDate >= +today) { // Typecast to numbers, filter out records that have been past date
                            if (status in dict) {
                                dict[status] +=  1
                            } else {
                                dict[status] =  1
                            }
                        }
                    })
                Object.keys(dict).forEach(key => {
                    this.datacollection.datasets[0].data.push(dict[key])
                    this.datacollection.labels.push(key)
                    this.datacollection.datasets[0].backgroundColor.push(colours[key])
                })
                this.renderChart(this.datacollection, this.options)
            })
        }
    },
    created(){
        this.fetchItems()
    }
}
