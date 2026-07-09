<script setup>
import { useRouter } from 'vue-router'
import { useAvizoneStore } from '../stores/avizone.js'
import AppHeader from '../components/AppHeader.vue'
import OrderCard from '../components/OrderCard.vue'
import IconSvg from '../components/IconSvg.vue'

const store = useAvizoneStore()
const router = useRouter()

function fmt(n) {
  return Math.round(n).toLocaleString('fr-FR')
}
</script>

<template>
  <div>
    <AppHeader :subtitle="'Bonjour, ' + store.user.prenom" />

    <section class="px-5 pt-5 space-y-5">
      <div>
        <p class="text-ash text-sm">Votre exploitation</p>
        <h1 class="font-display font-extrabold text-2xl text-ink leading-tight">{{ store.user.exploitation }}</h1>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <div class="bg-white rounded-2xl p-4 shadow-card">
          <div class="w-9 h-9 rounded-xl bg-sprout flex items-center justify-center mb-2">
            <IconSvg name="leaf" :size="18" color="#1F6F4C" :stroke-width="1.8" />
          </div>
          <p class="text-2xl font-display font-extrabold text-ink">{{ store.user.cheptelActuel }}</p>
          <p class="text-xs text-ash mt-0.5">Sujets actifs au cheptel</p>
        </div>
        <div class="bg-white rounded-2xl p-4 shadow-card">
          <div class="w-9 h-9 rounded-xl bg-amber-light flex items-center justify-center mb-2">
            <IconSvg name="wallet" :size="18" color="#C98A2E" :stroke-width="1.8" />
          </div>
          <p class="text-2xl font-display font-extrabold text-ink">{{ fmt(store.user.soldePortefeuille) }}</p>
          <p class="text-xs text-ash mt-0.5">FCFA de trésorerie estimée</p>
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between mb-2.5">
          <h2 class="font-display font-bold text-ink">Commandes en cours</h2>
          <router-link to="/commandes" class="text-xs text-forest font-semibold">Tout voir</router-link>
        </div>
        <TransitionGroup name="list-anim" tag="div" class="space-y-3 relative">
          <OrderCard v-for="o in store.commandesActives" :key="o.id" :order="o" />
        </TransitionGroup>
        <p v-if="store.commandesActives.length === 0" class="text-center text-ash text-sm py-8">
          Aucune commande active pour le moment.
        </p>
      </div>

      <div>
        <h2 class="font-display font-bold text-ink mb-2.5">Accès rapide</h2>
        <div class="grid grid-cols-2 gap-3">
          <button @click="router.push('/marche')" class="tap-fx bg-forest text-white rounded-2xl p-4 text-left shadow-pop">
            <IconSvg name="grid" :size="20" color="white" :stroke-width="1.8" />
            <p class="font-display font-bold mt-2 text-sm">Marché ouvert</p>
            <p class="text-[11px] text-white/75 mt-0.5">Comparer les fournisseurs</p>
          </button>
          <button @click="router.push('/rentabilite')" class="tap-fx bg-white border border-black/5 rounded-2xl p-4 text-left shadow-card">
            <IconSvg name="calc" :size="20" color="#1F6F4C" :stroke-width="1.8" />
            <p class="font-display font-bold mt-2 text-sm text-ink">Ma rentabilité</p>
            <p class="text-[11px] text-ash mt-0.5">Simuler ma marge</p>
          </button>
        </div>
      </div>
    </section>
  </div>
</template>
