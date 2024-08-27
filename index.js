// Dependencias
const Discord = require ('discord.js')

// Cliente
const Client = new Discord.Client ({intents: 3276799})

// Evento Interacitioncreate
Client.on("interactionCreate", async (interaction) => {
    if(interaction.isChatInputCommand()) return;
    try {
        const execute = require(`./interactions/${interaction.customId}`);
        execute(interaction);
    }
      catch (error) {
        console.log(error)
      }
  });

// Registros
Client.login("MTI1ODUyMjAxNjIwMjQ5NDA1NA.GYLnJK.vrXa0nZNBNE60MvF1rkCf3LbLlBO0bEsbmUKDE")