const Discord = require('discord.js')

const guildTicketCategoryId = '1189614333475422243'
const moderationRole = '1189614332485570639'

const ticketCloseButton = new Discord.ActionRowBuilder().addComponents(
    new Discord.ButtonBuilder()
    .setCustomId('ticket-close')
    .setLabel('Cerrar Ticket')
    .setStyle('2')
    .setEmoji('🔐'),

    new Discord.ButtonBuilder()
    .setEmoji('📑')
    .setStyle('2')
    .setCustomId('transcript')
)

async function main (interaction) {
    const {user, guild} = interaction;
    const ticketType = interaction.values[0];

    const tickets = guild.channels.cache.filter(channel => channel.parentId === guildTicketCategoryId);
    if(tickets.some(ticket => ticket.topic === user.id)) return interaction.reply ({content: 'Ya tienes un ticket Abierto!, espera un administrador',  ephemeral: true})

    // Si el usario no tiene tickets abiertos, procedemos con la creacion del ticket:
    interaction.reply({content: '- Tu ticket esta siendo creado...', ephemeral: true})
        .then(() => {
        guild.channels.create({
         name: ticketType+ '-'+user.username.slice(0, 25-ticketType.length),
         topic: user.id,
         type: Discord.ChannelType.GuildText,
         parent: guildTicketCategoryId, 
         permissionOverwrites: [
            {id: interaction.guild.roles.everyone, deny: [Discord.PermissionsBitField.Flags.ViewChannel]},
            {id: moderationRole, Allow: [Discord.PermissionsBitField.Flags.ViewChannel]},
            {id: interaction.user.id, allow: [Discord.PermissionsBitField.Flags.ViewChannel]}

         ]
    }).then(channel => {
         interaction.editReply({content:`- Tu Ticket ha sido creado: ${channel}`});

         channel.send({
                     content: `Bienvenido ${user},\n\nEl Staff estara contigo en unos instantes.`,
                     components: [ticketCloseButton] 
             });
    });
 
        });
};
module.exports = main;