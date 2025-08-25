const fs = require('fs').promises;
const path = require('path');
const personality = require('../utils/personality');

async function loadCommands(client) {
  try {
    console.log(personality.format('Loading kawaii commands...', '📚'));
    
    const commandsPath = path.join(__dirname, '../commands');
    const commandFiles = await fs.readdir(commandsPath);
    
    for (const file of commandFiles) {
      if (!file.endsWith('.js')) continue;
      
      const filePath = path.join(commandsPath, file);
      const command = require(filePath);
      
      if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
        console.log(personality.format(`Loaded command: ${command.data.name}`, '✨'));
      } else {
        console.warn(personality.format(`Command ${file} is missing required properties`, '⚠️', 'warning'));
      }
    }
    
    console.log(personality.format(`Loaded ${client.commands.size} kawaii commands!`, '🌸', 'success'));
    
  } catch (error) {
    console.error(personality.format(`Failed to load commands: ${error.message}`, '😢', 'error'));
    throw error;
  }
}

// Handle slash command interactions
async function handleCommandInteraction(interaction) {
  if (!interaction.isChatInputCommand()) return;
  
  const command = interaction.client.commands.get(interaction.commandName);
  
  if (!command) {
    console.error(personality.format(`No command matching ${interaction.commandName}`, '❓', 'warning'));
    return;
  }
  
  // Check cooldowns
  const { cooldowns } = interaction.client;
  
  if (!cooldowns.has(command.data.name)) {
    cooldowns.set(command.data.name, new Map());
  }
  
  const now = Date.now();
  const timestamps = cooldowns.get(command.data.name);
  const defaultCooldownDuration = 3;
  const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1000;
  
  if (timestamps.has(interaction.user.id)) {
    const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;
    
    if (now < expirationTime) {
      const expiredTimestamp = Math.round(expirationTime / 1000);
      
      const cooldownEmbed = personality.createEmbed(
        'Slow down there!',
        personality.addPersonality(
          `Please wait, you can use \`/${command.data.name}\` again <t:${expiredTimestamp}:R>`,
          'shy'
        ),
        'warning'
      );
      
      return interaction.reply({ 
        embeds: [cooldownEmbed], 
        ephemeral: true 
      });
    }
  }
  
  timestamps.set(interaction.user.id, now);
  setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);
  
  try {
    await command.execute(interaction);
    console.log(personality.format(`${interaction.user.tag} used /${command.data.name}`, '🎮'));
    
  } catch (error) {
    console.error(personality.format(`Error executing ${command.data.name}: ${error.message}`, '💥', 'error'));
    
    const errorEmbed = personality.createEmbed(
      'Something went wrong!',
      personality.getErrorMessage('There was an error while executing this command'),
      'error'
    );
    
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ 
        embeds: [errorEmbed], 
        ephemeral: true 
      });
    } else {
      await interaction.reply({ 
        embeds: [errorEmbed], 
        ephemeral: true 
      });
    }
  }
}

module.exports = {
  loadCommands,
  handleCommandInteraction,
};
