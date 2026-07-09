<script setup>
defineProps({
  order: { type: Object, required: true },
})

const STEP_LABELS = ['Créée', 'Validation', 'Préparation', 'Livraison', 'Livrée']

function fmt(n) {
  return Math.round(n).toLocaleString('fr-FR')
}
</script>

<template>
  <div class="bg-white rounded-2xl p-4 shadow-card">
    <div class="flex items-start justify-between gap-2">
      <div>
        <p class="font-semibold text-sm text-ink">{{ order.produit }}</p>
        <p class="text-xs text-ash mt-0.5">{{ order.fournisseur }} · {{ order.ref }}</p>
      </div>
      <span
        class="text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap"
        :class="order.etape >= 4 ? 'bg-sprout text-forest' : 'bg-amber-light text-amber'"
      >
        {{ order.statut }}
      </span>
    </div>
    <div class="mt-3 h-1.5 rounded-full bg-sprout overflow-hidden">
      <div class="h-full rounded-full bg-forest transition-all duration-700 ease-out" :style="{ width: order.progression + '%' }"></div>
    </div>
    <div class="flex justify-between mt-1.5 text-[10.5px] text-ash">
      <span v-for="(lbl, i) in STEP_LABELS" :key="i" :class="i <= order.etape ? 'text-forest font-semibold' : ''">{{ lbl }}</span>
    </div>
    <div class="flex justify-between items-center mt-3 pt-2.5 border-t border-black/5">
      <span class="text-[11px] text-ash">{{ order.date }}</span>
      <span class="font-display font-bold text-sm text-ink">{{ fmt(order.montant) }} FCFA</span>
    </div>
  </div>
</template>
