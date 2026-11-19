# Rapport d'intervention SSTI

Formulaire de rapport d'intervention – requalification opérationnelle des thermosoudeuses (selon NF EN 11607).
Fonctionne sur téléphone, tablette et ordinateur, **même sans connexion internet**.

**Lien de l'application :** https://ssti92350-afk.github.io/rapport-ssti/

## Installation

- **Téléphone / tablette :** ouvrir le lien une première fois avec internet, puis
  - Android (Chrome) : menu ⋮ → « Ajouter à l'écran d'accueil » / « Installer l'application » ;
  - iPhone / iPad (Safari) : bouton Partager → « Sur l'écran d'accueil ».
  L'appli fonctionne ensuite hors connexion. Les mises à jour arrivent à la prochaine ouverture avec internet.
- **Ordinateur :** ouvrir le lien, ou télécharger `index.html` et l'ouvrir d'un double-clic (fonctionne hors connexion).

## Fonctions

- **Type de rapport choisi en premier** : *Rapport d'intervention* ou *Soudeuse de prêt*, puis le type de machine.
- Deux types de machine : **thermosoudeuse à défilement** (ex. HM3010DCV) et **thermosoudeuse impulsion** (ex. HM660ASV) ; les cases s'adaptent au type choisi.
- **Autre type de soudeuse** : rubriques, points de contrôle (Contrôlé / Remplacé / N/A ou Oui / Non) et mesures modifiables selon la machine, avec le nom du type de soudeuse ; enregistrables comme **modèles** sur l'appareil pour les réutiliser.
- **Envoi automatique à la GMAO** (encadré « ☁ Envoi à la GMAO » dans « Rapports enregistrés ») : chaque rapport validé part dans la table `rapports_intervention` de la GMAO dès qu'il y a internet. Dans la GMAO (/ssti), la session de l'utilisateur connecté est fournie par la GMAO ; ouvert seul, connexion une fois avec ses identifiants GMAO. Identifiant fixe par rapport (pas de doublon) ; un rapport provisoire reçoit le numéro suivant de l'année (AAAA-Snnn, ou AAAA-SPnnn pour un prêt). Liste dans la GMAO : /rapports.
- **Barre de progression et menu « Aller à »** sous la barre du haut : nombre de rubriques remplies, état de chaque rubrique (complète / à compléter / vide / facultative), accès direct à une rubrique.
- **Photo sur une ligne** de contrôle (bouton 📷) : la photo va dans « Photos » avec la légende « Rubrique – ligne ».
- **Clients de la GMAO dans « Client »** : liste déroulante (bouton ▾) avec recherche par nom, ville, code postal ou contact ; le choix remplit Contact, Adresse et Code postal / Ville. Un nom tapé en entier, même sans accents ni majuscules, est reconnu et complète les coordonnées vides. La liste est lue avec la session GMAO (rapport ouvert dans la GMAO, ou connexion dans « Envoi à la GMAO »), gardée sur l'appareil pour marcher sans réseau et mise à jour toutes les 10 minutes. Un client absent de la GMAO peut toujours être saisi à la main.
- **Machines connues de la GMAO** (avec réseau, rapport relié à la GMAO) : dans « Information machine », les machines du client saisi (modèle et n° de série tirés des bons DMA / RMA et de l'historique des interventions) ; en rapport de prêt, les soudeuses du parc de prêt. Un appui remplit fabricant, modèle, n° de série et type de machine (défilement / impulsion). Dans « N° de série », les n° connus sont proposés dès 3 caractères et le client suit ; un n° tapé en entier complète client et modèle vides. Liste gardée sur l'appareil (fonction `machines_connues` de la GMAO, migration 0025).
- **Dictée vocale dans tous les champs de saisie** (intervention, prêt, autre type) : bouton « 🎤 Dicter » en bas à droite dès qu'un champ texte, numérique ou une zone de texte est sélectionné ; le texte s'insère au curseur ; mots « virgule », « point final », « à la ligne ». Pas sur les mots de passe, e-mails et dates.
- **QR codes machines** : `qr.html` crée et imprime des étiquettes (62 × 32 mm ou pastille ronde 44 mm) ; le lien du QR code (`?client=…&modele=…&sn=…&type=…`) ouvre le rapport pré-rempli et affiche les anciens rapports de la machine enregistrés sur l'appareil. Bibliothèque QR : `qrlib.js` (Kazuhiko Arase, licence MIT).
- **Compteur de pièces** (rapport de prêt, rubrique Équipement) : valeur relevée, ou case « N/A – pas de compteur de pièces » pour les machines sans compteur ; repris dans le PDF.
- **Logo commun** : le logo SSTI est intégré à la version en ligne et apparaît sur tous les rapports (intervention et prêt), à l'écran et dans le PDF, sur tous les appareils (il remplace un logo enregistré sur un appareil).
- **+ Ajouter une ligne** dans chaque rubrique de points de contrôle (tous types de machine) : intitulé, réponse (Contrôlé / Remplacé / N/A ou Oui / Non), commentaire facultatif, bouton Retirer. Case « Garder pour les prochains rapports de cette machine » : la ligne revient automatiquement dans les rapports suivants pour ce type de machine (enregistré sur l'appareil). Les lignes figurent dans le PDF et dans les rapports enregistrés.
- **Rapport soudeuse de prêt** (modèle « SSTI RSP v1.0 », selon NF EN 11607-2) : n° RSP (ex. 2026-SP047, ou « AAAA-SP provisoire »), date de départ, client avec pays, équipement, appareils de mesure, accessoires fournis (guide sachet, cordon, pédale, ruban encreur), preuves de contrôle (échantillons sachets, Seal check), type d'emballage (BOP, ULTRA, autre), critères de soudure (T°, pression, vitesse en défilement ou ts / tc en impulsion, intégrité de la soudure), SAV / remarques, conformité machine et signature du technicien. Titre, ligne norme et référence qualité réglables dans l'administration.
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
