const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('hopital.db');

console.log('🚀 Création de la table job_offers...\n');

db.run(`CREATE TABLE IF NOT EXISTS job_offers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    department TEXT NOT NULL,
    contract_type TEXT NOT NULL,
    location TEXT NOT NULL,
    description TEXT NOT NULL,
    requirements TEXT NOT NULL,
    posted_date DATE DEFAULT CURRENT_DATE,
    active INTEGER DEFAULT 1,
    salary_range TEXT
)`, (err) => {
    if (err) {
        console.error('❌ Erreur:', err.message);
        return;
    }
    console.log('✅ Table job_offers créée');
    
    // Vérifier et ajouter des offres
    db.get('SELECT COUNT(*) as count FROM job_offers', [], (err, row) => {
        if (row.count === 0) {
            const offers = [
                ['Cardiologue interventionnel', 'Cardiologie', 'CDI', 'Paris', 'Recherche cardiologue expérimenté pour notre pôle cardiaque de pointe.', 'Diplôme de spécialisation en cardiologie, 5 ans expérience', '90 000€ - 130 000€/an'],
                ['Infirmier(ère) bloc opératoire', 'Chirurgie', 'CDI', 'Paris', 'Poste en bloc opératoire robotisé.', 'Diplôme d\'État infirmier, IBODE requis', '38 000€ - 48 000€/an'],
                ['Technicien imagerie médicale', 'Radiologie', 'CDI', 'Paris', 'Manipulation IRM 7T et scanners nouvelle génération.', 'Diplôme manipulateur radio, expérience IRM', '35 000€ - 45 000€/an'],
                ['Data Scientist médical', 'Recherche', 'CDI', 'Paris', 'Développement d\'algorithmes IA pour diagnostic médical.', 'Master/PhD Data Science, Python/TensorFlow', '65 000€ - 90 000€/an']
            ];
            
            const stmt = db.prepare(`INSERT INTO job_offers (title, department, contract_type, location, description, requirements, salary_range) VALUES (?, ?, ?, ?, ?, ?, ?)`);
            offers.forEach(offer => stmt.run(offer));
            stmt.finalize();
            console.log('✅ 4 offres ajoutées');
        } else {
            console.log(`📊 ${row.count} offres existantes`);
        }
    });
});

setTimeout(() => db.close(), 1500);