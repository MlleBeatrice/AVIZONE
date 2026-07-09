<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAvizoneStore } from '../stores/avizone.js'
import IconSvg from './IconSvg.vue'

const store = useAvizoneStore()
const router = useRouter()
const imgFailed = ref(false)

const produit = computed(() => store.tunnel.produit)
const step = computed(() => store.tunnel.step)

function fmt(n) {
  return Math.round(n || 0).toLocaleString('fr-FR')
}

const sousTotal = computed(() => (produit.value ? produit.value.prix * store.tunnel.quantite : 0))
const distanceKm = computed(() => (produit.value?.zone === 'Cotonou' ? 18 : 8))

const fraisLogistique = computed(() => {
  if (store.tunnel.modeLivraison === 'retrait') return 0
  const base = 500
  const tarifKm = 150
  let frais = base + distanceKm.value * tarifKm
  if (produit.value?.categorie === 'Poussins') frais *= 1.4 // majoration marchandise vivante (règle R-2.2.2)
  return Math.round(frais)
})
const fraisService = computed(() => Math.min(Math.round(sousTotal.value * 0.025), 2000))
const montantTotal = computed(() => sousTotal.value + fraisLogistique.value + fraisService.value)

function fermer() {
  store.fermerTunnel()
}
function precedent() {
  if (step.value === 1) fermer()
  else store.tunnelPrecedent()
}
function suivant() {
  store.tunnelSuivant()
}
function valider() {
  store.confirmerPaiementTunnel(montantTotal.value)
}
function terminerEtRevenir() {
  store.fermerTunnel()
  router.push('/')
}
</script>

