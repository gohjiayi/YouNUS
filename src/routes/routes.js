import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

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
      },
    {
        path: 'dashboard',
        name: 'dashboard',
        component: loadPage("Dashboard")
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
        component: loadPage("Tasks")
      },
      {
        path: "resources",
        name: "Resources",
        component: loadPage("Resources")
      },
      {
        path: "ganttchart",
        name: "GanttChart",
        component: loadPage("Gantt")
      },
      {
        path: "calendar",
        name: "Calendar",
        component: loadPage("Calendar")
      },
      {
        path: "notifications",
        name: "Notifications",
        component: loadPage("Notifications")
      },
      {
        path: "teammates",
        name: "Teammates",
        component: loadPage("Teammates")
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
