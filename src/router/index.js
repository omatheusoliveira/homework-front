import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/list-user',
    name: 'Principal',
    component: () => import('../views/PrincipalView.vue'),
    children: [
      {
        path: '/register-user',
        name: 'Cadastrar Usuario',
        component: () => import('../views/CadastrarUser.vue'),
      },
      {
        path: '/list-user',
        name: 'Listar Usuario',
        component: () => import('../views/ListarUser.vue'),
      },
      {
        path: '/list-sale',
        name: 'Listar Vendas',
        component: () => import('../views/ListarVenda.vue'),
      },
      {
        path: '/register-sale',
        name: 'Cadastrar Tarefa',
        component: () => import('../views/CadastrarVenda.vue'),
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
