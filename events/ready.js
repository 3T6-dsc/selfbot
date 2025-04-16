const { CustomStatus } = require('discord.js-selfbot-v13');

async function updateStatus(client, type) {
    let status;
    
    switch(type) {
        case 0: // Server count
            const serverCount = client.guilds.cache.size;
            status = new CustomStatus(client)
                .setState(`${serverCount} serveurs`)
                .setEmoji('🌐');
            break;
            
        case 1: // Friends count
            const friendCount = client.relationships.friendCache.size;
            status = new CustomStatus(client)
                .setState(`${friendCount} amis`)
                .setEmoji('👥');
            break;
            
        case 2: // Bio message
            status = new CustomStatus(client)
                .setState('Regarde ma bio')
                .setEmoji('📝');
            break;
    }
    
    await client.user.setPresence({
        activities: [status],
        status: 'online'
    });
}

async function startStatusRotation(client) {
    let currentStatus = 0;
    const totalStatuses = 3;
    
    // Initial status
    await updateStatus(client, currentStatus);
    
    // Rotate status every 10 seconds
    setInterval(async () => {
        currentStatus = (currentStatus + 1) % totalStatuses;
        await updateStatus(client, currentStatus);
    }, 10000); // 10 seconds interval
}

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`Logged in as ${client.user.tag}`);
        
        // Start status rotation
        await startStatusRotation(client);
        console.log('Status rotation started!');

        // Update status when guild count changes
        client.on('guildCreate', () => updateStatus(client, 0));
        client.on('guildDelete', () => updateStatus(client, 0));
        
        // Update status when friend count changes
        client.on('relationshipAdd', () => updateStatus(client, 1));
        client.on('relationshipRemove', () => updateStatus(client, 1));
    }
};
