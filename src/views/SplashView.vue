<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'
import IconSvg from '../components/IconSvg.vue'

const router = useRouter()
const auth = useAuthStore()
const imgFailed = ref(false)
const demoOuvert = ref(false)

function rejoindre() {
  router.push('/inscription')
}
function connecterDemo(id) {
  auth.connecterCompteDemo(id)
  router.push('/')
}

const iconParRole = { eleveur: 'chicken', fournisseur: 'store', livreur: 'truck' }
</script>

<template>
  <div class="relative min-h-full flex flex-col justify-end overflow-hidden" style="min-height: 100vh">
    <!-- Image de fond : scène d'aviculture béninoise (cf. prompts IA fournis en annexe du livrable) -->
    <div class="absolute inset-0">
      <img
        v-if="!imgFailed"
        src="https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=900&q=80&auto=format&fit=crop"
        @error="imgFailed = true"
        class="w-full h-full object-cover"
        alt="Éleveur avicole béninois"
      />
      <div v-else class="w-full h-full bg-forest-dark"></div>
      <div class="absolute inset-0 kente-watermark"></div>
      <div class="absolute inset-0" style="background: linear-gradient(200deg, rgba(27,107,58,0.15) 0%, rgba(27,107,58,0.75) 55%, rgba(249,168,38,0.85) 100%)"></div>
    </div>

    <!-- Bouton "comptes de démonstration", discret, en haut à droite -->
    <button
      @click="demoOuvert = true"
      class="tap-fx absolute top-6 right-5 z-10 text-white/90 text-xs font-semibold bg-white/15 px-3 py-1.5 rounded-full"
    >
      Démo
    </button>

    <div class="relative z-10 px-6 pb-10 pt-16 text-white">
      <div class="flex items-center gap-2 mb-3">
        <IconSvg name="leaf" :size="22" color="white" :stroke-width="1.8" />
        <span class="text-xs font-semibold tracking-[0.2em] text-white/80">BÉNIN · CALAVI · COTONOU</span>
      </div>

      <h1 class="font-display font-extrabold text-white leading-none" style="font-size: 3rem">
        AVIZ<span class="relative inline-block">
          O<span class="absolute w-1.5 h-1.5 rounded-full bg-gold" style="top: 6px; left: 15px"></span>
        </span>NE
      </h1>
      <p class="mt-3 text-white/90 text-lg font-medium max-w-[280px]">
        Le marché de la volaille, à portée de main.
      </p>
      <p class="mt-1.5 text-white/70 text-sm max-w-[300px]">
        L'aviculture béninoise, simplifiée et connectée : intrants, livraison et rentabilité au même endroit.
      </p>

      <button
        @click="rejoindre"
        class="cta-pulse tap-fx mt-8 w-full bg-amber text-ink font-display font-bold py-4 rounded-2xl shadow-pop flex items-center justify-center gap-2"
      >
        Rejoindre AVIZONE
        <IconSvg name="chevronR" :size="18" color="#2D2A24" :stroke-width="2.4" />
      </button>

      <div class="mt-5 flex items-center justify-center gap-2 text-white/80 text-xs">
        <IconSvg name="shield" :size="14" color="white" :stroke-width="2" />
        Déjà rejoint par plus de 500 éleveurs au Bénin
      </div>
    </div>

    <!-- Feuille de sélection rapide des comptes de démonstration -->
    <Transition name="view-fade">
      <div v-if="demoOuvert" class="absolute inset-0 z-20 bg-ink/60 flex items-end" @click.self="demoOuvert = false">
        <div class="w-full bg-white rounded-t-3xl p-5 space-y-3">
          <div class="w-10 h-1 bg-black/10 rounded-full mx-auto mb-2"></div>
          <p class="font-display font-bold text-ink">Comptes de démonstration</p>
          <p class="text-xs text-ash -mt-1.5">Pour l'atelier de test utilisateur, sans passer par l'inscription.</p>
          <button
            v-for="c in auth.demoAccounts"
            :key="c.id"
            @click="connecterDemo(c.id)"
            class="tap-fx w-full flex items-center gap-3 bg-sprout rounded-2xl p-3 text-left"
          >
            <div class="w-10 h-10 rounded-xl bg-forest flex items-center justify-center shrink-0">
              <IconSvg :name="iconParRole[c.role]" :size="18" color="white" :stroke-width="1.7" />
            </div>
            <div class="flex-1">
              <p class="text-sm font-semibold text-ink">{{ c.nomComplet }}</p>
              <p class="text-[11px] text-ash">{{ c.activite || 'Éleveuse' }} · {{ c.ville }}</p>
            </div>
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>
