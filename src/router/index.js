import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'

import SplashView from '../views/SplashView.vue'
import OnboardingView from '../views/OnboardingView.vue'
import DashboardView from '../views/DashboardView.vue'
import MarketView from '../views/MarketView.vue'
import CartView from '../views/CartView.vue'
import OrdersView from '../views/OrdersView.vue'
import ProfitabilityView from '../views/ProfitabilityView.vue'
import AccountView from '../views/AccountView.vue'

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior() {
    return { top: 0 }
  },
  routes: [
    { path: '/bienvenue', name: 'bienvenue', component: SplashView, meta: { public: true } },
    { path: '/inscription', name: 'inscription', component: OnboardingView, meta: { public: true } },

    { path: '/', name: 'dashboard', component: DashboardView, meta: { requiresAuth: true, label: 'Accueil', icon: 'home' } },
    { path: '/marche', name: 'marche', component: MarketView, meta: { requiresAuth: true, label: 'Marché', icon: 'grid' } },
    { path: '/panier', name: 'panier', component: CartView, meta: { requiresAuth: true } },
    { path: '/commandes', name: 'commandes', component: OrdersView, meta: { requiresAuth: true, label: 'Commandes', icon: 'list' } },
    { path: '/rentabilite', name: 'rentabilite', component: ProfitabilityView, meta: { requiresAuth: true, label: 'Simulation', icon: 'calc' } },
    { path: '/compte', name: 'compte', component: AccountView, meta: { requiresAuth: true, label: 'Profil', icon: 'user' } },
  ],
})

// Garde de navigation : toute route marquée requiresAuth exige un utilisateur connecté
// (réel demain via un jeton API, simulé aujourd'hui via le store Pinia `auth`).
router.beforeEach((to) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { name: 'bienvenue' }
  }
  if (to.meta.public && auth.isAuthenticated && to.name !== 'inscription') {
    return { name: 'dashboard' }
  }
  return true
})

export default router
