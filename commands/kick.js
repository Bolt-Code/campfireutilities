const Discord = require('discord.js')
const mongo = require('../mongo')
const punishmentsSchema = require('../schemas/punishments-schema')

exports.run = async(client, message, args) =>{

  var accessdenied = new Discord.MessageEmbed()
  .setTitle('Error')
  .setColor('#FF1654')
  .setDescription('You do not meet the requirements to run this command, `kick_members`.');

  var nouser = new Discord.MessageEmbed()
  .setTitle('Error')
  .setColor('#FF1654')
  .setDescription('Please specify a user to kick');

  if(!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(accessdenied)

  var user = message.mentions.users.first();
  if(!user) return message.channel.send(nouser)

  if(user.id === message.author.id) return message.channel.send('This command isn\'t broken, but why would you want to kick yourself?')

  var reason = args.splice(1).join(' ');
    if(!reason) { 
      return message.channel.send('You must specify a reason in order to punish this user.')
    }

  var member;

  try {
    member = await message.guild.members.fetch(user)
  } catch(err) {
    member = null;
  }

  if(message.member.roles.highest.position ==  message.guild.member(user.id).roles.highest.position || message.member.roles.highest.position < message.guild.member(user.id).roles.highest.position) {
    
    var cannotkick = new Discord.MessageEmbed()
    .setTitle('Error')
    .setColor('#FF1654')
    .setDescription('You cannot kick this user because your highest role is either the same or lower as them.')

    message.channel.send(cannotkick)
    return;
  }


  var date = new Date();
    date = date.getMonth() + '/' + date.getDay() + '/' + date.getFullYear();

  var kickmsgdm = new Discord.MessageEmbed()
  .setTitle('You were kicked from CampFire')
  .setColor('#FF1654')
  .addField('Reason', reason)
  .addField('Date', date)
  .addField('Problem?', 'Please report any false or abusive punishments to our Camp Superintendent.',false)
  .setTimestamp();

  member.kick( { reason: reason });

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
    type: 'Kick',
    date: date,
    reason: reason,
  }).save()

  const logchannel = message.guild.channels.cache.get('763386062873296936')
  logchannel.send(`<:kick:769002468162928670> **${user.tag}** kicked at \`${date}\` (${user.id})\nReason: ${reason}`)

  var kickmsg = new Discord.MessageEmbed()
  .setColor('#4BCC85') 
  .setDescription(`<a:success:769189756051390471> ${user} has been **kicked** with ID \`${puncode}\``)

  message.channel.send(kickmsg)

  try {
    if(user.bot) return;
    user.send(kickmsgdm);
  } catch(err) {
  }

}