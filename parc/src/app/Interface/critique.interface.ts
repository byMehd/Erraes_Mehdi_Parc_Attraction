export interface CritiqueInterface {
    critique_id: number | null,
    attraction_id: number,
    texte: string,
    note: number,
    prenom: string | null,
    nom: string | null,
    date_creation: string
}
