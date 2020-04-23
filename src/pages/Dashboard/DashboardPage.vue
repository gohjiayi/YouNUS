<template>
    <div>
        <section class="section is-main-section">
            <tiles>
                <card-widget class="tile is-child" type="is-primary" icon="laptop"  label="Current Active Projects"/>
                <card-widget1 class="tile is-child" type="is-info" icon="briefcase" label="Current Active Tasks"/>
            </tiles>

            <tiles>
                <card-component class="tile is-child" title="Project Countdown" >
                    <ProjectCountdown></ProjectCountdown>
                </card-component>

                <card-component class="tile is-child" title="Upcoming Due Dates">
                    <UpcomingTasks></UpcomingTasks>
                </card-component>
            </tiles>

            <tiles>
                <card-component title="Current Active Tasks & Project Contribution" class="tile is-child">
                    <Bar></Bar>
                </card-component>

                <card-component title="Current Task Status" class="tile is-child">
                    <Pie></Pie>
                </card-component>
            </tiles>
        </section>
    </div>
</template>

<script>
    // @ is an alias to /src
    import UpcomingTasks from './UpcomingTasks.vue'
    import ProjectCountdown from './ProjectCountdown.vue'
    import * as chartConfig from './Charts/chart.config'
    import HeroBar from './HeroBar'
    import Tiles from './Tiles'
    import CardWidget from './CardWidget'
    import CardComponent from './CardComponent'
    import ClientsTableSample from './ClientsTableSample'
    import Pie from './Charts/piechart.js'
    import Bar from './Charts/barchart.js'
    import ActiveProjects from './ActiveProjects.vue'
    import ActiveTasks from './ActiveTasks.vue'
    import CardWidget1 from './CardWidget1'
    
    export default {
        name: 'home',
        components: {
            ClientsTableSample,
            CardComponent,
            CardWidget,
            Tiles,
            HeroBar,
            UpcomingTasks,
            ProjectCountdown,
            Pie,
            Bar,
            ActiveProjects,
            ActiveTasks,
            CardWidget1
        },
        data () {
            return {
                defaultChart: {
                    chartData: null,
                    extraOptions: chartConfig.chartOptionsMain
                }
            }
        },
        computed: {
            titleStack () {
                return [
                    'Admin',
                    'Dashboard'
                ]
            }
        },
        mounted () {
            this.fillChartData()

            this.$buefy.snackbar.open({
                message: 'Welcome back',
                queue: false
            })
        },
        methods: {
            randomChartData (n) {
                const data = []

                for (let i = 0; i < n; i++) {
                    data.push(Math.round(Math.random() * 200))
                }

                return data
            },
            fillChartData () {
                this.defaultChart.chartData = {
                    datasets: [
                        {
                            fill: false,
                            borderColor: chartConfig.chartColors.default.primary,
                            borderWidth: 2,
                            borderDash: [],
                            borderDashOffset: 0.0,
                            pointBackgroundColor: chartConfig.chartColors.default.primary,
                            pointBorderColor: 'rgba(255,255,255,0)',
                            pointHoverBackgroundColor: chartConfig.chartColors.default.primary,
                            pointBorderWidth: 20,
                            pointHoverRadius: 4,
                            pointHoverBorderWidth: 15,
                            pointRadius: 4,
                            data: this.randomChartData(9)
                        },
                        {
                            fill: false,
                            borderColor: chartConfig.chartColors.default.info,
                            borderWidth: 2,
                            borderDash: [],
                            borderDashOffset: 0.0,
                            pointBackgroundColor: chartConfig.chartColors.default.info,
                            pointBorderColor: 'rgba(255,255,255,0)',
                            pointHoverBackgroundColor: chartConfig.chartColors.default.info,
                            pointBorderWidth: 20,
                            pointHoverRadius: 4,
                            pointHoverBorderWidth: 15,
                            pointRadius: 4,
                            data: this.randomChartData(9)
                        },
                        {
                            fill: false,
                            borderColor: chartConfig.chartColors.default.danger,
                            borderWidth: 2,
                            borderDash: [],
                            borderDashOffset: 0.0,
                            pointBackgroundColor: chartConfig.chartColors.default.danger,
                            pointBorderColor: 'rgba(255,255,255,0)',
                            pointHoverBackgroundColor: chartConfig.chartColors.default.danger,
                            pointBorderWidth: 20,
                            pointHoverRadius: 4,
                            pointHoverBorderWidth: 15,
                            pointRadius: 4,
                            data: this.randomChartData(9)
                        }
                    ],
                    labels: ['01', '02', '03', '04', '05', '06', '07', '08', '09']
                }
            }
        }
    }
</script>
