var Discord = require('discord.js')

exports.run = async(client, message, args) => {
  if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('You do not meet the requirements to use this command, `manage messages`.');

  var user = message.mentions.users.first();
  if(!user) return message.channel.send('Please mention a user to warn.')
  if(user.bot) return;

  if(user.id === message.author.id) return message.channel.send('This command isn\'t broken, but why would you want to warn yourself?')

  var member;

  try {
    member = await message.guild.members.fetch(user)
  } catch(err) {
    member = null;
  }

  if(message.member.roles.highest.position ==  message.guild.member(user.id).roles.highest.position || message.member.roles.highest.position < message.guild.member(user.id).roles.highest.position) {
    
    var cannotwarn = new Discord.MessageEmbed()
    .setTitle('Error')
    .setColor('#FF1654')
    .setDescription('You cannot warn this user because your highest role is either the same or lower as them')

    message.channel.send(cannotwarn)
    return;
  }

    if(!member) return message.reply('That user isn\'t currently in the server.')

    var reason = args.splice(1).join(' ');
    if(!reason) { 
      return message.channel.send('You must specify a reason in order to punish this user.')
    }

    /*var log = new Discord.MessageEmbed()
    log.setTitle('Mentioned User Warned')
    log.addField('User:', user, true)
    log.addField('By:', message.author, true)
    log.addField('Reason:', reason)*/

    var embed = new Discord.MessageEmbed();
    embed.setColor('#FF1654')
    embed.setTitle('You were warned in CampFire.')
    embed.addField('Reason', reason, true)
    embed.addField('Problem?', 'Please report any false or abusive punishments to our Camp Superintendent.',false)
    embed.setTimestamp();

    try {
        user.send(embed);
    } catch(err) {
    }

    var warnmsg = new Discord.MessageEmbed()
    .setDescription(`<a:ok:767131603851804672> Successfully warned **${user.username}**`)
    .setColor('#4BCC85');

    message.channel.send(warnmsg);
}


