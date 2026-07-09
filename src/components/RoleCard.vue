<script setup>
import IconSvg from './IconSvg.vue'

const props = defineProps({
  icon: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  selected: { type: Boolean, default: false },
})
defineEmits(['select'])
</script>

<template>
  <button
    @click="$emit('select')"
    class="role-card tap-fx w-full text-left bg-white rounded-2xl p-4 shadow-card border-2 flex items-center gap-4"
    :class="selected ? 'border-forest is-selected' : 'border-transparent'"
  >
    <div class="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0" :class="selected ? 'bg-forest' : 'bg-sprout'">
      <IconSvg :name="icon" :size="26" :color="selected ? 'white' : '#1B6B3A'" :stroke-width="1.6" />
    </div>
    <div class="flex-1">
      <p class="font-display font-bold text-ink">{{ title }}</p>
      <p class="text-xs text-ash mt-0.5">{{ description }}</p>
    </div>
    <div
      class="w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0"
      :class="selected ? 'bg-forest border-forest' : 'border-black/10'"
    >
      <IconSvg v-if="selected" name="check" :size="12" color="white" :stroke-width="3" />
    </div>
  </button>
</template>
