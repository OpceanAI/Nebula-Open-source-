const { SlashCommandBuilder } = require('discord.js');
const personality = require('../utils/personality');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('*whispers* Get help with kawaii bot commands uwu'),
  
  async execute(interaction) {
    try {
      const helpEmbed = personality.createEmbed(
        'Kawaii Bot Help',
        personality.getHelpMessage(),
        'info'
      );

      await interaction.reply({ 
        embeds: [helpEmbed],
        ephemeral: true 
      });
      
    } catch (error) {
      console.error('Help command error:', error);
      
      const errorEmbed = personality.createEmbed(
        'Oopsie!',
        personality.getErrorMessage('Failed to show help menu'),
        'error'
      );
      
      await interaction.reply({ 
        embeds: [errorEmbed], 
        ephemeral: true 
      });
    }
  },
};
