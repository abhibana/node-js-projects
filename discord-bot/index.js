import { Client, Events, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config()
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.on('messageCreate', (message) => {
    if (!message.author.bot) {
        message.reply("Hello from Bana Bot !! :wave:")
    }

    // TODO Implement a URL Shortner process which will return the user a shortened URL when the user sends a message like 'create <LONG_URL>'
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;
  
    if (interaction.commandName === 'ping') {
      console.log(interaction)  
      await interaction.reply('Pong! :ping_pong:');
    }
  });

client.login(process.env.TOKEN);