<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Offres d'emploi - Medical Center Elizabeth (MCE)</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background: #f0f7fc; color: #1a2c3e; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        
        /* Header et navbar */
        .top-bar { background: #061e28; color: white; padding: 0.5rem 2rem; display: flex; justify-content: space-between; flex-wrap: wrap; }
        .top-bar a { color: white; text-decoration: none; }
        .navbar { background: white; box-shadow: 0 2px 10px rgba(0,0,0,0.1); position: sticky; top: 0; z-index: 1000; }
        .nav-container { display: flex; justify-content: space-between; align-items: center; padding: 1rem 2rem; max-width: 1400px; margin: 0 auto; flex-wrap: wrap; }
        .logo { display: flex; align-items: center; gap: 12px; }
        .logo img { height: 50px; border-radius: 10px; }
        .logo h1 { font-size: 1.3rem; color: #0b6e8f; }
        .nav-links { display: flex; gap: 2rem; flex-wrap: wrap; }
        .nav-links a { text-decoration: none; color: #1a2c3e; font-weight: 500; transition: color 0.3s; }
        .nav-links a:hover, .nav-links a.active { color: #0b6e8f; }
        
        /* Section offres */
        .jobs-header { background: linear-gradient(135deg, #0b6e8f 0%, #2ec4b6 100%); color: white; padding: 4rem 0; text-align: center; }
        .jobs-header h1 { font-size: 2.5rem; margin-bottom: 1rem; }
        .filters { background: white; padding: 1.5rem; border-radius: 1rem; margin: -2rem 0 2rem; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
        .filter-group { display: flex; gap: 1rem; flex-wrap: wrap; }
        .filter-group select, .filter-group input { padding: 0.8rem; border: 1px solid #ddd; border-radius: 0.5rem; flex: 1; min-width: 150px; font-family: inherit; }
        
        .job-card { background: white; border-radius: 1rem; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.05); transition: transform 0.3s; }
        .job-card:hover { transform: translateY(-3px); box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
        .job-title { font-size: 1.3rem; color: #0b6e8f; margin-bottom: 0.5rem; }
        .job-meta { display: flex; gap: 1.5rem; flex-wrap: wrap; margin-bottom: 1rem; color: #666; font-size: 0.9rem; }
        .job-meta i { margin-right: 0.3rem; }
        .badge { display: inline-block; padding: 0.2rem 0.8rem; border-radius: 20px; font-size: 0.8rem; font-weight: 600; }
        .badge-cdi { background: #e8f5e9; color: #2e7d32; }
        .badge-cdd { background: #fff3e0; color: #e65100; }
        .badge-stage { background: #e3f2fd; color: #1565c0; }
        .badge-freelance { background: #f3e5f5; color: #7b1fa2; }
        .job-description { color: #555; margin: 1rem 0; line-height: 1.5; }
        .btn-apply { background: #0b6e8f; color: white; border: none; padding: 0.6rem 1.5rem; border-radius: 2rem; cursor: pointer; transition: background 0.3s; font-size: 0.9rem; }
        .btn-apply:hover { background: #07506b; }
        
        footer { background: #061e28; color: white; padding: 3rem 0 1.5rem; margin-top: 3rem; }
        .copyright { text-align: center; padding-top: 2rem; border-top: 1px solid #2d4a5a; }
        
        @media (max-width: 768px) { 
            .nav-links { display: none; } 
            .job-meta { flex-direction: column; gap: 0.5rem; }
            .top-bar { flex-direction: column; text-align: center; gap: 0.5rem; }
            .jobs-header h1 { font-size: 1.8rem; }
        }
    </style>
</head>
<body>

<div class="top-bar">
    <div><i class="fas fa-phone-alt"></i> Urgences 24/7 : +33 (0)1 88 88 88 88</div>
    <div><i class="fas fa-envelope"></i> rh@mce-hospital.fr</div>
</div>

<nav class="navbar">
    <div class="nav-container">
        <div class="logo">
            <img src="logo.jpeg" alt="MCE" onerror="this.src='pth.jpg'">
            <h1>Medical Center Elizabeth</h1>
        </div>
        <div class="nav-links">
            <a href="index.html">Accueil</a>
            <a href="jobs.html" class="active">Offres d'emploi</a>
            <a href="espace-patient.html">Espace Patient</a>
            <a href="support.html">Support</a>
        </div>
    </div>
</nav>

<section class="jobs-header">
    <div class="container">
        <h1><i class="fas fa-briefcase"></i> Rejoignez Medical Center Elizabeth</h1>
        <p>Des carrières d'excellence au service de la santé de demain</p>
    </div>
</section>

<div class="container">
    <div class="filters">
        <div class="filter-group">
            <input type="text" id="searchInput" placeholder="Rechercher un poste...">
            <select id="departmentFilter">
                <option value="">Tous les départements</option>
                <option value="Cardiologie">Cardiologie</option>
                <option value="Chirurgie">Chirurgie</option>
                <option value="Radiologie">Radiologie</option>
                <option value="Recherche">Recherche</option>
                <option value="Urgences">Urgences</option>
                <option value="Soins intensifs">Soins intensifs</option>
                <option value="Pédiatrie">Pédiatrie</option>
                <option value="Gynécologie">Gynécologie</option>
                <option value="Neurologie">Neurologie</option>
                <option value="Rééducation">Rééducation</option>
            </select>
            <select id="contractFilter">
                <option value="">Tous les contrats</option>
                <option value="CDI">CDI</option>
                <option value="CDD">CDD</option>
                <option value="Stage">Stage</option>
                <option value="Freelance">Freelance</option>
                <option value="Temps partiel">Temps partiel</option>
            </select>
        </div>
    </div>

    <div id="jobsList">
        <div style="text-align: center; padding: 2rem;">
            <i class="fas fa-spinner fa-spin" style="font-size: 2rem; color: #0b6e8f;"></i>
            <p>Chargement des offres...</p>
        </div>
    </div>
</div>

<footer>
    <div class="container">
        <div class="copyright">
            <p>© 2026 Medical Center Elizabeth (MCE) — Rejoignez une équipe d'exception</p>
        </div>
    </div>
</footer>

<script>
    const STORAGE_KEY = 'medical_center_db';
    
    // Récupérer la base de données
    function getDB() {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            return JSON.parse(saved);
        }
        return {
            jobs: [
                { id: 1, title: "Infirmier en soins intensifs", department: "Soins intensifs", contract_type: "CDI", location: "Paris", description: "Recherche infirmier expérimenté pour soins intensifs.", requirements: "Diplôme d'état + 2 ans d'expérience", salary_range: "2500€ - 3000€/mois", active: 1 },
                { id: 2, title: "Médecin urgentiste", department: "Urgences", contract_type: "CDI", location: "Paris", description: "Urgentiste pour service 24/7.", requirements: "Diplôme de médecine d'urgence + validation DES", salary_range: "6000€ - 7500€/mois", active: 1 },
                { id: 3, title: "Radiologue", department: "Radiologie", contract_type: "CDI", location: "Paris", description: "Recherche radiologue pour imagerie médicale.", requirements: "Diplôme de radiologie + expérience", salary_range: "7000€ - 8500€/mois", active: 1 }
            ],
            siteContent: {}
        };
    }
    
    async function loadJobs() {
        try {
            const db = getDB();
            const jobs = (db.jobs || []).filter(job => job.active === 1);
            displayJobs(jobs);
        } catch(err) {
            console.error('Erreur:', err);
            document.getElementById('jobsList').innerHTML = '<div style="text-align:center;padding:2rem;color:red;">❌ Erreur chargement des offres</div>';
        }
    }
    
    function getBadgeClass(contractType) {
        const types = {
            'CDI': 'badge-cdi',
            'CDD': 'badge-cdd',
            'Stage': 'badge-stage',
            'Freelance': 'badge-freelance',
            'Temps partiel': 'badge-cdd'
        };
        return types[contractType] || 'badge-cdd';
    }
    
    function displayJobs(jobs) {
        const container = document.getElementById('jobsList');
        if (!jobs || jobs.length === 0) {
            container.innerHTML = '<div style="text-align:center;padding:2rem;">📭 Aucune offre pour le moment. Revenez bientôt !</div>';
            return;
        }
        
        container.innerHTML = jobs.map(job => `
            <div class="job-card" data-department="${escapeHtml(job.department)}" data-title="${escapeHtml(job.title)}" data-contract="${escapeHtml(job.contract_type)}" data-id="${job.id}">
                <h3 class="job-title">${escapeHtml(job.title)}</h3>
                <div class="job-meta">
                    <span><i class="fas fa-building"></i> ${escapeHtml(job.department)}</span>
                    <span><i class="fas fa-tag"></i> <span class="badge ${getBadgeClass(job.contract_type)}">${escapeHtml(job.contract_type)}</span></span>
                    <span><i class="fas fa-map-marker-alt"></i> ${escapeHtml(job.location)}</span>
                    ${job.salary_range ? `<span><i class="fas fa-euro-sign"></i> ${escapeHtml(job.salary_range)}</span>` : ''}
                </div>
                <p class="job-description">${escapeHtml(job.description)}</p>
                <p class="job-description" style="font-size:0.9rem;"><strong>📋 Prérequis :</strong> ${escapeHtml(job.requirements)}</p>
                <button class="btn-apply" onclick='applyJob(${JSON.stringify(job)})'>📩 Postuler <i class="fas fa-paper-plane"></i></button>
            </div>
        `).join('');
    }
    
    function applyJob(job) {
        const email = prompt(`📝 Postuler pour "${job.title}"\n\nVeuillez entrer votre adresse email :`);
        if (email && email.includes('@')) {
            // Sauvegarder la candidature dans localStorage
            const applications = JSON.parse(localStorage.getItem('job_applications') || '[]');
            applications.push({
                id: Date.now(),
                jobId: job.id,
                jobTitle: job.title,
                email: email,
                date: new Date().toISOString()
            });
            localStorage.setItem('job_applications', JSON.stringify(applications));
            
            alert(`✅ Candidature envoyée !\n\nNous vous contacterons sous 48h à ${email}`);
        } else if (email) {
            alert('❌ Email invalide');
        }
    }
    
    function filterJobs() {
        const search = document.getElementById('searchInput')?.value.toLowerCase() || '';
        const department = document.getElementById('departmentFilter')?.value || '';
        const contract = document.getElementById('contractFilter')?.value || '';
        
        document.querySelectorAll('.job-card').forEach(card => {
            const title = card.dataset.title?.toLowerCase() || '';
            const dept = card.dataset.department || '';
            const contractText = card.dataset.contract || '';
            
            const matchSearch = title.includes(search);
            const matchDept = !department || dept === department;
            const matchContract = !contract || contractText === contract;
            
            card.style.display = (matchSearch && matchDept && matchContract) ? 'block' : 'none';
        });
    }
    
    function escapeHtml(str) {
        if (!str) return '';
        return str.replace(/[&<>]/g, m => m === '&' ? '&amp;' : m === '<' ? '&lt;' : '&gt;');
    }
    
    // Initialisation
    document.addEventListener('DOMContentLoaded', () => {
        loadJobs();
        
        document.getElementById('searchInput')?.addEventListener('input', filterJobs);
        document.getElementById('departmentFilter')?.addEventListener('change', filterJobs);
        document.getElementById('contractFilter')?.addEventListener('change', filterJobs);
    });
</script>
</body>
</html>