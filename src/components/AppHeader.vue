<script setup>
import { useRouter } from 'vue-router'
import { useAvizoneStore } from '../stores/avizone.js'
import IconSvg from './IconSvg.vue'

defineProps({
  title: { type: String, default: 'AVIZONE' },
  subtitle: { type: String, default: '' },
  showCart: { type: Boolean, default: false },
})

const router = useRouter()
const store = useAvizoneStore()
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
      <div class="flex items-center gap-2">
        <button v-if="showCart" @click="router.push('/panier')" class="tap-fx relative w-10 h-10 rounded-full bg-white/15 flex items-center justify-center">
          <IconSvg name="cart" :size="18" color="white" :stroke-width="1.8" />
          <span
            v-if="store.nombreArticlesPanier > 0"
            class="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-amber text-ink text-[10px] font-bold flex items-center justify-center"
          >
            {{ store.nombreArticlesPanier }}
          </span>
        </button>
        <button class="tap-fx relative w-10 h-10 rounded-full bg-white/15 flex items-center justify-center">
          <IconSvg name="bell" :size="19" color="white" :stroke-width="1.8" />
          <span class="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-amber badge-pulse"></span>
        </button>
      </div>
    </div>
  </header>
</template>
