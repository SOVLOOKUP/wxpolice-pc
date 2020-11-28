import BasicLayout from '@/layouts/BasicLayout';
import Dashboard from '@/pages/Dashboard';
import Sendmsg from './pages/sendmsg';
import Tasks from './pages/tasks';
import TaskDetails from './pages/tasksdetail';
import Analysis from './pages/Analysis';

const routerConfig = [
  {
    path: '/',
    component: BasicLayout,
    children: [
      // {
      //   path: '/',
      //   exact: true,
      //   component: Dashboard,
      // },
      {
        path: '/',
        exact: true,
        component: Analysis,
      },
      {
        path: '/tasks',
        component: Tasks,
        exact: true,
      },{
        path: '/tasks/detail/:id',
        component: TaskDetails
      },{
        path: '/tasks/sendmsg',
        component: Sendmsg
      }
    ],
  },
];
export default routerConfig;
