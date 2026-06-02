const http = require('http');

const data = JSON.stringify({
    email: 'jean.dupont@mce.fr',
    password: 'doctor123'
});

const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/auth/staff/login',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
    }
};

const req = http.request(options, (res) => {
    console.log('Status:', res.statusCode);
    let responseData = '';
    res.on('data', (chunk) => responseData += chunk);
    res.on('end', () => {
        console.log('Réponse:', responseData);
    });
});

req.on('error', (e) => console.error('Erreur:', e.message));
req.write(data);
req.end();