const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('hopital.db');

console.log('🔄 Modification du nom de l\'hôpital dans la base de données...\n');

// Mettre à jour le titre principal
db.run(`UPDATE site_contents SET value = 'Bienvenue au Medical Center Elizabeth (MCE)' WHERE key = 'homehero_title'`, function(err) {
    if (err) {
        console.error('❌ Erreur:', err);
    } else {
        console.log(`✅ Titre principal modifié (${this.changes} ligne(s))`);
    }
});

// Mettre à jour le sous-titre
db.run(`UPDATE site_contents SET value = 'Medical Center Elizabeth (MCE)' WHERE key = 'homehero_subtitle'`, function(err) {
    if (err) {
        console.error('❌ Erreur:', err);
    } else {
        console.log(`✅ Sous-titre modifié (${this.changes} ligne(s))`);
    }
});

// Mettre à jour l'histoire
db.run(`UPDATE site_contents SET value = 'Fondé en 2020, le Medical Center Elizabeth (MCE) est né de la volonté de réinventer la médecine hospitalière en alliant technologies de pointe et humanité.' WHERE key = 'abouthistory_text'`, function(err) {
    if (err) {
        console.error('❌ Erreur:', err);
    } else {
        console.log(`✅ Histoire modifiée (${this.changes} ligne(s))`);
    }
});

// Mettre à jour le support
db.run(`UPDATE site_contents SET value = 'Pourquoi soutenir le Medical Center Elizabeth (MCE) ?' WHERE key = 'supportintro_title'`, function(err) {
    if (err) {
        console.error('❌ Erreur:', err);
    } else {
        console.log(`✅ Support modifié (${this.changes} ligne(s))`);
    }
});

// Modifier toutes les occurrences restantes
db.run(`UPDATE site_contents SET value = REPLACE(value, 'Nexus Santé', 'Medical Center Elizabeth (MCE)') WHERE value LIKE '%Nexus Santé%'`, function(err) {
    if (err) {
        console.error('❌ Erreur:', err);
    } else {
        console.log(`✅ Autres occurrences modifiées (${this.changes} ligne(s))`);
    }
});

// Afficher les modifications
db.all(`SELECT key, value FROM site_contents WHERE key IN ('homehero_title', 'homehero_subtitle', 'abouthistory_text', 'supportintro_title')`, [], (err, rows) => {
    if (err) {
        console.error('❌ Erreur:', err);
    } else {
        console.log('\n📋 Vérification des modifications :\n');
        rows.forEach(row => {
            console.log(`${row.key}: ${row.value.substring(0, 80)}...`);
        });
    }
    db.close();
    console.log('\n✅ Modification terminée ! Redémarrez votre serveur pour voir les changements.');
});