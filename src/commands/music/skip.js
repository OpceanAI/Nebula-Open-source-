const { musicValidations } = require("@helpers/BotUtils");

/**
 * @type {import("@structures/Command")}
 */
module.exports = {
  name: "skip",
  description: "skip the current song",
  category: "MUSIC",
  validations: musicValidations,
  command: {
    enabled: true,
    aliases: ["next"],
  },
  slashCommand: {
    enabled: true,
  },

  async messageRun(message, args) {
    const response = skip(message);
    await message.safeReply(response);
  },

  async interactionRun(interaction) {
    const response = skip(interaction);
    await interaction.followUp(response);
  },
};

/**
 * @param {import("discord.js").CommandInteraction|import("discord.js").Message} arg0
 */
function skip({ client, guildId }) {
  const player = client.musicManager.getPlayer(guildId);

  // check if current song is playing
  if (!player.queue.current) return "🥺 *susurra* No hay ninguna canción sonando ahorita... 🌸✨";

  const { title } = player.queue.current;
  return player.queue.next() ? `⏯️ *susurra* Salté ${title}~ ¿la siguiente está bien? 🎵🌸` : "⏯️ *susurra confundida* No hay cancioncitas para saltar... uwu 🌸";
}
