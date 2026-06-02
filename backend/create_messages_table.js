const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('hopital.db');

console.log('🚀 Création de la table messages...\n');

db.run(`CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sender_type TEXT NOT NULL,
    sender_id INTEGER NOT NULL,
    sender_name TEXT NOT NULL,
    receiver_type TEXT NOT NULL,
    receiver_id INTEGER NOT NULL,
    receiver_name TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read INTEGER DEFAULT 0,
    reply_to_id INTEGER,
    sent_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    status TEXT DEFAULT 'sent'
)`, (err) => {
    if (err) {
        console.error('❌ Erreur création table:', err.message);
        return;
    }
    console.log('✅ Table messages créée');
    
    // Ajouter quelques messages d'exemple
    const exampleMessages = [
        ['patient', 1, 'Sophie Martin', 'staff', 1, 'Dr. Jean Dupont', 'Prise de rendez-vous', 'Bonjour docteur, je souhaiterais prendre un rendez-vous pour une consultation.', 0, null],
        ['patient', 2, 'Thomas Bernard', 'staff', 2, 'Dr. Claire Bernard', 'Question sur traitement', 'Bonjour, j\'ai une question concernant mon traitement actuel.', 0, null],
        ['staff', 1, 'Dr. Jean Dupont', 'patient', 1, 'Sophie Martin', 'RE: Prise de rendez-vous', 'Bonjour, je vous propose un rendez-vous mercredi prochain à 14h.', 0, 1]
    ];
    
    const stmt = db.prepare(`INSERT INTO messages (sender_type, sender_id, sender_name, receiver_type, receiver_id, receiver_name, subject, message, is_read, reply_to_id) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
    
    exampleMessages.forEach(msg => {
        stmt.run(msg, function(err) {
            if (err) console.error('Erreur insertion:', err.message);
            else console.log(`✅ Message ajouté: ${msg[6]}`);
        });
    });
    stmt.finalize();
    
    setTimeout(() => {
        console.log('\n🎉 Système de messagerie prêt !');
        db.close();
    }, 1000);
});

setTimeout(() => db.close(), 2000);