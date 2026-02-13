# Documentation Fonctionnelle

## Introduction

Cette application permet de gerer un parc d'attractions. Les visiteurs peuvent consulter les attractions et laisser des avis. Les administrateurs peuvent gerer les attractions.

## Acces a l'application

### Visiteurs

URL : `http://localhost:4200`

### Administrateurs

URL : `http://localhost:4200/login`

Identifiants par defaut :

- Nom : admin
- Mot de passe : admin

## Fonctionnalites pour les visiteurs

### Consulter les attractions

1. Ouvrir la page d'accueil
2. Les attractions visibles s'affichent sous forme de cartes
3. Chaque carte contient :
   - Le nom de l'attraction
   - La description
   - Le niveau de difficulte (de 1 a 5)
   - La note moyenne
   - Un bouton "Laisser un avis"
   - La liste des avis existants

### Laisser un avis

1. Cliquer sur le bouton "Laisser un avis" d'une attraction
2. Une fenetre s'ouvre avec un formulaire
3. Remplir les champs :
   - Texte de l'avis (obligatoire)
   - Note de 1 a 5 (obligatoire, par defaut 3)
   - Prenom (optionnel)
   - Nom (optionnel)
   - Case a cocher "Publier de maniere anonyme"
4. Si la case anonyme est cochee, le prenom et nom ne seront pas affiches
5. Cliquer sur "Publier" pour enregistrer l'avis
6. L'avis apparait immediatement sous l'attraction

### Consulter les avis

Les avis s'affichent sous chaque attraction et contiennent :

- L'auteur (nom et prenom ou "Anonyme")
- La note donnee (sur 5)
- Le texte de l'avis
- La date de creation

## Fonctionnalites pour les administrateurs

### Se connecter

1. Aller sur `http://localhost:4200/login`
2. Entrer le nom d'utilisateur
3. Entrer le mot de passe
4. Cliquer sur "Connexion"
5. Vous etes redirige vers la page d'administration

### Ajouter une attraction

1. Sur la page d'administration, cliquer sur "Ajouter une attraction"
2. Un nouveau formulaire apparait
3. Remplir les champs :
   - Nom (obligatoire)
   - Description (obligatoire)
   - Difficulte de 1 a 5 (obligatoire)
   - Visible pour les visiteurs (switch on/off)
4. Cliquer sur "Enregistrer"
5. L'attraction est ajoutee

### Modifier une attraction

1. Les attractions existantes s'affichent avec leurs formulaires
2. Modifier les champs souhaites
3. Cliquer sur "Enregistrer"
4. Les modifications sont enregistrees

### Rendre une attraction visible ou invisible

1. Utiliser le switch "Visible pour les visiteurs"
2. Si desactive, l'attraction n'apparait plus pour les visiteurs
3. Si active, l'attraction est visible sur la page d'accueil
4. Cliquer sur "Enregistrer" pour valider

## Changement de langue

L'application est disponible en francais et en anglais.

Pour le developpement, seule la version francaise est servie par defaut.

Pour voir la version anglaise :

1. Builder l'application : `ng build --localize`
2. Servir la version anglaise : `http-server dist/parc/browser/en -p 8080`
3. Ouvrir `http://localhost:8080`

## Navigation

### Menu principal

- Page d'accueil : Liste des attractions
- Page Admin : Gestion des attractions (apres connexion)
- Connexion : Page de login administrateur

### Retour a l'accueil

Cliquer sur "Parc d'Attractions" dans le header pour revenir a la page d'accueil.

## Regles de gestion

### Attractions

- Une attraction peut etre visible ou invisible
- Seules les attractions visibles apparaissent aux visiteurs
- Les administrateurs voient toutes les attractions
- Une attraction a un niveau de difficulte de 1 a 5

### Critiques

- Une critique doit avoir un texte (obligatoire)
- Une critique doit avoir une note de 1 a 5 (obligatoire)
- Le nom et prenom sont optionnels
- Si l'avis est anonyme, le nom et prenom ne sont pas affiches
- Les critiques sont triees par date (plus recentes en premier)
- La note moyenne est calculee automatiquement

### Authentification

- Seuls les administrateurs connectes peuvent gerer les attractions
- Le token d'authentification expire apres un certain temps
- Il faut se reconnecter si le token expire

## Cas d'usage typiques

### Visiteur qui veut noter une attraction

1. Consulter la liste des attractions
2. Choisir une attraction
3. Cliquer sur "Laisser un avis"
4. Remplir le formulaire
5. Publier l'avis

### Administrateur qui ajoute une nouvelle attraction

1. Se connecter
2. Aller sur la page admin
3. Cliquer sur "Ajouter une attraction"
4. Remplir les informations
5. Activer ou non la visibilite
6. Enregistrer

### Administrateur qui cache une attraction temporairement

1. Se connecter
2. Trouver l'attraction dans la liste
3. Desactiver le switch "Visible pour les visiteurs"
4. Enregistrer
5. L'attraction disparait de la page d'accueil

## Erreurs courantes

### "ERR_EMPTY_RESPONSE" au demarrage

L'application Angular est en cours de demarrage. Attendre 1-2 minutes que les dependances npm s'installent.

### "Token invalide" lors de l'ajout d'attraction

Le token de session a expire. Se reconnecter a la page login.

### La modification d'une attraction ne fonctionne pas

Verifier que vous etes bien connecte en tant qu'administrateur.
