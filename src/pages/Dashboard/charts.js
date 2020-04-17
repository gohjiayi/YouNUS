import {Bar} from 'vue-chartjs'
export default{
    extends:Bar,
    data: () => ({
        chartdata: {
          labels: ['January', 'February','March','April'],
          datasets: [
            {
              label: 'Sales1',
              data: [400, 300,150,100],
              backgroundColor:'#AA6',
              borderWidth:1.0,
              borderColor:"#000"
            }
            /*,
            {
                label: 'Sales2',
                data: [40, 30,10,105],
                backgroundColor:'#7C1'
              }*/
          ]
          
        },
        
        options: {
            title:{
                display:true,
                text:'Bar Chart BT3103',
                fontColor:'Black',
                fontSize:15

            },
            legend:{
                position:'top'
            },
            layout:{
                padding:{
                    left: 5,
                    right: 0,
                    top: 0,
                    bottom: 5
                }
            },
            scales:{
                yAxes:[{
                    ticks:{
                        min:0
                    }

                }]
            }
          
        }
      }),
    mounted(){
        this.renderChart(this.chartdata,this.options)
    }
}