// Kawaii personality system for Nebula bot
class KawaiiPersonality {
  constructor() {
    // Kawaii expressions
    this.expressions = {
      happy: ['uwu', 'owo', '*happy*', '*excited*', '✨'],
      shy: ['*blush*', '*shy*', '*hides*', '🥺', '*whispers*'],
      sad: ['*sniff*', '*sad*', '😢', '*cries softly*', 'uwu'],
      affectionate: ['*hugs*', '*cuddles*', '💕', '*nuzzles*', 'uwu~'],
      sleepy: ['*yawns*', '*sleepy*', '😴', '*stretches*', 'zzz~'],
    };

    // Kawaii emojis by category
    this.categoryEmojis = {
      music: '🎵',
      moderation: '🛡️',
      economy: '💰',
      fun: '🎮',
      utility: '🔧',
      admin: '👑',
      leveling: '📊',
      image: '🖼️',
      anime: '🌸',
      nsfw: '🔞',
      social: '👥',
      automod: '🤖',
      ticket: '🎫',
      giveaway: '🎁',
      suggestion: '💡',
    };

    // Pastel color scheme
    this.colors = {
      primary: 0xFFB6C1,    // Light pink
      secondary: 0xE6E6FA,  // Lavender
      success: 0x98FB98,    // Pale green
      warning: 0xFFCBA4,    // Peach
      error: 0xFFA6A6,      // Light coral
      info: 0xB0E0E6,       // Powder blue
    };
  }

  // Format kawaii messages
  format(message, emoji = '🌸', type = 'info') {
    const expression = this.getRandomExpression('happy');
    const timestamp = new Date().toLocaleTimeString();
    
    return `[${timestamp}] ${emoji} ${message} ${expression}`;
  }

  // Get random kawaii expression
  getRandomExpression(mood = 'happy') {
    const expressions = this.expressions[mood] || this.expressions.happy;
    return expressions[Math.floor(Math.random() * expressions.length)];
  }

  // Create kawaii embed
  createEmbed(title, description, type = 'info') {
    const { EmbedBuilder } = require('discord.js');
    
    const embed = new EmbedBuilder()
      .setColor(this.colors[type] || this.colors.primary)
      .setTitle(`${title} ${this.getRandomExpression('happy')}`)
      .setDescription(description)
      .setFooter({ 
        text: `*susurra* Kawaii bot by Nebula~ ${this.getRandomExpression('affectionate')}`,
        iconURL: 'https://cdn.discordapp.com/emojis/123456789.png' // Placeholder
      })
      .setTimestamp();

    return embed;
  }

  // Add kawaii personality to command responses
  addPersonality(response, mood = 'happy') {
    const starters = {
      happy: ['*excited*', 'Yay!', 'Uwu~', '✨'],
      shy: ['*blush*', 'Um...', '*whispers*', 'Maybe...'],
      sad: ['*sniff*', 'Oh no...', 'Sorry...', '*sad*'],
      affectionate: ['*hugs*', 'Aww~', '*cuddles*', '💕'],
    };

    const starter = starters[mood][Math.floor(Math.random() * starters[mood].length)];
    const expression = this.getRandomExpression(mood);
    
    return `${starter} ${response} ${expression}`;
  }

  // Get kawaii error message
  getErrorMessage(error = '') {
    const errorMessages = [
      '*hides behind a pillow* Something went wrong uwu',
      '*whispers* Oopsie, there was an error 🥺',
      '*shy* Sorry, I couldn\'t do that right now...',
      '*blush* Um... that didn\'t work as expected 😊',
      '*nervous* Something broke and I\'m too shy to say what 💦',
    ];
    
    const randomMessage = errorMessages[Math.floor(Math.random() * errorMessages.length)];
    return error ? `${randomMessage}\n*quietly* ${error}` : randomMessage;
  }

  // Get kawaii success message
  getSuccessMessage(action = 'that') {
    const successMessages = [
      `*happy* I did ${action} successfully! uwu`,
      `*excited* Yay! ${action} worked perfectly! ✨`,
      `*proud* I managed to do ${action}~ 🌸`,
      `*shy* I... I think ${action} went well 🥺`,
      `*bounces* All done with ${action}! 💫`,
    ];
    
    return successMessages[Math.floor(Math.random() * successMessages.length)];
  }

  // Get kawaii help message
  getHelpMessage() {
    return `*whispers softly* Need help? I'm here for you~ 💕
    
    I'm Nebula, your kawaii Discord bot! I have 133+ commands across 42 different categories uwu
    
    Some things I can help with:
    🎵 **Music** - Play your favorite songs
    🛡️ **Moderation** - Keep your server safe and cozy
    💰 **Economy** - Manage kawaii coins and trading
    🎮 **Fun & Games** - Play games together
    🌸 **Anime** - All things anime and manga
    ✨ **And so much more!**
    
    *shy* Use \`/help\` to see all my commands, or just ask me anything~ 🥺`;
  }
}

module.exports = new KawaiiPersonality();
