const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'help',
    description: 'Affiche la liste des commandes disponibles',
    async execute(message, args, client) {
        // Si un argument est fourni, on affiche l'aide détaillée pour cette commande
        if (args.length > 0) {
            const commandName = args[0].toLowerCase();
            const command = client.commands.get(commandName);

            if (!command) {
                return message.channel.send(`❌ La commande \`${commandName}\` n'existe pas.`);
            }

            const helpText = [
                '```md',
                `# 📖 Aide: !${command.name}`,
                '',
                `${command.description || 'Aucune description disponible.'}`,
                ''
            ];

            // Ajoute les champs supplémentaires si disponibles
            if (command.usage) {
                helpText.push('## 📝 Utilisation');
                helpText.push(`!${command.name} ${command.usage}`);
                helpText.push('');
            }

            if (command.examples) {
                helpText.push('## 💡 Exemples');
                command.examples.forEach(example => {
                    helpText.push(`!${command.name} ${example}`);
                });
                helpText.push('');
            }

            helpText.push('# Tapez !help pour voir toutes les commandes');
            helpText.push('```');

            return message.channel.send(helpText.join('\n'));
        }

        // Sinon, on affiche la liste de toutes les commandes
        const commandsPath = path.join(__dirname);
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

        let categories = {};

        // Trie les commandes par catégories
        for (const file of commandFiles) {
            const command = require(path.join(commandsPath, file));
            const category = command.category || 'Général'; // Catégorie par défaut si non spécifiée
            
            if (!categories[category]) {
                categories[category] = [];
            }
            
            categories[category].push(command);
        }

        const helpText = [
            '```md',
            '# 📚 Liste des commandes',
            '> Utilisez !help <commande> pour plus d\'informations sur une commande spécifique.',
            ''
        ];

        // Ajoute chaque catégorie
        for (const [category, commands] of Object.entries(categories)) {
            helpText.push(`## ${getCategoryEmoji(category)} ${category}`);
            commands.forEach(cmd => {
                helpText.push(`• !${cmd.name.padEnd(15)} ${cmd.description || 'Pas de description'}`);
            });
            helpText.push('');
        }

        helpText.push(`# Total: ${client.commands.size} commandes | Prefix: !`);
        helpText.push('```');

        await message.channel.send(helpText.join('\n'));
    },
};

// Fonction pour obtenir l'emoji correspondant à chaque catégorie
function getCategoryEmoji(category) {
    const emojis = {
        'Général': '⚙️',
        'Modération': '🛡️',
        'Utilitaires': '🔧',
        'Fun': '🎮',
        'Information': 'ℹ️',
        'Configuration': '⚙️',
        'Administration': '👑'
        // Ajoutez d'autres catégories selon vos besoins
    };
    return emojis[category] || '📁';
}


