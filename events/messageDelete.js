const { snipeMap } = require('../commands/snipe.js');

module.exports = {
    name: 'messageDelete',
    execute(message, client) {
        if (message.author.bot) return;
        snipeMap.set(message.channel.id, {
            content: message.content,
            author: message.author.tag,
            channel: message.channel.name,
            timestamp: new Date().toLocaleString()
        });
    }
};