<script setup>
import { ref, computed } from 'vue'
import { useAvizoneStore } from '../stores/avizone.js'
import AppHeader from '../components/AppHeader.vue'
import ProductCard from '../components/ProductCard.vue'
import IconSvg from '../components/IconSvg.vue'

const store = useAvizoneStore()

const recherche = ref('')
const zoneFiltre = ref('Toutes')
const catFiltre = ref('Tous')
const disponibleUniquement = ref(false)
const verifieUniquement = ref(false)

const ZONES = ['Toutes', 'Calavi', 'Cotonou']
const CATS = ['Tous', 'Poussins', 'Provende', 'Vaccins', 'Matériel']

const produitsFiltres = computed(() =>
  store.products.filter((p) => {
    const matchRecherche =
      !recherche.value ||
      p.nom.toLowerCase().includes(recherche.value.toLowerCase()) ||
      p.fournisseur.toLowerCase().includes(recherche.value.toLowerCase()) ||
      p.zone.toLowerCase().includes(recherche.value.toLowerCase())
    const matchZone = zoneFiltre.value === 'Toutes' || p.zone === zoneFiltre.value
    const matchCat = catFiltre.value === 'Tous' || p.categorie === catFiltre.value
    const matchDispo = !disponibleUniquement.value || p.disponible
    const matchVerifie = !verifieUniquement.value || p.verifie
    return matchRecherche && matchZone && matchCat && matchDispo && matchVerifie
  })
)
</script>

<template>
  <div>
    <AppHeader title="Marché ouvert" subtitle="Prix clairs, fournisseurs vérifiés" :show-cart="true" />

    <section class="px-5 pt-5 space-y-4">
      <div class="relative">
        <IconSvg name="search" :size="16" color="#6B6459" :stroke-width="2" class="absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          v-model="recherche"
          type="text"
          placeholder="Rechercher un produit, un fournisseur, une zone…"
          class="w-full bg-white rounded-2xl shadow-card pl-10 pr-4 py-3 text-sm outline-none"
        />
      </div>

      <div class="flex gap-2 overflow-x-auto -mx-5 px-5 pb-1">
        <button
          v-for="z in ZONES"
          :key="z"
          @click="zoneFiltre = z"
          class="tap-fx shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold border"
          :class="zoneFiltre === z ? 'bg-forest text-white border-forest' : 'bg-white text-ash border-black/10'"
        >
          <IconSvg name="pin" :size="13" :color="zoneFiltre === z ? 'white' : '#6B6459'" :stroke-width="2" />
          {{ z === 'Toutes' ? z : 'Près de ' + z }}
        </button>
        <button
          @click="disponibleUniquement = !disponibleUniquement"
          class="tap-fx shrink-0 px-3.5 py-2 rounded-full text-xs font-semibold border"
          :class="disponibleUniquement ? 'bg-forest text-white border-forest' : 'bg-white text-ash border-black/10'"
        >
          Disponible immédiatement
        </button>
        <button
          @click="verifieUniquement = !verifieUniquement"
          class="tap-fx shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold border"
          :class="verifieUniquement ? 'bg-forest text-white border-forest' : 'bg-white text-ash border-black/10'"
        >
          <IconSvg name="shield" :size="12" :color="verifieUniquement ? 'white' : '#6B6459'" :stroke-width="2.2" />
          Vérifié
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
        <ProductCard v-for="p in produitsFiltres" :key="p.id" :product="p" />
      </TransitionGroup>
      <p v-if="produitsFiltres.length === 0" class="text-center text-ash text-sm py-10">Aucun produit pour ces filtres.</p>
    </section>
  </div>
</template>
