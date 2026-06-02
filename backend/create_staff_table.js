const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('hopital.db');

console.log('🚀 Création de la table staff...\n');

// Supprimer l'ancienne table si elle existe
db.run(`DROP TABLE IF EXISTS staff`, (err) => {
    if (err) console.error('Erreur drop:', err);
    
    // Créer la nouvelle table
    db.run(`CREATE TABLE staff (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        full_name TEXT NOT NULL,
        profession TEXT NOT NULL,
        specialty TEXT,
        department TEXT NOT NULL,
        email TEXT,
        phone TEXT,
        cabinet_number TEXT,
        consultation_days TEXT,
        biography TEXT,
        experience_years INTEGER,
        languages TEXT,
        is_active INTEGER DEFAULT 1
    )`, (err) => {
        if (err) {
            console.error('❌ Erreur création:', err.message);
            return;
        }
        console.log('✅ Table staff créée');

        // Insérer les données
        const staffList = [
            ['Dr. Sophie Martin', 'Médecin', 'Cardiologie', 'Cardiologie', 'sophie.martin@mce.fr', '01 88 88 88 01', 'B201', 'Lun, Mer, Ven', 'Cardiologue avec 12 ans d\'expérience', 12, 'Français, Anglais'],
            ['Dr. Jean Dupont', 'Médecin', 'Chirurgie robotique', 'Chirurgie', 'jean.dupont@mce.fr', '01 88 88 88 02', 'B105', 'Mar, Jeu', 'Chirurgien spécialisé en robotique', 15, 'Français, Anglais'],
            ['Dr. Claire Bernard', 'Médecin', 'Neurologie', 'Neurologie', 'claire.bernard@mce.fr', '01 88 88 88 03', 'C310', 'Lun, Mar, Jeu', 'Neurologue spécialisée', 8, 'Français, Allemand'],
            ['Dr. Thomas Petit', 'Médecin', 'Pédiatrie', 'Pédiatrie', 'thomas.petit@mce.fr', '01 88 88 88 04', 'A115', 'Lun au Ven', 'Pédiatre expérimenté', 10, 'Français, Anglais'],
            ['Dr. Amina Diallo', 'Médecin', 'Gynécologie', 'Gynécologie', 'amina.diallo@mce.fr', '01 88 88 88 05', 'D208', 'Mar, Mer, Sam', 'Gynécologue obstétricienne', 14, 'Français, Anglais'],
            ['Isabelle Leroy', 'Infirmier', 'Soins intensifs', 'Urgences', 'isabelle.leroy@mce.fr', '01 88 88 88 10', 'Urgences', 'Roulement', 'Infirmière en soins intensifs', 8, 'Français'],
            ['Nicolas Dubois', 'Infirmier', 'Bloc opératoire', 'Chirurgie', 'nicolas.dubois@mce.fr', '01 88 88 88 11', 'Bloc B', 'Lun, Mar, Mer', 'Infirmier IBODE', 6, 'Français'],
            ['Sophie Lambert', 'Infirmier', 'Pédiatrie', 'Pédiatrie', 'sophie.lambert@mce.fr', '01 88 88 88 12', 'A120', 'Lun au Ven', 'Infirmière puéricultrice', 5, 'Français'],
            ['Marie Curie', 'Radiologue', 'Imagerie médicale', 'Radiologie', 'marie.curie@mce.fr', '01 88 88 88 20', 'E001', 'Lun, Mer, Jeu', 'Spécialiste IRM 7T', 9, 'Français, Anglais'],
            ['Philippe Durand', 'Kinésithérapeute', 'Rééducation', 'Médecine physique', 'philippe.durand@mce.fr', '01 88 88 88 21', 'F110', 'Lun au Sam', 'Kiné rééducation', 11, 'Français'],
            ['Laura Vincent', 'Psychologue', 'Psychologie clinique', 'Santé mentale', 'laura.vincent@mce.fr', '01 88 88 88 22', 'G205', 'Mar, Jeu, Ven', 'Psychologue clinicienne', 7, 'Français']
        ];

        const insertSql = `INSERT INTO staff (full_name, profession, specialty, department, email, phone, cabinet_number, consultation_days, biography, experience_years, languages) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        let count = 0;
        staffList.forEach((staff) => {
            db.run(insertSql, staff, function(err) {
                if (err) {
                    console.error('❌ Erreur:', err.message);
                } else {
                    count++;
                    console.log(`✅ ${staff[0]} (${staff[1]})`);
                }
            });
        });

        setTimeout(() => {
            console.log(`\n🎉 ${count} professionnels ajoutés !`);
            db.close();
        }, 1000);
    });
});