const db = require('./database');

db.serialize(() => {
    db.run("ALTER TABLE staff ADD COLUMN photo_url TEXT", (err) => {
        if (err) {
            if (err.message.includes('duplicate column name')) console.log("✅ photo_url existe déjà");
            else console.error("❌ Erreur photo_url:", err.message);
        } else console.log("✅ photo_url ajoutée");
    });
    db.run("ALTER TABLE staff ADD COLUMN department TEXT", (err) => {
        if (err) {
            if (err.message.includes('duplicate column name')) console.log("✅ department existe déjà");
            else console.error("❌ Erreur department:", err.message);
        } else console.log("✅ department ajoutée");
    });
    db.run("ALTER TABLE staff ADD COLUMN is_active INTEGER DEFAULT 1", (err) => {
        if (err) {
            if (err.message.includes('duplicate column name')) console.log("✅ is_active existe déjà");
            else console.error("❌ Erreur is_active:", err.message);
        } else console.log("✅ is_active ajoutée");
    });
});