import { defineStore } from 'pinia'

// -----------------------------------------------------------------------
// Store d'authentification. Le code d'envoi de SMS est simulé (aucun
// backend de télécommunication n'est branché à ce stade) : le code "1234"
// est toujours accepté, comme demandé pour la version de test/démo.
// En production, `demanderCode` appellerait un vrai fournisseur SMS et
// `verifierCode` interrogerait l'API d'authentification AVIZONE.
// -----------------------------------------------------------------------

const CODE_DEMO = '1234'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    currentUser: null,

    // Comptes de démonstration pré-remplis (cf. cahier des charges, section "Profils de démonstration")
    demoAccounts: [
      {
        id: 'demo-eleveur',
        role: 'eleveur',
        nomComplet: 'SEGNIAGBETO Adjowa Béatrice',
        telephone: '+229 97 12 34 56',
        ville: 'Calavi',
        cheptel: '500 à 1000',
        cheptelActuel: 640,
        membreDepuis: '2025',
        note: 4.8,
        commandesPassees: 12,
        ventesRealisees: 0,
        niveau: 2,
        points: 340,
      },
      {
        id: 'demo-fournisseur',
        role: 'fournisseur',
        nomComplet: 'SOKINDJI Mawussé Gabin',
        telephone: '+229 96 22 11 09',
        ville: 'Cotonou',
        cheptel: null,
        activite: 'Fournisseur de provende',
        membreDepuis: '2024',
        note: 4.6,
        commandesPassees: 3,
        ventesRealisees: 87,
        niveau: 3,
        points: 610,
      },
      {
        id: 'demo-livreur',
        role: 'livreur',
        nomComplet: 'Djokpoui Odile',
        telephone: '+229 95 44 20 18',
        ville: 'Ouidah',
        cheptel: null,
        activite: 'Transport spécialisé poussins',
        membreDepuis: '2025',
        note: 4.9,
        commandesPassees: 0,
        ventesRealisees: 54,
        niveau: 2,
        points: 275,
      },
    ],

    // Brouillon en cours de constitution pendant les 3 étapes d'inscription
    brouillonInscription: {
      role: null,
      nomComplet: '',
      telephone: '',
      ville: '',
      cheptel: '',
      codeEnvoye: false,
    },
  }),

  actions: {
    connecterCompteDemo(id) {
      const compte = this.demoAccounts.find((c) => c.id === id)
      if (!compte) return
      this.currentUser = { ...compte }
      this.isAuthenticated = true
    },

    definirRole(role) {
      this.brouillonInscription.role = role
    },
    definirIdentite({ nomComplet, telephone }) {
      this.brouillonInscription.nomComplet = nomComplet
      this.brouillonInscription.telephone = telephone
    },
    // Simulation d'envoi de code SMS — toujours "réussie" en démo.
    demanderCode() {
      this.brouillonInscription.codeEnvoye = true
      return true
    },
    // Le code "1234" est accepté en environnement de démonstration.
    verifierCode(code) {
      return code === CODE_DEMO
    },
    finaliserInscription({ ville, cheptel }) {
      const b = this.brouillonInscription
      this.currentUser = {
        id: 'user-' + Date.now(),
        role: b.role,
        nomComplet: b.nomComplet,
        telephone: b.telephone,
        ville,
        cheptel,
        cheptelActuel: 0,
        membreDepuis: String(new Date().getFullYear()),
        note: null,
        commandesPassees: 0,
        ventesRealisees: 0,
        niveau: 1,
        points: 20, // bonus de bienvenue
      }
      this.isAuthenticated = true
    },

    deconnecter() {
      this.isAuthenticated = false
      this.currentUser = null
      this.brouillonInscription = { role: null, nomComplet: '', telephone: '', ville: '', cheptel: '', codeEnvoye: false }
    },
  },
})
