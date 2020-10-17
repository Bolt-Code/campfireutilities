var Discord = require('discord.js')

exports.run = async(client, msg, args) => {
  if(!msg.member.hasPermission('MANAGE_MESSAGES')) return msg.reply('You do not meet the requirements to use this command, `manage messages`.');

  var user = msg.mentions.users.first();
  if(!user) return msg.reply('Please mention the user who you would like to warn.')

  var member;

  try {
    member = await msg.guild.members.fetch(user)
  } catch(err) {
    member = null;
  }

    if(!member) return msg.reply('That user isn\'t currently in the server.')

    var reason = args.splice(1).join(' ');

    var channel = msg.guild.channel.cache.find(c => c.name === 'yes')

    var log = new Discord.MessageEmbed()
    .setTitle('Mentioned User Warned')
    .addField('User:', user, true)
    .addField('By:', msg.author, true)
    .addField('Reason:', reason)
    channel.send(log);

    var embed = new Discord.MessageEmbed();
    .setTitle('You were warned.')
    .setDescription(reason)
    .addField('Please tell our Camp Superindentent if you think this wasn\'t reasonable.)

    try {
        user.send(embed);
    } catch(err) {
      console.warn(err);
    }

    msg.channel.send('**${user}** has been warned by **${msg.author}**');
}