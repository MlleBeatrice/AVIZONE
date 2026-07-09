<script setup>
import IconSvg from './IconSvg.vue'

defineProps({
  title: { type: String, default: 'AVIZONE' },
  subtitle: { type: String, default: '' },
})
</script>

<template>
  <header class="sticky top-0 z-20 bg-forest text-white px-5 pt-6 pb-4 rounded-b-3xl shadow-pop">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2.5">
        <IconSvg name="leaf" :size="26" color="white" :stroke-width="1.8" />
        <div>
          <span class="font-display font-extrabold text-xl tracking-tight block leading-none">{{ title }}</span>
          <span v-if="subtitle" class="text-[11px] text-white/70">{{ subtitle }}</span>
        </div>
      </div>
      <button class="tap-fx relative w-10 h-10 rounded-full bg-white/15 flex items-center justify-center">
        <IconSvg name="bell" :size="19" color="white" :stroke-width="1.8" />
        <span class="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-amber badge-pulse"></span>
      </button>
    </div>
  </header>
</template>
