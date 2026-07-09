<script setup>
import { computed } from 'vue'

const props = defineProps({
  ratio: { type: Number, required: true }, // -1 (perte totale) .. 1 (marge = prix de vente)
  size: { type: Number, default: 144 },
  positive: { type: Boolean, default: true },
})

const radius = computed(() => props.size / 2 - 18)
const circumference = computed(() => 2 * Math.PI * radius.value)
const offset = computed(() => {
  const pct = (props.ratio + 1) / 2
  return circumference.value * (1 - Math.max(0, Math.min(1, pct)))
})
</script>

<template>
  <div class="relative" :style="{ width: size + 'px', height: size + 'px' }">
    <svg :width="size" :height="size" :viewBox="`0 0 ${size} ${size}`" class="growth-ring -rotate-90">
      <circle :cx="size / 2" :cy="size / 2" :r="radius" fill="none" stroke="#E9F4EC" stroke-width="12" />
      <circle
        :cx="size / 2"
        :cy="size / 2"
        :r="radius"
        fill="none"
        :stroke="positive ? '#1F6F4C' : '#B4432F'"
        stroke-width="12"
        stroke-linecap="round"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="offset"
      />
    </svg>
    <div class="absolute inset-0 flex flex-col items-center justify-center">
      <slot />
    </div>
  </div>
</template>
