<template>
    <div>
        <hero-bar :has-right-visible="false">
            Dashboard
        </hero-bar>
        <section class="section is-main-section">
            <tiles>
                <card-widget class="tile is-child" type="is-primary" icon="account-multiple" :number="5" label="Active Projects"/>
                <card-widget class="tile is-child" type="is-info" icon="cart-outline" :number="77" label="Tasks"/>
                <card-widget class="tile is-child" type="is-success" icon="chart-timeline-variant" :number="25" label="Files"/>
            </tiles>

            <card-component title="Upcoming Due Dates" @header-icon-click="fillChartData" icon="finance" header-icon="reload">
                <UpcomingTasks></UpcomingTasks>
            </card-component>

            <card-component title="Pie Chart" class="has-table has-mobile-sort-spaced">
                <clients-table-sample :data-url="`${$router.options.base}data-sources/clients.json`"/>
            </card-component>
        </section>
    </div>
</template>

<script>
    // @ is an alias to /src
    import UpcomingTasks from './UpcomingTasks.vue'
    import * as chartConfig from './Charts/chart.config'
    import HeroBar from './HeroBar'
    import Tiles from './Tiles'
    import CardWidget from './CardWidget'
    import CardComponent from './CardComponent'
    import ClientsTableSample from './ClientsTableSample'
    export default {
        name: 'home',
        components: {
            ClientsTableSample,
            CardComponent,
            CardWidget,
            Tiles,
            HeroBar,
            UpcomingTasks
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
