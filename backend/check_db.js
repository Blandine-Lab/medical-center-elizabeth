const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('hopital.db');

console.log('🔍 Inspection de la base de données...\n');

// Voir toutes les tables
db.all("SELECT name FROM sqlite_master WHERE type='table';", [], (err, tables) => {
    if (err) {
        console.error('Erreur:', err);
        return;
    }
    console.log('📁 Tables trouvées :');
    tables.forEach(table => {
        console.log(`   - ${table.name}`);
    });
    console.log('');
    
    // Voir la structure de site_contents
    db.all("PRAGMA table_info(site_contents);", [], (err, columns) => {
        if (err) {
            console.error('Erreur:', err);
            return;
        }
        console.log('📋 Structure de site_contents :');
        columns.forEach(col => {
            console.log(`   - ${col.name} (${col.type})`);
        });
        console.log('');
        
        // Voir le contenu actuel
        db.all("SELECT * FROM site_contents LIMIT 10;", [], (err, rows) => {
            if (err) {
                console.error('Erreur:', err);
                return;
            }
            console.log('📝 Contenu actuel (premiers enregistrements) :');
            rows.forEach(row => {
                console.log(`\n   🔑 ${JSON.stringify(row)}`);
            });
            db.close();
        });
    });
});