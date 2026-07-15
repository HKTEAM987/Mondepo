const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Remplacez par votre lien de webhook Slack obtenu à l'étape précédente
const SLACK_WEBHOOK_URL = "https://hooks.slack.com/services/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";

// Route pour recevoir les données de votre application
app.post('/', async (req, res) => {
    try {
        console.log("Payload reçu :", req.body);

        // On formate le message pour Slack
        const message = {
            text: `🔔 *Nouveau Payload Reçu !*\n\`\`\`${JSON.stringify(req.body, null, 2)}\`\`\``
        };

        // Envoi vers Slack
        await axios.post(SLACK_WEBHOOK_URL, message);
        
        res.status(200).send("OK");
    } catch (error) {
        console.error("Erreur d'envoi Slack:", error.message);
        res.status(500).send("Erreur interne");
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur actif sur le port ${PORT}`);
});

