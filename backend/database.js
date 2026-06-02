const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'hopital.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  // Table des médecins
  db.run(`CREATE TABLE IF NOT EXISTS doctors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    specialty TEXT NOT NULL
  )`);

  // Table des rendez-vous (avec teleconsultation_link)
  db.run(`CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fullname TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    specialty TEXT,
    date TEXT NOT NULL,
    time TEXT,
    message TEXT,
    doctor_id INTEGER,
    reminder_sent INTEGER DEFAULT 0,
    teleconsultation_link TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(doctor_id) REFERENCES doctors(id) ON DELETE CASCADE
  )`);

  // Table des disponibilités
  db.run(`CREATE TABLE IF NOT EXISTS availabilities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    doctor_id INTEGER NOT NULL,
    date TEXT NOT NULL,
    time_slot TEXT NOT NULL,
    is_booked INTEGER DEFAULT 0,
    UNIQUE(doctor_id, date, time_slot),
    FOREIGN KEY(doctor_id) REFERENCES doctors(id) ON DELETE CASCADE
  )`);

  // Table des événements (ceux de l'admin, type conférences)
  db.run(`CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    start_date DATE,
    end_date DATE,
    active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Table des contenus dynamiques (textes des pages)
  db.run(`CREATE TABLE IF NOT EXISTS site_contents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    page TEXT NOT NULL,
    key TEXT NOT NULL,
    value TEXT,
    UNIQUE(page, key)
  )`);

  // Table des actualités (page d'accueil)
  db.run(`CREATE TABLE IF NOT EXISTS actualites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titre TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT,
    ordre INTEGER DEFAULT 0,
    active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Table des spécialités
  db.run(`CREATE TABLE IF NOT EXISTS specialties (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    ordre INTEGER DEFAULT 0,
    active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Insertion des médecins par défaut
  db.get("SELECT COUNT(*) as count FROM doctors", (err, row) => {
    if (err) return;
    if (row.count === 0) {
      const insert = db.prepare("INSERT INTO doctors (name, specialty) VALUES (?, ?)");
      insert.run("Dr. Sophia El Akram", "Neurochirurgie robotique");
      insert.run("Pr. Marc Delacroix", "Cardiologie interventionnelle IA");
      insert.run("Dr. Léa Morvan", "Médecine régénérative & biotech");
      insert.finalize();
      console.log("✅ Médecins par défaut ajoutés");

      // Génération des créneaux pour les 7 prochains jours
      db.all("SELECT id FROM doctors", (err, doctors) => {
        if (err || !doctors) return;
        const timeSlots = ["09:00-10:00","10:00-11:00","11:00-12:00","14:00-15:00","15:00-16:00","16:00-17:00"];
        const today = new Date();
        for (let i = 1; i <= 7; i++) {
          const date = new Date(today);
          date.setDate(today.getDate() + i);
          const dateStr = date.toISOString().split('T')[0];
          doctors.forEach(doc => {
            timeSlots.forEach(slot => {
              db.run(`INSERT OR IGNORE INTO availabilities (doctor_id, date, time_slot) VALUES (?, ?, ?)`, [doc.id, dateStr, slot]);
            });
          });
        }
        console.log("✅ Disponibilités générées pour les 7 prochains jours");
      });
    }
  });

  // Contenu par défaut pour les pages (site_contents)
  db.get("SELECT COUNT(*) as count FROM site_contents", (err, row) => {
    if (err) return;
    if (row.count === 0) {
      const defaultContents = [
        // Page d'accueil
        ['home', 'hero_badge', 'Médecine de précision · IA intégrée'],
        ['home', 'hero_title', 'Bienvenue à l\'Hôpital Medical Center Elizabeth'],
        ['home', 'hero_desc', 'Blocs opératoires robotisés, diagnostic augmenté par intelligence artificielle et télémédecine immersive.'],
        ['home', 'stat1_number', '98%'],
        ['home', 'stat1_label', 'Satisfaction patient'],
        ['home', 'stat2_number', '24/7'],
        ['home', 'stat2_label', 'Urgences & téléconsultation'],
        ['home', 'stat3_number', '+150'],
        ['home', 'stat3_label', 'Spécialistes hautement qual.'],
        // Page "Nous connaître"
        ['about', 'history_title', 'Notre histoire'],
        ['about', 'history_text', 'Fondé en 2020, l’Hôpital Nexus Santé est né de la volonté de réinventer la médecine hospitalière en alliant technologies de pointe et humanité.'],
        ['about', 'mission_title', 'Notre mission'],
        ['about', 'mission_text', 'Offrir une prise en charge personnalisée, rapide et innovante, accessible à tous. Nous plaçons le patient au centre de chaque décision, en nous appuyant sur l’intelligence artificielle, la robotique et une équipe médicale d’exception.'],
        ['about', 'value1_title', 'Humanité'],
        ['about', 'value1_desc', 'Respect, écoute et compassion envers chaque patient.'],
        ['about', 'value2_title', 'Innovation'],
        ['about', 'value2_desc', 'Adoption constante des avancées technologiques.'],
        ['about', 'value3_title', 'Collaboration'],
        ['about', 'value3_desc', 'Équipes pluridisciplinaires soudées autour du patient.'],
        ['about', 'value4_title', 'Excellence'],
        ['about', 'value4_desc', 'Recherche de la meilleure qualité de soins.'],
        // Page "Nous soutenir"
        ['support', 'intro_title', 'Pourquoi soutenir Nexus Santé ?'],
        ['support', 'intro_text', 'Votre générosité nous permet d’investir dans des équipements de pointe, de financer la recherche et d’améliorer l’accès aux soins pour tous.'],
        ['support', 'don_title', 'Faire un don'],
        ['support', 'don_desc', 'Contribuez directement à nos actions et bénéficiez d’un reçu fiscal.'],
        ['support', 'patron_title', 'Mécénat d’entreprise'],
        ['support', 'patron_desc', 'Devenez partenaire et soutenez l’innovation médicale.'],
        ['support', 'volunteer_title', 'Bénévolat'],
        ['support', 'volunteer_desc', 'Rejoignez notre équipe de bénévoles pour accompagner patients et familles.'],
        // Page Check-up Center
        ['checkup', 'essential_title', 'Bilan essentiel'],
        ['checkup', 'essential_price', '150€ HT'],
        ['checkup', 'essential_desc', 'Prise de sang, ECG, entretien médical.'],
        ['checkup', 'comfort_title', 'Bilan confort +'],
        ['checkup', 'comfort_price', '290€ HT'],
        ['checkup', 'comfort_desc', 'Échographie abdominale, dépistage cardiovasculaire, bilan nutritionnel.'],
        ['checkup', 'premium_title', 'Bilan premium'],
        ['checkup', 'premium_price', '590€ HT'],
        ['checkup', 'premium_desc', 'IRM, test d’effort, analyse génétique optionnelle.'],
        // Page Nos spécialités
        ['specialties', 'cardio_title', 'Cardiologie interventionnelle'],
        ['specialties', 'cardio_desc', 'Prise en charge des maladies cardiaques avec technologies de pointe.'],
        ['specialties', 'neuro_title', 'Neurochirurgie robotique'],
        ['specialties', 'neuro_desc', 'Chirurgie cérébrale et rachidienne assistée par robot.'],
        ['specialties', 'radio_title', 'Imagerie médicale avancée'],
        ['specialties', 'radio_desc', 'IRM 3T, scanner ultra-rapide, échographie haute résolution.'],
        ['specialties', 'oncologie_title', 'Oncologie de précision'],
        ['specialties', 'oncologie_desc', 'Traitements personnalisés et immunothérapie.'],
        // Page Informations patients & visiteurs
        ['info', 'hours_title', 'Horaires d\'ouverture'],
        ['info', 'hours_text', 'Lundi – vendredi : 8h – 20h<br>Samedi : 9h – 17h<br>Urgences 24h/24, 7j/7'],
        ['info', 'access_title', 'Accès'],
        ['info', 'access_text', 'Métro : ligne 1, station Hôpital<br>Bus : 24, 56, 78<br>Parking gratuit réservé aux patients'],
        ['info', 'admission_title', 'Admission'],
        ['info', 'admission_text', 'Munissez-vous de votre carte d’identité, carte vitale et coordonnées du médecin traitant.'],
        // Page Notre offre de soins
        ['offre', 'telemed_title', 'Télémédecine'],
        ['offre', 'telemed_desc', 'Consultations à distance, suivi post-opératoire et avis spécialisés.'],
        ['offre', 'espace_patient_title', 'Espace patient sécurisé'],
        ['offre', 'espace_patient_desc', 'Accès aux résultats, messagerie avec votre médecin, gestion des rendez-vous.'],
        ['offre', 'ia_title', 'Intelligence Artificielle'],
        ['offre', 'ia_desc', 'Diagnostic assisté, planning opératoire optimisé, aide à la décision.'],
        ['offre', 'robotique_title', 'Robotique chirurgicale'],
        ['offre', 'robotique_desc', 'Précision millimétrique, gestes mini-invasifs, récupération accélérée.']
      ];
      const stmt = db.prepare("INSERT OR IGNORE INTO site_contents (page, key, value) VALUES (?, ?, ?)");
      defaultContents.forEach(([page, key, value]) => stmt.run(page, key, value));
      stmt.finalize();
      console.log("✅ Contenu dynamique par défaut initialisé");
    }
  });

  // Actualités par défaut
  db.get("SELECT COUNT(*) as count FROM actualites", (err, row) => {
    if (err) return;
    if (row.count === 0) {
      const insert = db.prepare("INSERT INTO actualites (titre, description, image_url, ordre, active) VALUES (?, ?, ?, ?, ?)");
      insert.run("Juin Bleu 2026 : ensemble contre le cancer colorectal", "Dépistage gratuit et informations tout au long du mois. Mobilisons-nous !", "/actualite1.PNG", 1, 1);
      insert.run("Perturbateurs endocriniens : un événement pour en apprendre +", "Conférence et ateliers le 10 juin. Inscription gratuite.", "/actualite2.PNG", 2, 1);
      insert.run("Grossesse : le premier trimestre, une période clé du dépistage – Le CPDPN de l’Hôpital Américain de Paris au service d’une formation experte.", "Rendez-vous avec nos spécialistes pour un suivi personnalisé.", "/actualite3.PNG", 3, 1);
      insert.finalize();
      console.log("✅ Actualités par défaut ajoutées");
    }
  });

  // Spécialités par défaut
  db.get("SELECT COUNT(*) as count FROM specialties", (err, row) => {
    if (err) return;
    if (row.count === 0) {
      const specialtiesList = [
        "Anesthésie", "Assistance médicale à la procréation", "BILANS EXTERNES", "Cancer du sein", "Cardiologie",
        "Centre de Dialyse conventionné", "Centre de réhabilitation orale & dentaire", "Centre Endométriose", "Check-Up Center", "Check-Up Center Abidjan",
        "Chirurgie du sein", "Chirurgie gynécologique", "Chirurgie pédiatrique", "Chirurgie plastique", "Chirurgie thoracique",
        "Chirurgie vasculaire", "Chirurgie viscérale et digestive", "Dermatologie", "Diabétologie, Endocrinologie, Thyroïdologie",
        "Diagnostic Prénatal", "Explorations fonctionnelles", "Gastroentérologie et hépatologie", "Gériatrie", "Healthy Longevity",
        "Hématologie", "Imagerie Médicale", "Kinésithérapie", "Laboratoire d'Analyses de Biologie Médicale", "Maternité",
        "Médecine interne", "Médecine nucléaire", "Médecine vasculaire", "Néphrologie et Hémodialyse", "Neurologie",
        "Oncologie", "Ophtalmologie", "Orthopédie et Traumatologie", "Oto-rhino-laryngologie (ORL)", "Pédiatrie",
        "Permanence médico-chirurgicale", "Pneumologie", "Psychiatrie", "PSYCHOTHERAPEUTE", "Radiologie interventionnelle",
        "Radiothérapie", "Réanimation et Surveillance continue", "Rhumatologie, médecine physique et adaptation",
        "Soins de support & soins palliatifs", "Urologie"
      ];
      const insert = db.prepare("INSERT INTO specialties (name, ordre, active) VALUES (?, ?, ?)");
      specialtiesList.forEach((name, idx) => insert.run(name, idx, 1));
      insert.finalize();
      console.log("✅ Spécialités par défaut ajoutées");
    }
  });
});

module.exports = db;