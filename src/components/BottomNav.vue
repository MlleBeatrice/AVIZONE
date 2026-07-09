<script setup>
import { useRoute } from 'vue-router'
import IconSvg from './IconSvg.vue'

const route = useRoute()

const tabs = [
  { to: '/', name: 'dashboard', label: 'Accueil', icon: 'home' },
  { to: '/marche', name: 'marche', label: 'Marché', icon: 'grid' },
  { to: '/commandes', name: 'commandes', label: 'Commandes', icon: 'route' },
  { to: '/rentabilite', name: 'rentabilite', label: 'Rentabilité', icon: 'calc' },
  { to: '/compte', name: 'compte', label: 'Compte', icon: 'user' },
]
</script>

<template>
  <nav class="fixed bottom-0 left-0 right-0 z-20 bg-white border-t border-black/5" style="max-width: 460px; margin: 0 auto">
    <div class="grid grid-cols-5">
      <router-link
        v-for="tab in tabs"
        :key="tab.name"
        :to="tab.to"
        class="tap-fx flex flex-col items-center gap-1 py-2.5"
      >
        <IconSvg :name="tab.icon" :size="20" :color="route.name === tab.name ? '#1F6F4C' : '#5B655F'" />
        <span class="text-[9.5px] font-medium" :class="route.name === tab.name ? 'text-forest font-bold' : 'text-ash'">
          {{ tab.label }}
        </span>
        <span
          class="h-1 w-1 rounded-full transition-opacity duration-300"
          :class="route.name === tab.name ? 'bg-forest opacity-100' : 'opacity-0'"
        ></span>
      </router-link>
    </div>
  </nav>
</template>
