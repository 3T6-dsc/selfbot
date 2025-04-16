module.exports = {
    name: 'clear',
    description: 'Supprime vos messages dans le salon',
    category: 'Modération',
    usage: '[nombre]',
    examples: ['clear 10', 'clear 100'],
    async execute(message, args, client) {
        const amount = parseInt(args[0]) || 100;
        
        if (amount < 1 || amount > 100) {
            return message.channel.send('❌ Le nombre doit être entre 1 et 100.');
        }

        try {
            const messages = await message.channel.messages.fetch({ limit: 100 });
            const userMessages = messages.filter(m => m.author.id === client.user.id);
            const toDelete = userMessages.first(amount);

            let deleted = 0;
            for (const msg of toDelete) {
                await msg.delete().catch(() => {});
                deleted++;
                await new Promise(resolve => setTimeout(resolve, 1000)); // Délai pour éviter le rate limit
            }

            const tempMsg = await message.channel.send(`✅ ${deleted} messages supprimés.`);
            setTimeout(() => tempMsg.delete(), 5000);
        } catch (error) {
            console.error(error);
            await message.channel.send('❌ Erreur lors de la suppression des messages.');
        }
    }
};