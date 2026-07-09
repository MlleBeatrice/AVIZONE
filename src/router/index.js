import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import MarketView from '../views/MarketView.vue'
import OrdersView from '../views/OrdersView.vue'
import ProfitabilityView from '../views/ProfitabilityView.vue'
import AccountView from '../views/AccountView.vue'

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior() {
    return { top: 0 }
  },
  routes: [
    { path: '/', name: 'dashboard', component: DashboardView, meta: { label: 'Accueil', icon: 'home' } },
    { path: '/marche', name: 'marche', component: MarketView, meta: { label: 'Marché', icon: 'grid' } },
    { path: '/commandes', name: 'commandes', component: OrdersView, meta: { label: 'Commandes', icon: 'route' } },
    { path: '/rentabilite', name: 'rentabilite', component: ProfitabilityView, meta: { label: 'Rentabilité', icon: 'calc' } },
    { path: '/compte', name: 'compte', component: AccountView, meta: { label: 'Compte', icon: 'user' } },
  ],
})

export default router
