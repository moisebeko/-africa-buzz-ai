# AFRICA BUZZ AI — démarrage

## Cette première version contient
- Un site vitrine responsive en français.
- Des rubriques Cameroun, Afrique, Sport, Gaming et Tech.
- Un collecteur de titres/liens via Google News RSS.
- Un workflow GitHub Actions prévu pour actualiser les titres toutes les 6 heures.
- Des liens vers les sources originales.

## Limites importantes
Ce projet est un prototype. Il ne rédige pas encore des articles originaux par IA, ne publie pas automatiquement sur Facebook/TikTok et ne rapporte pas encore d'argent. Il faut configurer l'hébergement, les autorisations des plateformes, les clés/API éventuelles et la monétisation.
Les titres/extraits RSS doivent respecter les conditions des sources. Un site qui ne fait que republier des flux peut ne pas être accepté pour la publicité.

## Mise en ligne gratuite — vue d'ensemble
1. Crée un compte GitHub si nécessaire.
2. Crée un dépôt public nommé `africa-buzz-ai`.
3. Envoie tous les fichiers du dossier dans le dépôt en conservant `.github`, `data` et `scripts`.
4. Ouvre **Settings → Pages**, puis choisis la branche `main` et le dossier `/ (root)`.
5. GitHub affichera l'adresse du site dans la section Pages.
6. Dans **Settings → Actions → General**, vérifie que les workflows peuvent écrire dans le dépôt.
7. Ouvre **Actions** et lance manuellement « Actualiser les flux d'actualités » pour tester.

Le workflow planifié peut être retardé; il ne garantit pas une publication exactement à l'heure.

## Étapes suivantes
- Ajouter une couche IA avec une clé API et des limites de dépenses.
- Ajouter une vérification des faits et une modération.
- Connecter les réseaux sociaux par leurs API officielles et autorisations.
- Compléter les mentions légales et la politique de confidentialité.
- Créer une vraie valeur éditoriale avant de demander une approbation publicitaire.
- Vérifier les conditions actuelles d'AdSense/AdMob et de Google Play.
