const personality = require('../utils/personality');

module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    console.log(personality.format(`Logged in as ${client.user.tag}`, '🌸', 'success'));
    console.log(personality.format(`Ready to serve ${client.guilds.cache.size} servers`, '✨', 'info'));
    console.log(personality.format(`Watching over ${client.users.cache.size} users`, '💕', 'info'));
    
    // Set kawaii bot status
    const activities = [
      '*susurra* Managing servers~',
      'with 133+ kawaii commands uwu',
      '*shy* Being helpful~ 🥺',
      'Playing with my friends! ✨',
      '*whispers* Type /help uwu',
    ];
    
    let activityIndex = 0;
    
    // Set initial activity
    client.user.setActivity(activities[activityIndex], { type: 'PLAYING' });
    
    // Rotate activities every 30 seconds
    setInterval(() => {
      activityIndex = (activityIndex + 1) % activities.length;
      client.user.setActivity(activities[activityIndex], { type: 'PLAYING' });
    }, 30000);
    
    // Log ready state with kawaii personality
    console.log(personality.format('Bot is ready and being kawaii!', '🎀', 'success'));
  },
};
