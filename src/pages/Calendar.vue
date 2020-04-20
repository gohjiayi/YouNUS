<template>
<div class="pa-2">
  <v-app id="dayspan" v-cloak>
    <ds-calendar-app
      ref="app"
      :calendar="calendar"
      :read-only="readOnly"
      @change="saveState"
      @event-create="eventCreate($event)"
    >
    </ds-calendar-app>
  </v-app>
</div>

</template>

<script>
import { Calendar } from "dayspan";
import Vue from "vue";
import { mapActions, mapGetters,mapMutations } from "vuex";

export default {
  name: "app",
  data: () => ({
    storeKey: "dayspanStates",
    calendar: Calendar.months(),
    readOnly: false,
    defaultEvents: {},
    demo: {},
    projectId: "",
    events: {}
  }),
  computed: {
    ...mapGetters("events",["calendarType"]),
    // ...mapGetters("events", ["events"]),
    // events() {
    //   let data = this.$store.state.events;
    //   console.log("data 82", data);
    //   return data;
    // }
  },
  methods: {
    ...mapActions("events", ["FETCH_EVENTS", "ADD_EVENTS", "UPDATE_EVENTS","SET_CALENDAR_TYPE"]),
    ...mapMutations("events", ["SET_CALENDAR_TYPE"]),
    getCalendarTime(calendarEvent) {
      let sa = calendarEvent.start.format("a");
      let ea = calendarEvent.end.format("a");
      let sh = calendarEvent.start.format("h");
      let eh = calendarEvent.end.format("h");
      if (calendarEvent.start.minute !== 0) {
        sh += calendarEvent.start.format(":mm");
      }
      if (calendarEvent.end.minute !== 0) {
        eh += calendarEvent.end.format(":mm");
      }
      return sa === ea ? sh + " - " + eh + ea : sh + sa + " - " + eh + ea;
    },
    async eventCreate() {
      let state = this.calendar.toInput(true);
      state.projectId = this.projectId;

      if (this.events && this.events.id ) {
        state.id = this.events.id;

        if (state.id) {
          await this.UPDATE_EVENTS(state).then(res => {
              this.$refs.app.setState(state);
              this.getEventsData();
            })
            .catch(err => {
              console.log(
                `ERROR : VIEWS : DataViewSidebar.vue : submitData -> ADD NEW : ${err}`
              );
            });
        }
      } else {
        await this.ADD_EVENTS(state).then(res => {
              this.$refs.app.setState(state);
              this.getEventsData();
          })
          .catch(err => {
            console.log(
              `ERROR : VIEWS : DataViewSidebar.vue : submitData -> ADD NEW : ${err}`
            );
          });
      }
    },
    async saveState(data) {
      this.SET_CALENDAR_TYPE(data.calendar.type)
      // let state = this.calendar.toInput(true);
      // let json = JSON.stringify(state);
      // localStorage.setItem(this.storeKey, json);
    },
    loadState() {
      let state = {};
      try {
        let savedState = this.events; //JSON.parse(localStorage.getItem(this.storeKey));
        if (savedState) {
          state = savedState;
          state.preferToday = false;
        }
      } catch (e) {
        // eslint-disable-next-line
        console.log(e);
      }
      if (!state.events || !state.events.length) {
        state.events = this.defaultEvents;
      }
      if (state.events && state.events.length) {
        state.events.forEach(ev => {
          let defaults = this.$dayspan.getDefaultEventDetails();
          ev.data = Vue.util.extend(defaults, ev.data);
        });
      }
      state.calendar = this.calendar
      this.$refs.app.setState(state);
      this.$refs.app.rebuild(undefined, true, this.$refs.app.currentType); // for data show events not show over each other
    },

    async getEventsData() {
      await this.FETCH_EVENTS({projectId: this.projectId}).then(events => {
        console.log("events", events);
        this.events = events;
        if (this.events) {
          this.loadState();
        }
      });
    }
  },
  created() {
    let obj = JSON.parse(localStorage.getItem('vuex'));
    this.projectId = obj && obj.project && obj.project.selectedProject && obj.project.selectedProject.id ? obj.project.selectedProject.id : "";

    if (!this.projectId) this.$router.replace(`/home`)
    this.getEventsData()
  },
  mounted() {
  },
  watch:{
    calendarType(v){
      if(v==2) this.calendar = Calendar.months()
    }
  }
};
</script>

<style scoped>
>>>.v-btn--flat,
>>>.v-text-field--solo >>>.v-input__slot {
  background-color: #f5f5f5 !important;
  margin-bottom: 8px !important;
}

>>>.v-menu__activator {
  align-items: center;
  cursor: pointer;
  display: flex;
  position: relative;
}

.ds-app-calendar-toolbar {

}
>>>.v-content.ds-expand{
  padding: 0 !important;
}
>>>aside.v-navigation-drawer.v-navigation-drawer--clipped.v-navigation-drawer--fixed.v-navigation-drawer--open.theme--light{
  display: none !important;
}
>>>div.v-input.v-text-field.v-text-field--single-line.v-text-field--solo.v-text-field--solo-flat.v-text-field--enclosed.v-input--hide-details.theme--light:nth-child(3){
  /* display: none !important; */
}
>>>.ds-app-calendar-toolbar.v-toolbar.elevation-0.v-toolbar--clipped.v-toolbar--fixed.theme--light.white{
  margin-top: 00px !important;
  position: relative;
}
>>>.v-toolbar__title.ml-0{
  visibility: hidden;
}
>>>.v-menu__content.theme--light.menuable__content__active{
  left: 85% !important;
  position: absolute;
}
>>>.theme--light.v-text-field--solo>.v-input__control>.v-input__slot{
  background: #ebebeb !important;
}
</style>


