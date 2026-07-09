<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'
import { useAvizoneStore } from '../stores/avizone.js'
import AppHeader from '../components/AppHeader.vue'
import IconSvg from '../components/IconSvg.vue'

const auth = useAuthStore()
const store = useAvizoneStore()
const router = useRouter()

const onglet = ref('infos') // infos | avis | badges | parametres

const initiales = computed(() => {
  const parts = (auth.currentUser?.nomComplet || '').split(' ').filter(Boolean)
  return (parts[0]?.[0] || '') + (parts[1]?.[0] || '')
})

const roleLabel = { eleveur: 'Éleveur Vérifié', fournisseur: 'Fournisseur Vérifié', livreur: 'Livreur Vérifié' }

const niveauLabels = ['', 'Débutant', 'Éleveur actif', 'Éleveur confirmé', 'Expert']

function deconnecter() {
  auth.deconnecter()
  router.push('/bienvenue')
}
</script>

<template>
  <div>
    <AppHeader title="Mon profil" subtitle="Compte et paramètres" />

    <section class="px-5 pt-5 space-y-5">
      <div class="bg-white rounded-2xl p-4 shadow-card">
        <div class="flex items-center gap-3">
          <div class="w-16 h-16 rounded-full bg-forest flex items-center justify-center shrink-0">
            <span class="font-display font-extrabold text-white text-lg">{{ initiales }}</span>
          </div>
          <div class="flex-1">
            <p class="font-display font-bold text-ink leading-tight">{{ auth.currentUser?.nomComplet }}</p>
            <span class="inline-flex items-center gap-1 bg-sprout text-forest text-[10px] font-semibold px-2 py-0.5 rounded-full mt-1">
              <IconSvg name="shield" :size="9" color="#1B6B3A" :stroke-width="2.6" />
              {{ roleLabel[auth.currentUser?.role] }}
            </span>
            <p class="text-[11px] text-ash mt-1 flex items-center gap-1">
              <IconSvg name="pin" :size="10" color="#6B6459" :stroke-width="2" />
              {{ auth.currentUser?.ville }} · membre depuis {{ auth.currentUser?.membreDepuis }}
            </p>
          </div>
        </div>

        <div class="mt-4 bg-sprout rounded-xl p-3 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <IconSvg name="sparkle" :size="15" color="#1B6B3A" :stroke-width="1.8" />
            <span class="text-xs font-semibold text-forest">Niveau {{ auth.currentUser?.niveau }} — {{ niveauLabels[auth.currentUser?.niveau] }}</span>
          </div>
          <span class="text-xs font-bold text-forest">{{ auth.currentUser?.points }} pts</span>
        </div>
      </div>

      <div class="grid grid-cols-3 gap-2.5">
        <div class="bg-white rounded-2xl p-3 shadow-card text-center">
          <p class="text-lg font-display font-extrabold text-ink">{{ auth.currentUser?.commandesPassees }}</p>
          <p class="text-[10px] text-ash mt-0.5">Commandes</p>
        </div>
        <div class="bg-white rounded-2xl p-3 shadow-card text-center">
          <p class="text-lg font-display font-extrabold text-ink">{{ auth.currentUser?.note ?? '—' }}</p>
          <p class="text-[10px] text-ash mt-0.5">Note moyenne</p>
        </div>
        <div class="bg-white rounded-2xl p-3 shadow-card text-center">
          <p class="text-lg font-display font-extrabold text-ink">{{ auth.currentUser?.ventesRealisees }}</p>
          <p class="text-[10px] text-ash mt-0.5">Échanges</p>
        </div>
      </div>

      <div class="flex gap-1.5 bg-pearl rounded-2xl p-1.5">
        <button
          v-for="t in [
            { k: 'infos', l: 'Infos' },
            { k: 'avis', l: 'Avis' },
            { k: 'badges', l: 'Badges' },
            { k: 'parametres', l: 'Paramètres' },
          ]"
          :key="t.k"
          @click="onglet = t.k"
          class="tap-fx flex-1 py-2 rounded-xl text-[11px] font-semibold"
          :class="onglet === t.k ? 'bg-forest text-white' : 'text-ash'"
        >
          {{ t.l }}
        </button>
      </div>

      <Transition name="view-fade" mode="out-in">
        <div v-if="onglet === 'infos'" key="infos" class="bg-white rounded-2xl shadow-card divide-y divide-black/5">
          <div class="p-4 flex items-center justify-between">
            <div>
              <p class="text-[11px] text-ash">Téléphone</p>
              <p class="text-sm font-semibold text-ink">{{ auth.currentUser?.telephone }}</p>
            </div>
            <IconSvg name="edit" :size="15" color="#6B6459" :stroke-width="1.8" />
          </div>
          <div class="p-4 flex items-center justify-between">
            <div>
              <p class="text-[11px] text-ash">Ville</p>
              <p class="text-sm font-semibold text-ink">{{ auth.currentUser?.ville }}</p>
            </div>
            <IconSvg name="edit" :size="15" color="#6B6459" :stroke-width="1.8" />
          </div>
          <div v-if="auth.currentUser?.cheptel" class="p-4 flex items-center justify-between">
            <div>
              <p class="text-[11px] text-ash">Taille du cheptel</p>
              <p class="text-sm font-semibold text-ink">{{ auth.currentUser?.cheptel }}</p>
            </div>
            <IconSvg name="edit" :size="15" color="#6B6459" :stroke-width="1.8" />
          </div>
        </div>

        <div v-else-if="onglet === 'avis'" key="avis" class="space-y-2">
          <div v-for="a in store.avisRecus" :key="a.id" class="bg-white rounded-2xl p-3.5 shadow-card">
            <div class="flex items-center justify-between">
              <p class="text-sm font-semibold text-ink">{{ a.auteur }}</p>
              <span class="flex items-center gap-1 text-xs font-semibold text-amber">
                <IconSvg name="star" :size="12" color="#F9A826" :stroke-width="2" />{{ a.note }}/5
              </span>
            </div>
            <p class="text-xs text-ash mt-1">{{ a.commentaire }}</p>
          </div>
        </div>

        <div v-else-if="onglet === 'badges'" key="badges" class="grid grid-cols-2 gap-2.5">
          <div
            v-for="b in store.badgesDisponibles"
            :key="b.id"
            class="bg-white rounded-2xl p-3.5 shadow-card flex flex-col items-center text-center gap-1.5"
            :class="!b.obtenu && 'opacity-40'"
          >
            <div class="w-10 h-10 rounded-full bg-sprout flex items-center justify-center">
              <IconSvg :name="b.icon" :size="18" color="#1B6B3A" :stroke-width="1.8" />
            </div>
            <p class="text-[11px] font-semibold text-ink leading-tight">{{ b.label }}</p>
          </div>
        </div>

        <div v-else key="parametres" class="space-y-3">
          <div class="bg-white rounded-2xl shadow-card divide-y divide-black/5">
            <div class="p-4 flex items-center justify-between">
              <p class="text-sm font-semibold text-ink">Notifications</p>
              <div class="w-10 h-6 bg-forest rounded-full relative">
                <div class="w-4.5 h-4.5 bg-white rounded-full absolute top-0.5 right-0.5"></div>
              </div>
            </div>
            <div class="p-4">
              <p class="text-sm font-semibold text-ink">Mode lecture facile</p>
              <p class="text-[11px] text-ash mt-0.5">Police plus grande, contrastes renforcés</p>
            </div>
          </div>
          <button
            @click="deconnecter"
            class="tap-fx w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border border-rust/30 text-rust font-semibold text-sm"
          >
            <IconSvg name="logout" :size="16" color="#C0392B" :stroke-width="1.8" />
            Se déconnecter
          </button>
        </div>
      </Transition>
    </section>
  </div>
</template>
