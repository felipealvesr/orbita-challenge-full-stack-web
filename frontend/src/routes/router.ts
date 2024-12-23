import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import MainLayout from '../layouts/Mainlayout.vue';
import StudentSelect from '../pages/StudentSelect.vue';
import StudentForm from '../pages/StudentForm.vue';
import Home from '../pages/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'Home', 
        component: Home,
      },
      {
        path: 'student-select',
        name: 'StudentSelect',
        component: StudentSelect,
      },
      {
        path: 'student-form/:id?',
        name: 'StudentForm',
        component: StudentForm,
        props: true,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
