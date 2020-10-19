const Discord = require('discord.js')
const util = require('util')
const evalperms = process.env.EVALPERMS

exports.run = async(client, message, args) => {

    if(!evalperms.includes(message.author.id)) return message.react('🔥');

    let code = args.join(' ');
    if(!code) return message.channel.send('Please input something to run...')

    let output;

    try {
        output = await eval(code)
    } catch(err) {
        const error = new Discord.MessageEmbed() 
        .setColor('#FF1654')
        .setDescription(`\`\`\`${err}\`\`\``)
        .setAuthor('Error', client.user.displayAvatarURL())
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
        .setTimestamp();
        return message.channel.send(error);
    }

    const outputembed = new Discord.MessageEmbed()
    .setColor('#FF1654')
    .setDescription(`Input:\`\`\`js\n${code}\`\`\`\nOutput:\`\`\`\n${output}\`\`\``)
    .setAuthor('Evaluation', client.user.displayAvatarURL())
    .setFooter(`Requested by ${message.author.tag}🧯`, message.author.displayAvatarURL({dynamic: true}))
    .setTimestamp();

    if(typeof output != 'string') output = util.inspect(output);

    message.channel.send(outputembed);
} 