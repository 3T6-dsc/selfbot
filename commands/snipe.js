const snipeMap = new Map();

module.exports = {
    name: 'snipe',
    description: 'Affiche le dernier message supprimé',
    category: 'Utilitaires',
    async execute(message, args, client) {
        const snipedMessage = snipeMap.get(message.channel.id);

        if (!snipedMessage) {
            return message.channel.send('❌ Aucun message supprimé récemment dans ce salon.');
        }

        const replyMessage = [
            '```md',
            '# 🔍 Message Supprimé',
            '',
            '## Informations',
            `• Auteur    : ${snipedMessage.author}`,
            `• Salon     : ${snipedMessage.channel}`,
            `• Timestamp : ${snipedMessage.timestamp}`,
            '',
            '## Contenu',
            `${snipedMessage.content}`,
            '```'
        ].join('\n');

        await message.channel.send(replyMessage);
    }
};

// Exporter snipeMap pour l'utiliser dans messageDelete.js
module.exports.snipeMap = snipeMap;
