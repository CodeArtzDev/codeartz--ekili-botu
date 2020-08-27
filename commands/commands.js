const Discord = require('discord.js')
exports.conf = {
    enabled:true,
    guildOnly: false,
    aliases: [],
    permLevel: 0,
}

exports.help = {
    name: 'komutlar', 
    description: '',
    usage: ''
}

exports.run = async (client, message, args) => { // embed yapımınıda gösterdim
     try {
        await message.channel.send(`Komutlar: \n${client.commands.map(props => `\`${props.help.name}\``).join(" | ")}`);
    } catch (e) {
        throw e;
    }
}