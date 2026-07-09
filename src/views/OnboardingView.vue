<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'
import { useAvizoneStore } from '../stores/avizone.js'
import IconSvg from '../components/IconSvg.vue'
import RoleCard from '../components/RoleCard.vue'

const router = useRouter()
const auth = useAuthStore()
const store = useAvizoneStore()

const step = ref(1)
const roleChoisi = ref(null)
const nomComplet = ref('')
const telephone = ref('')
const code = ref(['', '', '', ''])
const codeErreur = ref(false)
const envoiEnCours = ref(false)
const ville = ref('')
const cheptel = ref('')

const roles = [
  { id: 'eleveur', icon: 'chicken', title: 'Je suis éleveur', desc: 'J’élève des poussins ou des poules et je veux acheter mes intrants.' },
  { id: 'fournisseur', icon: 'store', title: 'Je suis fournisseur', desc: 'Je vends des poussins, de la provende ou du matériel avicole.' },
  { id: 'livreur', icon: 'truck', title: 'Je suis livreur', desc: 'Je transporte des marchandises sensibles pour les éleveurs et fournisseurs.' },
]
const villes = ['Cotonou', 'Calavi', 'Ouidah', 'Parakou', 'Porto-Novo', 'Abomey-Calavi']
const taillesCheptel = ['Moins de 100', '100 à 500', '500 à 1000', 'Plus de 1000']

function retour() {
  if (step.value === 1) router.push('/bienvenue')
  else step.value--
}

function choisirRole(r) {
  roleChoisi.value = r
}
function validerRole() {
  auth.definirRole(roleChoisi.value)
  step.value = 2
}

const telephoneValide = computed(() => telephone.value.replace(/\D/g, '').length >= 8)
function recevoirCode() {
  if (!nomComplet.value || !telephoneValide.value) return
  auth.definirIdentite({ nomComplet: nomComplet.value, telephone: '+229 ' + telephone.value })
  envoiEnCours.value = true
  setTimeout(() => {
    envoiEnCours.value = false
    auth.demanderCode()
    step.value = 3
  }, 900)
}

const codeComplet = computed(() => code.value.every((c) => c.length === 1))
function onCodeInput(i, e) {
  const val = e.target.value.replace(/\D/g, '').slice(-1)
  code.value[i] = val
  codeErreur.value = false
  if (val && i < 3) {
    const next = e.target.parentElement.children[i + 1]
    next?.focus()
  }
}
function verifierEtContinuer() {
  const ok = auth.verifierCode(code.value.join(''))
  if (!ok) {
    codeErreur.value = true
    return
  }
  step.value = 4
}

function terminer() {
  if (!ville.value || !cheptel.value) return
  auth.finaliserInscription({ ville: ville.value, cheptel: cheptel.value })
  store.direMascotte('Bienvenue sur AVIZONE, ' + auth.currentUser.nomComplet.split(' ')[0] + ' !')
  router.push('/')
}
</script>

