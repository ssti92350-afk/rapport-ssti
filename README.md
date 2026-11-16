# Rapport d'intervention SSTI

Formulaire de rapport d'intervention – requalification opérationnelle des thermosoudeuses (selon NF EN ISO 11607).
Fonctionne sur téléphone, tablette et ordinateur, **même sans connexion internet**.

**Lien de l'application :** https://ssti92350-afk.github.io/rapport-ssti/

## Installation

- **Téléphone / tablette :** ouvrir le lien une première fois avec internet, puis
  - Android (Chrome) : menu ⋮ → « Ajouter à l'écran d'accueil » / « Installer l'application » ;
  - iPhone / iPad (Safari) : bouton Partager → « Sur l'écran d'accueil ».
  L'appli fonctionne ensuite hors connexion. Les mises à jour arrivent à la prochaine ouverture avec internet.
- **Ordinateur :** ouvrir le lien, ou télécharger `index.html` et l'ouvrir d'un double-clic (fonctionne hors connexion).

## Fonctions

- Deux types de rapport : **thermosoudeuse à défilement** (ex. HM3010DCV) et **thermosoudeuse impulsion** (ex. HM660ASV) ; les cases s'adaptent au type choisi.
- Points de contrôle en boutons : Contrôlé / Remplacé / N/A, ou Oui / Non. SEALCHECK peut être barré quand l'emballage ne permet pas le test.
- **Appareils de mesure** enregistrés sur l'appareil, à cocher selon ceux utilisés, avec **alerte d'échéance de certificat** dès 1 mois avant et alerte rouge une fois expiré.
- **Plusieurs emballages** par rapport, chacun avec sa consigne et ses mesures. Unités affichées dans le PDF.
- **Numéro provisoire** (« AAAA-S provisoire ») quand le numéro définitif n'est pas encore attribué : le PDF porte la mention et le filigrane « PROVISOIRE ».
- **Photos** (avec légendes) et **documents** joints : images en annexe du PDF, PDF / fichiers Office intégrés en pièce jointe.
- Signatures au doigt (technicien et client).
- **Validation obligatoire** avant la génération du PDF : liste des informations manquantes et des points à vérifier, case de confirmation et nom du validateur, mention « Rapport relu et validé par … » dans le PDF.
- Nom du fichier PDF : `2026-S323 HM3010DCV sn°438780 CH VIERZON.pdf` (n° RI, modèle, n° de série, client).

## Administration (réservé au responsable)

Lien en bas du formulaire : « Modifier l'en-tête et le pied de page (administrateur) », protégé par un code.

- Titre, ligne norme, société, adresse, téléphone, e-mail, **logo** (position et largeur réglables), changement du code.
- « Télécharger la version techniciens » : produit un `index.html` avec ces réglages intégrés. Le renommer `index.html` et le déposer dans ce dépôt pour mettre à jour l'appli de tous les techniciens.
- La **lecture des notes manuscrites** (remplissage automatique du rapport à partir d'une photo des notes) n'est visible qu'en mode administrateur. Elle fonctionne uniquement dans la version Claude du rapport (connexion requise) ; elle sera ouverte à tous lors du passage de la GMAO sur serveur.

> Le code administrateur empêche les modifications depuis le formulaire, mais le fichier reste modifiable par quelqu'un qui l'ouvre dans un éditeur de texte. Une protection complète (comptes par technicien) viendra avec la GMAO.

## Fichiers

| Fichier | Rôle |
| --- | --- |
| `index.html` | L'application complète (formulaire, générateur PDF intégré, réglages) |
| `sw.js` | Fonctionnement hors connexion (mise en cache) |
| `manifest.webmanifest` | Installation sur l'écran d'accueil |
| `icon-192.png`, `icon-512.png` | Icônes de l'appli |

## Suite prévue

- Intégration dans la GMAO (Lovable) : classement automatique des rapports par client et par numéro (2026-S320, S321, S322…), liste d'appareils de mesure commune à l'équipe, comptes techniciens.
- Ajout des pages des documents PDF à la suite du rapport.
