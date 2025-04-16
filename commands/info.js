const { version: discordVersion } = require('discord.js-selfbot-v13');
const { version: selfbotVersion } = require('../package.json');
const os = require('os');

module.exports = {
    name: 'info',
    description: 'Affiche les informations sur le selfbot',
    category: 'Information',
    async execute(message, args, client) {
        try {
            // Calcul du temps d'activité
            const uptime = process.uptime();
            const days = Math.floor(uptime / 86400);
            const hours = Math.floor(uptime / 3600) % 24;
            const minutes = Math.floor(uptime / 60) % 60;
            const seconds = Math.floor(uptime % 60);

            // Calcul de l'utilisation de la mémoire
            const usedMemory = process.memoryUsage().heapUsed / 1024 / 1024;
            const totalMemory = os.totalmem() / 1024 / 1024;
            const freeMemory = os.freemem() / 1024 / 1024;

            const infoMessage = [
                '```md',
                '# 🤖 Informations sur le Selfbot',
                '',
                '## 📊 Statistiques',
                `• Serveurs     : ${client.guilds.cache.size}`,
                `• Amis        : ${client.relationships.friendCache.size}`,
                `• Commandes   : ${client.commands.size}`,
                `• Latence     : ${client.ws.ping}ms`,
                '',
                '## ⚙️ Système',
                `• OS          : ${os.platform()} ${os.release()}`,
                `• CPU         : ${os.cpus()[0].model}`,
                `• RAM Utilisée: ${usedMemory.toFixed(2)} MB`,
                `• RAM Totale  : ${totalMemory.toFixed(2)} MB`,
                `• RAM Libre   : ${freeMemory.toFixed(2)} MB`,
                '',
                '## ⏰ Temps d\'activité',
                `• Uptime      : ${days}j ${hours}h ${minutes}m ${seconds}s`,
                '',
                '## 📦 Versions',
                `• Selfbot     : v${selfbotVersion}`,
                `• Discord.js  : v${discordVersion}`,
                `• Node.js     : ${process.version}`,
                '',
                `# Selfbot de ${client.user.tag}`,
                '```'
            ].join('\n');

            await message.channel.send(infoMessage);
        } catch (error) {
            console.error('Erreur dans la commande info:', error);
            await message.channel.send('Une erreur est survenue lors de l\'exécution de la commande.');
        }
    },
};

