const db = require('./database');

const tarifs = [
    ['Consultations', 'Consultation générale', '50€', 'Durée 20 min', 1, 1],
    ['Consultations', 'Consultation spécialiste', '80€', 'Cardiologue, dermatologue, etc.', 2, 1],
    ['Consultations', 'Téléconsultation', '45€', 'Par visio', 3, 1],
    ['Imagerie médicale', 'IRM', '120€ - 250€', 'Selon la zone', 1, 1],
    ['Imagerie médicale', 'Scanner', '80€ - 180€', 'Avec ou sans injection', 2, 1],
    ['Imagerie médicale', 'Échographie', '60€ - 100€', '', 3, 1],
    ['Chirurgie', 'Chirurgie ambulatoire', '300€ - 800€', 'Selon acte', 1, 1],
    ['Chirurgie', 'Chirurgie robotique', '500€ - 1500€', 'Tarif hors dépassements', 2, 1]
];

db.serialize(() => {
    const stmt = db.prepare(`INSERT OR IGNORE INTO tarifs (service, prestation, prix, description, ordre, active) VALUES (?, ?, ?, ?, ?, ?)`);
    for (const t of tarifs) {
        stmt.run(t, (err) => {
            if (err) console.error('Erreur insertion:', err.message);
            else console.log(`✅ Tarif ajouté : ${t[0]} - ${t[1]}`);
        });
    }
    stmt.finalize();
    setTimeout(() => {
        console.log('✅ Tous les tarifs ont été insérés.');
        process.exit();
    }, 500);
});