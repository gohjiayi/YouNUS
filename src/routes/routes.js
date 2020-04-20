import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Tasks from "@/pages/Tasks.vue";
import Resources from "@/pages/Resources/ResourcesPage.vue";
import GanttChart from "@/pages/Gantt.vue";
import Calendar from "@/pages/Calendar.vue";
import Teammates from "@/pages/Teammates/Teammates.vue";


const loadLayout = layout => () => import("@/pages/Layout/"+layout+".vue")
const loadPage = page => () => import("@/pages/"+page+".vue")

const routes = [
  {
    path: '',
    name: 'default',
    component: loadLayout("DefaultLayout"),
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: loadPage("LandingPage/Home")
      }
    ]
  },
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/tasks",
    children: [
      {
        path: "tasks",
        name: "Tasks",
        component: Tasks
      },
      {
        path: "resources",
        name: "Resources",
        component: Resources
      },
      {
        path: "ganttchart",
        name: "GanttChart",
        component: GanttChart
      },
      {
        path: "calendar",
        name: "Calendar",
        component: Calendar
      },
      {
        path: "teammates",
        name: "Teammates",
        component: Teammates
      },

    ]
  },

];

export default routes;
