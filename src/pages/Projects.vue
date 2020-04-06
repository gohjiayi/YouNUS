<template>
    <v-app id = "dayspan" v-cloak>
      <ds-calendar-app 
        ref="app"
        :calendar="calendar"
        :read-only="readOnly"

        @change ="saveState"
        @event-create="eventCreate($event)"
      >

      <!-- <template slot="title">
        DaySpan
      </template> -->
      <!-- <template slot="menuRight">
        <v-btn icon large href="https://github.com/ClickerMonkey/dayspan-vuetify" target="_blank">
          <v-avatar size="32px" tile>
            <img src="https://simpleicons.org/icons/github.svg" alt="Github">
          </v-avatar>
        </v-btn>
      </template> -->

      <!-- <template slot="eventPopover" slot-scope="slotData">
         <ds-calendar-event-popover
          v-bind="slotData"
          :read-only="readOnly"
          @finish="saveState"
        ></ds-calendar-event-popover>
      </template> -->

      <!-- <template slot="eventCreatePopover" slot-scope="{placeholder, calendar, close}">
        <ds-calendar-event-create-popover
          :calendar-event="placeholder"
          :calendar="calendar"
          :close="$refs.app.$refs.calendar.clearPlaceholder"
          @create-edit="$refs.app.editPlaceholder"
          @create-popover-closed="saveState"
        ></ds-calendar-event-create-popover>
      </template> -->

      <!-- <template slot="eventTimeTitle" slot-scope="{calendarEvent, details}">
        <div>
          <v-icon class="ds-ev-icon"
            v-if="details.icon"
            size="14"
            :style="{color: details.forecolor}">
            {{ details.icon }}
          </v-icon>
          <strong class="ds-ev-title">{{ details.title }}</strong>
        </div>
        <div class="ds-ev-description">{{ getCalendarTime( calendarEvent ) }}</div>
      </template> -->

      <!-- <template slot="drawerBottom">
        <div class="pa-3">
          <v-checkbox
            label="Read Only?"
            v-model="readOnly"
          ></v-checkbox>
        </div>
      </template> -->
    </ds-calendar-app>
  </v-app>
</template>

<script>
import {Calendar} from "dayspan";
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name : "app",
  data: () => ({ //try hard-coding important dates
    storeKey: "dayspanState",
    calendar: Calendar.months(),
    readOnly: false,
    defaultEvents: {}
  }),
  computed: {
    ...mapGetters("events", ["events"]),
    events() {
      return this.$store.state.events;
    }
  },
  methods:{
    ...mapActions("events", ["FETCH_EVENTS", "ADD_EVENTS", "UPDATE_EVENTS"]),
    getCalendarTime(calendarEvent) {
      let sa = calendarEvent.start.format("a");
      let ea = calendarEvent.end.format("a");
      let sh = calendarEvent.start.format("h");
      let eh = calendarEvent.end.format("h");
      if (calendarEvent.start.minute !== 0)
      {
        sh += calendarEvent.start.format(":mm");
      }

      if (calendarEvent.end.minute !== 0){
        eh += calendarEvent.end.format(":mm");
      }
      return (sa === ea) ? sh + ' - ' + eh + ea : sh + sa + ' - ' + eh + ea;
    },
    eventCreate(event) {
      console.log("event", event);
      // let sch = event.schedule || null;

      // let schedule = {
      //   times: sch && sch.times ? sch.times : [],
      //   duration: sch && sch.duration ? sch.duration : '',
      //   durationUnit: sch && sch.durationUnit ? sch.durationUnit : "",
      //   dayOfWeek: sch && sch.dayOfWeek() ? sch.dayOfWeek().input : [],
      //   weekspanOfMonth: ,
      //   lastDayOfMonth: ,
      //   lastWeekspanOfMonth: ,
      //   month: ,
      //   dayOfMonth
      // }

      // let data = {
      //   data: event.data,
      //   schedule: ""
      // }
      // let state = this.calendar.toInput(true);
      // console.log("data", state);
    },
    async saveState() {
      let state = this.calendar.toInput(true);
      let json = JSON.stringify(state);
      localStorage.setItem(this.storeKey, json);

     
      if (this.events && this.events.events && this.events.events.length) {
        state.id = this.events.events.id;

        if (state.id) {
          await this.UPDATE_EVENTS(state).then(res => {
              this.getEventsData();
              console.log("res", res);
              
            })
            .catch(err => {
              console.log(
                `ERROR : VIEWS : DataViewSidebar.vue : submitData -> ADD NEW : ${err}`
              );
            });
        }
      } else {
          await this.ADD_EVENTS(state).then(res => {
                this.getEventsData();
                console.log("res", res); 
            })
            .catch(err => {
              console.log(
                `ERROR : VIEWS : DataViewSidebar.vue : submitData -> ADD NEW : ${err}`
              );
            });
      }
    },
    loadState() {
      let state = {};
      try {
        let savedState = JSON.parse(localStorage.getItem(this.storeKey));
        if (savedState) {
          state = savedState;
          state.preferToday = false;
        }
      } catch (e) {
        // eslint-disable-next-line
        console.log(e);
      }
      if (!state.events || !state.events.length){
        state.events = this.defaultEvents;
      }

      if (state.events && state.events.length) {
        state.events.forEach(ev => {
          let defaults = this.$dayspan.getDefaultEventDetails();
          ev.data = Vue.util.extend(defaults, ev.data);
        });
      }

      this.$refs.app.setState(state);
    },
    async getEventsData() {
      let data =  await this.FETCH_EVENTS();
      let json = JSON.stringify(data);
      localStorage.setItem(this.storeKey, json);
    }   
  },
  async created() {
    this.FETCH_EVENTS();
    this.defaultEvents = await this.getEventsData();
  },
  mounted() {
    let navigationDrawer = document.getElementsByClassName(
      "v-navigation-drawer"
    )[0];
    if (navigationDrawer) navigationDrawer.style.marginLeft = "19%";
    let calendarTopBar = document.getElementsByClassName(
      "ds-app-calendar-toolbar"
    )[0];
    if (calendarTopBar) {
      calendarTopBar.style.marginLeft = "19%";
      calendarTopBar.style.width = "81%";
    }  
    window.app = this.$refs.app;

    this.loadState();
  }
};
</script>

<style>
.v-btn--flat,
.v-text-field--solo .v-input__slot {
  background-color: #f5f5f5 !important;
  margin-bottom: 8px !important;
}

.v-menu__activator {
  align-items: center;
  cursor: pointer;
  display: flex;
  position: relative;
}
</style> 