<template>
  <div class="min-h-full flex flex-col bg-sand" style="min-height: 100vh">
    <header class="px-5 pt-6 pb-4">
      <div class="flex items-center justify-between mb-4">
        <button @click="retour" class="tap-fx w-9 h-9 rounded-full bg-sprout flex items-center justify-center">
          <IconSvg name="chevronL" :size="17" color="#1B6B3A" :stroke-width="2" />
        </button>
        <span class="font-display font-bold text-sm text-ink">Rejoindre AVIZONE</span>
        <span class="w-9"></span>
      </div>
      <div class="grid grid-cols-4 gap-1.5">
        <div v-for="s in [1, 2, 3, 4]" :key="s" class="h-1.5 rounded-full transition-colors duration-500" :class="s <= step ? 'bg-forest' : 'bg-sprout'"></div>
      </div>
    </header>

    <div class="flex-1 overflow-y-auto px-5 pb-8">
      <Transition name="step-slide" mode="out-in">
        <!-- ÉTAPE 1 : CHOIX DU STATUT -->
        <div v-if="step === 1" key="s1" class="space-y-4">
          <div>
            <h1 class="font-display font-extrabold text-xl text-ink">Quel est votre rôle ?</h1>
            <p class="text-sm text-ash mt-1">AVIZONE adapte votre espace selon votre activité.</p>
          </div>
          <div class="space-y-3">
            <RoleCard
              v-for="r in roles"
              :key="r.id"
              :icon="r.icon"
              :title="r.title"
              :description="r.desc"
              :selected="roleChoisi === r.id"
              @select="choisirRole(r.id)"
            />
          </div>
          <Transition name="view-fade">
            <button v-if="roleChoisi" @click="validerRole" class="tap-fx w-full bg-forest text-white font-display font-bold py-3.5 rounded-2xl shadow-pop">
              Continuer
            </button>
          </Transition>
        </div>

        <!-- ÉTAPE 2 : INFORMATIONS PERSONNELLES -->
        <div v-else-if="step === 2" key="s2" class="space-y-4">
          <div>
            <h1 class="font-display font-extrabold text-xl text-ink">Vos coordonnées</h1>
            <p class="text-sm text-ash mt-1">Vous recevrez un code de vérification par SMS.</p>
          </div>

          <div>
            <label class="text-xs font-semibold text-ash mb-1.5 block">NUMÉRO DE TÉLÉPHONE</label>
            <div class="flex bg-white rounded-2xl shadow-card overflow-hidden">
              <span class="px-4 py-3.5 bg-sprout text-forest font-semibold text-sm flex items-center">+229</span>
              <input
                v-model="telephone"
                type="tel"
                placeholder="97 00 00 00"
                class="flex-1 px-4 py-3.5 text-sm outline-none"
                maxlength="12"
              />
            </div>
          </div>

          <div>
            <label class="text-xs font-semibold text-ash mb-1.5 block">NOM COMPLET</label>
            <input
              v-model="nomComplet"
              type="text"
              placeholder="Ex. AGOSSOU Marcel"
              class="w-full bg-white rounded-2xl shadow-card px-4 py-3.5 text-sm outline-none"
            />
          </div>

          <button class="text-xs text-forest font-semibold underline">Me connecter avec mon email</button>

          <button
            @click="recevoirCode"
            :disabled="!nomComplet || !telephoneValide"
            class="tap-fx w-full bg-amber text-ink font-display font-bold py-3.5 rounded-2xl shadow-pop flex items-center justify-center gap-2 disabled:opacity-40"
          >
            <svg v-if="envoiEnCours" class="spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2D2A24" stroke-width="3">
              <circle cx="12" cy="12" r="9" stroke-opacity="0.25" />
              <path d="M21 12a9 9 0 0 0-9-9" stroke-linecap="round" />
            </svg>
            <span>{{ envoiEnCours ? 'Envoi du code…' : 'Recevoir le code' }}</span>
          </button>
        </div>

        <!-- ÉTAPE 3 : VÉRIFICATION SMS -->
        <div v-else-if="step === 3" key="s3" class="space-y-5">
          <div>
            <h1 class="font-display font-extrabold text-xl text-ink">Vérification</h1>
            <p class="text-sm text-ash mt-1">Code envoyé par SMS au +229 {{ telephone }} (démo : 1234).</p>
          </div>

          <div class="flex justify-center gap-3">
            <input
              v-for="(c, i) in code"
              :key="i"
              :value="c"
              @input="onCodeInput(i, $event)"
              type="tel"
              maxlength="1"
              class="w-14 h-16 text-center text-2xl font-display font-bold bg-white rounded-2xl shadow-card outline-none border-2"
              :class="codeErreur ? 'border-rust' : 'border-transparent focus:border-forest'"
            />
          </div>
          <p v-if="codeErreur" class="text-center text-rust text-xs font-semibold">Code incorrect, réessayez (indice : 1234).</p>

          <button
            @click="verifierEtContinuer"
            :disabled="!codeComplet"
            class="tap-fx w-full bg-forest text-white font-display font-bold py-3.5 rounded-2xl shadow-pop disabled:opacity-40"
          >
            Vérifier
          </button>
        </div>

        <!-- ÉTAPE 4 : PERSONNALISATION DU PROFIL -->
        <div v-else key="s4" class="space-y-5">
          <div>
            <h1 class="font-display font-extrabold text-xl text-ink">Encore deux détails</h1>
            <p class="text-sm text-ash mt-1">Pour personnaliser votre expérience AVIZONE.</p>
          </div>

          <div>
            <p class="text-xs font-semibold text-ash mb-2">OÙ SE TROUVE VOTRE EXPLOITATION ?</p>
            <div class="grid grid-cols-2 gap-2">
              <button
                v-for="v in villes"
                :key="v"
                @click="ville = v"
                class="tap-fx px-3 py-2.5 rounded-xl text-sm font-semibold border-2"
                :class="ville === v ? 'bg-forest text-white border-forest' : 'bg-white text-ink border-transparent shadow-card'"
              >
                {{ v }}
              </button>
            </div>
          </div>

          <div>
            <p class="text-xs font-semibold text-ash mb-2">QUELLE EST LA TAILLE DE VOTRE CHEPTEL ?</p>
            <div class="space-y-2">
              <button
                v-for="t in taillesCheptel"
                :key="t"
                @click="cheptel = t"
                class="tap-fx w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold border-2"
                :class="cheptel === t ? 'bg-forest text-white border-forest' : 'bg-white text-ink border-transparent shadow-card'"
              >
                {{ t }}
                <IconSvg v-if="cheptel === t" name="check" :size="16" color="white" :stroke-width="2.4" />
              </button>
            </div>
          </div>

          <button
            @click="terminer"
            :disabled="!ville || !cheptel"
            class="tap-fx w-full bg-amber text-ink font-display font-bold py-3.5 rounded-2xl shadow-pop disabled:opacity-40"
          >
            Terminer mon inscription
          </button>
        </div>
      </Transition>
    </div>
  </div>
</template>
