const fetch = require('node-fetch');

module.exports = {
    name: 'ia',
    description: 'Pose une question à l\'intelligence artificielle',
    category: 'Fun',
    usage: '<question>',
    examples: ['Explique-moi comment fonctionne l\'IA', 'Raconte-moi une histoire drôle'],
    async execute(message, args, client) {
        if (args.length === 0) {
            return message.channel.send('❌ Pose-moi une question !');
        }

        const question = args.join(' ');
        const API_KEY = 'AIzaSyCFqyEAYRQvTqfgxqQtPkmYQ_O4RwklcDQ';
        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

        try {
            const loadingMessage = await message.channel.send('🤔 Je réfléchis à votre question...');

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: question + " (Réponds en moins de 1500 caractères)"
                        }]
                    }]
                })
            });

            const data = await response.json();

            if (!data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts) {
                await loadingMessage.delete();
                return message.channel.send('❌ Désolé, je n\'ai pas pu générer une réponse.');
            }

            let answer = data.candidates[0].content.parts[0].text;
            
            // Limite la réponse à 1500 caractères
            if (answer.length > 1500) {
                answer = answer.substring(0, 1497) + '...';
            }

            const replyMessage = [
                '```md',
                '# 🤖 Assistant IA',
                '',
                '## Question',
                `• ${question}`,
                '',
                '## Réponse',
                answer.split('\n').map(line => `• ${line}`).join('\n'),
                '```'
            ].join('\n');

            await loadingMessage.delete();
            await message.channel.send(replyMessage);

        } catch (error) {
            console.error('Erreur lors de la requête à l\'API Gemini:', error);
            await message.channel.send('❌ Une erreur est survenue lors de la communication avec l\'IA.');
        }
    },
};

