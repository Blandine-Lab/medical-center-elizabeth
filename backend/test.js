const express = require('express');
const path = require('path');

const app = express();
const PORT = 5000;

// Chemin absolu vers le dossier frontend
const frontendPath = path.join(__dirname, 'frontend');
console.log('Dossier frontend :', frontendPath);

// Servir les fichiers statiques
app.use(express.static(frontendPath));

// Route racine explicite
app.get('/', (req, res) => {
    const indexPath = path.join(frontendPath, 'index.html');
    console.log('Envoi de :', indexPath);
    res.sendFile(indexPath);
});

app.listen(PORT, () => {
    console.log(`Test sur http://localhost:${PORT}`);
});