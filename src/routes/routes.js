import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

const loadLayout = layout => () => import("@/pages/Layout/"+layout+".vue")
const loadPage = page => () => import("@/pages/"+page+".vue")

const routes = [
  {
    path: '',
    name: 'default',
    component: loadLayout("DefaultLayout"),
    redirect: '/auth',
    children: [
      {
        path: 'home',
        name: 'home',
        component: loadPage("LandingPage/Home")
      },
      {
        path: 'dashboard',
        name: 'dashboard',
        component: loadPage("Dashboard")
      },
      {
        path: '/auth',
        name: 'auth',
        component: loadPage("Authentication/Auth")
      }, 
      {
        path: '/login',
        name: 'login',
        component: loadPage("Authentication/Login")
      },
      {
        path: '/register',
        name: 'register',
        component: loadPage("Authentication/Register")
      },
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
        component: loadPage("Resources/ResourcesPage")
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
        path: "teammates",
        name: "Teammates",
        component: loadPage("Teammates/Teammates")
      },

    ]
  },

];

export default routes;
