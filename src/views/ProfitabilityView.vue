<script setup>
import { ref, computed } from 'vue'
import { useAvizoneStore } from '../stores/avizone.js'
import AppHeader from '../components/AppHeader.vue'
import IconSvg from '../components/IconSvg.vue'

const store = useAvizoneStore()
const sim = store.simulation // objet réactif Pinia

const calculEnCours = ref(false)
const resultatsVisibles = ref(false)

function fmt(n) {
  return Math.round(n).toLocaleString('fr-FR')
}

// Hypothèse interne de consommation (non exposée à l'écran pour rester sur les
// 3 champs simplifiés demandés) : 4,2 kg de provende par sujet sur le cycle.
const CONSO_PAR_SUJET_KG = 4.2
const TAUX_VACCINS_SOINS = 0.10

const coutPoussins = computed(() => sim.nbPoussins * sim.prixPoussin)
const sacsNecessaires = computed(() => Math.ceil((sim.nbPoussins * CONSO_PAR_SUJET_KG) / 50))
const coutProvende = computed(() => sacsNecessaires.value * sim.prixSac)
const coutVaccinsSoins = computed(() => (coutPoussins.value + coutProvende.value) * TAUX_VACCINS_SOINS)
const coutTotalIntrants = computed(() => coutPoussins.value + coutProvende.value + coutVaccinsSoins.value)
const revenuEstime = computed(() => sim.nbPoussins * sim.prixVente)
const margeNette = computed(() => revenuEstime.value - coutTotalIntrants.value)
const margePositive = computed(() => margeNette.value >= 0)
const seuilRentabilite = computed(() => (sim.prixVente > 0 ? Math.ceil(coutTotalIntrants.value / sim.prixVente) : 0))

const maxBarre = computed(() => Math.max(coutPoussins.value, coutProvende.value, coutVaccinsSoins.value, 1))
const barres = computed(() => [
  { label: 'Poussins', valeur: coutPoussins.value, couleur: '#1B6B3A' },
  { label: 'Provende', valeur: coutProvende.value, couleur: '#4CAF50' },
  { label: 'Vaccins/soins', valeur: coutVaccinsSoins.value, couleur: '#F9A826' },
])

function calculer() {
  calculEnCours.value = true
  resultatsVisibles.value = false
  setTimeout(() => {
    calculEnCours.value = false
    resultatsVisibles.value = true
  }, 1000)
}

function enregistrer() {
  store.enregistrerSimulation({
    nbPoussins: sim.nbPoussins,
    coutTotalIntrants: coutTotalIntrants.value,
    margeNette: margeNette.value,
  })
}
</script>

