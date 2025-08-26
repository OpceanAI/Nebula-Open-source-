const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const prettyMs = require("pretty-ms");
const { EMBED_COLORS, MUSIC } = require("@root/config");
const { SpotifyItemType } = require("@lavaclient/spotify");

const search_prefix = {
  YT: "ytsearch",
  YTM: "ytmsearch",
  SC: "scsearch",
};

/**
 * @type {import("@structures/Command")}
 */
module.exports = {
  name: "play",
  description: "play a song from youtube",
  category: "MUSIC",
  botPermissions: ["EmbedLinks"],
  command: {
    enabled: true,
    usage: "<song-name>",
    minArgsCount: 1,
  },
  slashCommand: {
    enabled: true,
    options: [
      {
        name: "query",
        description: "song name or url",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  },

  async messageRun(message, args) {
    const query = args.join(" ");
    const response = await play(message, query);
    await message.safeReply(response);
  },

  async interactionRun(interaction) {
    const query = interaction.options.getString("query");
    const response = await play(interaction, query);
    await interaction.followUp(response);
  },
};

/**
 * @param {import("discord.js").CommandInteraction|import("discord.js").Message} arg0
 * @param {string} query
 */
async function play({ member, guild, channel }, query) {
  if (!member.voice.channel) return "🥺 *susurra tímidamente* Necesitas unirte a un canal de voz primero~ 🌸✨";

  let player = guild.client.musicManager.getPlayer(guild.id);
  if (player && !guild.members.me.voice.channel) {
    player.disconnect();
    await guild.client.musicManager.destroyPlayer(guild.id);
  }

  if (player && member.voice.channel !== guild.members.me.voice.channel) {
    return "😳 *susurra* Necesitamos estar en el mismo canal de voz para escuchar música juntos~ 🎵🌸";
  }

  let embed = new EmbedBuilder().setColor(EMBED_COLORS.BOT_EMBED);
  let tracks;
  let description = "";

  try {
    if (guild.client.musicManager.spotify.isSpotifyUrl(query)) {
      if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET) {
        return "🥺 *se esconde* No puedo reproducir canciones de Spotify... ¿podrías contactar a mi dueño? 💭🌸";
      }

      const item = await guild.client.musicManager.spotify.load(query);
      switch (item?.type) {
        case SpotifyItemType.Track: {
          const track = await item.resolveYoutubeTrack();
          tracks = [track];
          description = `[${track.info.title}](${track.info.uri})`;
          break;
        }

        case SpotifyItemType.Artist:
          tracks = await item.resolveYoutubeTracks();
          description = `Artist: [**${item.name}**](${query})`;
          break;

        case SpotifyItemType.Album:
          tracks = await item.resolveYoutubeTracks();
          description = `Album: [**${item.name}**](${query})`;
          break;

        case SpotifyItemType.Playlist:
          tracks = await item.resolveYoutubeTracks();
          description = `Playlist: [**${item.name}**](${query})`;
          break;

        default:
          return "🥺 *se esconde* Algo salió mal al buscar esa canción... ¿intentamos con otra? 💭🌸";
      }

      if (!tracks) guild.client.logger.debug({ query, item });
    } else {
      const res = await guild.client.musicManager.rest.loadTracks(
        /^https?:\/\//.test(query) ? query : `${search_prefix[MUSIC.DEFAULT_SOURCE]}:${query}`
      );
      switch (res.loadType) {
        case "LOAD_FAILED":
          guild.client.logger.error("Search Exception", res.exception);
          return "😖 *susurra confundida* Hubo un error al buscar... ¿podrías intentar con otro nombre? 🥺🌸";

        case "NO_MATCHES":
          return `🥺 *susurra tristemente* No encontré nada que coincida con "${query}"... ¿quizás otro nombre? 💭🌸`;

        case "PLAYLIST_LOADED":
          tracks = res.tracks;
          description = res.playlistInfo.name;
          break;

        case "TRACK_LOADED":
        case "SEARCH_RESULT": {
          const [track] = res.tracks;
          tracks = [track];
          break;
        }

        default:
          guild.client.logger.debug("Unknown loadType", res);
          return "🥺 *se esconde* Algo salió mal al buscar esa canción... ¿intentamos con otra? 💭🌸";
      }

      if (!tracks) guild.client.logger.debug({ query, res });
    }
  } catch (error) {
    guild.client.logger.error("Search Exception", typeof error === "object" ? JSON.stringify(error) : error);
    return "😟 *se preocupa* Algo salió mal al buscar... ¿podríamos intentar de nuevo? 🥺🌸";
  }

  if (!tracks) return "😟 *se preocupa* Algo salió mal al buscar... ¿podríamos intentar de nuevo? 🥺🌸";

  if (tracks.length === 1) {
    const track = tracks[0];
    if (!player?.playing && !player?.paused && !player?.queue.tracks.length) {
      embed.setAuthor({ name: "Added Track to queue" });
    } else {
      const fields = [];
      embed
        .setAuthor({ name: "Added Track to queue" })
        .setDescription(`[${track.info.title}](${track.info.uri})`)
        .setFooter({ text: `Requested By: ${member.user.username}` });

      fields.push({
        name: "Song Duration",
        value: "`" + prettyMs(track.info.length, { colonNotation: true }) + "`",
        inline: true,
      });

      if (player?.queue?.tracks?.length > 0) {
        fields.push({
          name: "Position in Queue",
          value: (player.queue.tracks.length + 1).toString(),
          inline: true,
        });
      }
      embed.addFields(fields);
    }
  } else {
    embed
      .setAuthor({ name: "Added Playlist to queue" })
      .setDescription(description)
      .addFields(
        {
          name: "Enqueued",
          value: `${tracks.length} songs`,
          inline: true,
        },
        {
          name: "Playlist duration",
          value:
            "`" +
            prettyMs(
              tracks.map((t) => t.info.length).reduce((a, b) => a + b, 0),
              { colonNotation: true }
            ) +
            "`",
          inline: true,
        }
      )
      .setFooter({ text: `Requested By: ${member.user.username}` });
  }

  // create a player and/or join the member's vc
  if (!player?.connected) {
    player = guild.client.musicManager.createPlayer(guild.id);
    player.queue.data.channel = channel;
    player.connect(member.voice.channel.id, { deafened: true });
  }

  // do queue things
  const started = player.playing || player.paused;
  player.queue.add(tracks, { requester: member.user.username, next: false });
  if (!started) {
    await player.queue.start();
  }

  return { embeds: [embed] };
}
