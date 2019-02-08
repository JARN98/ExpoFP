import { RouteInfo } from './topnav.metadata';

export const ROUTESADMIN: RouteInfo[] = [
 
  {
    path: '/component/proyectos',
    title: 'Proyectos',
    icon: 'mdi mdi-white-balance-incandescent',
    class: '',
    label: '',
    labelClass: '',
    extralink: false,
    submenu: [],
    admin: true
  },
  {
    path: '/component/encuesta',
    title: 'Encuesta',
    icon: 'mdi mdi-clipboard-outline',
    class: '',
    label: '',
    labelClass: '',
    extralink: false,
    submenu: [],
    admin: false
  },
  {
  path: '/component/listaUsuarios',
  title: 'Usuarios',
  icon: 'mdi mdi-account',
  class: '',
  label: '',
  labelClass: '',
  extralink: false,
  submenu: [],
  admin: false
}
 
];