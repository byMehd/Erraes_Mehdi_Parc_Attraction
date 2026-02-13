import request.request as req

def add_critique(data):
    if not "attraction_id" in data or data["attraction_id"] is None:
        return False
    
    if not "texte" in data or data["texte"] == "":
        return False

    if not "note" in data or data["note"] is None or data["note"] < 1 or data["note"] > 5:
        return False

    prenom = data.get("prenom")
    nom = data.get("nom")

    requete = "INSERT INTO critique (attraction_id, texte, note, prenom, nom) VALUES (?, ?, ?, ?, ?);"
    id = req.insert_in_db(requete, (data["attraction_id"], data["texte"], data["note"], prenom, nom))

    return id

def get_critiques_by_attraction(attraction_id):
    if not attraction_id:
        return False

    json = req.select_from_db("SELECT * FROM critique WHERE attraction_id = ? ORDER BY date_creation DESC", (attraction_id,))

    return json

def get_average_rating(attraction_id):
    if not attraction_id:
        return None

    result = req.select_from_db("SELECT AVG(note) as moyenne FROM critique WHERE attraction_id = ?", (attraction_id,))
    
    if result and len(result) > 0 and result[0].get("moyenne"):
        return round(result[0]["moyenne"], 1)
    
    return None
