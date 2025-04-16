module.exports = {
    name: 'avatar',
    description: 'Affiche l\'avatar d\'un utilisateur',
    category: 'Utilitaires',
    usage: '[utilisateur]',
    examples: ['avatar', 'avatar @User'],
    async execute(message, args, client) {
        const user = message.mentions.users.first() 
            || client.users.cache.get(args[0])
            || message.author;

        const replyMessage = [
            '```md',
            '# 🖼️ Avatar',
            '',
            '## Informations',
            `• Utilisateur : ${user.tag}`,
            `• ID         : ${user.id}`,
            '',
            '## Liens',
            `• PNG  : ${user.displayAvatarURL({ format: 'png', size: 4096 })}`,
            `• JPEG : ${user.displayAvatarURL({ format: 'jpeg', size: 4096 })}`,
            `• WEBP : ${user.displayAvatarURL({ format: 'webp', size: 4096 })}`,
            '```'
        ].join('\n');

        await message.channel.send(replyMessage);
    }
};