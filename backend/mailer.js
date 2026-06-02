// backend/mailer.js
const nodemailer = require('nodemailer');
require('dotenv').config();

// Création du transporteur SMTP avec les variables d'environnement
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE === 'true', // false pour le port 587, true pour 465
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

/**
 * Envoie un email de confirmation de rendez-vous
 * @param {string} email - Adresse email du patient
 * @param {string} name - Nom complet
 * @param {string} date - Date du rendez-vous
 * @param {string} time - Créneau horaire
 * @param {string} specialty - Spécialité choisie
 * @param {string} teleconsultationLink - Lien de téléconsultation (optionnel)
 * @returns {Promise<boolean>} - true si l'envoi réussit, false sinon
 */
async function sendConfirmation(email, name, date, time, specialty, teleconsultationLink = null) {
    try {
        let teleconsultationHtml = '';
        if (teleconsultationLink) {
            teleconsultationHtml = `
                <div style="margin: 20px 0; padding: 15px; background-color: #e8f4f8; border-radius: 8px;">
                    <h3 style="color: #0b6e8f;">🔗 Téléconsultation</h3>
                    <p>Votre rendez-vous sera en téléconsultation :</p>
                    <a href="${teleconsultationLink}" style="background-color: #0b6e8f; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Rejoindre la visio</a>
                    <p style="font-size: 0.9em; margin-top: 10px;">Cliquez sur ce lien au moment de votre rendez-vous.</p>
                </div>
            `;
        }

        const info = await transporter.sendMail({
            from: `"Medical Center Elizabeth (MCE)" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Confirmation de rendez-vous - Medical Center Elizabeth (MCE)',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: linear-gradient(135deg, #0b6e8f 0%, #2ec4b6 100%); padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
                        <h1 style="color: white; margin: 0;">Medical Center Elizabeth</h1>
                        <p style="color: white; margin: 5px 0 0;">MCE - Soins d'excellence</p>
                    </div>
                    <div style="padding: 20px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px;">
                        <h2 style="color: #0b6e8f;">Bonjour ${name},</h2>
                        <p>Votre rendez-vous au <strong>Medical Center Elizabeth (MCE)</strong> a bien été enregistré :</p>
                        <ul style="list-style: none; padding: 0;">
                            <li style="margin: 10px 0;"><strong>🏥 Spécialité :</strong> ${specialty}</li>
                            <li style="margin: 10px 0;"><strong>📅 Date :</strong> ${date}</li>
                            <li style="margin: 10px 0;"><strong>⏰ Créneau :</strong> ${time}</li>
                        </ul>
                        ${teleconsultationHtml}
                        <div style="background-color: #f0f7fc; padding: 15px; border-radius: 8px; margin-top: 20px;">
                            <p style="margin: 0;"><strong>📞 Besoin d'aide ?</strong></p>
                            <p style="margin: 5px 0 0;">Contactez-nous au +33 (0)1 88 88 88 88</p>
                        </div>
                        <hr style="margin: 20px 0;">
                        <p style="font-size: 0.8em; color: #666;">Ceci est un message automatique, merci de ne pas y répondre.<br>© 2026 Medical Center Elizabeth (MCE) - Tous droits réservés.</p>
                    </div>
                </div>
            `,
        });
        console.log("✅ Email envoyé :", info.messageId);
        if (nodemailer.getTestMessageUrl) {
            console.log("🔗 URL de prévisualisation :", nodemailer.getTestMessageUrl(info));
        }
        return true;
    } catch (error) {
        console.error("❌ Erreur envoi email :", error);
        return false;
    }
}

/**
 * Envoie une newsletter à un abonné
 * @param {string} email - Adresse email du destinataire
 * @param {string} subject - Sujet de l'email
 * @param {string} htmlContent - Contenu HTML de l'email
 * @returns {Promise<boolean>} - true si réussi, false sinon
 */
async function sendNewsletterEmail(email, subject, htmlContent) {
    try {
        const info = await transporter.sendMail({
            from: `"Medical Center Elizabeth (MCE)" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: subject,
            html: htmlContent,
        });
        console.log(`✅ Newsletter envoyée à ${email} : ${info.messageId}`);
        return true;
    } catch (error) {
        console.error(`❌ Erreur envoi newsletter à ${email} :`, error);
        return false;
    }
}

module.exports = { sendConfirmation, sendNewsletterEmail };