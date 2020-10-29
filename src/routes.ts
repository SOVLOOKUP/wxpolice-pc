import BasicLayout from '@/layouts/BasicLayout';
import Dashboard from '@/pages/Dashboard';
import Tasks from './pages/tasks';
import TaskDetails from './pages/tasksdetail';

const routerConfig = [
  {
    path: '/',
    component: BasicLayout,
    children: [
      {
        path: '/',
        exact: true,
        component: Dashboard,
      },
      {
        path: '/tasks',
        component: Tasks,
        exact: true,
      },{
        path: '/tasks/detail',
        component: TaskDetails
      }
    ],
  },
];
export default routerConfig;
