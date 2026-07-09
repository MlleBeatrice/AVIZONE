<script setup>
import { ref, computed } from 'vue'
import { useAvizoneStore } from '../stores/avizone.js'
import AppHeader from '../components/AppHeader.vue'
import ProductCard from '../components/ProductCard.vue'
import IconSvg from '../components/IconSvg.vue'

const store = useAvizoneStore()

const zoneFiltre = ref('Toutes')
const catFiltre = ref('Tous')
const ZONES = ['Toutes', 'Calavi', 'Cotonou']
const CATS = ['Tous', 'Poussins', 'Provende', 'Santé']

const produitsFiltres = computed(() =>
  store.products.filter(
    (p) => (zoneFiltre.value === 'Toutes' || p.zone === zoneFiltre.value) && (catFiltre.value === 'Tous' || p.categorie === catFiltre.value)
  )
)

function commander(produit) {
  store.ouvrirTunnel(produit)
}
</script>

<template>
  <div>
    <AppHeader title="Marché ouvert" subtitle="Prix clairs, fournisseurs vérifiés" />

    <section class="px-5 pt-5 space-y-4">
      <p class="text-sm text-ash">Comparez en un instant les offres autour de vous, sans passer par un intermédiaire caché.</p>

      <div class="flex gap-2 overflow-x-auto -mx-5 px-5 pb-1">
        <button
          v-for="z in ZONES"
          :key="z"
          @click="zoneFiltre = z"
          class="tap-fx shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold border"
          :class="zoneFiltre === z ? 'bg-forest text-white border-forest' : 'bg-white text-ash border-black/10'"
        >
          <IconSvg name="pin" :size="13" :color="zoneFiltre === z ? 'white' : '#5B655F'" :stroke-width="2" />
          {{ z }}
        </button>
      </div>

      <div class="flex gap-2 overflow-x-auto -mx-5 px-5 pb-1">
        <button
          v-for="c in CATS"
          :key="c"
          @click="catFiltre = c"
          class="tap-fx shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold"
          :class="catFiltre === c ? 'bg-ink text-white' : 'bg-sprout text-forest'"
        >
          {{ c }}
        </button>
      </div>

      <TransitionGroup name="list-anim" tag="div" class="grid grid-cols-2 gap-3 relative">
        <ProductCard v-for="p in produitsFiltres" :key="p.id" :product="p" @commander="commander" />
      </TransitionGroup>
      <p v-if="produitsFiltres.length === 0" class="text-center text-ash text-sm py-10">Aucun produit pour ces filtres.</p>
    </section>
  </div>
</template>
