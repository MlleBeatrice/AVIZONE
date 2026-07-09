<script setup>
import { computed } from 'vue'
import { useAvizoneStore } from '../stores/avizone.js'

const store = useAvizoneStore()

const bulle = computed(() => store.mascotMessage)

function fermer() {
  store.mascotMessage = null
}
</script>

<template>
  <div class="fixed z-40 pointer-events-none" style="right: max(16px, calc(50% - 214px)); bottom: 92px">
    <Transition name="mascot-pop">
      <div
        v-if="bulle"
        :key="bulle.id"
        class="pointer-events-auto mb-2 bg-white rounded-2xl rounded-br-sm shadow-pop px-3.5 py-2.5 max-w-[190px] text-xs text-ink font-medium relative"
      >
        {{ bulle.texte }}
        <button @click="fermer" class="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-ash text-white text-[9px] flex items-center justify-center">
          ×
        </button>
      </div>
    </Transition>

    <!-- Petit poussin stylisé, dessiné en SVG (aucun émoji) -->
    <svg width="46" height="46" viewBox="0 0 46 46" class="mascot-bob drop-shadow-md ml-auto">
      <circle cx="23" cy="23" r="21" fill="#FFD54F" />
      <ellipse cx="23" cy="27" rx="12" ry="10" fill="#FFFFFF" opacity="0.15" />
      <circle cx="18.5" cy="20" r="2.1" fill="#2D2A24" />
      <circle cx="27.5" cy="20" r="2.1" fill="#2D2A24" />
      <path d="M20.5 25.5c1 1.4 4 1.4 5 0" stroke="#2D2A24" stroke-width="1.6" stroke-linecap="round" fill="none" />
      <path d="M21.5 22.5 23 25l1.5-2.5Z" fill="#F9A826" />
      <path d="M12 15c-2-2-2-5 0-6 1 2 2 3 4 3" fill="#F9A826" />
    </svg>
  </div>
</template>
