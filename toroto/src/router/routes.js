
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'proyecto/:id', component: () => import('pages/Proyecto.vue') },
      { path: 'proyectos', component: () => import('pages/Proyectos.vue') },
      { path: 'clientes', component: () => import('pages/Clientes.vue') },
      { path: 'acerca', component: () => import('pages/Acerca.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
