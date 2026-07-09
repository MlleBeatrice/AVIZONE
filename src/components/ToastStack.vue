<script setup>
import { useAvizoneStore } from '../stores/avizone.js'
import IconSvg from './IconSvg.vue'

const store = useAvizoneStore()
</script>

<template>
  <div class="fixed left-0 right-0 bottom-24 z-40 flex flex-col items-center gap-2 px-5 pointer-events-none" style="max-width: 460px; margin: 0 auto">
    <TransitionGroup name="toast" tag="div" class="w-full flex flex-col items-center gap-2 relative">
      <div
        v-for="t in store.toasts"
        :key="t.id"
        class="pointer-events-auto max-w-full bg-ink text-white text-sm font-medium px-4 py-3 rounded-2xl shadow-pop flex items-center gap-2.5"
      >
        <div
          class="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
          :class="t.variant === 'success' ? 'bg-forest-light' : t.variant === 'error' ? 'bg-rust' : 'bg-amber'"
        >
          <IconSvg :name="t.variant === 'success' ? 'check' : t.variant === 'error' ? 'x' : 'message'" :size="12" color="white" :stroke-width="2.4" />
        </div>
        <span>{{ t.message }}</span>
      </div>
    </TransitionGroup>
  </div>
</template>
