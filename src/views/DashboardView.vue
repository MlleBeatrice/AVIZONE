<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'
import { useAvizoneStore } from '../stores/avizone.js'
import AppHeader from '../components/AppHeader.vue'
import OrderCard from '../components/OrderCard.vue'
import IconSvg from '../components/IconSvg.vue'

const auth = useAuthStore()
const store = useAvizoneStore()
const router = useRouter()

function fmt(n) {
  return Math.round(n).toLocaleString('fr-FR')
}

const conseilDuJour = computed(() => {
  const jour = new Date().getDate()
  return store.conseilsDuJour[jour % store.conseilsDuJour.length]
})

const objectifCheptel = 700
const progressionObjectif = computed(() => Math.min(100, Math.round(((auth.currentUser?.cheptelActuel || 0) / objectifCheptel) * 100)))

const actions = [
  { icon: 'repeat', label: 'Réapprovisionner', action: () => router.push('/marche') },
  { icon: 'calc', label: 'Simuler', action: () => router.push('/rentabilite') },
  { icon: 'headset', label: 'Contacter un expert', action: () => store.notifier('Un vétérinaire partenaire vous recontacte sous 24h', 'info') },
  { icon: 'target', label: 'Objectif du mois', action: () => store.direMascotte('Objectif : ' + objectifCheptel + ' sujets — vous y êtes presque !') },
]

function contacterLivreur(order) {
  store.notifier('Message pré-rempli envoyé au livreur de ' + order.ref, 'info')
}

const iconActualite = { commande: 'truck', promo: 'gold', conseil: 'lightbulb' }
</script>

<template>
  <div>
    <AppHeader :subtitle="'Bonjour, ' + (auth.currentUser?.nomComplet.split(' ')[0] || '')" :show-cart="false" />

    <section class="px-5 pt-5 space-y-5">
      <div class="bg-white rounded-2xl p-4 shadow-card">
        <p class="font-display font-bold text-ink">Bonjour {{ auth.currentUser?.nomComplet.split(' ')[0] }} !</p>
        <p class="text-sm text-ash mt-0.5">Belle journée pour votre élevage.</p>
        <div class="mt-3 flex items-start gap-2 bg-sprout rounded-xl p-3">
          <IconSvg name="lightbulb" :size="16" color="#1B6B3A" :stroke-width="1.8" class="shrink-0 mt-0.5" />
          <p class="text-xs text-forest">{{ conseilDuJour }}</p>
        </div>
      </div>

      <div class="grid grid-cols-3 gap-2.5">
        <div class="bg-white rounded-2xl p-3 shadow-card">
          <IconSvg name="chicken" :size="16" color="#1B6B3A" :stroke-width="1.7" />
          <p class="text-lg font-display font-extrabold text-ink mt-1.5">{{ auth.currentUser?.cheptelActuel ?? 0 }}</p>
          <p class="text-[10px] text-ash">Sujets actifs</p>
          <p class="text-[10px] text-forest-light font-semibold mt-0.5 flex items-center gap-0.5">
            <IconSvg name="trend" :size="10" color="#4CAF50" :stroke-width="2.2" /> +4,2 %
          </p>
        </div>
        <div class="bg-white rounded-2xl p-3 shadow-card">
          <IconSvg name="wallet" :size="16" color="#F9A826" :stroke-width="1.7" />
          <p class="text-lg font-display font-extrabold text-ink mt-1.5">{{ fmt(128500) }}</p>
          <p class="text-[10px] text-ash">FCFA trésorerie</p>
          <p class="text-[10px] text-forest-light font-semibold mt-0.5 flex items-center gap-0.5">
            <IconSvg name="trend" :size="10" color="#4CAF50" :stroke-width="2.2" /> +1,8 %
          </p>
        </div>
        <div class="bg-white rounded-2xl p-3 shadow-card">
          <IconSvg name="list" :size="16" color="#6B6459" :stroke-width="1.7" />
          <p class="text-lg font-display font-extrabold text-ink mt-1.5">{{ store.commandesActives.length }}</p>
          <p class="text-[10px] text-ash">Commandes en cours</p>
        </div>
      </div>

      <div>
        <h2 class="font-display font-bold text-ink mb-2.5">Actions rapides</h2>
        <div class="grid grid-cols-4 gap-2">
          <button v-for="a in actions" :key="a.label" @click="a.action" class="tap-fx flex flex-col items-center gap-1.5">
            <div class="w-12 h-12 rounded-full bg-forest flex items-center justify-center shadow-pop">
              <IconSvg :name="a.icon" :size="19" color="white" :stroke-width="1.7" />
            </div>
            <span class="text-[9.5px] text-ash font-medium text-center leading-tight">{{ a.label }}</span>
          </button>
        </div>
      </div>

      <div class="bg-white rounded-2xl p-4 shadow-card">
        <div class="flex justify-between items-center mb-1.5">
          <span class="text-xs font-semibold text-ink">Objectif du mois</span>
          <span class="text-xs text-forest font-semibold">{{ auth.currentUser?.cheptelActuel ?? 0 }}/{{ objectifCheptel }}</span>
        </div>
        <div class="h-2 rounded-full bg-sprout overflow-hidden">
          <div class="h-full rounded-full bg-amber transition-all duration-700" :style="{ width: progressionObjectif + '%' }"></div>
        </div>
      </div>

      <div>
        <h2 class="font-display font-bold text-ink mb-2.5">Actualités de votre élevage</h2>
        <div class="space-y-2">
          <div v-for="a in store.actualites" :key="a.id" class="bg-white rounded-2xl p-3.5 shadow-card flex items-start gap-3">
            <div class="w-8 h-8 rounded-xl bg-sprout flex items-center justify-center shrink-0">
              <IconSvg :name="iconActualite[a.type]" :size="15" color="#1B6B3A" :stroke-width="1.8" />
            </div>
            <div class="flex-1">
              <p class="text-xs text-ink">{{ a.texte }}</p>
              <p class="text-[10px] text-ash mt-0.5">{{ a.date }}</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between mb-2.5">
          <h2 class="font-display font-bold text-ink">Commandes en cours</h2>
          <router-link to="/commandes" class="text-xs text-amber font-semibold">Tout voir</router-link>
        </div>
        <TransitionGroup name="list-anim" tag="div" class="space-y-3 relative">
          <div v-for="o in store.commandesActives" :key="o.id" class="space-y-2">
            <OrderCard :order="o" />
            <button
              v-if="o.telephoneLivreur"
              @click="contacterLivreur(o)"
              class="tap-fx w-full flex items-center justify-center gap-2 bg-sprout text-forest text-xs font-semibold py-2.5 rounded-xl -mt-1"
            >
              <IconSvg name="message" :size="13" color="#1B6B3A" :stroke-width="2" />
              Contacter le livreur
            </button>
          </div>
        </TransitionGroup>
        <p v-if="store.commandesActives.length === 0" class="text-center text-ash text-sm py-8">Aucune commande active pour le moment.</p>
      </div>
    </section>
  </div>
</template>
