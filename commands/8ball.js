module.exports = {
    name: '8ball',
    description: 'Pose une question et obtiens une réponse mystique',
    category: 'Fun',
    usage: '<question>',
    examples: ['Est-ce que je vais avoir une bonne journée ?', 'Dois-je manger une pizza ce soir ?'],
    async execute(message, args, client) {
        if (args.length === 0) {
            return message.channel.send('❌ Pose-moi une question !');
        }

        const responses = [
            // Réponses positives
            'Oui, certainement !',
            'C\'est sûr et certain.',
            'Sans aucun doute.',
            'Absolument !',
            'Tu peux compter là-dessus.',
            
            // Réponses neutres
            'Peut-être...',
            'Je ne peux pas le prédire maintenant.',
            'Repose ta question plus tard.',
            'Mieux vaut ne pas te le dire maintenant.',
            'Concentre-toi et redemande.',
            
            // Réponses négatives
            'N\'y compte pas.',
            'Ma réponse est non.',
            'Mes sources disent non.',
            'C\'est peu probable.',
            'J\'en doute fort.'
        ];

        const question = args.join(' ');
        const response = responses[Math.floor(Math.random() * responses.length)];

        const replyMessage = [
            '```md',
            '# 🎱 La boule magique',
            '',
            `## Question`,
            `• ${question}`,
            '',
            `## Réponse`,
            `• ${response}`,
            '```'
        ].join('\n');

        await message.channel.send(replyMessage);
    },
};