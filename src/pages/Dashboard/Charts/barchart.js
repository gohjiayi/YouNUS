import { Bar } from 'vue-chartjs'
import { db } from '../../../firebase/firebaseConfig'

export default{
    extends: Bar,
    data: () => ({
        datacollection: {
            datasets: [{
                data:[],
                backgroundColor:[]
            }],
            labels:[]
        },
        options: {
            legend: {
                display: false
            },
            layout:{
                padding:{
                    left: 5,
                    right: 0,
                    top: 10,
                    bottom: 0
                }
            },
            scales:{
                yAxes:[{
                    ticks:{
                        min:0
                    }

                }]
            },
            responsive: true,
            maintainAspectRatio: false  
        },
        projects: {
            projectData: {} //Gives us a list of currently active projects 
        }  
    }),
    methods: {
            fetchItems: function() {
                var today = new Date();

                var projects = {}; // Initialise this to do a "join" between collections
                var mods = {};
                
                // Filter by Projects && Modules
                db.collection('projects').get().then(querySnapShot => {
                    querySnapShot.forEach(doc => {
                        var mod = doc.data().module
                        var projectName = doc.data().projectName
                        var id = doc.id
                        var projDue = new Date(doc.data().dueDate)
                        //if(+projDue >= +today) {
                            if (id in projects == false) {
                                projects[id] = mod + " - " + projectName
                            }
                        //}
                    })
                    Object.keys(projects).forEach(key => {
                        this.projects.projectData[key] = projects[key] //May want to push project Name into labels
                    })
                })

                //need to fill colour with the module code, x-axis is the assignment 
                // y axis -> task count and gannt count 
                var dict = {};
                var colours  = {"To Do": "rgba(158, 193, 207,1)",  
                                "In Progress": "rgba(204, 153, 201,1)",
                                "In Review": "rgba(255, 230, 98, 1)",
                                "Completed": "rgba(158, 224, 158,1)",
                                "Canceled" : "rgba(255, 102, 99,1)"
                }
                db.collection('tasks').get().then(querySnapShot => { 
                    querySnapShot.forEach(doc => {
                        var proj = doc.data().projectId
                        var docDate = new Date(doc.data().date)
                        if(+docDate >= +today) { // Typecast to numbers, filter out records that have been past date
                            if (proj in dict) {
                                dict[proj] +=  1
                            } else {
                                dict[proj] =  1
                            }
                        }
                    })
                Object.keys(dict).forEach(key => {
                    if (this.projects.projectData[key] != null){
                        this.datacollection.datasets[0].data.push(dict[key])
                        this.datacollection.labels.push(this.projects.projectData[key])
                        this.datacollection.datasets[0].backgroundColor.push(this.pastelColors())
                    }
                    //this.datacollection.datasets[0].backgroundColor.push(colours[key])
                })
                
                // Pull for Gantt Tasks 
                // var ganttdict = {}
                // db.collection('taskGantts').get().then(querySnapShot => {
                //     querySnapShot.forEach(doc => {
                //         var proj = doc.data().projectId
                //         var end = new Date(doc.data().end_date)
                //         if(+end >= +today) {
                //             if(proj in ganttdict) {
                //                 ganttdict[proj] += 1
                //             } else {
                //                 ganttdict[proj] = 1
                //             }
                //         }
                //     })
                // Object.keys(ganttdict).forEach(key => {
                //     this.datacollection.datasets[0].data.push(ganttdict[key])
                // })
                // })
                this.renderChart(this.datacollection, this.options)
            })
        },
        pastelColors: function(){
            var r = (Math.round(Math.random()* 127) + 127).toString(16);
            var g = (Math.round(Math.random()* 127) + 127).toString(16);
            var b = (Math.round(Math.random()* 127) + 127).toString(16);
            return '#' + r + g + b;
        }
    },
    created(){
        this.fetchItems()
    }
}
