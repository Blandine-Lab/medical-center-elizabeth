const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('hopital.db');

console.log('🔐 Ajout des mots de passe pour le staff...\n');

const bcrypt = require('bcryptjs');

const staffPasswords = [
    { id: 1, email: 'jean.dupont@mce.fr', password: 'doctor123', name: 'Dr. Jean Dupont' },
    { id: 2, email: 'claire.bernard@mce.fr', password: 'doctor123', name: 'Dr. Claire Bernard' },
    { id: 3, email: 'sophie.martin@mce.fr', password: 'doctor123', name: 'Dr. Sophie Martin' },
    { id: 4, email: 'isabelle.leroy@mce.fr', password: 'nurse123', name: 'Isabelle Leroy' }
];

// Ajouter colonne password si elle n'existe pas
db.run(`ALTER TABLE staff ADD COLUMN password TEXT`, (err) => {
    if (err && !err.message.includes('duplicate')) {
        console.log('⚠️ Colonne password existe déjà ou erreur:', err.message);
    } else {
        console.log('✅ Colonne password ajoutée');
    }
    
    // Ajouter les mots de passe
    staffPasswords.forEach(staff => {
        const hashedPassword = bcrypt.hashSync(staff.password, 10);
        db.run(`UPDATE staff SET password = ?, email = ? WHERE id = ?`, 
            [hashedPassword, staff.email, staff.id], 
            function(err) {
                if (err) {
                    console.error(`❌ Erreur pour ${staff.name}:`, err.message);
                } else {
                    console.log(`✅ ${staff.name} - Email: ${staff.email}`);
                }
            });
    });
    
    setTimeout(() => {
        console.log('\n🎉 Staff mis à jour avec identifiants !');
        db.close();
    }, 1000);
});