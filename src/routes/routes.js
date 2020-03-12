import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Projects from "@/pages/Projects.vue";
import Resources from "@/pages/Resources.vue";
import GanttChart from "@/pages/Gantt.vue";
import Calendar from "@/pages/Calendar.vue";
import Tasks from "@/pages/Tasks.vue";
import Teammates from "@/pages/Teammates.vue";
import Notifications from "@/pages/Notifications.vue";

import UserProfile from "@/pages/UserProfile.vue";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/projects",
    children: [
      {
        path: "projects",
        name: "Projects",
        component: Projects
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
        path: "tasks",
        name: "Tasks",
        component: Tasks
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
