<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAvizoneStore } from '../stores/avizone.js'
import IconSvg from '../components/IconSvg.vue'

const store = useAvizoneStore()
const router = useRouter()

function fmt(n) {
  return Math.round(n).toLocaleString('fr-FR')
}

const total = computed(() => store.panier.reduce((s, i) => s + i.prix * i.quantite, 0))

function commanderArticle(item) {
  const produit = store.products.find((p) => p.id === item.id)
  if (produit) {
    router.push('/marche')
    store.ouvrirTunnel(produit)
  }
}
</script>

<template>
  <div>
    <header class="sticky top-0 z-20 bg-forest text-white px-5 pt-6 pb-4 rounded-b-3xl shadow-pop">
      <div class="flex items-center gap-3">
        <button @click="router.back()" class="tap-fx w-9 h-9 rounded-full bg-white/15 flex items-center justify-center">
          <IconSvg name="arrowLeft" :size="17" color="white" :stroke-width="2" />
        </button>
        <span class="font-display font-extrabold text-lg">Mon panier</span>
      </div>
    </header>

    <section class="px-5 pt-5 space-y-3 pb-6">
      <TransitionGroup name="list-anim" tag="div" class="space-y-3 relative">
        <div v-for="item in store.panier" :key="item.id" class="bg-white rounded-2xl p-4 shadow-card flex items-center gap-3">
          <div class="flex-1">
            <p class="font-semibold text-sm text-ink">{{ item.nom }}</p>
            <p class="text-xs text-ash mt-0.5">{{ item.quantite }} {{ item.unite }}(s) · {{ fmt(item.prix) }} FCFA/{{ item.unite }}</p>
          </div>
          <button @click="commanderArticle(item)" class="tap-fx bg-forest text-white text-xs font-semibold px-3 py-2 rounded-xl">Commander</button>
          <button @click="store.retirerDuPanier(item.id)" class="tap-fx w-8 h-8 rounded-full bg-sprout flex items-center justify-center">
            <IconSvg name="x" :size="13" color="#1B6B3A" :stroke-width="2" />
          </button>
        </div>
      </TransitionGroup>

      <p v-if="store.panier.length === 0" class="text-center text-ash text-sm py-16">
        Votre panier est vide pour le moment.<br />Ajoutez des produits depuis le Marché.
      </p>

      <div v-if="store.panier.length" class="bg-ink text-white rounded-2xl p-4 flex justify-between items-center">
        <span class="text-white/60 text-sm">Total estimé</span>
        <span class="font-display font-extrabold text-lg">{{ fmt(total) }} FCFA</span>
      </div>
    </section>
  </div>
</template>
