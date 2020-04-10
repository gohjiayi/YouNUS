import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Tasks from "@/pages/Tasks.vue";
import Resources from "@/pages/Resources.vue";
import GanttChart from "@/pages/Gantt.vue";
import Calendar from "@/pages/Calendar.vue";
import Teammates from "@/pages/Teammates.vue";
import Notifications from "@/pages/Notifications.vue";

import UserProfile from "@/pages/UserProfile.vue";

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
        component: loadPage("Home")
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
        path: "notifications",
        name: "Notifications",
        component: Notifications
      },
      {
        path: "teammates",
        name: "Teammates",
        component: Teammates
      },
    ]
  },
  {
    path:"/",
    component: UserProfile,
    children: [
      {
        path: "user",
        name: "User Profile",
        component: UserProfile
      }
    ]
  }
];

export default routes;
