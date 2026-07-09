<script setup>
import { computed } from 'vue'
import { useAvizoneStore } from '../stores/avizone.js'
import AppHeader from '../components/AppHeader.vue'
import GrowthRing from '../components/GrowthRing.vue'

const store = useAvizoneStore()
const sim = store.simulation // objet réactif (Pinia) : chaque modification recalcule tout instantanément

function fmt(n) {
  return Math.round(n).toLocaleString('fr-FR')
}

const sujetsSurvivants = computed(() => Math.round(sim.nbPoussins * (1 - sim.mortalite / 100)))
const coutPoussins = computed(() => sim.nbPoussins * sim.prixPoussin)
const sacsNecessaires = computed(() => Math.ceil((sim.nbPoussins * sim.consoParSujet) / 50))
const coutProvende = computed(() => sacsNecessaires.value * sim.prixSac)
const coutTotal = computed(() => coutPoussins.value + coutProvende.value)
const coutParSujet = computed(() => (sujetsSurvivants.value > 0 ? coutTotal.value / sujetsSurvivants.value : 0))
const margeUnitaire = computed(() => sim.prixVente - coutParSujet.value)
const margeTotale = computed(() => margeUnitaire.value * sujetsSurvivants.value)
const ratioMarge = computed(() => (sim.prixVente ? margeUnitaire.value / sim.prixVente : 0))
const margePositive = computed(() => margeUnitaire.value >= 0)
</script>

<template>
  <div>
    <AppHeader title="Ma rentabilité" subtitle="Simulation instantanée" />

    <section class="px-5 pt-5 space-y-5">
      <p class="text-sm text-ash">Ajustez les curseurs : la marge estimée se recalcule à l'instant, sans rien valider.</p>

      <div class="bg-white rounded-3xl p-5 shadow-card flex flex-col items-center">
        <GrowthRing :ratio="ratioMarge" :positive="margePositive" :size="144">
          <span class="text-[10px] text-ash">Marge / sujet</span>
          <span class="font-display font-extrabold text-lg" :class="margePositive ? 'text-forest' : 'text-rust'">
            {{ fmt(margeUnitaire) }}
          </span>
          <span class="text-[10px] text-ash">FCFA</span>
        </GrowthRing>
        <p class="mt-3 text-sm text-center" :class="margePositive ? 'text-forest' : 'text-rust'">
          Marge totale estimée : <span class="font-bold">{{ fmt(margeTotale) }} FCFA</span>
        </p>
      </div>

      <div class="bg-white rounded-2xl p-4 shadow-card space-y-4">
        <div>
          <div class="flex justify-between text-xs mb-1">
            <span class="font-semibold text-ink">Nombre de poussins</span><span class="text-forest font-semibold">{{ sim.nbPoussins }}</span>
          </div>
          <input type="range" min="50" max="2000" step="10" v-model.number="sim.nbPoussins" class="w-full accent-forest" />
        </div>
        <div>
          <div class="flex justify-between text-xs mb-1">
            <span class="font-semibold text-ink">Prix d'achat / poussin (FCFA)</span><span class="text-forest font-semibold">{{ sim.prixPoussin }}</span>
          </div>
          <input type="range" min="200" max="600" step="5" v-model.number="sim.prixPoussin" class="w-full accent-forest" />
        </div>
        <div>
          <div class="flex justify-between text-xs mb-1">
            <span class="font-semibold text-ink">Prix du sac de provende 50kg (FCFA)</span><span class="text-forest font-semibold">{{ fmt(sim.prixSac) }}</span>
          </div>
          <input type="range" min="15000" max="28000" step="250" v-model.number="sim.prixSac" class="w-full accent-forest" />
        </div>
        <div>
          <div class="flex justify-between text-xs mb-1">
            <span class="font-semibold text-ink">Taux de mortalité estimé (%)</span><span class="text-forest font-semibold">{{ sim.mortalite }}%</span>
          </div>
          <input type="range" min="0" max="30" step="1" v-model.number="sim.mortalite" class="w-full accent-forest" />
        </div>
        <div>
          <div class="flex justify-between text-xs mb-1">
            <span class="font-semibold text-ink">Prix de vente cible / sujet (FCFA)</span><span class="text-forest font-semibold">{{ sim.prixVente }}</span>
          </div>
          <input type="range" min="800" max="3000" step="25" v-model.number="sim.prixVente" class="w-full accent-forest" />
        </div>
      </div>

      <div class="bg-ink text-white rounded-2xl p-4 space-y-2 text-sm mb-4">
        <div class="flex justify-between"><span class="text-white/60">Sujets survivants estimés</span><span class="font-semibold">{{ sujetsSurvivants }}</span></div>
        <div class="flex justify-between"><span class="text-white/60">Coût poussins</span><span class="font-semibold">{{ fmt(coutPoussins) }} FCFA</span></div>
        <div class="flex justify-between"><span class="text-white/60">Sacs de provende nécessaires</span><span class="font-semibold">{{ sacsNecessaires }}</span></div>
        <div class="flex justify-between"><span class="text-white/60">Coût de revient / sujet</span><span class="font-semibold">{{ fmt(coutParSujet) }} FCFA</span></div>
      </div>
    </section>
  </div>
</template>
