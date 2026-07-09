import { defineStore } from 'pinia'
import { useAuthStore } from './auth.js'

// -----------------------------------------------------------------------
// Store Pinia principal pour AVIZONE. En attendant le branchement sur l'API
// backend réelle (PHP/Python, cf. document de modélisation), ce store
// contient des données de démonstration réalistes mais est structuré comme
// il le serait avec de vrais appels réseau : chaque action ressemble à ce
// que deviendrait un appel `fetch` vers l'API.
//
// Le profil utilisateur (nom, ville, cheptel...) vit désormais dans
// `stores/auth.js` — ce store-ci ne gère plus que les données métier.
// -----------------------------------------------------------------------

let toastSeq = 0

export const useAvizoneStore = defineStore('avizone', {
  state: () => ({
    orders: [
      {
        id: 1,
        ref: 'AVZ-2607-118',
        produit: 'Poussins Chair 1 jour',
        fournisseur: 'Couvoir Bénin-Chair',
        telephoneLivreur: '+229 95 44 20 18',
        quantite: 200,
        statut: 'En cours de livraison',
        progression: 70,
        montant: 71000,
        etape: 3,
        date: '2026-07-06',
      },
      {
        id: 2,
        ref: 'AVZ-2607-119',
        produit: 'Provende Croissance 50kg',
        fournisseur: 'Nutrivo Bénin',
        telephoneLivreur: null,
        quantite: 4,
        statut: 'En préparation',
        progression: 35,
        montant: 79200,
        etape: 2,
        date: '2026-07-07',
      },
      {
        id: 3,
        ref: 'AVZ-2606-092',
        produit: 'Poussins Ponte 1 jour',
        fournisseur: 'Ferme Agonvè',
        telephoneLivreur: null,
        quantite: 150,
        statut: 'Livrée',
        progression: 100,
        montant: 61500,
        etape: 4,
        date: '2026-06-18',
      },
    ],

    products: [
      {
        id: 101,
        nom: 'Poussins de chair — Race Cobb 500',
        categorie: 'Poussins',
        fournisseur: 'Couvoir Bénin-Chair',
        zone: 'Calavi',
        distanceKm: 2.3,
        verifie: true,
        prix: 355,
        unite: 'sujet',
        moq: 100,
        note: 4.8,
        avis: 24,
        stock: 620,
        disponible: true,
        img: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=500&q=75&auto=format&fit=crop',
      },
      {
        id: 102,
        nom: 'Poussins de ponte 1 jour',
        categorie: 'Poussins',
        fournisseur: 'Ferme Agonvè',
        zone: 'Cotonou',
        distanceKm: 14.6,
        verifie: false,
        prix: 410,
        unite: 'sujet',
        moq: 50,
        note: 4.1,
        avis: 9,
        stock: 180,
        disponible: true,
        img: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=500&q=75&auto=format&fit=crop',
      },
      {
        id: 201,
        nom: 'Provende Démarrage 50kg',
        categorie: 'Provende',
        fournisseur: 'Sodexo Agri',
        zone: 'Calavi',
        distanceKm: 4.1,
        verifie: true,
        prix: 21500,
        unite: 'sac',
        moq: 2,
        note: 4.6,
        avis: 31,
        stock: 340,
        disponible: true,
        img: 'https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?w=500&q=75&auto=format&fit=crop',
      },
      {
        id: 202,
        nom: 'Provende Croissance 50kg',
        categorie: 'Provende',
        fournisseur: 'Nutrivo Bénin',
        zone: 'Cotonou',
        distanceKm: 16.2,
        verifie: true,
        prix: 19800,
        unite: 'sac',
        moq: 2,
        note: 4.7,
        avis: 18,
        stock: 275,
        disponible: true,
        img: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=500&q=75&auto=format&fit=crop',
      },
      {
        id: 203,
        nom: 'Provende Ponte 50kg',
        categorie: 'Provende',
        fournisseur: 'Ferme Agonvè',
        zone: 'Cotonou',
        distanceKm: 15.8,
        verifie: false,
        prix: 20500,
        unite: 'sac',
        moq: 1,
        note: 3.9,
        avis: 6,
        stock: 90,
        disponible: true,
        img: 'https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?w=500&q=75&auto=format&fit=crop',
      },
      {
        id: 301,
        nom: 'Vaccin Newcastle + complément vitaminé',
        categorie: 'Vaccins',
        fournisseur: 'Vet+ Distribution',
        zone: 'Calavi',
        distanceKm: 3.7,
        verifie: true,
        prix: 3200,
        unite: 'flacon',
        moq: 1,
        note: 4.9,
        avis: 41,
        stock: 512,
        disponible: true,
        img: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=500&q=75&auto=format&fit=crop',
      },
      {
        id: 401,
        nom: 'Mangeoires et abreuvoirs (lot de 10)',
        categorie: 'Matériel',
        fournisseur: 'Agro-Équip Bénin',
        zone: 'Cotonou',
        distanceKm: 17.4,
        verifie: true,
        prix: 45000,
        unite: 'lot',
        moq: 1,
        note: 4.5,
        avis: 12,
        stock: 0,
        disponible: false,
        img: 'https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?w=500&q=75&auto=format&fit=crop',
      },
    ],

    // Panier léger (file d'intention d'achat) — la commande ferme se fait ensuite
    // via le tunnel animé (ouvrirTunnel), déjà conforme au parcours validé.
    panier: [],

    // Simulation de rentabilité — valeurs par défaut alignées sur le cahier des charges (section 5)
    simulation: {
      nbPoussins: 500,
      prixPoussin: 950,
      prixSac: 12500,
      consoParSujet: 4.2,
      prixVente: 2800,
      derniereSimulationCalculee: false,
      historique: [],
    },

    // État du tunnel de commande (modale globale, montée une seule fois dans App.vue)
    tunnel: {
      ouvert: false,
      step: 1,
      produit: null,
      quantite: 1,
      modeLivraison: 'securisee',
      modePaiement: 'mobilemoney',
      derniereCommande: null,
    },

    actualites: [
      { id: 1, type: 'commande', texte: 'Votre commande AVZ-2607-118 arrive dans moins de 30 minutes.', date: "Aujourd'hui" },
      { id: 2, type: 'promo', texte: 'Nutrivo Bénin baisse son prix sur la Provende Croissance cette semaine.', date: 'Hier' },
      { id: 3, type: 'conseil', texte: 'Saison sèche : pensez à augmenter la fréquence d’abreuvement.', date: 'Il y a 2 jours' },
    ],

    conseilsDuJour: [
      'Pensez à vérifier la température de vos poussins aujourd’hui.',
      'Un renouvellement d’eau deux fois par jour limite les maladies respiratoires.',
      'Contrôlez la ventilation du poulailler aux heures les plus chaudes.',
      'Un carnet de suivi par lot simplifie le calcul de votre rentabilité réelle.',
      'Isolez immédiatement tout sujet présentant des signes de faiblesse.',
    ],

    badgesDisponibles: [
      { id: 'verifie', label: 'Éleveur Vérifié', icon: 'shield', obtenu: true },
      { id: 'premier-achat', label: 'Premier achat', icon: 'check', obtenu: true },
      { id: 'pro', label: 'Éleveur pro', icon: 'medal', obtenu: false },
      { id: 'fidele', label: '10 commandes', icon: 'sparkle', obtenu: false },
    ],

    avisRecus: [
      { id: 1, auteur: 'Couvoir Bénin-Chair', note: 5, commentaire: 'Client sérieux, paiement rapide.' },
      { id: 2, auteur: 'Nutrivo Bénin', note: 4, commentaire: 'Bonne communication sur la livraison.' },
    ],

    toasts: [],
    mascotMessage: null,
  }),

  getters: {
    commandesActives: (state) => state.orders.filter((o) => o.etape < 4),
    commandesTerminees: (state) => state.orders.filter((o) => o.etape >= 4),
    nombreArticlesPanier: (state) => state.panier.reduce((total, item) => total + item.quantite, 0),
  },

  actions: {
    notifier(message, variant = 'success') {
      const id = ++toastSeq
      this.toasts.push({ id, message, variant })
      setTimeout(() => this.retirerToast(id), 3200)
    },
    retirerToast(id) {
      this.toasts = this.toasts.filter((t) => t.id !== id)
    },

    // ---------- Gamification (section 7 du cahier des charges) ----------
    direMascotte(message) {
      this.mascotMessage = { id: Date.now(), texte: message }
      setTimeout(() => {
        if (this.mascotMessage?.texte === message) this.mascotMessage = null
      }, 4500)
    },
    ajouterPoints(montant, raison) {
      const auth = useAuthStore()
      if (!auth.currentUser) return
      const avant = auth.currentUser.niveau
      auth.currentUser.points += montant
      const seuils = [0, 100, 300, 600]
      let nouveauNiveau = 1
      seuils.forEach((seuil, i) => {
        if (auth.currentUser.points >= seuil) nouveauNiveau = i + 1
      })
      auth.currentUser.niveau = Math.min(nouveauNiveau, 4)
      this.notifier('+' + montant + ' points — ' + raison, 'success')
      if (auth.currentUser.niveau > avant) {
        const noms = ['', 'Débutant', 'Éleveur actif', 'Éleveur confirmé', 'Expert']
        this.direMascotte('Bravo, vous passez au niveau ' + noms[auth.currentUser.niveau] + ' !')
      }
    },

    ajouterAuPanier(produit) {
      const existant = this.panier.find((i) => i.id === produit.id)
      if (existant) existant.quantite += 1
      else this.panier.push({ id: produit.id, nom: produit.nom, prix: produit.prix, unite: produit.unite, quantite: 1 })
      this.notifier('Produit ajouté au panier', 'success')
    },
    retirerDuPanier(id) {
      this.panier = this.panier.filter((i) => i.id !== id)
    },
    contacterFournisseur(produit) {
      this.notifier('Message envoyé à ' + produit.fournisseur, 'info')
    },

    creerCommande({ produit, quantite, montant }) {
      const ref = 'AVZ-' + Math.floor(2600 + Math.random() * 90) + '-' + Math.floor(100 + Math.random() * 899)
      const nouvelle = {
        id: Date.now(),
        ref,
        produit: produit.nom,
        fournisseur: produit.fournisseur,
        telephoneLivreur: null,
        quantite,
        statut: 'En attente de validation fournisseur',
        progression: 8,
        montant,
        etape: 1,
        date: new Date().toISOString().slice(0, 10),
      }
      this.orders.unshift(nouvelle)
      const cible = this.products.find((p) => p.id === produit.id)
      if (cible) cible.stock -= quantite
      return nouvelle
    },

    mettreAJourSimulation(patch) {
      Object.assign(this.simulation, patch)
    },
    enregistrerSimulation(resultat) {
      this.simulation.historique.unshift({ ...resultat, date: new Date().toISOString().slice(0, 10) })
      this.notifier('Simulation enregistrée', 'success')
      this.ajouterPoints(10, 'simulation enregistrée')
    },

    ouvrirTunnel(produit) {
      this.tunnel.produit = produit
      this.tunnel.quantite = produit.moq
      this.tunnel.modeLivraison = 'securisee'
      this.tunnel.modePaiement = 'mobilemoney'
      this.tunnel.step = 1
      this.tunnel.ouvert = true
    },
    fermerTunnel() {
      this.tunnel.ouvert = false
    },
    tunnelSuivant() {
      if (this.tunnel.step < 4) this.tunnel.step++
    },
    tunnelPrecedent() {
      if (this.tunnel.step > 1) this.tunnel.step--
    },
    ajusterQuantiteTunnel(delta) {
      const p = this.tunnel.produit
      if (!p) return
      const next = this.tunnel.quantite + delta
      if (next >= p.moq && next <= p.stock) this.tunnel.quantite = next
    },
    confirmerPaiementTunnel(montantTotal) {
      const commande = this.creerCommande({
        produit: this.tunnel.produit,
        quantite: this.tunnel.quantite,
        montant: montantTotal,
      })
      this.tunnel.derniereCommande = commande
      this.tunnel.step = 4
      this.ajouterPoints(30, 'commande passée')
    },
  },
})
