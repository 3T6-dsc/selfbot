const prefix = '!';
const fetch = require('node-fetch');

module.exports = {
    name: 'messageCreate',
    async execute(message, client) {
        // Système de réponse automatique pour l'utilisateur spécifique
        if (message.author.id === '774625270656663602' && message.channel.type === 'DM') {
            const API_KEY = 'AIzaSyCFqyEAYRQvTqfgxqQtPkmYQ_O4RwklcDQ';
            const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

            try {
                // Indique que le bot est en train d'écrire
                message.channel.sendTyping();

                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{
                                text: `Agis comme un humain normal qui discute. Réponds de manière naturelle et concise (max 2 phrases) à ce message: "${message.content}"`
                            }]
                        }]
                    })
                });

                const data = await response.json();

                if (!data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts) {
                    return;
                }

                let answer = data.candidates[0].content.parts[0].text;
                
                // Limite la réponse à 200 caractères pour garder ça naturel
                if (answer.length > 200) {
                    answer = answer.substring(0, 197) + '...';
                }

                // Ajoute un délai aléatoire pour simuler la frappe humaine (entre 2 et 5 secondes)
                const typingDelay = Math.floor(Math.random() * (5000 - 2000 + 1) + 2000);
                await new Promise(resolve => setTimeout(resolve, typingDelay));

                await message.channel.send(answer);
            } catch (error) {
                console.error('Erreur lors de la réponse automatique:', error);
            }
        }

        // Le reste du code existant pour le traitement des commandes
        if (!message.content.startsWith(prefix) || 
            (message.author.id !== client.user.id && !message.channel.type === 'DM')) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = client.commands.get(commandName);

        if (!command) return;

        try {
            await command.execute(message, args, client);
        } catch (error) {
            console.error(error);
            await message.reply({
                content: 'Une erreur est survenue lors de l\'exécution de la commande.'
            }).catch(console.error);
        }
    },
};