<template>
  <Transition name="view-fade">
    <div
      v-if="store.tunnel.ouvert && produit"
      class="fixed inset-0 z-30 bg-sand flex flex-col"
      style="max-width: 460px; margin: 0 auto"
    >
      <header class="px-5 pt-6 pb-4 bg-white border-b border-black/5">
        <div class="flex items-center justify-between mb-4">
          <button
            v-if="step < 4"
            @click="precedent"
            class="tap-fx w-9 h-9 rounded-full bg-sprout flex items-center justify-center"
          >
            <IconSvg name="chevronL" :size="17" color="#1F6F4C" :stroke-width="2" />
          </button>
          <span v-else class="w-9"></span>
          <span class="font-display font-bold text-sm text-ink">{{ step < 4 ? 'Nouvelle commande' : 'Confirmation' }}</span>
          <button v-if="step < 4" @click="fermer" class="tap-fx w-9 h-9 rounded-full bg-sprout flex items-center justify-center">
            <IconSvg name="x" :size="15" color="#1F6F4C" :stroke-width="2" />
          </button>
          <span v-else class="w-9"></span>
        </div>
        <div v-if="step < 4" class="grid grid-cols-3 gap-1.5">
          <div
            v-for="s in [1, 2, 3]"
            :key="s"
            class="h-1.5 rounded-full transition-colors duration-500"
            :class="s <= step ? 'bg-forest' : 'bg-sprout'"
          ></div>
        </div>
      </header>

      <div class="flex-1 overflow-y-auto px-5 py-5">
        <Transition name="step-slide" mode="out-in">
          <!-- ÉTAPE 1 : SÉLECTION -->
          <div v-if="step === 1" key="s1" class="space-y-4">
            <div class="bg-white rounded-2xl p-4 shadow-card flex gap-3">
              <img
                v-if="!imgFailed"
                :src="produit.img"
                @error="imgFailed = true"
                class="w-16 h-16 rounded-xl object-cover"
              />
              <div v-else class="w-16 h-16 rounded-xl bg-sprout flex items-center justify-center">
                <IconSvg name="leaf" :size="22" color="#1F6F4C" :stroke-width="1.5" />
              </div>
              <div class="flex-1">
                <p class="font-semibold text-sm text-ink">{{ produit.nom }}</p>
                <p class="text-xs text-ash mt-0.5">{{ produit.fournisseur }} · {{ produit.zone }}</p>
                <p class="font-display font-bold text-forest text-sm mt-1">{{ fmt(produit.prix) }} FCFA/{{ produit.unite }}</p>
              </div>
            </div>

            <div class="bg-white rounded-2xl p-4 shadow-card">
              <p class="text-xs font-semibold text-ash mb-2.5">QUANTITÉ (minimum {{ produit.moq }})</p>
              <div class="flex items-center justify-between">
                <button
                  @click="store.ajusterQuantiteTunnel(-1)"
                  class="tap-fx w-10 h-10 rounded-xl bg-sprout flex items-center justify-center"
                >
                  <IconSvg name="minus" :size="16" color="#1F6F4C" :stroke-width="2" />
                </button>
                <span class="font-display font-extrabold text-2xl text-ink">{{ store.tunnel.quantite }}</span>
                <button
                  @click="store.ajusterQuantiteTunnel(1)"
                  class="tap-fx w-10 h-10 rounded-xl bg-forest flex items-center justify-center"
                >
                  <IconSvg name="plus" :size="16" color="white" :stroke-width="2" />
                </button>
              </div>
            </div>

            <div class="bg-sprout rounded-2xl p-4 flex justify-between items-center">
              <span class="text-sm font-semibold text-forest">Sous-total</span>
              <span class="font-display font-extrabold text-forest">{{ fmt(sousTotal) }} FCFA</span>
            </div>
          </div>

          <!-- ÉTAPE 2 : LIVRAISON -->
          <div v-else-if="step === 2" key="s2" class="space-y-3">
            <p class="text-xs font-semibold text-ash mb-1">MODE DE LIVRAISON</p>

            <button
              @click="store.tunnel.modeLivraison = 'securisee'"
              class="tap-fx w-full text-left bg-white rounded-2xl p-4 shadow-card border-2"
              :class="store.tunnel.modeLivraison === 'securisee' ? 'border-forest' : 'border-transparent'"
            >
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-sprout flex items-center justify-center shrink-0">
                  <IconSvg name="truck" :size="18" color="#1F6F4C" :stroke-width="1.8" />
                </div>
                <div class="flex-1">
                  <p class="font-semibold text-sm text-ink">Livraison sécurisée AVIZONE</p>
                  <p class="text-xs text-ash mt-0.5">Prestataire spécialisé, suivi GPS temps réel</p>
                </div>
              </div>
            </button>

            <button
              @click="store.tunnel.modeLivraison = 'retrait'"
              class="tap-fx w-full text-left bg-white rounded-2xl p-4 shadow-card border-2"
              :class="store.tunnel.modeLivraison === 'retrait' ? 'border-forest' : 'border-transparent'"
            >
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-sprout flex items-center justify-center shrink-0">
                  <IconSvg name="pin" :size="18" color="#1F6F4C" :stroke-width="1.8" />
                </div>
                <div class="flex-1">
                  <p class="font-semibold text-sm text-ink">Retrait sur place</p>
                  <p class="text-xs text-ash mt-0.5">Chez {{ produit.fournisseur }}</p>
                </div>
                <span class="font-display font-bold text-forest text-sm">Gratuit</span>
              </div>
            </button>

            <div class="bg-white rounded-2xl p-4 shadow-card space-y-1.5 text-sm mt-4">
              <div class="flex justify-between"><span class="text-ash">Sous-total produits</span><span class="text-ink font-medium">{{ fmt(sousTotal) }} FCFA</span></div>
              <div class="flex justify-between"><span class="text-ash">Frais logistiques</span><span class="text-ink font-medium">{{ fmt(fraisLogistique) }} FCFA</span></div>
              <div class="flex justify-between"><span class="text-ash">Frais de service (2,5%)</span><span class="text-ink font-medium">{{ fmt(fraisService) }} FCFA</span></div>
              <div class="flex justify-between pt-1.5 border-t border-black/5">
                <span class="font-semibold text-ink">Total</span>
                <span class="font-display font-extrabold text-forest">{{ fmt(montantTotal) }} FCFA</span>
              </div>
            </div>
          </div>

          <!-- ÉTAPE 3 : PAIEMENT -->
          <div v-else-if="step === 3" key="s3" class="space-y-3">
            <p class="text-xs font-semibold text-ash mb-1">MODE DE PAIEMENT</p>
            <button
              @click="store.tunnel.modePaiement = 'mobilemoney'"
              class="tap-fx w-full text-left bg-white rounded-2xl p-4 shadow-card border-2 flex items-center gap-3"
              :class="store.tunnel.modePaiement === 'mobilemoney' ? 'border-forest' : 'border-transparent'"
            >
              <div class="w-10 h-10 rounded-xl bg-sprout flex items-center justify-center">
                <IconSvg name="wallet" :size="18" color="#1F6F4C" :stroke-width="1.8" />
              </div>
              <p class="font-semibold text-sm text-ink">Mobile Money</p>
            </button>
            <button
              @click="store.tunnel.modePaiement = 'especes'"
              class="tap-fx w-full text-left bg-white rounded-2xl p-4 shadow-card border-2 flex items-center gap-3"
              :class="store.tunnel.modePaiement === 'especes' ? 'border-forest' : 'border-transparent'"
            >
              <div class="w-10 h-10 rounded-xl bg-sprout flex items-center justify-center">
                <IconSvg name="cart" :size="18" color="#1F6F4C" :stroke-width="1.8" />
              </div>
              <p class="font-semibold text-sm text-ink">Espèces à la livraison</p>
            </button>

            <div class="bg-ink rounded-2xl p-4 mt-4">
              <div class="flex justify-between items-center">
                <span class="text-white/60 text-sm">Montant à régler</span>
                <span class="font-display font-extrabold text-white text-xl">{{ fmt(montantTotal) }} FCFA</span>
              </div>
            </div>

            <button @click="valider" class="tap-fx w-full bg-forest text-white font-display font-bold py-3.5 rounded-2xl shadow-pop mt-2">
              Confirmer et payer
            </button>
          </div>

          <!-- ÉTAPE 4 : CONFIRMATION -->
          <div v-else key="s4" class="flex flex-col items-center text-center pt-10">
            <div class="w-24 h-24 rounded-full bg-sprout flex items-center justify-center">
              <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="#1F6F4C" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
                <path class="check-path" d="m5 13 4 4L19 7" />
              </svg>
            </div>
            <h2 class="font-display font-extrabold text-xl text-ink mt-5">Commande envoyée</h2>
            <p class="text-sm text-ash mt-1.5 max-w-[260px]">
              {{ produit.fournisseur }} a reçu votre commande et dispose d'un délai pour la valider.
            </p>
            <div class="bg-white rounded-2xl p-4 shadow-card w-full mt-6 text-left space-y-1.5 text-sm">
              <div class="flex justify-between"><span class="text-ash">Référence</span><span class="font-semibold text-ink">{{ store.tunnel.derniereCommande?.ref }}</span></div>
              <div class="flex justify-between"><span class="text-ash">Produit</span><span class="font-semibold text-ink">{{ store.tunnel.derniereCommande?.produit }}</span></div>
              <div class="flex justify-between"><span class="text-ash">Montant</span><span class="font-semibold text-forest">{{ fmt(store.tunnel.derniereCommande?.montant) }} FCFA</span></div>
            </div>
            <button @click="terminerEtRevenir" class="tap-fx w-full bg-ink text-white font-display font-bold py-3.5 rounded-2xl mt-6">
              Retour au tableau de bord
            </button>
          </div>
        </Transition>
      </div>

      <div v-if="step === 1" class="p-5 bg-white border-t border-black/5">
        <button @click="suivant" class="tap-fx w-full bg-forest text-white font-display font-bold py-3.5 rounded-2xl shadow-pop flex items-center justify-center gap-2">
          Choisir la livraison
          <IconSvg name="chevronR" :size="16" color="white" :stroke-width="2.2" />
        </button>
      </div>
      <div v-else-if="step === 2" class="p-5 bg-white border-t border-black/5">
        <button @click="suivant" class="tap-fx w-full bg-forest text-white font-display font-bold py-3.5 rounded-2xl shadow-pop flex items-center justify-center gap-2">
          Passer au paiement
          <IconSvg name="chevronR" :size="16" color="white" :stroke-width="2.2" />
        </button>
      </div>
    </div>
  </Transition>
</template>
