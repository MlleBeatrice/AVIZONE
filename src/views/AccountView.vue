<script setup>
import { useAvizoneStore } from '../stores/avizone.js'
import AppHeader from '../components/AppHeader.vue'
import IconSvg from '../components/IconSvg.vue'

const store = useAvizoneStore()

const menu = [
  { icon: 'edit', label: 'Modifier mon profil', hint: 'Nom, téléphone, exploitation' },
  { icon: 'trend', label: 'Historique de rentabilité', hint: 'Marges des 6 derniers lots' },
  { icon: 'shield', label: 'Sécurité du compte', hint: 'Mot de passe, vérification' },
  { icon: 'info', label: 'Aide et support', hint: 'Questions fréquentes, contact' },
]
</script>

<template>
  <div>
    <AppHeader title="Mon compte" subtitle="Profil éleveur" />

    <section class="px-5 pt-5 space-y-5">
      <div class="bg-white rounded-2xl p-4 shadow-card flex items-center gap-3">
        <div class="w-14 h-14 rounded-full bg-sprout flex items-center justify-center shrink-0">
          <IconSvg name="user" :size="26" color="#1F6F4C" :stroke-width="1.6" />
        </div>
        <div class="flex-1">
          <p class="font-display font-bold text-ink">{{ store.user.prenom }} {{ store.user.nom }}</p>
          <p class="text-xs text-ash mt-0.5">{{ store.user.exploitation }}</p>
          <p class="text-xs text-ash">{{ store.user.telephone }}</p>
        </div>
      </div>

      <div class="bg-sprout rounded-2xl p-4 flex items-center gap-3">
        <IconSvg name="leaf" :size="18" color="#1F6F4C" :stroke-width="1.8" />
        <p class="text-xs text-forest">
          Membre AVIZONE depuis <span class="font-semibold">{{ store.user.membreDepuis }}</span>
        </p>
      </div>

      <div class="bg-white rounded-2xl shadow-card divide-y divide-black/5 overflow-hidden">
        <button v-for="item in menu" :key="item.label" class="tap-fx w-full flex items-center gap-3 p-4 text-left">
          <div class="w-9 h-9 rounded-xl bg-sprout flex items-center justify-center shrink-0">
            <IconSvg :name="item.icon" :size="16" color="#1F6F4C" :stroke-width="1.8" />
          </div>
          <div class="flex-1">
            <p class="text-sm font-semibold text-ink">{{ item.label }}</p>
            <p class="text-[11px] text-ash mt-0.5">{{ item.hint }}</p>
          </div>
          <IconSvg name="chevronR" :size="16" color="#5B655F" :stroke-width="2" />
        </button>
      </div>

      <button class="tap-fx w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border border-rust/30 text-rust font-semibold text-sm">
        <IconSvg name="logout" :size="16" color="#B4432F" :stroke-width="1.8" />
        Se déconnecter
      </button>
    </section>
  </div>
</template>
