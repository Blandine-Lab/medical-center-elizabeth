const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('hopital.db');

console.log('🔄 Modification du nom de l\'hôpital dans la base de données...\n');

// Mettre à jour le titre principal de la page home
db.run(`UPDATE site_contents SET value = 'Bienvenue au Medical Center Elizabeth (MCE)' WHERE page = 'home' AND key = 'hero_title'`, function(err) {
    if (err) {
        console.error('❌ Erreur hero_title:', err);
    } else {
        console.log(`✅ Titre principal modifié (${this.changes} ligne(s)) - home/hero_title`);
    }
});

// Mettre à jour le sous-titre
db.run(`UPDATE site_contents SET value = 'Medical Center Elizabeth (MCE) - Là où la technologie rencontre l\'humain' WHERE page = 'home' AND key = 'hero_subtitle'`, function(err) {
    if (err) {
        console.error('❌ Erreur hero_subtitle:', err);
    } else {
        console.log(`✅ Sous-titre modifié (${this.changes} ligne(s)) - home/hero_subtitle`);
    }
});

// Mettre à jour l'histoire
db.run(`UPDATE site_contents SET value = 'Fondé en 2020, le Medical Center Elizabeth (MCE) est né de la volonté de réinventer la médecine hospitalière en alliant technologies de pointe et humanité.' WHERE page = 'about' AND key = 'history_text'`, function(err) {
    if (err) {
        console.error('❌ Erreur history_text:', err);
    } else {
        console.log(`✅ Histoire modifiée (${this.changes} ligne(s)) - about/history_text`);
    }
});

// Mettre à jour le titre de l'histoire
db.run(`UPDATE site_contents SET value = 'Notre histoire - Medical Center Elizabeth (MCE)' WHERE page = 'about' AND key = 'history_title'`, function(err) {
    if (err) {
        console.error('❌ Erreur history_title:', err);
    } else {
        console.log(`✅ Titre histoire modifié (${this.changes} ligne(s)) - about/history_title`);
    }
});

// Mettre à jour le support
db.run(`UPDATE site_contents SET value = 'Pourquoi soutenir le Medical Center Elizabeth (MCE) ?' WHERE page = 'support' AND key = 'intro_title'`, function(err) {
    if (err) {
        console.error('❌ Erreur support intro_title:', err);
    } else {
        console.log(`✅ Support modifié (${this.changes} ligne(s)) - support/intro_title`);
    }
});

// Modifier toutes les occurrences restantes dans toutes les pages
db.run(`UPDATE site_contents SET value = REPLACE(REPLACE(value, 'Nexus Santé', 'Medical Center Elizabeth (MCE)'), 'NEXUS SANTÉ', 'MEDICAL CENTER ELIZABETH (MCE)') WHERE value LIKE '%Nexus%' OR value LIKE '%NEXUS%'`, function(err) {
    if (err) {
        console.error('❌ Erreur remplacement global:', err);
    } else {
        console.log(`✅ Autres occurrences modifiées (${this.changes} ligne(s))`);
    }
});

// Afficher les modifications
db.all(`SELECT page, key, value FROM site_contents WHERE value LIKE '%Medical Center Elizabeth%' LIMIT 10`, [], (err, rows) => {
    if (err) {
        console.error('❌ Erreur:', err);
    } else {
        console.log('\n📋 Vérification des modifications :\n');
        rows.forEach(row => {
            console.log(`   ${row.page}/${row.key}: ${row.value.substring(0, 70)}...`);
        });
    }
    
    // Vérifier s'il reste encore "Nexus"
    db.all(`SELECT page, key, value FROM site_contents WHERE value LIKE '%Nexus%' OR value LIKE '%NEXUS%'`, [], (err, rows) => {
        if (err) {
            console.error('❌ Erreur:', err);
        } else if (rows.length > 0) {
            console.log('\n⚠️ Attention: Il reste encore des occurrences de "Nexus" :\n');
            rows.forEach(row => {
                console.log(`   ${row.page}/${row.key}: ${row.value.substring(0, 70)}...`);
            });
        } else {
            console.log('\n✅ Plus aucune occurrence de "Nexus" trouvée !');
        }
        db.close();
        console.log('\n🎉 Modification terminée ! Redémarrez votre serveur pour voir les changements.');
    });
});