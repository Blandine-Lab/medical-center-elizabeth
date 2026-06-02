const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const db = new sqlite3.Database('hopital.db');

console.log('🚀 Création de la table patients...\n');

db.run(`CREATE TABLE IF NOT EXISTS patients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    password TEXT NOT NULL,
    date_naissance DATE,
    adresse TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`, (err) => {
    if (err) {
        console.error('❌ Erreur:', err.message);
        return;
    }
    console.log('✅ Table patients créée');
    
    // Ajouter des patients exemple
    db.get('SELECT COUNT(*) as count FROM patients', [], (err, row) => {
        if (row.count === 0) {
            const patients = [
                ['Sophie', 'Martin', 'sophie.martin@email.com', '0612345678', 'patient123', '1985-06-15'],
                ['Thomas', 'Bernard', 'thomas.bernard@email.com', '0623456789', 'patient123', '1990-03-22'],
                ['Marie', 'Dubois', 'marie.dubois@email.com', '0634567890', 'patient123', '1978-11-08']
            ];
            
            const stmt = db.prepare(`INSERT INTO patients (first_name, last_name, email, phone, password, date_naissance) VALUES (?, ?, ?, ?, ?, ?)`);
            
            patients.forEach(p => {
                const hashedPassword = bcrypt.hashSync(p[4], 10);
                stmt.run([p[0], p[1], p[2], p[3], hashedPassword, p[5]], function(err) {
                    if (err) console.error('Erreur:', err.message);
                    else console.log(`✅ Patient ajouté: ${p[0]} ${p[1]}`);
                });
            });
            stmt.finalize();
        } else {
            console.log(`📊 ${row.count} patients déjà existants`);
        }
    });
});

setTimeout(() => db.close(), 1500);