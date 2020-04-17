import {Bar} from 'vue-chartjs'
import axios from 'axios'

export default{
    extends: Bar,
    data: () => ({
        results:[],
        chartdata: {
          labels:[],
          datasets: [
            {
              label: '',
              data:[],
              borderWidth:0.5,
              borderColor:"darkblue",
              backgroundColor:'skyblue',
              fill:false
            }
          ]
          
        },
        options: {
            legend: { display: false },
            title: {
              display: true,
              text: 'Ridership of different modes of transport in 1995'
            },
            responsive: true,
            maintainAspectRatio: true
        }
      }),
    methods:{
    
    fetchData : function(){
        axios.get('https://data.gov.sg/api/action/datastore_search?resource_id=552b8662-3cbc-48c0-9fbb-abdc07fb377a').then(response=>{
        this.results =response.data.result.records
        for(let key in this.results){
            if (key == 5) {
                break;
            }
            this.chartdata.datasets[0].data.push(this.results[key].average_ridership)
            this.chartdata.labels.push(this.results[key].type_of_public_transport+'')
        }
        this.renderChart(this.chartdata,this.options)
            
    })
    
    }
    
    },
     mounted(){
        this.fetchData()
        
     }

    
    
    
}