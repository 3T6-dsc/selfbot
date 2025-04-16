module.exports = {
    name: 'dice',
    description: 'Lance un ou plusieurs dés',
    category: 'Fun',
    usage: '[nombre]d[faces] (ex: 2d6, 1d20)',
    examples: ['2d6', '1d20', 'd6'],
    async execute(message, args, client) {
        let diceCount = 1;
        let diceFaces = 6;

        if (args[0]) {
            const diceRegex = /^(\d*)?d(\d+)$/i;
            const match = args[0].match(diceRegex);

            if (!match) {
                return message.channel.send('❌ Format invalide. Utilise par exemple: 2d6, 1d20, d6');
            }

            diceCount = match[1] ? parseInt(match[1]) : 1;
            diceFaces = parseInt(match[2]);

            if (diceCount > 10) {
                return message.channel.send('❌ Tu ne peux pas lancer plus de 10 dés à la fois !');
            }

            if (diceFaces > 100) {
                return message.channel.send('❌ Le nombre maximum de faces est 100 !');
            }
        }

        const rolls = [];
        let total = 0;

        for (let i = 0; i < diceCount; i++) {
            const roll = Math.floor(Math.random() * diceFaces) + 1;
            rolls.push(roll);
            total += roll;
        }

        const replyMessage = [
            '```md',
            `# 🎲 Lancer de ${diceCount}d${diceFaces}`,
            '',
            '## Résultats',
            rolls.map((roll, index) => `• Dé ${index + 1}: ${roll}`).join('\n'),
            '',
            `## Total: ${total}`,
            '```'
        ].join('\n');

        await message.channel.send(replyMessage);
    },
};