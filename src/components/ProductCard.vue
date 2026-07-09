<script setup>
import { ref } from 'vue'
import IconSvg from './IconSvg.vue'

const props = defineProps({
  product: { type: Object, required: true },
})
const emit = defineEmits(['commander'])

const imgFailed = ref(false)

function fmt(n) {
  return Math.round(n).toLocaleString('fr-FR')
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
        <IconSvg name="leaf" :size="30" color="#1F6F4C" :stroke-width="1.5" />
      </div>
      <span
        v-if="product.verifie"
        class="absolute top-2 left-2 bg-forest/95 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1"
      >
        <IconSvg name="shield" :size="10" color="white" :stroke-width="2.4" />
        Vérifié
      </span>
      <span class="absolute bottom-2 right-2 bg-white/90 text-ink text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
        <IconSvg name="star" :size="9" color="#C98A2E" :stroke-width="2" />
        {{ product.note }}
      </span>
    </div>
    <div class="p-3 flex-1 flex flex-col">
      <p class="font-semibold text-[13px] text-ink leading-snug">{{ product.nom }}</p>
      <p class="text-[11px] text-ash mt-0.5 flex items-center gap-1">
        <IconSvg name="pin" :size="10" color="#5B655F" :stroke-width="2" />
        {{ product.fournisseur }} · {{ product.zone }}
      </p>
      <p class="font-display font-extrabold text-forest text-[15px] mt-1.5">
        {{ fmt(product.prix) }} <span class="text-[10px] font-body font-normal text-ash">FCFA/{{ product.unite }}</span>
      </p>
      <button
        @click="emit('commander', product)"
        class="tap-fx mt-2 w-full bg-ink text-white text-xs font-semibold py-2 rounded-xl flex items-center justify-center gap-1.5"
      >
        <IconSvg name="cart" :size="13" color="white" :stroke-width="2" />
        Commander
      </button>
    </div>
  </div>
</template>
