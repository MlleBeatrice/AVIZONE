<script setup>
import { ref } from 'vue'
import { useAvizoneStore } from '../stores/avizone.js'
import IconSvg from './IconSvg.vue'

const props = defineProps({
  product: { type: Object, required: true },
})

const store = useAvizoneStore()
const imgFailed = ref(false)

function fmt(n) {
  return Math.round(n).toLocaleString('fr-FR')
}
function ajouter() {
  if (!props.product.disponible) return
  store.ajouterAuPanier(props.product)
}
function contacter() {
  store.contacterFournisseur(props.product)
}
</script>

<template>
  <div class="bg-white rounded-2xl overflow-hidden shadow-card flex flex-col">
    <div class="relative h-28 bg-sprout">
      <img
        v-if="!imgFailed"
        :src="product.img"
        @error="imgFailed = true"
        class="w-full h-full object-cover"
        :alt="product.nom"
        loading="lazy"
      />
      <div v-else class="absolute inset-0 flex items-center justify-center bg-sprout">
        <IconSvg name="leaf" :size="30" color="#1B6B3A" :stroke-width="1.5" />
      </div>
      <span
        v-if="product.verifie"
        class="absolute top-2 left-2 bg-forest/95 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1"
      >
        <IconSvg name="shield" :size="10" color="white" :stroke-width="2.4" />
        Vérifié
      </span>
      <span v-if="!product.disponible" class="absolute inset-0 bg-ink/55 flex items-center justify-center text-white text-xs font-semibold">
        Rupture de stock
      </span>
    </div>
    <div class="p-3 flex-1 flex flex-col">
      <p class="font-semibold text-[13px] text-ink leading-snug">{{ product.nom }}</p>
      <p class="text-[11px] text-ash mt-0.5">{{ product.fournisseur }}</p>
      <p class="text-[11px] text-ash mt-0.5 flex items-center gap-1">
        <IconSvg name="pin" :size="10" color="#6B6459" :stroke-width="2" />
        {{ product.zone }}, à {{ product.distanceKm }} km
      </p>
      <p class="text-[11px] text-ink mt-0.5 flex items-center gap-1">
        <IconSvg name="star" :size="10" color="#F9A826" :stroke-width="2" />
        <span class="font-semibold">{{ product.note }}/5</span>
        <span class="text-ash">· {{ product.avis }} avis</span>
      </p>
      <p class="font-display font-extrabold text-forest text-[15px] mt-1.5">
        {{ fmt(product.prix) }} <span class="text-[10px] font-body font-normal text-ash">FCFA/{{ product.unite }}</span>
      </p>
      <div class="grid grid-cols-2 gap-1.5 mt-2">
        <button
          @click="ajouter"
          :disabled="!product.disponible"
          class="tap-fx bg-amber text-ink text-[11px] font-semibold py-2 rounded-xl flex items-center justify-center gap-1 disabled:opacity-40"
        >
          <IconSvg name="cart" :size="12" color="#2D2A24" :stroke-width="2" />
          Ajouter
        </button>
        <button @click="contacter" class="tap-fx bg-forest text-white text-[11px] font-semibold py-2 rounded-xl flex items-center justify-center gap-1">
          <IconSvg name="message" :size="12" color="white" :stroke-width="2" />
          Contacter
        </button>
      </div>
    </div>
  </div>
</template>
