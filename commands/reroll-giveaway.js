const ms = require('ms');

exports.run = async (client, message, args) => {

    // If the member doesn't have enough permissions
    if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
        return message.channel.send(':x: Çekilişi Tekrar Başlatmak İçin **Mesajları Yönet** Yetkisine Sahip Olmalısın!');
    }

    // If no message ID or giveaway name is specified
    if(!args[0]){
        return message.channel.send(':x: Geçerli bir Çekiliş ID si Gir!');
    }

    // try to found the giveaway with prize then with ID
    let giveaway = 
    // Search with giveaway prize
    client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
    // Search with giveaway ID
    client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

    // If no giveaway was found
    if(!giveaway){
        return message.channel.send('Çekiliş Bulunamadı `'+ args.join(' ') +'`.');
    }

    // Reroll the giveaway
    client.giveawaysManager.reroll(giveaway.messageID)
    .then(() => {
        // Success message
        message.channel.send('Çekiliş Yeniden Çekildi!');
    })
    .catch((e) => {
        if(e.startsWith(`${giveaway.messageID} Bu Çekiliş Zaten Daha Bitmemiş!`)){
            message.channel.send('Bu Çekiliş Daha Bitmedi!');
        } else {
            console.error(e);
            message.channel.send('Bir Hata Oluştu...');
        }
    });

};
