let isEnabled = false;

module.exports = {
    name: 'autorespond',
    description: 'Active/désactive la réponse automatique',
    category: 'Configuration',
    async execute(message, args, client) {
        isEnabled = !isEnabled;
        await message.channel.send(`✅ Réponse automatique ${isEnabled ? 'activée' : 'désactivée'}`);
    }
};

module.exports.isEnabled = () => isEnabled;
