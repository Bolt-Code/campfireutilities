var Discord = require('discord.js')
const mongo = require('../mongo')
const punishmentsSchema = require('../schemas/punishments-schema')

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
    .setDescription('You cannot warn this user because your highest role is either the same or lower as them.')

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
    embed.setTitle('You were warned in Campfire.')
    embed.addField('Reason', reason, true)
    embed.addField('Problem?', 'Please report any false or abusive punishments to our Camp Superintendent.',false)
    embed.setTimestamp();

  var puncode = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < 15; i++ ) {
    puncode += characters.charAt(Math.floor(Math.random() * charactersLength))
  }

  var date = new Date();
  month = date.getMonth() + 1
  date = month + '/' + date.getDate() + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes();

  await new punishmentsSchema({
    userId: user.id,
    authorId: message.author.id,
    code: puncode,
    type: 'Warn',
    date: date,
    reason: reason,
  }).save()

  const logchannel = message.guild.channels.cache.get('763386062873296936')
  logchannel.send(`<:warn:769001734738804778> **${user.tag}** warned at \`${date}\` (${user.id})\nReason: ${reason}`)

  var warnmsg = new Discord.MessageEmbed()
  .setColor('#4BCC85') 
  .setDescription(`<a:success:769189756051390471> ${user} has been **warned** with ID \`${puncode}\``)

  message.channel.send(warnmsg);

    try {
      if(user.bot) return;
      user.send(embed);
    } catch(err) {
    }

}


