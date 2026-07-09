import { defineStore } from 'pinia'

// -----------------------------------------------------------------------
// Store Pinia unique pour AVIZONE. En attendant le branchement sur l'API
// backend réelle (PHP/Python, cf. document de modélisation), ce store
// contient des données de démonstration réalistes mais est structuré
// exactement comme il le serait avec de vrais appels réseau : chaque
// action ressemble à ce que deviendrait un appel `fetch` vers l'API.
// -----------------------------------------------------------------------

export const useAvizoneStore = defineStore('avizone', {
  state: () => ({
    user: {
      prenom: 'Kokou',
      nom: 'Adjahoui',
      exploitation: 'Ferme Kokou — Zogbadjè, Calavi',
      telephone: '+229 97 00 00 00',
      cheptelActuel: 640,
      soldePortefeuille: 128500,
      membreDepuis: '2025',
    },

    orders: [
      {
        id: 1,
        ref: 'AVZ-2607-118',
        produit: 'Poussins Chair 1 jour',
        fournisseur: 'Couvoir Bénin-Chair',
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
        nom: 'Poussins Chair 1 jour',
        categorie: 'Poussins',
        fournisseur: 'Couvoir Bénin-Chair',
        zone: 'Calavi',
        verifie: true,
        prix: 355,
        unite: 'sujet',
        moq: 100,
        note: 4.8,
        stock: 620,
        img: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=500&q=75&auto=format&fit=crop',
      },
      {
        id: 102,
        nom: 'Poussins Ponte 1 jour',
        categorie: 'Poussins',
        fournisseur: 'Ferme Agonvè',
        zone: 'Cotonou',
        verifie: false,
        prix: 410,
        unite: 'sujet',
        moq: 50,
        note: 4.1,
        stock: 180,
        img: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=500&q=75&auto=format&fit=crop',
      },
      {
        id: 201,
        nom: 'Provende Démarrage 50kg',
        categorie: 'Provende',
        fournisseur: 'Sodexo Agri',
        zone: 'Calavi',
        verifie: true,
        prix: 21500,
        unite: 'sac',
        moq: 2,
        note: 4.6,
        stock: 340,
        img: 'https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?w=500&q=75&auto=format&fit=crop',
      },
      {
        id: 202,
        nom: 'Provende Croissance 50kg',
        categorie: 'Provende',
        fournisseur: 'Nutrivo Bénin',
        zone: 'Cotonou',
        verifie: true,
        prix: 19800,
        unite: 'sac',
        moq: 2,
        note: 4.7,
        stock: 275,
        img: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=500&q=75&auto=format&fit=crop',
      },
      {
        id: 203,
        nom: 'Provende Ponte 50kg',
        categorie: 'Provende',
        fournisseur: 'Ferme Agonvè',
        zone: 'Cotonou',
        verifie: false,
        prix: 20500,
        unite: 'sac',
        moq: 1,
        note: 3.9,
        stock: 90,
        img: 'https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?w=500&q=75&auto=format&fit=crop',
      },
      {
        id: 301,
        nom: 'Complément vitaminé',
        categorie: 'Santé',
        fournisseur: 'Vet+ Distribution',
        zone: 'Calavi',
        verifie: true,
        prix: 3200,
        unite: 'flacon',
        moq: 1,
        note: 4.9,
        stock: 512,
        img: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=500&q=75&auto=format&fit=crop',
      },
    ],

    // Dernière simulation de rentabilité (persistée pour naviguer sans perdre les réglages)
    simulation: {
      nbPoussins: 500,
      prixPoussin: 355,
      consoParSujet: 4.2,
      prixSac: 21000,
      mortalite: 6,
      prixVente: 1900,
    },

    // État du tunnel de commande (modale globale, montée une seule fois dans App.vue)
    tunnel: {
      ouvert: false,
      step: 1, // 1 sélection, 2 livraison, 3 paiement, 4 confirmation
      produit: null,
      quantite: 1,
      modeLivraison: 'securisee', // securisee | retrait
      modePaiement: 'mobilemoney',
      derniereCommande: null,
    },
  }),

  getters: {
    commandesActives: (state) => state.orders.filter((o) => o.etape < 4),
    commandesTerminees: (state) => state.orders.filter((o) => o.etape >= 4),
  },

  actions: {
    // Scinderait normalement en sous-commandes multi-fournisseurs (cf. règle R-2.2.1)
    creerCommande({ produit, quantite, montant }) {
      const ref = 'AVZ-' + Math.floor(2600 + Math.random() * 90) + '-' + Math.floor(100 + Math.random() * 899)
      const nouvelle = {
        id: Date.now(),
        ref,
        produit: produit.nom,
        fournisseur: produit.fournisseur,
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
    },
  },
})
