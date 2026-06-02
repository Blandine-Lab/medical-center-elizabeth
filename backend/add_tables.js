const db = require('./database');

db.serialize(() => {
  // Table pour les photos de l'établissement (4 espaces)
  db.run(`CREATE TABLE IF NOT EXISTS etablissement_photos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titre TEXT NOT NULL,
    description TEXT,
    image_url TEXT NOT NULL,
    ordre INTEGER DEFAULT 0,
    active INTEGER DEFAULT 1
  )`);

  // Table pour les partenaires
  db.run(`CREATE TABLE IF NOT EXISTS partenaires (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL,
    description TEXT,
    image_url TEXT NOT NULL,
    commentaire TEXT,
    ordre INTEGER DEFAULT 0,
    active INTEGER DEFAULT 1
  )`);

  console.log('✅ Tables ajoutées : etablissement_photos, partenaires');
});