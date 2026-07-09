<script setup>
import { ref, computed } from 'vue'
import { useAvizoneStore } from '../stores/avizone.js'
import AppHeader from '../components/AppHeader.vue'
import OrderCard from '../components/OrderCard.vue'

const store = useAvizoneStore()
const filtre = ref('toutes') // toutes | actives | terminees

const commandesAffichees = computed(() => {
  if (filtre.value === 'actives') return store.commandesActives
  if (filtre.value === 'terminees') return store.commandesTerminees
  return store.orders
})
</script>

<template>
  <div>
    <AppHeader title="Mes commandes" subtitle="Suivi complet, en temps réel" />

    <section class="px-5 pt-5 space-y-4">
      <div class="flex gap-2">
        <button
          v-for="f in [
            { k: 'toutes', l: 'Toutes' },
            { k: 'actives', l: 'En cours' },
            { k: 'terminees', l: 'Terminées' },
          ]"
          :key="f.k"
          @click="filtre = f.k"
          class="tap-fx flex-1 px-3 py-2 rounded-full text-xs font-semibold"
          :class="filtre === f.k ? 'bg-forest text-white' : 'bg-sprout text-forest'"
        >
          {{ f.l }}
        </button>
      </div>

      <TransitionGroup name="list-anim" tag="div" class="space-y-3 relative">
        <OrderCard v-for="o in commandesAffichees" :key="o.id" :order="o" />
      </TransitionGroup>
      <p v-if="commandesAffichees.length === 0" class="text-center text-ash text-sm py-10">Aucune commande dans cette catégorie.</p>
    </section>
  </div>
</template>
