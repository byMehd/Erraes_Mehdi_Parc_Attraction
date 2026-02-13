# Schema de la base de donnees

## Vue d'ensemble

La base de donnees contient 3 tables :

- attraction : Liste des attractions du parc
- users : Comptes administrateurs
- critique : Avis laisses par les visiteurs

## Diagramme relationnel

```
┌─────────────────────┐
│     attraction      │
├─────────────────────┤
│ attraction_id (PK)  │
│ nom                 │
│ description         │
│ difficulte          │
│ visible             │
└──────────┬──────────┘
           │
           │ 1
           │
           │
           │ N
┌──────────▼──────────┐
│      critique       │
├─────────────────────┤
│ critique_id (PK)    │
│ attraction_id (FK)  │
│ texte               │
│ note                │
│ prenom              │
│ nom                 │
│ date_creation       │
└─────────────────────┘

┌─────────────────────┐
│       users         │
├─────────────────────┤
│ users_id (PK)       │
│ name                │
│ password            │
└─────────────────────┘
```

## Table : attraction

Stocke les informations sur les attractions du parc.

### Colonnes

| Colonne        | Type         | Contraintes          | Description                           |
|----------------|--------------|----------------------|---------------------------------------|
| attraction_id  | int          | PRIMARY KEY, AUTO_INCREMENT | Identifiant unique de l'attraction    |
| nom            | varchar(255) | NOT NULL             | Nom de l'attraction                   |
| description    | varchar(255) | NOT NULL             | Description de l'attraction           |
| difficulte     | int          |                      | Niveau de difficulte de 1 a 5         |
| visible        | bool         | DEFAULT true         | Visibilite pour les visiteurs         |

### Exemple de donnees

| attraction_id | nom          | description       | difficulte | visible |
|---------------|--------------|-------------------|------------|---------|
| 1             | Silver Star  | Montagne russe    | 3          | 1       |
| 2             | Montagne 8   | Montagne russe    | 4          | 1       |

## Table : critique

Stocke les avis laisses par les visiteurs sur les attractions.

### Colonnes

| Colonne        | Type         | Contraintes                    | Description                              |
|----------------|--------------|--------------------------------|------------------------------------------|
| critique_id    | int          | PRIMARY KEY, AUTO_INCREMENT    | Identifiant unique de la critique        |
| attraction_id  | int          | FOREIGN KEY, NOT NULL          | Reference vers l'attraction              |
| texte          | text         | NOT NULL                       | Contenu de l'avis                        |
| note           | int          | NOT NULL                       | Note donnee de 1 a 5                     |
| prenom         | varchar(255) | NULL                           | Prenom de l'auteur (optionnel)           |
| nom            | varchar(255) | NULL                           | Nom de l'auteur (optionnel)              |
| date_creation  | timestamp    | DEFAULT CURRENT_TIMESTAMP      | Date et heure de creation de la critique |

### Relations

- `attraction_id` reference `attraction(attraction_id)`
- Suppression en cascade : si une attraction est supprimee, ses critiques le sont aussi (`ON DELETE CASCADE`)

### Exemple de donnees

| critique_id | attraction_id | texte                    | note | prenom | nom    | date_creation       |
|-------------|---------------|--------------------------|------|--------|--------|---------------------|
| 1           | 1             | Super attraction         | 5    | Jean   | Dupont | 2024-01-15 14:30:00 |
| 2           | 1             | Tres bien                | 4    | NULL   | NULL   | 2024-01-16 10:15:00 |

## Table : users

Stocke les comptes administrateurs.

### Colonnes

| Colonne   | Type         | Contraintes          | Description                      |
|-----------|--------------|----------------------|----------------------------------|
| users_id  | int          | PRIMARY KEY, AUTO_INCREMENT | Identifiant unique de l'utilisateur |
| name      | varchar(255) | NOT NULL             | Nom d'utilisateur                |
| password  | varchar(255) | NOT NULL             | Mot de passe                     |

### Exemple de donnees

| users_id | name  | password |
|----------|-------|----------|
| 1        | admin | admin    |

### Note de securite

Les mots de passe sont actuellement stockes en clair. Il est recommande de les hasher (bcrypt, argon2) en production.

## Relations entre les tables

### attraction - critique

- Une attraction peut avoir plusieurs critiques (relation 1-N)
- Une critique appartient a une seule attraction
- Si une attraction est supprimee, toutes ses critiques sont supprimees

### users (table independante)

- Aucune relation avec les autres tables
- Utilisee uniquement pour l'authentification des administrateurs

## Requetes SQL courantes

### Recuperer toutes les attractions visibles

```sql
SELECT * FROM attraction WHERE visible = 1;
```

### Recuperer les critiques d'une attraction

```sql
SELECT * FROM critique 
WHERE attraction_id = ? 
ORDER BY date_creation DESC;
```

### Calculer la note moyenne d'une attraction

```sql
SELECT AVG(note) as moyenne 
FROM critique 
WHERE attraction_id = ?;
```

### Ajouter une critique

```sql
INSERT INTO critique (attraction_id, texte, note, prenom, nom) 
VALUES (?, ?, ?, ?, ?);
```

### Modifier une attraction

```sql
UPDATE attraction 
SET nom = ?, description = ?, difficulte = ?, visible = ? 
WHERE attraction_id = ?;
```

## Initialisation de la base

Les scripts SQL sont dans le dossier `python/sql_file/` :

- `init.sql` : Creation des tables
- `create.sql` : Insertion des donnees initiales

Ces scripts sont executes automatiquement au demarrage du conteneur database.