<template>
  <div>
    <AppHeader title="Simulation" subtitle="Estimez votre rentabilité" />

    <section class="px-5 pt-5 space-y-5">
      <div>
        <h1 class="font-display font-extrabold text-xl text-ink">Simulez la rentabilité de votre élevage</h1>
        <p class="text-sm text-ash mt-1">Renseignez vos hypothèses, puis lancez le calcul.</p>
      </div>

      <div class="bg-white rounded-2xl p-4 shadow-card space-y-4">
        <div>
          <div class="flex justify-between text-xs mb-1">
            <span class="font-semibold text-ink">Nombre de poussins</span>
            <span class="text-forest font-semibold">{{ sim.nbPoussins }}</span>
          </div>
          <input type="range" min="0" max="2000" step="10" v-model.number="sim.nbPoussins" class="w-full accent-forest" />
        </div>

        <div>
          <label class="text-xs font-semibold text-ash mb-1 block">Coût d'achat des poussins (FCFA / unité)</label>
          <input type="number" v-model.number="sim.prixPoussin" class="w-full bg-sand rounded-xl px-3 py-2.5 text-sm outline-none" />
        </div>
        <div>
          <label class="text-xs font-semibold text-ash mb-1 block">Coût de la provende (FCFA / sac de 50kg)</label>
          <input type="number" v-model.number="sim.prixSac" class="w-full bg-sand rounded-xl px-3 py-2.5 text-sm outline-none" />
        </div>
        <div>
          <label class="text-xs font-semibold text-ash mb-1 block">Prix de vente estimé (FCFA / poulet)</label>
          <input type="number" v-model.number="sim.prixVente" class="w-full bg-sand rounded-xl px-3 py-2.5 text-sm outline-none" />
        </div>

        <button
          @click="calculer"
          class="tap-fx w-full bg-amber text-ink font-display font-bold py-3.5 rounded-2xl shadow-pop flex items-center justify-center gap-2"
        >
          <svg v-if="calculEnCours" class="spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2D2A24" stroke-width="3">
            <circle cx="12" cy="12" r="9" stroke-opacity="0.25" />
            <path d="M21 12a9 9 0 0 0-9-9" stroke-linecap="round" />
          </svg>
          {{ calculEnCours ? 'Calcul en cours…' : 'Calculer' }}
        </button>
      </div>

      <Transition name="view-fade">
        <div v-if="resultatsVisibles" class="space-y-4">
          <div class="grid grid-cols-2 gap-3">
            <div class="bg-white rounded-2xl p-3.5 shadow-card">
              <p class="text-[10px] text-ash">Coût total des intrants</p>
              <p class="font-display font-extrabold text-ink text-base mt-1">{{ fmt(coutTotalIntrants) }}</p>
              <p class="text-[10px] text-ash">FCFA</p>
            </div>
            <div class="bg-white rounded-2xl p-3.5 shadow-card">
              <p class="text-[10px] text-ash">Revenu estimé</p>
              <p class="font-display font-extrabold text-ink text-base mt-1">{{ fmt(revenuEstime) }}</p>
              <p class="text-[10px] text-ash">FCFA</p>
            </div>
            <div class="bg-white rounded-2xl p-3.5 shadow-card" :class="margePositive ? '' : 'ring-2 ring-rust/30'">
              <p class="text-[10px] text-ash">Marge nette</p>
              <p class="font-display font-extrabold text-base mt-1" :class="margePositive ? 'text-forest' : 'text-rust'">
                {{ fmt(margeNette) }}
              </p>
              <p class="text-[10px] text-ash">FCFA</p>
            </div>
            <div class="bg-white rounded-2xl p-3.5 shadow-card">
              <p class="text-[10px] text-ash">Seuil de rentabilité</p>
              <p class="font-display font-extrabold text-ink text-base mt-1">{{ seuilRentabilite }}</p>
              <p class="text-[10px] text-ash">poulets à vendre</p>
            </div>
          </div>

          <div class="bg-white rounded-2xl p-4 shadow-card">
            <p class="text-xs font-semibold text-ink mb-3">Répartition des coûts</p>
            <div class="flex items-end justify-around h-28">
              <div v-for="b in barres" :key="b.label" class="flex flex-col items-center gap-1.5 w-16">
                <span class="text-[10px] font-semibold text-ink">{{ fmt(b.valeur) }}</span>
                <div
                  class="bar-grow w-8 rounded-t-md"
                  :style="{ height: Math.max(6, (b.valeur / maxBarre) * 90) + 'px', background: b.couleur }"
                ></div>
                <span class="text-[9.5px] text-ash text-center leading-tight">{{ b.label }}</span>
              </div>
            </div>
          </div>

          <button
            @click="enregistrer"
            class="tap-fx w-full bg-forest text-white font-display font-bold py-3.5 rounded-2xl shadow-pop flex items-center justify-center gap-2"
          >
            <IconSvg name="check" :size="16" color="white" :stroke-width="2.4" />
            Enregistrer cette simulation
          </button>

          <div v-if="sim.historique.length" class="space-y-2">
            <p class="text-xs font-semibold text-ash">Simulations enregistrées</p>
            <div v-for="(h, i) in sim.historique.slice(0, 3)" :key="i" class="bg-white rounded-xl p-3 shadow-card flex justify-between text-xs">
              <span class="text-ash">{{ h.date }} · {{ h.nbPoussins }} poussins</span>
              <span :class="h.margeNette >= 0 ? 'text-forest' : 'text-rust'" class="font-semibold">{{ fmt(h.margeNette) }} FCFA</span>
            </div>
          </div>
        </div>
      </Transition>
    </section>
  </div>
</template>
